import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart } from "lucide-react";

export default function AdminLayout() {
  const link =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-[#2a2440] transition";

  return (
    <div className="flex min-h-screen bg-[#0f0c1a] text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#1a1625] p-5 border-r border-[#2a2440]">

        <h2 className="text-lg font-semibold mb-8">Agape</h2>

        <nav className="space-y-2">
          <NavLink to="/admin" className={link}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink to="/admin/products" className={link}>
            <Package size={18} /> Products
          </NavLink>

          <NavLink to="/admin/orders" className={link}>
            <ShoppingCart size={18} /> Orders
          </NavLink>
        </nav>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}