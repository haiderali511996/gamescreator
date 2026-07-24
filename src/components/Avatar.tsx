/** Initials-based placeholder avatar — no external image dependency. Editable via admin panel once real photos exist. */
export default function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber/40 bg-gradient-to-br from-white/10 to-amber/10 text-xl font-bold text-amber">
      {initials}
    </div>
  );
}
