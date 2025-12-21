import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLinkSchema } from "../validation/linkSchema";
import { useLinks } from "../hooks/useLinks";
import HeroSection from "../components/home/HeroSection";
import CreateLinkForm from "../components/home/CreateLinkForm";
import LinksList from "../components/home/LinksList";
import QrModal from "../components/home/QrModal";
import { useState } from "react";

export default function Home() {
  const { links, loading, creating, create, remove } = useLinks();
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(createLinkSchema),
  });

  const [copiedId, setCopiedId] = useState(null);
  const [qrLink, setQrLink] = useState(null);

  const onSubmit = async (values) => {
    await create(values);
    reset();
  };

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black-950">
        <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="bg-black-950 text-gray-100 pb-24">
      <main className="max-w-6xl mx-auto pt-20 px-6">
        <HeroSection />
        <CreateLinkForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          loading={creating}
        />
        <LinksList
          links={links}
          copiedId={copiedId}
          onCopy={copy}
          onDelete={remove}
          onQr={setQrLink}
        />
      </main>

      <QrModal
        link={qrLink}
        onClose={() => setQrLink(null)}
        onDownload={(qr) => {
          const a = document.createElement("a");
          a.href = qr;
          a.download = "qrcode.png";
          a.click();
        }}
      />
    </div>
  );
}
