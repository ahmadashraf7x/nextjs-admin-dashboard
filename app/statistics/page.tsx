"use client";
import {
  getStatsOverview,
  getTopCustomers,
  getNewCustomersThisMonth,
} from "@/app/lib/statistics";

export default function StatsPage() {
  const { totalOrders, totalRevenue, avgOrderValue } = getStatsOverview();
  const { topBySpent, topByOrders } = getTopCustomers();
  const newThisMonth = getNewCustomersThisMonth();


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
          Statistics
        </h1>
        <p className="text-sm text-gray-600">
          Overview of recent orders and top customers (mock data).
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Recent Orders</p>
          <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-emerald-600">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Avg. Order Value</p>
          <p className="text-2xl font-bold text-blue-600">
            ${avgOrderValue.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">New Customers (this month)</p>
          <p className="text-2xl font-bold text-purple-600">
            {newThisMonth}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Top 5 Customers by Spend
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Customer
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Orders
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Total Spent
                </th>
              </tr>
            </thead>
            <tbody>
              {topBySpent.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <td className="py-2 pr-4 text-gray-800">{c.name}</td>
                  <td className="py-2 pr-4 text-gray-700">
                    {c.totalOrders}
                  </td>
                  <td className="py-2 pr-4 font-medium text-gray-800">
                    ${c.totalSpent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Top 5 Customers by Orders
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Customer
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Orders
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Total Spent
                </th>
              </tr>
            </thead>
            <tbody>
              {topByOrders.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <td className="py-2 pr-4 text-gray-800">{c.name}</td>
                  <td className="py-2 pr-4 text-gray-700">
                    {c.totalOrders}
                  </td>
                  <td className="py-2 pr-4 font-medium text-gray-800">
                    ${c.totalSpent}
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