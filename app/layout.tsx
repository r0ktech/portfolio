import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import CommandPalette from "@/components/CommandPalette";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const title = "Raphael Okeke, Full-Stack Developer";
const description =
  "Full-stack developer who ships whole products: Next.js interfaces and the Node/Postgres APIs behind them.";

// Absolute base for OG/Twitter image URLs. Vercel sets the production host automatically.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: "Raphael Okeke" }],
  keywords: [
    "Raphael Okeke",
    "full-stack developer",
    "Next.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "Nigeria",
  ],
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f2f2f2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[var(--z-loader)] focus:rounded-[var(--radius)] focus:bg-[var(--color-signal)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--color-on-signal)]"
        >
          Skip to content
        </a>
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
