import { Globe } from "lucide-react";

export default function LinkStats({ totalClicks, expired, expiry, qrCode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-black-900/40 border border-white/10 rounded-2xl p-6">
        <div className="text-gray-400 text-sm">Total Clicks</div>
        <div className="text-3xl font-bold">{totalClicks}</div>
      </div>

      <div className="bg-black-900/40 border border-white/10 rounded-2xl p-6">
        <div className="text-gray-400 text-sm mb-2">Status</div>
        <div className={`text-lg font-semibold ${expired ? "text-red-400" : "text-emerald-400"}`}>
          {expired ? "Expired" : "Active"}
        </div>
        <div className="text-xs text-gray-500">
          Expires on {new Date(expiry).toLocaleDateString()}
        </div>
      </div>

      <div className="bg-black-900/40 border border-white/10 rounded-2xl p-6 flex items-center justify-center">
        <img src={qrCode} alt="QR" className="w-32 h-32 bg-white p-2 rounded-xl" />
      </div>
    </div>
  );
}
