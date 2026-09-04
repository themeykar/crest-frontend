"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

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

function getCardLayout(index, total) {
  if (total === 5) {
    switch (index) {
      case 0:
        // Featured Centerpiece on desktop, full-width top card on mobile
        return "col-span-2 row-span-1 lg:col-start-4 lg:col-span-6 lg:row-span-2";
      case 1:
        // Top Left
        return "col-span-1 lg:col-start-1 lg:col-span-3 lg:row-start-1";
      case 2:
        // Bottom Left
        return "col-span-1 lg:col-start-1 lg:col-span-3 lg:row-start-2";
      case 3:
        // Top Right
        return "col-span-1 lg:col-start-10 lg:col-span-3 lg:row-start-1";
      case 4:
        // Bottom Right
        return "col-span-1 lg:col-start-10 lg:col-span-3 lg:row-start-2";
      default:
        return "col-span-1";
    }
  }

  if (total === 4) {
    switch (index) {
      case 0:
        return "col-span-2 lg:col-span-6 lg:row-span-2";
      case 1:
        return "col-span-1 lg:col-span-6 lg:row-span-1";
      case 2:
        return "col-span-1 lg:col-span-3 lg:row-span-1";
      case 3:
        return "col-span-2 lg:col-span-3 lg:row-span-1";
      default:
        return "col-span-1";
    }
  }

  if (total === 3) {
    switch (index) {
      case 0:
        return "col-span-2 lg:col-span-7 lg:row-span-2";
      case 1:
        return "col-span-1 lg:col-span-5 lg:row-span-1";
      case 2:
        return "col-span-1 lg:col-span-5 lg:row-span-1";
      default:
        return "col-span-1";
    }
  }

  if (total === 2) {
    return index === 0
      ? "col-span-1 lg:col-span-7 lg:row-span-2"
      : "col-span-1 lg:col-span-5 lg:row-span-2";
  }

  // Single photo
  return "col-span-2 lg:col-span-12 lg:row-span-2 max-w-3xl mx-auto w-full";
}

