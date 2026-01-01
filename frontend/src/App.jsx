import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
import LandingPage from "./pages/LandingPage"; // <--- New
import DashboardHome from "./pages/DashboardHome";
import RegisterPatient from "./pages/RegisterPatient";
import BookAppointment from "./pages/BookAppointment";
import Login from "./pages/Login";

// Placeholder for Login
// const Login = () => (
//   <div className="h-screen flex items-center justify-center bg-gray-50">
//     <div className="text-center">
//       <h2 className="text-2xl font-bold text-[#0F2146]">Login Page Coming Soon</h2>
//       <a href="/dashboard" className="text-blue-600 underline mt-4 block">Skip to Dashboard (Dev Only)</a>
//     </div>
//   </div>
// );

// Placeholder for Development
const Placeholder = ({ title }) => (
  <div className="p-10 border-2 border-dashed border-gray-300 rounded-lg text-center h-96 flex flex-col justify-center items-center">
    <h2 className="text-3xl font-bold text-gray-300">{title}</h2>
    <p className="text-gray-400 mt-2">Module under development.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* PUBLIC ROUTES (No Sidebar/Layout) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        {/* PROTECTED ROUTES (Wrapped in Dashboard Layout) */}
        <Route path="/dashboard" element={<Layout><DashboardHome /></Layout>} />
        <Route path="/register" element={<Layout><RegisterPatient /></Layout>} />
        <Route path="/booking" element={<Layout><BookAppointment /></Layout>} />
        
        {/* Sidebar Links mapped to Placeholders */}
        <Route path="/queue" element={<Layout><Placeholder title="Queue Management" /></Layout>} />
        <Route path="/billing" element={<Layout><Placeholder title="Billing & Invoicing" /></Layout>} />
        <Route path="/inventory" element={<Layout><Placeholder title="Pharmacy Inventory" /></Layout>} />
        <Route path="/lab" element={<Layout><Placeholder title="Laboratory (LIS)" /></Layout>} />
        <Route path="/radiology" element={<Layout><Placeholder title="Radiology (RIS)" /></Layout>} />
        <Route path="/settings" element={<Layout><Placeholder title="System Settings" /></Layout>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;