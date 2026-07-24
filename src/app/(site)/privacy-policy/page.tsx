import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="Last updated: July 24, 2026" />
      <section className="mx-auto max-w-3xl space-y-8 px-4 py-16 text-white/75 lg:px-8">
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">1. Introduction</h2>
          <p className="mt-2">
            Games Creator (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your
            privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website, play our games, or otherwise interact
            with us.
          </p>
        </div>
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">2. Information We Collect</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Contact information you submit through forms (name, email, message content).</li>
            <li>Newsletter subscription email addresses.</li>
            <li>Game submission details you provide via our Submit Game form.</li>
            <li>Job application information submitted for open roles.</li>
            <li>Usage data such as pages visited, device/browser type, and approximate location, collected via cookies and analytics tools.</li>
          </ul>
        </div>
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">3. How We Use Information</h2>
          <p className="mt-2">
            We use collected information to respond to inquiries, send newsletters you&apos;ve
            opted into, evaluate game submissions and job applications, improve our website and
            games, and comply with legal obligations. We do not sell your personal information.
          </p>
        </div>
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">4. Cookies</h2>
          <p className="mt-2">
            We use cookies and similar technologies to remember preferences and understand how
            visitors use our site. You can control cookies through your browser settings;
            disabling them may limit some site functionality.
          </p>
        </div>
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">5. Data Sharing</h2>
          <p className="mt-2">
            We share information only with service providers who help us operate our website
            and communications (such as hosting and email delivery providers), and only to the
            extent necessary for them to perform those services, or where required by law.
          </p>
        </div>
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">6. Data Retention &amp; Security</h2>
          <p className="mt-2">
            We retain personal data only as long as necessary for the purposes described above
            and apply reasonable technical and organizational measures to protect it. No method
            of transmission or storage is 100% secure.
          </p>
        </div>
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">7. Your Rights</h2>
          <p className="mt-2">
            Depending on your location, you may have the right to access, correct, delete, or
            export your personal data, or to withdraw consent for communications such as our
            newsletter at any time.
          </p>
        </div>
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">8. Children&apos;s Privacy</h2>
          <p className="mt-2">
            Our games and website are not directed at children under 13, and we do not
            knowingly collect personal information from children under 13.
          </p>
        </div>
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">9. Contact Us</h2>
          <p className="mt-2">
            Questions about this policy can be sent via our{" "}
            <a href="/contact" className="text-amber hover:text-amber-light">
              Contact page
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
