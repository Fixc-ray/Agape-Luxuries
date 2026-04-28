import { useEffect, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    type: "perfume",
    title: "Evoke Every \nEmotion with \nFragsence",
    desc: "Bold masculine fragrances crafted for presence and confidence.",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200",
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
  const navigate = useNavigate();

  // Auto switch backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <div className="min-h-screen bg-[#0b0f14]">

      {/* Container */}
      <div className="w-full min-h-screen overflow-hidden flex flex-col justify-between">

        {/* Hero Section */}
        <div
          className="grid md:grid-cols-2 gap-6 px-8 md:px-16 py-16 text-white flex-grow bg-cover bg-center relative transition-all duration-1000"
          style={{ backgroundImage: `url(${current.image})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#0b0f14]/80"></div>

          {/* Left */}
          <div className="relative z-10 flex flex-col justify-center">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight whitespace-pre-line">
              {current.title}
            </h1>

            <p className="mt-6 text-sm text-gray-300 max-w-md">
              {current.desc}
            </p>

            {/* Socials */}
<div className="flex gap-4 mt-6 items-center">
  
  <a href="#" className="p-2 border border-gray-500 rounded-full hover:border-white transition">
    <img src="/Images/Facebook.png" alt="Facebook" className="w-4 h-4" />
  </a>

  <a href="#" className="p-2 border border-gray-500 rounded-full hover:border-white transition">
    <img src="/Images/tiktok.png" alt="TikTok" className="w-4 h-4" />
  </a>

  <a href="#" className="p-2 border border-gray-500 rounded-full hover:border-white transition">
    <img src="/Images/ig.png" alt="Instagram" className="w-4 h-4" />
  </a>

</div>
          </div>

          {/* Right */}
          <div className="relative z-10 flex flex-col justify-center">
            <div className="text-right">
              <p className="text-xl font-semibold">$203</p>
              <p className="text-sm text-gray-400">Gold Memoir</p>
            </div>

            <p className="mt-6 text-sm text-gray-400 max-w-sm ml-auto text-right">
              Elevate your everyday moments with bold masculine fragrances
              crafted for presence, confidence, and distinction.
            </p>

            <div className="flex justify-end items-center gap-4 mt-6">
              {current.type === "jewelry" ? (
                <button className="bg-gray-500 text-white px-5 py-2 rounded-md font-medium cursor-not-allowed">
                  Coming Soon
                </button>
              ) : (
                <button
                onClick={() => navigate("/products")}
                className="bg-white text-black px-5 py-2 rounded-md font-medium hover:bg-gray-200 transition"
                >
                    Shop Now
                </button>
              )}

              <span className="text-sm text-gray-400 hover:text-white cursor-pointer">
                Best of Fragsence →
              </span>
            </div>

            {/* Floating Images ONLY for perfume */}
            {current.type === "perfume" && (
              <>
                <img
                  src="/perfume1.png"
                  className="absolute top-0 left-20 w-48 rotate-[-15deg]"
                />
                <img
                  src="/perfume2.png"
                  className="absolute bottom-0 right-20 w-52 rotate-[15deg]"
                />
              </>
            )}
          </div>
        </div>

        {/* Auto Scrolling Products */}
        <div className="overflow-hidden bg-[#0b0f14]">
          <div className="flex animate-scroll min-w-max">

            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex">

                <div className="w-[260px] bg-[#111827] p-6 text-gray-300">
                  <p className="text-white font-semibold">BEST SELLER</p>
                </div>

                <div className="w-[260px] bg-[#1f2937] p-6">
                  <img src="/p1.png" className="w-12 mb-3" />
                  <p className="text-white">$119</p>
                </div>

                <div className="w-[260px] bg-[#273344] p-6">
                  <img src="/p2.png" className="w-12 mb-3" />
                  <p className="text-white">$169</p>
                </div>

                <div className="w-[260px] bg-[#2f3e52] p-6">
                  <img src="/p3.png" className="w-12 mb-3" />
                  <p className="text-white">$250</p>
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}