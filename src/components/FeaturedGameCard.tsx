"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GameCover from "./GameCover";

interface FeaturedGame {
  _id: string;
  slug: string;
  title: string;
  status: string;
  platform?: string[];
  genre?: string[];
  storeLinks?: { steam?: string; appStore?: string; playStore?: string };
}

export default function FeaturedGameCard({ game, delay = 0 }: { game: FeaturedGame; delay?: number }) {
  const storeUrl = game.storeLinks?.steam || game.storeLinks?.appStore || game.storeLinks?.playStore;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="gc-card overflow-hidden rounded-2xl"
    >
      <Link href={`/games/${game.slug}`} className="group relative block aspect-[4/5] overflow-hidden">
        <GameCover title={game.title} className="h-full w-full transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber backdrop-blur">
          {game.genre?.[0] ?? "Game"}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-amber px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
          {game.status}
        </span>
      </Link>

      <div className="p-5">
        <Link href={`/games/${game.slug}`}>
          <h3 className="gc-heading text-xl font-bold text-white hover:text-amber">{game.title}</h3>
        </Link>

        {(game.genre?.length || game.platform?.length) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {[...(game.genre ?? []), ...(game.platform ?? [])].slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-amber"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex gap-2">
          <Link
            href={`/games/${game.slug}`}
            className="flex-1 rounded-full bg-gradient-to-r from-amber to-amber-light px-4 py-2.5 text-center text-sm font-bold text-black transition hover:brightness-110"
          >
            View Details
          </Link>
          {storeUrl && (
            <a
              href={storeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:border-amber hover:text-amber"
            >
              Store
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
