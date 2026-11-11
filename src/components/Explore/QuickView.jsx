import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { X, Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { toggleWishlist, selectIsWishlisted } from "../../store/wishlistSlice";
import { useProductQuery } from "../../queries/productQueries";

// card par hover karte hi prefetch ho chuka hota hai, isliye ye aksar instantly khulta hai
function QuickView({ productId, onClose }) {
  const dispatch = useDispatch();
  const { addToCart } = useCart();
  const { data: product, isLoading, isError, refetch } = useProductQuery(productId);
  const wishlisted = useSelector(selectIsWishlisted(productId));

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/70" />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d0d0d] border border-white/10 rounded-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <X size={18} />
        </button>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="aspect-square rounded-xl bg-white/5 animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 w-24 rounded bg-white/5 animate-pulse" />
              <div className="h-6 w-full rounded bg-white/5 animate-pulse" />
              <div className="h-24 w-full rounded bg-white/5 animate-pulse" />
            </div>
          </div>
        ) : isError ? (
          <div className="p-10 text-center text-white/50">
            <p className="font-medium">Couldn't load this product</p>
            <button
              onClick={() => refetch()}
              className="mt-4 bg-lime-400 text-black text-sm font-bold px-4 py-2 rounded-lg"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="bg-white rounded-xl aspect-square flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-8"
              />
            </div>

            <div className="flex flex-col">
              <p className="text-white/40 text-xs capitalize">{product.category}</p>
              <h2 className="font-bold text-xl mt-1 pr-8">{product.title}</h2>

              <div className="flex items-center gap-1.5 mt-2 text-sm text-white/60">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                {product.rating?.rate} ({product.rating?.count} reviews)
              </div>

              <p className="text-white/50 text-sm leading-relaxed mt-4 line-clamp-6">
                {product.description}
              </p>

              <p className="text-lime-400 font-bold text-2xl mt-auto pt-5">
                ${product.price.toFixed(2)}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 flex items-center justify-center gap-2 bg-lime-400 text-black font-bold py-3 rounded-xl hover:bg-lime-300 transition-colors"
                >
                  <ShoppingCart size={16} /> Add to cart
                </button>
                <button
                  onClick={() => dispatch(toggleWishlist(product.id))}
                  aria-label="Toggle wishlist"
                  className="w-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Heart
                    size={18}
                    className={wishlisted ? "text-red-500 fill-red-500" : "text-white/70"}
                  />
                </button>
              </div>

              <Link
                to={`/product/${product.id}`}
                className="text-center text-sm text-white/40 hover:text-lime-400 mt-4 transition-colors"
              >
                View full details →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuickView;
