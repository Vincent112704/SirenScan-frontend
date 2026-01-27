import { useState } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { Dashboard } from "@/app/components/Dashboard";
import { LandingPage } from "@/app/components/LandingPage";
import { Help } from "@/app/components/Help";
import { VirusTotalPage } from "@/app/components/VirusTotalPage";
import { HaveIBeenPwnedPage } from "@/app/components/HaveIBeenPwnedPage";
import { OpenAIPage } from "@/app/components/OpenAIPage";
import { MobileNav } from "@/app/components/MobileNav";

// Mock email data
export interface Email {
  id: string;
  sender: string;
  subject: string;
  date: string;
  phishingDetected: boolean;
  virusTotalResults: {
    clean: number;
    threats: number;
  };
  breachCount: number;
  aiSummary: string;
  aiMitigation: string;
}

const mockEmails: Email[] = [
  {
    id: "1",
    sender: "support@paypal-security.com",
    subject: "Urgent: Verify your account immediately",
    date: "2026-01-24",
    phishingDetected: true,
    virusTotalResults: { clean: 23, threats: 67 },
    breachCount: 0,
    aiSummary: "This email exhibits multiple phishing indicators including urgent language, suspicious sender domain (paypal-security.com instead of paypal.com), and requests for immediate account verification. The email contains links to a fraudulent website designed to steal login credentials. Recommendation: Delete this email immediately and do not click any links.",
    aiMitigation: "1. Delete this email immediately without clicking any links or downloading attachments. 2. Mark the email as spam to train your email filter. 3. Visit PayPal directly by typing the official URL in your browser, never through email links. 4. Enable two-factor authentication on your PayPal account for added security. 5. Report the phishing attempt to PayPal's official security team at spoof@paypal.com.",
  },
  {
    id: "2",
    sender: "noreply@amazon.com",
    subject: "Your order has been shipped - #12345",
    date: "2026-01-23",
    phishingDetected: false,
    virusTotalResults: { clean: 89, threats: 1 },
    breachCount: 0,
    aiSummary: "This appears to be a legitimate shipping notification from Amazon. The sender domain is verified, email formatting matches Amazon's standard templates, and tracking information is consistent with legitimate shipment notifications. The single threat detection is likely a false positive. Recommendation: Safe to open, but verify order details in your Amazon account.",
    aiMitigation: "1. Verify the order details by logging into your Amazon account directly through the official website. 2. Check if the order number matches your recent purchases. 3. Track the shipment using Amazon's official tracking system. 4. If you didn't place an order, contact Amazon customer service immediately. 5. Keep monitoring your account for any unauthorized transactions.",
  },
  {
    id: "3",
    sender: "alerts@bankofamerica-verify.net",
    subject: "Suspicious activity detected on your account",
    date: "2026-01-22",
    phishingDetected: true,
    virusTotalResults: { clean: 15, threats: 75 },
    breachCount: 1,
    aiSummary: "High-risk phishing attempt detected. The sender domain 'bankofamerica-verify.net' is not associated with Bank of America. The email uses fear tactics about suspicious activity to prompt immediate action. Additionally, the recipient's email was found in 1 known data breach, making them a targeted victim. Recommendation: Do not respond or click any links. Report to Bank of America's official fraud department.",
    aiMitigation: "1. Do not click any links or provide any personal information. 2. Delete the email immediately and mark as spam. 3. Contact Bank of America directly using the phone number on the back of your card or from their official website. 4. Change your passwords for all financial accounts, especially if you've used the same password across multiple sites. 5. Monitor your bank statements closely for unauthorized transactions. 6. Consider placing a fraud alert on your credit report.",
  },
  {
    id: "4",
    sender: "team@github.com",
    subject: "Security alert: New sign-in from unusual location",
    date: "2026-01-21",
    phishingDetected: false,
    virusTotalResults: { clean: 88, threats: 2 },
    breachCount: 0,
    aiSummary: "Legitimate security notification from GitHub. The sender domain is verified, and the email follows GitHub's standard security alert format. The notification includes genuine login details and proper security recommendations. The 2 threat detections are false positives from overly sensitive scanning engines. Recommendation: Verify the login activity in your GitHub settings.",
    aiMitigation: "1. Log into your GitHub account and review recent login activity in Security settings. 2. If you recognize the location and time, no action is needed. 3. If you don't recognize the login, immediately change your password and revoke access to any suspicious sessions. 4. Enable two-factor authentication if not already active. 5. Review connected applications and remove any you don't recognize. 6. Update your recovery email and phone number.",
  },
  {
    id: "5",
    sender: "winner@lottery-international.biz",
    subject: "CONGRATULATIONS! You've won $5,000,000!!!",
    date: "2026-01-20",
    phishingDetected: true,
    virusTotalResults: { clean: 8, threats: 82 },
    breachCount: 2,
    aiSummary: "Classic lottery scam with extremely high threat level. Multiple red flags including unsolicited prize notification, excessive use of capital letters and exclamation marks, suspicious .biz domain, and requests for personal information to claim the prize. The recipient's email has been found in 2 data breaches, suggesting it's on scammer lists. Recommendation: Delete immediately and mark as spam.",
    aiMitigation: "1. Delete the email immediately - legitimate lotteries don't contact winners via email. 2. Mark as spam and block the sender. 3. Never provide personal information, banking details, or payment to claim a 'prize'. 4. Do not respond to the email or click any links. 5. Report the scam to the FTC at reportfraud.ftc.gov. 6. Since your email was found in data breaches, consider using a new email address for sensitive accounts. 7. Enable spam filters and be vigilant about similar scam attempts.",
  },
];

