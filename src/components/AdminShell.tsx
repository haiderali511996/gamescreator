"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <div className="flex-1 overflow-x-auto p-8">{children}</div>
    </div>
  );
}
