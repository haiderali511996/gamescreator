export default function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="gc-scanline-bg border-b border-white/10 px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber">
          {eyebrow}
        </p>
        <h1 className="gc-heading text-4xl font-bold text-white sm:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-white/70">{subtitle}</p>}
      </div>
    </section>
  );
}
