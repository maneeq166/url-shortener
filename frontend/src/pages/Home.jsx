import { useEffect, useState } from "react";
import {
  Copy,
  QrCode,
  Link as LinkIcon,
  BarChart3,
  Trash2,
  Check,
  Zap,
  X,
  Download,
  Share2,
  TrendingUp,
  Globe,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLinkSchema } from "../validation/linkSchema";
import { createLink, deleteLinks, getLinks as fetchLinks } from "../api/link";
import { toast } from "react-toastify";

// Temporary data — replace with API later
// const INITIAL_DATA = [
//   {
//     id: 1,
//     original: "https://dribbble.com/shots/popular",
//     short: "shrt.lnk/design-daily",
//     custom: "design-daily",
//     views: 1240,
//     date: "2 mins ago",
//     trend: "+12%",
//   },
//   {
//     id: 2,
//     original: "https://github.com/facebook/react/issues",
//     short: "shrt.lnk/react-fix",
//     custom: "react-fix",
//     views: 856,
//     date: "1 hour ago",
//     trend: "+5%",
//   },
//   {
//     id: 3,
//     original: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     short: "shrt.lnk/surprise",
//     custom: "surprise",
//     views: 54322,
//     date: "2 days ago",
//     trend: "+84%",
//   },
// ];

export default function Home() {
  const [links, setLinks] = useState([]);
  const [homeLoad, setHomeLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(createLinkSchema),
  });

  // QR Modal
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [activeQrLink, setActiveQrLink] = useState(null);

  const getLink = async () => {
  try {
    setHomeLoading(true);

    const res = await fetchLinks();

    if (!res || !res.success) {
      toast.error(res?.message || "Failed to fetch links");
      return;
    }

    const normalizedLinks = res.data.urls.map((item) => ({
      id: item.id,
      original: item.fullUrl,
      short: item.shortUrl,
      custom: item.userUrl ? item.userUrl.split("/u/")[1] : "-",
      views: item.clicks,
      date: new Date(item.createdAt).toLocaleDateString(),
      qrCode: null,
    }));

    setLinks(normalizedLinks);
  } catch (error) {
    console.error(error);
    toast.error("Failed to load links");
  } finally {
    setHomeLoading(false);
  }
};


  useEffect(() => {
    getLink();
  }, []);

  const handleShorten = async (values) => {
    setLoading(true);

    const res = await createLink(values);

    setLoading(false);

    if (!res || !res.success) return;

    const { created, qrCode } = res.data;

    const newLink = {
      id: created._id,
      original: created.fullUrl,
      short: `${window.location.origin}/${created.slug}`,
      custom: created.userSlug || "-",
      views: created.clicks,
      date: "Just now",
      qrCode,
    };

    setLinks((prev) => [newLink, ...prev]);
    reset();
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id) => {
  const res = await deleteLinks({ id });

  if (!res || !res.success) return;

  setLinks((prev) => prev.filter((link) => link.id !== id));
};


  const openQrModal = (link) => {
    setActiveQrLink(link);
    setQrModalOpen(true);
  };

  const downloadQrCode = (base64) => {
    const a = document.createElement("a");
    a.href = base64;
    a.download = "qrcode.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  if (homeLoad)
  return (
    <div className="min-h-screen flex items-center justify-center bg-black-950">
      <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
    </div>
  );


  return (
    <div className=" bg-black-950 text-gray-100 pb-24">
      {/* Background blur lights */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse delay-500" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto -mt-25 pt-40 px-6">
        {/* Hero */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-xs font-medium mt-2 mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New: Smart QR Codes
          </div>

          <h1 className="text-5xl font-bold mb-4">
            Shorten Your URL{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Expand Your Reach
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Create powerful short links with analytics, QR codes, and custom slugs.
          </p>
        </div>

        {/* URL Shortener Form */}
        <div className="relative group mt-12">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition"></div>

          <div className="relative p-8 rounded-2xl bg-gray-900/70 border border-gray-800 backdrop-blur-xl shadow-xl">
            <form onSubmit={handleSubmit(handleShorten)} className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* URL Input */}
                <div className="flex-grow">
                  <label className="text-xs mb-1 block text-gray-400">
                    Destination URL
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-3.5 text-gray-500" size={18} />
                    <input
                      type="url"
                      required
                      {...register("fullUrl")}
                      placeholder="https://example.com/very-long-url..."
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-black-900 text-gray-100 border border-gray-700 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Custom Slug */}
                <div className="md:w-1/3">
                  <label className="text-xs mb-1 block text-gray-400">
                    Custom Slug (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-500">/</span>
                    <input
                      type="text"
                      {...register("userSlug")}
                      placeholder="my-link"
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-black-900 text-gray-100 border border-gray-700 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full py-3.5 mt-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Shortening...
                  </>
                ) : (
                  <>
                    <Zap size={20} /> Shorten Now
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Recent Links */}
        <div className="mt-16">
          <h3 className="text-xl font-bold mb-4">Recent Links</h3>

          <div className="space-y-3">
            {links.map((link) => (
              <div
                key={link.id}
                className="bg-black-900/40 border border-white/5 hover:border-blue-600/30 hover:bg-black-800/40 p-5 rounded-2xl transition"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <a className="text-lg font-bold hover:text-blue-400 transition block">
                      {link.short}
                    </a>
                    <p className="text-gray-500 text-sm truncate">
                      {link.original}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-semibold flex items-center justify-end gap-1">
                        <BarChart3 size={16} /> {link.views}
                      </p>
                      <p className="text-xs text-gray-500">{link.date}</p>
                    </div>

                    <div className="flex gap-2 border-l border-white/5 pl-4">
                      <button
                        onClick={() => copyToClipboard(link.short, link.id)}
                        className="p-2.5 rounded-xl text-gray-400 hover:bg-blue-600 hover:text-white transition"
                      >
                        {copiedId === link.id ? <Check size={18} /> : <Copy size={18} />}
                      </button>

                      <button
                        onClick={() => openQrModal(link)}
                        className="p-2.5 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition"
                      >
                        <QrCode size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(link.id)}
                        className="p-2.5 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* QR Modal */}
      {qrModalOpen && activeQrLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setQrModalOpen(false)}
          />
          <div className="relative bg-black-900 p-6 rounded-2xl">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold">QR Code</h3>
              <button onClick={() => setQrModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="bg-white p-4 rounded-xl mb-4">
              <img src={activeQrLink.qrCode} alt="QR" />
            </div>
            <button
              onClick={() => downloadQrCode(activeQrLink.qrCode)}
              className="w-full bg-blue-600 py-2 rounded-xl"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
