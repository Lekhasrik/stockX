import { useState, useEffect } from "react";
import axios from "axios";

function Sales() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  }, []);

  const handleSale = () => {
    axios.post("http://localhost:5000/api/sales", {
      productId,
      quantity
    })
    .then(() => alert("Sale Done"))
    .catch(err => alert(err.response.data.message));
  };

  // return (
  //   <div>
  //     <h2>Sales</h2>

  //     <select onChange={e => setProductId(e.target.value)}>
  //       <option>Select Product</option>
  //       {products.map(p => (
  //         <option key={p._id} value={p._id}>
  //           {p.name}
  //         </option>
  //       ))}
  //     </select>

  //     <input type="number"
  //       placeholder="Quantity"
  //       onChange={e => setQuantity(e.target.value)} />

  //     <button onClick={handleSale}>Sell</button>
  //   </div>
  // );

  return (
  <div className="p-10 min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">

    <div className="max-w-md mx-auto bg-blue-900/40 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-blue-500/30">

      <h2 className="text-3xl font-bold text-blue-300 mb-6 text-center">
        💰 Sales
      </h2>

      <div className="space-y-4">

        <select
          onChange={e => setProductId(e.target.value)}
          className="w-full p-3 rounded-lg bg-blue-950 border border-blue-600 focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option>Select Product</option>
          {products.map(p => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          onChange={e => setQuantity(e.target.value)}
          className="w-full p-3 rounded-lg bg-blue-950 border border-blue-600 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <button
          onClick={handleSale}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-400 p-3 rounded-lg font-semibold hover:scale-105 transition shadow-lg"
        >
          Sell Product 🚀
        </button>

      </div>

    </div>
  </div>
);
}

export default Sales;