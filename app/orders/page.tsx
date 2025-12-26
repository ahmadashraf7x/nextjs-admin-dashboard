"use client";

import { useState } from "react";
import { Order, orders } from "../data/orders";
import Link from "next/link";
import OrdersTable from "../components/orders/OrdersTable";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState<"id" | "date" | "amount">("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  function handleSort(field: "id" | "date" | "amount") {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }

  const filteredOrders = orders.filter((order) => {
    const searchLower = search.toLowerCase();
    const matchesId = order.id.toString().includes(searchLower);
    const matchesCustomer = order.customerName
      .toLowerCase()
      .includes(searchLower);

    const matchesSearch = matchesId || matchesCustomer;
    const matchesStatus =
      filterStatus === "all" ||
      order.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });


  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let aValue: number;
    let bValue: number;
    if (sortField === "id") {
      aValue = a.id;
      bValue = b.id;
    } else if (sortField === "amount") {
      aValue = a.amount;
      bValue = b.amount;
    } else {
      aValue = new Date(a.date).getTime();
      bValue = new Date(b.date).getTime();
    }

    const base = aValue - bValue;
    return sortDirection === "asc" ? base : -base;
  });


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
          Orders
        </h1>
        <p className="text-sm text-gray-600">
          Full list of all orders in the system.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by ID, customer..."
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-full md:w-52 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>



      <section className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          All Orders
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th
                  className="text-left py-2 pr-4 text-gray-500 font-medium cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  ID{" "}
                  {sortField === "id" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>

                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Customer
                </th>

                <th
                  className="text-left py-2 pr-4 text-gray-500 font-medium cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  Date{" "}
                  {sortField === "date" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>

                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Status
                </th>

                <th
                  className="text-left py-2 pr-4 text-gray-500 font-medium cursor-pointer"
                  onClick={() => handleSort("amount")}
                >
                  Amount{" "}
                  {sortField === "amount" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>

                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Details
                </th>
              </tr>
            </thead>
            {sortedOrders.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500 italic">
                    No orders match your search.
                  </td>
                </tr>
              </tbody>
            ) : (
              <OrdersTable orders={sortedOrders} />
            )}

          </table>
        </div>
      </section>
    </div>
  );
}