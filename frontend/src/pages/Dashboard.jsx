import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  }, []);

  const lowStock = products.filter(p => p.status === "Low Stock").length;

  // return (
  //   <div style={{ display: "flex" }}>
  //     <Card title="Total Products" value={products.length} />
  //     <Card title="Low Stock Items" value={lowStock} />
  //   </div>
  // );

  return (
  <div className="p-10 min-h-screen">
    <h2 className="text-3xl font-bold text-blue-300 mb-8">
      📊 Dashboard
    </h2>

    <div className="flex gap-6">
      <div className="bg-blue-900/40 p-8 rounded-2xl shadow-xl w-60 text-center hover:scale-105 transition">
        <h3 className="text-lg">Total Products</h3>
        <p className="text-3xl font-bold text-blue-400">
          {products.length}
        </p>
      </div>

      <div className="bg-red-900/40 p-8 rounded-2xl shadow-xl w-60 text-center hover:scale-105 transition">
        <h3 className="text-lg">Low Stock</h3>
        <p className="text-3xl font-bold text-red-400">
          {lowStock}
        </p>
      </div>
    </div>
  </div>
);
}

export default Dashboard;