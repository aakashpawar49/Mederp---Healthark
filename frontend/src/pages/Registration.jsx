import { useState } from "react";
import api from "../api";
import { UserPlus, Save, Phone, User, Calendar, MapPin } from "lucide-react";
import PageTransition from "../components/PageTransition";

export default function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "Male",
    address: "",
    uhid: `UHID-${Math.floor(Math.random() * 10000)}` // Auto-generate simple ID
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send to Backend
      await api.post("/patients/", formData);
      alert(`Patient Registered Successfully! UHID: ${formData.uhid}`);
      // Reset form or redirect
      setFormData({
        name: "", phone: "", age: "", gender: "Male", address: "",
        uhid: `UHID-${Math.floor(Math.random() * 10000)}`
      });
    } catch (err) {
      alert("Registration Failed. Phone number might be duplicate.");
    }
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8 flex items-center gap-3">
           <div className="bg-blue-100 p-3 rounded-xl text-blue-700">
             <UserPlus size={24} />
           </div>
           <div>
             <h1 className="text-2xl font-bold text-[#0F2146]">New Patient Registration</h1>
             <p className="text-gray-500 text-sm">Create a digital file for a new visitor.</p>
           </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                   <User size={14} /> Full Name
                </label>
                <input 
                  name="name" required value={formData.name} onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-[#0F2146] outline-none" 
                  placeholder="e.g. Rajesh Kumar"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                   <Phone size={14} /> Contact Number
                </label>
                <input 
                  name="phone" required value={formData.phone} onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-[#0F2146] outline-none" 
                  placeholder="9876543210"
                />
              </div>

              {/* Age & Gender Row */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                       <Calendar size={14} /> Age
                    </label>
                    <input 
                      name="age" type="number" required value={formData.age} onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-[#0F2146] outline-none" 
                      placeholder="35"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Gender</label>
                    <select 
                       name="gender" value={formData.gender} onChange={handleChange}
                       className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none"
                    >
                       <option>Male</option>
                       <option>Female</option>
                       <option>Other</option>
                    </select>
                 </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                   <MapPin size={14} /> City / Address
                </label>
                <input 
                  name="address" value={formData.address} onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-[#0F2146] outline-none" 
                  placeholder="e.g. Vadodara, Gujarat"
                />
              </div>
           </div>

           {/* Actions */}
           <div className="flex justify-end gap-4 border-t border-gray-100 pt-6">
              <button type="button" className="px-6 py-3 text-gray-600 font-bold hover:bg-gray-50 rounded-xl transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-8 py-3 bg-[#0F2146] text-white font-bold rounded-xl shadow-lg hover:bg-blue-900 transition-all flex items-center gap-2">
                <Save size={18} /> Register Patient
              </button>
           </div>

        </form>
      </div>
    </PageTransition>
  );
}