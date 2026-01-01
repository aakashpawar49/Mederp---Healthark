import { useState } from "react";
import api from "../api"; // Your Axios instance
import { Upload, FileText, Activity, AlertTriangle, CheckCircle } from "lucide-react";
import PageTransition from "../components/PageTransition";

export default function PatientAI() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/ai/analyze-prescription", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAnalysis(res.data.data);
    } catch (err) {
      alert("Failed to analyze prescription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-3xl font-bold mb-2">Prescription AI Decoder</h1>
          <p className="text-blue-100">Upload a photo of your doctor's prescription. Our AI will read the handwriting and explain your medication simply.</p>
        </div>

        {/* Upload Area */}
        <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center hover:border-blue-500 transition-colors">
            <Upload size={48} className="text-gray-400 mb-4" />
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <button 
                onClick={handleUpload} 
                disabled={!file || loading}
                className={`px-8 py-3 rounded-xl font-bold text-white transition-all ${loading ? 'bg-gray-400' : 'bg-[#0F2146] hover:bg-blue-900'}`}
            >
                {loading ? "Analyzing via AI..." : "Decode Prescription"}
            </button>
        </div>

        {/* AI Results */}
        {analysis && (
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Diagnosis & Advice */}
            <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <h3 className="flex items-center gap-2 font-bold text-[#0F2146] text-lg mb-3">
                        <Activity className="text-blue-600"/> Diagnosis Inferred
                    </h3>
                    <p className="text-gray-700">{analysis.diagnosis_inferred}</p>
                </div>

                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                    <h3 className="flex items-center gap-2 font-bold text-amber-800 text-lg mb-3">
                        <AlertTriangle className="text-amber-600"/> Important Warnings
                    </h3>
                    <p className="text-gray-700">{analysis.warnings}</p>
                </div>
            </div>

            {/* Medicines List */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <h3 className="font-bold text-[#0F2146] flex items-center gap-2">
                        <FileText size={18}/> Detected Medicines
                    </h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {analysis.medicines.map((med, i) => (
                        <div key={i} className="p-4 hover:bg-gray-50">
                            <div className="flex justify-between font-bold text-gray-800">
                                <span>{med.name}</span>
                                <span className="text-blue-600">{med.dosage}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{med.timing}</p>
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