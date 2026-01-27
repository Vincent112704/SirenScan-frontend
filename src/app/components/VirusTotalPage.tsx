import {
  Shield,
  AlertTriangle,
  ExternalLink,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";
import { useState } from "react";
import type { Email } from "@/app/App";
import { AccountHeader } from "@/app/components/AccountHeader";

interface VirusTotalPageProps {
  email: Email;
  onLogout: () => void;
  onOpenMobileMenu: () => void;
}

// Mock security vendors
const SECURITY_VENDORS = [
  "Cylance",
  "Acronis",
  "AiLabs (MONITORAPP)",
  "alphaMountain.ai",
  "Antiy-AVL",
  "Arcabit",
  "Avast",
  "AVG",
  "Avira",
  "Baidu",
  "Bitdefender",
  "Bkav",
  "BlockList",
  "BluPhy",
  "CATQuarantined",
  "Certego",
  "ChainPatrol",
  "Chong Lua Dao",
  "CIDF",
  "CMC Threat Intelligence",
  "Comodo",
  "CrowdStrike",
  "Criminal IP",
  "Cyble",
  "Cyren",
  "desenmascara.me",
  "DNS8",
  "Dr.Web",
  "Emsisoft",
  "ESET",
  "Feodo Tracker",
  "Forcepoint ThreatSeeker",
  "Fortinet",
  "G-Data",
  "Google Safebrowsing",
  "GreenSnow",
  "Gridinsoft",
  "Hoplite Industries",
  "Kaspersky",
  "Lionic",
  "Malware Domain Blocklist",
  "MalwarePatrol",
  "Malwarebytes",
  "McAfee",
  "Microsoft",
  "MISP-Project",
  "OpenPhish",
  "Palo Alto Networks",
  "PhishLabs",
  "Phishing Database",
  "Qihoo 360",
  "Quick Heal",
  "Rising",
  "Sangfor",
  "Sophos",
  "Spam404",
  "Spamhaus",
  "StopForumSpam",
  "Symantec",
  "Tencent",
  "Trustwave",
  "Trend Micro",
  "URLhaus",
  "VBA32",
  "VIPRE",
  "Webroot",
  "Xcitium Verdict Cloud",
  "Yandex",
  "Zillya",
  "ZoneAlarm",
  "ZScaler",
];

export function VirusTotalPage({ email, onLogout, onOpenMobileMenu }: VirusTotalPageProps) {
  const [activeTab, setActiveTab] = useState<"detection" | "details">("detection");

  const totalEngines =
    email.virusTotalResults.clean +
    email.virusTotalResults.threats;
  const threatPercentage = (
    (email.virusTotalResults.threats / totalEngines) *
    100
  ).toFixed(1);

  // Generate vendor results based on the threat ratio
  const vendorResults = SECURITY_VENDORS.slice(0, totalEngines).map((vendor, index) => {
    const isMalware = index < email.virusTotalResults.threats;
    return {
      vendor,
      status: isMalware ? "malware" : "clean",
      detection: isMalware ? "Malware" : "Clean",
    };
  });

  return (
    <div className="flex-1 overflow-y-auto relative">
      <AccountHeader onLogout={onLogout} onOpenMobileMenu={onOpenMobileMenu} />
      <div className="p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-normal mb-3 sm:mb-4">
            VirusTotal Analysis
          </h1>
          <p className="text-white/60 text-base">
            Comprehensive threat detection from {totalEngines}{" "}
            security engines
          </p>
        </div>

        {/* Email Info */}
        <div className="bg-[#232323] rounded-2xl p-6 mb-6 border border-white/5">
          <h3 className="text-white/60 text-sm uppercase tracking-wide mb-3">
            Analyzing Email
          </h3>
          <p className="text-white text-lg mb-1">
            {email.subject}
          </p>
          <p className="text-white/50 text-sm">
            {email.sender}
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-[#232323] rounded-2xl p-6 border border-white/5">
            <p className="text-white/60 text-sm mb-2">
              Total Engines
            </p>
            <p className="text-white text-4xl font-normal">
              {totalEngines}
            </p>
          </div>
          <div className="bg-[#232323] rounded-2xl p-6 border border-green-500/20">
            <p className="text-white/60 text-sm mb-2">Clean</p>
            <p className="text-green-500 text-4xl font-normal">
              {email.virusTotalResults.clean}
            </p>
          </div>
          <div className="bg-[#232323] rounded-2xl p-6 border border-[#ff4d2e]/20">
            <p className="text-white/60 text-sm mb-2">
              Threats Detected
            </p>
            <p className="text-[#ff4d2e] text-4xl font-normal">
              {email.virusTotalResults.threats}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[#232323] rounded-2xl border border-white/5 overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-white/5 bg-[#1a1a1c]">
            <button
              onClick={() => setActiveTab("detection")}
              className={`px-6 py-4 text-sm font-medium transition-all ${
                activeTab === "detection"
                  ? "text-white border-b-2 border-[#ff4d2e]"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              DETECTION
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`px-6 py-4 text-sm font-medium transition-all ${
                activeTab === "details"
                  ? "text-white border-b-2 border-[#ff4d2e]"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              DETAILS
            </button>
            <div className="ml-auto px-6 py-4">
              <span className="text-white/40 text-xs uppercase tracking-wider">
                Community Score: {email.virusTotalResults.threats}/{totalEngines}
              </span>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "detection" && (
              <div>
                {/* Community Banner */}
                <div className="bg-gradient-to-r from-cyan-900/30 to-cyan-800/20 border border-cyan-700/30 rounded-xl p-4 mb-6">
                  <p className="text-cyan-300 text-sm">
                    <span className="font-medium">Join our Community</span> and enjoy additional community insights and crowdsourced detections, plus an API key to{" "}
                    <span className="underline cursor-pointer">automate checks.</span>
                  </p>
                </div>

                {/* Security Vendors Analysis */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-white text-lg font-medium">Security vendors' analysis</h3>
                    <Info className="w-4 h-4 text-white/40" />
                  </div>

                  {/* Vendor Results Table */}
                  <div className="grid grid-cols-2 gap-3">
                    {vendorResults.map((result, index) => (
                      <div
                        key={index}
                        className="bg-[#1a1a1c] rounded-lg p-4 border border-white/5 hover:border-white/10 transition-all flex items-center justify-between group"
                      >
                        <span className="text-white/90 text-sm font-medium">
                          {result.vendor}
                        </span>
                        <div className="flex items-center gap-2">
                          {result.status === "clean" ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-green-500 text-sm font-medium">
                                {result.detection}
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-[#ff4d2e]" />
                              <span className="text-[#ff4d2e] text-sm font-medium">
                                {result.detection}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Threat Assessment */}
                <div className="bg-[#1a1a1c] rounded-xl p-6 border border-white/5">
                  <h3 className="text-white text-lg font-medium mb-4">Threat Assessment</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Threat Level</span>
                      <span
                        className={`text-lg font-medium ${email.virusTotalResults.threats > 50 ? "text-[#ff4d2e]" : email.virusTotalResults.threats > 20 ? "text-yellow-500" : "text-green-500"}`}
                      >
                        {email.virusTotalResults.threats > 50
                          ? "High"
                          : email.virusTotalResults.threats > 20
                            ? "Medium"
                            : "Low"}
                      </span>
                    </div>
                    <div className="w-full bg-[#2a2a2a] rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${email.virusTotalResults.threats > 50 ? "bg-[#ff4d2e]" : email.virusTotalResults.threats > 20 ? "bg-yellow-500" : "bg-green-500"}`}
                        style={{ width: `${threatPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-white/40 text-xs">
                      {threatPercentage}% of security engines detected threats
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-6">
                {/* Categories */}
                <div className="bg-[#1a1a1c] rounded-xl p-6 border border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-white text-lg font-medium">Categories</h3>
                    <Info className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-white/60 text-sm w-48">alphaMountain.ai</span>
                      <span className="text-white/90 text-sm">Search Engines/Portals (alphaMountain.ai), searchengines</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white/60 text-sm w-48">Bitdefender</span>
                      <span className="text-white/90 text-sm">search engines</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white/60 text-sm w-48">Sophos</span>
                      <span className="text-white/90 text-sm">search engines</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white/60 text-sm w-48">Forcepoint ThreatSeeker</span>
                      <span className="text-white/90 text-sm">search engines and portals</span>
                    </div>
                  </div>
                </div>

                {/* History */}
                <div className="bg-[#1a1a1c] rounded-xl p-6 border border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-white text-lg font-medium">History</h3>
                    <Info className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">First Submission</span>
                      <span className="text-white/90 text-sm">2010-06-14 10:31:58 UTC</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Last Submission</span>
                      <span className="text-white/90 text-sm">2026-01-24 09:00:55 UTC</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Last Analysis</span>
                      <span className="text-white/90 text-sm">2026-01-24 09:00:55 UTC</span>
                    </div>
                  </div>
                </div>

                {/* HTTP Response */}
                <div className="bg-[#1a1a1c] rounded-xl p-6 border border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-white text-lg font-medium">HTTP Response</h3>
                    <Info className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-white/60 text-sm">Final URL</span>
                      <span className="text-cyan-400 text-sm break-all font-mono">
                        {email.sender.includes("paypal") ? "http://www.paypal-security.com/" : 
                         email.sender.includes("amazon") ? "http://www.amazon.com/" : 
                         email.sender.includes("bank") ? "http://www.bankofamerica-verify.net/" :
                         email.sender.includes("github") ? "http://www.github.com/" :
                         "http://www.lottery-international.biz/"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Serving IP Address</span>
                      <span className="text-white/90 text-sm font-mono">173.194.193.139</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Status Code</span>
                      <span className="text-green-500 text-sm font-mono">302</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8 bg-[#121212] rounded-2xl p-6 border border-white/5">
          <h4 className="text-white/60 text-xs uppercase tracking-wide mb-3">About VirusTotal</h4>
          <p className="text-white/80 text-sm leading-relaxed">
            VirusTotal aggregates results from 90+ antivirus engines and URL/domain scanners to provide comprehensive
            threat intelligence. The service analyzes suspicious files, URLs, domains, and IP addresses to detect malware
            and other security threats, helping users make informed decisions about email safety.
          </p>
        </div>
      </div>
    </div>
  );
}