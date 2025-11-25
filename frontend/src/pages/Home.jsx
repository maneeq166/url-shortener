import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [fullUrl, setFullUrl] = useState("");

  return (
    <div className="min-h-screen bg-black-950 text-gray-100 dark:text-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-24 px-6">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center tracking-tight text-gray-100">
          Shorten Your URL
        </h2>
        <p className="text-center text-gray-400 mt-2 text-base">
          Create powerful short links with analytics, QR codes, and custom slugs.
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
          {/* Input */}
          <input
            type="text"
            placeholder="Paste your long URL here..."
            value={fullUrl}
            onChange={(e) => setFullUrl(e.target.value)}
            className="
              w-full px-5 py-3.5 rounded-xl
              bg-black-800 text-gray-100
              placeholder-gray-500
              border border-gray-700
              focus:border-blue-500 focus:ring-blue-500
              outline-none transition
            "
          />

          {/* Button */}
          <button
            className="
              mt-5 w-full py-3.5 rounded-xl
              bg-blue-600 hover:bg-blue-500
              text-white font-semibold
              transition-all shadow-sm hover:shadow-blue-500/20
            "
          >
            Shorten URL
          </button>
        </div>

        {/* Output Placeholder */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Your shortened link will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
