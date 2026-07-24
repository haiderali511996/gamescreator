"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="text-sm text-amber">Thanks — you&apos;re subscribed!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="w-full min-w-0 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-amber focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="shrink-0 rounded-md bg-amber px-4 py-2 text-sm font-bold text-black hover:bg-amber-light disabled:opacity-60"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-400">Something went wrong.</p>
      )}
    </form>
  );
}
