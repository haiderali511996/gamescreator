/**
 * Placeholder logo built in CSS/SVG to match the real "Games Creator" brand mark
 * (white/amber hexagonal "GC" monogram). Once the real logo/favicon files are
 * available, drop them at public/images/logo.png and public/images/logo-mark.png
 * and swap the <LogoMark /> / <Logo /> internals below for an <Image> tag —
 * every call site (Navbar, Footer, admin) stays the same.
 */

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polygon
        points="50,4 93,27 93,73 50,96 7,73 7,27"
        fill="#0a0a0a"
        stroke="#f5a623"
        strokeWidth="2"
      />
      <path d="M50 8 L50 92 L11 71 L11 29 Z" fill="#ffffff" opacity="0.95" />
      <path d="M50 8 L50 92 L89 71 L89 29 Z" fill="#f5a623" />
      <circle cx="50" cy="50" r="13" fill="#0a0a0a" />
      <circle cx="50" cy="50" r="9" fill="#f5a623" />
    </svg>
  );
}

export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2 select-none">
      <LogoMark size={size} />
      <span className="gc-heading text-xl font-bold leading-none tracking-wide">
        <span className="text-white">GAMES</span>{" "}
        <span className="text-amber">CREATOR</span>
      </span>
    </span>
  );
}
