import { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#0369a1", "#0d9488", "#6366f1", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#10b981"];
const STOCK_COLORS = { "In Stock": "#10b981", "Low Stock": "#f59e0b", "Out of Stock": "#ef4444" };

function StatCard({ icon, label, value, accent = "ocean", subtext }) {
  const gradients = {
    ocean: "from-ocean-500 to-ocean-700",
    teal: "from-teal-500 to-teal-700",
    red: "from-red-400 to-red-600",
    indigo: "from-indigo-500 to-indigo-700",
  };
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5 flex items-center gap-4 group hover:border-ocean-300">
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradients[accent]} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {subtext && <p className="text-xs text-gray-400 mt-0.5">{subtext}</p>}
      </div>
    </div>
  );
}

function ChartCard({ title, children, className = "" }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-2xl shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      {children}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }}>
          {entry.name}: {entry.name.toLowerCase().includes("revenue") ? `₹${entry.value.toLocaleString()}` : entry.value}
        </p>
      ))}
    </div>
  );
};

function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/sales/analytics")
      .then(res => {
        setAnalytics(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load dashboard data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-ocean-500"></div>
        <p className="text-gray-500 animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white border border-red-200 rounded-2xl p-8 text-center shadow-md">
          <p className="text-red-500 text-xl mb-2">⚠️ {error || "No data available"}</p>
          <button onClick={() => window.location.reload()} className="mt-3 px-5 py-2 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 transition">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const {
    totalRevenue = 0, totalSales = 0, todayRevenue = 0, todaySalesCount = 0, totalProducts = 0,
    totalStockValue = 0, inStock = 0, lowStock = 0, outOfStock = 0, topProducts = [],
    last7Days = [], monthlyRevenue = [], categoryData = [], recentSales = []
  } = analytics;

  const stockData = [
    { name: "In Stock", value: inStock },
    { name: "Low Stock", value: lowStock },
    { name: "Out of Stock", value: outOfStock },
  ].filter(d => d.value > 0);

  return (
    <div className="p-6 lg:p-10 min-h-screen max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-ocean-600 to-teal-500 bg-clip-text text-transparent">
            📊 Dashboard
          </h2>
          <p className="text-gray-500 mt-1">Overview of your inventory & sales performance</p>
        </div>
        <div className="text-sm text-gray-400 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
          🕐 {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="📦" label="Total Products" value={totalProducts} accent="ocean" />
        <StatCard icon="💰" label="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} accent="teal" subtext={`Today: ₹${todayRevenue.toLocaleString()}`} />
        <StatCard icon="🛒" label="Total Sales" value={totalSales} accent="indigo" subtext={`Today: ${todaySalesCount}`} />
        <StatCard icon="⚠️" label="Low Stock Items" value={lowStock} accent="red" subtext={`Out of Stock: ${outOfStock}`} />
      </div>

      {/* Row 2: Revenue Trend + Stock Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartCard title="📈 Revenue Trend (Last 7 Days)" className="lg:col-span-2">
          {last7Days.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={last7Days}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0369a1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0369a1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#0369a1" fill="url(#colorRevenue)" strokeWidth={2.5} dot={{ r: 4, fill: "#0369a1" }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="orders" name="Orders" stroke="#0d9488" strokeWidth={2} dot={{ r: 3, fill: "#0d9488" }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center py-20">No sales data for the last 7 days</p>
          )}
        </ChartCard>

        <ChartCard title="🥧 Stock Status">
          {stockData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={stockData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {stockData.map((entry, i) => (
                    <Cell key={i} fill={STOCK_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, "Products"]} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center py-20">No product data</p>
          )}
        </ChartCard>
      </div>

      {/* Row 3: Top Products + Monthly Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="🏆 Top Selling Products">
          {topProducts.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue (₹)" fill="#0369a1" radius={[0, 6, 6, 0]} barSize={22}>
                  {topProducts.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center py-20">No sales yet</p>
          )}
        </ChartCard>

        <ChartCard title="📊 Monthly Revenue">
          {monthlyRevenue.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue (₹)" fill="#0369a1" radius={[6, 6, 0, 0]} barSize={30} />
                <Bar dataKey="orders" name="Orders" fill="#0d9488" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center py-20">No monthly data yet</p>
          )}
        </ChartCard>
      </div>

      {/* Row 4: Category Distribution + Stock Value */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartCard title="📂 Category Distribution">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" outerRadius={85} dataKey="count" label={({ name, count }) => `${name}: ${count}`}>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, "Products"]} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center py-20">No categories</p>
          )}
        </ChartCard>

        <ChartCard title="📋 Recent Sales" className="lg:col-span-2">
          {recentSales.length > 0 ? (
            <div className="overflow-auto max-h-[280px]">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-600">Invoice</th>
                    <th className="text-left p-3 font-semibold text-gray-600">Product</th>
                    <th className="text-center p-3 font-semibold text-gray-600">Qty</th>
                    <th className="text-right p-3 font-semibold text-gray-600">Amount</th>
                    <th className="text-right p-3 font-semibold text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map((sale, i) => (
                    <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-ocean-600 font-medium">{sale.invoiceNumber || "—"}</td>
                      <td className="p-3 text-gray-700">{sale.productName}</td>
                      <td className="p-3 text-center text-gray-600">{sale.quantity}</td>
                      <td className="p-3 text-right font-semibold text-gray-800">₹{sale.totalPrice.toLocaleString()}</td>
                      <td className="p-3 text-right text-gray-500 text-xs">{new Date(sale.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-20">No recent sales</p>
          )}
        </ChartCard>
      </div>

      {/* Quick Summary Footer */}
      <div className="bg-gradient-to-r from-ocean-600 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-white/70 text-sm">Stock Value</p>
            <p className="text-2xl font-bold">₹{totalStockValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-white/70 text-sm">In Stock</p>
            <p className="text-2xl font-bold">{inStock}</p>
          </div>
          <div>
            <p className="text-white/70 text-sm">Avg Sale Value</p>
            <p className="text-2xl font-bold">₹{totalSales > 0 ? Math.round(totalRevenue / totalSales).toLocaleString() : 0}</p>
          </div>
          <div>
            <p className="text-white/70 text-sm">Today's Orders</p>
            <p className="text-2xl font-bold">{todaySalesCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
