import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VÕ SPORT – Cửa hàng Võ phục & Phụ kiện Võ thuật Chính hãng",
  description:
    "Chuyên võ phục Vovinam, Taekwondo, Karate, Võ Cổ Truyền. Tư vấn chọn size thông minh, in thêu tên theo yêu cầu, đặt đồng phục võ đường B2B2C.",
  keywords: [
    "võ phục vovinam",
    "võ phục taekwondo",
    "võ phục karate",
    "võ phục cổ truyền",
    "đai võ thuật",
    "tư vấn size võ phục",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
