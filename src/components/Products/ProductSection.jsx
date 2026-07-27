import { Link } from "react-router-dom";
import { Star, Zap } from "lucide-react";
import ProductList from "./ProductList";

const iconMap = {
  "Top Rated": <Star size={18} className="text-yellow-500 fill-yellow-500" />,
  "New Arrivals": <Zap size={18} className="text-lime-500 fill-lime-500" />,
};

function ProductSection({ title, items = [], loading }) {
  return (
    <div className="bg-white rounded-[24px] p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {iconMap[title]}
          <h3 className="font-bold text-lg text-[#111]">{title}</h3>
        </div>
        <Link
          to="/shop"
          className="text-lime-600 text-sm font-medium flex items-center gap-1 hover:text-lime-500 transition-colors"
        >
          See all →
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[60px] rounded-xl bg-black/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <ProductList items={items} />
      )}
    </div>
  );
}

export default ProductSection;
