"use client";

import { useState, useEffect } from "react";
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

function QuoteIcon({ className }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  );
}

function formatTripDate(isoString) {
  if (!isoString) return "Recent Charter";
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Recent Charter";
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Recent Charter";
  }
}

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchTestimonials() {
      try {
        setIsLoading(true);
        setIsError(false);

        const rawBaseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const baseUrl = rawBaseUrl.replace(/\/+$/, "");
        const endpoint = baseUrl.endsWith("/api")
          ? `${baseUrl}/testimonials/`
          : `${baseUrl}/api/testimonials/`;

        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (isMounted) {
          // Render exactly what's returned (server-side limited to latest approved)
          setItems(Array.isArray(data) ? data : []);
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

    fetchTestimonials();

    return () => {
      isMounted = false;
    };
  }, []);

  const total = items.length;

  return (
    <section
      id="testimonials"
      className="relative min-h-dvh h-dvh snap-start flex flex-col justify-between bg-white text-navy overflow-hidden pt-18 sm:pt-20 lg:pt-22 pb-5 sm:pb-6 lg:pb-8"
    >
      {/* ── Section Header ── */}
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 shrink-0">
        <div className="flex items-center gap-2.5 text-ocean">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] font-heading">
            Guest Reviews
          </span>
          <WaveMotif className="text-ocean/50" />
        </div>
        <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-bold font-heading tracking-tight text-navy">
          Straight From the Water
        </h2>
        <p className="mt-1 text-sm sm:text-base text-navy/70 max-w-xl font-normal leading-relaxed">
          Real feedback from guests who spent birthdays, corporate retreats, and weekend escapes aboard our fleet.
        </p>
      </div>

      {/* ── Main Content Area ── */}
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex-1 min-h-0 my-3 sm:my-4 flex items-center">
        {isLoading ? (
          /* ── On-Brand Coastal Loading Skeleton ── */
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={clsx(
                  "rounded-2xl bg-sand/80 border border-navy/[0.06] p-6 sm:p-7 flex flex-col justify-between min-h-[260px] sm:min-h-[280px]",
                  n === 3 && "hidden lg:flex",
                  n === 2 && "hidden md:flex"
                )}
              >
                <div className="space-y-3">
                  <div className="w-7 h-7 rounded-full bg-navy/[0.08]" />
                  <div className="h-3.5 bg-navy/[0.08] rounded-full w-full" />
                  <div className="h-3.5 bg-navy/[0.08] rounded-full w-5/6" />
                  <div className="h-3.5 bg-navy/[0.08] rounded-full w-3/4" />
                </div>
                <div className="pt-4 border-t border-navy/[0.06] flex items-center justify-between">
                  <div className="h-4 bg-navy/[0.08] rounded-full w-24" />
                  <div className="h-3 bg-navy/[0.08] rounded-full w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : isError || total === 0 ? (
          /* ── Quiet Coastal Fallback State ── */
          <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center rounded-2xl border border-navy/10 bg-sand/40 backdrop-blur-xs p-8 text-center shadow-xs">
            <WaveMotif className="text-ocean/50 mb-3" />
            <h3 className="font-heading text-lg sm:text-xl font-bold text-navy">
              Guest Stories
            </h3>
            <p className="mt-1 text-sm text-navy/65 max-w-md leading-relaxed">
              Guest reviews are momentarily unavailable. Check back shortly to hear more from our recent departures.
            </p>
          </div>
        ) : (
          /* ── Genuine Quote-Forward Testimonial Cards ── */
          <div
            className={clsx(
              "w-full",
              // Layout adaptability:
              // 1 item: centered single card
              // 2 items: 2-column balanced grid
              // 3 items: 3-column desktop grid with mobile horizontal swipe
              total === 1 && "max-w-2xl mx-auto",
              total === 2 && "max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6",
              total >= 3 &&
              "flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-5 lg:grid lg:grid-cols-3 lg:gap-6 no-scrollbar pb-2 lg:pb-0"
            )}
          >
            {items.map((item, idx) => (
              <div
                key={item.id || idx}
                className={clsx(
                  "group relative rounded-2xl p-6 sm:p-7 lg:p-8",
                  "bg-sand/60 border border-navy/[0.08]",
                  "shadow-[0_4px_20px_rgba(18,32,63,0.04)] hover:shadow-[0_10px_30px_rgba(18,32,63,0.08)]",
                  "hover:border-ocean/25 hover:bg-sand/80 transition-all duration-300",
                  "flex flex-col justify-between",
                  // Sizing for horizontal swipe on mobile when 3 items, static grid on desktop
                  total >= 3 && "w-[84vw] sm:w-[420px] lg:w-auto shrink-0 snap-center lg:shrink"
                )}
              >
                {/* Upper Quote Content */}
                <div>
                  <div className="mb-4">
                    <QuoteIcon className="text-ocean/30 group-hover:text-ocean/50 transition-colors duration-300" />
                  </div>

                  <p className="text-sm sm:text-[0.9375rem] lg:text-base text-navy/85 font-normal leading-relaxed">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>

                {/* Author Details Footer */}
                <div className="mt-6 pt-4 border-t border-navy/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-ocean/10 text-ocean font-heading font-bold text-xs flex items-center justify-center border border-ocean/20">
                      {item.name ? item.name.charAt(0).toUpperCase() : "G"}
                    </div>
                    <div>
                      <span className="font-heading font-bold text-sm sm:text-base text-navy block leading-tight">
                        {item.name}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-navy/40">
                    {formatTripDate(item.submitted_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Section Footer ── */}
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 shrink-0">
        <div className="flex items-center justify-between text-xs text-navy/45 pt-1 border-t border-navy/[0.06]">
          <span className="font-heading font-medium">
            Read unedited feedback from private charters
          </span>
          <span className="hidden sm:inline font-mono text-[11px] tracking-wider text-navy/40">
            LATEST REVIEWS
          </span>
        </div>
      </div>
    </section>
  );
}
