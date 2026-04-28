import { useState } from "react";

const products = [
  {
    id: 1,
    name: "SilkSkin Serum",
    price: 4800,
    oldPrice: 6000,
    image: "/p1.png",
    discount: "20%",
  },
  {
    id: 2,
    name: "Argan Glow",
    price: 6300,
    oldPrice: 9000,
    image: "/p2.png",
    discount: "30%",
  },
  {
    id: 3,
    name: "HydraLuxe Serum",
    price: 2000,
    oldPrice: 4000,
    image: "/p3.png",
    discount: "50%",
  },
];

export default function ShopPage() {
  const [selected, setSelected] = useState("All");

  return (
    <div className="bg-[#f7f7f5] text-[#1a1a1a] min-h-screen pt-28 px-4 md:px-12">

      {/* HEADER */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold">Shop</h1>
        <p className="text-gray-500 mt-2">Home / Shop</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">

        {/* SIDEBAR */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-xl border border-gray-200">

          <h2 className="font-semibold mb-6">Filter Options</h2>

          {/* Categories */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-3">Categories</p>

            {["All", "Perfumes", "Jewelry", "Oils"].map((cat) => (
              <label key={cat} className="flex items-center gap-2 mb-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={selected === cat}
                  onChange={() => setSelected(cat)}
                  className="accent-[#1f4d3f]"
                />
                {cat}
              </label>
            ))}
          </div>

          {/* Price */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-3">Price</p>
            <input type="range" className="w-full accent-[#1f4d3f]" />
          </div>

          {/* Availability */}
          <div>
            <p className="text-sm text-gray-500 mb-3">Availability</p>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="accent-[#1f4d3f]" />
              In Stock
            </label>
          </div>

        </div>

        {/* PRODUCTS */}
        <div className="flex-1">

          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-500 text-sm">
              Showing {products.length} results
            </p>

            <select className="bg-white border border-gray-200 p-2 rounded-md text-sm">
              <option>Default Sorting</option>
              <option>Price Low → High</option>
              <option>Price High → Low</option>
            </select>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {products.map((p) => (
              <div
                key={p.id}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition"
              >
                {/* IMAGE */}
                <div className="relative bg-[#f3f4f6]">
                  <img
                    src={p.image}
                    className="w-full h-44 object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* DISCOUNT */}
                  <span className="absolute top-3 left-3 bg-[#1f4d3f] text-white text-xs px-2 py-1 rounded-full">
                    {p.discount} OFF
                  </span>
                </div>

                {/* DETAILS */}
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">Fragrance</p>

                  <p className="font-medium">{p.name}</p>

                  <div className="flex gap-2 items-center mt-1">
                    <span className="text-[#1f4d3f] font-semibold">
                      KSh {p.price}
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      KSh {p.oldPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* PAGINATION */}
          <div className="flex justify-center gap-3 mt-10">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                className="w-9 h-9 rounded-full border border-gray-300 hover:bg-[#1f4d3f] hover:text-white transition"
              >
                {num}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 mt-16 text-center border-t border-gray-200 pt-10">

        <div>
          <p className="font-semibold">Free Shipping</p>
          <p className="text-gray-500 text-sm">
            Free shipping above KSh 5000
          </p>
        </div>

        <div>
          <p className="font-semibold">Flexible Payment</p>
          <p className="text-gray-500 text-sm">
            Secure payment options
          </p>
        </div>

        <div>
          <p className="font-semibold">24/7 Support</p>
          <p className="text-gray-500 text-sm">
            We are always available
          </p>
        </div>

      </div>
    </div>
  );
}