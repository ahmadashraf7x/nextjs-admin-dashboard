
export type Order = {
  id: number;
  customerName: string;
  status: "Pending" | "Shipped" | "Cancelled";
  amount: number;
  date: string;
};

export const orders: Order[] = [
  {
    id: 1,
    customerName: "Ahmed Ali",
    status: "Pending",
    amount: 1200,
    date: "2025-11-20",
  },
  {
    id: 2,
    customerName: "Sara Mohamed",
    status: "Shipped",
    amount: 850,
    date: "2025-11-21",
  },
  {
    id: 3,
    customerName: "Omar Hassan",
    status: "Cancelled",
    amount: 430,
    date: "2025-11-22",
  },
  {
    id: 4,
    customerName: "Mona Ahmed",
    status: "Shipped",
    amount: 1990,
    date: "2025-11-23",
  },
  {
    id: 5,
    customerName: "Ali Hassan",
    status: "Pending",
    amount: 640,
    date: "2025-11-24",
  },
];