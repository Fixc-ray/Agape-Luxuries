import { useState } from "react";

export default function Checkout() {
  const [payment, setPayment] = useState("card");

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      {/* TITLE */}
      <h1 className="text-5xl font-bold mb-12">CHECKOUT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-10">

          {/* INFORMATION */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <input className="border-b p-2 outline-none" placeholder="First name" />
              <input className="border-b p-2 outline-none" placeholder="Last name" />
              <input className="border-b p-2 outline-none" placeholder="Phone number" />
              <input className="border-b p-2 outline-none" placeholder="Email" />
            </div>
          </section>

          {/* SHIPPING */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <input className="border-b p-2 outline-none" placeholder="Country / Region" />
              <input className="border-b p-2 outline-none" placeholder="City" />
              <input className="border-b p-2 outline-none col-span-2" placeholder="Address" />
              <input className="border-b p-2 outline-none" placeholder="Zip / Postal code" />
            </div>
          </section>

          {/* DELIVERY */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Delivery</h2>

            <div className="space-y-3">

              <label className="flex justify-between border p-3 rounded">
                <div>
                  <p className="font-medium">Standard Delivery</p>
                  <p className="text-sm text-gray-500">Delivery within 5-7 days</p>
                </div>
                <span className="text-sm">Free</span>
              </label>

              <label className="flex justify-between border p-3 rounded">
                <div>
                  <p className="font-medium">Express Shipping</p>
                  <p className="text-sm text-gray-500">Delivery within 1-3 days</p>
                </div>
                <span>$50</span>
              </label>

            </div>
          </section>

          {/* PAYMENT */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Payment</h2>

            <div className="space-y-4">

              <label className="flex justify-between items-center border p-3 rounded">
                <span>Credit Card</span>
                <input
                  type="radio"
                  checked={payment === "card"}
                  onChange={() => setPayment("card")}
                />
              </label>

              {payment === "card" && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <input className="border-b p-2 outline-none col-span-2" placeholder="Card number" />
                  <input className="border-b p-2 outline-none" placeholder="Expiration (MM/YY)" />
                  <input className="border-b p-2 outline-none" placeholder="CVV" />
                </div>
              )}

              <label className="flex justify-between items-center border p-3 rounded">
                <span>M-Pesa</span>
                <input
                  type="radio"
                  checked={payment === "mpesa"}
                  onChange={() => setPayment("mpesa")}
                />
              </label>

            </div>

            <button className="mt-6 w-full bg-black text-white py-4 font-semibold">
              PAY AND PLACE ORDER
            </button>
          </section>

        </div>

        {/* RIGHT SIDE - SHOPPING BAG */}
        <div className="border-l pl-8">

          <h2 className="text-lg font-semibold mb-6">Shopping Bag (3)</h2>

          <div className="space-y-6">

            {/* ITEM */}
            <div className="flex gap-4">
              <img
                src="/item1.jpg"
                className="w-16 h-20 object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">Top Coat Amon</p>
                <p className="text-sm text-gray-500">Size M · Black</p>
              </div>
              <span>$1,320</span>
            </div>

            <div className="flex gap-4">
              <img src="/item2.jpg" className="w-16 h-20 object-cover" />
              <div className="flex-1">
                <p className="font-medium">Dress Barta</p>
                <p className="text-sm text-gray-500">Size S · Black</p>
              </div>
              <span>$910</span>
            </div>

            <div className="flex gap-4">
              <img src="/item3.jpg" className="w-16 h-20 object-cover" />
              <div className="flex-1">
                <p className="font-medium">Robe Nirti</p>
                <p className="text-sm text-gray-500">Size M · Black</p>
              </div>
              <span>$1,530</span>
            </div>

          </div>

          {/* TOTAL */}
          <div className="mt-10 border-t pt-6 space-y-3">

            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span>$0</span>
            </div>

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>$3,760</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}