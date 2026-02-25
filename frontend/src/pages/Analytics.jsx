import { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/sales/analytics");
      setAnalytics(res.data);
    } catch (error) {
      alert("Error fetching analytics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-500"></div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="p-10 min-h-screen">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-teal-500 bg-clip-text text-transparent mb-8">
        📊 Analytics & Reports
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-900 to-green-800 p-8 rounded-2xl shadow-xl border border-green-500">
          <h3 className="text-lg text-green-300 mb-2 font-medium">Total Revenue</h3>
          <p className="text-4xl font-bold text-green-300">
            ₹{analytics.totalRevenue.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-300">
          <h3 className="text-lg text-gray-600 mb-2 font-medium">Total Sales</h3>
          <p className="text-4xl font-bold text-gray-700">
            {analytics.totalSales}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-8 rounded-2xl shadow-xl border border-purple-500">
          <h3 className="text-lg text-purple-300 mb-2 font-medium">Today's Revenue</h3>
          <p className="text-4xl font-bold text-purple-300">
            ₹{analytics.todaysRevenue.toFixed(2)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-900 to-orange-800 p-8 rounded-2xl shadow-xl border border-orange-500">
          <h3 className="text-lg text-orange-300 mb-2 font-medium">Today's Sales</h3>
          <p className="text-4xl font-bold text-orange-300">
            {analytics.todaysSales}
          </p>
        </div>
      </div>

      <div className="bg-white backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-300">
        <h3 className="text-3xl font-bold text-gray-600 mb-6">
          🏆 Top 5 Products
        </h3>

        <div className="space-y-4">
          {analytics.topProducts.map((product, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 hover:border-ocean-300 transition"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold bg-gradient-to-r from-ocean-600 to-teal-500 bg-clip-text text-transparent">
                  #{index + 1}
                </span>
                <span className="text-lg font-medium text-white">{product.name}</span>
              </div>
              <span className="text-xl font-bold text-green-400">
                {product.quantity} units sold
              </span>
            </div>
          ))}
        </div>

        {analytics.topProducts.length === 0 && (
          <p className="text-center text-gray-700 text-lg">No sales data available</p>
        )}
      </div>
    </div>
  );
}

export default Analytics;

