// src/components/FormContainer.jsx
import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../helpers/Constant";

function FormContainer({ uploadReloadState }) {
  const [fullUrl, setFullUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullUrl.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/shortUrl`, { fullUrl });
      console.log("Shortened:", res.data);

      // Clear input and notify parent to reload table
      setFullUrl("");
      uploadReloadState();
    } catch (error) {
      console.error("Error creating short URL:", error);
      // optionally show a nicer UI notification
      alert("Could not shorten the URL. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-6 sm:p-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-purp-200 tracking-wide">
          URL Shortener
        </h2>
        <p className="text-purp-300/90 mt-2 text-sm sm:text-base">
          Paste your untidy link below and get a clean short one 
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative w-full">
            <div className="absolute left-3 inset-y-0 flex items-center text-purp-400 font-semibold select-none pointer-events-none">
              urlshortner.link/
            </div>

            <input
              type="text"
              value={fullUrl}
              onChange={(e) => setFullUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              required
              className="w-full bg-purp-950/40 text-white rounded-xl pl-36 pr-32 py-3
                         border border-purp-700 focus:ring-2 focus:ring-purp-400
                         focus:outline-none placeholder-purp-400/60 transition duration-150"
            />

            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-purp-500 hover:bg-purp-400
                         text-white font-medium px-5 py-2 rounded-lg shadow-md
                         focus:ring-2 focus:ring-purp-300 transition-all disabled:opacity-60"
            >
              {loading ? "Shortening..." : "Shorten"}
            </button>
          </div>
        </div>
      </form>

      <p className="text-center text-sm text-purp-300/70 mt-5">
      No signup required — your links are saved on your device
      </p>
    </div>
  );
}

export default FormContainer;
