import { orders } from "@/app/data/orders";

export function getDashboardStats() {
    const totalOrders = orders.length;

    const totalRevenue = orders.reduce(
        (sum, order) => sum + order.amount,
        0
    );

    const pendingOrders = orders.filter(
        (o) => o.status === "Pending"
    ).length;

    return {
        totalOrders,
        totalRevenue,
        pendingOrders,
    };
}

export function getRevenueByDate() {
    const revenueByDateMap: Record<string, number> = {};

    orders.forEach((order) => {
        revenueByDateMap[order.date] =
            (revenueByDateMap[order.date] ?? 0) + order.amount;
    });

    return Object.entries(revenueByDateMap)
        .map(([date, total]) => ({ date, total }))
        .sort(
            (a, b) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
        );
}

export function getOrdersByStatus() {
    return [
        {
            name: "Pending",
            value: orders.filter((o) => o.status === "Pending").length,
        },
        {
            name: "Shipped",
            value: orders.filter((o) => o.status === "Shipped").length,
        },
        {
            name: "Cancelled",
            value: orders.filter((o) => o.status === "Cancelled").length,
        },
    ];
}
