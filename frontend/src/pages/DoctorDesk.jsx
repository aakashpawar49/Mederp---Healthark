import { useState, useEffect } from "react";
import api from "../api";
import { 
  User, Activity, Pill, Save, Search, X, CheckCircle 
} from "lucide-react";
import PageTransition from "../components/PageTransition";

export default function DoctorDesk() {
  const [activePatient, setActivePatient] = useState(null); 
  const [inventory, setInventory] = useState([]);
  
  // Patient Search State
  const [patientQuery, setPatientQuery] = useState("");
  const [patientResults, setPatientResults] = useState([]);
  const [showPatientSearch, setShowPatientSearch] = useState(false);

  // Clinical Form State
  const [diagnosis, setDiagnosis] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [prescription, setPrescription] = useState([]);
  
  // Medicine Search State
  const [medSearch, setMedSearch] = useState("");
  const [showMedList, setShowMedList] = useState(false);

  // 1. Fetch Inventory for Autocomplete
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await api.get("/inventory/all");
        setInventory(res.data);
      } catch(e) { console.error("Error loading meds"); }
    };
    loadData();
  }, []);

  // 2. Search for Patient
  const handlePatientSearch = async (e) => {
    const query = e.target.value;
    setPatientQuery(query);
    if(query.length > 2) {
        try {
            const res = await api.get(`/patients/search?query=${query}`);
            setPatientResults(res.data);
            setShowPatientSearch(true);
        } catch(err) { console.error(err); }
    } else {
        setShowPatientSearch(false);
    }
  };

  const selectPatient = (patient) => {
    setActivePatient(patient);
    setShowPatientSearch(false);
    setPatientQuery("");
  };

  // 3. Add Medicine to List
  const addMedicine = (med) => {
    setPrescription([...prescription, { 
      name: med.name, dosage: "1-0-1", duration: "3 Days", instructions: "After Food" 
    }]);
    setMedSearch("");
    setShowMedList(false);
  };

  // 4. Remove Medicine
  const removeMedicine = (index) => {
    const newList = [...prescription];
    newList.splice(index, 1);
    setPrescription(newList);
  };

  // 5. Submit Consultation
  const handleSave = async () => {
    if(!activePatient) return;
    
    const payload = {
      patient_id: activePatient._id, // MongoDB ID
      doctor_id: "doc-123", // Replace with logged-in doctor later
      symptoms,
      diagnosis,
      medicines: prescription.map(p => ({
          medicine_name: p.name,
          dosage: p.dosage,
          duration: p.duration,
          instructions: p.instructions
      })),
      lab_tests: [] 
    };

    try {
      await api.post("/doctors/consultation/submit", payload);
      alert("✅ Prescription Saved & Sent to Pharmacy!");
      // Reset for next patient
      setActivePatient(null);
      setPrescription([]);
      setSymptoms("");
      setDiagnosis("");
    } catch(e) {
      alert("Failed to save consultation");
    }
  };

  return (
    <PageTransition>
      <div className="flex flex-col h-[calc(100vh-100px)] gap-6 p-6">
        
        {/* TOP BAR: SEARCH OR PATIENT INFO */}
        {!activePatient ? (
           <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 text-center flex flex-col items-center justify-center h-full">
              <div className="bg-blue-50 p-4 rounded-full mb-4">
                 <User size={48} className="text-[#0F2146]" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F2146] mb-2">Doctor's Desk</h2>
              <p className="text-gray-500 mb-6">Search for a patient to start the consultation.</p>
              
              <div className="relative w-full max-w-md">
                 <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-12 focus:ring-2 focus:ring-[#0F2146] outline-none shadow-sm"
                    placeholder="Search by Name, Phone or UHID..."
                    value={patientQuery}
                    onChange={handlePatientSearch}
                 />
                 <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                 
                 {/* Patient Dropdown */}
                 {showPatientSearch && (
                    <div className="absolute top-14 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden text-left">
                       {patientResults.map(p => (
                          <div 
                            key={p._id} 
                            onClick={() => selectPatient(p)}
                            className="p-4 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0"
                          >
                             <p className="font-bold text-[#0F2146]">{p.name}</p>
                             <p className="text-xs text-gray-500">{p.age} Y / {p.gender} • {p.phone}</p>
                             <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mt-1 inline-block">{p.uhid}</span>
                          </div>
                       ))}
                       {patientResults.length === 0 && (
                          <div className="p-4 text-gray-400 text-sm">No patients found.</div>
                       )}
                    </div>
                 )}
              </div>
           </div>
        ) : (
          /* ACTIVE PATIENT HEADER */
          <div className="bg-[#0F2146] text-white p-4 rounded-xl flex justify-between items-center shadow-lg animate-fade-in">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl">
                 {activePatient.name ? activePatient.name[0] : "P"}
               </div>
               <div>
                 <h2 className="font-bold text-lg">{activePatient.name}</h2>
                 <p className="text-blue-200 text-sm">{activePatient.age} Y / {activePatient.gender} • {activePatient.uhid}</p>
               </div>
            </div>
            <div className="flex gap-3">
                <button onClick={() => setActivePatient(null)} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold">
                    Switch Patient
                </button>
                <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg">
                    <Save size={18} /> Finalize Rx
                </button>
            </div>
          </div>
        )}

        {/* WORKSPACE (Only visible when patient selected) */}
        {activePatient && (
            <div className="flex flex-1 gap-6 overflow-hidden">
            
            {/* LEFT: Clinical Notes */}
            <div className="w-1/2 flex flex-col gap-4 overflow-y-auto">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-[#0F2146] mb-4 flex items-center gap-2">
                    <Activity size={18} /> Clinical Notes
                </h3>
                <div className="space-y-4">
                    <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Symptoms</label>
                    <textarea 
                        className="w-full border border-gray-300 rounded-lg p-3 mt-1 h-20 focus:ring-2 focus:ring-[#0F2146] outline-none"
                        placeholder="e.g. Fever, Headache..."
                        value={symptoms}
                        onChange={e => setSymptoms(e.target.value)}
                    />
                    </div>
                    <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Diagnosis</label>
                    <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-lg p-3 mt-1 font-bold text-[#0F2146]"
                        placeholder="e.g. Viral Fever"
                        value={diagnosis}
                        onChange={e => setDiagnosis(e.target.value)}
                    />
                    </div>
                </div>
                </div>
            </div>

            {/* RIGHT: Rx (Prescription) */}
            <div className="w-1/2 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-[#0F2146] flex items-center gap-2">
                    <Pill size={18} /> Medications
                </h3>
                </div>
                
                {/* Medicine Search */}
                <div className="p-4 relative">
                <Search className="absolute left-7 top-7 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search Medicine from Inventory..." 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    value={medSearch}
                    onChange={(e) => {
                        setMedSearch(e.target.value);
                        setShowMedList(true);
                    }}
                />
                
                {/* Med Dropdown */}
                {showMedList && medSearch && (
                    <div className="absolute left-4 right-4 top-14 bg-white border border-gray-200 rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto">
                        {inventory
                        .filter(m => m.name.toLowerCase().includes(medSearch.toLowerCase()))
                        .map(med => (
                            <div 
                            key={med.sku} 
                            className="p-3 hover:bg-blue-50 cursor-pointer flex justify-between"
                            onClick={() => addMedicine(med)}
                            >
                            <span className="font-bold text-gray-700">{med.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${med.total_stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                Qty: {med.total_stock}
                            </span>
                            </div>
                        ))}
                    </div>
                )}
                </div>

                {/* Selected Meds List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {prescription.map((med, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-3 relative group bg-white shadow-sm">
                        <button onClick={() => removeMedicine(idx)} className="absolute right-2 top-2 text-gray-300 hover:text-red-500">
                        <X size={16} />
                        </button>
                        <h4 className="font-bold text-[#0F2146]">{med.name}</h4>
                        <div className="flex gap-2 mt-2">
                        <input value={med.dosage} onChange={(e) => { const n = [...prescription]; n[idx].dosage = e.target.value; setPrescription(n); }} className="bg-blue-50 rounded px-2 py-1 text-xs font-bold w-20 text-center text-blue-800" />
                        <input value={med.duration} onChange={(e) => { const n = [...prescription]; n[idx].duration = e.target.value; setPrescription(n); }} className="bg-gray-100 rounded px-2 py-1 text-xs w-20 text-center" />
                        <input value={med.instructions} onChange={(e) => { const n = [...prescription]; n[idx].instructions = e.target.value; setPrescription(n); }} className="flex-1 border-b border-gray-200 text-xs outline-none" placeholder="Instructions..." />
                        </div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        )}
      </div>
    </PageTransition>
  );
}