import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import dbConnect from "@/lib/mongodb";
import CareerPosting, { ICareerPosting } from "@/models/CareerPosting";

export const metadata: Metadata = { title: "Careers" };
export const dynamic = "force-dynamic";

async function getPostings() {
  try {
    await dbConnect();
    return await CareerPosting.find({ active: true }).sort({ createdAt: -1 }).lean<ICareerPosting[]>();
  } catch {
    return [];
  }
}

export default async function CareerPage() {
  const postings = await getPostings();

  return (
    <div>
      <PageHero
        eyebrow="Join Us"
        title="Careers at Games Creator"
        subtitle="We're a small, focused team building original games. No crunch culture, real ownership of your work."
      />
      <section className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        {postings.length === 0 ? (
          <p className="text-center text-white/60">
            No open roles right now — send us your resume at{" "}
            <a href="mailto:careers@gamescreator.com" className="text-amber hover:text-amber-light">
              careers@gamescreator.com
            </a>{" "}
            and we&apos;ll keep you in mind.
          </p>
        ) : (
          <div className="space-y-4">
            {postings.map((job, i) => (
              <Reveal key={job._id.toString()} delay={i * 0.06} className="gc-card rounded-xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="gc-heading text-lg font-bold text-white">{job.title}</h2>
                  <span className="rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
                    {job.type}
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/50">
                  {job.department} · {job.location}
                </p>
                <p className="mt-3 text-sm text-white/70">{job.description}</p>
                {job.requirements?.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/60">
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                )}
                <a
                  href={job.applyLink || `mailto:${job.applyEmail || "careers@gamescreator.com"}`}
                  target={job.applyLink ? "_blank" : undefined}
                  rel={job.applyLink ? "noreferrer" : undefined}
                  className="mt-4 inline-block rounded-md bg-amber px-5 py-2 text-sm font-bold text-black hover:bg-amber-light"
                >
                  Apply Now
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
