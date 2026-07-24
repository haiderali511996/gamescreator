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

const FAN_ANGLES = [-4, 2, -2, 4, -3, 3];

export default function GameCardGrid({ games }: { games: GameCardData[] }) {
  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((game, i) => {
        const baseRotate = FAN_ANGLES[i % FAN_ANGLES.length];
        return (
          <motion.div
            key={game._id}
            initial={{ opacity: 0, y: 30, rotate: baseRotate }}
            whileInView={{ opacity: 1, y: 0, rotate: baseRotate }}
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ rotate: 0, y: -10, scale: 1.05 }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
            style={{ transformOrigin: "bottom center" }}
          >
            <Link
              href={`/games/${game.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 shadow-xl shadow-black/40 transition group-hover:border-amber/60"
            >
              <GameCover title={game.title} className="absolute inset-0 h-full w-full" />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber backdrop-blur">
                {game.genre?.[0] ?? game.status}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="gc-heading text-lg font-bold leading-tight text-white drop-shadow-md">
                  {game.title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                  {game.platform?.join(" · ")}
                </p>
                <p className="mt-2 max-h-0 overflow-hidden text-xs text-white/70 opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
                  {game.description}
                </p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
