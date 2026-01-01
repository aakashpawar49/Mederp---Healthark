import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login & Signup
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Mock Login Handler
  const handleAuth = (e) => {
    e.preventDefault();
    // In a real app, you would call your API here.
    // For demo, we just redirect to Dashboard.
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-blue-100 selection:text-[#0F2146]">
      
      {/* ================= LEFT SIDE: BRANDING (Hidden on Mobile) ================= */}
      <div className="hidden lg:flex w-1/2 bg-[#0F2146] relative overflow-hidden flex-col justify-between p-16 text-white">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        
        {/* Logo Area */}
        <div className="relative z-10 flex items-center gap-3">
           <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/10">
              <span className="text-2xl">🏥</span>
           </div>
           <div>
             <h1 className="text-xl font-bold tracking-tight">MedERP</h1>
             <p className="text-[10px] uppercase tracking-widest text-blue-200 font-bold">By Healthark</p>
           </div>
        </div>

        {/* Testimonial / Value Prop */}
        <div className="relative z-10 max-w-lg">
          <div className="mb-8 text-blue-400">
            <ShieldCheck size={48} />
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Secure, Intelligent <br/> Hospital Management.
          </h2>
          <p className="text-lg text-blue-100/80 leading-relaxed mb-8">
            "MedERP has transformed how we manage patient data. The clinical precision and operational clarity are unmatched in the industry."
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-10 h-10 rounded-full border-2 border-[#0F2146]" alt="User" />
              <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-10 h-10 rounded-full border-2 border-[#0F2146]" alt="User" />
              <img src="https://randomuser.me/api/portraits/women/68.jpg" className="w-10 h-10 rounded-full border-2 border-[#0F2146]" alt="User" />
            </div>
            <div className="text-sm">
              <p className="font-bold text-white">Trusted by 500+ Doctors</p>
              <div className="flex text-yellow-400 text-xs">★★★★★</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-blue-200/60 flex justify-between">
          <p>&copy; 2025 Healthark Insights.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE: FORM ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative">
        <div className="max-w-md w-full">
          
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
             <div className="bg-[#0F2146] p-2 rounded-lg">
                <span className="text-white text-xl">🏥</span>
             </div>
             <span className="text-xl font-bold text-[#0F2146]">MedERP</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#0F2146] mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-500">
              {isLogin ? "Enter your credentials to access your workspace." : "Get started with your 14-day free enterprise trial."}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            
            {/* Full Name (Signup Only) */}
            {!isLogin && (
              <div className="space-y-1.5 animate-fade-in-up">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-3 text-gray-400 group-focus-within:text-[#0F2146] transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Dr. John Doe"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F2146]/20 focus:border-[#0F2146] transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 text-gray-400 group-focus-within:text-[#0F2146] transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="name@hospital.com"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F2146]/20 focus:border-[#0F2146] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide flex justify-between">
                Password
                {isLogin && <a href="#" className="text-blue-600 hover:text-blue-800 normal-case font-semibold">Forgot?</a>}
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 text-gray-400 group-focus-within:text-[#0F2146] transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F2146]/20 focus:border-[#0F2146] transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            {/* Compliance Note (Signup Only) */}
            {!isLogin && (
              <div className="flex gap-2 items-start p-3 bg-blue-50 rounded-lg border border-blue-100 text-xs text-blue-800">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
                <span>By signing up, you agree to our HIPAA Compliance Terms and Data Processing Agreement.</span>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-[#0F2146] text-white py-3.5 rounded-xl font-bold text-lg hover:bg-blue-900 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group"
            >
              {isLogin ? "Sign In to Dashboard" : "Start Free Trial"}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-8 text-center text-sm text-gray-600">
            {isLogin ? "New to MedERP? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="font-bold text-[#0F2146] hover:text-blue-600 hover:underline transition-colors"
            >
              {isLogin ? "Create an account" : "Sign in here"}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}