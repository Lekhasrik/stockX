// // user/MyOrders.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function MyOrders() {
//   const [orders,setOrders] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(()=>{
//     axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${user._id}`)
//       .then(res=>setOrders(res.data));
//   },[]);

//   return (
//     <div>
//       {orders.map(o=>(
//         <div key={o._id} className="border p-4 mb-2">
//           <p>Order No: {o.orderNumber}</p>
//           <p>Status: {o.status}</p>
//           <p>Total: ₹{o.total}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

//new

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function MyOrders() {
//   const [orders, setOrders] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_API_URL}/api/orders/${user._id}`)
//       .then(res => setOrders(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">My Orders</h2>

//       {orders.length === 0 ? (
//         <p>No orders yet</p>
//       ) : (
//         orders.map(o => (
//           <div key={o._id} className="border p-4 mb-2 rounded">
//             <p>{o.productName}</p>
//             <p>₹{o.price}</p>
//             <p>{o.paymentMethod}</p>
//             <p className="text-green-600">{o.status}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


//new-2

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function MyOrders() {
//   const [orders, setOrders] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (!user) return;

//     axios
//       .get(`${import.meta.env.VITE_API_URL}/api/orders/${user._id}`)
//       .then(res => {
//         console.log("ORDERS:", res.data); // 🔥 debug
//         setOrders(res.data);
//       })
//       .catch(err => console.log(err));
//   }, []);

//   return (
//     <div className="p-6">

//       <h2 className="text-2xl font-bold mb-4">My Orders</h2>

//       {orders.length === 0 ? (
//         <p className="text-gray-400">No orders yet</p>
//       ) : (
//         orders.map(order => (
//           <div key={order._id} className="border p-4 mb-4 rounded-xl bg-white">

//             {/* 🔥 Items */}
//             {order.items?.map((item, i) => (
//               <div key={i} className="flex justify-between mb-2">
//                 <p>{item.name}</p>
//                 <p>₹{item.price}</p>
//               </div>
//             ))}

//             {/* 🔥 Total */}
//             {/* <p className="font-semibold mt-2">Total: ₹{order.total}</p> */}

//             <p className="font-semibold mt-2">
//   Total: ₹{order.total ?? order.items?.reduce((sum, item) => sum + item.price, 0)}
// </p>

//             {/* 🔥 Payment */}
//             <p className="text-sm text-gray-500">
//               Payment: {order.paymentMethod || "COD"}
//             </p>

//             {/* 🔥 Status */}
//             <p className="text-green-600 font-medium">
//               {order.status || "Placed"}
//             </p>

//           </div>
//         ))
//       )}

//     </div>
//   );
// }

//new-3

import { useEffect, useState } from "react";
import axios from "axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/orders/${user._id}`)
      .then((res) => {
        console.log("ORDERS:", res.data);
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-400">No orders yet</p>
      ) : (
        orders.map((order) => {
          // 🔥 SAFE TOTAL CALCULATION
          const calcTotal =
            order.items?.reduce(
              (sum, item) => sum + (Number(item.price) || 0),
              0
            ) || 0;

          const finalTotal = order.total ?? calcTotal;

          return (
            <div
              key={order._id}
              className="border p-4 mb-4 rounded-xl bg-white shadow-sm"
            >
              {/* 🛒 ITEMS */}
              {order.items?.map((item, i) => (
                <div key={i} className="flex justify-between mb-2">
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                </div>
              ))}

              {/* 💰 TOTAL */}
              <p className="font-semibold mt-2">
                Total: ₹{finalTotal}
              </p>

              {/* 💳 PAYMENT */}
              <p className="text-sm text-gray-500">
                Payment: {order.paymentMethod || "COD"}
              </p>

              {/* 📦 STATUS */}
              <p className="text-green-600 font-medium">
                {order.status || "Placed"}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}