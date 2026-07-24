"use client";

import { useEffect, useState } from "react";

interface GameSubmission {
  _id: string;
  studioName: string;
  contactEmail: string;
  gameTitle: string;
  gameDescription: string;
  links?: string;
  status: string;
  createdAt: string;
}

interface ContactMsg {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminSubmissionsPage() {
  const [games, setGames] = useState<GameSubmission[]>([]);
  const [contacts, setContacts] = useState<ContactMsg[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/submissions")
      .then((r) => r.json())
      .then((data) => {
        setGames(data.games ?? []);
        setContacts(data.contacts ?? []);
        setLoading(false);
      });
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/submissions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setGames((prev) => prev.map((g) => (g._id === id ? { ...g, status } : g)));
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="gc-heading text-2xl font-bold text-white">Game Submissions</h1>
        <div className="mt-6 space-y-4">
          {loading ? (
            <p className="text-white/40">Loading...</p>
          ) : games.length === 0 ? (
            <p className="text-white/40">No game submissions yet.</p>
          ) : (
            games.map((g) => (
              <div key={g._id} className="gc-card rounded-xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="gc-heading font-bold text-white">
                    {g.gameTitle} <span className="text-white/40">— {g.studioName}</span>
                  </h3>
                  <select
                    value={g.status}
                    onChange={(e) => updateStatus(g._id, e.target.value)}
                    className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-xs text-white"
                  >
                    <option>New</option>
                    <option>Reviewed</option>
                    <option>Contacted</option>
                  </select>
                </div>
                <p className="mt-1 text-xs text-white/40">{g.contactEmail}</p>
                <p className="mt-2 text-sm text-white/70">{g.gameDescription}</p>
                {g.links && <p className="mt-2 text-xs text-amber">{g.links}</p>}
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h2 className="gc-heading text-2xl font-bold text-white">Contact Messages</h2>
        <div className="mt-6 space-y-4">
          {loading ? (
            <p className="text-white/40">Loading...</p>
          ) : contacts.length === 0 ? (
            <p className="text-white/40">No contact messages yet.</p>
          ) : (
            contacts.map((c) => (
              <div key={c._id} className="gc-card rounded-xl p-5">
                <h3 className="gc-heading font-bold text-white">{c.subject}</h3>
                <p className="mt-1 text-xs text-white/40">
                  {c.name} · {c.email}
                </p>
                <p className="mt-2 text-sm text-white/70">{c.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
