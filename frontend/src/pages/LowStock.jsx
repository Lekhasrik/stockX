import { useEffect, useState } from "react";
import axios from "axios";

function LowStock() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        const filtered = res.data.filter(p => p.status === "Low Stock");
        setProducts(filtered);
      });
  }, []);

  return (
    <div>
      <h2 style={{ color: "red" }}>Low Stock Products</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - Stock: {p.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LowStock;