import Image from "next/image";
import clsx from "clsx";

const DESTINATIONS = [
  {
    id: "ilashe",
    name: "Ilashe",
    tag: "Beach House Enclave",
    phrase:
      "Sun-drenched private villas, calm lagoon shores, and all-day weekend beach parties.",
    imageUrl: "/trips/ilashe.jpg",
    // Desktop layout sizing: featured prominent card
    desktopSpan: "lg:col-span-7",
    // Mobile layout sizing: full width featured card
    mobileSpan: "col-span-2",
  },
  {
    id: "tarkwa-bay",
    name: "Tarkwa Bay",
    tag: "Sheltered Atlantic Cove",
    phrase:
      "Golden breakwaters, gentle ocean swells, and easy open-water swims.",
    imageUrl: "/trips/tarkwa-bay.jpg",
    desktopSpan: "lg:col-span-5",
    mobileSpan: "col-span-1",
  },
  {
    id: "koko-beach",
    name: "Koko Beach",
    tag: "Coastal Hideaway",
    phrase:
      "Untouched palm-lined sands and secluded shores far from the mainland hum.",
    imageUrl: "/trips/koko-beach.jpg",
    desktopSpan: "lg:col-span-4",
    mobileSpan: "col-span-1",
  },
  {
    id: "ibeshe",
    name: "Ibeshe",
    tag: "Lagoon Waterway",
    phrase:
      "Quiet backwaters, mangrove channels, and scenic cruising along the creek.",
    imageUrl: "/trips/ibeshe.jpg",
    desktopSpan: "lg:col-span-5",
    mobileSpan: "col-span-1",
  },
  {
    id: "ikare",
    name: "Ikare",
    tag: "Island Sanctuary",
    phrase:
      "Lush coastal village tranquility with expansive open water horizons.",
    imageUrl: "/trips/ikare.jpg",
    desktopSpan: "lg:col-span-3",
    mobileSpan: "col-span-1",
  },
];

function WaveMotif({ className }) {
  return (
    <svg
      width="36"
      height="6"
      viewBox="0 0 36 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 3C4 1 7 1 10 3C13 5 16 5 19 3C22 1 25 1 28 3C31 5 34 5 35 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Trips() {
  return (
    <section
      id="trips"
      className="relative min-h-dvh h-dvh snap-start flex flex-col justify-between bg-white text-navy overflow-hidden pt-18 sm:pt-20 lg:pt-22 pb-5 sm:pb-6 lg:pb-8"
    >
      {/* ── Section Header ── */}
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 shrink-0">
        <div className="flex items-center gap-2.5 text-ocean">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] font-heading">
            Destinations
          </span>
          <WaveMotif className="text-ocean/50" />
        </div>
        <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-bold font-heading tracking-tight text-navy">
          Where We Take You
        </h2>
        <p className="mt-1 text-sm sm:text-base text-navy/70 max-w-xl font-normal leading-relaxed">
          From lively beach house weekends to secluded island sanctuaries across the Lagos coastline.
        </p>
      </div>

      {/* ── Asymmetric Editorial Bento Grid ── */}
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex-1 min-h-0 my-2 sm:my-3">
        <div className="grid grid-cols-2 lg:grid-cols-12 grid-rows-3 lg:grid-rows-2 gap-3 sm:gap-4 lg:gap-5 h-full">
          {DESTINATIONS.map((dest, idx) => {
            const isFeatured = idx === 0;

            return (
              <div
                key={dest.id}
                className={clsx(
                  "group relative rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(18,32,63,0.06)] border border-navy/[0.08] flex flex-col justify-end",
                  dest.mobileSpan,
                  dest.desktopSpan,
                  "transition-all duration-300 hover:shadow-[0_8px_30px_rgba(18,32,63,0.12)]"
                )}
              >
                {/* Background Image with subtle hover zoom */}
                <Image
                  src={dest.imageUrl}
                  alt={`${dest.name} in Lagos`}
                  fill
                  sizes={
                    isFeatured
                      ? "(max-width: 1024px) 100vw, 60vw"
                      : "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 35vw"
                  }
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority={idx < 2}
                />

                {/* Layered atmospheric scrims for crisp text legibility */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/10 pointer-events-none"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Content Overlay */}
                <div className="relative z-10 p-3 sm:p-4 lg:p-5 flex flex-col justify-end">
                  <span className="self-start bg-white/20 backdrop-blur-md text-white font-medium text-[0.6875rem] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full border border-white/20 mb-1 sm:mb-1.5 tracking-wide">
                    {dest.tag}
                  </span>
                  <h3
                    className={clsx(
                      "font-bold font-heading text-white tracking-tight leading-tight",
                      isFeatured
                        ? "text-xl sm:text-2xl lg:text-3xl"
                        : "text-lg sm:text-xl lg:text-2xl"
                    )}
                  >
                    {dest.name}
                  </h3>
                  <p
                    className={clsx(
                      "mt-0.5 sm:mt-1 text-white/85 font-normal leading-snug line-clamp-2",
                      isFeatured
                        ? "text-xs sm:text-sm lg:text-base max-w-lg"
                        : "text-[0.75rem] sm:text-xs lg:text-sm max-w-md"
                    )}
                  >
                    {dest.phrase}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Section Footer Accent ── */}
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 shrink-0">
        <div className="flex items-center justify-between text-xs text-navy/45 pt-1 border-t border-navy/[0.06]">
          <span className="font-heading font-medium">Custom drop-offs and multi-stop charters available</span>
          <span className="hidden sm:inline font-mono text-[11px] tracking-wider text-navy/40">5 COASTAL DESTINATIONS</span>
        </div>
      </div>
    </section>
  );
}
