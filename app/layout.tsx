import type { Metadata } from "next";
import { Big_Shoulders, Chakra_Petch, Inter } from "next/font/google";
import { VerticalNavRail } from "@/components/nav/VerticalNavRail";
import { getSiteConfig } from "@/lib/content";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-chakra-petch",
  display: "swap",
});

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-big-shoulders",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  return {
    title: `${site.name.startsWith("TODO") ? site.role : site.name}`,
    description: `${site.role} based in ${site.location}`,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSiteConfig();

  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${bigShoulders.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg-void font-sans text-text-primary">
        <VerticalNavRail items={site.navItems} />
        {children}
      </body>
    </html>
  );
}
