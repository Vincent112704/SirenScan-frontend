import { ShieldAlert, Mail, Database, Sparkles, ChevronRight, Search, AlertCircle, CheckCircle2 } from "lucide-react";
import { AccountHeader } from "@/app/components/AccountHeader";
import SpotlightCard from '@/app/components/SpotlightCard'; // Adjust path if necessary

export function Help({ onLogout, onOpenMobileMenu }: { onLogout: () => void; onOpenMobileMenu: () => void }) {
  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Mail,
      content: [
        {
          title: "How to Forward Suspicious Emails",
          steps: [
            "Open the suspicious email in your email client",
            "Forward the email to SirenScan's analysis address",
            "Wait for the analysis to complete (usually takes a few seconds)",
            "Check your SirenScan dashboard for detailed results"
          ],
          tip: "You can forward multiple emails at once. Each will be analyzed separately and appear in your dashboard."
        }
      ]
    },
    {
      id: "dashboard",
      title: "Understanding Your Dashboard",
      icon: Search,
      content: [
        {
          title: "Email Selection",
          steps: [
            "Click the search bar at the top of your dashboard",
            "Browse through all forwarded emails in the popup",
            "Select any email to view its detailed analysis",
            "Emails are marked with threat status (Clean or Threat)"
          ]
        }
      ]
    },
    {
      id: "metrics",
      title: "Understanding the Metrics",
      icon: ShieldAlert,
      content: [
        {
          title: "Phishing Detection",
          description: "Our pre-trained AI model analyzes email content, sender information, and patterns to detect phishing attempts.",
          indicators: [
            { label: "Threat Detected", color: "text-[#ff4d2e]", meaning: "Email exhibits phishing characteristics" },
            { label: "Clean", color: "text-green-500", meaning: "No phishing indicators found" }
          ]
        },
        {
          title: "VirusTotal Analysis",
          description: "Integrates with VirusTotal API to scan URLs and attachments against 90+ security engines.",
          indicators: [
            { label: "Clean Engines", color: "text-green-500", meaning: "Number of engines that found no threats" },
            { label: "Threat Engines", color: "text-[#ff4d2e]", meaning: "Number of engines that detected threats" }
          ],
          tip: "Even legitimate emails may show 1-2 threat detections (false positives). Look for patterns above 10% detection rate."
        },
        {
          title: "HaveIBeenPwned",
          description: "Checks if the sender's email address has been compromised in known data breaches.",
          indicators: [
            { label: "0 Breaches", color: "text-green-500", meaning: "Email not found in breach databases" },
            { label: "1+ Breaches", color: "text-[#ff4d2e]", meaning: "Email was exposed in data breaches" }
          ],
          tip: "Compromised emails are often used by scammers. High breach counts indicate the sender may be impersonated."
        },
        {
          title: "OpenAI Summarizer",
          description: "AI-powered analysis that provides a human-readable summary of all findings and actionable recommendations.",
          features: [
            "Contextual analysis of all security metrics",
            "Plain-language explanation of threats",
            "Specific recommendations for each email",
            "Key indicators summary for quick reference"
          ]
        }
      ]
    },
    {
      id: "best-practices",
      title: "Security Best Practices",
      icon: CheckCircle2,
      content: [
        {
          title: "Red Flags to Watch For",
          warnings: [
            "Urgent language demanding immediate action",
            "Mismatched or suspicious sender domains (e.g., paypa1.com instead of paypal.com)",
            "Requests for personal information, passwords, or payment details",
            "Poor grammar, spelling errors, or unusual formatting",
            "Unexpected attachments or download links",
            "Offers that seem too good to be true"
          ]
        },
        {
          title: "What to Do if Threat is Detected",
          actions: [
            "Do not click any links in the email",
            "Do not download any attachments",
            "Do not reply to the sender",
            "Delete the email from your inbox",
            "Report it to your email provider as spam/phishing",
            "If it impersonates a company, forward it to their official security team"
          ]
        },
        {
          title: "Even with Clean Results",
          advice: [
            "Verify sender identity through official channels",
            "Hover over links to check actual URLs before clicking",
            "Be cautious with unexpected emails, even from known contacts",
            "Trust your instincts - if something feels off, investigate further"
          ]
        }
      ]
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#1c1c1e] relative">
      <AccountHeader onLogout={onLogout} onOpenMobileMenu={onOpenMobileMenu} />
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-white text-4xl sm:text-5xl font-normal mb-4">Help Center</h1>
          <p className="text-white/60 text-base sm:text-lg">
            Learn how to use SirenScan to protect yourself from phishing attacks and email threats
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="bg-[#232323] rounded-xl p-4 hover:bg-[#2a2a2a] transition-all border border-white/5 group"
              >
                <Icon className="w-6 h-6 text-[#ff4d2e] mb-2" />
                <p className="text-white text-sm group-hover:text-[#ff4d2e] transition-colors">
                  {section.title}
                </p>
              </a>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.id} id={section.id} className="scroll-mt-8">
                <div className="bg-[#121212] rounded-2xl p-8 border border-white/5">
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-[#ff4d2e]/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#ff4d2e]" />
                    </div>
                    <h2 className="text-white text-2xl font-normal">{section.title}</h2>
                  </div>

                  {/* Section Content */}
                  <div className="space-y-8">
                    {section.content.map((item, idx) => (
                      <div key={idx}>
                        {item.title && (
                          <h3 className="text-white text-xl font-normal mb-4">{item.title}</h3>
                        )}

                        {item.description && (
                          <p className="text-white/70 text-base mb-4 leading-relaxed">
                            {item.description}
                          </p>
                        )}

                        {/* Steps */}
                        {item.steps && (
                          <div className="space-y-3 mb-4">
                            {item.steps.map((step, stepIdx) => (
                              <div key={stepIdx} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#ff4d2e]/20 flex items-center justify-center shrink-0 mt-0.5">
                                  <span className="text-[#ff4d2e] text-sm font-medium">
                                    {stepIdx + 1}
                                  </span>
                                </div>
                                <p className="text-white/80 text-base">{step}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Indicators */}
                        {item.indicators && (
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            {item.indicators.map((indicator, indIdx) => (
                              <div key={indIdx} className="bg-[#232323] rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className={`w-2 h-2 rounded-full ${indicator.color.replace('text-', 'bg-')}`} />
                                  <p className={`${indicator.color} font-medium text-sm`}>
                                    {indicator.label}
                                  </p>
                                </div>
                                <p className="text-white/60 text-sm">{indicator.meaning}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Features */}
                        {item.features && (
                          <div className="space-y-2 mb-4">
                            {item.features.map((feature, featIdx) => (
                              <div key={featIdx} className="flex items-start gap-3">
                                <ChevronRight className="w-5 h-5 text-[#ff4d2e] shrink-0 mt-0.5" />
                                <p className="text-white/80 text-base">{feature}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Warnings */}
                        {item.warnings && (
                          <div className="space-y-2 mb-4">
                            {item.warnings.map((warning, warnIdx) => (
                              <div key={warnIdx} className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-[#ff4d2e] shrink-0 mt-0.5" />
                                <p className="text-white/80 text-base">{warning}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Actions */}
                        {item.actions && (
                          <div className="space-y-3 mb-4">
                            {item.actions.map((action, actIdx) => (
                              <div key={actIdx} className="flex items-start gap-3 bg-[#232323] rounded-lg p-3">
                                <div className="w-6 h-6 rounded-full bg-[#ff4d2e] flex items-center justify-center shrink-0 mt-0.5">
                                  <span className="text-white text-xs font-medium">
                                    {actIdx + 1}
                                  </span>
                                </div>
                                <p className="text-white/80 text-base">{action}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Advice */}
                        {item.advice && (
                          <div className="space-y-2 mb-4">
                            {item.advice.map((tip, tipIdx) => (
                              <div key={tipIdx} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <p className="text-white/80 text-base">{tip}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tip */}
                        {item.tip && (
                          <div className="bg-[#ff4d2e]/10 border border-[#ff4d2e]/20 rounded-lg p-4 mt-4">
                            <div className="flex items-start gap-3">
                              <Sparkles className="w-5 h-5 text-[#ff4d2e] shrink-0 mt-0.5" />
                              <div>
                                <p className="text-[#ff4d2e] text-sm font-medium mb-1">Pro Tip</p>
                                <p className="text-white/80 text-sm">{item.tip}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA - Styled exactly like the Feature Cards */}
        <div className="mt-16">
          <SpotlightCard className="home_feature_item_card flex flex-col items-center text-center rounded-3xl p-10 border border-white/5">
            
            {/* Hexagon Icon Wrapper (Matching Feature Card Style) */}
            <div 
              className="w-14 h-14 bg-[#ff4d2e]/10 flex items-center justify-center mb-6 relative shrink-0"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            >
              <div className="absolute inset-0 border border-[#ff4d2e]/30" style={{ clipPath: "inherit" }} />
              <AlertCircle className="w-6 h-6 text-[#ff4d2e]" />
            </div>

            {/* Title with White Glow */}
            <h3 className="text-white text-2xl font-semibold mb-4 text-glow-white">
              Still Need Help?
            </h3>

            {/* Description */}
            <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-lg">
              SirenScan is completely free with no paid features. Forward suspicious emails to start protecting your inbox today.
            </p>

            {/* Contact Action */}
            <a 
              href="mailto:support@sirenscan.com"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
            >
              <Mail className="w-4 h-4 text-[#ff4d2e]" />
              <span className="text-sm font-medium">support@sirenscan.com</span>
            </a>
            
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}