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

  const selectedProduct = products.find(p => p._id === productId);

  const handleSale = async () => {
    if (!productId || !quantity) {
      setToast({ message: "Please select product and quantity", type: "error" });
      return;
    }
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/sales", { productId, quantity: parseInt(quantity) });
      setToast({ message: "Sale completed successfully", type: "success" });
      setProductId("");
      setQuantity("");
    } catch (err) {
      setToast({ message: err.response?.data?.message || "Error processing sale", type: "error" });
    } finally { setLoading(false); }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-gray-800 text-sm placeholder-gray-400 transition";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50/50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
          {/* Header */}
          <div className="text-center mb-2">
            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Quick Sale</h2>
            <p className="text-sm text-gray-400 mt-1">Record a single product sale</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Product</label>
            <select value={productId} onChange={e => setProductId(e.target.value)}
              className={`${inputCls} cursor-pointer`}>
              <option value="">Select Product</option>
              {products.map(p => (
                <option key={p._id} value={p._id}>{p.name} — ₹{p.price.toLocaleString()} (Stock: {p.stock})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Quantity</label>
            <input type="number" placeholder="Enter quantity" value={quantity}
              onChange={e => setQuantity(e.target.value)} className={inputCls} min="1" />
          </div>

          {/* Preview */}
          {selectedProduct && quantity > 0 && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold text-gray-800">₹{(selectedProduct.price * parseInt(quantity || 0)).toLocaleString()}</span>
              </div>
            </div>
          )}

          <button onClick={handleSale} disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Processing..." : "Complete Sale"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sales;

