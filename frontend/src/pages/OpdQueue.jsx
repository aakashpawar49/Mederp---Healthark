import { useState } from "react";
import { 
  Search, Clock, MoreVertical, Stethoscope, 
  Thermometer, Activity, User, FileText, ChevronRight, Play
} from "lucide-react";
import PageTransition from "../components/PageTransition";

export default function OpdQueue() {
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Mock Data: Real-time Queue
  const queue = [
    { id: 101, uhid: "UHID-2501", name: "Rahul Sharma", age: "34 M", reason: "Chest Pain", time: "10:15 AM", status: "In-Consult", priority: "High" },
    { id: 102, uhid: "UHID-2502", name: "Priya Patel", age: "28 F", reason: "General Fever", time: "10:30 AM", status: "Waiting", priority: "Normal" },
    { id: 103, uhid: "UHID-2503", name: "Amit Verma", age: "45 M", reason: "Follow Up", time: "10:45 AM", status: "Waiting", priority: "Normal" },
    { id: 104, uhid: "UHID-2504", name: "Sneha Gupta", age: "22 F", reason: "Migraine", time: "11:00 AM", status: "On-Hold", priority: "Normal" },
  ];

  return (
    <PageTransition>
      <div className="h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COLUMN: The Queue List */}
        <div className="w-full lg:w-2/5 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Header & Search */}
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-[#0F2146] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Live OPD Queue
              </h2>
              <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded border">
                Total: {queue.length}
              </span>
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search patient..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F2146]"
              />
            </div>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto">
            {queue.map((patient) => (
              <div 
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-blue-50 group ${selectedPatient?.id === patient.id ? "bg-blue-50 border-l-4 border-l-[#0F2146]" : "border-l-4 border-l-transparent"}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-bold text-sm ${selectedPatient?.id === patient.id ? "text-[#0F2146]" : "text-gray-700"}`}>
                    {patient.name}
                  </h4>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    patient.status === 'In-Consult' ? 'bg-green-100 text-green-700' :
                    patient.status === 'Waiting' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {patient.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{patient.uhid} | {patient.age}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {patient.time}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                   {patient.priority === "High" && (
                     <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 rounded flex items-center gap-1">
                       Alert
                     </span>
                   )}
                   <span className="text-[10px] text-gray-400 truncate max-w-[150px]">{patient.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Patient Vitals & Actions */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6">
          
          {selectedPatient ? (
            <>
              {/* 1. Patient Header Card */}
              <div className="bg-[#0F2146] text-white p-6 rounded-xl shadow-md flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold">
                    {selectedPatient.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedPatient.name}</h2>
                    <p className="text-blue-200 text-sm">{selectedPatient.age} • {selectedPatient.uhid}</p>
                  </div>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105">
                  <Play size={16} fill="currentColor" /> Start Consult
                </button>
              </div>

              {/* 2. Vitals Entry Grid */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[#0F2146] flex items-center gap-2">
                    <Activity size={18} /> Vitals Capture
                  </h3>
                  <span className="text-xs text-gray-400">Last updated: Just now</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* BP */}
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 text-center">
                    <div className="text-gray-400 mb-2 flex justify-center"><Activity size={20} /></div>
                    <label className="text-xs font-bold text-gray-500 uppercase">BP (mmHg)</label>
                    <input type="text" placeholder="120/80" className="w-full text-center font-bold text-[#0F2146] bg-transparent outline-none mt-1 placeholder:text-gray-300" />
                  </div>
                  {/* Pulse */}
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 text-center">
                    <div className="text-gray-400 mb-2 flex justify-center"><Activity size={20} className="text-red-400" /></div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Pulse (bpm)</label>
                    <input type="text" placeholder="72" className="w-full text-center font-bold text-[#0F2146] bg-transparent outline-none mt-1 placeholder:text-gray-300" />
                  </div>
                  {/* Temp */}
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 text-center">
                    <div className="text-gray-400 mb-2 flex justify-center"><Thermometer size={20} className="text-amber-500" /></div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Temp (°F)</label>
                    <input type="text" placeholder="98.6" className="w-full text-center font-bold text-[#0F2146] bg-transparent outline-none mt-1 placeholder:text-gray-300" />
                  </div>
                  {/* SpO2 */}
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 text-center">
                    <div className="text-gray-400 mb-2 flex justify-center"><Activity size={20} className="text-blue-400" /></div>
                    <label className="text-xs font-bold text-gray-500 uppercase">SpO2 (%)</label>
                    <input type="text" placeholder="98" className="w-full text-center font-bold text-[#0F2146] bg-transparent outline-none mt-1 placeholder:text-gray-300" />
                  </div>
                </div>

                {/* Chief Complaints Box */}
                <div className="mt-6">
                  <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Chief Complaints & Symptoms</label>
                  <textarea 
                    rows="4" 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0F2146]/20 focus:border-[#0F2146] outline-none resize-none"
                    placeholder="Patient complains of..."
                    defaultValue={selectedPatient.reason}
                  ></textarea>
                </div>
              </div>

            </>
          ) : (
            // Empty State
            <div className="flex-1 bg-white rounded-xl border border-gray-200 border-dashed flex flex-col items-center justify-center text-gray-400">
              <User size={48} className="mb-4 opacity-20" />
              <p className="font-medium">Select a patient from the queue to view details</p>
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
}