import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GameMarquee from "@/components/GameMarquee";
import FeaturedGameCard from "@/components/FeaturedGameCard";
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
      <PageHero
        eyebrow="Our Catalog"
        title="Games Built For Spectacle & Staying Power"
        subtitle="Original titles and partner projects, in development and out in the world."
      />

      {games.length > 0 && (
        <div className="border-b border-white/10 py-8">
          <GameMarquee games={games.map((g) => ({ _id: g._id.toString(), title: g.title }))} />
        </div>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
        <p className="mb-8 text-xs font-semibold uppercase tracking-wider text-amber">
          Featured Release Lineup
        </p>
        {games.length === 0 ? (
          <p className="text-center text-white/60">No games published yet — check back soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((g, i) => (
              <FeaturedGameCard
                key={g._id.toString()}
                delay={i * 0.08}
                game={{
                  _id: g._id.toString(),
                  slug: g.slug,
                  title: g.title,
                  status: g.status,
                  platform: g.platform,
                  genre: g.genre,
                  storeLinks: g.storeLinks,
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
