import { useEffect, useState } from "react";
import { getDashboardStats } from "../Services/dashboardService";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getDashboardStats();
        setData(res);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <p className="text-gray-400">Loading dashboard...</p>;
  }

  if (!data) {
    return <p className="text-red-400">Failed to load data</p>;
  }

  // 🔥 GROUPED CHART (REAL ANALYTICS)
  const grouped = {};

  data.orders?.forEach((order) => {
    if (!order.date?.seconds) return;

    const date = new Date(order.date.seconds * 1000)
      .toLocaleDateString();

    grouped[date] = (grouped[date] || 0) + (Number(order.total) || 0);
  });

  const chartData = Object.keys(grouped).map((date) => ({
    name: date,
    revenue: grouped[date],
  }));

  // 📊 STATUS COUNTS
  const delivered = data.orders.filter(o => o.status === "delivered").length;
  const pending = data.orders.filter(o => o.status === "pending").length;
  const cancelled = data.orders.filter(o => o.status === "cancelled").length;

  return (
    <div className="space-y-6">

      {/* 🔢 STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Revenue" value={`KES ${formatNumber(data.revenue)}`} />
        <Card title="Orders" value={data.totalOrders || 0} />
        <Card title="Products" value={data.totalProducts || 0} />
        <Card title="Customers" value={data.totalCustomers || 0} />
      </div>

      {/* 📦 ORDER STATUS */}
      <div className="grid grid-cols-3 gap-4">
        <StatusCard label="Delivered" count={delivered} color="text-green-400" />
        <StatusCard label="Pending" count={pending} color="text-yellow-400" />
        <StatusCard label="Cancelled" count={cancelled} color="text-red-400" />
      </div>

      {/* 📈 CHART */}
      <div className="bg-[#1a1625] p-5 rounded-xl shadow">
        <h3 className="mb-4 text-gray-400 text-sm">Revenue Trend</h3>

        {chartData.length === 0 ? (
          <p className="text-gray-500 text-sm">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#2a2438" />
              <XAxis dataKey="name" stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

/* 🔥 STAT CARD */
function Card({ title, value }) {
  return (
    <div className="bg-[#1a1625] p-5 rounded-xl shadow hover:scale-[1.02] transition">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-xl font-semibold mt-2 text-white">{value}</p>
    </div>
  );
}

/* 📦 STATUS CARD */
function StatusCard({ label, count, color }) {
  return (
    <div className="bg-[#1a1625] p-4 rounded-xl shadow">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{count}</p>
    </div>
  );
}

/* 💰 FORMATTER */
function formatNumber(num) {
  return Number(num || 0).toLocaleString();
}