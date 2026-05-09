import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";

import femaleLogo from "../Images/transparentfemlogo.png";
import maleLogo from "../Images/transparentmenlogo.png";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const getCenterText = () => {
    if (location.pathname.startsWith("/fragrance-hero")) {
      return "Agape Men Luxuries";
    }
    if (location.pathname.startsWith("/women")) {
      return "Agape FemLuxuries";
    }
    return "Agape Luxuries";
  };

  const getLogo = () => {
    if (location.pathname.startsWith("/fragrance-hero")) return maleLogo;
    if (location.pathname.startsWith("/women")) return femaleLogo;
    return femaleLogo;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-2 sm:px-4 md:px-8 py-2 sm:py-3">
      <div className="relative flex items-center justify-between backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl px-3 sm:px-5 py-2 sm:py-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">

        {/* LOGO */}
        <div className="flex items-center z-50 shrink-0">
          <img
            src={getLogo()}
            alt="Agape Luxuries"
            className="h-7 sm:h-8 md:h-10 w-auto object-contain"
          />
        </div>

        {/* CENTER TEXT */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none max-w-[60%] sm:max-w-[50%]">
          <span className="block text-center text-[10px] sm:text-xs md:text-base font-semibold tracking-wide bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent whitespace-nowrap overflow-hidden text-ellipsis">
            {getCenterText()}
          </span>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
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

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white z-50 p-1"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* MOBILE MENU */}
        <div
          className={`absolute top-[70px] left-0 w-full transition-all duration-300 md:hidden ${
            menuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-3"
          }`}
        >
          <div className="mx-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-2 shadow-2xl">

            <MobileNavItem to="/" label="Home" setMenuOpen={setMenuOpen} />
            <MobileNavItem to="/fragrance-hero" label="Men" setMenuOpen={setMenuOpen} />
            <MobileNavItem to="/women" label="Women" setMenuOpen={setMenuOpen} />
            <MobileNavItem to="/DubaiShipping" label="Dubai Shipping" setMenuOpen={setMenuOpen} />
            <MobileNavItem
              to="/cart"
              label={
                <span className="flex items-center gap-2">
                  <ShoppingCart size={16} />
                  Cart
                </span>
              }
              setMenuOpen={setMenuOpen}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

/* DESKTOP NAV ITEM */
function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 md:px-4 py-2 text-xs md:text-sm rounded-full transition-all duration-300 ${
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

/* MOBILE NAV ITEM */
function MobileNavItem({ to, label, setMenuOpen }) {
  return (
    <NavLink
      to={to}
      onClick={() => setMenuOpen(false)}
      className={({ isActive }) =>
        `w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
          isActive
            ? "bg-[#1f4d3f] text-white"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      {label}
    </NavLink>
  );
}