import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div>
      <PageHero eyebrow="Legal" title="Terms of Service" subtitle="Last updated: July 24, 2026" />
      <section className="mx-auto max-w-3xl space-y-8 px-4 py-16 text-white/75 lg:px-8">
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">1. Acceptance of Terms</h2>
          <p className="mt-2">
            By accessing or using the Games Creator website, submitting a game pitch, applying
            for a role, or otherwise interacting with our services, you agree to be bound by
            these Terms of Service.
          </p>
        </div>
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">2. Use of the Website</h2>
          <p className="mt-2">
            You agree to use this website only for lawful purposes and not to attempt to
            disrupt its operation, gain unauthorized access to any system, or submit false or
            misleading information through our forms.
          </p>
        </div>
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">3. Intellectual Property</h2>
          <p className="mt-2">
            All content on this site &mdash; including game titles, artwork, logos, and text
            &mdash; is the property of Games Creator or its licensors and is protected by
            copyright and trademark law. You may not reproduce or distribute it without
            permission.
          </p>
        </div>
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">4. Game Submissions</h2>
          <p className="mt-2">
            Submitting a game pitch through our Submit Game form does not create any
            partnership, publishing, or funding obligation. We review submissions at our
            discretion and will contact you directly if there is interest.
          </p>
        </div>
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">5. Third-Party Links</h2>
          <p className="mt-2">
            Our site may link to third-party websites, including game storefronts. We are not
            responsible for the content or practices of third-party sites.
          </p>
        </div>
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">6. Disclaimer &amp; Limitation of Liability</h2>
          <p className="mt-2">
            This website and its content are provided &ldquo;as is&rdquo; without warranties of
            any kind. To the fullest extent permitted by law, Games Creator will not be liable
            for any indirect, incidental, or consequential damages arising from your use of the
            site.
          </p>
        </div>
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">7. Changes to These Terms</h2>
          <p className="mt-2">
            We may update these Terms from time to time. Continued use of the site after
            changes are posted constitutes acceptance of the revised Terms.
          </p>
        </div>
        <div>
          <h2 className="gc-heading text-xl font-bold text-white">8. Contact</h2>
          <p className="mt-2">
            Questions about these Terms can be sent via our{" "}
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
