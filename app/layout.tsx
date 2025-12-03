import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/util/cn.util";
import { Header } from "@/lib/components/layout";
import { CONTENT } from "@/lib/const";
import { Vazirmatn } from "next/font/google";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: CONTENT.APP_TITLE,
  description: CONTENT.APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={cn(
          vazirmatn.className,
          "antialiased main-container py-6"
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
