import Nav from "@/app/components/Nav";
import Gallery from "@/app/components/Gallery";
import Contact from "@/app/components/Contact";

export const metadata = {
  title: "Gallery",
  description:
    "Moments on the water with Crest Boats. View our luxury charters, scenic sunset cruises, and vibrant private gatherings.",
  openGraph: {
    title: "Gallery | Crest Boats",
    description:
      "Moments on the water with Crest Boats. View our luxury charters, scenic sunset cruises, and vibrant private gatherings.",
    url: "https://www.crestboats.online/gallery",
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
    title: "Gallery | Crest Boats",
    description:
      "Moments on the water with Crest Boats. View our luxury charters, scenic sunset cruises, and vibrant private gatherings.",
    images: ["/og-image.png"],
  },
};

export default function GalleryPage() {
  return (
    <>
      <Nav />
      <main>
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