type Page = "landing" | "dashboard" | "help" | "virusTotal" | "haveIBeenPwned" | "openAI";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [selectedEmail, setSelectedEmail] = useState<Email>(mockEmails[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  console.log("Current page:", currentPage);

  // Render based on current page
  if (currentPage === "landing") {
    return <LandingPage onNavigateToDashboard={() => setCurrentPage("dashboard")} />;
  }

  // Dashboard and Help views share the same sidebar
  return (
    <div className="flex h-screen bg-[#1c1c1e] overflow-hidden">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar 
          onLogout={() => setCurrentPage("landing")} 
          onNavigateToHelp={() => setCurrentPage("help")}
          onNavigateToDashboard={() => setCurrentPage("dashboard")}
          onNavigateToVirusTotal={() => setCurrentPage("virusTotal")}
          onNavigateToHaveIBeenPwned={() => setCurrentPage("haveIBeenPwned")}
          onNavigateToOpenAI={() => setCurrentPage("openAI")}
          currentView={currentPage}
        />
      </div>

      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentView={currentPage}
        onLogout={() => {
          setIsMobileMenuOpen(false);
          setCurrentPage("landing");
        }}
        onNavigateToHelp={() => {
          setIsMobileMenuOpen(false);
          setCurrentPage("help");
        }}
        onNavigateToDashboard={() => {
          setIsMobileMenuOpen(false);
          setCurrentPage("dashboard");
        }}
        onNavigateToVirusTotal={() => {
          setIsMobileMenuOpen(false);
          setCurrentPage("virusTotal");
        }}
        onNavigateToHaveIBeenPwned={() => {
          setIsMobileMenuOpen(false);
          setCurrentPage("haveIBeenPwned");
        }}
        onNavigateToOpenAI={() => {
          setIsMobileMenuOpen(false);
          setCurrentPage("openAI");
        }}
      />

      {/* Main Content */}
      {currentPage === "dashboard" ? (
        <Dashboard 
          email={selectedEmail} 
          emails={mockEmails} 
          onSelectEmail={setSelectedEmail}
          onNavigateToVirusTotal={() => setCurrentPage("virusTotal")}
          onNavigateToHaveIBeenPwned={() => setCurrentPage("haveIBeenPwned")}
          onNavigateToOpenAI={() => setCurrentPage("openAI")}
          onLogout={() => setCurrentPage("landing")}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />
      ) : currentPage === "help" ? (
        <Help onLogout={() => setCurrentPage("landing")} onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      ) : currentPage === "virusTotal" ? (
        <VirusTotalPage email={selectedEmail} onLogout={() => setCurrentPage("landing")} onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      ) : currentPage === "haveIBeenPwned" ? (
        <HaveIBeenPwnedPage email={selectedEmail} onLogout={() => setCurrentPage("landing")} onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      ) : currentPage === "openAI" ? (
        <OpenAIPage email={selectedEmail} onLogout={() => setCurrentPage("landing")} onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      ) : (
        <div>Unknown Page</div>
      )}
    </div>
  );
}