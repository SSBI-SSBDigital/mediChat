import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatLayout from "@/ChatLayout";

const inter = Inter({ weight: "400", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Bank statement analyzer",
  description: "Bank statement analyzer web aplication",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChatLayout>{children}</ChatLayout>
      </body>
    </html>
  );
}
