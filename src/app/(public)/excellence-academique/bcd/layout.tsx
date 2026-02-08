import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BCD",
};

export default function BCDLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
