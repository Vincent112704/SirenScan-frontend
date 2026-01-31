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
import Orb from '@/app/components/Orb';
import SpotlightCard from '@/app/components/SpotlightCard';


interface LandingPageProps {
  onNavigateToDashboard: () => void;
}

interface FadeInOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}


export function LandingPage({
  onNavigateToDashboard,
}: LandingPageProps) {
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

  const stats = [
    { value: "99.8%", label: "Detection Rate" },
    { value: "1M+", label: "Emails Analyzed" },
    { value: "<1s", label: "Analysis Time" },
    { value: "24/7", label: "Protection" },
  ];

  const handleAnimationComplete = () => {
  console.log('Animation completed!');
  };

  const [showSplitText, setShowSplitText] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
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

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-10">
              <a
                href="#features"
                className="text-white/80 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-white/80 hover:text-white transition-colors"
              >
                How It Works
              </a>
              <button
                onClick={() => setLoginModalOpen(true)}
                className="relative px-6 py-2.5 bg-transparent text-white rounded-lg border border-white/20 overflow-hidden transition-all duration-300 hover:text-white hover:bg-linear-to-r hover:from-[#ff4d2e] hover:to-[#ff3d1e]"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const glow = e.currentTarget.querySelector<HTMLSpanElement>('.glow');
                  if (glow) {
                    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,77,46,0.5), transparent 80%)`;
                  }
                }}
                onMouseLeave={(e) => {
                  const glow = e.currentTarget.querySelector<HTMLSpanElement>('.glow');
                  if (glow) glow.style.background = `transparent`;
                }}
              >
                <span className="glow absolute inset-0 pointer-events-none rounded-lg transition-all duration-300 animate-liquidGlow"></span>
                Sign In
              </button>
            </div>

            {/* Mobile Menu Button */}
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

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 space-y-3">
              <a
                href="#features"
                className="block text-white/80 hover:text-white transition-colors py-2"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block text-white/80 hover:text-white transition-colors py-2"
              >
                How It Works
              </a>
              <button
                onClick={() => setLoginModalOpen(true)}
                className="relative w-full px-6 py-2.5 bg-transparent text-white rounded-lg border border-white/20 overflow-hidden transition-all duration-300 hover:text-white hover:bg-linear-to-r hover:from-[#ff4d2e] hover:to-[#ff3d1e]"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const glow = e.currentTarget.querySelector<HTMLSpanElement>('.glow');
                  if (glow) {
                    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,77,46,0.5), transparent 80%)`;
                  }
                }}
                onMouseLeave={(e) => {
                  const glow = e.currentTarget.querySelector<HTMLSpanElement>('.glow');
                  if (glow) glow.style.background = `transparent`;
                }}
              >
                <span className="glow absolute inset-0 pointer-events-none rounded-lg transition-all duration-300 animate-liquidGlow"></span>
                Sign In
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* HERO SECTION — REACT BITS STRUCTURE */}
      <section className="relative h-screen overflow-hidden">

        {/* ORB BACKGROUND (RECEIVES HOVER) */}
        <div className="absolute inset-0 z-0 scale-115">
          <Orb
            hoverIntensity={1.8}
            rotateOnHover
            hue={0}
            forceHoverState={false}
          />
        </div>

        {/* CONTENT (DOES NOT BLOCK ORB) */}
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
                className="block text-glow-orange-animate"
              />
            </h1>

            <p className="mt-8 text-white/50 text-xl">
              Advanced AI protection for your digital identity.
            </p>
          </div>
        </div>
      </section>


      {/* Features Section */}
        <section
          id="features"
          className="scroll-mt-24 py-20 px-6 relative z-10" // Changed scroll-pt to scroll-mt
        >
          <div className="max-w-7xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-white text-4xl font-bold mb-4">
                Comprehensive Threat Detection
              </h2>
              <p className="text-white/60 text-lg">
                Multiple layers of security working together to keep you safe
              </p>
            </div>
          </FadeInOnScroll>


         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {features.map((feature, index) => (
            <FadeInOnScroll key={index} delay={index * 0.1}>
              <SpotlightCard
                className="custom-spotlight-card relative h-full flex flex-col items-center text-center p-6 rounded-2xl"
              >
                <div className="w-12 h-12 bg-[#ff4d2e]/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#ff4d2e]" />
                </div>

                <h3 className="text-white text-lg font-medium mb-2">
                  {feature.title}
                </h3>

                <p className="text-white/60 text-sm leading-relaxed mt-auto">
                  {feature.description}
                </p>
              </SpotlightCard>
            </FadeInOnScroll>
          ))}
        </div>
        </div>
      </section>

      {/* How It Works Section */}
        <section
          id="how-it-works"
          className="scroll-mt-24 py-20 px-6 relative z-10"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-white text-4xl font-bold mb-4">
                How SirenScan Works
              </h2>
              <p className="text-white/60 text-lg">
                Simple, fast, and effective protection in three steps
              </p>
            </div>

            {/* Added relative here to anchor the absolute arrows */}
            <div className="relative grid md:grid-cols-3 gap-8 items-stretch">
              {[
                {
                  step: "01",
                  title: "Forward Email",
                  description:
                    "Simply forward any suspicious email to your unique SirenScan address.",
                },
                {
                  step: "02",
                  title: "AI Analysis",
                  description:
                    "Our system analyzes the email using multiple detection engines and AI models.",
                },
                {
                  step: "03",
                  title: "Get Results",
                  description:
                    "Receive instant, detailed analysis with actionable recommendations.",
                },
              ].map((step, index) => (
                <div key={index} className="relative flex flex-col items-center">

                  {/* Only pass animation-related props to FadeInOnScroll */}
                  <FadeInOnScroll delay={index * 0.15}>
                    <SpotlightCard
                      // Consolidated & cleaned up className
                      className="custom-spotlight-card h-full w-full flex flex-col items-center text-center p-8 rounded-2xl"
                    >
                      <p className="text-[#ff4d2e] text-5xl font-bold mb-4">{step.step}</p>
                      <h3 className="text-white text-xl font-medium mb-3">{step.title}</h3>
                      <p className="text-white/60 leading-relaxed mt-auto">
                        {step.description}
                      </p>
                    </SpotlightCard>
                  </FadeInOnScroll>

                  {/* Arrow - only on large screens between steps */}
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                      <ArrowRight className="w-8 h-8 text-[#ff4d2e] opacity-50" />
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        </section>
      
      {/* CTA Section */}
      <section className="py-10 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SpotlightCard
            className="
              custom-spotlight-card
              relative
              h-full
              flex
              flex-col
              items-center
              text-center
              p-12
              rounded-3xl
            "
          >
            <h2 className="text-white text-4xl font-bold mb-4">
              Ready to Secure Your Inbox?
            </h2>

            <p className="text-white/60 text-lg mb-8">
              Join thousands of users protecting themselves from phishing attacks — completely free
            </p>

            <button
              onClick={() => setLoginModalOpen(true)}
              className="
                px-8 py-4
                bg-[#ff4d2e]
                hover:bg-[#ff3d1e]
                text-white
                rounded-xl
                transition-all
                font-medium
                text-lg
              "
            >
              Get Started Now
            </button>
          </SpotlightCard>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-6 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <img
                src={sirenScanLogo}
                alt="SirenScan Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-white text-lg -mt-1.5">
                SirenScan
              </span>
            </div>
            <p className="text-white/40 text-sm">
              © 2026 SirenScan. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onNavigateToDashboard={onNavigateToDashboard}
      />
    </div>
  );
}
