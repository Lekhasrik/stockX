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

  return (
    <div>
      <h2>Categories</h2>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Category Name"
      />
      <button onClick={addCategory}>Add</button>

      <ul>
        {categories.map(c => (
          <li key={c._id}>
            {c.name}
            <button onClick={() => deleteCategory(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;