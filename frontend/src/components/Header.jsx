// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router"; 

export default function AuthHeader() {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full fixed top-0 left-0 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-[0_0_25px_rgba(168,85,247,0.15)] z-50"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-purple-200 font-bold text-xl tracking-wide drop-shadow-md">
          URLShortner
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-4">
          <Link
            to="/login"
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              location.pathname === "/login"
                ? "bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                : "text-purple-200 hover:bg-purple-500/20 hover:text-white"
            }`}
          >
            Login
          </Link>

          <Link
            to="/register"
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              location.pathname === "/register"
                ? "bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                : "text-purple-200 hover:bg-purple-500/20 hover:text-white"
            }`}
          >
            Register
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
