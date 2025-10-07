// src/components/DataTable.jsx
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../helpers/Constant";

function DataTable({ data = [], refreshData, uploadReloadState }) {
  const copyToClipboard = async (short) => {
    try {
      const full = `${serverUrl}/shortUrl/${short}`;
      await navigator.clipboard.writeText(full);
      alert(`Copied: ${full}`);
    } catch (err) {
      console.error("Copy failed:", err);
      alert("Copy failed");
    }
  };

  const deleteUrl = async (id) => {
    if (!confirm("Delete this short URL?")) return;
    try {
      await axios.delete(`${serverUrl}/shortUrl/${id}`);
      alert("URL deleted");
      if (refreshData) await refreshData();
      if (uploadReloadState) uploadReloadState();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="w-full bg-purp-900/10 rounded-lg p-6 text-center text-purp-300">
        No links yet — shorten one above.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl">
      <table className="w-full table-fixed text-sm text-left text-gray-200">
        <thead className="uppercase text-xs text-gray-100 bg-purp-700/20">
          <tr>
            <th className="px-4 py-3 w-6/12">Full URL</th>
            <th className="px-4 py-3 w-3/12">Short URL</th>
            <th className="px-4 py-3 text-center w-1/12">Clicks</th>
            <th className="px-4 py-3 text-center w-2/12">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              className="border-b border-purp-700/20 bg-purp-800/10 hover:bg-purp-800/25 transition"
            >
              <td className="px-4 py-3 break-words text-sm">
                <Link
                  to={item.fullUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:underline hover:text-purp-200"
                >
                  {item.fullUrl}
                </Link>
              </td>

              <td className="px-4 py-3 break-words text-sm">
                <a
                  href={`${serverUrl}/shortUrl/${item.shortUrl}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-purp-300 hover:text-purp-200"
                >
                  {item.shortUrl}
                </a>
              </td>

              <td className="px-4 py-3 text-center">{item.clicks ?? 0}</td>

              <td className="px-4 py-3 text-center flex items-center justify-center gap-3">
                <button
                  onClick={() => copyToClipboard(item.shortUrl)}
                  title="Copy short URL"
                  className="p-2 rounded-lg bg-purp-700 hover:bg-purp-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.6"
                    stroke="white"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h7M9 16h7M9 8h7M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1z"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => deleteUrl(item._id)}
                  title="Delete"
                  className="p-2 rounded-lg bg-red-600 hover:bg-red-500 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.6"
                    stroke="white"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
