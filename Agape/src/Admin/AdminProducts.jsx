// AdminProducts.jsx
import { useEffect, useState } from "react";
import { db } from "../Components/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
export default function AdminProducts({ products }) {
  return (
    <div className="bg-[#1a1625] p-5 rounded-xl border border-[#2a2440]">

      <h2 className="text-lg mb-4">Products</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="text-gray-400">
            <tr>
              <th className="text-left pb-3">Product</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((p) => (
              <tr key={p.id} className="border-t border-[#2a2440]">
                <td className="py-3 flex items-center gap-3">
                  <img
                    src={p.imageUrl}
                    className="w-10 h-10 rounded object-cover"
                  />
                  {p.name}
                </td>
                <td>KES {p.price}</td>
                <td>
                  <span className="text-green-400">
                    {p.inStock ? "In Stock" : "Out"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}