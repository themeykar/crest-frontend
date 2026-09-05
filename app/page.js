import clsx from "clsx";
import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import Fleet from "@/app/components/Fleet";
import Trips from "@/app/components/Trips";
import Gallery from "@/app/components/Gallery";
import Testimonials from "@/app/components/Testimonials";
import Faqs from "@/app/components/Faqs";

const SECTIONS = [
  { id: "contact", label: "Get in Touch" },
];

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
        {SECTIONS.map(({ id, label }, i) => {
          const isContact = id === "contact";
          const isHome = id === "home";

          // Alternate sand / white; contact section gets navy
          const bg = isContact
            ? "bg-navy"
            : i % 2 === 0
              ? "bg-sand"
              : "bg-white";

          const textColor = isContact ? "text-white" : "text-navy";
          const subtleColor = isContact ? "text-white/50" : "text-navy/40";

          return (
            <section
              key={id}
              id={id}
              className={clsx(
                "min-h-dvh snap-start flex items-center justify-center",
                bg,
                textColor,
                !isHome && "scroll-mt-16"
              )}
            >
              <div className="text-center px-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  {label}
                </h2>
                {!isHome && (
                  <p className={clsx("mt-3 text-lg", subtleColor)}>
                    Coming soon
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}
