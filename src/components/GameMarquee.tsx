"use client";

import GameCover from "./GameCover";

interface MarqueeGame {
  _id: string;
  title: string;
}

function MarqueeRow({
  games,
  duration,
  reverse = false,
}: {
  games: MarqueeGame[];
  duration: number;
  reverse?: boolean;
}) {
  const loop = [...games, ...games];

  return (
    <div className="flex overflow-hidden">
      <div
        className="flex shrink-0 gap-4 pr-4"
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
    <div className="space-y-4 py-2 [mask-image:linear-gradient(90deg,transparent,white_10%,white_90%,transparent)]">
      {rows.map((row, i) => (
        <MarqueeRow key={i} games={row} duration={22 + i * 6} reverse={i % 2 === 1} />
      ))}
    </div>
  );
}
