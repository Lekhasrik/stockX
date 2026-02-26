import { useEffect, useState } from "react";
import axios from "axios";

function LowStock() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        const filtered = res.data.filter(p => p.status === "Low Stock" || p.status === "Out of Stock");
        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const lowCount = products.filter(p => p.status === "Low Stock").length;
  const outCount = products.filter(p => p.status === "Out of Stock").length;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-gray-200 border-t-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Low Stock Alerts</h2>
        <p className="text-sm text-gray-400 mt-1">Products that need restocking attention</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
          <div className="p-5">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Low Stock</p>
            <p className="text-3xl font-bold text-gray-800">{lowCount}</p>
            <p className="text-xs text-gray-400 mt-1">Products below minimum</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-red-400 to-rose-500" />
          <div className="p-5">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Out of Stock</p>
            <p className="text-3xl font-bold text-gray-800">{outCount}</p>
            <p className="text-xs text-gray-400 mt-1">Zero quantity remaining</p>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
        <div className="p-5">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Alert Items</h3>

          {products.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-gray-300">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <p className="text-lg font-medium text-gray-400">All products are well stocked</p>
              <p className="text-sm text-gray-300 mt-1">No items need restocking right now</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider pb-3 pl-2">Product</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider pb-3">Category</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider pb-3">Stock</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider pb-3">Min Stock</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider pb-3 pr-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map(p => (
                    <tr key={p._id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-3 pl-2">
                        <span className="text-sm font-medium text-gray-800">{p.name}</span>
                      </td>
                      <td className="py-3">
                        <span className="text-sm text-gray-500">{p.category || "—"}</span>
                      </td>
                      <td className="py-3 text-center">
                        <span className={`text-sm font-semibold ${p.stock === 0 ? "text-red-500" : "text-amber-600"}`}>{p.stock}</span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="text-sm text-gray-400">{p.minStock}</span>
                      </td>
                      <td className="py-3 text-center pr-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${
                          p.status === "Out of Stock"
                            ? "bg-red-50 text-red-600 ring-red-200"
                            : "bg-amber-50 text-amber-700 ring-amber-200"
                        }`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LowStock;