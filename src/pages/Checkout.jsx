import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, ShoppingBag } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { checkout } from "../store/thunks";
import {
  resetOrderStatus,
  selectOrderStatus,
} from "../store/ordersSlice";

const inputClass =
  "w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-400/50 placeholder:text-white/25";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const status = useSelector(selectOrderStatus);

  const [form, setForm] = useState({
    fullName: user?.name || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [placed, setPlaced] = useState(false);

  // page chhodte waqt purana failed/succeeded status saaf
  useEffect(() => {
    return () => dispatch(resetOrderStatus());
  }, [dispatch]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Name is required";
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = "Enter a 10 digit phone number";
    if (form.address.trim().length < 5) e.address = "Enter your full address";
    if (!form.city.trim()) e.city = "City is required";
    if (!/^\d{6}$/.test(form.pincode.trim())) e.pincode = "Enter a 6 digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError("");

    try {
      // classic thunk -> placeOrder (createAsyncThunk, REST POST) -> success par cart clear
      const order = await dispatch(
        checkout(
          {
            userId: 1, // Fake Store API ko ek valid numeric userId chahiye
            items,
            total,
            customer: { ...form, email: user?.email },
          },
          { onSuccess: clearCart }
        )
      );
      if (order) {
        setPlaced(true);
        navigate("/orders", { state: { justPlaced: order.orderId } });
      }
    } catch (err) {
      setSubmitError(err?.message || "Order failed. Please try again.");
    }
  }

  if (!placed && items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] pb-24">
        <Navbar />
        <div className="text-center py-28 text-white/40 px-6">
          <ShoppingBag size={40} className="mx-auto text-white/15" />
          <p className="text-lg font-medium mt-4">Your cart is empty</p>
          <p className="text-sm mt-1">Add some products before checking out</p>
          <Link
            to="/explore"
            className="inline-block mt-6 bg-lime-400 text-black font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-lime-300 transition-colors"
          >
            Explore products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <div className="min-h-screen bg-[#0d0d0d] pb-24">
      <Navbar />

      <div className="px-6 lg:px-10 py-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          <span className="text-lime-400">Checkout</span>
        </h1>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* shipping form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4" noValidate>
            <h2 className="font-semibold text-lg">Shipping details</h2>

            <div>
              <input
                className={inputClass}
                placeholder="Full name"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
              {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <input
                className={inputClass}
                placeholder="Phone (10 digits)"
                inputMode="numeric"
                maxLength={10}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))}
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <textarea
                className={`${inputClass} resize-none`}
                rows={3}
                placeholder="Address"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
              />
              {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  className={inputClass}
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                />
                {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <input
                  className={inputClass}
                  placeholder="Pincode"
                  inputMode="numeric"
                  maxLength={6}
                  value={form.pincode}
                  onChange={(e) => update("pincode", e.target.value.replace(/\D/g, ""))}
                />
                {errors.pincode && <p className="text-red-400 text-xs mt-1">{errors.pincode}</p>}
              </div>
            </div>

            {submitError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl px-4 py-3">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-lime-400 text-black font-bold py-3.5 rounded-xl hover:bg-lime-300 transition-colors disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" /> Placing order...
                </>
              ) : (
                <>Place order · ${total.toFixed(2)}</>
              )}
            </button>
          </form>

          {/* order summary (cart context se) */}
          <div className="lg:col-span-2">
            <div className="bg-[#111111] border border-white/8 rounded-2xl p-5 lg:sticky lg:top-6">
              <h2 className="font-semibold text-lg mb-4">Order summary</h2>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 shrink-0 bg-white rounded-lg flex items-center justify-center">
                      <img src={item.image} alt="" className="w-full h-full object-contain p-1.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm line-clamp-1">{item.title}</p>
                      <p className="text-white/40 text-xs">Qty {item.qty}</p>
                    </div>
                    <p className="text-sm font-semibold">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-white/10 mt-4 pt-4">
                <span className="text-white/50">Total</span>
                <span className="font-bold text-2xl text-lime-400">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Checkout;
