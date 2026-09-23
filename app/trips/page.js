import Nav from "@/app/components/Nav";
import Trips from "@/app/components/Trips";
import Contact from "@/app/components/Contact";

export const metadata = {
  title: "Destinations & Trips",
  description:
    "Discover premier Lagos boat cruise destinations.",
  openGraph: {
    title: "Destinations & Trips | Crest Boats",
    description:
      "Discover premier Lagos boat cruise destinations.",
    url: "https://www.crestboats.online/trips",
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
    title: "Destinations & Trips | Crest Boats",
    description:
      "Discover premier Lagos boat cruise destinations.",
    images: ["/og-image.png"],
  },
};

export default function TripsPage() {
  return (
    <>
      <Nav />
      <main>
        <Trips />
        <Contact />
      </main>
    </>
  );
}
