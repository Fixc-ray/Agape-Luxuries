import { db } from "../Components/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getDashboardStats = async () => {
  try {
    const [ordersSnap, productsSnap, customersSnap] = await Promise.all([
      getDocs(collection(db, "orders")),
      getDocs(collection(db, "perfumes")),
      getDocs(collection(db, "customers")),
    ]);

    let revenue = 0;

    const orders = ordersSnap.docs.map((doc) => {
      const data = doc.data();

      const total = Number(data.total) || 0;
      revenue += total;

      return {
        id: doc.id,
        total,
        status: data.status || "pending",
        date: data.date || null,
      };
    });

    return {
      totalOrders: orders.length,
      totalProducts: productsSnap.size,
      totalCustomers: customersSnap.size,
      revenue,
      orders,
    };
  } catch (err) {
    console.error("Dashboard Service Error:", err);
    return {
      totalOrders: 0,
      totalProducts: 0,
      totalCustomers: 0,
      revenue: 0,
      orders: [],
    };
  }
};