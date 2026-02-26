import { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadialBarChart, RadialBar, ComposedChart
} from "recharts";

/* ── Color Palette ── */
const CHART_PALETTE = [
  "#3b82f6", "#06b6d4", "#8b5cf6", "#f59e0b", "#10b981", "#ec4899", "#6366f1", "#f97316"
];
const STOCK_COLORS = { "In Stock": "#22c55e", "Low Stock": "#eab308", "Out of Stock": "#ef4444" };

/* ── Stat Card ── */
function StatCard({ icon, label, value, trend, trendUp, accent }) {
  const themes = {
    blue:   { bg: "from-blue-500 to-blue-600",   ring: "ring-blue-200",   iconBg: "bg-blue-50 text-blue-600" },
    teal:   { bg: "from-teal-500 to-teal-600",   ring: "ring-teal-200",   iconBg: "bg-teal-50 text-teal-600" },
    violet: { bg: "from-violet-500 to-violet-600", ring: "ring-violet-200", iconBg: "bg-violet-50 text-violet-600" },
    rose:   { bg: "from-rose-500 to-rose-600",   ring: "ring-rose-200",   iconBg: "bg-rose-50 text-rose-600" },
  };
  const t = themes[accent] || themes.blue;

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      {/* Decorative top accent bar */}
      <div className={`h-1 bg-gradient-to-r ${t.bg}`} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-11 h-11 rounded-xl ${t.iconBg} flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          {trend !== undefined && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trendUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
              {trendUp ? "↑" : "↓"} {trend}
            </span>
          )}
        </div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-800 tracking-tight">{value}</p>
      </div>
    </div>
  );
}

