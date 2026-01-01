import { Linkedin, Instagram, Facebook, Twitter, Youtube, Award, ShieldCheck, Server } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F2146] text-white mt-auto font-sans border-t border-blue-900">
      
      {/* Top Section: Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
          
          {/* Column 1: Brand & Newsletter (Wider) */}
          <div className="lg:col-span-1 space-y-6">
            {/* MedERP by Healthark Branding */}
            <div className="mb-4">
               <h2 className="text-2xl font-bold tracking-wider text-white">MedERP</h2>
               <p className="text-[10px] uppercase tracking-[0.2em] text-blue-300 mt-1">
                 A Product by Healthark
               </p>
            </div>

            <div className="text-sm leading-relaxed text-gray-300">
              <p>821, Sun Avenue One,</p>
              <p>Manikbaug Road, Ambawadi,</p>
              <p>Ahmedabad – 380015, India</p>
              <p className="mt-4 hover:text-blue-200 transition-colors cursor-pointer font-medium">
                support@mederp.ai
              </p>
            </div>

            {/* Newsletter / System Updates */}
            <div className="pt-4">
              <h4 className="font-bold mb-2 text-xs uppercase tracking-wide text-gray-400">Get System Updates</h4>
              <div className="flex bg-white rounded-sm overflow-hidden p-0.5">
                <input 
                  type="email" 
                  placeholder="Enter your work email" 
                  className="bg-white text-gray-800 px-3 py-2 text-xs outline-none flex-grow placeholder:text-gray-400"
                />
                <button className="bg-[#1f4e79] hover:bg-[#163a5c] text-white px-4 py-2 text-xs font-bold uppercase transition-colors">
                  Join
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <Linkedin size={18} className="cursor-pointer hover:text-blue-400 transition-transform hover:-translate-y-1" />
              <Twitter size={18} className="cursor-pointer hover:text-sky-400 transition-transform hover:-translate-y-1" />
              <Youtube size={18} className="cursor-pointer hover:text-red-500 transition-transform hover:-translate-y-1" />
            </div>
          </div>

          {/* Column 2: Platform Modules (Replaces 'Capabilities') */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-bold text-lg mb-2 text-white">Modules</h4>
            {/* These links are relevant to your software users */}
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">Patient Registration</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">OPD & Queue Mgmt</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">Pharmacy Inventory</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">Laboratory (LIS)</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">Radiology (RIS)</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">Insurance & Billing</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">Telemedicine</a>
          </div>

          {/* Column 3: Developer Resources (Replaces 'Insights') */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-bold text-lg mb-2 text-white">Resources</h4>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">User Documentation</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">API Reference</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">Release Notes v2.5</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">System Status</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">Integration Guides</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">Security Whitepaper</a>
          </div>

          {/* Column 4: Support & Help (Replaces 'Useful Links') */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-bold text-lg mb-2 text-white">Support</h4>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">Help Desk</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">Submit a Ticket</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">Video Tutorials</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">Community Forum</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">Partner Network</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline decoration-blue-400 underline-offset-4 transition-all">Contact Sales</a>
          </div>

           {/* Column 5: Trust & Compliance (Replaces 'Certificates') */}
           <div className="flex flex-col space-y-6">
            <h4 className="font-bold text-lg mb-2 text-white">Compliance</h4>
            
            {/* HIPAA Badge */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="bg-white/10 p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
                <ShieldCheck size={24} className="text-blue-300 group-hover:text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">HIPAA</span>
                <span className="text-[10px] text-gray-400">Compliant Platform</span>
              </div>
            </div>

            {/* ISO Badge */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="bg-white/10 p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
                <Award size={24} className="text-blue-300 group-hover:text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">ISO 27001</span>
                <span className="text-[10px] text-gray-400">Information Security</span>
              </div>
            </div>

            {/* Uptime Badge */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="bg-white/10 p-2 rounded-lg group-hover:bg-green-600 transition-colors">
                <Server size={24} className="text-green-400 group-hover:text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">99.9% Uptime</span>
                <span className="text-[10px] text-gray-400">SLA Guaranteed</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright */}
      <div className="bg-[#0b1832] py-4 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          
          <div className="text-center md:text-left">
            <span>&copy; {new Date().getFullYear()} Healthark Insights. MedERP is a registered trademark.</span>
          </div>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Data Processing Agreement</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>

        </div>
      </div>
    </footer>
  );
}