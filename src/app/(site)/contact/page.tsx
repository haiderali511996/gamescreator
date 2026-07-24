import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="Questions about a game, a partnership, or press? Send us a message."
      />
      <section className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
        <ContactForm />
        <p className="mt-8 text-center text-sm text-white/50">
          Prefer email? Reach us at{" "}
          <a href="mailto:hello@gamescreator.com" className="text-amber hover:text-amber-light">
            hello@gamescreator.com
          </a>
        </p>
      </section>
    </div>
  );
}
