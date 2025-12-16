import { PrismicPreview } from "@prismicio/next";
import { repositoryName, createClient } from "@/prismicio";
import { Inter, Geist_Mono } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  fallback: ["sans-serif"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  fallback: ["monospace"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body>
        <div>{JSON.stringify(settings)}</div>
        {children}
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
