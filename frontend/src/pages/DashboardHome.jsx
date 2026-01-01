import { 
  Users, CalendarCheck, Banknote, Activity, 
  ArrowUpRight, Clock, AlertCircle, PlusCircle 
} from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

export default function DashboardHome() {
  const stats = [
    { title: "Total Patients Today", value: "142", trend: "+12%", icon: <Users size={20} />, color: "bg-blue-500" },
    { title: "Appointments Booked", value: "84", trend: "+5%", icon: <CalendarCheck size={20} />, color: "bg-emerald-500" },
    { title: "Pending Reports", value: "23", trend: "-2%", icon: <Activity size={20} />, color: "bg-amber-500" },
    { title: "Total Revenue", value: "₹ 4.2L", trend: "+8%", icon: <Banknote size={20} />, color: "bg-indigo-500" },
  ];

  const recentPatients = [
    { name: "Rahul Sharma", id: "UHID-2025001", dept: "Cardiology", status: "In Queue", time: "10:30 AM" },
    { name: "Priya Patel", id: "UHID-2025002", dept: "General", status: "Completed", time: "10:15 AM" },
    { name: "Amit Verma", id: "UHID-2025003", dept: "Orthopedics", status: "Waiting", time: "09:50 AM" },
    { name: "Sneha Gupta", id: "UHID-2025004", dept: "Gynaecology", status: "In Queue", time: "09:45 AM" },
  ];

  return (
    <PageTransition>
      <div className="space-y-8">
        
        {/* 1. HERO SECTION */}
        <div className="relative bg-[#0F2146] rounded-2xl p-8 text-white overflow-hidden shadow-xl">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-blue-500/20 text-blue-200 text-xs font-bold px-2 py-0.5 rounded border border-blue-500/30">
                  LIVE UPDATES
                </span>
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  <Clock size={12} /> {new Date().toDateString()}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back, Dr. Administrator</h1>
              <p className="text-blue-200 mt-2 max-w-xl">
                Hospital occupancy is at <span className="text-white font-bold">82%</span> today. 
                There are <span className="text-white font-bold">3 critical alerts</span> requiring attention in the ICU wing.
              </p>
            </div>
            
            <div className="flex gap-3">
              <Link to="/register" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/25">
                <PlusCircle size={18} />
                New Registration
              </Link>
            </div>
          </div>

          {/* Stats Grid Overlaying the Hero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl hover:bg-white/15 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-blue-200 text-xs font-medium uppercase tracking-wider">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className={`p-2 rounded-lg text-white ${stat.color} shadow-lg`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs">
                  <span className={`${stat.trend.includes('+') ? 'text-green-400' : 'text-red-400'} font-bold flex items-center`}>
                    {stat.trend.includes('+') ? <ArrowUpRight size={12} /> : null} {stat.trend}
                  </span>
                  <span className="text-blue-200/60">from yesterday</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Recent Activity (occupies 2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-[#0F2146] text-lg">Recent Registrations</h3>
                <Link to="/queue" className="text-sm text-blue-600 hover:underline">View Full Queue</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
                    <tr>
                      <th className="px-6 py-4">Patient Name</th>
                      <th className="px-6 py-4">Department</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentPatients.map((patient, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {patient.name}
                          <div className="text-xs text-gray-400 font-normal">{patient.id}</div>
                        </td>
                        <td className="px-6 py-4">{patient.dept}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold
                            ${patient.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                              patient.status === 'In Queue' ? 'bg-blue-100 text-blue-700' : 
                              'bg-amber-100 text-amber-700'}`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{patient.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Actions & Alerts (occupies 1/3 width) */}
          <div className="space-y-6">
            
            {/* Quick Actions Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-[#0F2146] mb-4">Quick Modules</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/booking" className="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-center group">
                  <CalendarCheck size={24} className="mx-auto text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-blue-800">Book OPD</span>
                </Link>
                <Link to="/inventory" className="p-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors text-center group">
                  <Banknote size={24} className="mx-auto text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-emerald-800">Pharmacy</span>
                </Link>
                <Link to="/lab" className="p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors text-center group">
                  <Activity size={24} className="mx-auto text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-purple-800">Lab Results</span>
                </Link>
                <Link to="/billing" className="p-4 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors text-center group">
                  <Banknote size={24} className="mx-auto text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-amber-800">Billing</span>
                </Link>
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-red-50 rounded-xl border border-red-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={20} className="text-red-600" />
                <h3 className="font-bold text-red-900">Action Required</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3 items-start text-sm text-red-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                  <span>ICU Bed availability low (2/20 remaining).</span>
                </li>
                <li className="flex gap-3 items-start text-sm text-red-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                  <span>Medicine "Paracetamol 500mg" stock critical.</span>
                </li>
              </ul>
              <button className="w-full mt-4 py-2 bg-white border border-red-200 text-red-700 text-xs font-bold rounded hover:bg-red-50 transition-colors">
                View All Alerts
              </button>
            </div>

          </div>
        </div>

      </div>
    </PageTransition>
  );
}