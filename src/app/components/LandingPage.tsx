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
import { ScrollCurveLine } from "./ScrollCurveLine";
import TiltedCard from './TiltedCard'; 

interface LandingPageProps {
  onNavigateToDashboard: () => void;
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
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</a>
              
              <button
                onClick={() => setLoginModalOpen(true)}
                className="relative items-center box-border flex justify-center overflow-hidden p-[1px] rounded-xl group transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,77,46,0.2)]"
              >
                <div className="relative bg-[#0a0a0a] px-6 py-2 rounded-xl z-[1] transition-all duration-300 group-hover:bg-zinc-900">
                  <span className="text-white text-sm font-medium">Sign In</span>
                </div>
                <div className="absolute aspect-square bg-[conic-gradient(from_0deg,transparent_120deg,#ff4d2e_180deg,transparent_240deg)] w-[200%] animate-[spin_3s_linear_infinite]" />
              </button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[80vh] md:h-screen overflow-hidden"> 
        <div 
          className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
          style={{
            maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          }}
        >
          {/* Adjusted scale to 75% and added a slight top offset to keep it behind the text */}
          <div className="w-full h-full transform scale-75 md:scale-95 translate-y-[-0%]">
            <Orb hoverIntensity={1.8} rotateOnHover hue={0} forceHoverState={false} />
          </div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center pointer-events-none">
          <div className="text-center px-6 max-w-5xl">
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              <BlurText text="The best way to catch" animateBy="words" direction="top" delay={200} className="block" />
              <BlurText text="     Phishing Threats." animateBy="words" direction="top" delay={200} className="block text-glow-orange-animate" />
            </h1>
            <p className="mt-8 text-white/50 text-xl">Advanced AI protection for your digital identity.</p>
          </div>
        </div>
      </section>

