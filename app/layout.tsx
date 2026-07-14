import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Today",
    template: "%s | Today",
  },
  description: "รู้ก่อน...ออกจากบ้าน",
  applicationName: "Today",
  keywords: [
    "Today",
    "วันนี้",
    "AI",
    "Traffic",
    "Weather",
    "Nearby",
    "Thailand",
  ],
  authors: [{ name: "SuddTeeN Technologies" }],
  creator: "SuddTeeN Technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}