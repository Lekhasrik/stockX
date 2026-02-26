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
      console.error("Error fetching analytics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-gray-200 border-t-blue-500"></div>
      </div>
    );
  }

  if (!analytics) return null;

  const stats = [
    { label: "Total Revenue", value: `Rs. ${analytics.totalRevenue?.toLocaleString() || 0}`, accent: "from-emerald-500 to-teal-500", iconBg: "bg-emerald-50 text-emerald-600", icon: "chart" },
    { label: "Total Sales", value: analytics.totalSales || 0, accent: "from-blue-500 to-cyan-500", iconBg: "bg-blue-50 text-blue-600", icon: "cart" },
    { label: "Today Revenue", value: `Rs. ${analytics.todayRevenue?.toLocaleString() || 0}`, accent: "from-violet-500 to-purple-500", iconBg: "bg-violet-50 text-violet-600", icon: "today" },
    { label: "Today Sales", value: analytics.todaySalesCount || 0, accent: "from-rose-500 to-pink-500", iconBg: "bg-rose-50 text-rose-600", icon: "fire" },
  ];

  const icons = {
    chart: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>,
    cart: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>,
    today: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    fire: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/></svg>,
  };

  const medalColors = ["bg-amber-50 text-amber-700 ring-amber-200", "bg-gray-50 text-gray-600 ring-gray-200", "bg-orange-50 text-orange-700 ring-orange-200", "bg-blue-50 text-blue-600 ring-blue-200", "bg-violet-50 text-violet-600 ring-violet-200"];

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Analytics & Reports</h2>
        <p className="text-sm text-gray-400 mt-1">Sales performance and revenue insights</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group">
            <div className={`h-1 bg-gradient-to-r ${s.accent}`} />
            <div className="p-5">
              <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {icons[s.icon]}
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-800 tracking-tight">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
        <div className="p-5">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Top 5 Products</h3>

          {analytics.topProducts?.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-12">No sales data available</p>
          ) : (
            <div className="space-y-3">
              {analytics.topProducts?.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold ring-1 ring-inset ${medalColors[index] || medalColors[3]}`}>
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-800">{product.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">{product.quantity} sold</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;