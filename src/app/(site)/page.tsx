import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Game, { IGame } from "@/models/Game";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import GameCardGrid from "@/components/GameCardGrid";

export const dynamic = "force-dynamic";

const fallbackGames = [
  {
    _id: "1",
    title: "Nova Drift Chronicles",
    slug: "nova-drift-chronicles",
    description: "A fast-paced sci-fi racer set across shattered orbital cities.",
    platformLinks: [{ platform: "PC (Windows)" }, { platform: "PlayStation 5" }],
  },
  {
    _id: "2",
    title: "Emberfall Tactics",
    slug: "emberfall-tactics",
    description: "A turn-based tactics RPG where every decision reshapes the battlefield.",
    platformLinks: [{ platform: "PC (Windows)" }],
  },
  {
    _id: "3",
    title: "Pocket Dungeon Crawl",
    slug: "pocket-dungeon-crawl",
    description: "A roguelite dungeon crawler built for quick mobile sessions.",
    platformLinks: [{ platform: "iOS" }, { platform: "Android" }],
  },
];

async function getFeaturedGames() {
  try {
    await dbConnect();
    const games = await Game.find().sort({ createdAt: -1 }).limit(3).lean<IGame[]>();
    if (games.length) return games;
  } catch {
    // fall through to sample data if DB isn't reachable
  }
  return fallbackGames as unknown as IGame[];
}

const stats = [
  { label: "Games Shipped", value: "14+" },
  { label: "Players Reached", value: "8M+" },
  { label: "Team Members", value: "30+" },
  { label: "Years Building", value: "9" },
];

export default async function HomePage() {
  const games = await getFeaturedGames();

  return (
    <div>
      <Hero />

      <section className="border-b border-white/10 bg-white/[0.02] px-4 py-12 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <p className="gc-heading text-3xl font-bold text-amber">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber">
                Featured Titles
              </p>
              <h2 className="gc-heading mt-2 text-3xl font-bold text-white">Our Games</h2>
            </div>
            <Link href="/games" className="text-sm font-medium text-amber hover:text-amber-light">
              View all games →
            </Link>
          </Reveal>

          <GameCardGrid
            games={games.map((g) => ({
              _id: g._id.toString(),
              slug: g.slug,
              title: g.title,
              description: g.description,
              platformLinks: g.platformLinks,
              genre: g.genre,
              coverImage: g.coverImage,
            }))}
          />
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02] px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber">
              Who We Are
            </p>
            <h2 className="gc-heading mt-2 text-3xl font-bold text-white">
              A studio obsessed with craft.
            </h2>
            <p className="mt-4 text-white/70">
              From concept art to launch day, our multidisciplinary team of designers,
              engineers, and artists ships games built to be played for years, not weekends.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block rounded-md border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:border-amber hover:text-amber"
            >
              More About Us
            </Link>
          </Reveal>
          <Reveal delay={0.15} className="gc-card rounded-xl p-8">
            <h3 className="gc-heading text-lg font-bold text-amber">Got a game idea?</h3>
            <p className="mt-2 text-sm text-white/60">
              We partner with indie studios and publishers on co-development, porting, and
              publishing. Pitch us your project.
            </p>
            <Link
              href="/submit-game"
              className="mt-4 inline-block rounded-md bg-amber px-5 py-2.5 text-sm font-bold text-black transition hover:scale-105 hover:bg-amber-light"
            >
              Submit Your Game
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
