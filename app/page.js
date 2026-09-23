import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import Fleet from "@/app/components/Fleet";
import Trips from "@/app/components/Trips";
import Gallery from "@/app/components/Gallery";
import Testimonials from "@/app/components/Testimonials";
import Faqs from "@/app/components/Faqs";
import Contact from "@/app/components/Contact";

export const metadata = {
  title: "Private Boat Charters & Jet Ski Rentals in Lagos",
  description:
    "Private boat charters and jet ski rentals across Lagos waterways — celebrations, quiet escapes, sunset cruises.",
  openGraph: {
    title: "Private Boat Charters & Jet Ski Rentals in Lagos | Crest Boats",
    description:
      "Private boat charters and jet ski rentals across Lagos waterways — celebrations, quiet escapes, sunset cruises.",
    url: "https://www.crestboats.online",
    siteName: "Crest Boats",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Crest Boats — Private Boat Charters & Jet Ski Rentals in Lagos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crest Boats | Private Boat Charters & Jet Ski Rentals in Lagos",
    description:
      "Private boat charters and jet ski rentals across Lagos waterways — celebrations, quiet escapes, sunset cruises.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Fleet />
        <Trips />
        <Gallery />
        <Testimonials />
        <Faqs />
        <Contact />
      </main>
    </>
  );
}
