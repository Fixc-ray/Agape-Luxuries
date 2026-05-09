import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import {
  getCart,
  updateCartQty,
  removeFromCart,
} from "../Services/cartService";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Load cart from Firebase
  const loadCart = async () => {
    const data = await getCart();
    setCart(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  // 🔄 Update quantity
  const updateQty = async (id, delta) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    const newQty = Math.max(1, item.qty + delta);
    await updateCartQty(id, newQty);
    loadCart();
  };

  // ❌ Remove item
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
  <div className="max-w-7xl mx-auto px-6 py-20">

    {/* TITLE */}
    <h1 className="text-4xl font-semibold mb-10">Shopping Cart</h1>

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

        {/* LEFT - CART TABLE */}
        <div className="lg:col-span-2 bg-white rounded-2xl border p-6">

          {/* HEADER */}
          <div className="grid grid-cols-5 text-sm text-gray-500 mb-4 px-2">
            <span className="col-span-2">Product</span>
            <span className="text-center">Quantity</span>
            <span className="text-center">Total</span>
            <span className="text-center">Action</span>
          </div>

          {/* ITEMS */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-5 items-center border rounded-xl p-4"
              >
                {/* PRODUCT */}
                <div className="col-span-2 flex items-center gap-4">
                  <img
                    src={item.imageUrl || "/placeholder.png"}
                    className="w-16 h-16 object-contain bg-gray-50 rounded"
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
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* UPDATE BUTTON */}
          <button className="mt-6 bg-black text-white px-6 py-2 rounded-full">
            Update Cart
          </button>
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white rounded-2xl border p-6 h-fit">

          <h2 className="font-semibold mb-6">Order Summary</h2>

          {/* SUBTOTAL */}
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>KES {subtotal.toLocaleString()}</span>
          </div>

          {/* DISCOUNT */}
          <div className="flex justify-between text-sm mb-2">
            <span>Discount</span>
            <span>KES 0</span>
          </div>

          {/* DELIVERY */}
          <div className="flex justify-between text-sm mb-4">
            <span>Delivery Fee</span>
            <span>KES 0</span>
          </div>

          {/* TOTAL */}
          <div className="flex justify-between font-semibold text-lg border-t pt-4 mb-6">
            <span>Total</span>
            <span>KES {subtotal.toLocaleString()}</span>
          </div>

          {/* CHECKOUT BUTTON */}
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-black text-white py-3 rounded-full"
          >
            Checkout Now
          </button>
        </div>
      </div>
    )}
  </div>
  );}