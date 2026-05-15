// // user/Cart.jsx
// import axios from "axios";

// export default function Cart({cart}) {

//   const user = JSON.parse(localStorage.getItem("user"));

//   const placeOrder = async () => {
//     const total = cart.reduce((a,b)=>a+b.price,0);

//     await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, {
//       userId: user._id,
//       items: cart,
//       total
//     });

//     alert("Order placed");
//   };

//   return <button onClick={placeOrder}>Pay / Place Order</button>;
// }


//new

import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  const placeOrder = async () => {
    try {
      // await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, {
      //   userId: user._id,
      //   items: cart,
      //   total
      // });

      //new
await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, {
  userId: user._id,
  items: cart,
  paymentMethod: "COD"
});

      alert("Order placed ✅");

      localStorage.removeItem("cart");
      setCart([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">My Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-400">Cart is empty</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div key={i} className="border p-4 mb-3 rounded-xl flex justify-between">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500">₹{item.price}</p>
              </div>

              <button
                onClick={() => removeItem(i)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="mt-6 p-4 bg-white border rounded-xl">
            <h3 className="font-semibold">Total: ₹{total}</h3>

            <button
              onClick={placeOrder}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl"
            >
              Pay / Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}