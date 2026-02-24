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

  return (
    <div>
      <h2>Sales</h2>

      <select onChange={e => setProductId(e.target.value)}>
        <option>Select Product</option>
        {products.map(p => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <input type="number"
        placeholder="Quantity"
        onChange={e => setQuantity(e.target.value)} />

      <button onClick={handleSale}>Sell</button>
    </div>
  );
}

export default Sales;