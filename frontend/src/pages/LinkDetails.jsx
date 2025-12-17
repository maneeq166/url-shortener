import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { QrCode, ArrowLeft, BarChart3 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BASE_URL;

export default function LinkDetails() {
  const { id } = useParams();
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchDetails = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/analytics?linkId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      setData(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="bg-black-950 text-gray-100 min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          onClick={() => nav(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Header */}
        <div className="bg-black-900/40 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {data.url.shortUrl}
          </h2>
          <p className="text-gray-400 text-sm break-all">
            {data.url.fullUrl}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-black-900/40 border border-white/10 rounded-2xl p-6">
            <div className="text-gray-400 text-sm">Total Clicks</div>
            <div className="text-3xl font-bold mt-1">
              {data.totalClicks}
            </div>
          </div>

          <div className="bg-black-900/40 border border-white/10 rounded-2xl p-6 flex items-center justify-center">
            <BarChart3 size={40} className="text-blue-400" />
          </div>

          <div className="bg-black-900/40 border border-white/10 rounded-2xl p-6 flex items-center justify-center">
            <img
              src={data.qrCode}
              alt="QR"
              className="w-32 h-32 bg-white p-2 rounded-xl"
            />
          </div>
        </div>

        {/* Raw analytics (for now) */}
        <div className="bg-black-900/40 border border-white/10 rounded-2xl p-6">
          <h3 className="font-bold mb-4">Clicks (raw)</h3>
          <div className="space-y-2 text-sm text-gray-400 max-h-60 overflow-auto">
            {data.analytics.map((click) => (
              <div key={click._id} className="flex justify-between">
                <span>{click.deviceType}</span>
                <span>{click.country || "Unknown"}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
