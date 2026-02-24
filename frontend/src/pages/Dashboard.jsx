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

  return (
    <div style={{ display: "flex" }}>
      <Card title="Total Products" value={products.length} />
      <Card title="Low Stock Items" value={lowStock} />
    </div>
  );
}

export default Dashboard;