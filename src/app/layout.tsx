import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";

import "./globals.css";

import Header from "@/layout/Header";
import { Toaster } from "@/components/ui/toaster";
import PageTransition from "@/app/PageTransition";

import { Providers } from "./providers";

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
  icons: {
    icon: [
      { rel: "icon", url: "/favicon/favicon-16x16.png", sizes: "16x16" },
      { rel: "icon", url: "/favicon/favicon-32x32.png", sizes: "32x32" },
      { rel: "icon", url: "/favicon/favicon-96x396.png", sizes: "96x96" },
      { rel: "icon", url: "/favicon/favicon-128x128.png", sizes: "128x128" },
      { rel: "icon", url: "/favicon/favicon-192x192.png", sizes: "192x192" },
    ],
  },
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
            <PageTransition>
              <Header />
              <Providers>
                <div
                  className="flex-grow"
                  style={{ height: "calc(100vh - 56px)" }}
                >
                  {children}
                </div>
                <Toaster />
              </Providers>
            </PageTransition>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