function getGridRows(total) {
  if (total >= 4) return "grid-rows-3 lg:grid-rows-2";
  if (total === 3) return "grid-rows-2 lg:grid-rows-2";
  return "grid-rows-2 lg:grid-rows-1";
}

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchGallery() {
      try {
        setIsLoading(true);
        setIsError(false);

        const rawBaseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const baseUrl = rawBaseUrl.replace(/\/+$/, "");
        const endpoint = baseUrl.endsWith("/api")
          ? `${baseUrl}/gallery/`
          : `${baseUrl}/api/gallery/`;

        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (isMounted) {
          setItems(Array.isArray(data) ? data.slice(0, 5) : []);
        }
      } catch {
        if (isMounted) {
          setIsError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchGallery();

    return () => {
      isMounted = false;
    };
  }, []);

  const total = items.length;

  return (
    <section
      id="gallery"
      className="relative min-h-dvh h-dvh snap-start flex flex-col justify-between bg-sand text-navy overflow-hidden pt-18 sm:pt-20 lg:pt-22 pb-5 sm:pb-6 lg:pb-8"
    >
      {/* ── Section Header ── */}
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 shrink-0">
        <div className="flex items-center gap-2.5 text-ocean">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] font-heading">
            Moments on the Water
          </span>
          <WaveMotif className="text-ocean/50" />
        </div>
        <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-bold font-heading tracking-tight text-navy">
          Recent Charters & Days Out
        </h2>
        <p className="mt-1 text-sm sm:text-base text-navy/70 max-w-xl font-normal leading-relaxed">
          Unfiltered snapshots from recent private charters, birthday cruises, and open-water escapes across Lagos.
        </p>
      </div>

      {/* ── Gallery Content Area ── */}
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex-1 min-h-0 my-2 sm:my-3">
        {isLoading ? (
          /* ── On-Brand Coastal Loading Skeleton ── */
          <div className="grid grid-cols-2 lg:grid-cols-12 grid-rows-3 lg:grid-rows-2 gap-3 sm:gap-4 lg:gap-5 h-full animate-pulse">
            {/* Centerpiece skeleton */}
            <div className="col-span-2 row-span-1 lg:col-start-4 lg:col-span-6 lg:row-span-2 rounded-2xl bg-navy/[0.07] border border-navy/[0.06] flex flex-col items-center justify-center p-6 text-center">
              <WaveMotif className="text-ocean/30 mb-2" />
              <span className="text-xs font-heading font-medium text-navy/40">
                Loading moments...
              </span>
            </div>
            {/* Flanking skeletons */}
            <div className="col-span-1 lg:col-start-1 lg:col-span-3 lg:row-start-1 rounded-2xl bg-navy/[0.05] border border-navy/[0.05]" />
            <div className="col-span-1 lg:col-start-1 lg:col-span-3 lg:row-start-2 rounded-2xl bg-navy/[0.05] border border-navy/[0.05]" />
            <div className="col-span-1 lg:col-start-10 lg:col-span-3 lg:row-start-1 rounded-2xl bg-navy/[0.05] border border-navy/[0.05]" />
            <div className="col-span-1 lg:col-start-10 lg:col-span-3 lg:row-start-2 rounded-2xl bg-navy/[0.05] border border-navy/[0.05]" />
          </div>
        ) : isError || total === 0 ? (
          /* ── Quiet Coastal Fallback State ── */
          <div className="h-full flex flex-col items-center justify-center rounded-2xl border border-navy/10 bg-white/70 backdrop-blur-xs p-8 text-center shadow-xs">
            <WaveMotif className="text-ocean/50 mb-3" />
            <h3 className="font-heading text-lg sm:text-xl font-bold text-navy">
              Moments from the Water
            </h3>
            <p className="mt-1 text-sm text-navy/65 max-w-md leading-relaxed">
              Recent charter snapshots are momentarily unavailable. Check back shortly to see fresh captures from our departures.
            </p>
          </div>
        ) : (
          /* ── Editorial Centerpiece Mosaic Grid ── */
          <div
            className={clsx(
              "grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 h-full",
              getGridRows(total)
            )}
          >
            {items.map((item, idx) => {
              const layoutClass = getCardLayout(idx, total);
              const isCenterpiece = idx === 0 && total >= 3;
              const hasCaption = Boolean(item.caption && item.caption.trim());

              return (
                <div
                  key={item.id || idx}
                  className={clsx(
                    "group relative rounded-2xl overflow-hidden",
                    "border border-navy/[0.08] shadow-[0_4px_20px_rgba(18,32,63,0.06)]",
                    "hover:shadow-[0_10px_32px_rgba(18,32,63,0.12)] transition-all duration-300",
                    "flex flex-col justify-end bg-navy/5",
                    layoutClass
                  )}
                >
                  {/* Photo with subtle hover zoom */}
                  <Image
                    src={item.image}
                    alt={item.caption || `Crest Boats charter moment ${idx + 1}`}
                    fill
                    sizes={
                      isCenterpiece
                        ? "(max-width: 1024px) 100vw, 50vw"
                        : "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    }
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority={idx < 2}
                  />

                  {/* Atmospheric gradient overlay for contrast */}
                  <div
                    className={clsx(
                      "absolute inset-0 pointer-events-none transition-opacity duration-300",
                      hasCaption
                        ? "bg-gradient-to-t from-navy/85 via-navy/30 to-transparent"
                        : "bg-gradient-to-t from-navy/30 via-transparent to-transparent group-hover:opacity-60"
                    )}
                    aria-hidden="true"
                  />

                  {/* Caption badge — cleanly omitted if not present */}
                  {hasCaption && (
                    <div className="relative z-10 p-3 sm:p-4 lg:p-5 flex flex-col justify-end">
                      <p
                        className={clsx(
                          "font-heading font-semibold text-white tracking-tight leading-snug drop-shadow-xs",
                          isCenterpiece
                            ? "text-sm sm:text-base lg:text-lg max-w-lg"
                            : "text-xs sm:text-sm lg:text-base max-w-sm"
                        )}
                      >
                        {item.caption}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Section Footer ── */}
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 shrink-0">
        <div className="flex items-center justify-between text-xs text-navy/45 pt-1 border-t border-navy/[0.06]">
          <span className="font-heading font-medium">
            Shared directly by Crest Boats captains & guests
          </span>
          <span className="hidden sm:inline font-mono text-[11px] tracking-wider text-navy/40">
            RECENT MOMENTS
          </span>
        </div>
      </div>
    </section>
  );
}
