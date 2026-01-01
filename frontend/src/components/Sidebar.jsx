import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, CalendarDays, Pill, FlaskConical, FileText, 
  Settings, X, ChevronDown, ChevronRight, Stethoscope, BedDouble, 
  ClipboardList, Banknote, ShieldCheck, Truck, Microscope, Activity
} from "lucide-react";

export default function Sidebar({ isOpen, setIsSidebarOpen }) {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (name) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const menuStructure = [
    { 
      category: "CORE",
      items: [
        { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
      ]
    },
    {
      category: "FRONT OFFICE",
      items: [
        { 
          name: "Reception", 
          icon: <ClipboardList size={18} />,
          submenu: [
            { name: "Patient Registration", path: "/register" },
            { name: "Appointment Booking", path: "/booking" },
            { name: "Queue Management", path: "/queue" },
            { name: "Visitor Pass", path: "/visitors" }
          ]
        },
        { 
          name: "Billing & Insurance", 
          icon: <Banknote size={18} />,
          submenu: [
            { name: "OPD Billing", path: "/billing" },
            { name: "IPD Billing", path: "/billing-ipd" },
            { name: "Insurance Claims", path: "/insurance" },
            { name: "Payment History", path: "/payments" }
          ]
        }
      ]
    },
    {
      category: "CLINICAL",
      items: [
        { 
          name: "OPD Management", 
          icon: <Stethoscope size={18} />,
          submenu: [
            { name: "Doctor Desk", path: "/doctor-desk" },
            { name: "E-Prescription", path: "/rx" },
            { name: "Patient History", path: "/emr" }
          ]
        },
        { 
          name: "IPD (Inpatient)", 
          icon: <BedDouble size={18} />,
          submenu: [
            { name: "Admissions (ADT)", path: "/admission" },
            { name: "Bed Census", path: "/beds" },
            { name: "Nursing Station", path: "/nursing" },
            { name: "Discharge Summary", path: "/discharge" }
          ]
        },
        {
          name: "OT Management",
          icon: <Activity size={18} />,
          submenu: [
            { name: "Surgery Schedule", path: "/ot-schedule" },
            { name: "PAC Records", path: "/pac" }
          ]
        }
      ]
    },
    {
      category: "DIAGNOSTICS & STORES",
      items: [
        { 
          name: "Laboratory (LIS)", 
          icon: <FlaskConical size={18} />,
          submenu: [
            { name: "Sample Collection", path: "/lab" },
            { name: "Test Results", path: "/lab-results" },
            { name: "Lab Inventory", path: "/lab-stock" }
          ]
        },
        { 
          name: "Radiology (RIS)", 
          icon: <Microscope size={18} />,
          submenu: [
            { name: "X-Ray / MRI Requests", path: "/radiology" },
            { name: "Report Entry", path: "/radiology-reports" }
          ]
        },
        { 
          name: "Pharmacy", 
          icon: <Pill size={18} />,
          submenu: [
            { name: "Medicine Sales (POS)", path: "/inventory" },
            { name: "Stock Management", path: "/stock" },
            { name: "Purchase Orders", path: "/purchase" },
            { name: "Supplier Master", path: "/suppliers" }
          ]
        },
        {
          name: "Inventory Control",
          icon: <Truck size={18} />,
          submenu: [
            { name: "Central Store", path: "/store" },
            { name: "Asset Management", path: "/assets" }
          ]
        }
      ]
    },
    {
      category: "ADMINISTRATION",
      items: [
        { 
          name: "HR & Payroll", 
          icon: <Users size={18} />,
          submenu: [
            { name: "Staff Directory", path: "/staff" },
            { name: "Attendance", path: "/attendance" },
            { name: "Payroll Processing", path: "/payroll" }
          ]
        },
        { 
          name: "Settings", 
          icon: <Settings size={18} />,
          submenu: [
            { name: "User Management", path: "/settings" },
            { name: "Role Permissions", path: "/roles" },
            { name: "Audit Logs", path: "/logs" },
            { name: "System Backup", path: "/backup" }
          ]
        }
      ]
    }
  ];

  useEffect(() => {
    menuStructure.forEach(group => {
      group.items.forEach(item => {
        if (item.submenu) {
          const hasActiveChild = item.submenu.some(sub => sub.path === location.pathname);
          if (hasActiveChild) {
            setExpandedMenus(prev => ({ ...prev, [item.name]: true }));
          }
        }
      });
    });
  }, [location.pathname]);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-[#0F2146]/60 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside 
        className={`
          bg-white border-r border-gray-200 flex flex-col 
          fixed lg:static top-0 left-0 h-full z-50 
          transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
          overflow-hidden
          ${isOpen ? "w-72 translate-x-0 shadow-2xl lg:shadow-none" : "w-0 -translate-x-full lg:w-0 lg:-translate-x-full opacity-0"}
        `}
      >
        {/* Mobile Header with Logo Redirect */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:hidden min-w-[288px]">
          <Link to="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-2">
            <span className="text-xl">🏥</span>
            <span className="font-bold text-[#0F2146]">MedERP</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-gray-100 rounded text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Menu Area - APPLIED .no-scrollbar HERE */}
        <div className="flex-1 overflow-y-auto py-4 min-w-[288px] no-scrollbar">
          
          {menuStructure.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              
              {group.category && (
                <div className="px-6 mb-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {group.category}
                  </span>
                </div>
              )}

              <nav className="space-y-1 px-3">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  const isExpanded = expandedMenus[item.name];
                  const hasSubmenu = item.submenu && item.submenu.length > 0;
                  const isChildActive = hasSubmenu && item.submenu.some(sub => sub.path === location.pathname);

                  return (
                    <div key={item.name}>
                      {hasSubmenu ? (
                        <button
                          onClick={() => toggleSubmenu(item.name)}
                          className={`
                            w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md 
                            transition-all duration-200 group
                            ${isChildActive 
                              ? "bg-blue-50 text-[#0F2146]" 
                              : "text-gray-600 hover:bg-gray-50 hover:text-[#0F2146]"
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`transition-colors ${isChildActive ? "text-[#0F2146]" : "text-gray-400 group-hover:text-[#0F2146]"}`}>
                              {item.icon}
                            </span>
                            <span>{item.name}</span>
                          </div>
                          <span className={`text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}>
                            <ChevronRight size={16} />
                          </span>
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`
                            flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md 
                            transition-all duration-200 group
                            ${isActive 
                              ? "bg-[#0F2146] text-white shadow-md" 
                              : "text-gray-600 hover:bg-gray-50 hover:text-[#0F2146]"
                            }
                          `}
                        >
                          <span className={`transition-transform duration-200 ${isActive ? "scale-100" : "group-hover:scale-110"}`}>
                            {item.icon}
                          </span>
                          <span>{item.name}</span>
                        </Link>
                      )}

                      {hasSubmenu && (
                        <div 
                          className={`
                            overflow-hidden transition-all duration-300 ease-in-out
                            ${isExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}
                          `}
                        >
                          <div className="ml-4 pl-4 border-l border-gray-200 space-y-1">
                            {item.submenu.map((subItem) => {
                              const isSubActive = location.pathname === subItem.path;
                              return (
                                <Link
                                  key={subItem.name}
                                  to={subItem.path}
                                  onClick={() => setIsSidebarOpen(false)}
                                  className={`
                                    block px-3 py-2 text-xs font-medium rounded-md transition-colors
                                    ${isSubActive 
                                      ? "text-[#0F2146] bg-blue-50 font-bold" 
                                      : "text-gray-500 hover:text-[#0F2146] hover:bg-gray-50"
                                    }
                                  `}
                                >
                                  {subItem.name}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          ))}

        </div>
        
        <div className="p-4 border-t border-gray-100 min-w-[288px] bg-gray-50">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-white rounded-full border border-gray-200 text-[#0F2146]">
                <ShieldCheck size={16} />
             </div>
             <div>
               <p className="text-[10px] uppercase font-bold text-gray-400">Security Level</p>
               <p className="text-xs font-bold text-[#0F2146]">HIPAA Compliant</p>
             </div>
           </div>
        </div>

      </aside>
    </>
  );
}