import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import Fleet from "@/app/components/Fleet";
import Trips from "@/app/components/Trips";
import Gallery from "@/app/components/Gallery";
import Testimonials from "@/app/components/Testimonials";
import Faqs from "@/app/components/Faqs";
import Contact from "@/app/components/Contact";

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
