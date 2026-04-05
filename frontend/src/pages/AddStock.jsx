import { useEffect, useState } from "react";
import axios from "axios";
import Toast from "../components/Toast";

function AddStock() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [toast, setToast] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      showToast("Error fetching products", "error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleAddStock = async () => {
    if (!selectedProduct || !quantity) {
      return showToast("Fill all fields", "error");
    }

    try {
    //   await axios.put(
    //     `http://localhost:5000/api/products/add-stock/${selectedProduct}`,
    //     { quantity: Number(quantity) }
    //   );
   await axios.put(
  `http://localhost:5000/api/products/add-stock/${selectedProduct}`,
  { quantity: Number(quantity) }
);

      showToast("Stock added successfully", "success");
      setQuantity("");
      setSelectedProduct("");
      fetchProducts();
    } catch (err) {
      showToast("Error adding stock", "error");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h2 className="text-3xl font-bold mb-6">Add Stock</h2>

      <div className="bg-white p-6 rounded-xl shadow border">
        <div className="mb-4">
          <label className="text-sm text-gray-600">Select Product</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg"
          >
            <option value="">-- Select --</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} (Stock: {p.stock})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-600">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg"
            placeholder="Enter stock to add"
          />
        </div>

        <button
          onClick={handleAddStock}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Stock
        </button>
      </div>

      {/* Product List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">Product List</h3>

        <div className="bg-white rounded-xl shadow border">
          {products.map((p) => (
            <div
              key={p._id}
              className="flex justify-between px-4 py-3 border-b text-sm"
            >
              <span>{p.name}</span>
              <span className="font-semibold">{p.stock}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddStock;