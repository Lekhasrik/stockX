import { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../components/Toast";

function AddProduct() {
  const [form, setForm] = useState({ name: "", category: "", price: "", stock: "", minStock: "" });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then(res => setCategories(res.data))
      .catch(() => setToast({ message: "Error loading categories", type: "error" }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price || !form.stock || !form.minStock) {
      setToast({ message: "All fields are required", type: "error" });
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/products", form);
      const msg = res.data.merged
        ? res.data.message
        : "Product added successfully";
      setToast({ message: msg, type: "success" });
      setForm({ name: "", category: "", price: "", stock: "", minStock: "" });
    } catch (error) {
      setToast({ message: error.response?.data?.message || "Error adding product", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-gray-800 text-sm placeholder-gray-400 transition";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50/50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
          {/* Header */}
          <div className="text-center mb-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📦</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Add Product</h2>
            <p className="text-sm text-gray-400 mt-1">Add a new item to your inventory</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Product Name</label>
            <input className={inputCls} placeholder="e.g. iPhone 15 Pro" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Category</label>
            <select className={`${inputCls} cursor-pointer`} value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="">Select Category</option>
              {categories.map(c => <option key={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Price (₹)</label>
              <input type="number" className={inputCls} placeholder="0" value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Stock</label>
              <input type="number" className={inputCls} placeholder="0" value={form.stock}
                onChange={e => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Min Stock</label>
              <input type="number" className={inputCls} placeholder="0" value={form.minStock}
                onChange={e => setForm({ ...form, minStock: e.target.value })} />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;

