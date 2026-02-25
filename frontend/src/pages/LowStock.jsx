import { useEffect, useState } from "react";
import axios from "axios";

function LowStock() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        const filtered = res.data.filter(p => p.status === "Low Stock");
        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-500"></div>
      </div>
    );
  }

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
  <div className="p-10 min-h-screen">

    <div className="max-w-2xl mx-auto bg-gradient-to-br from-red-900 to-red-800 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-red-500">

      <h2 className="text-4xl font-bold text-red-300 mb-6">
        ⚠ Low Stock Products
      </h2>

      {products.length === 0 && (
        <p className="text-gray-600 text-lg">All products are in good stock ✅</p>
      )}

      <ul className="space-y-4">
        {products.map(p => (
          <li
            key={p._id}
            className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 hover:border-ocean-300 transition"
          >
            <span className="font-medium text-white">{p.name}</span>
            <span className="text-red-300 font-semibold">
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

