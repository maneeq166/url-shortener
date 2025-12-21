export default function LinkHeader({ slug, fullUrl }) {
  return (
    <div className="bg-black-900/40 border border-white/10 rounded-2xl p-6 mb-6">
      <h2 className="text-2xl font-bold break-all">{slug}</h2>
      <p className="text-gray-400 text-sm break-all">{fullUrl}</p>
    </div>
  );
}
