"use client";

import { useState } from "react";
import { customers } from "../data/customers";
import Link from "next/link";

const totalCustomers = customers.length;
const activeCustomers = customers.filter((c) => c.status === "Active").length;
const totalSpentAll = customers.reduce((sum, c) => sum + c.totalSpent, 0);

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState<"name" | "totalSpent">("name");
const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

function handleSort(field: "name" | "totalSpent") {
  if (sortField === field) {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  } else {
    setSortField(field);
    setSortDirection("asc");
  }
}

  const filteredCustomers = customers.filter((customer) => {
    const searchLower = search.toLowerCase();

    const matchesName = customer.name.toLowerCase().includes(searchLower);
    const matchesEmail = customer.email.toLowerCase().includes(searchLower);

    const matchesSearch = matchesName || matchesEmail;

    const matchesStatus =
      filterStatus === "all" ||
      customer.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
  let aValue: number | string;
  let bValue: number | string;

  if (sortField === "name") {
    aValue = a.name.toLowerCase();
    bValue = b.name.toLowerCase();
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  } else {
    aValue = a.totalSpent;
    bValue = b.totalSpent;
    const base = aValue - bValue;
    return sortDirection === "asc" ? base : -base;
  }
});
  return (

    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
          Customers
        </h1>
        <p className="text-sm text-gray-600">
          List of customers with status, orders and spending.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Customers</p>
          <p className="text-2xl font-bold text-gray-800">
            {totalCustomers}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Active Customers</p>
          <p className="text-2xl font-bold text-emerald-600">
            {activeCustomers}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Spent</p>
          <p className="text-2xl font-bold text-blue-600">
            ${totalSpentAll}
          </p>
        </div>
      </section>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
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
          <option value="Active">Active</option>
          <option value="VIP">VIP</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <section className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Customers List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th
  className="text-left py-2 pr-4 text-gray-500 font-medium cursor-pointer"
  onClick={() => handleSort("name")}
>
  Name{" "}
  {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
</th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Email
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Status
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Orders
                </th>
               <th
  className="text-left py-2 pr-4 text-gray-500 font-medium cursor-pointer"
  onClick={() => handleSort("totalSpent")}
>
  Total Spent{" "}
  {sortField === "totalSpent" && (sortDirection === "asc" ? "↑" : "↓")}
</th>
              </tr>
            </thead>
            <tbody>
              {sortedCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-gray-100 last:border-b-0"
                >
                <td className="py-2 pr-4 text-gray-800">
  <Link
    href={`/customers/${customer.id}`}
    className="text-blue-600 hover:underline"
  >
    {customer.name}
  </Link>
</td>
                  <td className="py-2 pr-4 text-gray-600">
                    {customer.email}
                  </td>
                  <td className="py-2 pr-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold
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
                  </td>
                  <td className="py-2 pr-4 text-gray-700">
                    {customer.totalOrders}
                  </td>
                  <td className="py-2 pr-4 font-medium text-gray-800">
                    ${customer.totalSpent}
                  </td>
                </tr>
              ))}

              {sortedCustomers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-4 text-center text-gray-500 italic"
                  >
                    No customers match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}