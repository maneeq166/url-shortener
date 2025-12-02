import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="min-h-screen bg-black-950 text-gray-100">
      <Navbar />

      <div className="max-w-md mx-auto mt-24 px-6">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center tracking-tight text-gray-100">
          Login to Your Account
        </h2>
        <p className="text-center text-gray-400 mt-2 text-base">
          Access your dashboard, links & analytics.
        </p>

        {/* Form Card */}
        <div
          className="
            mt-10 p-8 rounded-2xl
            bg-black-900/40 dark:bg-black-900/50
            border border-gray-800
            backdrop-blur-xl shadow-xl
          "
        >
          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm mb-1 text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="you@example.com"
              className="
                w-full px-5 py-3.5 rounded-xl
                bg-black-800 text-gray-100
                placeholder-gray-500
                border border-gray-700
                focus:border-blue-500 focus:ring-blue-500
                outline-none transition
              "
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm mb-1 text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              placeholder="••••••••"
              className="
                w-full px-5 py-3.5 rounded-xl
                bg-black-800 text-gray-100
                placeholder-gray-500
                border border-gray-700
                focus:border-blue-500 focus:ring-blue-500
                outline-none transition
              "
            />
          </div>

          {/* Login button */}
          <button
            className="
              w-full py-3.5 rounded-xl
              bg-blue-600 hover:bg-blue-500
              text-white font-semibold
              transition-all shadow-sm hover:shadow-blue-500/20
            "
          >
            Login
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 pb-10 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-400 font-semibold hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
