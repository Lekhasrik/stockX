import { useParams } from "react-router-dom";
import { useState } from "react";

function Payment() {
  const { id } = useParams();
  const [method, setMethod] = useState("cod");

  const handleOrder = () => {
    alert(`Order placed with ${method}`);
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-4">Select Payment</h2>

        <div className="space-y-3">
          <label className="flex gap-2">
            <input
              type="radio"
              checked={method === "cod"}
              onChange={() => setMethod("cod")}
            />
            Cash on Delivery
          </label>

          <label className="flex gap-2">
            <input
              type="radio"
              checked={method === "online"}
              onChange={() => setMethod("online")}
            />
            Online Payment
          </label>
        </div>

        <button
          onClick={handleOrder}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-xl"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default Payment;