import { useState } from "react";
import { db, auth } from "../Components/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function DubaiShippingOrder() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    product: "",
    quantity: 1,
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const user = auth.currentUser;

      await addDoc(collection(db, "dubaiOrders"), {
        ...form,
        userId: user ? user.uid : null,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setForm({
        name: "",
        phone: "",
        location: "",
        product: "",
        quantity: 1,
        notes: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md border border-gray-200">
      
      <h2 className="text-xl font-semibold text-center mb-6">
        Dubai Shipping Order ✈️
      </h2>

      {success && (
        <div className="mb-4 text-green-600 text-center">
          Order placed successfully ✅
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg"
        />

        {/* PHONE */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg"
        />

        {/* LOCATION */}
        <input
          type="text"
          name="location"
          placeholder="Delivery Location"
          value={form.location}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg"
        />

        {/* PRODUCT */}
        <input
          type="text"
          name="product"
          placeholder="Product Name"
          value={form.product}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg"
        />

        {/* QUANTITY */}
        <input
          type="number"
          name="quantity"
          min="1"
          value={form.quantity}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        {/* NOTES */}
        <textarea
          name="notes"
          placeholder="Extra notes (optional)"
          value={form.notes}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#3c4b37] text-white py-3 rounded-full font-medium hover:opacity-90 transition"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}