// ShopPage.jsx

import { useEffect, useState } from "react";
import { fetchPerfumes } from "../services/perfumeService";
import ProductCard from "./ProductCard";
import {
  SlidersHorizontal,
  Star,
  ChevronDown,
} from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("All");
  const [sort, setSort] = useState("default");
  const [price, setPrice] = useState(10000);
  const [inStock, setInStock] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Perfumes",
    "Jewelry",
    "Oils",
  ];

  // FETCH PRODUCTS
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPerfumes();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching perfumes:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // FILTERING
  const filteredProducts = products
    .filter((p) => {
      if (selected === "All") return true;

      return (
        p.category?.toLowerCase() ===
        selected.toLowerCase()
      );
    })
    .filter((p) => (p.price || 0) <= price)
    .filter((p) => !inStock || p.inStock === true);

  // SORTING
  const sortedProducts = [...filteredProducts].sort(
    (a, b) => {
      if (sort === "low")
        return (a.price || 0) - (b.price || 0);

      if (sort === "high")
        return (b.price || 0) - (a.price || 0);

      return 0;
    }
  );

  return (
    <div className="bg-[#f7f6f2] min-h-screen pt-28 px-4 md:px-8 lg:px-10 pb-20">
      {/* HEADER */}
      <div className="text-center mb-10 md:mb-12">
        <p className="text-xs md:text-sm text-[#7d7d7d] mb-3">
          Discover Premium Collections
        </p>

        <h1 className="text-3xl md:text-5xl font-semibold text-[#1a1a1a]">
          Shop
        </h1>
      </div>

      {/* MAIN */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* SIDEBAR */}
        <div
          className="
            w-full lg:w-[280px]
            bg-white rounded-3xl
            border border-[#ece7de]
            p-5 md:p-6 h-fit
            lg:sticky lg:top-28
          "
        >
          {/* TITLE */}
          <div className="flex items-center gap-2 mb-8">
            <SlidersHorizontal
              size={18}
              className="text-[#3c4b37]"
            />

            <h2 className="font-semibold text-lg">
              Filter Options
            </h2>
          </div>

          {/* CATEGORIES */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-4 text-[#1a1a1a]">
              By Categories
            </h3>

            <div className="space-y-3">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="
                    flex items-center justify-between
                    text-sm cursor-pointer
                    group
                  "
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={selected === cat}
                      onChange={() => setSelected(cat)}
                      className="accent-[#3c4b37]"
                    />

                    <span className="text-[#555] group-hover:text-black transition">
                      {cat}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* PRICE */}
          <div className="mb-8">
            <div className="flex justify-between mb-3">
              <h3 className="text-sm font-semibold">
                Price
              </h3>

              <span className="text-sm text-[#7d7d7d]">
                KSh {price.toLocaleString()}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="20000"
              value={price}
              onChange={(e) =>
                setPrice(Number(e.target.value))
              }
              className="w-full accent-[#3c4b37]"
            />
          </div>

          {/* REVIEWS */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-4">
              Reviews
            </h3>

            <div className="space-y-3">
              {[5, 4, 3].map((star) => (
                <div
                  key={star}
                  className="flex items-center gap-2 text-sm text-[#555]"
                >
                  <div className="flex text-yellow-400">
                    {Array.from({ length: star }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill="currentColor"
                        />
                      )
                    )}
                  </div>

                  <span>& Up</span>
                </div>
              ))}
            </div>
          </div>

          {/* AVAILABILITY */}
          <div>
            <h3 className="text-sm font-semibold mb-4">
              Availability
            </h3>

            <label className="flex items-center gap-3 text-sm text-[#555] cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={() => setInStock(!inStock)}
                className="accent-[#3c4b37]"
              />

              In Stock
            </label>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="flex-1">
          {/* TOP BAR */}
          <div
            className="
              flex flex-col sm:flex-row
              sm:items-center sm:justify-between
              gap-4 mb-6 md:mb-8
            "
          >
            <div>
              <p className="text-sm text-[#7d7d7d]">
                {loading
                  ? "Loading..."
                  : `Showing ${sortedProducts.length} Products`}
              </p>
            </div>

            {/* SORT */}
            <div className="relative w-full sm:w-fit">
              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
                className="
                  appearance-none
                  w-full sm:w-auto
                  bg-white border border-[#ece7de]
                  rounded-full
                  px-5 py-3 pr-10
                  text-sm text-[#444]
                  outline-none
                  cursor-pointer
                "
              >
                <option value="default">
                  Default Sorting
                </option>

                <option value="low">
                  Price Low → High
                </option>

                <option value="high">
                  Price High → Low
                </option>
              </select>

              <ChevronDown
                size={16}
                className="
                  absolute right-4 top-1/2
                  -translate-y-1/2
                  text-[#777]
                  pointer-events-none
                "
              />
            </div>
          </div>

          {/* STATES */}
          {loading ? (
            <div className="text-center py-32 text-[#777]">
              Loading products...
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-32 text-[#777]">
              No products found.
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-4 md:gap-6
              "
            >
              {sortedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          <div className="flex justify-center gap-3 mt-14">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                className="
                  w-10 h-10 rounded-full
                  border border-[#d8d1c7]
                  text-sm
                  hover:bg-[#3c4b37]
                  hover:text-white
                  transition
                "
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div
        className="
          grid grid-cols-1 md:grid-cols-3
          gap-6
          mt-16 md:mt-20 pt-10 md:pt-12
          border-t border-[#e6e0d6]
        "
      >
        <div className="text-center">
          <h3 className="font-semibold text-lg">
            Free Shipping
          </h3>

          <p className="text-sm text-[#777] mt-2">
            Free delivery above KSh 5000
          </p>
        </div>

        <div className="text-center">
          <h3 className="font-semibold text-lg">
            Flexible Payment
          </h3>

          <p className="text-sm text-[#777] mt-2">
            Secure payment methods
          </p>
        </div>

        <div className="text-center">
          <h3 className="font-semibold text-lg">
            24/7 Support
          </h3>

          <p className="text-sm text-[#777] mt-2">
            Dedicated customer support
          </p>
        </div>
      </div>
    </div>
  );
}