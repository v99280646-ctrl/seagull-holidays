import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles.css";

import { DesktopHeader, Header } from "@/components/site/Header";
import { Footer, MobileFooterNav } from "@/components/site/Footer";
import { QueryProvider } from "@/components/site/QueryProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.seagulholidays.com"),
  title: "Seagull Holidays",
  description:
    "Customized Lakshadweep & Kerala holiday packages, island resorts, flights and tours with Seagull Holidays.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Seagull Holidays",
    description:
      "Customized Lakshadweep & Kerala holiday packages, island resorts, flights and tours with Seagull Holidays.",
    url: "https://www.seagulholidays.com",
    siteName: "Seagull Holidays",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <DesktopHeader />
            <Header />
            <main className="flex-1 pb-20 md:pb-0">{children}</main>
            <MobileFooterNav />
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
