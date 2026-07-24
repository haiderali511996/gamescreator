"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Logo from "./Logo";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/games", label: "Games" },
  { href: "/admin/careers", label: "Careers" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/submissions", label: "Submissions" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-white/10 bg-black p-6">
      <div className="mb-8">
        <Logo size={28} />
      </div>
      <nav className="flex-1 space-y-1">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
                active ? "bg-amber/10 text-amber" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="mt-6 rounded-md border border-white/15 px-3 py-2 text-sm font-medium text-white/70 hover:border-amber hover:text-amber"
      >
        Sign Out
      </button>
    </aside>
  );
}
