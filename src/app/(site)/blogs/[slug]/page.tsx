import Link from "next/link";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import BlogPost, { IBlogPost } from "@/models/BlogPost";

export const dynamic = "force-dynamic";

async function getPost(slug: string) {
  try {
    await dbConnect();
    return await BlogPost.findOne({ slug, published: true }).lean<IBlogPost>();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return { title: post?.title ?? "Blog Post" };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
      <Link href="/blogs" className="text-sm text-amber hover:text-amber-light">
        ← Back to Blog
      </Link>
      <p className="mt-6 text-xs uppercase tracking-wider text-white/40">
        {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString()} · By {post.author}
      </p>
      <h1 className="gc-heading mt-2 text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
      <div className="mt-8 whitespace-pre-line text-white/75">{post.content}</div>
      {post.tags?.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-amber/10 px-3 py-1 text-xs text-amber">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
