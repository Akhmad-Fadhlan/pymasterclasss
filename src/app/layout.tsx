import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PyMasterClass - Learn Python. Build Real Products.",
  description: "Platform belajar Python dari dasar hingga mahir melalui project nyata, AI Mentor, latihan interaktif, hingga deploy ke internet.",
  keywords: ["python", "learning path", "coding", "programming", "course", "belajar coding", "ai mentor"],
  authors: [{ name: "PyMasterClass Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F3F7FF] text-[#0F172A]">
        {children}
      </body>
    </html>
  );
}
