import { useState, useEffect } from "react";
import api from "../api"; // Your Axios instance
import { 
  Package, Plus, AlertTriangle, Search, Filter, 
  ShoppingCart, History, ChevronDown 
} from "lucide-react";
import PageTransition from "../components/PageTransition";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form State for New Item
  const [newItem, setNewItem] = useState({
    name: "", sku: "", category: "Tablet", unit_price: 0, min_stock_alert: 10,
    batches: [{ batch_number: "", expiry_date: "", quantity: 0, supplier: "" }]
  });

  // Fetch Inventory
  const fetchInventory = async () => {
    try {
      // Create a GET endpoint in your inventory_router.py to return all items first!
      // For now, assuming endpoints exist.
      const res = await api.get("/inventory/all"); 
      setItems(res.data);
    } catch (err) {
      console.error("Failed to load inventory", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleCreateItem = async () => {
    try {
      await api.post("/inventory/add-item", newItem);
      setShowAddModal(false);
      fetchInventory(); // Refresh table
      alert("Item Added Successfully!");
    } catch (err) {
      alert("Error adding item");
    }
  };

  return (
    <PageTransition>
      <div className="p-6 space-y-6">
        
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-[#0F2146] text-white p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-start">
                 <div>
                   <p className="text-blue-200 text-sm font-bold uppercase">Total Products</p>
                   <h2 className="text-3xl font-bold mt-2">{items.length}</h2>
                 </div>
                 <Package size={32} className="text-blue-400" />
              </div>
           </div>
           
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                 <div>
                   <p className="text-gray-500 text-sm font-bold uppercase">Low Stock Alerts</p>
                   <h2 className="text-3xl font-bold text-red-600 mt-2">
                     {items.filter(i => i.total_stock < i.min_stock_alert).length}
                   </h2>
                 </div>
                 <AlertTriangle size={32} className="text-red-100 text-red-500" />
              </div>
           </div>
        </div>

        {/* Toolbar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
           <div className="relative w-96">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search medicine by Name or SKU..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F2146]"
              />
           </div>
           <button 
             onClick={() => setShowAddModal(true)}
             className="bg-[#0F2146] text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-900 transition-colors"
           >
             <Plus size={18} /> Add New Stock
           </button>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
           <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b border-gray-200">
                 <tr>
                    <th className="p-4">Medicine Name</th>
                    <th className="p-4">SKU</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Stock Level</th>
                    <th className="p-4">Unit Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                 {items.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                       <td className="p-4 font-bold text-[#0F2146]">{item.name}</td>
                       <td className="p-4 font-mono text-gray-500">{item.sku}</td>
                       <td className="p-4">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold text-gray-600">{item.category}</span>
                       </td>
                       <td className="p-4 font-bold">
                          {item.total_stock} <span className="text-xs font-normal text-gray-400">units</span>
                       </td>
                       <td className="p-4">₹ {item.unit_price}</td>
                       <td className="p-4">
                          {item.total_stock < item.min_stock_alert ? (
                             <span className="flex items-center gap-1 text-red-600 font-bold text-xs bg-red-50 px-2 py-1 rounded-full w-fit">
                                <AlertTriangle size={12} /> Low Stock
                             </span>
                          ) : (
                             <span className="text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded-full">In Stock</span>
                          )}
                       </td>
                       <td className="p-4">
                          <button className="text-blue-600 font-bold hover:underline text-xs">Dispense</button>
                       </td>
                    </tr>
                 ))}
                 {items.length === 0 && !loading && (
                    <tr>
                       <td colSpan="7" className="p-8 text-center text-gray-400">No inventory items found. Add some stock!</td>
                    </tr>
                 )}
              </tbody>
           </table>
        </div>

        {/* --- ADD ITEM MODAL --- */}
{showAddModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
      <h2 className="text-xl font-bold text-[#0F2146] mb-4">Add New Medicine</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">Medicine Name</label>
          <input 
            type="text" 
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            value={newItem.name}
            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">SKU / Code</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              value={newItem.sku}
              onChange={(e) => setNewItem({...newItem, sku: e.target.value})}
            />
          </div>
          <div>
             <label className="block text-xs font-bold text-gray-500 uppercase">Category</label>
             <select 
               className="w-full border border-gray-300 rounded-lg p-2 mt-1"
               value={newItem.category}
               onChange={(e) => setNewItem({...newItem, category: e.target.value})}
             >
               <option>Tablet</option>
               <option>Syrup</option>
               <option>Injection</option>
               <option>Consumable</option>
             </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="block text-xs font-bold text-gray-500 uppercase">Unit Price (₹)</label>
             <input 
               type="number" 
               className="w-full border border-gray-300 rounded-lg p-2 mt-1"
               value={newItem.unit_price}
               onChange={(e) => setNewItem({...newItem, unit_price: Number(e.target.value)})}
             />
           </div>
           <div>
             <label className="block text-xs font-bold text-gray-500 uppercase">Initial Quantity</label>
             <input 
               type="number" 
               className="w-full border border-gray-300 rounded-lg p-2 mt-1"
               value={newItem.batches[0].quantity}
               onChange={(e) => {
                  const newBatches = [...newItem.batches];
                  newBatches[0].quantity = Number(e.target.value);
                  setNewItem({...newItem, batches: newBatches});
               }}
             />
           </div>
        </div>
        
        {/* Batch Details */}
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
           <p className="text-xs font-bold text-gray-500 mb-2">BATCH DETAILS (FEFO)</p>
           <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Batch No."
                className="border p-2 rounded text-sm"
                value={newItem.batches[0].batch_number}
                onChange={(e) => {
                   const newBatches = [...newItem.batches];
                   newBatches[0].batch_number = e.target.value;
                   setNewItem({...newItem, batches: newBatches});
                }}
              />
              <input 
                type="date" 
                className="border p-2 rounded text-sm"
                value={newItem.batches[0].expiry_date}
                onChange={(e) => {
                   const newBatches = [...newItem.batches];
                   newBatches[0].expiry_date = e.target.value;
                   setNewItem({...newItem, batches: newBatches});
                }}
              />
           </div>
        </div>

      </div>

            <div className="mt-6 flex justify-end gap-3">
            <button 
               onClick={() => setShowAddModal(false)}
               className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg"
            >
               Cancel
            </button>
            <button 
               onClick={handleCreateItem}
               className="px-6 py-2 bg-[#0F2146] text-white font-bold rounded-lg hover:bg-blue-900"
            >
               Save Stock
            </button>
            </div>
         </div>
      </div>
      )}

      </div>
    </PageTransition>
  );
}