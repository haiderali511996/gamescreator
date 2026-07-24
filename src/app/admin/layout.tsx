import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import AdminShell from "@/components/AdminShell";

export const metadata = { title: "Admin | Games Creator" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProviderWrapper>
      <AdminShell>{children}</AdminShell>
    </SessionProviderWrapper>
  );
}
