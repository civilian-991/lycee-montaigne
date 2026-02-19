import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import type { Role } from "@/lib/permissions";

const ROLE_LABELS: Record<Role, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  EDITOR: "Editeur",
};

const ROLE_COLORS: Record<Role, string> = {
  SUPER_ADMIN: "bg-red-100 text-red-700",
  ADMIN: "bg-blue-100 text-blue-700",
  EDITOR: "bg-green-100 text-green-700",
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const role = (session.user.role ?? "EDITOR") as Role;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl p-6 pt-16 lg:pt-6">
          <div className="mb-4 flex items-center justify-end gap-2">
            <span className="text-sm text-text-muted">{session.user.name}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_COLORS[role]}`}>
              {ROLE_LABELS[role]}
            </span>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
