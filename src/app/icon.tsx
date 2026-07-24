import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Generated favicon matching the real "Games Creator" hexagon GC mark.
 * Replace this file with a static public/favicon.ico (and remove this route)
 * once the real favicon asset is available on disk.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          borderRadius: 14,
        }}
      >
        <svg width="48" height="48" viewBox="0 0 100 100">
          <path d="M50 8 L50 92 L11 71 L11 29 Z" fill="#ffffff" />
          <path d="M50 8 L50 92 L89 71 L89 29 Z" fill="#f5a623" />
          <circle cx="50" cy="50" r="13" fill="#0a0a0a" />
          <circle cx="50" cy="50" r="9" fill="#f5a623" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
