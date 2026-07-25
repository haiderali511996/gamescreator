import type { MetadataRoute } from "next";
import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import Game from "@/models/Game";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXTAUTH_URL || "https://gamescreator.co";

const STATIC_PATHS = [
  "",
  "/about",
  "/vision",
  "/mission",
  "/privacy-policy",
  "/terms-of-service",
  "/blogs",
  "/contact",
  "/career",
  "/games",
  "/team",
  "/submit-game",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  try {
    await dbConnect();
    const [posts, games] = await Promise.all([
      BlogPost.find({ published: true }).select("slug updatedAt").lean(),
      Game.find().select("slug updatedAt").lean(),
    ]);

    const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${SITE_URL}/blogs/${p.slug}`,
      lastModified: p.updatedAt ?? new Date(),
    }));
    const gameEntries: MetadataRoute.Sitemap = games.map((g) => ({
      url: `${SITE_URL}/games/${g.slug}`,
      lastModified: g.updatedAt ?? new Date(),
    }));

    return [...staticEntries, ...postEntries, ...gameEntries];
  } catch {
    return staticEntries;
  }
}
