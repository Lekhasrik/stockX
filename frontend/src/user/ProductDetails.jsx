// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState({});
//   const navigate = useNavigate();


// useEffect(() => {
//   axios
//     .get(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
//     .then(res => setProduct(res.data))
//     .catch(err => console.log(err));
// }, [id]);

//   return (
//     <div className="p-6">
//       <div className="bg-white p-6 rounded-xl shadow-sm border">
//         <h1 className="text-xl font-bold">{product.name}</h1>
//         <p className="text-gray-500 mt-2">₹{product.price}</p>
//         <p className="text-sm mt-2">Stock: {product.stock}</p>

//         <button
//           onClick={() => navigate(`/payment/${product._id}`)}
//           className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-xl"
//         >
//           Order Now
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;


//new
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [payment, setPayment] = useState("COD");

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch product
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  // ✅ Handle Order
  const handleOrder = async () => {
    try {
      if (!user) {
        alert("Please login first");
        return;
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, {
        userId: user._id,
        productId: product._id,
        productName: product.name,
        price: product.price,
        paymentMethod: payment
      });

      alert("Order Placed ✅");

    } catch (err) {
      console.log(err);
      alert("Order failed ❌");
    }
  };

  const handleAddToCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart 🛒");
};

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border max-w-md mx-auto">

        {/* Product Info */}
        <h1 className="text-xl font-bold">{product.name}</h1>
        <p className="text-gray-500 mt-2">₹{product.price}</p>
        <p className="text-sm mt-2">Stock: {product.stock}</p>

        {/* Payment Section */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Payment Method</h3>

          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="radio"
              value="COD"
              checked={payment === "COD"}
              onChange={(e) => setPayment(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="ONLINE"
              checked={payment === "ONLINE"}
              onChange={(e) => setPayment(e.target.value)}
            />
            Online Payment (GPay / PhonePe)
          </label>
        </div>

        {/* Order Button */}
        <button
          onClick={handleOrder}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
        >
          Place Order
        </button>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;