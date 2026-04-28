import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Hakimi Perfume",
      volume: "35 ml",
      price: 99000,
      qty: 1,
      image: "/perfume1.png",
    },
    {
      id: 2,
      name: "Ramsey Perfume",
      volume: "35 ml",
      price: 89000,
      qty: 1,
      image: "/perfume2.png",
    },
  ]);

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-md mx-auto px-4 mt-24 pb-32">
      
      {/* HEADER */}
      <h2 className="text-2xl font-semibold mb-6 tracking-tight">
        My Cart
      </h2>

      {/* EMPTY STATE */}
      {cart.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          <p>Your cart feels a little empty 🛒</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-black text-white px-6 py-2 rounded-full"
          >
            Start Shopping
          </button>
        </div>
      )}

      {/* ITEMS */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-contain bg-gray-50 rounded-lg"
            />

            {/* INFO */}
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium text-sm">
                  {item.name}
                </h3>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-1">
                {item.volume}
              </p>

              <p className="font-semibold mt-2 text-sm">
                KES {item.price.toLocaleString()}
              </p>

              {/* QTY CONTROL */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center bg-gray-100 rounded-full px-2">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="px-2 text-lg"
                  >
                    −
                  </button>
                  <span className="px-2 text-sm">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="px-2 text-lg"
                  >
                    +
                  </button>
                </div>

                <span className="text-sm font-medium">
                  KES {(item.qty * item.price).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* STICKY SUMMARY */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-lg">
          <div className="max-w-md mx-auto">
            
            <div className="flex justify-between mb-3 text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">
                KES {subtotal.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-medium transition"
            >
              Proceed to Checkout
            </button>

          </div>
        </div>
      )}
    </div>
  );
}