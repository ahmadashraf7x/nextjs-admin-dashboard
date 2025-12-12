"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { customers, Customer } from "../../data/customers";
import { orders, Order } from "../../data/orders";

export default function CustomerDetailsPage() {

  const { id } = useParams<{ id: string }>();
  const customerId = Number(id);
  

  const customer = customers.find((c) => c.id === customerId);

const customerOrders: Order[] = customer
  ? orders.filter((order) => order.customerName === customer.name)
  : [];
  

  if (!customer) {
    return (
      <div className="space-y-4">
        <p className="text-red-600 font-semibold">Customer not found.</p>
        <Link href="/customers" className="text-blue-600 hover:underline">
          ⬅ Back to customers
        </Link>
      </div>
    );
  }

  

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/customers"
          className="text-sm md:text-base text-gray-600 hover:text-gray-800 flex items-center gap-1 mb-2"
        >
          <span className="text-lg">⬅</span>
          Back to customers
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {customer.name}
        </h1>
        <p className="text-sm text-gray-500">{customer.email}</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Status</p>
          <span
            className={`inline-flex mt-1 px-2 py-1 rounded-full text-xs font-semibold
              ${
                customer.status === "Active"
                  ? "bg-emerald-100 text-emerald-700"
                  : customer.status === "VIP"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-gray-600"
              }`}
          >
            {customer.status}
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Total Orders</p>
          <p className="mt-1 text-xl font-bold text-gray-800">
            {customer.totalOrders}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Total Spent</p>
          <p className="mt-1 text-xl font-bold text-blue-600">
            ${customer.totalSpent}
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm p-4 md:p-6 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Customer Summary
        </h2>
        <p className="text-sm text-gray-600">
          Joined at:{" "}
          <span className="font-medium text-gray-800">
            {customer.joinedAt}
          </span>
        </p>
        <p className="text-sm text-gray-600">
          This is a mock customer details page. In a real dashboard, you might
          show recent orders, address, contact info, and more.
        </p>

      <section className="bg-white rounded-xl shadow-sm p-4 md:p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Orders for this customer
        </h2>

        {customerOrders.length === 0 ? (
          <p className="text-sm text-gray-500">
            This customer has no orders yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                    Order ID
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
                </tr>
              </thead>
              <tbody>
                {customerOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <td className="py-2 pr-4 text-gray-800">{order.id}</td>
                    <td className="py-2 pr-4 text-gray-600">{order.date}</td>
                    <td className="py-2 pr-4 text-gray-700">{order.status}</td>
                    <td className="py-2 pr-4 font-medium text-gray-800">
                      ${order.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      </section>
    </div>
  );
}