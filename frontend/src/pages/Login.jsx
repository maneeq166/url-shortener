// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { email: "", password: "" };

    if (!validateEmail(email)) newErrors.email = "Please enter a valid email.";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log({ email, password });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-br from-purp-700 via-purp-800 to-[#ad5ef2] ">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sm:mx-auto sm:w-full sm:max-w-sm"
      >
        {/* Header Animation */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center text-4xl font-extrabold text-purple-200 tracking-wide drop-shadow-md"
        >
          Welcome Back
        </motion.h2>

        <p className="text-center text-purple-400/80 mt-2 text-sm">
          Login to manage your short links
        </p>

        {/* Card */}
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 150, damping: 10 }}
          className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_25px_rgba(168,85,247,0.25)] p-8 sm:p-10 space-y-6 min-h-[320px] transition-all hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:border-purple-400/30 hover:bg-white/10"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className={`w-full px-4 py-2.5 bg-white/10 text-white placeholder-purple-300/70 rounded-xl border ${
                  errors.email ? "border-red-400" : "border-purple-700/40"
                } focus:ring-2 focus:ring-purple-400 focus:outline-none transition`}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className={`w-full px-4 py-2.5 bg-white/10 text-white placeholder-purple-300/70 rounded-xl border ${
                    errors.password ? "border-red-400" : "border-purple-700/40"
                  } focus:ring-2 focus:ring-purple-400 focus:outline-none transition`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-200 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-500 hover:bg-purple-400 text-white py-2.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] focus:ring-2 focus:ring-purple-400 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-purple-300/70">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-purple-400 hover:text-purple-300 transition"
            >
              Register
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
