"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="gc-card rounded-xl p-8 text-center">
        <h3 className="gc-heading text-xl font-bold text-amber">Message sent!</h3>
        <p className="mt-2 text-white/70">Thanks for reaching out — we&apos;ll get back to you soon.</p>
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
          placeholder="Your name"
          className={inputClass}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          required
          type="email"
          placeholder="Your email"
          className={inputClass}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <input
        required
        placeholder="Subject"
        className={inputClass}
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      <textarea
        required
        rows={5}
        placeholder="Your message"
        className={inputClass}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-amber px-6 py-3 text-sm font-bold text-black hover:bg-amber-light disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && <p className="text-sm text-red-400">Something went wrong. Please try again.</p>}
    </form>
  );
}
