import type { Metadata } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KoeLog（コエログ）- お客様の声管理ツール",
  description:
    "お客様の声の収集・承認・サイト表示をたった2分で。KoeLogで手作業から解放されましょう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${inter.variable} antialiased`}>
      <body className="overflow-hidden bg-[#FAFAFA] text-[#1A1A1A]" style={{ fontFamily: "var(--font-noto), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
