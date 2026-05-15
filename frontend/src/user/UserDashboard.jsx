// import { useEffect, useState } from "react";
// import axios from "axios";

// function UserDashboard() {
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const prodRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
//       setProducts(prodRes.data);

//       if (user) {
//         const orderRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${user._id}`);
//         setOrders(orderRes.data);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Calculations
//   const totalOrders = orders.length;
//   const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
//   const pendingOrders = orders.filter(o => o.status === "Pending").length;
//   const deliveredOrders = orders.filter(o => o.status === "Delivered").length;

//   return (
//     <div className="p-6 lg:p-10 min-h-screen bg-gray-50">
      
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900">User Dashboard</h2>
//           <p className="text-gray-400 text-sm">Welcome back, {user?.name}</p>
//         </div>

//         <div className="bg-white px-4 py-2 rounded-xl shadow text-sm text-gray-500">
//           {new Date().toDateString()}
//         </div>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

//         {/* Total Products */}
//         <div className="bg-white p-5 rounded-2xl shadow border">
//           <p className="text-sm text-gray-400">Total Products</p>
//           <h3 className="text-2xl font-bold text-gray-800">{products.length}</h3>
//         </div>

//         {/* Orders */}
//         <div className="bg-white p-5 rounded-2xl shadow border">
//           <p className="text-sm text-gray-400">My Orders</p>
//           <h3 className="text-2xl font-bold text-blue-600">{totalOrders}</h3>
//         </div>

//         {/* Pending */}
//         <div className="bg-white p-5 rounded-2xl shadow border">
//           <p className="text-sm text-gray-400">Pending Orders</p>
//           <h3 className="text-2xl font-bold text-amber-500">{pendingOrders}</h3>
//         </div>

//         {/* Delivered */}
//         <div className="bg-white p-5 rounded-2xl shadow border">
//           <p className="text-sm text-gray-400">Delivered</p>
//           <h3 className="text-2xl font-bold text-green-600">{deliveredOrders}</h3>
//         </div>

//       </div>

//       {/* Total Spent */}
//       <div className="bg-white p-6 rounded-2xl shadow border mb-10">
//         <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Spent</h3>
//         <p className="text-3xl font-bold text-gray-900">₹{totalSpent.toLocaleString()}</p>
//       </div>

//       {/* Recent Orders */}
//       <div className="bg-white rounded-2xl shadow border overflow-hidden">
//         <div className="px-6 py-4 border-b">
//           <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
//         </div>

//         <table className="w-full text-left">
//           <thead className="bg-gray-50 text-gray-400 text-sm">
//             <tr>
//               <th className="px-6 py-3">Order No</th>
//               <th className="px-6 py-3">Total</th>
//               <th className="px-6 py-3">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.slice(0, 5).map((o) => (
//               <tr key={o._id} className="border-t">
//                 <td className="px-6 py-3">{o.orderNumber}</td>
//                 <td className="px-6 py-3 font-semibold">₹{o.total}</td>
//                 <td className="px-6 py-3">
//                   <span className={`px-3 py-1 text-xs rounded-full ${
//                     o.status === "Delivered"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-yellow-100 text-yellow-700"
//                   }`}>
//                     {o.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {orders.length === 0 && (
//           <p className="text-center py-6 text-gray-400">No orders yet</p>
//         )}
//       </div>

//     </div>
//   );
// }

// export default UserDashboard;

//new



// import { useEffect, useState } from "react";
// import axios from "axios";

// function UserDashboard() {
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // ✅ Products
//       const prodRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
//       setProducts(prodRes.data);

//       // ✅ Orders
//       if (user) {
//         const orderRes = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/orders/${user._id}`
//         );
//         setOrders(orderRes.data);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ FIXED calculations
//   const totalOrders = orders.length;

//   const totalSpent = orders.reduce(
//     (sum, o) => sum + (o.price || 0), // 🔥 FIX
//     0
//   );

//   const pendingOrders = orders.filter(
//     (o) => o.status === "Placed" || o.status === "Pending"
//   ).length;

//   const deliveredOrders = orders.filter(
//     (o) => o.status === "Delivered"
//   ).length;

//   return (
//     <div className="p-6 lg:p-10 min-h-screen bg-gray-50">

//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900">User Dashboard</h2>
//           <p className="text-gray-400 text-sm">
//             Welcome back, {user?.name}
//           </p>
//         </div>

//         <div className="bg-white px-4 py-2 rounded-xl shadow text-sm text-gray-500">
//           {new Date().toDateString()}
//         </div>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

//         {/* Total Products */}
//         <div className="bg-white p-5 rounded-2xl shadow border">
//           <p className="text-sm text-gray-400">Total Products</p>
//           <h3 className="text-2xl font-bold text-gray-800">
//             {products.length}
//           </h3>
//         </div>

//         {/* Orders */}
//         <div className="bg-white p-5 rounded-2xl shadow border">
//           <p className="text-sm text-gray-400">My Orders</p>
//           <h3 className="text-2xl font-bold text-blue-600">
//             {totalOrders}
//           </h3>
//         </div>

