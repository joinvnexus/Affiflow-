// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// @ts-ignore: side-effect import for global CSS declarations may be missing
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AffiFlow - Affiliate Marketing Platform",
  description: "Promote products and earn commission easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}