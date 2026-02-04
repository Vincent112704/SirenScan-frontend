import {
  Mail,
  Shield,
  ShieldAlert,
  Database,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  Clock,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import type { Email } from "@/app/App";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { AccountHeader } from "@/app/components/AccountHeader";

interface DashboardProps {
  email: Email;
  emails: Email[];
  onSelectEmail: (email: Email) => void;
  onNavigateToVirusTotal: () => void;
  onNavigateToHaveIBeenPwned: () => void;
  onNavigateToOpenAI: () => void;
  onLogout: () => void;
  onOpenMobileMenu: () => void;
}

export function Dashboard({
  email,
  emails,
  onSelectEmail,
  onNavigateToVirusTotal,
  onNavigateToHaveIBeenPwned,
  onNavigateToOpenAI,
  onLogout,
  onOpenMobileMenu,
}: DashboardProps) {
  const [open, setOpen] = useState(false);

  const formatDate = (date: string) => {
    const emailDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (emailDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (emailDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return emailDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const handleSelectEmail = (selectedEmail: Email) => {
    onSelectEmail(selectedEmail);
    setOpen(false);
  };

  // Prepare data for VirusTotal chart
  const virusTotalData = [
    { name: "Clean", value: email.virusTotalResults.clean, color: "#10b981" },
    { name: "Threats", value: email.virusTotalResults.threats, color: "#ff4d2e" },
  ];

  const totalEngines = email.virusTotalResults.clean + email.virusTotalResults.threats;
  const safeRate = Math.round((email.virusTotalResults.clean / totalEngines) * 100);

  return (
    <div className="flex-1 overflow-y-auto relative">
      <AccountHeader onLogout={onLogout} onOpenMobileMenu={onOpenMobileMenu} />
      <div className="p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24">
        {/* Header with Search Bar */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-white text-3xl sm:text-6xl font-normal mb-4 sm:mb-6">Dashboard</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="relative items-center box-border flex justify-center w-auto max-w-sm overflow-hidden p-[1px] rounded-xl group transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_18px_rgba(255,77,46,0.18)]">
                <div className="relative bg-[#0a0a0a] px-4 py-2 rounded-xl z-[1] transition-all duration-300 group-hover:bg-zinc-900 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white/60" />
                  <span className="text-white text-sm font-medium">Choose Email</span>
                  <ChevronDown className="w-5 h-5 text-white/40 ml-2" />
                </div>
                <div className="absolute aspect-square bg-[conic-gradient(from_0deg,transparent_120deg,#ff4d2e_180deg,transparent_240deg)] w-[200%] animate-[spin_3s_linear_infinite]" />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-[#1a1a1c] border border-white/10 text-white max-w-2xl max-h-[80vh] overflow-hidden p-0">
              <DialogHeader className="p-6 pb-4 border-b border-white/10">
                <DialogTitle className="text-xl font-normal">Select Email</DialogTitle>
                <p className="text-white/50 text-sm mt-1">{emails.length} emails forwarded</p>
              </DialogHeader>
              <div className="overflow-y-auto max-h-[60vh]">
                {emails.map((emailItem) => (
                  <button
                    key={emailItem.id}
                    onClick={() => handleSelectEmail(emailItem)}
                    className={`w-full p-5 border-b border-white/5 text-left transition-all hover:bg-white/5 ${
                      email.id === emailItem.id ? "bg-[#232323] border-l-4 border-l-[#ff4d2e]" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Mail className={`w-4 h-4 ${emailItem.phishingDetected ? "text-[#ff4d2e]" : "text-green-500"}`} />
                        <span className={`text-sm font-medium ${emailItem.phishingDetected ? "text-[#ff4d2e]" : "text-green-500"}`}>
                          {emailItem.phishingDetected ? "Threat" : "Clean"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-white/40 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(emailItem.date)}</span>
                      </div>
                    </div>
                    <div className="mb-1"><p className="text-white text-sm font-normal">{emailItem.sender}</p></div>
                    <div><p className="text-white/60 text-sm">{emailItem.subject}</p></div>
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* PHISHING DETECTION */}
          <button onClick={onNavigateToVirusTotal} className="bg-[#232323] rounded-2xl p-6 flex flex-col text-left hover:bg-[#2a2a2a] transition-all cursor-pointer border border-white/5 hover:border-[#ff4d2e]/30">
            <div className="flex items-start justify-between">
              <h3 className="text-white text-lg font-normal leading-tight">Phishing<br />Detection</h3>
              <div className="w-7 h-7 rounded-full bg-[#ff4d2e] flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-black" />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-45">
              {email.phishingDetected ? (
                <div className="text-center">
                  <ShieldAlert className="w-16 h-16 text-[#ff4d2e] mx-auto mb-3" />
                  <p className="text-[#ff4d2e] text-2xl mb-1">Threat Detected</p>
                  <p className="text-white/60 text-xs">Phishing indicators found</p>
                </div>
              ) : (
                <div className="text-center">
                  <Shield className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  <p className="text-green-500 text-2xl mb-1">Clean</p>
                  <p className="text-white/60 text-xs">No threats detected</p>
                </div>
              )}
            </div>
          </button>

          {/* VIRUSTOTAL - UPDATED GRAPH DESIGN */}
          <button onClick={onNavigateToVirusTotal} className="bg-[#232323] rounded-2xl p-6 flex flex-col text-left hover:bg-[#2a2a2a] transition-all cursor-pointer border border-white/5 hover:border-[#ff4d2e]/30">
            <div className="flex items-start justify-between">
              <h3 className="text-white text-lg font-normal">VirusTotal</h3>
              <div className="w-7 h-7 rounded-full bg-[#ff4d2e] flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-black" />
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center min-h-45">
              <div className="h-40 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={virusTotalData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={65}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {virusTotalData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Center Percentage Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold text-white leading-none">{safeRate}%</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Secure</span>
                </div>
              </div>

              {/* Data Labels Legeng */}
              <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span className="text-xs text-white/60">{email.virusTotalResults.clean} Clean</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#ff4d2e]" />
                  <span className="text-xs text-white/60">{email.virusTotalResults.threats} Threats</span>
                </div>
              </div>

              <p className="text-white/30 text-[10px] mt-4 uppercase tracking-tighter text-center">
                {email.virusTotalResults.clean}/{totalEngines} engines detected no threats
              </p>
            </div>
          </button>

          {/* HAVE I BEEN PWNED */}
          <button onClick={onNavigateToHaveIBeenPwned} className="bg-[#232323] rounded-2xl p-6 flex flex-col text-left hover:bg-[#2a2a2a] transition-all cursor-pointer border border-white/5 hover:border-[#ff4d2e]/30">
            <div className="flex items-start justify-between">
              <h3 className="text-white text-lg font-normal leading-tight">HaveIBeen<br />Pwned</h3>
              <div className="w-7 h-7 rounded-full bg-[#ff4d2e] flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-black" />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-45">
              <div className="text-center">
                <Database className={`w-16 h-16 mx-auto mb-3 ${email.breachCount > 0 ? "text-[#ff4d2e]" : "text-green-500"}`} />
                <p className={`text-4xl mb-1 ${email.breachCount > 0 ? "text-[#ff4d2e]" : "text-green-500"}`}>{email.breachCount}</p>
                <p className="text-white text-sm mb-1">Data Breach{email.breachCount !== 1 ? "es" : ""}</p>
                <p className="text-white/60 text-xs">{email.breachCount > 0 ? "Email compromised" : "No breaches detected"}</p>
              </div>
            </div>
          </button>
        </div>

        {/* OpenAI Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          <button onClick={onNavigateToOpenAI} className="bg-[#121212] rounded-2xl p-6 relative overflow-hidden text-left hover:bg-[#1a1a1a] transition-all cursor-pointer border border-white/5 hover:border-[#ff4d2e]/30 h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-[#ff4d2e]" />
                <h3 className="text-white text-lg font-normal">OpenAI Summarizer</h3>
              </div>
            </div>
            <div className="bg-[#1a1a1c] rounded-xl p-6 border border-white/5 flex flex-col flex-1 justify-start">
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#ff4d2e] text-sm font-medium mb-2 uppercase tracking-wide">AI Analysis</h4>
                  <p className="text-white/90 text-base leading-relaxed">{email.aiSummary}</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-white/60 text-xs font-medium mb-3 uppercase tracking-wide">Key Indicators</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#232323] rounded-lg p-3">
                      <p className="text-white/50 text-xs mb-1">Status</p>
                      <p className={`text-sm font-medium ${email.phishingDetected ? "text-[#ff4d2e]" : "text-green-500"}`}>{email.phishingDetected ? "Detected" : "Clean"}</p>
                    </div>
                    <div className="bg-[#232323] rounded-lg p-3">
                      <p className="text-white/50 text-xs mb-1">Threats</p>
                      <p className="text-sm font-medium text-white">{email.virusTotalResults.threats}/{totalEngines}</p>
                    </div>
                    <div className="bg-[#232323] rounded-lg p-3">
                      <p className="text-white/50 text-xs mb-1">Breaches</p>
                      <p className={`text-sm font-medium ${email.breachCount > 0 ? "text-[#ff4d2e]" : "text-green-500"}`}>{email.breachCount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>

          <button onClick={onNavigateToOpenAI} className="bg-[#121212] rounded-2xl p-6 relative overflow-hidden text-left hover:bg-[#1a1a1a] transition-all cursor-pointer border border-white/5 hover:border-[#ff4d2e]/30 h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#ff4d2e]" />
                <h3 className="text-white text-lg font-normal">OpenAI Mitigation</h3>
              </div>
            </div>
            <div className="bg-[#1a1a1c] rounded-xl p-6 border border-white/5 flex flex-col flex-1 justify-start">
              <h4 className="text-[#ff4d2e] text-sm font-medium mb-3 uppercase tracking-wide">Recommended Actions</h4>
              <div className="text-white/90 text-base leading-relaxed space-y-2">
                {email.aiMitigation.split(/\d+\.\s/).filter(Boolean).map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#ff4d2e]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[#ff4d2e] text-xs font-medium">{index + 1}</span>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">{step.trim()}</p>
                  </div>
                ))}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}