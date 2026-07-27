import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Minus, Plus, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useProduct } from "../hooks/useProduct";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  function handleAddToCart() {
    if (!product) return;
    for (let i = 0; i < qty; i++) addToCart(product);
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />

      <div className="px-6 lg:px-10 py-8 max-w-[1100px] mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={15} /> Back
        </button>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-10">
            <div className="aspect-square rounded-3xl bg-white/5 animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-white/5 rounded-lg animate-pulse" />
              <div className="h-4 w-1/3 bg-white/5 rounded-lg animate-pulse" />
              <div className="h-24 w-full bg-white/5 rounded-lg animate-pulse" />
            </div>
          </div>
        ) : error || !product ? (
          <div className="text-center py-20 text-white/40">
            <p className="text-lg font-medium">Product not found</p>
            <p className="text-sm mt-1 mb-6">
              {error || "This product doesn't exist or couldn't be loaded."}
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-lime-400 text-black font-bold px-5 py-2.5 rounded-xl hover:bg-lime-300 transition-colors"
            >
              Back to Shop →
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {/* image */}
            <div className="bg-white rounded-3xl aspect-square flex items-center justify-center p-10">
              <img src={product.image} alt={product.title} className="max-h-full object-contain" />
            </div>

            {/* details */}
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest capitalize mb-2">
                {product.category}
              </p>
              <h1 className="font-bold text-2xl lg:text-3xl leading-snug mb-3">
                {product.title}
              </h1>

              <div className="flex items-center gap-1.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={
                      i < Math.round(product.rating?.rate || 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-white/15"
                    }
                  />
                ))}
                <span className="text-white/40 text-sm ml-1">
                  {product.rating?.rate} ({product.rating?.count} reviews)
                </span>
              </div>

              <p className="text-lime-400 font-bold text-3xl mb-5">
                ${product.price.toFixed(2)}
              </p>

              <p className="text-white/50 text-sm leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 border border-white/15 rounded-xl px-3 py-2.5">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="font-semibold w-5 text-center">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-lime-400 text-black font-bold py-3 rounded-xl hover:bg-lime-300 transition-colors"
                >
                  <ShoppingCart size={17} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetail;
