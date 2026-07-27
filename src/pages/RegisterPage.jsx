import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Zap,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  X,
} from "lucide-react";
import { useAuth, isGmail } from "../context/AuthContext";

// checks how strong the password is - simple scoring, not fancy
function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "" };

  const hasMinLength = pw.length >= 6;
  const hasUpperCase = /[A-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(pw);

  let score = 0;
  if (hasMinLength) score++;
  if (hasUpperCase && hasNumber) score++;
  if (hasSpecialChar) score++;

  const levels = [
    { label: "Weak", color: "bg-red-500", textColor: "text-red-400" },
    { label: "Medium", color: "bg-yellow-400", textColor: "text-yellow-400" },
    { label: "Strong", color: "bg-lime-400", textColor: "text-lime-400" },
  ];

  return { score, ...levels[Math.max(score - 1, 0)] };
}

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("error"); // "error" | "success"

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleRegister(e) {
    e.preventDefault();

    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      setToastType("error");
      setToast("Fill all fields");
      return;
    }
    if (!isGmail(email)) {
      setToastType("error");
      setToast("Only Gmail addresses are allowed (e.g. name@gmail.com)");
      return;
    }
    if (password.length < 6) {
      setToastType("error");
      setToast("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setToastType("error");
      setToast("Passwords do not match");
      return;
    }

    const result = register({ fullName, email, password });

    if (!result.success) {
      setToastType("error");
      setToast(result.message);
      return;
    }

    setToastType("success");
    setToast(result.message);
    setTimeout(() => navigate("/"), 1200);
  }

  const strength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-lime-400 rounded-2xl flex items-center justify-center">
          <Zap size={18} className="text-black fill-black" />
        </div>
        <span className="font-semibold text-[22px]">
          Sky<span className="text-lime-400">Mart</span>
        </span>
      </div>

      <div className="w-full max-w-md rounded-[28px] border border-white/8 bg-[#111111]  p-8">
        <h2 className="text-2xl font-medium mb-1">Create account</h2>
        <p className="text-white/40 text-[13px] mb-7">
          Join SkyMart and start shopping (Gmail only)
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <User
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
            />
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full h-11 rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 outline-none placeholder:text-white/25 text-sm  focus:border-lime-400/50 transition-colors"
            />
          </div>

          <div className="relative">
            <Mail
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
            />
            <input
              type="email"
              name="email"
              placeholder="you@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-11 rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 outline-none placeholder:text-white/25 text-sm focus:border-lime-400/50 transition-colors"
            />
          </div>

          <div>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
              />
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password (min 6 chars)"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-11 rounded-xl border border-white/10 bg-white/5 pl-10 pr-10 outline-none placeholder:text-white/25 text-sm focus:border-lime-400/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            <div
              className={`flex items-center gap-2 mt-2 transition-opacity ${
                formData.password ? "opacity-100" : "opacity-0"
              }`}
            >
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      i < strength.score ? strength.color : "bg-transparent"
                    }`}
                  />
                </div>
              ))}
              <span className={`text-xs ${strength.textColor}`}>
                {strength.label}
              </span>
            </div>
          </div>

          <div className="relative">
            <Lock
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
            />
            <input
              type={showPass ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full h-11 rounded-xl border border-white/10 bg-white/5 pl-10 pr-10 outline-none placeholder:text-white/25 text-sm focus:border-lime-400/50 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer flex items-center justify-center gap-2 py-3.5 mt-2 rounded-xl bg-lime-400 text-black font-medium hover:bg-lime-300 transition-colors"
          >
            Create Account <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-center text-white/30 text-[13px] mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-lime-400 font-semibold hover:text-lime-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-3 bg-[#1a1a1a] border border-white/10 rounded-2xl px-4 py-3 shadow-2xl">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              toastType === "success" ? "bg-lime-400" : "bg-red-500"
            }`}
          >
            {toastType === "success" ? (
              <span className="text-black text-xs font-bold">✓</span>
            ) : (
              <X size={14} className="text-white" />
            )}
          </div>
          <span className="text-sm text-white">{toast}</span>
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
