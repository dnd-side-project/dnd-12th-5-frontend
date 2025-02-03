import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/common/Header";

const pretendard = localFont({
  src: "./fonts/Pretendard.woff",
  variable: "--font-pretendard",
  weight: "100 900",
});
const nanumSquareRound = localFont({
  src: "./fonts/NanumSquareRound.ttf",
  variable: "--font-nanum-square-round",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Picktory",
  description: "마음을 전하는 가장 쉬운 방법, Picktory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* bg-gray-100 임시입니다 */}
      <body
        className={`${pretendard.variable} ${nanumSquareRound.variable} antialiased bg-gray-100`}
      >
        <div className="w-[375px] mx-auto bg-white min-h-screen flex flex-col relative">
          <Header />
          <div className="flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}
