import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// din ke hisab se greeting - simple logic
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function Hero() {
  const { user } = useAuth();
  const displayName = user?.name || "there";

  return (
    <div
      className="relative rounded-[28px] border border-white/80 p-8 lg:p-12 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="max-w-xl">
          <p className="text-lime-400 text-xs font-semibold tracking-widest uppercase mb-4">
            {getGreeting()} 👋
          </p>
          <h1 className="font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 break-words">
            Welcome back,
            <br />
            <span className="text-lime-400">{displayName}!</span>
          </h1>
          <p className="text-white/40 text-sm lg:text-base leading-relaxed mb-8 max-w-md">
            Discover today's picks — hand-curated products across
            electronics, fashion, and more.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              to="/shop"
              className="flex items-center justify-center gap-2 bg-lime-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-lime-300 transition-colors whitespace-nowrap"
            >
              Shop Now <span>→</span>
            </Link>
            <Link
              to="/shop"
              className="flex items-center justify-center border border-white/15 px-6 py-3 rounded-xl font-medium hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              View All Products
            </Link>
          </div>
        </div>

        <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-auto">
          <div className="flex-1 lg:flex-none bg-lime-400/10 border border-lime-400/20 rounded-2xl px-8 py-5 text-center">
            <p className="text-lime-400 font-bold text-2xl">20+</p>
            <p className="text-white/50 text-xs mt-1">Products Available</p>
          </div>
          <div className="flex-1 lg:flex-none border border-white/70 rounded-2xl px-8 py-5 text-center">
            <p className="font-bold text-2xl">Free</p>
            <p className="text-white/50 text-xs mt-1">Delivery on ₹999+</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
