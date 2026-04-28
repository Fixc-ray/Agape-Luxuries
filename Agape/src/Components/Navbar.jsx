import { NavLink, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import femaleLogo from "../Images/transparentfemlogo.png";
import maleLogo from "../Images/transparentmenlogo.png"; // 👈 add this

export default function Navbar() {
  const location = useLocation();

  // Center text
  const getCenterText = () => {
    if (location.pathname.startsWith("/fragrance-hero")) {
      return "Agape Men Luxuries";
    }
    if (location.pathname.startsWith("/women")) {
      return "Agape FemLuxuries";
    }
    return "Agape Luxuries";
  };

  // 🔥 Dynamic Logo
  const getLogo = () => {
    if (location.pathname.startsWith("/fragrance-hero")) {
      return maleLogo;
    }
    if (location.pathname.startsWith("/women")) {
      return femaleLogo;
    }
    return femaleLogo; // default
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4">
      
      <div className="relative flex items-center justify-between 
        bg-gradient-to-r from-[#0b0f14]/90 via-[#111827]/80 to-[#0b0f14]/90 
        backdrop-blur-xl border border-white/10 rounded-2xl 
        px-4 md:px-6 py-3 
        shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
      >

        {/* 🔥 LOGO (dynamic) */}
        <div className="flex items-center gap-2">
          <img
            src={getLogo()}
            alt="Agape Luxuries"
            className="h-8 md:h-10 w-auto object-contain transition-all duration-500"
          />
        </div>

        {/* CENTER TEXT */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
          <span className="text-sm md:text-lg font-semibold tracking-wider bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {getCenterText()}
          </span>
        </div>

        {/* NAV */}
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-full p-1">
          <NavItem to="/" label="Home" />
          <NavItem to="/fragrance-hero" label="Men" />
          <NavItem to="/women" label="Women" />
          <NavItem to="/DubaiShipping" label="Dubai Shipping" />

          <NavItem
            to="/cart"
            label={
              <span className="flex items-center gap-1">
                <ShoppingCart size={16} />
                Cart
              </span>
            }
          />
        </div>
      </div>
    </nav>
  );
}

/* NAV ITEM */
function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 md:px-4 py-2 text-xs md:text-sm rounded-full transition-all duration-300 
        ${
          isActive
            ? "bg-[#1f4d3f] text-white shadow-md"
            : "text-gray-300 hover:text-white hover:bg-white/10"
        }`
      }
    >
      {label}
    </NavLink>
  );
}