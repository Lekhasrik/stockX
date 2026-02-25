import { useState, useEffect } from "react";
import axios from "axios";

function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    axios.get("http://localhost:5000/api/categories")
      .then(res => setCategories(res.data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = () => {
    axios.post("http://localhost:5000/api/categories", { name })
      .then(() => {
        setName("");
        fetchCategories();
      });
  };

  const deleteCategory = (id) => {
    axios.delete(`http://localhost:5000/api/categories/${id}`)
      .then(() => fetchCategories());
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
  <div className="p-10 min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">

    <div className="max-w-xl mx-auto bg-blue-900/40 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-blue-500/30">

      <h2 className="text-3xl font-bold text-blue-300 mb-6 text-center">
        📂 Categories
      </h2>

      <div className="flex gap-4 mb-6">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Category Name"
          className="flex-1 p-3 rounded-lg bg-blue-950 border border-blue-600 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          onClick={addCategory}
          className="bg-gradient-to-r from-blue-500 to-blue-400 px-6 rounded-lg font-semibold hover:scale-105 transition shadow-lg"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {categories.map(c => (
          <li
            key={c._id}
            className="flex justify-between items-center bg-blue-950 p-3 rounded-lg border border-blue-700 hover:scale-[1.02] transition"
          >
            <span>{c.name}</span>
            <button
              onClick={() => deleteCategory(c._id)}
              className="bg-red-500 hover:bg-red-400 px-3 py-1 rounded-lg transition"
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