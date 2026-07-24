import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Vision" };

export default function VisionPage() {
  return (
    <div>
      <PageHero eyebrow="Our Vision" title="Games that outlast the hype cycle" />
      <section className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <div className="gc-card rounded-xl p-8">
          <p className="gc-heading text-2xl font-semibold text-amber">
            &ldquo;To be the studio players trust to deliver worlds worth returning to,
            and the partner developers trust to bring their vision to life.&rdquo;
          </p>
        </div>
        <div className="mt-10 space-y-6 text-white/75">
          <p>
            We see a future where independent studios can build ambitious, systemic, deeply
            replayable games without sacrificing the wellbeing of the people making them.
            Games Creator exists to prove that&apos;s possible &mdash; one shipped title at a
            time.
          </p>
          <p>
            Long term, we want Games Creator to be known for original universes that expand
            across sequels, spin-offs, and community-driven content, built on engines and
            pipelines we continuously invest in so every future project starts from a stronger
            foundation than the last.
          </p>
        </div>
      </section>
    </div>
  );
}
