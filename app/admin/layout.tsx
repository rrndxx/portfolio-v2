import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Portfolio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh bg-bg-void text-text-primary">{children}</div>
  );
}
