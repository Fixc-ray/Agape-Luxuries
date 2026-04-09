import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css"; 

export default function Home() {

  const slides = [
    {
      image: "https://i.pinimg.com/736x/b7/48/b0/b748b038465b21f463f3bbf6e77eed76.jpg",
      title: "LUXURY PERFUME",
      text: "Discover the essence of sophistication with our exclusive fragrances."
    },
    {
      image: "https://i.pinimg.com/1200x/1c/de/28/1cde280f25617f8dab010f5cd91a32e8.jpg",
      title: "TIMELESS ELEGANCE",
      text: "Crafted scents that define presence and power."
    },
    {
      image: "https://i.pinimg.com/1200x/d1/51/73/d15173893724ff325ebd65a737cb53ef.jpg",
      title: "SIGNATURE SCENTS",
      text: "Leave a lasting impression wherever you go."
    },
    {
      image: "https://i.pinimg.com/1200x/b7/61/ff/b761ff8ba08a348e42a509c3301fc1bd.jpg",
      title: "REFINED LUXURY",
      text: "A statement of class, elegance, and individuality."
    }
  ];

  const [current, setCurrent] = useState(0);

  // AUTO ROTATE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const nextIndex = (current + 1) % slides.length;

  return (
    <div className="w-full min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="relative min-h-screen flex items-end px-6 md:px-16 pb-10 md:pb-16">

  {/* BACKGROUND IMAGE */}
<div className="absolute inset-0 overflow-hidden">

  <img
    key={current}
    src={slides[current].image}
    className="w-full h-full object-cover zoom-out will-change-transform"
    alt=""
  />

</div>

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-black/10" />

  {/* CONTENT WRAPPER (BOTTOM ALIGNED) */}
  <div className="relative z-10 w-full flex flex-col md:flex-row items-end justify-between gap-6">

    {/* LEFT TEXT */}
    <div className="max-w-xl mb-20">
      <h1 className="text-3xl md:text-5xl mb-4 font-serif leading-tight">
        {slides[current].title}
      </h1>

      <p className="mt-3 text-gray-300 text-sm md:text-base max-w-md">
        {slides[current].text}
      </p>

      <Link
        to="/men"
        className="inline-block mt-5 px-5 py-2 bg-yellow-600 text-black text-sm font-semibold transition bg-white/10 backdrop-blur-md rounded-full p-1 shadow-lg flex gap-1"
      >
        SHOP NOW
      </Link>
    </div>

    {/* RIGHT PREVIEW IMAGE (SMALLER + CLEANER) */}
    <div className="hidden md:flex flex-col items-end">

      <img
        src={slides[nextIndex].image}
        className="w-28 h-36 object-cover rounded-md opacity-80 border border-gray-700"
        alt="Next"
      />

    </div>

  </div>
</section>

      {/* COLLECTION SECTION */}
      <section className="px-6 md:px-16 py-16">
        <h2 className="text-center text-2xl md:text-3xl font-serif mb-10">
          Our Collection
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {["ELEGANCE", "VELOUR", "DIVINE"].map((item, i) => (
            <div key={i} className="group text-center">
              <div className="border border-gray-700 p-4 rounded-xl overflow-hidden">
                <img
                  src={slides[i].image}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <p className="mt-3 text-sm tracking-widest">{item}</p>
            </div>
          ))}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-gray-800 px-6 md:px-16 py-10 text-center">
        <h2 className="font-serif text-xl">AGAPE LUXURIES</h2>
        <p className="text-gray-500 text-sm mt-2">
          Crafted for elegance. Designed for presence.
        </p>
        <p className="text-gray-600 text-xs mt-4">
          © {new Date().getFullYear()} Agape Luxuries
        </p>
      </footer>

    </div>
  );
}