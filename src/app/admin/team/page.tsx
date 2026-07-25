"use client";

import AdminResourceManager from "@/components/admin/AdminResourceManager";

export default function AdminTeamPage() {
  return (
    <AdminResourceManager
      title="Team"
      apiPath="/api/admin/team"
      columns={["name", "role", "order"]}
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "role", label: "Role / Designation", type: "text", required: true },
        { name: "bio", label: "Bio", type: "textarea", required: true },
        { name: "photo", label: "Photo", type: "image" },
        { name: "order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
