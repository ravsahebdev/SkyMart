import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  function handleLogin(e) {
    e.preventDefault();
    const result = login({ email, password: pass });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/");
  }

  const statsData = [
    { value: "20K+", label: "Products" },
    { value: "50K+", label: "Users" },
    { value: "4.9★", label: "Rating" },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex">
      {/* ================= LEFT - chhoti screen pe hidden ================= */}
      <div className="hidden lg:flex flex-col w-1/2 bg-[#111111] border-r border-white/8 p-12 relative overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-lime-400 rounded-2xl flex items-center justify-center">
            <Zap size={18} className="text-black fill-black" />
          </div>
          <span className="font-semibold text-[22px]">
            Sky<span className="text-lime-400">Mart</span>
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center relative z-10">
          <p className="text-lime-400 text-sm font-medium mb-4 tracking-widest uppercase">
            Welcome back
          </p>

          <h1 className="font-semibold text-5xl leading-tight mb-6">
            Shop the future.
            <br />
            <span className="text-lime-400">Today.</span>
          </h1>

          <p className="text-white/40 text-sm max-w-sm leading-relaxed">
            Thousands of products, lightning-fast delivery, and prices that make
            your wallet happy.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-12">
            {statsData.map((item) => (
              <div
                key={item.label}
                className="bg-white/2 border border-gray-300 rounded-2xl p-4 text-center"
              >
                <p className="font-bold text-xl text-lime-400">{item.value}</p>
                <p className="text-white/40 text-xs mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-9 h-9 bg-lime-400 rounded-xl flex items-center justify-center">
              <Zap size={16} className="text-black fill-black" />
            </div>
            <span className="font-bold text-xl">
              Sky<span className="text-lime-400">Mart</span>
            </span>
          </div>

          <div className="rounded-[28px] border border-white/8 bg-[#111111] p-8">
            <h2 className="font-bold text-2xl mb-2">Sign in</h2>
            <p className="text-white/40 text-sm mb-8">
              Enter your credentials to continue (Gmail only)
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
                />
                <input
                  type="email"
                  placeholder="you@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 outline-none placeholder:text-white/25 focus:border-lime-400/50 transition-colors"
                />
              </div>

              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
                />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="w-full h-12 rounded-xl border border-white/10 bg-white/5 pl-10 pr-10 outline-none placeholder:text-white/25 focus:border-lime-400/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 mt-2 rounded-xl bg-lime-400 text-black font-bold hover:bg-lime-300 transition-colors"
              >
                Sign in <ArrowRight size={18} />
              </button>
            </form>

            <p className="text-center text-white/30 text-sm mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-lime-400 font-semibold hover:text-lime-300 transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="fixed bottom-6 right-6 flex items-center gap-3 bg-[#1a1a1a] border border-white/10 rounded-2xl px-4 py-3 shadow-2xl">
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
            <X size={14} className="text-white" />
          </div>
          <span className="text-sm text-white">{error}</span>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
