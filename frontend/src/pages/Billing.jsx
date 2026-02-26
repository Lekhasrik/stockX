import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import axios from "axios";
import Toast from "../components/Toast";

function Billing() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(() => setToast({ message: "Error loading products", type: "error" }));
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item.name === product.name);

    if (existing) {
      setCart(cart.map(item =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (name, qty) => {
    setCart(cart.map(item =>
      item.name === name
        ? { ...item, quantity: Number(qty) }
        : item
    ));
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );




const saveBill = async () => {
  if (cart.length === 0) {
    setToast({ message: "Cart is empty", type: "error" });
    return;
  }

  try {
    setLoading(true);
    const response = await axios.post(
      "http://localhost:5000/api/sales/bulk",
      {
        items: cart.map(item => ({
          productId: item._id,
          quantity: item.quantity
        }))
      }
    );

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

  doc.text("My Shop Name", 20, 20);
  doc.text(`Invoice No: ${invoiceNumber}`, 20, 30);
  doc.text(`Date: ${new Date().toLocaleString()}`, 20, 40);

  let y = 60;

  cart.forEach(item => {
    doc.text(
      `${item.name} - ${item.quantity} x ${item.price}`,
      20,
      y
    );
    y += 10;
  });

  doc.text(`Total: ₹${totalAmount}`, 20, y + 10);

  doc.save(`${invoiceNumber}.pdf`);
};


  // return (
  //   // <div>
  //   <div className="p-8 min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
  //     <h2>🧾 Billing Page</h2>

  //     <h3>Select Products</h3>
  //     {products.map(p => (
  //       <div key={p._id}>
  //         {p.name} - ₹{p.price}
  //         <button onClick={() => addToCart(p)}>
  //           Add
  //         </button>
  //       </div>
  //     ))}

      

  //     <hr />

  //     <h3>Bill Items</h3>
  //     {cart.map(item => (
  //       <div key={item.name}>
  //         {item.name} - ₹{item.price}
  //         <input
  //           type="number"
  //           value={item.quantity}
  //           min="1"
  //           onChange={(e) =>
  //             updateQuantity(item.name, e.target.value)
  //           }
  //         />
  //         = ₹{item.price * item.quantity}
  //       </div>
  //     ))}

  //     <h2>Total: ₹{totalAmount}</h2>

  //     <button onClick={saveBill}>Save Bill</button>
  //     <button onClick={downloadBill}>Download Bill</button>
  //   </div>
  // );

  return (
  <div className="p-10 min-h-screen">
    {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

    <h2 className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-teal-500 bg-clip-text text-transparent mb-8">
      🧾 Billing Dashboard
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* Products Section */}
      <div className="bg-white backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-300 animate-fadeIn">
        <h3 className="text-xl font-semibold mb-4 text-gray-600">
          Select Products
        </h3>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {products.map(p => (
            <div
              key={p._id}
              className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 hover:border-ocean-300 hover:scale-[1.02] transition"
            >
              <div>
                <p className="font-semibold text-blue">{p.name}</p>
                <p className="text-sm text-gray-700">₹{p.price}</p>
              </div>

              <button
                onClick={() => addToCart(p)}
                className="bg-gradient-to-r from-ocean-500 to-teal-500 hover:from-ocean-600 hover:to-teal-600 px-4 py-1 rounded-lg hover:scale-105 transition shadow-xl text-white"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>


      {/* Cart Section */}
      <div className="bg-white backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-300 animate-fadeIn">
        <h3 className="text-xl font-semibold mb-4 text-gray-600">
          Bill Items
        </h3>

        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
          {cart.length === 0 && (
            <p className="text-gray-700">No items added</p>
          )}

          {cart.map(item => (
            <div
              key={item.name}
              className="bg-white p-3 rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-white">{item.name}</span>
                <span className="text-white">₹{item.price}</span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  className="w-16 p-1 rounded bg-white border border-gray-300 text-center text-white"
                  onChange={(e) =>
                    updateQuantity(item.name, e.target.value)
                  }
                />

                <span className="font-semibold text-gray-600">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 border-t border-gray-300 pt-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-ocean-600 to-teal-500 bg-clip-text text-transparent">
            Total: ₹{totalAmount}
          </h2>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={saveBill}
            disabled={loading || cart.length === 0}
            className="flex-1 bg-gradient-to-r from-ocean-500 to-teal-500 hover:from-ocean-600 hover:to-teal-600 p-3 rounded-lg font-semibold transition hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-white"
          >
            {loading ? "Processing..." : "Save Bill ✅"}
          </button>

          <button
            onClick={() => downloadBill("Preview", totalAmount)}
            disabled={cart.length === 0}
            className="flex-1 bg-gradient-to-r from-ocean-600 to-teal-600 hover:brightness-110 p-3 rounded-lg font-semibold transition hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-white"
          >
            Download 📄
          </button>
        </div>
      </div>

    </div>
  </div>
);
}

export default Billing;

