export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
};

export const products: Product[] = [
  {
    id: 101,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 120,
    stock: 35,
    status: "In Stock",
  },
  {
    id: 102,
    name: "Gaming Mouse",
    category: "Electronics",
    price: 45,
    stock: 8,
    status: "Low Stock",
  },
  {
    id: 103,
    name: "Office Chair",
    category: "Furniture",
    price: 220,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 104,
    name: "Notebook Pack",
    category: "Stationery",
    price: 15,
    stock: 120,
    status: "In Stock",
  },
  {
    id: 105,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 90,
    stock: 3,
    status: "Low Stock",
  },
  {
    id: 106,
    name: "Water Bottle",
    category: "Accessories",
    price: 12,
    stock: 60,
    status: "In Stock",
  },
  {
    id: 107,
    name: "Desk Lamp",
    category: "Furniture",
    price: 35,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 108,
    name: "Backpack",
    category: "Accessories",
    price: 55,
    stock: 18,
    status: "In Stock",
  },
];