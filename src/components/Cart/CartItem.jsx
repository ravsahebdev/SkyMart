import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

function CartItem({ item }) {
  const { incQty, decQty, removeFromCart } = useCart();

  return (
    <div className="border border-white/10 rounded-2xl p-4 flex gap-4">
      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm leading-snug line-clamp-2">{item.title}</p>
        <p className="text-lime-400 font-bold text-lg mt-1">
          ${(item.price * item.qty).toFixed(2)}
        </p>
        <p className="text-white/30 text-xs">${item.price.toFixed(2)} each</p>

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => decQty(item.id)}
            className="w-7 h-7 rounded-lg border border-white/15 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Minus size={13} />
          </button>
          <span className="font-semibold text-sm w-4 text-center">{item.qty}</span>
          <button
            onClick={() => incQty(item.id)}
            className="w-7 h-7 rounded-lg border border-white/15 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Plus size={13} />
          </button>

          <button
            onClick={() => removeFromCart(item.id)}
            className="ml-auto text-red-400/70 hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
