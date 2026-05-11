import { useEffect, useState, useMemo } from "react";
import { getDashboardStats } from "../Services/dashboardService";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
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
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  /* ALL ORDERS */
  const orders = useMemo(() => data?.orders || [], [data]);

  /* TOTAL REVENUE */
  const revenue = useMemo(() => {
    // Use precomputed revenue from service if available
    if (typeof data?.revenue === "number") {
      return data.revenue;
    }

    // Fallback: calculate from orders
    return orders.reduce(
      (sum, order) => sum + (Number(order.total) || 0),
      0
    );
  }, [data, orders]);

  /* REVENUE TREND (GROUPED BY DATE) */
  const chartData = useMemo(() => {
    const grouped = {};

    orders.forEach((order) => {
      const timestamp = order.createdAt?.seconds;

      // Skip orders without a valid timestamp
      if (!timestamp) return;

      const date = new Date(timestamp * 1000).toLocaleDateString("en-KE", {
        month: "short",
        day: "numeric",
      });

      grouped[date] =
        (grouped[date] || 0) + (Number(order.total) || 0);
    });

    return Object.entries(grouped).map(([date, total]) => ({
      name: date,
      revenue: total,
    }));
  }, [orders]);

  /* ORDER STATUS COUNTS */
  const delivered = useMemo(
    () =>
      orders.filter((o) =>
        ["delivered", "completed"].includes(
          String(o.status || "").toLowerCase()
        )
      ).length,
    [orders]
  );

  const pending = useMemo(
    () =>
      orders.filter(
        (o) =>
          String(o.status || "").toLowerCase() === "pending"
      ).length,
    [orders]
  );

  const cancelled = useMemo(
    () =>
      orders.filter(
        (o) =>
          String(o.status || "").toLowerCase() === "cancelled"
      ).length,
    [orders]
  );

  /* TOTAL ORDERS */
const totalOrders = useMemo(() => {
  // Use value from service if available
  if (typeof data?.totalOrders === "number") {
    return data.totalOrders;
  }

  // Fallback to counting loaded orders
  return orders.length;
}, [data, orders]);

  if (loading) {
    return (
      <p className="text-gray-400 p-6">
        Loading dashboard...
      </p>
    );
  }

  if (!data) {
    return (
      <p className="text-red-500 p-6">
        Failed to load dashboard data.
      </p>
    );
  }

  return (
    <div className="bg-[#f6f6f6] min-h-screen p-6 space-y-6">
      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card
          title="Revenue"
          value={`KES ${formatNumber(revenue)}`}
        />
        
        <Card
  title="Orders"
  value={formatNumber(totalOrders)}
/>

        <Card
          title="Products"
          value={data.totalProducts || 0}
        />

        <Card
          title="Customers"
          value={data.totalCustomers || 0}
        />
      </div>

      {/* ORDER STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatusCard
          label="Delivered"
          count={delivered}
          color="text-green-500"
        />

        <StatusCard
          label="Pending"
          count={pending}
          color="text-yellow-500"
        />

        <StatusCard
          label="Cancelled"
          count={cancelled}
          color="text-red-500"
        />
      </div>

      {/* REVENUE CHART */}
      <div className="bg-white p-6 rounded-3xl shadow-sm">
        <h3 className="text-gray-600 text-sm mb-4">
          Revenue Trend
        </h3>

        {chartData.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No revenue data available.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#eee" />

              <XAxis
                dataKey="name"
                stroke="#aaa"
              />

              <YAxis
                stroke="#aaa"
                tickFormatter={(value) =>
                  `${(value / 1000).toFixed(0)}k`
                }
              />

              <Tooltip
                formatter={(value) =>
                  `KES ${formatNumber(value)}`
                }
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#f97316"
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

/* STAT CARD */
function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-md transition">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-2 text-gray-800">
        {value}
      </p>
    </div>
  );
}

/* STATUS CARD */
function StatusCard({ label, count, color }) {
  return (
    <div className="bg-white p-5 rounded-3xl shadow-sm">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className={`text-3xl font-bold mt-2 ${color}`}>
        {count}
      </p>
    </div>
  );
}

/* FORMAT NUMBER */
function formatNumber(num) {
  return Number(num || 0).toLocaleString("en-KE");
}