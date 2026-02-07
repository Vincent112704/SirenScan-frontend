import {
  Shield,
  Mail,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import sirenScanLogo from "@/assets/SirenScanLogo.png";
import { LoginModal } from "@/app/components/LoginModal";
import BlurText from "@/app/components/BlurText";
import { FadeInOnScroll } from "@/app/components/FadeInOnScroll";
import Orb from "@/app/components/Orb";
import SpotlightCard from "@/app/components/SpotlightCard";
import { ScrollCurveLine } from "./ScrollCurveLine";
import { ProfileOrbitCard } from "./ProfileOrbitCard";

interface LandingPageProps {
  onNavigateToDashboard: () => void;
}

export function LandingPage({ onNavigateToDashboard }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const features = [
    {
      icon: Shield,
      title: "AI-Powered Detection",
      description:
        "Advanced machine learning model trained to identify phishing attempts with high accuracy.",
    },
    {
      icon: Mail,
      title: "VirusTotal Integration",
      description:
        "Scan emails against 90+ antivirus engines for comprehensive threat analysis.",
    },
    {
      icon: Sparkles,
      title: "Smart Summarization",
      description:
        "OpenAI-powered summaries provide clear, actionable insights about each email.",
    },
    {
      icon: CheckCircle,
      title: "Breach Detection",
      description:
        "Instantly check if your email has been compromised in known data breaches.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <ScrollCurveLine />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={sirenScanLogo}
                alt="SirenScan Logo"
                className="w-15 h-15 object-contain"
              />
              <span className="text-white text-xl font-normal -mt-3">
                SirenScan
              </span>
            </div>

            <div className="hidden md:flex items-center gap-10">
              <a
                href="#how-it-works"
                className="text-white/80 hover:text-white transition-colors"
              >
                How It Works
              </a>
              <a
                href="#features"
                className="text-white/80 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-white/80 hover:text-white transition-colors"
              >
                About
              </a>

              <button
                onClick={() => setLoginModalOpen(true)}
                className="px-6 py-2 rounded-xl border border-white/15 bg-[#0a0a0a] text-white text-sm font-medium transition-colors duration-200 hover:border-[#ff4d2e]/60 hover:bg-zinc-900"
              >
                Sign In
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[80vh] md:h-screen overflow-hidden">
        <div
          className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 85%, transparent 100%)",
          }}
        >
          <div className="w-full h-full transform scale-75 md:scale-95 translate-y-[-0%]">
            <Orb
              hoverIntensity={1.8}
              rotateOnHover
              hue={0}
              forceHoverState={false}
            />
          </div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center pointer-events-none">
          <div className="text-center px-6 max-w-5xl">
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              <BlurText
                text="The best way to catch"
                animateBy="words"
                direction="top"
                delay={200}
                className="block"
              />
              <BlurText
                text="     Phishing Threats."
                animateBy="words"
                direction="top"
                delay={200}
                className="block text-[#ff4d2e]"
              />
            </h1>
            <p className="mt-8 text-white/50 text-xl">
              Advanced AI protection for your digital identity.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        id="how-it-works"
        className="scroll-mt-24 py-20 px-6 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            {/* Removed text-glow-white */}
            <h2 className="text-white text-6xl font-bold mb-4">
              How SirenScan Works
            </h2>
            <p className="text-white/60 text-xl">
              Simple, fast, and effective protection in three steps
            </p>
          </div>

          <div className="relative flex flex-col gap-16 md:gap-0 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Forward Email",
                description:
                  "Simply forward any suspicious email to your unique SirenScan address.",
                alignment: "md:self-start md:mt-24 md:ml-12",
              },
              {
                step: "02",
                title: "AI Analysis",
                description:
                  "Our system analyzes the email using multiple detection engines and AI models.",
                alignment: "md:self-end md:mt-24 md:-ml-12",
              },
              {
                step: "03",
                title: "Get Results",
                description:
                  "Receive instant, detailed analysis with actionable recommendations.",
                alignment: "md:self-start md:mt-24 md:ml-12",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`relative w-full md:w-[45%] ${step.alignment}`}
              >
                <FadeInOnScroll delay={index * 0.15}>
                  <SpotlightCard className="home_feature_item_card w-full h-full flex flex-col items-start text-left rounded-3xl p-8 border border-white/10">
                    <div
                      className="w-16 h-16 bg-white/5 flex items-center justify-center mb-6 relative shrink-0"
                      style={{
                        clipPath:
                          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      }}
                    >
                      <div
                        className="absolute inset-0 border border-white/10"
                        style={{ clipPath: "inherit" }}
                      />
                      <span className="text-[#ff4d2e]/80 text-2xl font-bold">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-white/90 text-2xl font-semibold mb-4">
                      {step.title}
                    </h3>
                    <p className="text-zinc-500 text-base leading-relaxed">
                      {step.description}
                    </p>
                  </SpotlightCard>
                </FadeInOnScroll>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="scroll-mt-24 py-20 px-6 relative z-10">
        <div className="max-w-[90rem] mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-white text-6xl md:text-6xl font-bold mb-4">
                Comprehensive Threat Detection
              </h2>
              <p className="text-white/60 text-xl">
                Multiple layers of security working together to keep you safe
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {features.map((feature, index) => (
              <FadeInOnScroll
                key={index}
                delay={index * 0.1}
                className="h-full"
              >
                <SpotlightCard className="home_feature_item_card flex flex-col items-start justify-start text-left rounded-3xl h-full p-5 bg-[#0a0a0a]">
                  <div
                    className="w-14 h-14 bg-white/5 flex items-center justify-center mb-4 relative shrink-0"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                  >
                    <div
                      className="absolute inset-0 border border-white/10"
                      style={{ clipPath: "inherit" }}
                    />
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </SpotlightCard>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}

      <section id="about" className="scroll-mt-24 py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text Content */}
            <FadeInOnScroll>
              <div>
                <h2 className="block text-[#ff4d2e] text-5xl md:text-6xl font-bold mb-10">
                  About Us
                </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-4 text-justify">
                  SirenScan is a project developed by third-year Computer
                  Science students as part of our Software Engineering course.
                  We're a passionate team dedicated to creating practical
                  solutions that address real-world security challenges.
                </p>
                <p className="text-white/70 text-lg leading-relaxed mb-4 text-justify">
                  Through this project, we've combined our knowledge of machine
                  learning, web development, and cybersecurity to build an
                  intelligent email threat detection system. Our goal was to
                  create something that's not only technically sound but also
                  genuinely useful for protecting users from phishing attacks.
                </p>
                <p className="text-white/70 text-lg leading-relaxed text-justify">
                  This experience has taught us the importance of user-centered
                  design, security best practices, and collaborative
                  development. We're proud to present SirenScan as a testament
                  to what dedicated students can achieve.
                </p>
              </div>
            </FadeInOnScroll>

            {/* Right Side - Orbital System */}
            <FadeInOnScroll delay={0.2}>
              <div className="relative w-full aspect-square max-w-[540px] mx-auto flex items-center justify-center orbit-container">
                {/* Visual Ring Path */}
                <div className="absolute w-[75%] h-[75%] border border-white/5 rounded-full" />

                <div className="relative w-full h-full animate-orbit">
                  {/* Vincent - Top */}
                  <div className="absolute top-[12%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <ProfileOrbitCard
                      name="Vincent Paul Bacalso"
                      role="AI engineer / backend developer"
                      img="YOUR_IMAGE_PATH"
                      github="https://github.com/Vincent112704"
                      linkedin="https://www.linkedin.com/in/vincent-paul-bacalso-7b8291275/"
                    />
                  </div>

                  {/* Krishnan - Bottom Left */}
                  <div className="absolute top-[70%] left-[18%] -translate-x-1/2 -translate-y-1/2">
                    <ProfileOrbitCard
                      name="Krishnan Mahinay"
                      role="Cybersecurity Analyst"
                      img="YOUR_IMAGE_PATH"
                      github="https://github.com/kerokenn"
                      linkedin="https://www.linkedin.com/in/krishnan-mahinay/"
                    />
                  </div>

                  {/* Justine - Bottom Right */}
                  <div className="absolute top-[70%] right-[18%] translate-x-1/2 -translate-y-1/2">
                    <ProfileOrbitCard
                      name="Justine Wu"
                      role="Full Stack / UI UX Designer"
                      img="YOUR_IMAGE_PATH"
                      github="https://github.com/ScrappyCoco03"
                      linkedin="https://www.linkedin.com/in/justine-wu-1ab543379/"
                    />
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        id="cta-section"
        className="py-24 px-6 relative z-10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative box-border z-6">
            {[
              {
                pos: "-top-1.5 -left-0.5",
                clip: "polygon(0% 0%, 100% 0%, 0% 100%)",
              },
              {
                pos: "-top-1.5 -right-0.5",
                clip: "polygon(0% 0%, 100% 0%, 100% 100%)",
              },
              {
                pos: "-bottom-1.5 -left-0.5",
                clip: "polygon(0% 0%, 0% 100%, 100% 100%)",
              },
              {
                pos: "-bottom-1.5 -right-0.5",
                clip: "polygon(100% 0%, 100% 100%, 0% 100%)",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`absolute ${item.pos} w-5 h-5 bg-white z-20`}
                style={{ clipPath: item.clip }}
              />
            ))}

            <SpotlightCard className="home_feature_item_card relative items-center box-border flex flex-col justify-center text-center border px-4 py-32 border-solid border-white/10 rounded-3xl overflow-hidden md:p-32">
              <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center top, rgba(255, 77, 46, 0.15) 0%, rgba(255, 77, 46, 0.03) 45%, transparent 80%)`,
                }}
              />
              <div className="relative z-10 items-center box-border flex flex-col justify-center">
                <h2 className="box-border mb-6 md:mb-10">
                  <span className="text-4xl font-bold box-border leading-tight text-white md:text-[64px] md:leading-[1.1]">
                    Ready to secure <br />
                    <span className="block text-[#ff4d2e]">
                      your inbox.
                    </span>
                  </span>
                </h2>
                <div className="box-border mb-10 md:mb-14 max-w-2xl">
                  <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
                    Join thousands of users protecting themselves from phishing
                    attacks — completely free.
                  </p>
                </div>
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="flex items-center gap-x-2 px-8 py-4 rounded-xl border border-white/15 bg-black text-white font-medium text-lg transition-colors duration-200 hover:border-[#ff4d2e]/60 hover:bg-zinc-900/90"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      <footer className="py-6 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <img
              src={sirenScanLogo}
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-white text-lg -mt-1.5">SirenScan</span>
          </div>
          <p className="text-white/40 text-sm">
            © 2026 SirenScan. All rights reserved.
          </p>
        </div>
      </footer>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onNavigateToDashboard={onNavigateToDashboard}
      />
    </div>
  );
}
