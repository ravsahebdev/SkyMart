import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { toggleWishlist, selectIsWishlisted } from "../../store/wishlistSlice";
import { usePrefetchProduct } from "../../queries/productQueries";

function ExploreCard({ product, onQuickView }) {
  const dispatch = useDispatch();
  const { addToCart } = useCart();
  const wishlisted = useSelector(selectIsWishlisted(product.id));
  const prefetchProduct = usePrefetchProduct();
  const rating = Math.round(product.rating?.rate || 0);

  return (
    <div
      onMouseEnter={() => prefetchProduct(product.id)}
      className="group bg-[#111111] border border-white/8 rounded-2xl overflow-hidden hover:-translate-y-0.5 hover:border-white/15 transition-all"
    >
      <div className="relative aspect-square bg-white flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-6"
        />

        <button
          onClick={() => dispatch(toggleWishlist(product.id))}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 right-2 w-9 h-9 rounded-full bg-black/70 flex items-center justify-center hover:bg-black transition-colors"
        >
          <Heart
            size={16}
            className={wishlisted ? "text-red-500 fill-red-500" : "text-white/80"}
          />
        </button>

        <button
          onClick={() => onQuickView(product.id)}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/80 text-white text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye size={13} /> Quick view
        </button>
      </div>

      <div className="p-4">
        <p className="text-white/30 text-xs capitalize">{product.category}</p>
        <p className="font-semibold text-[15px] leading-snug mt-0.5 line-clamp-2 min-h-[2.5em]">
          {product.title}
        </p>

        <div className="flex items-center gap-1 mt-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-white/15"}
            />
          ))}
          <span className="text-white/30 text-xs ml-1">({product.rating?.count || 0})</span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
          <p className="text-lime-400 font-bold">${product.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1 bg-lime-400 text-black text-xs font-bold px-3 py-2 rounded-lg hover:bg-lime-300 transition-colors"
          >
            <ShoppingCart size={13} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExploreCard;
