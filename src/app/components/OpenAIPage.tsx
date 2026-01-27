import { Sparkles, FileText, AlertCircle, CheckCircle2, Shield, Database } from "lucide-react";
import type { Email } from "@/app/App";
import { AccountHeader } from "@/app/components/AccountHeader";

interface OpenAIPageProps {
  email: Email;
  onLogout: () => void;
  onOpenMobileMenu: () => void;
}

export function OpenAIPage({ email, onLogout, onOpenMobileMenu }: OpenAIPageProps) {
  const totalEngines = email.virusTotalResults.clean + email.virusTotalResults.threats;

  return (
    <div className="flex-1 overflow-y-auto relative">
      <AccountHeader onLogout={onLogout} onOpenMobileMenu={onOpenMobileMenu} />
      <div className="p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-normal mb-3 sm:mb-4">
            OpenAI Email Analyzer
          </h1>
          <p className="text-white/60 text-base sm:text-sm">Intelligent analysis powered by OpenAI</p>
        </div>

        {/* Email Info */}
        <div className="bg-[#232323] rounded-2xl p-6 mb-6 border border-white/5">
          <h3 className="text-white/60 text-sm uppercase tracking-wide mb-3">Analyzing Email</h3>
          <p className="text-white text-lg mb-1">{email.subject}</p>
          <p className="text-white/50 text-sm">{email.sender}</p>
          <p className="text-white/40 text-xs mt-2">{email.date}</p>
        </div>

        {/* AI Summary Section */}
        <div className="bg-gradient-to-br from-[#ff4d2e]/10 to-[#ff4d2e]/5 rounded-2xl p-8 mb-6 border border-[#ff4d2e]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#ff4d2e]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#ff4d2e]" />
            </div>
            <h3 className="text-white text-2xl font-normal">AI Analysis Summary</h3>
          </div>
          
          <div className="bg-[#1a1a1c] rounded-xl p-6 border border-white/10">
            <p className="text-white/90 text-base leading-relaxed whitespace-pre-line">
              {email.aiSummary}
            </p>
          </div>
        </div>

        {/* AI Mitigation Section */}
        <div className="bg-gradient-to-br from-[#ff4d2e]/10 to-[#ff4d2e]/5 rounded-2xl p-8 mb-6 border border-[#ff4d2e]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#ff4d2e]/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#ff4d2e]" />
            </div>
            <h3 className="text-white text-2xl font-normal">AI Mitigation Recommendations</h3>
          </div>
          
          <div className="bg-[#1a1a1c] rounded-xl p-6 border border-white/10">
            <div className="space-y-3">
              {email.aiMitigation.split(/\d+\.\s/).filter(Boolean).map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#ff4d2e]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#ff4d2e] text-sm font-medium">{index + 1}</span>
                  </div>
                  <p className="text-white/90 text-base leading-relaxed">{step.trim()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Findings Grid */}
        <div className="mb-8">
          <h3 className="text-white text-xl font-normal mb-4">Key Findings</h3>
          <div className="grid grid-cols-3 gap-6">
            {/* Phishing Status */}
            <div className={`bg-[#232323] rounded-2xl p-6 border ${email.phishingDetected ? "border-[#ff4d2e]/30" : "border-green-500/30"}`}>
              <div className="flex items-center gap-3 mb-4">
                {email.phishingDetected ? (
                  <AlertCircle className="w-6 h-6 text-[#ff4d2e]" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                )}
                <h4 className="text-white text-sm font-medium">Phishing Detection</h4>
              </div>
              <p className={`text-3xl font-normal mb-2 ${email.phishingDetected ? "text-[#ff4d2e]" : "text-green-500"}`}>
                {email.phishingDetected ? "Threat" : "Clean"}
              </p>
              <p className="text-white/50 text-xs">
                {email.phishingDetected ? "Phishing indicators detected" : "No phishing patterns found"}
              </p>
            </div>

            {/* VirusTotal */}
            <div className={`bg-[#232323] rounded-2xl p-6 border ${email.virusTotalResults.threats > 50 ? "border-[#ff4d2e]/30" : "border-white/5"}`}>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-white/60" />
                <h4 className="text-white text-sm font-medium">VirusTotal</h4>
              </div>
              <p className={`text-3xl font-normal mb-2 ${email.virusTotalResults.threats > 50 ? "text-[#ff4d2e]" : email.virusTotalResults.threats > 20 ? "text-yellow-500" : "text-green-500"}`}>
                {email.virusTotalResults.threats}/{totalEngines}
              </p>
              <p className="text-white/50 text-xs">
                Threat detections
              </p>
            </div>

            {/* Data Breaches */}
            <div className={`bg-[#232323] rounded-2xl p-6 border ${email.breachCount > 0 ? "border-[#ff4d2e]/30" : "border-white/5"}`}>
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-white/60" />
                <h4 className="text-white text-sm font-medium">Data Breaches</h4>
              </div>
              <p className={`text-3xl font-normal mb-2 ${email.breachCount > 0 ? "text-[#ff4d2e]" : "text-green-500"}`}>
                {email.breachCount}
              </p>
              <p className="text-white/50 text-xs">
                {email.breachCount === 1 ? "Breach found" : "Breaches found"}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-2 gap-6">
          {/* Threat Assessment */}
          <div className="bg-[#232323] rounded-2xl p-6 border border-white/5">
            <h3 className="text-white text-lg font-normal mb-4">Threat Assessment</h3>
            
            <div className="space-y-4">
              <div className="bg-[#1a1a1c] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">Overall Risk Level</span>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    email.phishingDetected || email.virusTotalResults.threats > 50
                      ? "bg-[#ff4d2e]/20 text-[#ff4d2e]"
                      : email.virusTotalResults.threats > 20 || email.breachCount > 0
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-green-500/20 text-green-500"
                  }`}>
                    {email.phishingDetected || email.virusTotalResults.threats > 50
                      ? "High Risk"
                      : email.virusTotalResults.threats > 20 || email.breachCount > 0
                      ? "Medium Risk"
                      : "Low Risk"}
                  </span>
                </div>
              </div>

              <div className="bg-[#1a1a1c] rounded-xl p-4">
                <p className="text-white/60 text-xs mb-3 uppercase tracking-wide">Risk Factors</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Phishing Pattern</span>
                    {email.phishingDetected ? (
                      <AlertCircle className="w-4 h-4 text-[#ff4d2e]" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Malware Detection</span>
                    {email.virusTotalResults.threats > 50 ? (
                      <AlertCircle className="w-4 h-4 text-[#ff4d2e]" />
                    ) : email.virusTotalResults.threats > 20 ? (
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Sender Compromised</span>
                    {email.breachCount > 0 ? (
                      <AlertCircle className="w-4 h-4 text-[#ff4d2e]" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-[#232323] rounded-2xl p-6 border border-white/5">
            <h3 className="text-white text-lg font-normal mb-4">AI Recommendations</h3>
            
            <div className="space-y-3">
              {email.phishingDetected && (
                <div className="bg-[#ff4d2e]/10 border border-[#ff4d2e]/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#ff4d2e] mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium mb-1">Do Not Interact</p>
                      <p className="text-white/70 text-xs">Delete this email immediately. Do not click any links or download attachments.</p>
                    </div>
                  </div>
                </div>
              )}

              {email.breachCount > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium mb-1">Verify Sender</p>
                      <p className="text-white/70 text-xs">The sender's email has been in data breaches. Verify through alternative channels.</p>
                    </div>
                  </div>
                </div>
              )}

              {!email.phishingDetected && email.virusTotalResults.threats < 20 && email.breachCount === 0 && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium mb-1">Appears Safe</p>
                      <p className="text-white/70 text-xs">This email appears legitimate. However, always exercise caution with sensitive information.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-[#1a1a1c] rounded-xl p-4">
                <p className="text-white/60 text-xs mb-2 uppercase tracking-wide">General Best Practices</p>
                <ul className="space-y-2 text-white/70 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff4d2e] mt-0.5">•</span>
                    <span>Never provide passwords or financial information via email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff4d2e] mt-0.5">•</span>
                    <span>Hover over links to check the actual destination URL</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff4d2e] mt-0.5">•</span>
                    <span>Verify urgent requests through official channels</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8 bg-[#121212] rounded-2xl p-6 border border-white/5">
          <h4 className="text-white/60 text-xs uppercase tracking-wide mb-3">About OpenAI Analysis</h4>
          <p className="text-white/80 text-sm leading-relaxed">
            Our OpenAI integration uses advanced language models to analyze email content, sender patterns, 
            and metadata to provide intelligent insights, comprehensive summaries, and actionable mitigation recommendations. 
            The analysis combines data from phishing detection, VirusTotal, and HaveIBeenPwned to deliver a complete 
            security assessment with step-by-step guidance on how to respond to potential threats.
          </p>
        </div>
      </div>
    </div>
  );
}