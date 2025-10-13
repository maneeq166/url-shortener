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

      setFullUrl("");
      uploadReloadState();
    } catch (error) {
      console.error("Error creating short URL:", error);
      alert("Could not shorten the URL. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full bg-purp-900/20 backdrop-blur-xl
                 rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.25)]
                 border border-purp-700/30 p-4 sm:p-6 md:p-8
                 transform transition-all duration-300 ease-out
                 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(168,85,247,0.45)]
                 hover:border-purp-400/40 hover:bg-purp-800/30"
    >
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purp-200 tracking-wide">
          URL Shortener
        </h2>
        <p className="text-purp-300/90 mt-1 text-xs sm:text-sm md:text-base">
          Paste your untidy link below and get a clean short one 
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center relative">
          {/* Input with prefix */}
          <div className="relative w-full">
            <div className="absolute left-3 inset-y-0 flex items-center text-purp-400 font-semibold select-none text-xs sm:text-sm md:text-base pointer-events-none">
              urlshortner.link/
            </div>
            <input
              type="text"
              value={fullUrl}
              onChange={(e) => setFullUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              required
              className="w-full bg-purp-950/40 text-white rounded-xl pl-28 sm:pl-36 pr-4 sm:pr-32 py-2.5 sm:py-3
                         border border-purp-700 focus:ring-2 focus:ring-purple-400
                         focus:outline-none placeholder-purp-400/60 transition duration-150"
            />

            {/* Button inside input on desktop */}
            <button
              type="submit"
              disabled={loading}
              className="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 bg-purp-500 hover:bg-purp-400 text-white font-medium px-5 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-purp-300 transition-all disabled:opacity-60 text-sm sm:text-base"
            >
              {loading ? "Shortening..." : "Shorten"}
            </button>
          </div>

          {/* Button below input on mobile */}
          <button
            type="submit"
            disabled={loading}
            className="sm:hidden w-full bg-purp-500 hover:bg-purp-400 text-white font-medium px-4 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-purp-300 transition-all disabled:opacity-60 text-sm"
          >
            {loading ? "Shortening..." : "Shorten"}
          </button>
        </div>
      </form>

      <p className="text-center text-xs sm:text-sm text-purp-300/70 mt-3 sm:mt-5">
        No signup required — your links are saved on your device
      </p>
    </div>
  );
}

export default FormContainer;
