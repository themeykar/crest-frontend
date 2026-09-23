import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.crestboats.online"),
  title: {
    default: "Crest Boats | Private Boat Charters & Jet Ski Rentals in Lagos",
    template: "%s | Crest Boats",
  },
  description:
    "Private boat charters and jet ski rentals across Lagos waterways — celebrations, quiet escapes, sunset cruises.",
  openGraph: {
    title: "Crest Boats | Private Boat Charters & Jet Ski Rentals in Lagos",
    description:
      "Private boat charters and jet ski rentals across Lagos waterways — celebrations, quiet escapes, sunset cruises.",
    url: "https://www.crestboats.online",
    siteName: "Crest Boats",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Crest Boats — Private Boat Charters & Jet Ski Rentals in Lagos",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crest Boats | Private Boat Charters & Jet Ski Rentals in Lagos",
    description:
      "Private boat charters and jet ski rentals across Lagos waterways — celebrations, quiet escapes, sunset cruises.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", sizes: "192x192", type: "image/png", url: "/icon-192.png" },
      { rel: "icon", sizes: "512x512", type: "image/png", url: "/icon-512.png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
