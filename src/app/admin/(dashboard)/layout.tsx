import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl p-6 pt-16 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}
