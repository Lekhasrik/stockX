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

  useEffect(() => { fetchProducts(); }, []);

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

  const startEdit = (product) => setEditingProduct({ ...product });
  const cancelEdit = () => setEditingProduct(null);

  const saveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, editingProduct);
      showToast("Product updated successfully", "success");
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      showToast("Error updating product", "error");
    }
  };

  const showToast = (message, type) => setToast({ message, type });

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "All" || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusBadge = (status) => {
    const styles = {
      "In Stock": "bg-green-50 text-green-700 ring-1 ring-green-200",
      "Low Stock": "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
      "Out of Stock": "bg-red-50 text-red-600 ring-1 ring-red-200",
    };
    return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${styles[status] || "bg-gray-50 text-gray-600"}`}>{status}</span>;
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-gray-100" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" />
        </div>
        <p className="text-gray-400 text-sm animate-pulse">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 min-h-screen max-w-[1440px] mx-auto bg-gray-50/50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">Products</h2>
          <p className="text-gray-400 mt-1 text-sm">Manage your inventory items</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm">
          <span className="font-semibold text-gray-800">{products.length}</span> total products
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-gray-800 text-sm placeholder-gray-400 shadow-sm transition"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-gray-700 text-sm shadow-sm cursor-pointer"
        >
          <option>All</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left table-fixed">
            <colgroup>
              <col className="w-[18%]" />
              <col className="w-[15%]" />
              <col className="w-[12%]" />
              <col className="w-[10%]" />
              <col className="w-[12%]" />
              <col className="w-[13%]" />
              <col className="w-[20%]" />
            </colgroup>
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="px-5 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-5 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-5 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-5 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">Stock</th>
                <th className="px-5 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">Min Stock</th>
                <th className="px-5 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((p) => (
                <tr key={p._id} className="hover:bg-blue-50/30 transition-colors">
                  {editingProduct && editingProduct._id === p._id ? (
                    <>
                      <td className="px-4 py-2.5">
                        <input type="text" value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-blue-200 text-gray-800 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none" />
                      </td>
                      <td className="px-4 py-2.5">
                        <input type="text" value={editingProduct.category}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-blue-200 text-gray-800 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none" />
                      </td>
                      <td className="px-4 py-2.5">
                        <input type="number" value={editingProduct.price}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-blue-200 text-gray-800 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none" />
                      </td>
                      <td className="px-4 py-2.5">
                        <input type="number" value={editingProduct.stock}
                          onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-blue-200 text-gray-800 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none" />
                      </td>
                      <td className="px-4 py-2.5">
                        <input type="number" value={editingProduct.minStock}
                          onChange={(e) => setEditingProduct({ ...editingProduct, minStock: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-blue-200 text-gray-800 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none" />
                      </td>
                      <td className="px-4 py-2.5 text-center"><span className="text-xs text-gray-400 italic">Auto</span></td>
                      <td className="px-4 py-2.5">
                        <div className="flex gap-2 whitespace-nowrap">
                          <button onClick={saveEdit} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition shadow-sm">Save</button>
                          <button onClick={cancelEdit} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200 transition">Cancel</button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-5 py-3.5 font-medium text-gray-800 text-sm">{p.name}</td>
                      <td className="px-5 py-3.5 text-gray-500 text-sm">{p.category}</td>
                      <td className="px-5 py-3.5 font-semibold text-gray-800 text-sm">₹{p.price.toLocaleString()}</td>
                      <td className="px-5 py-3.5 text-sm">
                        <span className={`font-semibold ${p.stock <= p.minStock ? "text-red-500" : "text-gray-700"}`}>{p.stock}</span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 text-sm">{p.minStock}</td>
                      <td className="px-5 py-3.5">{statusBadge(p.status)}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(p)} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg hover:bg-blue-100 transition">Edit</button>
                          <button onClick={() => deleteProduct(p._id)} className="px-3 py-1.5 bg-red-50 text-red-500 text-xs font-medium rounded-lg hover:bg-red-100 transition">Delete</button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;

