import Nav from "@/app/components/Nav";
import Testimonials from "@/app/components/Testimonials";
import Contact from "@/app/components/Contact";

export const metadata = {
  title: "Testimonials & Reviews",
  description:
    "Read real stories and guest reviews from celebrations, coastal getaways, and corporate outings.",
  openGraph: {
    title: "Testimonials & Reviews | Crest Boats",
    description:
      "Read real stories and guest reviews from celebrations, coastal getaways, and corporate outings.",
    url: "https://www.crestboats.online/testimonials",
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
    title: "Testimonials & Reviews | Crest Boats",
    description:
      "Read real stories and guest reviews from celebrations, coastal getaways, and corporate outings.",
    images: ["/og-image.png"],
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <Nav />
      <main>
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
