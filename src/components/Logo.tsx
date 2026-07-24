import Image from "next/image";

/** Small hexagonal "GC" mark only — used where space is tight (e.g. admin sidebar). Transparent background. */
export function LogoMark({ size = 48 }: { size?: number }) {
  return (
    <Image
      src="/images/logo-mark.png"
      alt="Games Creator"
      width={size}
      height={size}
      quality={100}
      priority
    />
  );
}

/** Full wordmark (mark + "GAMES CREATOR" text baked into the image, transparent background). */
export default function Logo({ size = 64 }: { size?: number }) {
  const height = size;
  const width = Math.round((height * 1100) / 365);

  return (
    <Image
      src="/images/logo-wordmark.png"
      alt="Games Creator"
      width={width}
      height={height}
      quality={100}
      priority
      className="select-none"
    />
  );
}
