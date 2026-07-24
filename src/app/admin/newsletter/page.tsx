"use client";

import { useEffect, useState } from "react";

interface Subscriber {
  _id: string;
  email: string;
  subscribedAt: string;
}

export default function AdminNewsletterPage() {
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/newsletter")
      .then((r) => r.json())
      .then((data) => {
        setSubs(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="gc-heading text-2xl font-bold text-white">Newsletter Subscribers</h1>
      <p className="mt-1 text-sm text-white/50">{subs.length} total subscribers</p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wider text-white/50">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Subscribed At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading ? (
              <tr>
                <td colSpan={2} className="px-4 py-6 text-center text-white/40">
                  Loading...
                </td>
              </tr>
            ) : subs.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-4 py-6 text-center text-white/40">
                  No subscribers yet.
                </td>
              </tr>
            ) : (
              subs.map((s) => (
                <tr key={s._id} className="text-white/80">
                  <td className="px-4 py-3">{s.email}</td>
                  <td className="px-4 py-3">{new Date(s.subscribedAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
