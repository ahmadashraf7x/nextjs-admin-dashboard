

export type Customer = {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "VIP";
  joinedAt: string;
};

export const customers: Customer[] = [
  {
    id: 1,
    name: "Ahmed Ali",
    email: "ahmed@example.com",
    status: "Active",
    joinedAt: "2025-12-10",
  },
  {
    id: 2,
    name: "Sara Mohamed",
    email: "sara@example.com",
    status: "VIP",
    joinedAt: "2025-11-03",
  },
  {
    id: 3,
    name: "Omar Hassan",
    email: "omar@example.com",
    status: "Inactive",
    joinedAt: "2025-12-18",
  },
  {
    id: 4,
    name: "Mona Ahmed",
    email: "mona@example.com",
    status: "Active",
    joinedAt: "2025-02-01",
  },
  {
    id: 5,
    name: "Youssef Samir",
    email: "youssef@example.com",
    status: "Active",
    joinedAt: "2024-09-27",
  },
];