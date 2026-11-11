import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Compass, Heart, Package, CreditCard } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { selectWishlistIds } from "../../store/wishlistSlice";
import { selectOrders } from "../../store/ordersSlice";

// Navbar ko touch kiye bina naye pages tak pahunchne ka floating dock
function QuickDock() {
  const { user } = useAuth();
  const { itemCount } = useCart();
  const wishlistCount = useSelector(selectWishlistIds).length;
  const orderCount = useSelector(selectOrders).length;

  // login/register pages par dock nahi dikhana
  if (!user) return null;

  const items = [
    { to: "/explore", label: "Explore", icon: Compass, count: 0 },
    { to: "/wishlist", label: "Wishlist", icon: Heart, count: wishlistCount },
    { to: "/orders", label: "Orders", icon: Package, count: orderCount },
  ];
  if (itemCount > 0) {
    items.push({ to: "/checkout", label: "Checkout", icon: CreditCard, count: itemCount });
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 max-w-[95vw]">
      <div className="flex items-center gap-1 bg-[#161616]/95 backdrop-blur border border-white/10 rounded-full p-1.5 shadow-2xl shadow-black/60">
        {items.map(({ to, label, icon: Icon, count }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? "bg-lime-400 text-black"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`
            }
          >
            <Icon size={15} />
            <span className="hidden min-[420px]:inline">{label}</span>
            {count > 0 && (
              <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-black/80 text-lime-400 text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default QuickDock;
