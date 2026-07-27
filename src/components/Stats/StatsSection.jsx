import { Package, TrendingUp, Star, Tag } from "lucide-react";
import StatCard from "./StatCard";
import { statsMeta } from "../../data/stats";
import { useCart } from "../../context/CartContext";

// key -> icon mapping, kyunki icon component ko data/stats.js (plain JS) me nahi rakh sakte
const iconMap = {
  cartItems: Package,
  cartValue: TrendingUp,
  topProducts: Star,
  categories: Tag,
};

function StatsSection({ topProductsCount = 5, categoriesCount = 6 }) {
  const { itemCount, total } = useCart();

  const values = {
    cartItems: itemCount,
    cartValue: `$${total.toFixed(2)}`,
    topProducts: topProductsCount,
    categories: categoriesCount,
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {statsMeta.map((stat) => (
        <StatCard
          key={stat.key}
          icon={iconMap[stat.key]}
          iconBg={stat.iconBg}
          value={values[stat.key]}
          label={stat.label}
          sub={stat.sub}
        />
      ))}
    </div>
  );
}

export default StatsSection;
