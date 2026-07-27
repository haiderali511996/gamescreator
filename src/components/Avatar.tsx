/** Shows the uploaded team photo when set, otherwise an initials-based placeholder. */
export default function Avatar({
  name,
  photo,
  size = 80,
}: {
  name: string;
  photo?: string;
  size?: number;
}) {
  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- photo may be an arbitrary external URL
      <img
        src={photo}
        alt={name}
        style={{ width: size, height: size }}
        className="rounded-full border-2 border-amber/40 object-cover"
      />
    );
  }

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.28 }}
      className="flex items-center justify-center rounded-full border-2 border-amber/40 bg-gradient-to-br from-white/10 to-amber/10 font-bold text-amber"
    >
      {initials}
    </div>
  );
}
