"use client";

import GameCover from "./GameCover";

interface MarqueeGame {
  _id: string;
  title: string;
}

const MIN_TILES_PER_ROW = 16;

function MarqueeRow({
  games,
  reverse = false,
}: {
  games: MarqueeGame[];
  reverse?: boolean;
}) {
  // Repeat the row's games enough times to comfortably overflow the
  // viewport width before duplicating the whole set once more for a
  // seamless loop — otherwise a small catalog leaves the strip short
  // and stuck in the left corner instead of spanning the section.
  const repeats = Math.max(1, Math.ceil(MIN_TILES_PER_ROW / games.length));
  const filled = Array.from({ length: repeats }, () => games).flat();
  const loop = [...filled, ...filled];
  const duration = filled.length * 3.5;

  return (
    <div className="flex overflow-hidden">
      <div
        className="flex w-max shrink-0 gap-4 pr-4"
        style={{
          animation: `gc-marquee ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {loop.map((g, i) => (
          <div
            key={`${g._id}-${i}`}
            className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-black/40 sm:h-24 sm:w-24"
          >
            <GameCover title={g.title} className="h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GameMarquee({ games }: { games: MarqueeGame[] }) {
  if (games.length === 0) return null;

  const third = Math.ceil(games.length / 3) || 1;
  const rows = [
    games.slice(0, third),
    games.slice(third, third * 2),
    games.slice(third * 2),
  ].filter((r) => r.length > 0);

  return (
    <div className="w-full space-y-4 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,white_10%,white_90%,transparent)]">
      {rows.map((row, i) => (
        <MarqueeRow key={i} games={row} reverse={i % 2 === 1} />
      ))}
    </div>
  );
}
