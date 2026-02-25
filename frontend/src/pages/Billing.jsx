

import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import axios from "axios";

function Billing() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
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
  try {
    const response = await axios.post(
      "http://localhost:5000/api/sales/bulk",
      {
        items: cart.map(item => ({
          productId: item._id,
          quantity: item.quantity
        }))
      }
    );

    console.log("Backend Response:", response.data);

    const invoiceNumber = response.data.invoiceNumber;
    const totalAmount = response.data.totalAmount;

    downloadBill(invoiceNumber, totalAmount);

    setCart([]);

    alert("Bill Saved Successfully ✅");

  } catch (error) {
    console.error(error);
    alert("Error saving bill ❌");
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
  <div className="p-10 min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">

    <h2 className="text-3xl font-bold text-blue-300 mb-8">
      🧾 Billing Dashboard
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* Products Section */}
      <div className="bg-blue-900/40 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-blue-500/30 animate-fadeIn">
        <h3 className="text-xl font-semibold mb-4 text-blue-200">
          Select Products
        </h3>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {products.map(p => (
            <div
              key={p._id}
              className="flex justify-between items-center bg-blue-950 p-3 rounded-lg border border-blue-700 hover:scale-[1.02] transition"
            >
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-blue-400">₹{p.price}</p>
              </div>

              <button
                onClick={() => addToCart(p)}
                className="bg-gradient-to-r from-blue-500 to-blue-400 px-4 py-1 rounded-lg hover:scale-105 transition shadow-lg"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>


      {/* Cart Section */}
      <div className="bg-blue-900/40 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-blue-500/30 animate-fadeIn">
        <h3 className="text-xl font-semibold mb-4 text-blue-200">
          Bill Items
        </h3>

        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
          {cart.length === 0 && (
            <p className="text-blue-400">No items added</p>
          )}

          {cart.map(item => (
            <div
              key={item.name}
              className="bg-blue-950 p-3 rounded-lg border border-blue-700"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.name}</span>
                <span>₹{item.price}</span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  className="w-16 p-1 rounded bg-blue-900 border border-blue-600 text-center"
                  onChange={(e) =>
                    updateQuantity(item.name, e.target.value)
                  }
                />

                <span className="font-semibold text-blue-300">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 border-t border-blue-600 pt-4">
          <h2 className="text-2xl font-bold text-blue-300">
            Total: ₹{totalAmount}
          </h2>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={saveBill}
            className="flex-1 bg-green-500 hover:bg-green-400 p-3 rounded-lg font-semibold transition hover:scale-105 shadow-lg"
          >
            Save Bill ✅
          </button>

          <button
            onClick={() => downloadBill("Preview", totalAmount)}
            className="flex-1 bg-blue-500 hover:bg-blue-400 p-3 rounded-lg font-semibold transition hover:scale-105 shadow-lg"
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