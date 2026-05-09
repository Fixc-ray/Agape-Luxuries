import { useEffect, useState } from "react";
import { getCart } from "../Services/cartService";
import { placeOrder } from "../Services/orderService";

export default function Checkout() {
  const [payment, setPayment] = useState("mpesa");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    const loadCart = async () => {
      const data = await getCart();
      setCart(data);
    };

    loadCart();
  }, []);

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.placeholder]: e.target.value });
  };

  const handleOrder = async () => {
    if (!form.phone || !form.firstName) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);

    try {
      const orderId = await placeOrder({
        name: `${form.firstName} ${form.lastName}`,
        phone: form.phone,
        email: form.email,
        address: form.address,
        city: form.city,
        paymentMethod: payment,
        items: cart,
        total: subtotal,
      });

      alert("Order placed successfully");

      // 🔥 TODO: trigger M-Pesa here

    } catch (err) {
      console.error(err);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      <h1 className="text-5xl font-bold mb-12">CHECKOUT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-10">

          {/* INFO */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <input placeholder="firstName" onChange={handleChange} className="border-b p-2" />
              <input placeholder="lastName" onChange={handleChange} className="border-b p-2" />
              <input placeholder="phone" onChange={handleChange} className="border-b p-2" />
              <input placeholder="email" onChange={handleChange} className="border-b p-2" />
            </div>
          </section>

          {/* SHIPPING */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Shipping</h2>

            <div className="grid grid-cols-2 gap-4">
              <input placeholder="city" onChange={handleChange} className="border-b p-2" />
              <input placeholder="address" onChange={handleChange} className="border-b p-2 col-span-2" />
            </div>
          </section>

          {/* PAYMENT */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Payment</h2>

            <label className="flex justify-between border p-3 rounded">
              <span>M-Pesa</span>
              <input
                type="radio"
                checked={payment === "mpesa"}
                onChange={() => setPayment("mpesa")}
              />
            </label>

            <label className="flex justify-between border p-3 rounded mt-2">
              <span>Card</span>
              <input
                type="radio"
                checked={payment === "card"}
                onChange={() => setPayment("card")}
              />
            </label>

            <button
              onClick={handleOrder}
              disabled={loading}
              className="mt-6 w-full bg-black text-white py-4 font-semibold disabled:opacity-50"
            >
              {loading ? "Processing..." : "PAY AND PLACE ORDER"}
            </button>
          </section>
        </div>

        {/* RIGHT */}
        <div className="border-l pl-8">

          <h2 className="text-lg font-semibold mb-6">
            Shopping Bag ({cart.length})
          </h2>

          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img
                  src={item.imageUrl}
                  className="w-16 h-20 object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty {item.qty}
                  </p>
                </div>
                <span>
                  KES {(item.price * item.qty).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t pt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>KES {subtotal.toLocaleString()}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}