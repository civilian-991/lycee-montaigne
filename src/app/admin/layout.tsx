import type { Metadata } from "next";
import { SessionProvider } from "@/components/admin/session-provider";

export const metadata: Metadata = {
  title: {
    default: "Admin — Lycée Montaigne",
    template: "%s | Admin LM",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-background-alt">{children}</div>
    </SessionProvider>
  );
}
