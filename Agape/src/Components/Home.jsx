import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">

      {/* MEN */}
      <Link
        to="/fragrance-hero"
        className="relative group flex items-center justify-center"
      >
        {/* BACKGROUND IMAGE */}
        <img
          src="https://i.pinimg.com/1200x/e4/f7/7d/e4f77d90975622da1d52859dfbd08862.jpg" // put image in public/images
          alt="Men Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300" />

        {/* TEXT */}
        <div className="relative text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
            AGAPE
          </h1>
          <p className="text-lg md:text-xl mt-2 tracking-widest">
            MEN'S LUXURIES
          </p>
          <span className="inline-block mt-4 text-sm border-b border-white pb-1">
            Explore Collection →
          </span>
        </div>
      </Link>

      {/* WOMEN */}
      <Link
        to="/women"
        className="relative group flex items-center justify-center"
      >
        {/* BACKGROUND IMAGE */}
        <img
          src="https://i.pinimg.com/736x/4a/e8/48/4ae848cb3e62031e03842b43ce3b309c.jpg"
          alt="Women Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300" />

        {/* TEXT */}
        <div className="relative text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
            AGAPE
          </h1>
          <p className="text-lg md:text-xl mt-2 tracking-widest">
            WOMEN'S LUXURIES
          </p>
          <span className="inline-block mt-4 text-sm border-b border-white pb-1">
            Discover Elegance →
          </span>
        </div>
      </Link>

    </div>
  );
}