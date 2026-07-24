import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SubmitGameForm from "@/components/SubmitGameForm";

export const metadata: Metadata = { title: "Submit Game" };

export default function SubmitGamePage() {
  return (
    <div>
      <PageHero
        eyebrow="Pitch Us"
        title="Submit Your Game"
        subtitle="Working on something great? We partner with indie studios on co-development, porting, and publishing."
      />
      <section className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
        <SubmitGameForm />
      </section>
    </div>
  );
}
