import { useState } from "react";
import api from "../api";
import PageTransition from "../components/PageTransition";
import { Save, User, Shield, Phone, FileText } from "lucide-react";

export default function RegisterPatient() {
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    prefix: "Mr.", first_name: "", middle_name: "", last_name: "", 
    dob: "", age: "", gender: "M", blood_group: "", marital_status: "Single",
    phone: "", email: "", address: "", city: "", state: "", zip: "",
    national_id_type: "Aadhar", national_id_no: "",
    emergency_name: "", emergency_phone: "", emergency_relation: "",
    insurance_provider: "", policy_number: "", coverage_validity: ""
  });
  const [uhid, setUhid] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/patients/", formData);
      setUhid(res.data.uhid);
      window.scrollTo(0, 0);
    } catch (error) {
      alert("Registration Error: " + (error.response?.data?.detail || "Check connection"));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper for Section Headers
  const SectionTitle = ({ title, icon }) => (
    <div className="flex items-center gap-2 text-[#0F2146] border-b border-gray-200 pb-2 mb-4 mt-6">
      {icon}
      <h3 className="font-bold text-sm uppercase tracking-wider">{title}</h3>
    </div>
  );

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#0F2146]">Patient Registration</h1>
            <p className="text-xs text-gray-500">Capture complete patient demographics and payer information.</p>
          </div>
          <button onClick={handleSubmit} className="bg-[#0F2146] text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-900 transition-colors shadow-lg">
            <Save size={16} /> Save Record
          </button>
        </div>

        {/* Success Alert */}
        {uhid && (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-center justify-between shadow-sm">
            <div>
              <p className="font-bold text-lg">✔ Patient Registered Successfully</p>
              <p className="text-sm">Generated UHID: <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border ml-2">{uhid}</span></p>
            </div>
            <button onClick={() => setUhid(null)} className="text-xs underline hover:text-green-900">Close</button>
          </div>
        )}

        {/* Main Form Card */}
        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-8">

            {/* SECTION 1: PERSONAL DETAILS */}
            <SectionTitle title="Demographics" icon={<User size={18} />} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Prefix</label>
                <select name="prefix" className="form-input" onChange={handleChange}>
                  <option>Mr.</option><option>Ms.</option><option>Mrs.</option><option>Dr.</option>
                </select>
              </div>

              <div className="space-y-1 md:col-span-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">First Name <span className="text-red-500">*</span></label>
                <input name="first_name" className="form-input" required onChange={handleChange} />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Middle Name</label>
                <input name="middle_name" className="form-input" onChange={handleChange} />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Last Name <span className="text-red-500">*</span></label>
                <input name="last_name" className="form-input" required onChange={handleChange} />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">DOB <span className="text-red-500">*</span></label>
                <input type="date" name="dob" className="form-input" required onChange={handleChange} />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Gender</label>
                <select name="gender" className="form-input" onChange={handleChange}>
                  <option value="M">Male</option><option value="F">Female</option><option value="O">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Blood Group</label>
                <select name="blood_group" className="form-input" onChange={handleChange}>
                  <option>Select...</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Marital Status</label>
                <select name="marital_status" className="form-input" onChange={handleChange}>
                  <option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option>
                </select>
              </div>
            </div>

            {/* SECTION 2: CONTACT & ADDRESS */}
            <SectionTitle title="Contact Information" icon={<Phone size={18} />} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Mobile Number <span className="text-red-500">*</span></label>
                <input name="phone" className="form-input" required onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Email Address</label>
                <input type="email" name="email" className="form-input" onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">National ID (Aadhar/SSN)</label>
                <input name="national_id_no" className="form-input" placeholder="XXXX-XXXX-XXXX" onChange={handleChange} />
              </div>
              <div className="space-y-1 md:col-span-3">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Residential Address</label>
                <input name="address" className="form-input" placeholder="Street Address, Apt, Unit" onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">City</label>
                <input name="city" className="form-input" onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">State/Province</label>
                <input name="state" className="form-input" onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Postal Code</label>
                <input name="zip" className="form-input" onChange={handleChange} />
              </div>
            </div>

            {/* SECTION 3: INSURANCE & PAYER */}
            <SectionTitle title="Payer & Insurance Details" icon={<Shield size={18} />} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Primary Insurance Provider</label>
                <input name="insurance_provider" className="form-input" placeholder="e.g. HDFC Ergo, LIC" onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Policy Number</label>
                <input name="policy_number" className="form-input" onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Coverage Validity</label>
                <input type="date" name="coverage_validity" className="form-input" onChange={handleChange} />
              </div>
            </div>

          </div>
          
          {/* Footer Actions */}
          <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-end gap-3">
            <button type="button" className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-[#0F2146] text-white text-sm font-bold hover:bg-blue-900 shadow-md">Submit Registration</button>
          </div>
        </form>

        {/* CSS Utility for Cleaner Inputs (Add to style tag or global css if desired) */}
        <style>{`
          .form-input {
            width: 100%;
            border: 1px solid #d1d5db;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.875rem;
            color: #1f2937;
            transition: all 0.2s;
          }
          .form-input:focus {
            outline: none;
            border-color: #0F2146;
            box-shadow: 0 0 0 1px #0F2146;
          }
        `}</style>
      </div>
    </PageTransition>
  );
}