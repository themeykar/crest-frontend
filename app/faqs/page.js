import Nav from "@/app/components/Nav";
import Faqs from "@/app/components/Faqs";
import Contact from "@/app/components/Contact";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about charter bookings, onboard food and drinks, cruise durations, and capacity with Crest Boats.",
  openGraph: {
    title: "Frequently Asked Questions | Crest Boats",
    description:
      "Find answers to common questions about charter bookings, onboard food and drinks, cruise durations, and capacity with Crest Boats.",
    url: "https://www.crestboats.online/faqs",
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
    title: "Frequently Asked Questions | Crest Boats",
    description:
      "Find answers to common questions about charter bookings, onboard food and drinks, cruise durations, and capacity with Crest Boats.",
    images: ["/og-image.png"],
  },
};

export default function FaqsPage() {
  return (
    <>
      <Nav />
      <main>
        <Faqs />
        <Contact />
      </main>
    </>
  );
}
