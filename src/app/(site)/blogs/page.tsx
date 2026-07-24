import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import dbConnect from "@/lib/mongodb";
import BlogPost, { IBlogPost } from "@/models/BlogPost";

export const metadata: Metadata = { title: "Blogs" };
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

  return (
    <div>
      <PageHero eyebrow="Studio Blog" title="News, dev logs & insights" />
      <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        {posts.length === 0 ? (
          <p className="text-center text-white/60">No blog posts yet — check back soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post._id.toString()}
                href={`/blogs/${post.slug}`}
                className="gc-card group rounded-xl p-6 transition hover:border-amber/50"
              >
                <p className="text-xs uppercase tracking-wider text-white/40">
                  {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString()}
                </p>
                <h2 className="gc-heading mt-2 text-xl font-bold text-white group-hover:text-amber">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-white/60">{post.excerpt}</p>
                <p className="mt-4 text-xs text-white/40">By {post.author}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
