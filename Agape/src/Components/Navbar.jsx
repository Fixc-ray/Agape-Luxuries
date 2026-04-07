// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import logo from "../Images/transparentfemlogo.png"; // ✅ import properly

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-8 py-4">

      {/* LOGO (VISIBLE ON ALL DEVICES) */}
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="Agape Luxuries"
          className="h-8 md:h-10 w-auto object-contain"
        />
      </div>

      {/* NAV CONTAINER */}
      <div className="bg-white/10 backdrop-blur-md rounded-full p-1 shadow-lg flex gap-1">

        <NavItem to="/" label="Home" />
        <NavItem to="/men" label="Men" />
        <NavItem to="/women" label="Women" />
        <NavItem to="/about" label="About" />

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
            ? "bg-white text-black font-semibold shadow"
            : "text-white hover:bg-white/20"
        }`
      }
    >
      {label}
    </NavLink>
  );
}