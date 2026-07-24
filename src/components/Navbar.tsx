"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";

const menuGroups = [
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/vision", label: "Vision" },
      { href: "/mission", label: "Mission" },
      { href: "/team", label: "Team" },
      { href: "/career", label: "Careers" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { href: "/games", label: "Games" },
      { href: "/blogs", label: "Blogs" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
    ],
  },
];

const directLinks = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" onClick={() => setMobileOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {directLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/80 transition hover:text-amber"
            >
              {l.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button className="text-sm font-medium text-white/80 transition hover:text-amber">
              More ▾
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-4"
                >
                  <div className="gc-card grid grid-cols-3 gap-6 rounded-xl p-6 shadow-2xl shadow-black/60">
                    {menuGroups.map((group) => (
                      <div key={group.heading}>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-amber">
                          {group.heading}
                        </p>
                        <ul className="space-y-2">
                          {group.links.map((l) => (
                            <li key={l.href}>
                              <Link
                                href={l.href}
                                className="text-sm text-white/80 transition hover:text-amber"
                              >
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/submit-game"
            className="hidden rounded-md bg-amber px-4 py-2 text-sm font-bold text-black transition hover:scale-105 hover:bg-amber-light lg:inline-block"
          >
            Submit Game
          </Link>
          <button
            className="text-white lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-black px-4 py-4 lg:hidden">
          <Link
            href="/submit-game"
            onClick={() => setMobileOpen(false)}
            className="mb-4 block rounded-md bg-amber px-4 py-2 text-center text-sm font-bold text-black"
          >
            Submit Game
          </Link>
          {menuGroups.map((group) => (
            <div key={group.heading} className="mb-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber">
                {group.heading}
              </p>
              <ul className="space-y-2">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm text-white/80"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
