"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="gc-scanline-bg relative overflow-hidden border-b border-white/10 px-4 py-24 lg:px-8">
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber/20 blur-3xl"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber"
        >
          Games Creator Studio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="gc-heading gc-glow text-4xl font-bold leading-tight text-white sm:text-6xl"
        >
          We build worlds players don&apos;t want to leave.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
        >
          Games Creator is an independent game development studio crafting original titles
          and co-development partnerships across PC, console, and mobile.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/games"
            className="rounded-md bg-amber px-6 py-3 text-sm font-bold text-black transition hover:scale-105 hover:bg-amber-light"
          >
            Explore Our Games
          </Link>
          <Link
            href="/career"
            className="rounded-md border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:scale-105 hover:border-amber hover:text-amber"
          >
            Join The Team
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
