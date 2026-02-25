import { useState, useEffect } from "react";
import axios from "axios";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    minStock: ""
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then(res => setCategories(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/products", form)
      .then(() => alert("Product Added"));
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
    <form
      onSubmit={handleSubmit}
      className="bg-blue-900/40 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[400px] space-y-4 border border-blue-500/30 animate-fadeIn"
    >
      <h2 className="text-2xl font-bold text-center text-blue-300">
        ➕ Add Product
      </h2>

      <input
        className="w-full p-3 rounded-lg bg-blue-950 border border-blue-600 focus:ring-2 focus:ring-blue-400 outline-none transition"
        placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <select
        className="w-full p-3 rounded-lg bg-blue-950 border border-blue-600 focus:ring-2 focus:ring-blue-400 outline-none"
        onChange={e => setForm({ ...form, category: e.target.value })}
      >
        <option>Select Category</option>
        {categories.map(c => (
          <option key={c._id}>{c.name}</option>
        ))}
      </select>

      <input type="number"
        className="w-full p-3 rounded-lg bg-blue-950 border border-blue-600"
        placeholder="Price"
        onChange={e => setForm({ ...form, price: e.target.value })}
      />

      <input type="number"
        className="w-full p-3 rounded-lg bg-blue-950 border border-blue-600"
        placeholder="Stock"
        onChange={e => setForm({ ...form, stock: e.target.value })}
      />

      <input type="number"
        className="w-full p-3 rounded-lg bg-blue-950 border border-blue-600"
        placeholder="Min Stock"
        onChange={e => setForm({ ...form, minStock: e.target.value })}
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-blue-400 hover:scale-105 transition transform p-3 rounded-lg font-bold shadow-lg"
      >
        Add Product 🚀
      </button>

      
    </form>

  </div>
);
}

export default AddProduct;