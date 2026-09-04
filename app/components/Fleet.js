"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import clsx from "clsx";

const WHATSAPP_NUMBER = "2349110164243";

const FLEET_DATA = [
  {
    id: "10-seater",
    name: "10 Seater",
    capacity: "Up to 10 Guests",
    category: "Private Charter",
    description:
      "Intimate cruising for small gatherings, couples, and relaxed family outings on Lagos waterways.",
    imageUrl: "/fleet/10-seater.jpg",
  },
  {
    id: "15-seater",
    name: "15 Seater",
    capacity: "Up to 15 Guests",
    category: "Day Cruiser",
    description:
      "Comfortable lounge seating with open deck flow, perfect for casual celebrations and beach escapes.",
    imageUrl: "/fleet/15-seater.jpg",
  },
  {
    id: "20-seater",
    name: "20 Seater",
    capacity: "Up to 20 Guests",
    category: "Celebration Boat",
    description:
      "Our most requested charter vessel for birthdays, sunset parties, and lively group cruises.",
    imageUrl: "/fleet/20-seater.jpg",
  },
  {
    id: "25-seater",
    name: "25 Seater",
    capacity: "Up to 25 Guests",
    category: "Executive Cruiser",
    description:
      "Generous deck space with shaded and sun lounge areas, built for effortless entertaining on the water.",
    imageUrl: "/fleet/25-seater.jpg",
  },
  {
    id: "30-seater",
    name: "30 Seater",
    capacity: "Up to 30 Guests",
    category: "Group Charter",
    description:
      "Spacious multi-zone cruiser designed to accommodate large groups with premium onboard comfort.",
    imageUrl: "/fleet/30-seater.jpg",
  },
  {
    id: "50-seater",
    name: "50 Seater",
    capacity: "Up to 50 Guests",
    category: "Flagship Vessel",
    description:
      "The ultimate event vessel for landmark celebrations, corporate gatherings, and large-scale cruises.",
    imageUrl: "/fleet/50-seater.jpg",
  },
  {
    id: "jet-ski",
    name: "Jet Ski",
    capacity: "1–2 Riders",
    category: "Watercraft",
    description:
      "High-speed, agile watercraft engineered for adrenaline runs and carving through open lagoon waves.",
    imageUrl: "/fleet/jet-ski.jpg",
  },
];

