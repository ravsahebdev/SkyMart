import { useNavigate } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const rating = Math.round(product.rating?.rate || 0);

  return (
    <div className="bg-[#111111] border border-white/8 rounded-2xl overflow-hidden hover:-translate-y-0.5 hover:border-white/15 transition-all">
      <button
        onClick={() => navigate(`/product/${product.id}`)}
        className="relative w-full aspect-square flex items-center justify-center bg-white"
      >
        <span className="absolute top-2 left-2 bg-black/70 text-white/80 text-[10px] font-medium px-2 py-1 rounded-md capitalize">
          {product.category}
        </span>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-6"
        />
      </button>

      <div className="p-4">
        <p className="text-white/30 text-xs capitalize">{product.category}</p>
        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="text-left w-full"
        >
          <p className="font-semibold text-[15px] leading-snug mt-0.5 line-clamp-2 min-h-[2.5em] hover:text-lime-400 transition-colors">
            {product.title}
          </p>
        </button>

        <div className="flex items-center gap-1 mt-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              className={
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-white/15"
              }
            />
          ))}
          <span className="text-white/30 text-xs ml-1">
            ({product.rating?.count || 0})
          </span>
        </div>
        <hr className="border-t border-white/50 my-2.5" />
        <div className="flex items-center justify-between mt-3">
          <p className="text-lime-400 font-semibold min-[500px]:font-bold text-sm sm:text-base">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1 bg-lime-400 text-black text-xs font-bold px-2 min-[500px]:px-3  py-2 rounded-lg hover:bg-lime-300 transition-colors "
          >
            <ShoppingCart size={13} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
