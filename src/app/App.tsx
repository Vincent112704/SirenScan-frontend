import { useEffect, useState } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { Dashboard } from "@/app/components/Dashboard";
import { LandingPage } from "@/app/components/LandingPage";
import { Help } from "@/app/components/Help";
import { VirusTotalPage } from "@/app/components/VirusTotalPage";
import { HaveIBeenPwnedPage } from "@/app/components/HaveIBeenPwnedPage";
import { OpenAIPage } from "@/app/components/OpenAIPage";
import { MobileNav } from "@/app/components/MobileNav";
import { useUserEmails } from "@/hooks/useUserEmail";
import { logOut } from "@/services/auth/authService";

// Mock email data
interface HaveIBeenPwnedData {
  BreachDate: string;
  DataClasses: string[];
  Description: string;
  Name: string;
  Title: string;
}
export interface Email {
  id: string;
  sender: string;
  subject: string;
  phishingDetected: boolean;
  virusTotalResults: {
    clean: number;
    threats: number;
  };
  breachCount: number;
  breaches?: HaveIBeenPwnedData[]; // Optional, only if breachCount > 0
  aiSummary: string;
  aiMitigation: string;
}


type Page = "landing" | "dashboard" | "help" | "virusTotal" | "haveIBeenPwned" | "openAI";

export default function App() {
  const { emails, loading } = useUserEmails();
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null); //dropdown to select email in dashboard, default to first email in list
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    if (!selectedEmail && emails.length > 0) {
      setSelectedEmail(emails[0]);
    }
  }, [emails, selectedEmail]);


  const handleLogout = async () => {
    await logOut();               // This kills the Firebase session
    setCurrentPage("landing");    // This moves the UI back to landing
    setIsMobileMenuOpen(false);   // Close menu if on mobile
  };
  
  

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
          onLogout={handleLogout} 
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
        onLogout={handleLogout}
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
          emails={emails} 
          onSelectEmail={setSelectedEmail}
          onNavigateToVirusTotal={() => setCurrentPage("virusTotal")}
          onNavigateToHaveIBeenPwned={() => setCurrentPage("haveIBeenPwned")}
          onNavigateToOpenAI={() => setCurrentPage("openAI")}
          onLogout={handleLogout}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />
      ) : currentPage === "help" ? (
        <Help onLogout={handleLogout} onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      ) : currentPage === "virusTotal" ? (
        <VirusTotalPage email={selectedEmail} onLogout={handleLogout} onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      ) : currentPage === "haveIBeenPwned" ? (
        <HaveIBeenPwnedPage email={selectedEmail} onLogout={handleLogout} onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      ) : currentPage === "openAI" ? (
        <OpenAIPage email={selectedEmail} onLogout={handleLogout} onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      ) : (
        <div>Unknown Page</div>
      )}
    </div>
  );
}