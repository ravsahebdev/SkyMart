import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useCart } from "../context/CartContext";
import {
  selectWishlistIds,
  removeFromWishlist,
  clearWishlist,
} from "../store/wishlistSlice";
import { useProductsByIds } from "../queries/productQueries";

// ids Redux se, product data TanStack Query cache se (Explore me jo load ho chuka wo dobara call nahi hota)
function Wishlist() {
  const dispatch = useDispatch();
  const ids = useSelector(selectWishlistIds);
  const { addToCart } = useCart();
  const results = useProductsByIds(ids);

  const products = results.map((r) => r.data).filter(Boolean);
  const loading = results.some((r) => r.isLoading);
  const failedCount = results.filter((r) => r.isError).length;

  function addAllToCart() {
    products.forEach((p) => addToCart(p));
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] pb-24">
      <Navbar />

      <div className="px-6 lg:px-10 py-8 max-w-4xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
          <h1 className="text-3xl font-bold">
            My <span className="text-lime-400">Wishlist</span>
          </h1>

          {ids.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={addAllToCart}
                disabled={products.length === 0}
                className="flex items-center gap-1.5 bg-lime-400 text-black text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-lime-300 transition-colors disabled:opacity-40"
              >
                <ShoppingCart size={15} /> Add all to cart
              </button>
              <button
                onClick={() => dispatch(clearWishlist())}
                className="text-sm text-white/40 hover:text-red-400 px-3 transition-colors"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {ids.length === 0 ? (
          <div className="text-center py-24 text-white/40">
            <Heart size={40} className="mx-auto text-white/15" />
            <p className="text-lg font-medium mt-4">Your wishlist is empty</p>
            <p className="text-sm mt-1">Tap the heart on any product to save it here</p>
            <Link
              to="/explore"
              className="inline-block mt-6 bg-lime-400 text-black font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-lime-300 transition-colors"
            >
              Explore products
            </Link>
          </div>
        ) : loading ? (
          <div className="space-y-3">
            {ids.map((id) => (
              <div key={id} className="h-28 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 bg-[#111111] border border-white/8 rounded-2xl p-3"
              >
                <Link
                  to={`/product/${product.id}`}
                  className="w-24 h-24 shrink-0 bg-white rounded-xl flex items-center justify-center"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-3"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <p className="text-white/30 text-xs capitalize">{product.category}</p>
                  <Link
                    to={`/product/${product.id}`}
                    className="font-semibold text-sm leading-snug line-clamp-2 hover:text-lime-400 transition-colors"
                  >
                    {product.title}
                  </Link>
                  <p className="text-lime-400 font-bold mt-1">${product.price.toFixed(2)}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center justify-center gap-1 bg-lime-400 text-black text-xs font-bold px-3 py-2 rounded-lg hover:bg-lime-300 transition-colors"
                  >
                    <ShoppingCart size={13} /> Add
                  </button>
                  <button
                    onClick={() => dispatch(removeFromWishlist(product.id))}
                    aria-label="Remove from wishlist"
                    className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-white/50 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}

            {failedCount > 0 && (
              <p className="text-sm text-white/40 text-center pt-2">
                {failedCount} item(s) couldn't be loaded. Check your connection and refresh.
              </p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Wishlist;
