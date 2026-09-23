import Nav from "@/app/components/Nav";
import Fleet from "@/app/components/Fleet";
import Contact from "@/app/components/Contact";

export const metadata = {
  title: "The Fleet",
  description:
    "Explore our Lagos charter fleet, from intimate 10-seater cruisers and lively celebration vessels to high-speed jet skis.",
  openGraph: {
    title: "The Fleet | Crest Boats",
    description:
      "Explore our Lagos charter fleet, from intimate 10-seater cruisers and lively celebration vessels to high-speed jet skis.",
    url: "https://www.crestboats.online/fleet",
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
    title: "The Fleet | Crest Boats",
    description:
      "Explore our Lagos charter fleet, from intimate 10-seater cruisers and lively celebration vessels to high-speed jet skis.",
    images: ["/og-image.png"],
  },
};

export default function FleetPage() {
  return (
    <>
      <Nav />
      <main>
        <Fleet />
        <Contact />
      </main>
    </>
  );
}
