import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/util/cn.util";
import { Header } from "@/lib/components/layout";
import { Vazirmatn } from "next/font/google";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "اسنپ شاپ",
  description: "فروشگاه اینترنتی اسنپ شاپ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={cn(vazirmatn.className, "antialiased container mx-auto p-6 min-w-[320px]")}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
