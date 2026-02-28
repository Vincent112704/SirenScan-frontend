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
import { set } from "date-fns";


// Mock email data
interface HaveIBeenPwnedData {
  BreachDate: string;
  DataClasses: string[];
  Description: string;
  Name: string;
  Title: string;
}

export interface vendor {
  category: string;
  engine_name: string;
  method: string;
  result: string;
}

interface VirusTotalVendors {
  results: Record<string, vendor>;
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
  breaches?: HaveIBeenPwnedData[];
  VirusTotalVendors?: VirusTotalVendors; 
  aiSummary: string;
  aiMitigation: string;
  vTotalFileAnalysis?: {
    analysis_id: string;
    stats: {
      "confirmed-timeout": number;
      failure: number;
      harmless: number;
      malicious: number;
      suspicious: number;
      timeout: number;
      "type-unsupported": number;
      undetected: number;
    }
  }
}


type Page = "landing" | "dashboard" | "help" | "virusTotal" | "haveIBeenPwned" | "openAI";

export default function App() {
  const { userEmail, emails, loading } = useUserEmails();
  const [currentPage, setCurrentPage] = useState<Page>("landing"); 
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (emails.length > 0 && !selectedEmail) {
      setSelectedEmail(emails[0]);
    }
  }, [emails]); 

  useEffect(() => {
    if (!loading && userEmail) {
      setCurrentPage("dashboard"); // Auto-navigate to dashboard when logged in
    }
  }, [loading, userEmail]);

  

  const handleLogout = async () => {
    setSelectedEmail(null);       // Clear immediately
    setCurrentPage("landing");           // Clear page to prevent Dashboard render
    setIsMobileMenuOpen(false);
    await logOut();
  };
  
  
  if (loading) {
    return <div className="loading">Checking Session...</div>;
  }
  
  
  if (!selectedEmail) {
    return <LandingPage onNavigateToDashboard={() => setCurrentPage("dashboard")} />;
  } 
  

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
          UserProfile={userEmail}
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
        <Help email={userEmail} onLogout={handleLogout} onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      ) : currentPage === "virusTotal" ? (
        <VirusTotalPage UserProfile={userEmail} email={selectedEmail} onLogout={handleLogout} onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      ) : currentPage === "haveIBeenPwned" ? (
        <HaveIBeenPwnedPage UserProfile={userEmail} email={selectedEmail} onLogout={handleLogout} onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      ) : currentPage === "openAI" ? (
        <OpenAIPage UserProfile={userEmail} email={selectedEmail} onLogout={handleLogout} onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-[#1c1c1e]">
          <div className="loading text-white">Loading...</div>
        </div>  // ← Generic loading instead of "Unknown Page"
      )}
    </div>
  );
}