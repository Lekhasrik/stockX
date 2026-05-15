import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`);
    setOrders(res.data);
  };

  const markDelivered = async (id) => {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
      status: "Delivered",
    });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();

    // 🔔 Auto refresh every 5 sec (notification feel)
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="grid gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow rounded-xl p-4 border"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">Order ID: {order._id}</p>
                {/* <p>Total: ₹{order.totalAmount}</p> */}

                //new
                <p>Total: ₹{order.total}</p>
                
                <p>Payment: {order.paymentMethod}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>

                {order.status !== "Delivered" && (
                  <button
                    onClick={() => markDelivered(order._id)}
                    className="block mt-3 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
                  >
                    Mark Delivered
                  </button>
                )}
              </div>
            </div>

            {/* Items */}
            <div className="mt-4 border-t pt-3">
              {order.items.map((item, i) => (
                <p key={i} className="text-sm">
                  {item.name} × {item.quantity}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}