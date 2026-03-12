import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QUeryProvider from "./_providers/QueryProvider";
// import ProgressBarCustom from "@/components/ui/ProgressBarCustom";
import ProgressBarCustom from "@/components/ui/ProgressBarCustom";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App Home",
  description: "List of todo items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" />
        <ProgressBarCustom />
        <QUeryProvider>
          {children}
        </QUeryProvider>

      </body>
    </html>
  );
}
