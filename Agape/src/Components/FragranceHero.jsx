// FragranceHero.jsx

import { useEffect, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import Blogs from "./Blogs";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../Components/firebase";

const slides = [
  {
    type: "perfume",
    title: "Evoke Every \nEmotion with \nFragsence",
    desc: "Bold masculine fragrances crafted for presence and confidence.",
    image:
      "https://i.pinimg.com/736x/f4/28/a8/f428a8f8fcda2f0f5247f43acf1dea16.jpg",
  },

  {
    type: "jewelry",
    title: "Refined Luxury \nJewelry \nCollection",
    desc: "Timeless pieces designed to elevate your presence.",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200",
  },
];

export default function FragranceHero() {
  const [index, setIndex] = useState(0);

  const [bestSellers, setBestSellers] =
    useState([]);

  const navigate = useNavigate();

  // AUTO HERO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(
        (prev) => (prev + 1) % slides.length
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // FETCH BEST SELLERS
  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const q = query(
          collection(db, "perfumes"),
          where("isBestSeller", "==", true)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBestSellers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBestSellers();
  }, []);

  const current = slides[index];

  return (
    <div className="min-h-screen bg-[#0b0f14] overflow-hidden">
      {/* HERO SECTION */}
      <div className="relative min-h-screen">
        {/* BG IMAGE */}
        <div
          className="
            absolute inset-0
            bg-cover bg-center
            transition-all duration-1000
            scale-105
          "
          style={{
            backgroundImage: `url(${current.image})`,
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/55" />

        {/* HERO CONTENT */}
        <div
          className="
            relative z-10
            grid lg:grid-cols-2
            gap-12
            px-5 sm:px-8 md:px-14
            pt-28 md:pt-36
            pb-48 md:pb-56
            min-h-screen
            text-white
          "
        >
          {/* LEFT */}
          <div className="flex flex-col justify-center">
            <h1
              className="
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                font-extrabold
                leading-[1.05]
                whitespace-pre-line
                max-w-[700px]
              "
            >
              {current.title}
            </h1>

            <p
              className="
                mt-5
                text-sm sm:text-base
                text-gray-300
                max-w-md
                leading-relaxed
              "
            >
              {current.desc}
            </p>
          </div>

          {/* RIGHT */}
          <div
            className="
              flex flex-col
              justify-center
              lg:items-end
              lg:text-right
              text-left
            "
          >
            <div className="max-w-md">
              <p
                className="
                  text-2xl md:text-3xl
                  font-semibold
                "
              >
                Premium Collection
              </p>

              <p
                className="
                  text-sm md:text-base
                  text-gray-300
                  mt-3
                  leading-relaxed
                "
              >
                Elevate your everyday moments with
                bold fragrances crafted for presence
                and distinction.
              </p>
            </div>

            <div className="flex gap-4 mt-8 flex-wrap">
              {current.type === "jewelry" ? (
                <button
                  className="
                    bg-gray-500
                    px-6 py-3 rounded-full
                    cursor-not-allowed
                    text-sm md:text-base
                  "
                >
                  Coming Soon
                </button>
              ) : (
                <button
                  onClick={() =>
                    navigate("/products")
                  }
                  className="
                    bg-white text-black
                    px-6 py-3 rounded-full
                    font-medium
                    text-sm md:text-base
                    hover:bg-gray-200
                    transition
                  "
                >
                  Shop Now
                </button>
              )}

              <button
                className="
                  border border-white/30
                  px-6 py-3 rounded-full
                  text-sm md:text-base
                  hover:bg-white
                  hover:text-black
                  transition
                "
              >
                Explore
              </button>
            </div>
          </div>
        </div>

        {/* BEST SELLERS */}
        <div
          className="
            absolute bottom-6 md:bottom-10
            left-0 w-full
            z-20
            overflow-hidden
          "
        >
          <div
            className="
              flex animate-scroll
              gap-3 sm:gap-4
              min-w-max
              px-4 md:px-6
            "
          >
            {[...bestSellers, ...bestSellers].map(
              (product, index) => {
                const discount =
                  product.oldPrice &&
                  product.oldPrice >
                    product.price
                    ? Math.round(
                        ((product.oldPrice -
                          product.price) /
                          product.oldPrice) *
                          100
                      )
                    : null;

                return (
                  <div
                    key={`${product.id}-${index}`}
                    onClick={() =>
                      navigate(
                        `/product/${product.id}`
                      )
                    }
                    className="
                      relative
                      w-[120px] sm:w-[150px] md:w-[170px]
                      sm:w-[170px]
                      md:w-[190px]
                      h-[10px]
                      sm:h-[220px]
                      md:h-[240px]
                      rounded-[24px]
                      overflow-hidden
                      cursor-pointer
                      shrink-0
                      group
                    "
                  >
                    {/* IMAGE */}
                    <img
                      src={
                        product.imageUrl ||
                        product.image ||
                        "/placeholder.png"
                      }
                      alt={product.name}
                      className="
                        absolute inset-0
                        w-full h-full
                        object-cover
                        group-hover:scale-105
                        transition duration-700
                      "
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-black/35" />

                    {/* DISCOUNT */}
                    {discount && (
                      <span
                        className="
                          absolute top-3 right-3
                          bg-black/40
                          backdrop-blur-md
                          text-white
                          text-[9px] sm:text-[10px]
                          px-2 py-1
                          rounded-full
                        "
                      >
                        {discount}% OFF
                      </span>
                    )}

                    {/* CONTENT */}
                    <div
                      className="
                        absolute bottom-0 left-0
                        w-full
                        p-3 sm:p-4
                        text-white
                      "
                    >
                      <p
                        className="
                          text-[9px] sm:text-[10px]
                          uppercase
                          text-white/70
                          tracking-widest
                          mb-1
                        "
                      >
                        Best Seller
                      </p>

                      <h3
                        className="
                          text-xs sm:text-sm
                          font-semibold
                          line-clamp-1
                        "
                      >
                        {product.name}
                      </h3>

                      <div
                        className="
                          flex items-center
                          justify-between
                          mt-3
                          gap-2
                        "
                      >
                        <span
                          className="
                            text-[10px] sm:text-xs
                            bg-black/40
                            px-2 py-1
                            rounded-full
                          "
                        >
                          KSh{" "}
                          {product.price?.toLocaleString()}
                        </span>

                        <button
                          className="
                            bg-white text-black
                            text-[9px] sm:text-[10px]
                            px-3 py-1
                            rounded-full
                            font-medium
                          "
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* BLOGS */}
      <Blogs />
    </div>
  );
}