import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import MusicToggle from "@/components/MusicToggle";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
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
  "Full-stack developer who ships whole products: Next.js interfaces, Node/Postgres APIs, and the ML models behind them. Based in Awka, Nigeria.";

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
    "machine learning",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0c" },
  ],
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  } catch (e) {}
  try {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && sessionStorage.getItem('intro-seen') !== '1') {
      document.documentElement.setAttribute('data-intro', 'playing');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[var(--z-loader)] focus:rounded-[var(--radius)] focus:bg-[var(--color-signal)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--color-on-signal)]"
        >
          Skip to content
        </a>
        <LoadingScreen />
        {children}
        <MusicToggle />
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
