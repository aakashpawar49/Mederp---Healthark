import { useState } from "react";
import api from "../api";
import PageTransition from "../components/PageTransition";
import { Search, Calendar, User, Clock, CheckCircle } from "lucide-react";

export default function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [department, setDepartment] = useState("Cardiology");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock Slots Data (In a real app, this comes from API based on Date + Doctor)
  const slots = [
    { time: "09:00 AM", status: "booked" },
    { time: "09:30 AM", status: "available" },
    { time: "10:00 AM", status: "available" },
    { time: "10:30 AM", status: "reserved" }, // e.g. reserved for emergency
    { time: "11:00 AM", status: "available" },
    { time: "11:30 AM", status: "booked" },
    { time: "12:00 PM", status: "available" },
    { time: "12:30 PM", status: "available" },
  ];

  const handleBook = (time) => {
    // Booking logic here
    alert(`Booking initiated for ${time} in ${department}`);
  };

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-140px)]">
        
        {/* LEFT COLUMN: Booking Controls */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* 1. Patient Lookup Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-[#0F2146] font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
              <User size={16} /> Patient Details
            </h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by UHID, Name or Mobile" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0F2146] outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            {/* Mock Search Result */}
            {searchQuery && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg cursor-pointer hover:bg-blue-100">
                <p className="text-sm font-bold text-[#0F2146]">Rahul Sharma</p>
                <p className="text-xs text-gray-500">UHID: 2025001 | 34 Y/M</p>
              </div>
            )}
          </div>

          {/* 2. Clinical Context */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-[#0F2146] font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
              <Calendar size={16} /> Booking Details
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Department</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#0F2146] outline-none"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option>Cardiology</option>
                  <option>Orthopedics</option>
                  <option>General Medicine</option>
                  <option>Pediatrics</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Consultant</label>
                <select className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#0F2146] outline-none">
                  <option>Dr. Admin (Senior Consultant)</option>
                  <option>Dr. Smith (Resident)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Date</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#0F2146] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Visit Type</label>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-[#0F2146] text-white text-xs rounded-full cursor-pointer">New</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full cursor-pointer hover:bg-gray-200">Follow-up</span>
                  <span className="px-3 py-1 bg-red-100 text-red-600 text-xs rounded-full cursor-pointer hover:bg-red-200">Emergency</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Slot Selection */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <div>
              <h2 className="text-lg font-bold text-[#0F2146]">Slot Availability</h2>
              <p className="text-xs text-gray-500">Select a time slot for {department}</p>
            </div>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-white border border-blue-600"></div> Available</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-gray-200"></div> Booked</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-200"></div> Reserved</div>
            </div>
          </div>

          {/* Slots Grid */}
          <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto">
            {slots.map((slot, index) => {
              const isAvailable = slot.status === "available";
              const isReserved = slot.status === "reserved";
              
              return (
                <button
                  key={index}
                  disabled={!isAvailable}
                  onClick={() => handleBook(slot.time)}
                  className={`
                    py-4 px-2 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-200
                    ${isAvailable 
                      ? "bg-white border-blue-200 text-blue-700 hover:shadow-md hover:border-blue-500 hover:scale-105 active:scale-95 cursor-pointer" 
                      : isReserved 
                        ? "bg-amber-50 border-amber-200 text-amber-600 opacity-80 cursor-not-allowed"
                        : "bg-gray-50 border-gray-200 text-gray-400 opacity-60 cursor-not-allowed"
                    }
                  `}
                >
                  <Clock size={18} />
                  <span className="font-bold text-sm">{slot.time}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    {slot.status}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Consultation Fee Footer */}
          <div className="mt-auto p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
             <div className="text-xs text-gray-500">
               * Consultation fees vary based on doctor seniority.
             </div>
             <div className="text-right">
               <span className="text-xs text-gray-500 uppercase">Est. Consultation Fee</span>
               <p className="text-xl font-bold text-[#0F2146]">₹ 800.00</p>
             </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}