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

const site = getSiteConfig();

export const metadata: Metadata = {
  title: `${site.name.startsWith("TODO") ? site.role : site.name} — Portfolio`,
  description: `${site.role} based in ${site.location}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
