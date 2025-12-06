

export type Customer = {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "VIP";
  totalOrders: number;
  totalSpent: number;
  joinedAt: string;
};

export const customers: Customer[] = [
  {
    id: 1,
    name: "Ahmed Ali",
    email: "ahmed@example.com",
    status: "Active",
    totalOrders: 5,
    totalSpent: 3200,
    joinedAt: "2025-12-10",
  },
  {
    id: 2,
    name: "Sara Mohamed",
    email: "sara@example.com",
    status: "VIP",
    totalOrders: 12,
    totalSpent: 9100,
    joinedAt: "2025-11-03",
  },
  {
    id: 3,
    name: "Omar Hassan",
    email: "omar@example.com",
    status: "Inactive",
    totalOrders: 2,
    totalSpent: 750,
    joinedAt: "2025-12-18",
  },
  {
    id: 4,
    name: "Mona Ahmed",
    email: "mona@example.com",
    status: "Active",
    totalOrders: 7,
    totalSpent: 4800,
    joinedAt: "2025-02-01",
  },
  {
    id: 5,
    name: "Youssef Samir",
    email: "youssef@example.com",
    status: "Active",
    totalOrders: 3,
    totalSpent: 1900,
    joinedAt: "2024-09-27",
  },
];