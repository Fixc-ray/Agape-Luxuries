// dashboardService.js

import { db } from "../Components/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getDashboardStats = async () => {
  try {
    // Fetch public collections first
    const [ordersSnap, productsSnap] = await Promise.all([
      getDocs(collection(db, "orders")),
      getDocs(collection(db, "perfumes")), // or "products"
    ]);

    let usersCount = 0;

    // Try to fetch users (admin only)
    try {
      const usersSnap = await getDocs(collection(db, "users"));
      usersCount = usersSnap.size;
    } catch (err) {
      console.warn("Users collection access denied:", err.message);
      usersCount = 0;
    }

    let revenue = 0;
    const orders = [];

    ordersSnap.forEach((doc) => {
      const data = doc.data() || {};
      const total = Number(data.total) || 0;

      revenue += total;

      orders.push({
        id: doc.id,
        total,
        status: data.status || "pending",
        createdAt: data.createdAt || null,
        ...data,
      });
    });

    // Sort newest first
    orders.sort((a, b) => {
      const aSeconds = a.createdAt?.seconds || 0;
      const bSeconds = b.createdAt?.seconds || 0;
      return bSeconds - aSeconds;
    });

    return {
      revenue,
      totalOrders: orders.length,
      totalProducts: productsSnap.size,
      totalCustomers: usersCount,
      orders,
    };
  } catch (error) {
    console.error("Dashboard Error:", error);

    return {
      revenue: 0,
      totalOrders: 0,
      totalProducts: 0,
      totalCustomers: 0,
      orders: [],
    };
  }
};