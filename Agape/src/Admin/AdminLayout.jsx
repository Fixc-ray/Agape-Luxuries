import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
} from "lucide-react";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#f6f6f6]">

      {/* SIDEBAR */}
      <div className="w-64 bg-white p-6 border-r border-gray-200 flex flex-col">

        {/* LOGO */}
        <h2 className="text-xl font-semibold mb-10 text-gray-800">
          Agape
        </h2>

        {/* NAV */}
        <nav className="space-y-2">
          <NavItem
            to="/admin"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />

          <NavItem
            to="/admin/products"
            icon={<Package size={18} />}
            label="Products"
          />

          <NavItem
            to="/admin/orders"
            icon={<ShoppingCart size={18} />}
            label="Orders"
          />
        </nav>

        {/* OPTIONAL FOOTER */}
        <div className="mt-auto text-xs text-gray-400 pt-10">
          © Agape Luxuries
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 md:p-10">
        <Outlet />
      </div>
    </div>
  );
}

/* 🔥 NAV ITEM */
function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
          isActive
            ? "bg-orange-100 text-orange-600"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}