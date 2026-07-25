import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import dbConnect from "@/lib/mongodb";
import BlogPost, { IBlogPost } from "@/models/BlogPost";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Dev logs, studio news, and insights from the Games Creator team — behind-the-scenes on our games and how we build them.",
  openGraph: {
    title: "Games Creator Blog",
    description:
      "Dev logs, studio news, and insights from the Games Creator team — behind-the-scenes on our games and how we build them.",
    type: "website",
  },
};
export const dynamic = "force-dynamic";

async function getPosts() {
  try {
    await dbConnect();
    return await BlogPost.find({ published: true })
      .sort({ publishedAt: -1 })
      .lean<IBlogPost[]>();
  } catch {
    return [];
  }
}

export default async function BlogsPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <div>
      <PageHero eyebrow="Studio Blog" title="News, dev logs & insights" />
      <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        {posts.length === 0 ? (
          <p className="text-center text-white/60">No blog posts yet — check back soon.</p>
        ) : (
          <>
            <Reveal>
              <Link
                href={`/blogs/${featured.slug}`}
                className="gc-card group grid overflow-hidden rounded-xl transition hover:border-amber/50 sm:grid-cols-2"
              >
                {featured.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element -- may be an arbitrary external URL
                  <img src={featured.coverImage} alt="" className="h-56 w-full object-cover sm:h-full" />
                ) : (
                  <div className="h-56 w-full bg-gradient-to-br from-amber/20 to-black sm:h-full" />
                )}
                <div className="flex flex-col justify-center p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber">Latest</p>
                  <h2 className="gc-heading mt-2 text-2xl font-bold text-white group-hover:text-amber">
                    {featured.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm text-white/60">{featured.excerpt}</p>
                  <p className="mt-4 text-xs text-white/40">
                    {new Date(featured.publishedAt ?? featured.createdAt).toLocaleDateString()} · By{" "}
                    {featured.author}
                  </p>
                </div>
              </Link>
            </Reveal>

            {rest.length > 0 && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {rest.map((post, i) => (
                  <Reveal key={post._id.toString()} delay={(i % 4) * 0.08}>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="gc-card group block overflow-hidden rounded-xl transition hover:-translate-y-1 hover:border-amber/50"
                    >
                      {post.coverImage && (
                        // eslint-disable-next-line @next/next/no-img-element -- may be an arbitrary external URL
                        <img src={post.coverImage} alt="" className="h-40 w-full object-cover" />
                      )}
                      <div className="p-6">
                        <p className="text-xs uppercase tracking-wider text-white/40">
                          {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString()}
                        </p>
                        <h2 className="gc-heading mt-2 text-xl font-bold text-white group-hover:text-amber">
                          {post.title}
                        </h2>
                        <p className="mt-2 line-clamp-3 text-sm text-white/60">{post.excerpt}</p>
                        {post.tags?.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="rounded-full bg-amber/10 px-2.5 py-0.5 text-[11px] text-amber">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="mt-4 text-xs text-white/40">By {post.author}</p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
