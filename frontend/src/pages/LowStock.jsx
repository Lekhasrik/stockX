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

  // return (
  //   <div>
  //     <h2 style={{ color: "red" }}>Low Stock Products</h2>
  //     <ul>
  //       {products.map(p => (
  //         <li key={p._id}>
  //           {p.name} - Stock: {p.stock}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  return (
  <div className="p-10 min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">

    <div className="max-w-2xl mx-auto bg-red-900/30 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-red-500/40">

      <h2 className="text-3xl font-bold text-red-400 mb-6">
        ⚠ Low Stock Products
      </h2>

      {products.length === 0 && (
        <p className="text-blue-300">All products are in good stock ✅</p>
      )}

      <ul className="space-y-4">
        {products.map(p => (
          <li
            key={p._id}
            className="flex justify-between items-center bg-blue-950 p-4 rounded-lg border border-blue-700"
          >
            <span className="font-medium">{p.name}</span>
            <span className="text-red-400 font-semibold">
              Stock: {p.stock}
            </span>
          </li>
        ))}
      </ul>

    </div>
  </div>
);
}

export default LowStock;