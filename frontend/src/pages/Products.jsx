import { useEffect, useState } from "react";
import axios from "axios";
import Toast from "../components/Toast";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      showToast("Error fetching products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      showToast("Product deleted successfully", "success");
      fetchProducts();
    } catch (error) {
      showToast("Error deleting product", "error");
    }
  };

  const startEdit = (product) => {
    setEditingProduct({ ...product });
  };

  const cancelEdit = () => {
    setEditingProduct(null);
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        editingProduct
      );
      showToast("Product updated successfully", "success");
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      showToast("Error updating product", "error");
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filterStatus === "All" || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="p-10 min-h-screen">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h2 className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-teal-500 bg-clip-text text-transparent mb-8">📦 Products</h2>

      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-ocean-400 focus:border-teal-400 outline-none text-gray-800 placeholder-gray-400"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-ocean-400 outline-none text-gray-800"
        >
          <option>All</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-white border-b-2 border-gray-300">
            <tr>
              <th className="p-4 text-gray-600 font-semibold">Name</th>
              <th className="p-4 text-gray-600 font-semibold">Category</th>
              <th className="p-4 text-gray-600 font-semibold">Price</th>
              <th className="p-4 text-gray-600 font-semibold">Stock</th>
              <th className="p-4 text-gray-600 font-semibold">Min Stock</th>
              <th className="p-4 text-gray-600 font-semibold">Status</th>
              <th className="p-4 text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((p) => (
              <tr
                key={p._id}
                className="border-t border-gray-200 hover:bg-white transition"
              >
                {editingProduct && editingProduct._id === p._id ? (
                  <>
                    <td className="p-4">
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-2 rounded bg-white border border-gray-300 text-gray-800"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="text"
                        value={editingProduct.category}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            category: e.target.value,
                          })
                        }
                        className="w-full p-2 rounded bg-white border border-gray-300 text-gray-800"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            price: e.target.value,
                          })
                        }
                        className="w-full p-2 rounded bg-white border border-gray-300 text-gray-800"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            stock: e.target.value,
                          })
                        }
                        className="w-full p-2 rounded bg-white border border-gray-300 text-gray-800"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        value={editingProduct.minStock}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            minStock: e.target.value,
                          })
                        }
                        className="w-full p-2 rounded bg-white border border-gray-300 text-gray-800"
                      />
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-700">
                        Auto-calculated
                      </span>
                    </td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={saveEdit}
                        className="bg-gradient-to-r from-ocean-500 to-teal-500 hover:from-ocean-600 hover:to-teal-600 px-3 py-1 rounded-lg transition shadow-lg"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded-lg transition"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-4">{p.name}</td>
                    <td className="p-4">{p.category}</td>
                    <td className="p-4">₹{p.price}</td>
                    <td className="p-4">{p.stock}</td>
                    <td className="p-4">{p.minStock}</td>
                    <td
                      className={`p-4 font-semibold ${
                        p.status === "Low Stock"
                          ? "text-yellow-400"
                          : p.status === "Out of Stock"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {p.status}
                    </td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="bg-gradient-to-r from-ocean-500 to-teal-500 hover:from-ocean-600 hover:to-teal-600 px-3 py-1 rounded-lg transition shadow-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 px-3 py-1 rounded-lg transition shadow-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-600 p-8 text-lg">No products found</p>
        )}
      </div>
    </div>
  );
}

export default Products;