     {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="scroll-mt-24 py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-white text-7xl font-bold mb-4">How SirenScan Works</h2>
            <p className="text-white/60 text-xl">Simple, fast, and effective protection in three steps</p>
          </div>
          
          <div className="relative flex flex-col gap-16 md:gap-0 max-w-6xl mx-auto">
            {[
              { 
                step: "01", 
                title: "Forward Email", 
                description: "Simply forward any suspicious email to your unique SirenScan address.",
                alignment: "md:self-start md:mt-24 md:ml-12"
              },
              { 
                step: "02", 
                title: "AI Analysis", 
                description: "Our system analyzes the email using multiple detection engines and AI models.",
                alignment: "md:self-end md:mt-24 md:-ml-12"
              },
              { 
                step: "03", 
                title: "Get Results", 
                description: "Receive instant, detailed analysis with actionable recommendations.",
                alignment: "md:self-start md:mt-24 md:ml-12"
              },
            ].map((step, index) => (
              <div key={index} className={`relative w-full md:w-[45%] ${step.alignment}`}>
                <FadeInOnScroll delay={index * 0.15}>
                  <TiltedCard
                    imageSrc=""
                    altText=""
                    containerHeight="320px"
                    containerWidth="100%"
                    rotateAmplitude={10}
                    scaleOnHover={1.03}
                    showTooltip={false}
                    displayOverlayContent
                    overlayContent={
                      <SpotlightCard className="home_feature_item_card w-full h-full flex flex-col items-start text-left rounded-3xl p-8">
                        <div 
                          className="w-16 h-16 bg-white/5 flex items-center justify-center mb-6 relative shrink-0"
                          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                        >
                          <div className="absolute inset-0 border border-[#ff4d2e]/30" style={{ clipPath: "inherit" }} />
                          <span className="text-[#ff4d2e] text-2xl font-bold text-glow-orange">{step.step}</span>
                        </div>
                        <h3 className="text-white text-2xl font-semibold mb-4 text-glow-white">{step.title}</h3>
                        <p className="text-zinc-400 text-base leading-relaxed">{step.description}</p>
                      </SpotlightCard>
                    }
                  />
                </FadeInOnScroll>
              </div>
            ))}
          </div>
        </div>
      </section>

      /* --- FEATURES SECTION --- */
      <section id="features" className="scroll-mt-24 py-20 px-6 relative z-10">
        <div className="max-w-[90rem] mx-auto"> {/* Increased max-width to give the 4-column row more breathing room */}
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-white text-6xl md:text-7xl font-bold mb-4">Comprehensive Threat Detection</h2>
              <p className="text-white/60 text-xl">Multiple layers of security working together to keep you safe</p>
            </div>
          </FadeInOnScroll>

          {/* Set to grid-cols-4 for desktop to force a single row */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {features.map((feature, index) => (
              <FadeInOnScroll key={index} delay={index * 0.1} className="h-full">
                <TiltedCard
                  imageSrc=""
                  altText=""
                  containerHeight="350px" // Adjusted height for 4-column balance
                  containerWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  showTooltip={false}
                  displayOverlayContent
                  overlayContent={
                    <SpotlightCard className="home_feature_item_card flex flex-col items-start justify-start text-left rounded-3xl h-full p-7 bg-[#0a0a0a]">
                      <div 
                        className="w-16 h-16 bg-white/5 flex items-center justify-center mb-6 relative shrink-0"
                        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                      >
                        <div className="absolute inset-0 border border-white/10" style={{ clipPath: "inherit" }} />
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      {/* Optimized font sizes for 4-column layout */}
                      <h3 className="text-white text-2xl font-bold mb-3 text-glow-white leading-tight">
                        {feature.title}
                      </h3>
                      
                      <p className="text-zinc-400 text-md leading-relaxed">
                        {feature.description}
                      </p>
                    </SpotlightCard>
                  }
                />
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="cta-section" className="py-24 px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative box-border z-6">
            {[
              "-top-1.5 -left-0.5",
              "-top-1.5 -right-0.5",
              "-bottom-1.5 -left-0.5",
              "-bottom-1.5 -right-0.5",
            ].map((position, index) => (
              <div
                key={index}
                className={`absolute ${position} w-5 h-5 bg-white z-20 shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              />
            ))}

            <SpotlightCard className="home_feature_item_card relative items-center box-border flex flex-col justify-center text-center border px-4 py-32 border-solid border-white/10 rounded-3xl overflow-hidden md:p-32">
              <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: `radial-gradient(circle at center top, rgba(255, 77, 46, 0.15) 0%, rgba(255, 77, 46, 0.03) 45%, transparent 80%)` }} />
              <div className="relative z-10 items-center box-border flex flex-col justify-center">
                <h2 className="box-border mb-6 md:mb-10">
                  <span className="text-4xl font-bold box-border leading-tight text-white md:text-[64px] md:leading-[1.1]">
                    Ready to secure <br />
                    <span className="block text-glow-orange-animate" >your inbox.</span>
                  </span>
                </h2>
                <div className="box-border mb-10 md:mb-14 max-w-2xl">
                  <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">Join thousands of users protecting themselves from phishing attacks — completely free.</p>
                </div>
                <button onClick={() => setLoginModalOpen(true)} className="relative items-center box-border flex justify-center max-w-full overflow-hidden p-[1px] rounded-xl group transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,77,46,0.3)]">
                  <div className="relative items-center bg-black box-border gap-x-2 flex z-[1] px-8 py-4 rounded-xl transition-all duration-300 group-hover:bg-zinc-900/90">
                    <span className="relative text-white font-medium text-lg transition-transform duration-300 group-hover:translate-x-[-2px]">Get Started Now</span>
                    <ArrowRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <div className="absolute aspect-square bg-[conic-gradient(from_0deg,transparent_120deg,#ff4d2e_180deg,transparent_240deg)] w-[200%] animate-[spin_3s_linear_infinite]" />
                </button>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      <footer className="py-6 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <img src={sirenScanLogo} alt="Logo" className="w-10 h-10 object-contain" />
            <span className="text-white text-lg -mt-1.5">SirenScan</span>
          </div>
          <p className="text-white/40 text-sm">© 2026 SirenScan. All rights reserved.</p>
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