import { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../components/Toast";

function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (error) {
      setToast({ message: "Error loading categories", type: "error" });
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const addCategory = async () => {
    if (!name.trim()) { setToast({ message: "Category name is required", type: "error" }); return; }
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/categories", { name });
      setToast({ message: "Category added successfully", type: "success" });
      setName("");
      fetchCategories();
    } catch (error) {
      setToast({ message: "Error adding category", type: "error" });
    } finally { setLoading(false); }
  };

  const deleteCategory = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setToast({ message: "Category deleted successfully", type: "success" });
      fetchCategories();
    } catch (error) {
      setToast({ message: "Error deleting category", type: "error" });
    }
  };

  return (
    <div className="p-6 lg:p-10 min-h-screen bg-gray-50/50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📂</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Categories</h2>
          <p className="text-sm text-gray-400 mt-1">Organize your products by category</p>
        </div>

        {/* Add Category */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex gap-3">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="New category name..."
              onKeyDown={e => e.key === "Enter" && addCategory()}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-gray-800 text-sm placeholder-gray-400 transition"
            />
            <button
              onClick={addCategory}
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        {/* Category List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">All Categories</h3>
              <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">{categories.length} total</span>
            </div>
          </div>

          <ul className="divide-y divide-gray-50">
            {categories.map(c => (
              <li key={c._id} className="flex justify-between items-center px-6 py-4 hover:bg-blue-50/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{c.name}</span>
                </div>
                <button
                  onClick={() => deleteCategory(c._id)}
                  className="px-3 py-1.5 bg-red-50 text-red-500 text-xs font-medium rounded-lg hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          {categories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm">No categories yet. Add your first one above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;

