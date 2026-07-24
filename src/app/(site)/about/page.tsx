import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "About Us" };

const values = [
  { title: "Player First", body: "Every system, every level, every line of code exists to serve the moment-to-moment feeling of play." },
  { title: "Craft Over Speed", body: "We'd rather ship a smaller game that feels incredible than a big one that feels average." },
  { title: "Honest Studio Culture", body: "Sustainable crunch-free schedules, transparent roadmaps, and a team that trusts each other." },
  { title: "Own Our Worlds", body: "We build original IP we believe in, and we defend the creative vision behind it." },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title="A small studio making a big noise"
        subtitle="Games Creator was founded by a handful of developers who wanted to build the games they always wished existed."
      />
      <section className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <div className="space-y-6 text-white/75">
          <p>
            Games Creator started in a shared apartment with three laptops, one game engine
            license, and a stubborn belief that small teams can make big games if they focus
            relentlessly on craft. Since then we&apos;ve grown into a full studio spanning
            design, engineering, art, audio, and production &mdash; but the founding mindset
            hasn&apos;t changed.
          </p>
          <p>
            We build original titles, co-develop with partner studios, and help publishers
            bring ambitious games across the finish line. Whatever the project, our approach is
            the same: prototype fast, cut what doesn&apos;t serve the fun, and polish what does.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="gc-card rounded-xl p-6">
              <h3 className="gc-heading text-lg font-bold text-amber">{v.title}</h3>
              <p className="mt-2 text-sm text-white/70">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
