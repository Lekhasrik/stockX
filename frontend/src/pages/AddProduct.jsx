import { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../components/Toast";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    minStock: ""
  });

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
      await axios.post("http://localhost:5000/api/products", form);
      setToast({ message: "Product added successfully", type: "success" });
      setForm({ name: "", category: "", price: "", stock: "", minStock: "" });
    } catch (error) {
      setToast({ message: "Error adding product", type: "error" });
    } finally {
      setLoading(false);
    }
  };


  // return (
  //   <form onSubmit={handleSubmit}>
  //     <input placeholder="Name"
  //       onChange={e => setForm({ ...form, name: e.target.value })} />

  //     <select
  //       onChange={e => setForm({ ...form, category: e.target.value })}
  //     >
  //       <option>Select Category</option>
  //       {categories.map(c => (
  //         <option key={c._id}>{c.name}</option>
  //       ))}
  //     </select>

  //     <input type="number" placeholder="Price"
  //       onChange={e => setForm({ ...form, price: e.target.value })} />

  //     <input type="number" placeholder="Stock"
  //       onChange={e => setForm({ ...form, stock: e.target.value })} />

  //     <input type="number" placeholder="Min Stock"
  //       onChange={e => setForm({ ...form, minStock: e.target.value })} />

  //     <button type="submit">Add Product</button>
  //   </form>
  // );

  return (
  <div className="flex justify-center items-center min-h-screen">
    {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    <form
      onSubmit={handleSubmit}
      className="bg-white backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[400px] space-y-4 border border-gray-300 animate-fadeIn"
    >
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-ocean-600 to-teal-500 bg-clip-text text-transparent">
        ➕ Add Product
      </h2>

      <input
        className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-ocean-400 outline-none transition text-gray-800 placeholder-gray-400"
        placeholder="Product Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <select
        className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-ocean-400 outline-none text-gray-800"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
      >
        <option>Select Category</option>
        {categories.map(c => (
          <option key={c._id}>{c.name}</option>
        ))}
      </select>

      <input type="number"
        className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-ocean-400 outline-none text-gray-800 placeholder-gray-400"
        placeholder="Price (₹)"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
      />

      <input type="number"
        className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-ocean-400 outline-none text-gray-800 placeholder-gray-400"
        placeholder="Stock Quantity"
        value={form.stock}
        onChange={e => setForm({ ...form, stock: e.target.value })}
      />

      <input type="number"
        className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-ocean-400 outline-none text-gray-800 placeholder-gray-400"
        placeholder="Minimum Stock"
        value={form.minStock}
        onChange={e => setForm({ ...form, minStock: e.target.value })}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-ocean-500 to-teal-500 hover:from-ocean-600 hover:to-teal-600 hover:scale-105 transition transform p-3 rounded-lg font-bold shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-gray-800"
      >
        {loading ? "Adding..." : "Add Product 🚀"}
      </button>

      
    </form>

  </div>
);
}

export default AddProduct;

