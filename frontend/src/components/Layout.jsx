import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* 1. Header */}
      <div className="z-30 relative bg-white">
        <Header toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* 2. Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* 3. Main Content Area */}
        <div className="flex-1 flex flex-col relative w-full transition-all duration-300">
          
          {/* SCROLLABLE CONTAINER 
             The Footer is now INSIDE here, at the bottom.
          */}
          <main className="flex-1 overflow-y-auto flex flex-col scroll-smooth">
            
            {/* Page Content */}
            <div className="flex-grow p-4 md:p-8">
              {children}
            </div>
            
            {/* Fat Footer (Scrolls into view at the end) */}
            <Footer />
            
          </main>

        </div>
      </div>
    </div>
  );
}