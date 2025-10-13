// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

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
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-br from-purp-900 via-purp-800 to-purp-950">
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
          className="text-center text-4xl font-extrabold text-purp-200 tracking-wide drop-shadow-md"
        >
          Welcome Back
        </motion.h2>

        <p className="text-center text-purp-300/80 mt-2 text-sm">
          Login to manage your short links
        </p>

        {/* Card */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 140, damping: 12 }}
          className="mt-8 bg-purp-950/10 backdrop-blur-xl border border-purp-800/30 rounded-3xl shadow-[0_0_25px_rgba(168,85,247,0.2)] p-8 sm:p-10 space-y-6 min-h-[320px] transition-all hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] hover:border-purp-400/30 hover:bg-purp-950/20"
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
                className={`w-full px-4 py-2.5 bg-purp-950/20 text-purp-100 placeholder-purp-300 rounded-xl border ${
                  errors.email ? "border-red-400" : "border-purp-700/30"
                } focus:ring-2 focus:ring-purp-400 focus:outline-none transition`}
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
                  className={`w-full px-4 py-2.5 bg-purp-950/20 text-purp-100 placeholder-purp-300 rounded-xl border ${
                    errors.password ? "border-red-400" : "border-purp-700/30"
                  } focus:ring-2 focus:ring-purp-400 focus:outline-none transition`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purp-300 hover:text-purp-200 transition"
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
              className="w-full bg-purp-500 hover:bg-purp-400 text-purp-100 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] focus:ring-2 focus:ring-purp-400 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-purp-300/70">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-purp-400 hover:text-purp-300 transition"
            >
              Register
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
