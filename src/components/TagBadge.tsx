export default function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="bg-white/20 text-xs rounded-full px-2 py-1">{tag}</span>
  );
}
