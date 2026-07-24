import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Game, { IGame } from "@/models/Game";

export const dynamic = "force-dynamic";

const fallbackGames = [
  {
    _id: "1",
    title: "Nova Drift Chronicles",
    slug: "nova-drift-chronicles",
    description: "A fast-paced sci-fi racer set across shattered orbital cities.",
    status: "In Development",
    platform: ["PC", "Console"],
  },
  {
    _id: "2",
    title: "Emberfall Tactics",
    slug: "emberfall-tactics",
    description: "A turn-based tactics RPG where every decision reshapes the battlefield.",
    status: "Coming Soon",
    platform: ["PC"],
  },
  {
    _id: "3",
    title: "Pocket Dungeon Crawl",
    slug: "pocket-dungeon-crawl",
    description: "A roguelite dungeon crawler built for quick mobile sessions.",
    status: "Released",
    platform: ["Mobile"],
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
      <section className="gc-scanline-bg relative overflow-hidden border-b border-white/10 px-4 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber">
            Games Creator Studio
          </p>
          <h1 className="gc-heading gc-glow text-4xl font-bold leading-tight text-white sm:text-6xl">
            We build worlds players don&apos;t want to leave.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Games Creator is an independent game development studio crafting original titles
            and co-development partnerships across PC, console, and mobile.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/games"
              className="rounded-md bg-amber px-6 py-3 text-sm font-bold text-black transition hover:bg-amber-light"
            >
              Explore Our Games
            </Link>
            <Link
              href="/career"
              className="rounded-md border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:border-amber hover:text-amber"
            >
              Join The Team
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-white/[0.02] px-4 py-12 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="gc-heading text-3xl font-bold text-amber">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber">
                Featured Titles
              </p>
              <h2 className="gc-heading mt-2 text-3xl font-bold text-white">Our Games</h2>
            </div>
            <Link href="/games" className="text-sm font-medium text-amber hover:text-amber-light">
              View all games →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <Link
                key={game._id}
                href={`/games/${game.slug}`}
                className="gc-card group rounded-xl p-6 transition hover:border-amber/50"
              >
                <p className="mb-2 inline-block rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
                  {game.status}
                </p>
                <h3 className="gc-heading text-xl font-bold text-white group-hover:text-amber">
                  {game.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-white/60">{game.description}</p>
                <p className="mt-4 text-xs uppercase tracking-wider text-white/40">
                  {game.platform?.join(" · ")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02] px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
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
              className="mt-6 inline-block rounded-md border border-white/20 px-6 py-3 text-sm font-bold text-white hover:border-amber hover:text-amber"
            >
              More About Us
            </Link>
          </div>
          <div className="gc-card rounded-xl p-8">
            <h3 className="gc-heading text-lg font-bold text-amber">Got a game idea?</h3>
            <p className="mt-2 text-sm text-white/60">
              We partner with indie studios and publishers on co-development, porting, and
              publishing. Pitch us your project.
            </p>
            <Link
              href="/submit-game"
              className="mt-4 inline-block rounded-md bg-amber px-5 py-2.5 text-sm font-bold text-black hover:bg-amber-light"
            >
              Submit Your Game
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
