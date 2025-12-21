import LinkCard from "./LinkCard";

export default function LinksList({
  links,
  copiedId,
  onCopy,
  onDelete,
  onQr,
}) {
  return (
    <div className="space-y-3 mt-16">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          copiedId={copiedId}
          onCopy={onCopy}
          onDelete={onDelete}
          onQr={onQr}
        />
      ))}
    </div>
  );
}