/* ── Chart Card Wrapper ── */
function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${className}`}>
      <div className="px-6 pt-5 pb-2">
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      <div className="px-4 pb-5">
        {children}
      </div>
    </div>
  );
}

/* ── Custom Tooltip ── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 backdrop-blur-sm border border-gray-100 rounded-xl shadow-xl p-3.5 text-sm min-w-[140px]">
      <p className="font-semibold text-gray-800 mb-2 text-xs uppercase tracking-wide">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-500">{entry.name}:</span>
          <span className="font-semibold text-gray-800 ml-auto">
            {entry.name.toLowerCase().includes("revenue") || entry.name.toLowerCase().includes("amount")
              ? `₹${entry.value.toLocaleString()}`
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ── Custom Pie Label ── */
const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} textAnchor={x > cx ? "start" : "end"} dominantBaseline="central"
      className="text-xs font-medium" fill="#4b5563">
      {name} ({(percent * 100).toFixed(0)}%)
    </text>
  );
};

/* ── Dashboard ── */
function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/sales/analytics")
      .then(res => { setAnalytics(res.data); setLoading(false); })
      .catch(() => { setError("Failed to load dashboard data"); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-gray-100" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" />
        </div>
        <p className="text-gray-400 text-sm animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white border border-red-100 rounded-2xl p-10 text-center shadow-sm max-w-sm">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <p className="text-gray-700 text-lg font-semibold mb-1">Something went wrong</p>
          <p className="text-gray-400 text-sm mb-5">{error || "No data available"}</p>
          <button onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium text-sm shadow-sm">
            Try again
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

  const avgSaleValue = totalSales > 0 ? Math.round(totalRevenue / totalSales) : 0;

  return (
    <div className="p-6 lg:p-10 min-h-screen max-w-[1440px] mx-auto bg-gray-50/50">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            Dashboard
          </h2>
          <p className="text-gray-400 mt-1 text-sm">Your inventory & sales at a glance</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard icon="📦" label="Total Products" value={totalProducts} accent="blue" />
        <StatCard icon="💰" label="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} accent="teal" trend={`₹${todayRevenue.toLocaleString()} today`} trendUp={todayRevenue > 0} />
        <StatCard icon="🛒" label="Total Sales" value={totalSales} accent="violet" trend={`${todaySalesCount} today`} trendUp={todaySalesCount > 0} />
        <StatCard icon="⚠️" label="Low / Out of Stock" value={`${lowStock} / ${outOfStock}`} accent="rose" />
      </div>

      {/* ── Row 2: Revenue Trend + Stock Status ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartCard title="Revenue Trend" subtitle="Last 7 days performance" className="lg:col-span-2">
          {last7Days.length > 0 ? (
            <ResponsiveContainer width="100%" height={310}>
              <AreaChart data={last7Days} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="circle" iconSize={8} />
                <Area type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#3b82f6" fill="url(#gradRevenue)" strokeWidth={2.5} dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2, fill: "#fff" }} />
                <Area type="monotone" dataKey="orders" name="Orders" stroke="#06b6d4" fill="url(#gradOrders)" strokeWidth={2} dot={{ r: 3, fill: "#06b6d4", strokeWidth: 2, stroke: "#fff" }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-300 text-center py-20 text-sm">No sales data for the last 7 days</p>
          )}
        </ChartCard>

        <ChartCard title="Stock Status" subtitle="Current inventory health">
          {stockData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={stockData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" strokeWidth={0}>
                    {stockData.map((entry, i) => (
                      <Cell key={i} fill={STOCK_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, "Products"]} contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 13 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-5 mt-1">
                {stockData.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STOCK_COLORS[d.name] }} />
                    {d.name} ({d.value})
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-300 text-center py-20 text-sm">No product data</p>
          )}
        </ChartCard>
      </div>

      {/* ── Row 3: Top Products + Monthly Revenue ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Top Selling Products" subtitle="By revenue contribution">
          {topProducts.length > 0 ? (
            <div className="flex items-center gap-2">
              <ResponsiveContainer width="55%" height={300}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="95%"
                  data={[...topProducts].reverse().map((p, i, arr) => ({ ...p, fill: CHART_PALETTE[arr.length - 1 - i] }))}
                  startAngle={210} endAngle={-30}>
                  <RadialBar dataKey="revenue" cornerRadius={12} background={{ fill: "#f1f5f9" }} animationDuration={1200} />
                  <Tooltip content={<CustomTooltip />} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="w-[45%] space-y-3 pr-2">
                {topProducts.map((p, i) => {
                  const maxRev = topProducts[0]?.revenue || 1;
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="flex items-center justify-center w-5 h-5 rounded-md text-[10px] font-bold text-white shrink-0" style={{ backgroundColor: CHART_PALETTE[i] }}>{i + 1}</span>
                          <span className="text-xs font-medium text-gray-700 truncate">{p.name}</span>
                        </div>
                        <span className="text-xs font-bold text-gray-800 ml-2 shrink-0">₹{p.revenue?.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(p.revenue / maxRev) * 100}%`, backgroundColor: CHART_PALETTE[i] }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-gray-300 text-center py-20 text-sm">No sales yet</p>
          )}
        </ChartCard>

        <ChartCard title="Monthly Revenue" subtitle="Revenue & orders by month">
          {monthlyRevenue.length > 0 ? (
            <div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={monthlyRevenue} margin={{ top: 20, right: 10, left: -10, bottom: 0 }} barGap={6}>
                  <defs>
                    <linearGradient id="gradRevBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.85} />
                    </linearGradient>
                    <linearGradient id="gradOrdBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
                      <stop offset="100%" stopColor="#d97706" stopOpacity={0.85} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar yAxisId="left" dataKey="revenue" name="Revenue (₹)" fill="url(#gradRevBar)" radius={[8, 8, 0, 0]} barSize={36} />
                  <Bar yAxisId="right" dataKey="orders" name="Orders" fill="url(#gradOrdBar)" radius={[8, 8, 0, 0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
              {/* Summary cards below chart */}
              <div className="grid grid-cols-2 gap-3 mt-3 px-2">
                {monthlyRevenue.slice(-2).map((m, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 border border-gray-100">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${i === monthlyRevenue.slice(-2).length - 1 ? "bg-violet-100 text-violet-600" : "bg-amber-50 text-amber-600"}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{m.month}</p>
                      <p className="text-sm font-bold text-gray-800">₹{m.revenue?.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-400">{m.orders} orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-300 text-center py-20 text-sm">No monthly data yet</p>
          )}
        </ChartCard>
      </div>

      {/* ── Row 4: Category Distribution + Recent Sales ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartCard title="Category Mix" subtitle="Products per category">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" outerRadius={90} dataKey="count"
                  strokeWidth={0} label={renderPieLabel} labelLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={CHART_PALETTE[i % CHART_PALETTE.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, "Products"]} contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-300 text-center py-20 text-sm">No categories</p>
          )}
        </ChartCard>

        <ChartCard title="Recent Sales" subtitle="Latest transactions" className="lg:col-span-2">
          {recentSales.length > 0 ? (
            <div className="overflow-auto max-h-[280px] rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-50/80 sticky top-0 backdrop-blur-sm">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-400 text-xs uppercase tracking-wider">Invoice</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-400 text-xs uppercase tracking-wider">Product</th>
                    <th className="text-center px-4 py-3 font-medium text-gray-400 text-xs uppercase tracking-wider">Qty</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-400 text-xs uppercase tracking-wider">Amount</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-400 text-xs uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentSales.map((sale, i) => (
                    <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                      <td className="px-4 py-3 text-blue-600 font-medium text-xs">{sale.invoiceNumber || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 font-medium">{sale.productName}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-gray-700 font-semibold text-xs">
                          {sale.quantity}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-800">₹{sale.totalPrice.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-gray-400 text-xs">{new Date(sale.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-300 text-center py-20 text-sm">No recent sales</p>
          )}
        </ChartCard>
      </div>

      {/* ── Summary Footer ── */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-2xl p-6 shadow-lg shadow-blue-500/10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Stock Value</p>
            <p className="text-2xl font-bold text-white">₹{totalStockValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">In Stock</p>
            <p className="text-2xl font-bold text-white">{inStock}</p>
          </div>
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Avg Order Value</p>
            <p className="text-2xl font-bold text-white">₹{avgSaleValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Today's Orders</p>
            <p className="text-2xl font-bold text-white">{todaySalesCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
