import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Mission" };

const pillars = [
  { title: "Build", body: "Design and ship original games with strong, replayable core loops." },
  { title: "Partner", body: "Co-develop and publish with studios who need our engineering and art depth." },
  { title: "Grow", body: "Invest in tools, pipelines, and people so every project ships faster and better than the last." },
  { title: "Give Back", body: "Mentor new game developers and support the communities that play our games." },
];

export default function MissionPage() {
  return (
    <div>
      <PageHero eyebrow="Our Mission" title="Why we come to work every day" />
      <section className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <p className="text-lg text-white/75">
          Our mission is to design, build, and publish games that respect players&apos; time and
          intelligence &mdash; while running a studio that respects the people who make them.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="gc-card rounded-xl p-6">
              <h3 className="gc-heading text-lg font-bold text-amber">{p.title}</h3>
              <p className="mt-2 text-sm text-white/70">{p.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
