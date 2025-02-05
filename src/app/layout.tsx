import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/layout/Header";
import { Suspense } from "react";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 200 300 400 500 600 700 800 900",
});
const nanumSquareRound = localFont({
  src: "./fonts/NanumSquareRound.ttf",
  variable: "--font-nanum-square-round",
  weight: "100 200 300 400 500 600 700 800 900",
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
      <body
        className={`${pretendard.variable} ${nanumSquareRound.variable} antialiased bg-white`}
      >
        <div className="max-w-[430px] min-w-[375px] mx-auto bg-white min-h-screen flex flex-col relative">
          <Suspense>
            <Header />
            <div className="flex-grow" style={{ height: "calc(100vh - 56px)" }}>
              {children}
            </div>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
