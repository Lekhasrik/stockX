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

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!name.trim()) {
      setToast({ message: "Category name is required", type: "error" });
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/categories", { name });
      setToast({ message: "Category added successfully", type: "success" });
      setName("");
      fetchCategories();
    } catch (error) {
      setToast({ message: "Error adding category", type: "error" });
    } finally {
      setLoading(false);
    }
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

  // return (
  //   <div>
  //     <h2>Categories</h2>
  //     <input
  //       value={name}
  //       onChange={e => setName(e.target.value)}
  //       placeholder="Category Name"
  //     />
  //     <button onClick={addCategory}>Add</button>

  //     <ul>
  //       {categories.map(c => (
  //         <li key={c._id}>
  //           {c.name}
  //           <button onClick={() => deleteCategory(c._id)}>Delete</button>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  return (
  <div className="p-10 min-h-screen">
    {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

    <div className="max-w-xl mx-auto bg-white backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-300">

      <h2 className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-teal-500 bg-clip-text text-transparent mb-6 text-center">
        📂 Categories
      </h2>

      <div className="flex gap-4 mb-6">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Category Name"
          className="flex-1 p-3 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-ocean-400 outline-none text-white placeholder-gray-400"
        />
        <button
          onClick={addCategory}
          disabled={loading}
          className="bg-gradient-to-r from-ocean-500 to-teal-500 hover:from-ocean-600 hover:to-teal-600 px-6 rounded-lg font-semibold hover:scale-105 transition shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-white"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      <ul className="space-y-3">
        {categories.map(c => (
          <li
            key={c._id}
            className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 hover:scale-[1.02] hover:border-ocean-300 transition"
          >
            <span className="text-blue">{c.name}</span>
            <button
              onClick={() => deleteCategory(c._id)}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 px-3 py-1 rounded-lg transition shadow-lg text-white"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

    </div>
  </div>
);
}

export default Categories;

