// AdminOrders.jsx
import { useEffect, useState } from "react";
import { db } from "../Components/firebase";
import { collection, getDocs } from "firebase/firestore";
export default function AdminOrders() {
  const orders = [
    {
      id: "#45671",
      name: "Joe Martin",
      total: 12000,
      status: "Delivered",
    },
  ];

  return (
    <div className="bg-[#1a1625] p-5 rounded-xl border border-[#2a2440]">

      <h2 className="text-lg mb-4">Orders</h2>

      <table className="w-full text-sm">
        <thead className="text-gray-400">
          <tr>
            <th className="text-left pb-3">Order ID</th>
            <th className="text-left">Customer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t border-[#2a2440]">
              <td className="py-3">{o.id}</td>
              <td>{o.name}</td>
              <td>KES {o.total}</td>
              <td>
                <span className="text-green-400 text-xs">
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}