import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import dbConnect from "@/lib/mongodb";
import Game, { IGame } from "@/models/Game";

export const metadata: Metadata = { title: "Games" };
export const dynamic = "force-dynamic";

async function getGames() {
  try {
    await dbConnect();
    return await Game.find().sort({ createdAt: -1 }).lean<IGame[]>();
  } catch {
    return [];
  }
}

export default async function GamesPage() {
  const games = await getGames();

  return (
    <div>
      <PageHero eyebrow="Our Catalog" title="Games" subtitle="Original titles and partner projects, in development and out in the world." />
      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
        {games.length === 0 ? (
          <p className="text-center text-white/60">No games published yet — check back soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <Link
                key={game._id.toString()}
                href={`/games/${game.slug}`}
                className="gc-card group rounded-xl p-6 transition hover:border-amber/50"
              >
                <p className="mb-2 inline-block rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
                  {game.status}
                </p>
                <h2 className="gc-heading text-xl font-bold text-white group-hover:text-amber">
                  {game.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-white/60">{game.description}</p>
                <p className="mt-4 text-xs uppercase tracking-wider text-white/40">
                  {game.platform?.join(" · ")} {game.genre?.length ? `— ${game.genre.join(", ")}` : ""}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
