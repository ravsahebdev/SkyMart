import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Zap, ShoppingCart, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const links = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
];

function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount, openCart } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="relative border-b border-white/8">
      <nav className="flex items-center justify-between px-6 lg:px-10 py-5">
        <NavLink to="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <div className="w-9 h-9 bg-lime-400 rounded-xl flex items-center justify-center">
            <Zap size={16} className="text-black fill-black" />
          </div>
          <span className="font-semibold text-xl">
            Sky<span className="text-lime-400">Mart</span>
          </span>
        </NavLink>

        {/* desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "text-lime-400" : "text-white/50 hover:text-white transition-colors"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* desktop-only user badge */}
          <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/8 rounded-full pl-1 pr-3 py-1">
            <div className="w-7 h-7 bg-lime-400 rounded-full flex items-center justify-center text-black font-semibold text-xs">
              {user?.name?.[0]?.toUpperCase() || "?"}
            </div>
            <span className="text-sm font-medium max-w-[110px] truncate">
              {user?.name || "Guest"}
            </span>
          </div>

          <button
            onClick={openCart}
            className="relative w-10 h-10 rounded-xl border border-white/8 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ShoppingCart size={17} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] px-1 h-[18px] rounded-full bg-lime-400 text-black text-[10px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          {/* logout - desktop only, mobile me hamburger ke andar hai */}
          <button
            onClick={handleLogout}
            className="hidden md:flex w-10 h-10 rounded-xl border border-white/8 bg-white/5 items-center justify-center hover:bg-white/10 transition-colors text-white/60"
          >
            <LogOut size={16} />
          </button>

          {/* mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden w-10 h-10 rounded-xl border border-white/8 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/8 bg-[#0d0d0d] px-6 py-4 flex flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-3 text-[15px] font-medium border-b border-white/5 ${
                  isActive ? "text-lime-400" : "text-white/60"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="flex items-center gap-2 py-3">
            <div className="w-7 h-7 bg-lime-400 rounded-full flex items-center justify-center text-black font-semibold text-xs">
              {user?.name?.[0]?.toUpperCase() || "?"}
            </div>
            <span className="text-sm font-medium text-white/70">
              {user?.name || "Guest"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400/80 py-2 text-sm font-medium"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
