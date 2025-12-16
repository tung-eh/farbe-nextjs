import { type Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName, createClient } from "@/prismicio";

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

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title,
    description: settings.data.meta_description,
    openGraph: {
      title: settings.data.site_title ?? undefined,
      description: settings.data.meta_description ?? undefined,
      images: [{ url: settings.data.meta_image.url ?? "" }],
    },
  };
}
