"use client";

import AdminResourceManager from "@/components/admin/AdminResourceManager";

export default function AdminGamesPage() {
  return (
    <AdminResourceManager
      title="Games"
      apiPath="/api/admin/games"
      columns={["title", "slug", "status", "platform"]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "slug", label: "Slug", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "coverImage", label: "Cover Image URL", type: "text" },
        { name: "platform", label: "Platforms (comma separated)", type: "tags" },
        { name: "genre", label: "Genres (comma separated)", type: "tags" },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: ["In Development", "Coming Soon", "Released"],
        },
        { name: "trailerUrl", label: "Trailer URL", type: "text" },
      ]}
    />
  );
}
