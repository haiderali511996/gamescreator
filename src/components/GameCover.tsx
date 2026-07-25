/**
 * Cover art for a game. Renders the real uploaded coverImage when set;
 * otherwise falls back to a deterministic procedural gradient + icon so
 * each game still reads as visually distinct before real art exists.
 */
const PALETTES = [
  ["#f5a623", "#7c2d12"],
  ["#fbbf24", "#1e3a8a"],
  ["#f5a623", "#134e4a"],
  ["#fb923c", "#3b0764"],
  ["#facc15", "#111827"],
  ["#f97316", "#0f172a"],
];

function hashTitle(title: string) {
  let h = 0;
  for (let i = 0; i < title.length; i++) h = (h * 31 + title.charCodeAt(i)) >>> 0;
  return h;
}

export default function GameCover({
  title,
  image,
  className = "",
}: {
  title: string;
  image?: string;
  className?: string;
}) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- image may be an arbitrary external URL
      <img src={image} alt={title} className={`object-cover ${className}`} />
    );
  }

  const hash = hashTitle(title);
  const idx = hash % PALETTES.length;
  const [from, to] = PALETTES[idx];
  const iconRotate = (hash % 40) - 20;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}33, ${to}88)` }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 12px)",
        }}
      />
      <svg
        width="72"
        height="72"
        viewBox="0 0 100 100"
        className="relative drop-shadow-lg"
        style={{ transform: `rotate(${iconRotate}deg)` }}
      >
        <path d="M50 8 L50 92 L11 71 L11 29 Z" fill="#ffffff" opacity="0.9" />
        <path d="M50 8 L50 92 L89 71 L89 29 Z" fill="#f5a623" opacity="0.9" />
      </svg>
    </div>
  );
}
