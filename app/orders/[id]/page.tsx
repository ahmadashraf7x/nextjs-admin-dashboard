"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { orders, Order } from "../../data/orders";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const orderId = Number(id);

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="space-y-4">
        <p className="text-red-600 font-semibold">Order not found.</p>
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ⬅ Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back link */}
      <div>
        <Link
          href="/"
          className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 mb-2"
        >
          <span className="text-lg">⬅</span>
          Back to dashboard
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Order #{order.id}
        </h1>
        <p className="text-sm text-gray-500">
          Customer: <span className="font-medium">{order.customerName}</span>
        </p>
      </div>

      {/* Order main info */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Status</p>
          <span
            className={`inline-flex mt-1 px-2 py-1 rounded-full text-xs font-semibold
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
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Order Date</p>
          <p className="mt-1 text-sm font-medium text-gray-800">
            {order.date}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Amount</p>
          <p className="mt-1 text-xl font-bold text-emerald-600">
            ${order.amount}
          </p>
        </div>
      </section>

      {/* Extra box for “Order summary” (شكل بس) */}
      <section className="bg-white rounded-xl shadow-sm p-4 md:p-6 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Order Summary
        </h2>
        <p className="text-sm text-gray-600">
          This is a mock order details page. In a real dashboard, you would
          show the list of products, shipping address, payment method, and more
          info related to this order.
        </p>
      </section>
    </div>
  );
}