function getWhatsAppUrl(boatName) {
  const message = `Hello Crest Boats, I'd like to book the ${boatName}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function WhatsAppIcon({ size = 18, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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

export default function Fleet() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Pointer drag state for desktop
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const dragDistanceRef = useRef(0);

  const updateScrollMetrics = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 12);
    setCanScrollRight(scrollLeft < maxScroll - 12);

    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollLeft / maxScroll)) : 0;
    setScrollProgress(progress);

    // Approximate active card index
    const firstCard = el.querySelector("[data-fleet-card]");
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 24; // width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(0, index), FLEET_DATA.length - 1));
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollMetrics();
    window.addEventListener("resize", updateScrollMetrics);
    return () => window.removeEventListener("resize", updateScrollMetrics);
  }, [updateScrollMetrics]);

  const scrollToCard = (direction) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const firstCard = el.querySelector("[data-fleet-card]");
    const scrollAmount = firstCard ? firstCard.offsetWidth + 24 : 380;

    el.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  /* ── Desktop Drag to Scroll ── */
  const handlePointerDown = (e) => {
    // Only primary button
    if (e.button !== 0) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    setIsDragging(true);
    startXRef.current = e.pageX;
    scrollLeftStartRef.current = el.scrollLeft;
    dragDistanceRef.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    const deltaX = e.pageX - startXRef.current;
    dragDistanceRef.current = Math.abs(deltaX);
    el.scrollLeft = scrollLeftStartRef.current - deltaX;
  };

  const handlePointerEnd = () => {
    setIsDragging(false);
  };

  const handleClickCapture = (e) => {
    // If the user dragged more than 6px, suppress the click on child buttons/links
    if (dragDistanceRef.current > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section
      id="fleet"
      className="relative min-h-dvh h-dvh snap-start flex flex-col justify-between bg-sand text-navy overflow-hidden pt-18 sm:pt-20 lg:pt-22 pb-5 sm:pb-6 lg:pb-8"
    >
      {/* ── Section Header ── */}
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 shrink-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 text-ocean">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] font-heading">
                The Fleet
              </span>
              <WaveMotif className="text-ocean/50" />
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-bold font-heading tracking-tight text-navy">
              Charter Vessels & Watercraft
            </h2>
            <p className="mt-1 text-sm sm:text-base text-navy/70 max-w-xl font-normal leading-relaxed">
              Every charter is private and captained. Choose your boat, tap to reach out on WhatsApp, and we&apos;ll reserve your departure.
            </p>
          </div>

          {/* Controls & Counter (Desktop / Tablet) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <span className="text-xs font-semibold tracking-wider text-navy/50 font-heading">
              {String(activeIndex + 1).padStart(2, "0")} / {String(FLEET_DATA.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToCard("prev")}
                disabled={!canScrollLeft}
                aria-label="Previous fleet vessel"
                className={clsx(
                  "w-10 h-10 rounded-full border border-navy/15 flex items-center justify-center transition-all duration-200",
                  canScrollLeft
                    ? "text-navy hover:border-navy hover:bg-navy/5 active:scale-95 cursor-pointer"
                    : "text-navy/25 border-navy/10 cursor-not-allowed opacity-50"
                )}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollToCard("next")}
                disabled={!canScrollRight}
                aria-label="Next fleet vessel"
                className={clsx(
                  "w-10 h-10 rounded-full border border-navy/15 flex items-center justify-center transition-all duration-200",
                  canScrollRight
                    ? "text-navy hover:border-navy hover:bg-navy/5 active:scale-95 cursor-pointer"
                    : "text-navy/25 border-navy/10 cursor-not-allowed opacity-50"
                )}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Carousel Track (Flexible height to respect viewport) ── */}
      <div className="relative w-full flex-1 min-h-0 my-2 sm:my-3 flex items-center">
        {/* Right edge fade indicator: visually communicates scrollability */}
        <div
          className={clsx(
            "pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-sand to-transparent z-10 transition-opacity duration-300",
            canScrollRight ? "opacity-100" : "opacity-0"
          )}
          aria-hidden="true"
        />

        {/* Scroll container */}
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollMetrics}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onClickCapture={handleClickCapture}
          className={clsx(
            "w-full h-full max-h-[500px] overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar flex items-stretch gap-4 sm:gap-6",
            "px-5 sm:px-8 lg:px-12",
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          )}
          style={{ overscrollBehaviorX: "contain" }}
        >
          {FLEET_DATA.map((boat, idx) => (
            <article
              key={boat.id}
              data-fleet-card
              className={clsx(
                "group shrink-0 snap-start flex flex-col justify-between",
                "w-[80vw] sm:w-[350px] md:w-[380px] lg:w-[410px]",
                "bg-white rounded-2xl border border-navy/[0.08]",
                "shadow-[0_4px_24px_rgba(18,32,63,0.06)] hover:shadow-[0_12px_32px_rgba(18,32,63,0.12)]",
                "transition-all duration-300 overflow-hidden"
              )}
            >
              {/* Boat Image & Badges */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-sand-dark/50 shrink-0">
                <Image
                  src={boat.imageUrl}
                  alt={`${boat.name} private boat in Lagos`}
                  fill
                  priority={idx < 2}
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 380px, 410px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-black/20 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Floating pill tags */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                  <span className="bg-sand/90 backdrop-blur-md text-navy font-semibold text-[0.75rem] px-2.5 py-1 rounded-full border border-navy/10 shadow-xs">
                    {boat.capacity}
                  </span>
                  <span className="bg-navy/80 backdrop-blur-md text-white font-medium text-[0.75rem] px-2.5 py-1 rounded-full border border-white/10 shadow-xs">
                    {boat.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-navy tracking-tight">
                    {boat.name}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-navy/70 leading-relaxed line-clamp-2">
                    {boat.description}
                  </p>
                </div>

                {/* WhatsApp Action Button */}
                <a
                  href={getWhatsAppUrl(boat.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    "w-full bg-gold text-navy font-heading font-semibold text-[0.9375rem]",
                    "py-2.5 sm:py-3 px-4 rounded-[10px]",
                    "flex items-center justify-center gap-2",
                    "hover:bg-amber active:scale-[0.98] transition-all duration-200",
                    "shadow-[0_2px_10px_rgba(247,148,29,0.2)]"
                  )}
                >
                  <WhatsAppIcon size={18} className="text-navy" />
                  <span>Book on WhatsApp</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── Section Footer: Progress indicator & hint ── */}
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 shrink-0">
        <div className="flex items-center justify-between gap-4 pt-1 border-t border-navy/[0.06]">
          {/* Progress track */}
          <div className="flex items-center gap-3 flex-1 max-w-xs">
            <div className="relative h-1.5 w-full bg-navy/10 rounded-full overflow-hidden">
              <div
                className="absolute top-0 bottom-0 left-0 bg-ocean rounded-full transition-all duration-150 ease-out"
                style={{
                  width: `${Math.max(14, scrollProgress * 100)}%`,
                }}
              />
            </div>
            <span className="text-[0.75rem] font-medium text-navy/50 font-heading shrink-0 sm:hidden">
              {activeIndex + 1}/{FLEET_DATA.length}
            </span>
          </div>

          {/* Swipe / drag hint */}
          <div className="flex items-center gap-1.5 text-xs text-navy/45 font-medium">
            <span className="hidden sm:inline">Drag or scroll to view full fleet</span>
            <span className="sm:hidden">Swipe to explore</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-navy/40"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
