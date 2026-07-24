"use client";

import { useState } from "react";

export default function SubmitGameForm() {
  const [form, setForm] = useState({
    studioName: "",
    contactEmail: "",
    gameTitle: "",
    gameDescription: "",
    links: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/submit-game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setForm({ studioName: "", contactEmail: "", gameTitle: "", gameDescription: "", links: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="gc-card rounded-xl p-8 text-center">
        <h3 className="gc-heading text-xl font-bold text-amber">Pitch received!</h3>
        <p className="mt-2 text-white/70">
          Thanks for submitting your game — our team reviews every pitch and will reach out if
          it&apos;s a fit.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-amber focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="gc-card space-y-4 rounded-xl p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Studio / your name"
          className={inputClass}
          value={form.studioName}
          onChange={(e) => setForm({ ...form, studioName: e.target.value })}
        />
        <input
          required
          type="email"
          placeholder="Contact email"
          className={inputClass}
          value={form.contactEmail}
          onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
        />
      </div>
      <input
        required
        placeholder="Game title"
        className={inputClass}
        value={form.gameTitle}
        onChange={(e) => setForm({ ...form, gameTitle: e.target.value })}
      />
      <textarea
        required
        rows={5}
        placeholder="Tell us about your game"
        className={inputClass}
        value={form.gameDescription}
        onChange={(e) => setForm({ ...form, gameDescription: e.target.value })}
      />
      <input
        placeholder="Pitch deck / trailer / build links (optional)"
        className={inputClass}
        value={form.links}
        onChange={(e) => setForm({ ...form, links: e.target.value })}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-amber px-6 py-3 text-sm font-bold text-black hover:bg-amber-light disabled:opacity-60"
      >
        {status === "loading" ? "Submitting..." : "Submit Game"}
      </button>
      {status === "error" && <p className="text-sm text-red-400">Something went wrong. Please try again.</p>}
    </form>
  );
}
