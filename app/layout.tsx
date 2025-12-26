"use client";

import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="min-h-screen flex">
          <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
            <div className="px-6 py-4 border-b border-slate-700">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-xs text-slate-400">
                Orders & stats overview
              </p>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2 text-sm">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
              >
                📊 Dashboard
              </Link>

              <Link
                href="/products"
                className="block px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
              >
                🛍 Products
              </Link>

              <Link
                href="/orders"
                className="block px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
              >
                📦 Orders
              </Link>


              <Link
                href="/customers"
                className="block px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
              >
                👥 Customers
              </Link>

              <Link
                href="/statistics"
                className="block px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
              >
                📈 Statistics
              </Link>
            </nav>

            <div className="px-6 py-4 border-t border-slate-700 text-xs text-slate-400">
              Logged in as <span className="text-slate-200">Admin</span>
            </div>
          </aside>
          <main className="flex-1 flex flex-col">
            <header className="md:hidden bg-white shadow-sm px-4 py-3 mb-2">
              <h1 className="text-lg font-semibold text-gray-800">
                Admin Dashboard
              </h1>
            </header>

            <div className="max-w-6xl mx-auto w-full px-4 py-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}