import Image from "next/image";

/** Small hexagonal "GC" mark only — used where space is tight (e.g. admin sidebar). */
export function LogoMark({ size = 48 }: { size?: number }) {
  return (
    <Image
      src="/images/logo-mark.png"
      alt="Games Creator"
      width={size}
      height={size}
      quality={100}
      className="rounded-md"
      priority
    />
  );
}

/** Full wordmark (mark + "GAMES CREATOR" text baked into the image, black background). */
export default function Logo({ size = 64 }: { size?: number }) {
  const height = size;
  const width = Math.round((height * 1254) / 727);

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
