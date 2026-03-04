import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore as db } from "@/firebase/firebaseConfig";
import { Email } from "@/app/App";
import DOMPurify from 'dompurify';

function purifyBreaches(breaches: Email["breaches"]) {
  return breaches.map(b => ({
    ...b,
    Description: DOMPurify.sanitize(b.Description)
  }));
}

export const emailService = {
  async fetchUserEmails(userEmail: string): Promise<Email[]> {
    const q = query(
      collection(db, "inbound_emails"),
      where("sender", "==", userEmail)
    );

    

    const querySnapshot = await getDocs(q); // queries to firebase with q as query

    // 1. Create an array of Promises
    const emailPromises = querySnapshot.docs.map(async (emailDoc) => {
      const emailData = emailDoc.data();
      const inboundId = emailData.inbound_id;
      // 2. Fetch the related URL analysis for THIS specific email
      const urlQuery = query(
        collection(db, "url_analyses"),
        where("inbound_email_id", "==", inboundId) // Use doc.id or data.inbound_id
      );
      
      const HIBPQuery = query(
        collection(db, "hibp_analyses"),
        where("email", "==", userEmail) // Use doc.id or data.inbound_id
      );

      const vTotalFileAnalysisQuery = query(
        collection(db, "file_analyses"),
        where("inbound_email_id", "==", inboundId) // Use doc.id or data.inbound_id
      );

      

      const parseSynthesis = (rawSynthesis: string | null | undefined) => {
        if(!rawSynthesis) {
          return {
            aiSummary: "No AI synthesis available.",
            aiMitigation: "No AI mitigation available."
          };
        }
        const sections = rawSynthesis.split(/\d\.\s+[^:]+:\n?/);
        const summary = `${sections[1] || ""} ${sections[2] || ""}`.trim();
        const mitigation = `${sections[3] || ""} \n\n${sections[4] || ""}`.trim();
        
        return {
          aiSummary: summary || "Analysis pending...",
          aiMitigation: mitigation
        };
      };

      const urlSnapshot = await getDocs(urlQuery);
      const HIBPsnapshot = await getDocs(HIBPQuery);
      const vTotalFileAnalysisSnapshot = await getDocs(vTotalFileAnalysisQuery);
      
      
      const { aiSummary, aiMitigation } = parseSynthesis(emailData.LLM_synthesis);
      
      const urlData = urlSnapshot.docs[0]?.data() || {};
      const HIBPData = HIBPsnapshot.docs[0]?.data() || {};
      const vTotalFileAnalysisData = vTotalFileAnalysisSnapshot.docs[0]?.data() || {};
      
      
      const malicious = urlData.stats?.malicious ?? 0;
      const suspicious = urlData.stats?.suspicious ?? 0;
      const threats = malicious + suspicious;
      const breaches = purifyBreaches(HIBPData?.breaches)
      const vTotalVendors = urlData?.results

      // determine a timestamp string from whatever field might exist in Firestore
      const processedAt =
        emailData.processedAt ||
        emailData.date ||
        // Firestore Timestamp objects have a toDate method
        (emailData.timestamp && typeof emailData.timestamp.toDate === "function"
          ? emailData.timestamp.toDate().toISOString()
          : undefined) ||
        undefined;

      return {
        id: emailDoc.id,
        sender: emailData.sender,
        subject: emailData.subject,
        phishingDetected: emailData.model_result === "Phishing",
        virusTotalResults: {
          clean: urlData?.stats?.harmless ?? 0,
          threats: threats,
        },
        breachCount: HIBPData?.breaches?.length || 0,
        breaches: breaches || [],
        VirusTotalVendors: vTotalVendors || {},
        aiSummary: aiSummary,
        aiMitigation: aiMitigation,
        vTotalFileAnalysis: vTotalFileAnalysisData || null,
        processedAt,
      } as Email;
    });

    // 4. Wait for all nested queries to finish
    const all = await Promise.all(emailPromises);
    // sort most recent first
    all.sort((a, b) => {
      const ta = a.processedAt ? new Date(a.processedAt).getTime() : 0;
      const tb = b.processedAt ? new Date(b.processedAt).getTime() : 0;
      return tb - ta;
    });
    return all;
  }
};