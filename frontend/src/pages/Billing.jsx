import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import axios from "axios";
import Toast from "../components/Toast";

function Billing() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(() => setToast({ message: "Error loading products", type: "error" }));
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item.name === product.name);
    if (existing) {
      setCart(cart.map(item =>
        item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (name) => {
    setCart(cart.filter(item => item.name !== name));
  };

  const updateQuantity = (name, qty) => {
    if (qty < 1) return;
    setCart(cart.map(item =>
      item.name === name ? { ...item, quantity: Number(qty) } : item
    ));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const saveBill = async () => {
    if (cart.length === 0) {
      setToast({ message: "Cart is empty", type: "error" });
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/sales/bulk", {
        items: cart.map(item => ({ productId: item._id, quantity: item.quantity }))
      });
      const invoiceNumber = response.data.invoiceNumber;
      const totalAmount = response.data.totalAmount;
      downloadBill(invoiceNumber, totalAmount);
      setCart([]);
      setToast({ message: "Bill saved successfully", type: "success" });
    } catch (error) {
      setToast({ message: error.response?.data?.message || "Error saving bill", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const downloadBill = (invoiceNumber, totalAmount) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("StockX", 20, 20);
    doc.setFontSize(11);
    doc.text(`Invoice: ${invoiceNumber}`, 20, 30);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 38);
    doc.line(20, 44, 190, 44);
    let y = 54;
    doc.setFontSize(10);
    doc.text("Item", 20, y); doc.text("Qty", 100, y); doc.text("Price", 130, y); doc.text("Total", 165, y);
    y += 8;
    cart.forEach(item => {
      doc.text(item.name, 20, y);
      doc.text(String(item.quantity), 100, y);
      doc.text(String(item.price), 130, y);
      doc.text(String(item.price * item.quantity), 165, y);
      y += 7;
    });
    doc.line(20, y + 2, 190, y + 2);
    doc.setFontSize(12);
    doc.text(`Total: Rs. ${totalAmount}`, 130, y + 12);
    doc.save(`${invoiceNumber}.pdf`);
  };

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-gray-50/50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Billing</h2>
        <p className="text-sm text-gray-400 mt-1">Create invoices and manage cart items</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ─── Products Panel (3 cols) ─── */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Products</h3>
              <span className="text-xs text-gray-400">{filteredProducts.length} items</span>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all placeholder:text-gray-300"
              />
            </div>

            {/* Product List */}
            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {filteredProducts.map(p => (
                <div key={p._id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Stock: {p.stock}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-3">
                    <span className="text-sm font-semibold text-gray-700">Rs. {p.price}</span>
                    <button
                      onClick={() => addToCart(p)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <p className="text-center text-sm text-gray-400 py-8">No products found</p>
              )}
            </div>
          </div>
        </div>

        {/* ─── Cart Panel (2 cols) ─── */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Cart</h3>
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">{cart.length} items</span>
            </div>

            {/* Cart Items */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 flex-1">
              {cart.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-gray-300">
                  <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
                  <p className="text-sm">Cart is empty</p>
                </div>
              )}

              {cart.map(item => (
                <div key={item.name} className="p-3 rounded-xl border border-gray-100 bg-gray-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                    <button onClick={() => removeFromCart(item.name)} className="text-xs text-red-400 hover:text-red-600 transition-colors font-medium">Remove</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.name, item.quantity - 1)} className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 flex items-center justify-center text-sm transition-colors">-</button>
                      <span className="w-8 text-center text-sm font-semibold text-gray-700">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.name, item.quantity + 1)} className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 flex items-center justify-center text-sm transition-colors">+</button>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Rs. {item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total & Actions */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">Total Amount</span>
                <span className="text-2xl font-bold text-gray-900">Rs. {totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={saveBill}
                  disabled={loading || cart.length === 0}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Save & Download"}
                </button>
                <button
                  onClick={() => downloadBill("Preview", totalAmount)}
                  disabled={cart.length === 0}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Billing;