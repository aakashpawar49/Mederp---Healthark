import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck, ArrowRight, PlayCircle, Lock, 
  CheckCircle2, Star, Zap, ChevronRight
} from "lucide-react";
import Footer from "../components/Footer";

// --- 1. Animation Wrapper Component ---
const RevealOnScroll = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        scrollObserver.unobserve(entry.target);
      }
    }, { threshold: 0.1 }); // Trigger when 10% visible

    if (ref.current) {
      scrollObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) scrollObserver.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref} className={`reveal-hidden ${isVisible ? 'reveal-visible' : ''}`}>
      {children}
    </div>
  );
};

export default function LandingPage() {
  return (
    <div className="font-sans text-gray-900 bg-white overflow-x-hidden selection:bg-blue-100 selection:text-[#0F2146]">

      {/* ================= NAV BAR (BLUR EFFECT ADDED) ================= */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#0F2146] p-2.5 rounded-xl shadow-lg shadow-blue-900/10 hover:scale-105 transition-transform">
              <span className="text-white font-bold text-2xl">🏥</span>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#0F2146] tracking-tight leading-none">MedERP</h1>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                By Healthark
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-bold text-[#0F2146] uppercase tracking-wide">
            <a href="#vision" className="hover:text-blue-600 transition-colors relative group">
              Vision
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#clinical" className="hover:text-blue-600 transition-colors relative group">
              Clinical
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#operations" className="hover:text-blue-600 transition-colors relative group">
              Operations
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-[#0F2146] hover:text-blue-700 transition-colors">
              Sign In
            </Link>
            <button className="bg-[#0F2146] text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/20 hover:scale-105 hover:shadow-blue-900/30">
              Book Demo
            </button>
          </div>
        </div>
      </nav>

      {/* ================= SECTION 1: CINEMATIC HERO ================= */}
      <header className="relative pt-40 pb-32 lg:pt-56 lg:pb-40 overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-6 relative z-10">
          <RevealOnScroll>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full text-blue-700 text-xs font-extrabold uppercase tracking-widest mb-8">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                v2.5 Enterprise Edition
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-[#0F2146] leading-[1.05] mb-8 drop-shadow-sm">
                Orchestrating <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Care & Commerce.
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mb-12 font-medium">
                We don't just digitize records. We build the <span className="text-[#0F2146] font-bold underline decoration-blue-300 decoration-4 underline-offset-4">central nervous system</span> for modern hospitals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <Link to="/register" className="flex items-center justify-center gap-3 bg-[#0F2146] text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-blue-900 transition-all shadow-2xl shadow-blue-900/30 hover:-translate-y-1">
                  Start Enterprise Trial <ArrowRight size={20} />
                </Link>
                <button className="flex items-center justify-center gap-3 bg-white text-[#0F2146] border-2 border-[#0F2146]/10 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-blue-50 hover:border-[#0F2146]/30 transition-all">
                  <PlayCircle size={20} /> Watch The Film
                </button>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 -z-10 w-[60vw] h-[100vh] bg-gradient-to-b from-blue-50/50 to-white opacity-80 rounded-bl-[10rem]"></div>
      </header>


      {/* ================= SECTION 2: THE NEW STANDARD ================= */}
      <section id="vision" className="py-32 border-t border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
              <h2 className="text-5xl lg:text-7xl font-black text-[#0F2146] tracking-tight leading-[0.9]">
                The End of <br/> Fragmented <br/> <span className="text-gray-300">Healthcare.</span>
              </h2>
              <div className="space-y-6">
                <p className="text-xl text-gray-600 font-medium leading-relaxed">
                  Hospital administrators often juggle 5-7 different software tools daily. This fragmentation bleeds revenue and endangers patient data.
                </p>
                <p className="text-xl text-[#0F2146] font-bold leading-relaxed border-l-4 border-blue-600 pl-6">
                  MedERP unifies these silos into a single, synchronized source of truth. One login. One database.
                </p>
              </div>
            </div>

            {/* LARGE IMAGE BREAK */}
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/20 aspect-[16/7] group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                alt="Hospital Corridor" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2146]/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 lg:bottom-16 lg:left-16 text-white max-w-xl transition-transform duration-500 group-hover:-translate-y-2">
                <p className="uppercase tracking-widest text-sm font-bold text-blue-300 mb-2">Case Study</p>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">Apollo Hospitals cut patient wait times by 40% in 3 months.</h3>
                <span className="flex items-center gap-2 font-bold hover:text-blue-300 transition-colors">Read the full story <ArrowRight size={18}/></span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>


      {/* ================= SECTION 3: CLINICAL EXCELLENCE ================= */}
      <section id="clinical" className="py-32 bg-[#0F2146] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <RevealOnScroll>
            {/* Row 1: Text Left, Image Right */}
            <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
              <div>
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30">
                  <Star className="text-white w-8 h-8" />
                </div>
                <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
                  Clinical Precision <br/> at <span className="text-blue-400">Light Speed.</span>
                </h2>
                <div className="space-y-8 text-lg text-blue-100">
                  <p>
                    Doctors shouldn't spend 20 minutes clicking buttons. Our <strong>Smart EMR</strong> is designed by clinicians for clinicians.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                      <div>
                        <strong className="text-white block">AI-Assisted Diagnostics</strong>
                        Suggests ICD-10 codes and flags potential drug interactions in real-time.
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                      <div>
                        <strong className="text-white block">Voice-to-Text Vitals</strong>
                        Nurses can dictate vitals directly into the tablet, updating charts instantly.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40"></div>
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Doctor Tablet" 
                  className="relative rounded-3xl border border-white/10 shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            {/* Row 2: Image Left, Text Right */}
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="relative order-2 lg:order-1 group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-400 rounded-3xl opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Surgery Room" 
                  className="relative rounded-3xl border border-white/10 shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-500/30">
                  <Zap className="text-white w-8 h-8" />
                </div>
                <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
                  Operational <br/> <span className="text-purple-400">Clarity.</span>
                </h2>
                <div className="space-y-8 text-lg text-purple-100">
                  <p>
                    From the basement inventory to the rooftop helipad, track every asset, dollar, and pill in motion.
                  </p>
                  <div className="pl-6 border-l-2 border-purple-500/50 space-y-6">
                    <div>
                      <h4 className="text-white font-bold text-xl">99.9% Stock Accuracy</h4>
                      <p className="text-sm mt-2 opacity-80">Automated purchase orders trigger before stock hits critical levels.</p>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xl">Zero Revenue Leakage</h4>
                      <p className="text-sm mt-2 opacity-80">Every gauze pad used in OT is automatically billed to the patient dossier.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

        </div>
      </section>


      {/* ================= SECTION 4: MASSIVE PRICING CARDS ================= */}
      <section id="pricing" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <div className="mb-20">
              <h2 className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-4">Transparent Investment</h2>
              <h3 className="text-5xl lg:text-6xl font-black text-[#0F2146]">Plans that Scale.</h3>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              
              {/* Card 1: Professional */}
              <div className="bg-white p-12 lg:p-16 rounded-[2.5rem] shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h4 className="text-3xl font-black text-[#0F2146] mb-2">Professional</h4>
                    <p className="text-gray-500 font-medium">For growing clinics & hospitals.</p>
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold text-sm uppercase">
                    Most Popular
                  </div>
                </div>
                
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-6xl lg:text-7xl font-black text-[#0F2146]">₹ 14,999</span>
                  <span className="text-xl text-gray-400 font-medium">/ month</span>
                </div>

                <p className="text-gray-600 mb-10 leading-relaxed">
                  Everything you need to modernize your facility. Includes full OPD, IPD, and Pharmacy modules.
                </p>

                <ul className="space-y-6 mb-12">
                  {[
                    "Up to 15 Doctor Accounts",
                    "Unlimited Patient Records",
                    "Smart OPD & Queue Management",
                    "Pharmacy Inventory & POS",
                    "Lab Reporting Module (LIS)",
                    "Email Support (24h response)"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-4 text-lg text-gray-700 font-medium">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-[#0F2146] text-white py-6 rounded-2xl text-xl font-bold hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/10 group-hover:scale-[1.02]">
                  Start 14-Day Free Trial
                </button>
              </div>

              {/* Card 2: Enterprise */}
              <div className="bg-[#0F2146] p-12 lg:p-16 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h4 className="text-3xl font-black text-white mb-2">Enterprise</h4>
                      <p className="text-blue-200 font-medium">For multi-specialty chains.</p>
                    </div>
                    <div className="bg-white/10 text-white px-4 py-2 rounded-lg font-bold text-sm uppercase backdrop-blur-md">
                      Unlimited
                    </div>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-10">
                    <span className="text-6xl lg:text-7xl font-black text-white">Custom</span>
                  </div>

                  <p className="text-blue-100 mb-10 leading-relaxed">
                    Full-scale ERP customization with dedicated infrastructure and API access.
                  </p>

                  <ul className="space-y-6 mb-12">
                    {[
                      "Unlimited Doctor & Staff Accounts",
                      "Multi-Branch Architecture",
                      "Custom API Integrations (SAP/Oracle)",
                      "Dedicated Customer Success Manager",
                      "On-Premise Deployment Option",
                      "24/7 Priority Phone Support"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-4 text-lg text-white font-medium">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0">
                          <CheckCircle2 size={14} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full bg-white text-[#0F2146] py-6 rounded-2xl text-xl font-bold hover:bg-blue-50 transition-all shadow-xl group-hover:scale-[1.02]">
                    Contact Sales Team
                  </button>
                </div>
              </div>

            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ================= SECTION 5: FINAL CALL TO ACTION ================= */}
      <section className="py-32 bg-white relative overflow-hidden">
         <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <RevealOnScroll>
            <h2 className="text-6xl lg:text-8xl font-black text-[#0F2146] mb-10 tracking-tighter">
              Ready to <br/> <span className="text-blue-600">Transform?</span>
            </h2>
            <p className="text-2xl text-gray-500 mb-16 max-w-3xl mx-auto font-medium">
              Join 500+ forward-thinking hospitals. Replace chaos with clarity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/register" className="group bg-[#0F2146] text-white px-12 py-6 rounded-2xl text-xl font-bold hover:bg-blue-900 transition-all shadow-2xl hover:shadow-blue-900/40 hover:-translate-y-1 flex items-center gap-3">
                Get Started Now <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="mt-12 flex justify-center gap-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
              <span className="flex items-center gap-2"><ShieldCheck size={16}/> Secure</span>
              <span className="flex items-center gap-2"><Lock size={16}/> Encrypted</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16}/> Compliant</span>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />

    </div>
  );
}