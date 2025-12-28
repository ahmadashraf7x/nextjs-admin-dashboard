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

function buildCustomerStats() {
    const customersStats : Record<
        string,
        { name: string; totalOrders: number; totalSpent: number }
    > = {};

    orders.forEach((order) => {
        if (!customersStats [order.customerName]) {
            customersStats [order.customerName] = {
                name: order.customerName,
                totalOrders: 0,
                totalSpent: 0,
            };
        }

        customersStats [order.customerName].totalOrders += 1;
        customersStats [order.customerName].totalSpent += order.amount;
    });

    return Object.values(customersStats );
}

export function getTopCustomers() {
    const stats = buildCustomerStats();
    const topBySpent = [...stats]
        .sort((a, b) => b.totalSpent - a.totalSpent)
        .slice(0, 5);

    const topByOrders = [...stats]
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
