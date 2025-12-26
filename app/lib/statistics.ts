import { orders } from "../data/orders";
import { customers } from "../data/customers";

export function getStatsOverview() {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
    const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

    return {
        totalOrders,
        totalRevenue,
        avgOrderValue,
    };
}

export function getTopCustomers() {
    const topBySpent = [...customers]
        .sort((a, b) => b.totalSpent - a.totalSpent)
        .slice(0, 5);

    const topByOrders = [...customers]
        .sort((a, b) => b.totalOrders - a.totalOrders)
        .slice(0, 5);

    return {
        topBySpent,
        topByOrders,
    };
}

export function getNewCustomersThisMonth() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    return customers.filter((c) => {
        const joined = new Date(c.joinedAt);
        return joined.getMonth() === month && joined.getFullYear() === year;
    }).length;
}
