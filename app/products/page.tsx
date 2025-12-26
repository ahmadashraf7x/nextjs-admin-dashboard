"use client";

import { useState } from "react";
import { products, Product } from "../data/products";
import Link from "next/link";

const totalProducts = products.length;
const inStockCount = products.filter((p) => p.status === "In Stock").length;
const lowStockCount = products.filter((p) => p.status === "Low Stock").length;
const outOfStockCount = products.filter((p) => p.status === "Out of Stock").length;

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState<"name" | "price">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  function handleSort(field: "name" | "price") {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }

  const filteredProducts = products.filter((product) => {
    const searchLower = search.toLowerCase();

    const matchesName = product.name.toLowerCase().includes(searchLower);
    const matchesCategory = product.category.toLowerCase().includes(searchLower);

    const matchesSearch = matchesName || matchesCategory;

    const matchesStatus =
      filterStatus === "all" ||
      product.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    if (sortField === "name") {
      aValue = a.name.toLowerCase();
      bValue = b.name.toLowerCase();

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    } else {
      aValue = a.price;
      bValue = b.price;

      const base = aValue - bValue;
      return sortDirection === "asc" ? base : -base;
    }
  });


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
          Products
        </h1>
        <p className="text-sm text-gray-600">
          List of products with stock status and pricing.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-bold text-gray-800">
            {totalProducts}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">In Stock</p>
          <p className="text-2xl font-bold text-emerald-600">
            {inStockCount}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Low Stock</p>
          <p className="text-2xl font-bold text-amber-500">
            {lowStockCount}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Out of Stock</p>
          <p className="text-2xl font-bold text-red-500">
            {outOfStockCount}
          </p>
        </div>
      </section>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or category..."
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
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      <section className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Products List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  ID
                </th>
                <th
                  className="text-left py-2 pr-4 text-gray-500 font-medium cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Category
                </th>
                <th
                  className="text-left py-2 pr-4 text-gray-500 font-medium cursor-pointer"
                  onClick={() => handleSort("price")}
                >
                  Price {sortField === "price" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Stock
                </th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product: Product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <td className="py-2 pr-4 text-gray-700">
                    #{product.id}
                  </td>
                  <td className="py-2 pr-4 text-gray-800">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td className="py-2 pr-4 text-gray-600">
                    {product.category}
                  </td>
                  <td className="py-2 pr-4 font-medium text-gray-800">
                    ${product.price}
                  </td>
                  <td className="py-2 pr-4 text-gray-700">
                    {product.stock}
                  </td>
                  <td className="py-2 pr-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold
                        ${product.status === "In Stock"
                          ? "bg-emerald-100 text-emerald-700"
                          : product.status === "Low Stock"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-600"
                        }`}
                    >
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}

              {sortedProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-4 text-center text-gray-500 italic"
                  >
                    No products found.
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