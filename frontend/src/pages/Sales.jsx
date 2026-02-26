import { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../components/Toast";

function Sales() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(() => setToast({ message: "Error loading products", type: "error" }));
  }, []);

  const handleSale = async () => {
    if (!productId || !quantity) {
      setToast({ message: "Please select product and quantity", type: "error" });
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/sales", {
        productId,
        quantity: parseInt(quantity)
      });
      setToast({ message: "Sale completed successfully", type: "success" });
      setProductId("");
      setQuantity("");
    } catch (err) {
      setToast({ message: err.response?.data?.message || "Error processing sale", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div>
  //     <h2>Sales</h2>

  //     <select onChange={e => setProductId(e.target.value)}>
  //       <option>Select Product</option>
  //       {products.map(p => (
  //         <option key={p._id} value={p._id}>
  //           {p.name}
  //         </option>
  //       ))}
  //     </select>

  //     <input type="number"
  //       placeholder="Quantity"
  //       onChange={e => setQuantity(e.target.value)} />

  //     <button onClick={handleSale}>Sell</button>
  //   </div>
  // );

  return (
  <div className="p-10 min-h-screen">
    {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

    <div className="max-w-md mx-auto bg-white backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-300">

      <h2 className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-teal-500 bg-clip-text text-transparent mb-6 text-center">
        💰 Sales
      </h2>

      <div className="space-y-4">

        <select
          onChange={e => setProductId(e.target.value)}
          className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-ocean-400 outline-none text-blue"
        >
          <option>Select Product</option>
          {products.map(p => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-ocean-400 outline-none text-white placeholder-gray-400"
        />

        <button
          onClick={handleSale}
          disabled={loading}
          className="w-full bg-gradient-to-r from-ocean-500 to-teal-500 hover:from-ocean-600 hover:to-teal-600 p-3 rounded-lg font-semibold hover:scale-105 transition shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-white"
        >
          {loading ? "Processing..." : "Sell Product 🚀"}
        </button>

      </div>

    </div>
  </div>
);
}

export default Sales;

