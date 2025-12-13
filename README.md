# 📊 Admin Dashboard — Orders, Customers & Products

![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=fff)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

A modern **Admin Dashboard** built with **Next.js (App Router)**, **React**, **TypeScript** and **Tailwind CSS**.

Includes pages for **Dashboard**, **Orders**, **Customers**, **Products**, and **Stats** with search, filters, sorting and charts — using static mock data (no backend).

---

## 🚀 Features

### 🧭 Layout & Navigation
- Persistent sidebar with:
  - Dashboard
  - Orders
  - Customers
  - Products
  - Statistics
- Responsive layout (sidebar hidden on mobile, main content full width)

---

### 📊 Dashboard (Overview)
- Summary cards:
  - Total Orders
  - Total Revenue
  - Pending Orders
- Line chart: **Revenue per day**
- Pie chart: **Orders by status**
- Recent orders table with status badges

---

### 📦 Orders Page
- Full orders list
- Search by:
  - Order ID
  - Customer name
- Filter by **status** (Pending / Shipped / Cancelled)
- Sorting:
  - ID (asc/desc)
  - Date (asc/desc)
  - Amount (asc/desc)
- Link to **Order details** page `/orders/[id]`

---

### 👥 Customers Page
- Summary cards:
  - Total customers
  - Active customers
  - Total spent (all customers)
- Search by **name** or **email**
- Filter by status (Active / VIP / Inactive)
- Sorting:
  - Name (A–Z / Z–A)
  - Total spent (asc/desc)
- Customers table with status badges
- Customer details page `/customers/[id]` showing:
  - Basic info
  - Status, total orders, total spent
  - Simple summary

---

### 🛒 Products Page
- Summary cards:
  - Total products
  - In stock
  - Low stock
  - Out of stock
- Search by **name** or **category**
- Filter by **stock status**
- Sorting:
  - Name (A–Z / Z–A)
  - Price (asc/desc)
- Products table with:
  - ID, name, category, price, stock, status badge
- Product details page `/products/[id]`

---

### 📈 Statistics Page
- Global KPIs:
  - Total orders
  - Total revenue
  - Average order value
  - New customers this month
- Top 5 customers by **total spent**
- Top 5 customers by **number of orders**

---

## 🛠 Tech Stack

- **Next.js 16.0.7 (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- Mock data stored locally in `data/` folder (no backend)

---

## 📸 Screenshots
### 📊 Dashboard Overview
![Dashboard](./public/screenshots/dashboard.png)

### 🛍 Products
![Products](./public/screenshots/products.png)

### 📦 Orders Management
![Orders](./public/screenshots/orders.png)

### 👥 Customers
![Customers](./public/screenshots/customers.png)

### 📈 Statistics
![Statistics](./public/screenshots/statistics.png)

## ▶️ Run Locally

```bash
git clone https://github.com/ahmadashraf7x/nextjs-admin-dashboard.git
cd nextjs-admin-dashboard
npm install
npm run dev
```

### 🌍 Live Demo 

🚀 https://nextjs-admin-dashboard-blush.vercel.app

---

### 📌 Author
**Ahmad Ashraf**

Front-End Developer