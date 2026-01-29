import "./globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import Provider from "./_trpc/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To-Do",
  description: "A simple but well-structured To-Do application built to demonstrate end-to-end type safety, modern full-stack architecture, and clean code practices using Next.js, tRPC, and Prisma.",
  keywords: ["typescript, nextjs, trpc, prisma, fullstack, portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", geistSans.variable, geistMono.variable)}>
        <Provider>
            {children}
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
