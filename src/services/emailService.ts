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

      const parseSynthesis = (rawSynthesis: string | null | undefined) => {
        const mitigationRegex = /(?:\n|---)*\s*(?:\*\*|###)?\s*\d\.\s*(?:Suggested\s*)?Next\s*Actions:?\s*(?:\*\*|###)?/;
        
        const parts = rawSynthesis ? rawSynthesis.split(mitigationRegex) : ["", "No analysis available."];
        
        return {
          aiSummary: parts[0]?.trim(),
          aiMitigation: parts[1]?.trim()
        };
      };

      const urlSnapshot = await getDocs(urlQuery);
      const HIBPsnapshot = await getDocs(HIBPQuery);
      
      
      const { aiSummary, aiMitigation } = parseSynthesis(emailData.LLM_synthesis);
      
      const urlData = urlSnapshot.docs[0]?.data() || {};
      const HIBPData = HIBPsnapshot.docs[0]?.data() || {};
      
      
      const malicious = urlData.stats?.malicious ?? 0;
      const suspicious = urlData.stats?.suspicious ?? 0;
      const threats = malicious + suspicious;
      const breaches = purifyBreaches(HIBPData?.breaches)
      console.log("Breaches after purify:", breaches[0].Description);
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
        aiSummary: aiSummary,
        aiMitigation: aiMitigation,
      } as Email;
    });

    // 4. Wait for all nested queries to finish
    return Promise.all(emailPromises);
  }
};