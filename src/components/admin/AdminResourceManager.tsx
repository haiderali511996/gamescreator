"use client";

import { useEffect, useState } from "react";
import { PLATFORM_OPTIONS } from "@/lib/platforms";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "checkbox"
  | "tags"
  | "select"
  | "date"
  | "image"
  | "gallery"
  | "html"
  | "platformLinks";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Item = Record<string, any>;

function emptyFromFields(fields: FieldConfig[]): Item {
  const obj: Item = {};
  for (const f of fields) {
    if (f.type === "checkbox") obj[f.name] = false;
    else if (f.type === "tags") obj[f.name] = "";
    else if (f.type === "select") obj[f.name] = f.options?.[0] ?? "";
    else if (f.type === "gallery") obj[f.name] = [];
    else if (f.type === "platformLinks") obj[f.name] = [];
    else obj[f.name] = "";
  }
  return obj;
}

export default function AdminResourceManager({
  title,
  apiPath,
  fields,
  columns,
}: {
  title: string;
  apiPath: string;
  fields: FieldConfig[];
  columns: string[];
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Item | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function uploadOne(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      // Server/proxy rejected the request before it reached our route handler
      // (e.g. a web-server upload size limit) — it returns an HTML error page,
      // not JSON, so surface a useful message instead of a JSON parse crash.
      throw new Error(
        `Upload failed (HTTP ${res.status}). The file may be too large for the server, ` +
          `or the upload was blocked before reaching the app.`
      );
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Upload failed (HTTP ${res.status})`);
    return data.url as string;
  }

  async function handleImageUpload(fieldName: string, file: File) {
    setUploadingField(fieldName);
    setUploadError(null);
    try {
      const url = await uploadOne(file);
      setEditing((prev) => (prev ? { ...prev, [fieldName]: url } : prev));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingField(null);
    }
  }

  async function handleGalleryUpload(fieldName: string, files: FileList) {
    setUploadingField(fieldName);
    setUploadError(null);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        urls.push(await uploadOne(file));
      }
      setEditing((prev) =>
        prev ? { ...prev, [fieldName]: [...(prev[fieldName] ?? []), ...urls] } : prev
      );
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingField(null);
    }
  }

  async function load() {
    setLoading(true);
    const res = await fetch(apiPath);
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetch(apiPath);
      if (!active) return;
      if (res.ok) setItems(await res.json());
      setLoading(false);
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openCreate() {
    setEditing(emptyFromFields(fields));
    setShowForm(true);
  }

  function openEdit(item: Item) {
    const formItem: Item = { ...item };
    for (const f of fields) {
      if (f.type === "tags" && Array.isArray(item[f.name])) {
        formItem[f.name] = item[f.name].join(", ");
      }
      if ((f.type === "gallery" || f.type === "platformLinks") && !Array.isArray(item[f.name])) {
        formItem[f.name] = [];
      }
    }
    setEditing(formItem);
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    await fetch(`${apiPath}/${id}`, { method: "DELETE" });
    load();
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;

    const payload: Item = { ...editing };
    for (const f of fields) {
      if (f.type === "tags" && typeof payload[f.name] === "string") {
        payload[f.name] = payload[f.name]
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);
      }
      if (f.type === "number") {
        payload[f.name] = Number(payload[f.name]) || 0;
      }
    }

    const id = editing._id;
    const url = id ? `${apiPath}/${id}` : apiPath;
    const method = id ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setShowForm(false);
    setEditing(null);
    load();
  }

  const inputClass =
    "w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-amber focus:outline-none";

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="gc-heading text-2xl font-bold text-white">{title}</h1>
        <button
          onClick={openCreate}
          className="rounded-md bg-amber px-4 py-2 text-sm font-bold text-black hover:bg-amber-light"
        >
          + New
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wider text-white/50">
            <tr>
              {columns.map((c) => (
                <th key={c} className="px-4 py-3">
                  {c}
                </th>
              ))}
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-6 text-center text-white/40">
                  Loading...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-6 text-center text-white/40">
                  No items yet.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="text-white/80">
                  {columns.map((c) => (
                    <td key={c} className="max-w-[220px] truncate px-4 py-3">
                      {Array.isArray(item[c]) ? item[c].join(", ") : String(item[c] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(item)} className="mr-3 text-amber hover:text-amber-light">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-300">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <form
            onSubmit={handleSave}
            className="max-h-[85vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-xl border border-amber/15 bg-neutral-950 p-6 shadow-2xl shadow-black/60"
          >
            <h2 className="gc-heading text-lg font-bold text-white">
              {editing._id ? "Edit" : "New"} {title.replace(/s$/, "")}
            </h2>
            {fields.map((f) => (
              <div key={f.name}>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-white/50">
                  {f.label}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    required={f.required}
                    rows={4}
                    className={inputClass}
                    value={editing[f.name] ?? ""}
                    onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                  />
                ) : f.type === "html" ? (
                  <div className="space-y-2">
                    <p className="text-xs text-white/40">
                      Write HTML (headings, &lt;p&gt;, &lt;strong&gt;, &lt;img&gt;, etc.) — it renders as-is on the site.
                    </p>
                    <textarea
                      required={f.required}
                      rows={12}
                      className={`${inputClass} font-mono text-xs`}
                      value={editing[f.name] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                    />
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70 hover:border-amber hover:text-amber">
                      {uploadingField === f.name ? "Uploading…" : "+ Insert Image"}
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploadingField(f.name);
                          setUploadError(null);
                          try {
                            const url = await uploadOne(file);
                            setEditing((prev) =>
                              prev
                                ? { ...prev, [f.name]: `${prev[f.name] ?? ""}\n<img src="${url}" alt="" />\n` }
                                : prev
                            );
                          } catch (err) {
                            setUploadError(err instanceof Error ? err.message : "Upload failed");
                          } finally {
                            setUploadingField(null);
                          }
                        }}
                      />
                    </label>
                    {uploadError && uploadingField === null && (
                      <p className="text-xs text-red-400">{uploadError}</p>
                    )}
                  </div>
                ) : f.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    checked={!!editing[f.name]}
                    onChange={(e) => setEditing({ ...editing, [f.name]: e.target.checked })}
                    className="h-5 w-5 accent-amber"
                  />
                ) : f.type === "select" ? (
                  <select
                    className={inputClass}
                    value={editing[f.name] ?? ""}
                    onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                  >
                    {f.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : f.type === "image" ? (
                  <div className="space-y-2">
                    {editing[f.name] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={editing[f.name]}
                        alt=""
                        className="h-32 w-32 rounded-lg border border-white/10 object-cover"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                      className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white file:mr-3 file:rounded file:border-0 file:bg-amber file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-black"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(f.name, file);
                      }}
                    />
                    {uploadingField === f.name && (
                      <p className="text-xs text-amber">Uploading…</p>
                    )}
                    {uploadError && uploadingField === null && (
                      <p className="text-xs text-red-400">{uploadError}</p>
                    )}
                    <input
                      type="text"
                      placeholder="or paste an image URL"
                      className={inputClass}
                      value={editing[f.name] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                    />
                  </div>
                ) : f.type === "gallery" ? (
                  <div className="space-y-2">
                    {Array.isArray(editing[f.name]) && editing[f.name].length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {editing[f.name].map((url: string, idx: number) => (
                          <div key={`${url}-${idx}`} className="group relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={url}
                              alt=""
                              className="h-20 w-20 rounded-lg border border-white/10 object-cover"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setEditing((prev) =>
                                  prev
                                    ? { ...prev, [f.name]: prev[f.name].filter((_: string, i: number) => i !== idx) }
                                    : prev
                                )
                              }
                              className="absolute -right-1.5 -top-1.5 hidden h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white group-hover:flex"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70 hover:border-amber hover:text-amber">
                      {uploadingField === f.name ? "Uploading…" : "+ Add Images (unlimited)"}
                      <input
                        type="file"
                        multiple
                        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            handleGalleryUpload(f.name, e.target.files);
                          }
                          e.target.value = "";
                        }}
                      />
                    </label>
                    {uploadingField === f.name && <p className="text-xs text-amber">Uploading…</p>}
                    {uploadError && uploadingField === null && (
                      <p className="text-xs text-red-400">{uploadError}</p>
                    )}
                  </div>
                ) : f.type === "platformLinks" ? (
                  <div className="max-h-72 space-y-3 overflow-y-auto rounded-md border border-white/10 p-3">
                    {PLATFORM_OPTIONS.map((platform) => {
                      const list: { platform: string; url?: string }[] = Array.isArray(editing[f.name])
                        ? editing[f.name]
                        : [];
                      const entry = list.find((p) => p.platform === platform);
                      const checked = !!entry;
                      return (
                        <div key={platform}>
                          <label className="flex items-center gap-2 text-sm text-white/80">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                const next = e.target.checked
                                  ? [...list, { platform, url: "" }]
                                  : list.filter((p) => p.platform !== platform);
                                setEditing({ ...editing, [f.name]: next });
                              }}
                              className="h-4 w-4 accent-amber"
                            />
                            {platform}
                          </label>
                          {checked && (
                            <input
                              type="text"
                              placeholder={`${platform} store/game URL (optional)`}
                              className={`${inputClass} mt-1`}
                              value={entry?.url ?? ""}
                              onChange={(e) => {
                                const next = list.map((p) =>
                                  p.platform === platform ? { ...p, url: e.target.value } : p
                                );
                                setEditing({ ...editing, [f.name]: next });
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <input
                    required={f.required}
                    type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                    className={inputClass}
                    value={editing[f.name] ?? ""}
                    onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                  />
                )}
              </div>
            ))}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/70 hover:border-white/40"
              >
                Cancel
              </button>
              <button type="submit" className="rounded-md bg-amber px-4 py-2 text-sm font-bold text-black hover:bg-amber-light">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
