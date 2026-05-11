import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  ArrowLeft,
  ShoppingBag,
  Receipt,
  CreditCard,
} from "lucide-react";

import {
  getCart,
  updateCartQty,
  removeFromCart,
} from "../Services/cartService";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    const data = await getCart();
    setCart(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQty = async (id, delta) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    const newQty = Math.max(1, item.qty + delta);
    await updateCartQty(id, newQty);
    loadCart();
  };

  const removeItem = async (id) => {
    await removeFromCart(id);
    loadCart();
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0
  );

  if (loading) {
    return (
      <div className="mt-32 text-center text-gray-500">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 mt-10">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* 🛒 TITLE */}
      <div className="flex items-center gap-3 mb-10">
        <ShoppingBag size={28} />
        <h1 className="text-4xl font-semibold">
          Shopping Cart
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p>Your cart is empty 🛒</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-black text-white px-6 py-2 rounded-full"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT */}
          <div className="lg:col-span-2 bg-white rounded-2xl border p-6 shadow-sm">

            <div className="grid grid-cols-5 text-sm text-gray-500 mb-4 px-2">
              <span className="col-span-2">Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-center">Total</span>
              <span className="text-center">Action</span>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-5 items-center border rounded-xl p-4 hover:shadow-sm transition"
                >
                  {/* PRODUCT */}
                  <div className="col-span-2 flex items-center gap-4">
                    <img
                      src={item.imageUrl || "/placeholder.png"}
                      className="w-16 h-16 object-contain bg-gray-50 rounded-lg"
                    />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.volume || "—"}
                      </p>
                    </div>
                  </div>

                  {/* QTY */}
                  <div className="flex justify-center">
                    <div className="flex items-center border rounded-full px-3">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="px-2 text-lg"
                      >
                        −
                      </button>
                      <span className="px-2">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="px-2 text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* TOTAL */}
                  <div className="text-center font-medium">
                    KES {(item.qty * item.price).toLocaleString()}
                  </div>

                  {/* REMOVE */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 bg-black text-white px-6 py-2 rounded-full">
              Update Cart
            </button>
          </div>

          {/* RIGHT - SUMMARY */}
          <div className="bg-white rounded-2xl border p-6 h-fit shadow-sm">

            <div className="flex items-center gap-2 mb-6">
              <Receipt size={20} />
              <h2 className="font-semibold">Order Summary</h2>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>KES {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Discount</span>
              <span>KES 0</span>
            </div>

            <div className="flex justify-between text-sm mb-4">
              <span>Delivery Fee</span>
              <span>KES 0</span>
            </div>

            <div className="flex justify-between font-semibold text-lg border-t pt-4 mb-6">
              <span>Total</span>
              <span>KES {subtotal.toLocaleString()}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-black text-white py-3 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              <CreditCard size={18} />
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}