import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="flex items-center gap-3 border border-black/8 rounded-xl p-2.5">
      <button
        onClick={() => navigate(`/product/${product.id}`)}
        className="w-11 h-11 rounded-lg bg-white flex items-center justify-center flex-shrink-0 overflow-hidden"
      >
        <img src={product.image} alt={product.title} className="w-full h-full object-contain p-1" />
      </button>

      <button
        onClick={() => navigate(`/product/${product.id}`)}
        className="flex-1 text-left"
      >
        <p className="text-lime-600 font-semibold">${product.price.toFixed(2)}</p>
      </button>

      <button
        onClick={() => addToCart(product)}
        className="w-8 h-8 rounded-lg bg-lime-400/15 flex items-center justify-center text-lime-600 hover:bg-lime-400/25 transition-colors"
      >
        <ShoppingCart size={14} />
      </button>
    </div>
  );
}

export default ProductCard;
