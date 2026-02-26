import { useEffect, useState } from "react";
import axios from "axios";

function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/sales/history");
      setSales(res.data);
    } catch (error) {
      alert("Error fetching sales history");
    } finally {
      setLoading(false);
    }
  };

  const filteredSales = sales.filter(sale =>
    sale.productName.toLowerCase().includes(search.toLowerCase()) ||
    sale.invoiceNumber?.toLowerCase().includes(search.toLowerCase())
  );

  const groupedByInvoice = {};
  filteredSales.forEach(sale => {
    const invoice = sale.invoiceNumber || "SINGLE";
    if (!groupedByInvoice[invoice]) {
      groupedByInvoice[invoice] = [];
    }
    groupedByInvoice[invoice].push(sale);
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
      <h2 className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-teal-500 bg-clip-text text-transparent mb-8">
        📜 Sales History
      </h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search by product or invoice number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-ocean-400 outline-none text-blue placeholder-gray-400"
        />
      </div>

      <div className="space-y-6">
        {Object.entries(groupedByInvoice).map(([invoice, items]) => {
          const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
          const date = new Date(items[0].date).toLocaleString();

          return (
            <div
              key={invoice}
              className="bg-white backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-300"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-600">
                    Invoice: {invoice}
                  </h3>
                  <p className="text-sm text-gray-700">{date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">
                    ₹{total.toFixed(2)}
                  </p>
                </div>
              </div>

              <table className="w-full text-left">
                <thead className="bg-white border-b-2 border-gray-300">
                  <tr>
                    <th className="p-3 text-gray-600">Product</th>
                    <th className="p-3 text-gray-600">Quantity</th>
                    <th className="p-3 text-gray-600">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((sale, idx) => (
                    <tr key={idx} className="border-t border-gray-200">
                      <td className="p-3 text-white">{sale.productName}</td>
                      <td className="p-3 text-white">{sale.quantity}</td>
                      <td className="p-3 text-white">₹{sale.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}

        {filteredSales.length === 0 && (
          <p className="text-center text-gray-700 text-lg">No sales found</p>
        )}
      </div>
    </div>
  );
}

export default SalesHistory;

