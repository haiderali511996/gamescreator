import Link from "next/link";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import BlogPost, { IBlogPost } from "@/models/BlogPost";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXTAUTH_URL || "https://gamescreator.co";

async function getPost(slug: string) {
  try {
    await dbConnect();
    return await BlogPost.findOne({ slug, published: true }).lean<IBlogPost>();
  } catch {
    return null;
  }
}

function estimateReadingTime(html: string) {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Blog Post" };

  const url = `${SITE_URL}/blogs/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: (post.publishedAt ?? post.createdAt)?.toString(),
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const readingTime = estimateReadingTime(post.content);
  const publishedDate = post.publishedAt ?? post.createdAt;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: publishedDate,
    dateModified: post.updatedAt ?? publishedDate,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Games Creator" },
    mainEntityOfPage: `${SITE_URL}/blogs/${post.slug}`,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element -- may be an arbitrary external URL
        <img src={post.coverImage} alt={post.title} className="h-64 w-full object-cover sm:h-80" />
      )}

      <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <Link href="/blogs" className="text-sm text-amber hover:text-amber-light">
          ← Back to Blog
        </Link>

        <p className="mt-6 text-xs uppercase tracking-wider text-white/40">
          {new Date(publishedDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · By {post.author} · {readingTime} min read
        </p>

        <h1 className="gc-heading mt-2 text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
        <p className="mt-4 text-lg text-white/60">{post.excerpt}</p>

        {/*
          Content is authored as HTML by trusted admins only (session-gated
          /admin panel), so it's rendered as-is rather than escaped/sanitized.
        */}
        <div className="gc-prose mt-10" dangerouslySetInnerHTML={{ __html: post.content }} />

        {post.tags?.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-amber/10 px-3 py-1 text-xs text-amber">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
