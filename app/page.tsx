"use client";
import Link from "next/link";
import { orders, Order } from "./data/orders";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const totalOrders = orders.length;
const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
const pendingOrders = orders.filter((o) => o.status === "Pending").length;

const revenueByDateMap: Record<string, number> = {};
orders.forEach((order) => {
  revenueByDateMap[order.date] =
    (revenueByDateMap[order.date] ?? 0) + order.amount;
});

const revenueByDate = Object.entries(revenueByDateMap)
  .map(([date, total]) => ({ date, total }))
  .sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

const statusData = [
  { name: "Pending", value: orders.filter((o) => o.status === "Pending").length },
  { name: "Shipped", value: orders.filter((o) => o.status === "Shipped").length },
  { name: "Cancelled", value: orders.filter((o) => o.status === "Cancelled").length },
];

const STATUS_COLORS = ["#fbbf24", "#22c55e", "#f87171"]; 

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Overview of recent orders and key metrics.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-emerald-600">
            ${totalRevenue}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Pending Orders</p>
          <p className="text-2xl font-bold text-amber-500">{pendingOrders}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Revenue over time
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueByDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Orders by status
          </h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
      
      <section className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Orders
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  ID
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Customer
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Date
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Status
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Amount
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
  Details
</th>
              </tr>
              
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <td className="py-2 pr-4 text-gray-700">{order.id}</td>
                  <td className="py-2 pr-4 text-gray-700">
                    {order.customerName}
                  </td>
                  <td className="py-2 pr-4 text-gray-600">{order.date}</td>
                  <td className="py-2 pr-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        order.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : order.status === "Shipped"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.status}
                      
                    </span> 

                  </td>
                  <td className="py-2 pr-4 font-medium text-gray-800">
                    ${order.amount}
                  </td>

                  <td className="py-2 pr-4 font-medium text-gray-800">
  <Link
    href={`/orders/${order.id}`}
    className="text-sm text-blue-600 hover:underline"
  >
    View
  </Link>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

