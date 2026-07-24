"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GameCover from "./GameCover";

interface GameCardData {
  _id: string;
  slug: string;
  title: string;
  description: string;
  status: string;
  platform?: string[];
  genre?: string[];
}

export default function GameCardGrid({ games }: { games: GameCardData[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((game, i) => (
        <motion.div
          key={game._id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
          whileHover={{ y: -6 }}
        >
          <Link
            href={`/games/${game.slug}`}
            className="gc-card group block overflow-hidden rounded-xl transition hover:border-amber/50"
          >
            <GameCover title={game.title} className="h-40 w-full" />
            <div className="p-6">
              <p className="mb-2 inline-block rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
                {game.status}
              </p>
              <h3 className="gc-heading text-xl font-bold text-white group-hover:text-amber">
                {game.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-white/60">{game.description}</p>
              <p className="mt-4 text-xs uppercase tracking-wider text-white/40">
                {game.platform?.join(" · ")}
                {game.genre?.length ? ` — ${game.genre.join(", ")}` : ""}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
