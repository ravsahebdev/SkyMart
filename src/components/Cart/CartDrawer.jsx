import { useState } from "react";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";

function CartDrawer() {
  const { items, itemCount, total, isOpen, closeCart, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  function handleCheckout() {
    if (items.length === 0) return;
    clearCart();
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      closeCart();
    }, 1800);
  }

  return (
    <>
      {/* backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0d0d0d] border-l border-white/10 z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-lime-400" />
            <h2 className="font-bold text-xl">Cart</h2>
            <span className="bg-lime-400/15 text-lime-400 text-xs font-semibold px-2.5 py-1 rounded-full">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="text-white/50 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {orderPlaced ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-2">
              <div className="w-14 h-14 rounded-full bg-lime-400 flex items-center justify-center text-black font-bold text-2xl">
                ✓
              </div>
              <p className="font-bold text-lg mt-2">Order placed!</p>
              <p className="text-white/40 text-sm">Thanks for shopping with SkyMart</p>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-white/40 gap-2">
              <ShoppingBag size={36} className="text-white/15" />
              <p className="font-medium">Your cart is empty</p>
              <p className="text-sm">Add some products to get started</p>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {/* footer */}
        {!orderPlaced && items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/50">Total</span>
              <span className="font-bold text-2xl">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 bg-lime-400 text-black font-bold py-3.5 rounded-xl hover:bg-lime-300 transition-colors"
            >
              Checkout <span>→</span>
            </button>

            <button
              onClick={clearCart}
              className="w-full text-center text-white/30 text-sm mt-4 hover:text-white/60 transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
