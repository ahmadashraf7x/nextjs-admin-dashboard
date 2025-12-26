import Link from "next/link";
import { Order } from "@/app/data/orders";

type OrdersTableProps = {
    orders: Order[];
};

export default function OrdersTable({ orders }: OrdersTableProps) {
    return (

        <tbody>
            {orders.map((order) => (
                <tr
                    key={order.id}
                    className="border-b border-gray-100 last:border-b-0"
                >
                    <td className="py-2 pr-4 text-gray-700">{order.id}</td>

                    <td className="py-2 pr-4 text-gray-700">
                        {order.customerName}
                    </td>

                    <td className="py-2 pr-4 text-gray-600">{order.date}</td>

                    <td className="py-2 pr-4">
                        <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold
                  ${order.status === "Pending"
                                    ? "bg-amber-100 text-amber-700"
                                    : order.status === "Shipped"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-red-100 text-red-600"
                                }`}
                        >
                            {order.status}
                        </span>
                    </td>

                    <td className="py-2 pr-4 font-medium text-gray-800">
                        ${order.amount}
                    </td>

                    <td className="py-2 pr-4 font-medium text-gray-800">
                        <Link
                            href={`/orders/${order.id}`}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            View
                        </Link>
                    </td>
                </tr>
            ))}
        </tbody>

    );
}