//         {/* Pending */}
//         <div className="bg-white p-5 rounded-2xl shadow border">
//           <p className="text-sm text-gray-400">Pending Orders</p>
//           <h3 className="text-2xl font-bold text-amber-500">
//             {pendingOrders}
//           </h3>
//         </div>

//         {/* Delivered */}
//         <div className="bg-white p-5 rounded-2xl shadow border">
//           <p className="text-sm text-gray-400">Delivered</p>
//           <h3 className="text-2xl font-bold text-green-600">
//             {deliveredOrders}
//           </h3>
//         </div>

//       </div>

//       {/* Total Spent */}
//       <div className="bg-white p-6 rounded-2xl shadow border mb-10">
//         <h3 className="text-lg font-semibold text-gray-800 mb-2">
//           Total Spent
//         </h3>
//         <p className="text-3xl font-bold text-gray-900">
//           ₹{totalSpent.toLocaleString()}
//         </p>
//       </div>

//       {/* Recent Orders */}
//       <div className="bg-white rounded-2xl shadow border overflow-hidden">
//         <div className="px-6 py-4 border-b">
//           <h3 className="text-lg font-semibold text-gray-800">
//             Recent Orders
//           </h3>
//         </div>

//         <table className="w-full text-left">
//           <thead className="bg-gray-50 text-gray-400 text-sm">
//             <tr>
//               <th className="px-6 py-3">Order ID</th> {/* 🔥 FIX */}
//               <th className="px-6 py-3">Amount</th>   {/* 🔥 FIX */}
//               <th className="px-6 py-3">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.slice(0, 5).map((o) => (
//               <tr key={o._id} className="border-t">
//                 <td className="px-6 py-3">{o._id.slice(-6)}</td> {/* 🔥 FIX */}
//                 <td className="px-6 py-3 font-semibold">
//                   ₹{o.price} {/* 🔥 FIX */}
//                 </td>
//                 <td className="px-6 py-3">
//                   <span
//                     className={`px-3 py-1 text-xs rounded-full ${
//                       o.status === "Delivered"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {o.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {orders.length === 0 && (
//           <p className="text-center py-6 text-gray-400">
//             No orders yet
//           </p>
//         )}
//       </div>

//     </div>
//   );
// }

// export default UserDashboard;


//new-2

import { useEffect, useState } from "react";
import axios from "axios";

function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // ✅ Fetch products
      const prodRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`
      );
      setProducts(prodRes.data);

      // ✅ Fetch orders safely
      if (user?._id) {
        const orderRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders/${user._id}`
        );
        setOrders(orderRes.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Calculations
  const totalOrders = orders.length;

  const totalSpent = orders.reduce(
    (sum, o) => sum + (o.price || 0),
    0
  );

  const pendingOrders = orders.filter((o) =>
    ["Placed", "Pending"].includes(o.status)
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.status === "Delivered"
  ).length;

  return (
    <div className="p-6 lg:p-10 min-h-screen bg-gray-50">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            User Dashboard
          </h2>
          <p className="text-gray-400 text-sm">
            Welcome back, {user?.name || "User"}
          </p>
        </div>

        <div className="bg-white px-4 py-2 rounded-xl shadow text-sm text-gray-500">
          {new Date().toDateString()}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl shadow border">
          <p className="text-sm text-gray-400">Total Products</p>
          <h3 className="text-2xl font-bold text-gray-800">
            {products.length}
          </h3>
        </div>

        {/* My Orders */}
        <div className="bg-white p-5 rounded-2xl shadow border">
          <p className="text-sm text-gray-400">My Orders</p>
          <h3 className="text-2xl font-bold text-blue-600">
            {totalOrders}
          </h3>
        </div>

        {/* Pending */}
        <div className="bg-white p-5 rounded-2xl shadow border">
          <p className="text-sm text-gray-400">Pending Orders</p>
          <h3 className="text-2xl font-bold text-amber-500">
            {pendingOrders}
          </h3>
        </div>

        {/* Delivered */}
        <div className="bg-white p-5 rounded-2xl shadow border">
          <p className="text-sm text-gray-400">Delivered</p>
          <h3 className="text-2xl font-bold text-green-600">
            {deliveredOrders}
          </h3>
        </div>

      </div>

      {/* Total Spent */}
      <div className="bg-white p-6 rounded-2xl shadow border mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Total Spent
        </h3>
        <p className="text-3xl font-bold text-gray-900">
          ₹{totalSpent.toLocaleString()}
        </p>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Orders
          </h3>
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-sm">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.slice(0, 5).map((o) => (
              <tr key={o._id} className="border-t">
                <td className="px-6 py-3">
                  #{o._id.slice(-5).toUpperCase()}
                </td>
                <td className="px-6 py-3 font-semibold">
                  ₹{(o.price || 0).toLocaleString()}
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      o.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center py-6 text-gray-400">
            No orders yet
          </p>
        )}
      </div>

    </div>
  );
}

export default UserDashboard;