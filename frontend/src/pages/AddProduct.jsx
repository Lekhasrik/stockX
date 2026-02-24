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

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <select
        onChange={e => setForm({ ...form, category: e.target.value })}
      >
        <option>Select Category</option>
        {categories.map(c => (
          <option key={c._id}>{c.name}</option>
        ))}
      </select>

      <input type="number" placeholder="Price"
        onChange={e => setForm({ ...form, price: e.target.value })} />

      <input type="number" placeholder="Stock"
        onChange={e => setForm({ ...form, stock: e.target.value })} />

      <input type="number" placeholder="Min Stock"
        onChange={e => setForm({ ...form, minStock: e.target.value })} />

      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProduct;