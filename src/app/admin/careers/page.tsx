"use client";

import AdminResourceManager from "@/components/admin/AdminResourceManager";

export default function AdminCareersPage() {
  return (
    <AdminResourceManager
      title="Careers"
      apiPath="/api/admin/careers"
      columns={["title", "department", "location", "type", "active"]}
      fields={[
        { name: "title", label: "Job Title", type: "text", required: true },
        { name: "department", label: "Department", type: "text", required: true },
        { name: "location", label: "Location", type: "text", required: true },
        {
          name: "type",
          label: "Employment Type",
          type: "select",
          options: ["Full-time", "Part-time", "Contract", "Remote"],
        },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "requirements", label: "Requirements (comma separated)", type: "tags" },
        { name: "applyEmail", label: "Apply Email", type: "text" },
        { name: "applyLink", label: "Apply Link", type: "text" },
        { name: "active", label: "Active", type: "checkbox" },
      ]}
    />
  );
}
