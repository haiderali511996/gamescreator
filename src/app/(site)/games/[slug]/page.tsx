import Link from "next/link";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Game, { IGame } from "@/models/Game";
import GameCover from "@/components/GameCover";

export const dynamic = "force-dynamic";

async function getGame(slug: string) {
  try {
    await dbConnect();
    return await Game.findOne({ slug }).lean<IGame>();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = await getGame(slug);
  return { title: game?.title ?? "Game" };
}

export default async function GameDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = await getGame(slug);
  if (!game) notFound();

  return (
    <article>
      <GameCover title={game.title} image={game.coverImage} className="h-64 w-full sm:h-80" />
      <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
      <Link href="/games" className="text-sm text-amber hover:text-amber-light">
        ← Back to Games
      </Link>
      <h1 className="gc-heading mt-6 text-3xl font-bold text-white sm:text-4xl">{game.title}</h1>
      {game.genre?.length > 0 && (
        <p className="mt-2 text-sm uppercase tracking-wider text-white/40">{game.genre.join(", ")}</p>
      )}
      <p className="mt-8 text-white/75">{game.description}</p>

      {game.platformLinks?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {game.platformLinks.map((p) =>
            p.url ? (
              <a
                key={p.platform}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80 transition hover:border-amber hover:text-amber"
              >
                {p.platform}
              </a>
            ) : (
              <span
                key={p.platform}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/50"
              >
                {p.platform}
              </span>
            )
          )}
        </div>
      )}

      {(game.storeLinks?.steam || game.storeLinks?.appStore || game.storeLinks?.playStore || game.trailerUrl) && (
        <div className="mt-8 flex flex-wrap gap-3">
          {game.trailerUrl && (
            <a href={game.trailerUrl} target="_blank" rel="noreferrer" className="rounded-md bg-amber px-5 py-2.5 text-sm font-bold text-black hover:bg-amber-light">
              Watch Trailer
            </a>
          )}
          {game.storeLinks?.steam && (
            <a href={game.storeLinks.steam} target="_blank" rel="noreferrer" className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-bold text-white hover:border-amber hover:text-amber">
              Steam
            </a>
          )}
          {game.storeLinks?.appStore && (
            <a href={game.storeLinks.appStore} target="_blank" rel="noreferrer" className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-bold text-white hover:border-amber hover:text-amber">
              App Store
            </a>
          )}
          {game.storeLinks?.playStore && (
            <a href={game.storeLinks.playStore} target="_blank" rel="noreferrer" className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-bold text-white hover:border-amber hover:text-amber">
              Play Store
            </a>
          )}
        </div>
      )}

      {game.screenshots?.length > 0 && (
        <div className="mt-12">
          <h2 className="gc-heading text-lg font-bold text-white">Screenshots</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {game.screenshots.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- may be an arbitrary external URL
              <img
                key={i}
                src={src}
                alt={`${game.title} screenshot ${i + 1}`}
                className="aspect-video w-full rounded-lg border border-white/10 object-cover"
              />
            ))}
          </div>
        </div>
      )}
      </div>
    </article>
  );
}
