import Link from "next/link";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";

const columns = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/vision", label: "Vision" },
      { href: "/mission", label: "Mission" },
      { href: "/team", label: "Team" },
      { href: "/career", label: "Careers" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/games", label: "Games" },
      { href: "/blogs", label: "Blogs" },
      { href: "/submit-game", label: "Submit Game" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-white/60">
              Games Creator is a game development studio crafting immersive worlds and
              unforgettable play across PC, console, and mobile.
            </p>
            <div className="mt-6 max-w-sm">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber">
                Newsletter
              </p>
              <NewsletterForm />
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-amber">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/60 hover:text-amber">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Games Creator. All rights reserved.</p>
          <p>Built with Next.js &amp; MongoDB.</p>
        </div>
      </div>
    </footer>
  );
}
