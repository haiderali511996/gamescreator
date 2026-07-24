"use client";

import AdminResourceManager from "@/components/admin/AdminResourceManager";

export default function AdminBlogsPage() {
  return (
    <AdminResourceManager
      title="Blogs"
      apiPath="/api/admin/blogs"
      columns={["title", "slug", "author", "published"]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "slug", label: "Slug", type: "text", required: true },
        { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
        { name: "content", label: "Content", type: "textarea", required: true },
        { name: "coverImage", label: "Cover Image URL", type: "text" },
        { name: "author", label: "Author", type: "text", required: true },
        { name: "tags", label: "Tags (comma separated)", type: "tags" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
