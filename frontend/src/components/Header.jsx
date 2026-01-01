import { Link } from "react-router-dom"; // Import Link
import { UserCircle, Menu } from "lucide-react";

export default function Header({ toggleSidebar }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
      {/* Container is relative to allow absolute centering of the logo */}
      <div className="px-6 py-3 flex justify-between items-center relative h-16">
        
        {/* LEFT: Toggle Button */}
        <div className="flex items-center z-10">
          <button 
            onClick={toggleSidebar} 
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* CENTER: Brand Logo (Absolute Positioned) */}
        <Link 
          to="/" 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 group cursor-pointer"
        >
          {/* Healthark Navy Branding */}
          <div className="bg-[#0F2146] p-2 rounded-lg shadow-sm transition-transform group-hover:scale-105">
            <span className="text-white font-bold text-xl">🏥</span>
          </div>
          <div className="hidden sm:block leading-tight text-center">
            <h1 className="text-xl font-bold text-[#0F2146] tracking-tight group-hover:text-blue-800 transition-colors">
              MedERP
            </h1>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
              By Healthark
            </span>
          </div>
        </Link>

        {/* RIGHT: User Profile */}
        <div className="flex items-center gap-4 z-10">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-[#0F2146]">Dr. Administrator</p>
            <p className="text-xs text-gray-500">Super User</p>
          </div>
          <button className="text-gray-400 hover:text-[#0F2146] transition-colors">
            <UserCircle size={36} strokeWidth={1.5} />
          </button>
        </div>

      </div>
    </header>
  );
}