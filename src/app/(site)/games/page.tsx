import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GameCardGrid from "@/components/GameCardGrid";
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
          <GameCardGrid
            games={games.map((g) => ({
              _id: g._id.toString(),
              slug: g.slug,
              title: g.title,
              description: g.description,
              status: g.status,
              platform: g.platform,
              genre: g.genre,
            }))}
          />
        )}
      </section>
    </div>
  );
}
