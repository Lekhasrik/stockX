import { useEffect, useState } from "react";
import axios from "axios";

function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchSales(); }, []);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/sales/history");
      setSales(res.data);
    } catch (error) {
      console.error("Error fetching sales history");
    } finally { setLoading(false); }
  };

  const filteredSales = sales.filter(sale =>
    sale.productName.toLowerCase().includes(search.toLowerCase()) ||
    sale.invoiceNumber?.toLowerCase().includes(search.toLowerCase())
  );

  const groupedByInvoice = {};
  filteredSales.forEach(sale => {
    const invoice = sale.invoiceNumber || "SINGLE";
    if (!groupedByInvoice[invoice]) groupedByInvoice[invoice] = [];
    groupedByInvoice[invoice].push(sale);
  });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-gray-100" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" />
        </div>
        <p className="text-gray-400 text-sm animate-pulse">Loading sales history...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 min-h-screen max-w-[1440px] mx-auto bg-gray-50/50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">Sales History</h2>
          <p className="text-gray-400 mt-1 text-sm">Browse all transactions by invoice</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm">
          <span className="font-semibold text-gray-800">{sales.length}</span> total transactions
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search by product or invoice..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-gray-800 text-sm placeholder-gray-400 shadow-sm transition" />
        </div>
      </div>

      {/* Invoice Cards */}
      <div className="space-y-5">
        {Object.entries(groupedByInvoice).map(([invoice, items]) => {
          const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
          const date = new Date(items[0].date).toLocaleString();

          return (
            <div key={invoice} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Invoice Header */}
              <div className="px-6 py-4 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">{invoice}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{date}</p>
                </div>
                <p className="text-xl font-bold text-gray-900">₹{total.toLocaleString()}</p>
              </div>

              {/* Items Table */}
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-2.5 text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-2.5 text-xs font-medium text-gray-400 uppercase tracking-wider text-center">Qty</th>
                    <th className="px-6 py-2.5 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.map((sale, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/20 transition-colors">
                      <td className="px-6 py-3 text-sm font-medium text-gray-700">{sale.productName}</td>
                      <td className="px-6 py-3 text-sm text-center">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-gray-700 font-semibold text-xs">{sale.quantity}</span>
                      </td>
                      <td className="px-6 py-3 text-sm text-right font-semibold text-gray-800">₹{sale.totalPrice.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}

        {filteredSales.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">No sales found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalesHistory;

