import {
  Database,
  AlertCircle,
  ShieldCheck,
  Info,
  ExternalLink,
} from "lucide-react";
import type { Email } from "@/app/App";
import { AccountHeader } from "@/app/components/AccountHeader";
import haveibeenpwnedLogo from "@/assets/HaveIBeenPwnedLogo.png";

interface HaveIBeenPwnedPageProps {
  email: Email;
  onLogout: () => void;
  onOpenMobileMenu: () => void;
}

export function HaveIBeenPwnedPage({
  email,
  onLogout,
  onOpenMobileMenu,
}: HaveIBeenPwnedPageProps) {
  // Mock breach data - in real app this would come from API
  const mockBreaches =
    email.breachCount > 0
      ? [
          {
            name: "Adobe",
            date: "October 2013",
            dateShort: "Oct 2013",
            description:
              "In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text. The password cryptography was poorly done and many were quickly resolved back to plain text.",
            compromisedData: [
              "Email addresses",
              "Password hints",
              "Passwords",
              "Usernames",
            ],
            pwnCount: 152445165,
            logo: "A",
          },
          ...(email.breachCount > 1
            ? [
                {
                  name: "LinkedIn",
                  date: "June 2012",
                  dateShort: "Jun 2012",
                  description:
                    "In May 2016, LinkedIn had 164 million email addresses and passwords exposed. Originally hacked in 2012, the data remained out of sight until being offered for sale on a dark market site 4 years later. The passwords in the breach were stored as SHA1 hashes without salt.",
                  compromisedData: ["Email addresses", "Passwords"],
                  pwnCount: 164611595,
                  logo: "L",
                },
              ]
            : []),
        ]
      : [];

  return (
    <div className="flex-1 overflow-y-auto relative">
      <AccountHeader onLogout={onLogout} onOpenMobileMenu={onOpenMobileMenu} />
      <div className="p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-4 mb-3 sm:mb-4">
            <img
              src={haveibeenpwnedLogo}
              alt="HaveIBeenPwned Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <h1 className="text-white text-3xl sm:text-4xl lg:text-6xl font-normal">
              HaveIBeenPwned Check
            </h1>
          </div>
          <p className="text-white/60 text-base">
            Checking if the sender's email has been exposed in data breaches
          </p>
        </div>

        {/* Email Info */}
        <div className="bg-[#232323] rounded-2xl p-6 mb-6 border border-white/5">
          <h3 className="text-white/60 text-sm uppercase tracking-wide mb-3">
            Analyzing Email
          </h3>
          <p className="text-white text-lg mb-1">{email.subject}</p>
          <p className="text-white/50 text-sm">{email.sender}</p>
        </div>

        {/* Main Result */}
        <div
          className={`bg-linear-to-br ${email.breachCount > 0 ? "from-[#ff4d2e]/20 to-[#ff4d2e]/5" : "from-green-500/20 to-green-500/5"} rounded-2xl p-8 mb-8 border ${email.breachCount > 0 ? "border-[#ff4d2e]/30" : "border-green-500/30"}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {email.breachCount > 0 ? (
                <div className="w-16 h-16 rounded-full bg-[#ff4d2e]/20 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-[#ff4d2e]" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-green-500" />
                </div>
              )}
              <div>
                <h2
                  className={`text-3xl font-normal mb-1 ${email.breachCount > 0 ? "text-[#ff4d2e]" : "text-green-500"}`}
                >
                  {email.breachCount}{" "}
                  {email.breachCount === 1 ? "Breach" : "Breaches"} Found
                </h2>
                <p className="text-white/60 text-base">
                  {email.breachCount > 0
                    ? "This email address has been compromised in known data breaches"
                    : "No breaches detected for this email address"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`text-6xl font-normal ${email.breachCount > 0 ? "text-[#ff4d2e]" : "text-green-500"}`}
              >
                {email.breachCount}
              </p>
            </div>
          </div>
        </div>

        {/* Breach Details */}
        {email.breachCount > 0 ? (
          <div className="space-y-6">
            <h3 className="text-white text-2xl font-normal">Breach Details</h3>

            {mockBreaches.map((breach, index) => (
              <div
                key={index}
                className="bg-[#1a1a1c] rounded-2xl p-8 border border-white/5 relative"
              >
                {/* Date Badge - positioned on right side */}
                <div className="absolute top-8 right-8">
                  <div className="w-24 h-24 rounded-full bg-cyan-900/50 border-2 border-cyan-600/50 flex items-center justify-center">
                    <span className="text-cyan-300 text-sm font-medium text-center leading-tight">
                      {breach.dateShort}
                    </span>
                  </div>
                </div>

                <div className="pr-32">
                  {/* Logo and Name */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                      <span className="text-black text-2xl font-bold">
                        {breach.logo}
                      </span>
                    </div>
                    <h4 className="text-white text-3xl font-normal">
                      {breach.name}
                    </h4>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-white/80 text-base leading-relaxed">
                      In{" "}
                      <span className="text-white font-medium">
                        {breach.date}
                      </span>
                      , the {breach.name.toLowerCase()} website{" "}
                      <span className="text-cyan-400 underline cursor-pointer">
                        {breach.name} suffered a data breach
                      </span>{" "}
                      {breach.description.split(
                        breach.name + " suffered a data breach",
                      )[1] || breach.description}
                    </p>
                  </div>

                  {/* Compromised Data */}
                  <div className="mb-6">
                    <h5 className="text-white font-medium text-base mb-3">
                      Compromised data:
                    </h5>
                    <ul className="space-y-2">
                      {breach.compromisedData.map((data, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                          <span className="text-white/70 text-base">
                            {data}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-white/40 text-sm">
                  <Info className="w-4 h-4" />
                  <p>
                    {breach.pwnCount.toLocaleString()} accounts compromised in
                    this breach
                  </p>
                </div>
              </div>
            ))}

            {/* Recommendation */}
            <div className="bg-[#ff4d2e]/10 border border-[#ff4d2e]/30 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-[#ff4d2e] mt-0.5" />
                <div>
                  <h4 className="text-white text-lg font-normal mb-2">
                    Security Recommendation
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    This email address has been compromised in{" "}
                    {email.breachCount} known data{" "}
                    {email.breachCount === 1 ? "breach" : "breaches"}. The
                    sender may be targeted by phishing attacks. Exercise extreme
                    caution when responding to emails from this address and
                    verify the sender's identity through alternative channels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#232323] rounded-2xl p-8 border border-white/5">
            <div className="text-center max-w-2xl mx-auto">
              <ShieldCheck className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h3 className="text-white text-2xl font-normal mb-3">
                No Breaches Detected
              </h3>
              <p className="text-white/60 text-base leading-relaxed">
                Good news! This email address has not been found in any known
                data breaches. However, always remain vigilant and verify
                suspicious emails before taking action.
              </p>
            </div>
          </div>
        )}

        {/* About Section */}
        <div className="mt-8 bg-[#121212] rounded-2xl p-6 border border-white/5">
          <h4 className="text-white/60 text-xs uppercase tracking-wide mb-3">
            About HaveIBeenPwned
          </h4>
          <p className="text-white/80 text-sm leading-relaxed">
            HaveIBeenPwned is a free resource for checking if email addresses
            have been compromised in data breaches. The service aggregates
            breach data from thousands of sources to help users understand their
            exposure to security incidents.
          </p>
        </div>
      </div>
    </div>
  );
}
