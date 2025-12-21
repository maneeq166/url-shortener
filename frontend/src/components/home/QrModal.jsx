import { X } from "lucide-react";

export default function QrModal({ link, onClose, onDownload }) {
  if (!link) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-black-900 p-6 rounded-2xl">
        <div className="flex justify-between mb-4">
          <h3 className="font-bold">QR Code</h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="bg-white p-4 rounded-xl mb-4">
          <img src={link.qrCode} alt="QR" />
        </div>
        <button
          onClick={() => onDownload(link.qrCode)}
          className="w-full bg-blue-600 py-2 rounded-xl"
        >
          Download
        </button>
      </div>
    </div>
  );
}
