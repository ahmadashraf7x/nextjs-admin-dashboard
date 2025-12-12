"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { products } from "../../data/products";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  stock: number; 
};

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="space-y-4">
        <p className="text-red-600 font-semibold">Product not found.</p>
        <Link href="/products" className="text-blue-600 hover:underline">
          ⬅ Back to products
        </Link>
      </div>
    );
  }

  const statusClasses =
    product.status === "In Stock"
      ? "bg-emerald-100 text-emerald-700"
      : product.status === "Low Stock"
      ? "bg-amber-100 text-amber-700"
      : "bg-red-100 text-red-600";

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/products"
          className="text-sm md:text-base text-gray-600 hover:text-gray-800 flex items-center gap-1 mb-2"
        >
          <span className="text-lg">⬅</span>
          Back to products
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {product.name}
        </h1>
        <p className="text-sm text-gray-500">{product.category}</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Price</p>
          <p className="mt-1 text-2xl font-bold text-blue-600">
            ${product.price}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Stock</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">
            {product.stock}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Status</p>
          <span
            className={`inline-flex mt-2 px-2 py-1 rounded-full text-xs font-semibold ${statusClasses}`}
          >
            {product.status}
          </span>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm p-4 md:p-6 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Product Summary
        </h2>
        <p className="text-sm text-gray-600">
          This is a mock product details page. In a real dashboard, you might
          show recent orders for this product, stock history, supplier info,
          and more.
        </p>
      </section>
    </div>
  );
}