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
      width="24"
      height="24"
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
  // ── 7a Display State ──
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // ── 7b Submission Form State ──
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [textTouched, setTextTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  // ── 7b Form Submit Handler ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameTouched(true);
    setTextTouched(true);

    if (!name.trim() || !text.trim() || text.length > 500) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");

      const rawBaseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const baseUrl = rawBaseUrl.replace(/\/+$/, "");
      const endpoint = baseUrl.endsWith("/api")
        ? `${baseUrl}/testimonials/submit/`
        : `${baseUrl}/api/testimonials/submit/`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          text: text.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      setName("");
      setText("");
      setNameTouched(false);
      setTextTouched(false);
      setSubmitSuccess(true);
    } catch {
      setSubmitError(
        "We couldn't submit your review right now. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="testimonials"
      className="relative min-h-dvh snap-start flex flex-col justify-between bg-white text-navy pt-16 sm:pt-20 lg:pt-22 pb-4 sm:pb-6 lg:pb-8"
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
        <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm lg:text-base text-navy/70 max-w-xl font-normal leading-relaxed">
          Real feedback from guests who spent birthdays, corporate retreats, and weekend escapes aboard our fleet.
        </p>
      </div>

      {/* ── Main Content Area (Cards + Submission Form) ── */}
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center gap-3 sm:gap-4 my-3 sm:my-4">
        {/* ── 7a: Testimonials Cards Display ── */}
        <div className="w-full flex items-start">
          {isLoading ? (
            /* ── On-Brand Coastal Loading Skeleton ── */
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={clsx(
                    "rounded-2xl bg-sand/80 border border-navy/[0.06] p-4 sm:p-5 flex flex-col justify-between min-h-[170px] sm:min-h-[190px]",
                    n === 3 && "hidden lg:flex",
                    n === 2 && "hidden md:flex"
                  )}
                >
                  <div className="space-y-2.5">
                    <div className="w-5 h-5 rounded-full bg-navy/[0.08]" />
                    <div className="h-3 bg-navy/[0.08] rounded-full w-full" />
                    <div className="h-3 bg-navy/[0.08] rounded-full w-5/6" />
                  </div>
                  <div className="pt-3 border-t border-navy/[0.06] flex items-center justify-between">
                    <div className="h-3.5 bg-navy/[0.08] rounded-full w-20" />
                    <div className="h-3 bg-navy/[0.08] rounded-full w-14" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError || total === 0 ? (
            /* ── Quiet Coastal Fallback State ── */
            <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center rounded-2xl border border-navy/10 bg-sand/40 backdrop-blur-xs p-5 sm:p-6 text-center shadow-xs">
              <WaveMotif className="text-ocean/50 mb-2" />
              <h3 className="font-heading text-base sm:text-lg font-bold text-navy">
                Guest Stories
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-navy/65 max-w-md leading-relaxed">
                Guest reviews are momentarily unavailable. Check back shortly to hear more from our recent departures.
              </p>
            </div>
          ) : (
            /* ── Genuine Quote-Forward Testimonial Cards ── */
            <div
              className={clsx(
                "w-full",
                total === 1 && "max-w-2xl mx-auto",
                total === 2 && "max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6",
                total >= 3 &&
                  "flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-5 lg:grid lg:grid-cols-3 lg:gap-6 no-scrollbar pb-1 lg:pb-0"
              )}
            >
              {items.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className={clsx(
                    "group relative rounded-2xl p-4 sm:p-5 lg:p-5.5",
                    "bg-sand/60 border border-navy/[0.08]",
                    "shadow-[0_4px_20px_rgba(18,32,63,0.04)] hover:shadow-[0_10px_30px_rgba(18,32,63,0.08)]",
                    "hover:border-ocean/25 hover:bg-sand/80 transition-all duration-300",
                    "flex flex-col justify-between",
                    total >= 3 && "w-[84vw] sm:w-[380px] lg:w-auto shrink-0 snap-center lg:shrink"
                  )}
                >
                  {/* Upper Quote Content */}
                  <div>
                    <div className="mb-2 sm:mb-2.5">
                      <QuoteIcon className="text-ocean/30 group-hover:text-ocean/50 transition-colors duration-300" />
                    </div>

                    <p className="text-xs sm:text-[0.9375rem] text-navy/85 font-normal leading-relaxed line-clamp-3 sm:line-clamp-4">
                      &ldquo;{item.text}&rdquo;
                    </p>
                  </div>

                  {/* Author Details Footer */}
                  <div className="mt-3.5 pt-2.5 border-t border-navy/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-ocean/10 text-ocean font-heading font-bold text-xs flex items-center justify-center border border-ocean/20">
                        {item.name ? item.name.charAt(0).toUpperCase() : "G"}
                      </div>
                      <span className="font-heading font-bold text-xs sm:text-sm text-navy block leading-tight">
                        {item.name}
                      </span>
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-mono text-navy/40">
                      {formatTripDate(item.submitted_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── 7b: Submission Form Container (Below cards) ── */}
        <div className="shrink-0 w-full bg-sand/50 border border-navy/[0.08] rounded-2xl p-3 sm:p-4 lg:p-4.5">
          {submitSuccess ? (
            /* ── Warm On-Brand Confirmation State ── */
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 py-1 px-1 text-navy">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-ocean/20 text-ocean flex items-center justify-center shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-heading font-bold text-xs sm:text-sm text-navy leading-tight">
                    Thank you for sharing your experience!
                  </p>
                  <p className="text-[11px] sm:text-xs text-navy/70 mt-0.5 leading-snug">
                    Your review has been received. Because each guest note goes through a quick review first, it won&apos;t appear immediately above, but will be published soon.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="text-xs font-heading font-semibold text-ocean hover:text-deep-blue underline underline-offset-2 shrink-0 self-end sm:self-center cursor-pointer"
              >
                Leave another note
              </button>
            </div>
          ) : (
            /* ── Active Form ── */
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold font-heading text-navy">
                    Were you on the water with us?
                  </span>
                  <span className="text-[11px] text-navy/50 hidden md:inline">
                    Leave a note about your charter
                  </span>
                </div>
                <span
                  className={clsx(
                    "text-[11px] font-mono",
                    text.length >= 480
                      ? "text-gold font-semibold"
                      : "text-navy/40"
                  )}
                  aria-live="polite"
                >
                  {text.length}/500
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-start">
                {/* Name Input */}
                <div className="sm:col-span-4 flex flex-col">
                  <label
                    htmlFor="testimonial-name"
                    className="text-[11px] font-heading font-semibold text-navy/70 mb-1"
                  >
                    Your Name <span className="text-ocean">*</span>
                  </label>
                  <input
                    id="testimonial-name"
                    type="text"
                    required
                    maxLength={100}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (submitError) setSubmitError("");
                    }}
                    onBlur={() => setNameTouched(true)}
                    placeholder="e.g. Alex M."
                    disabled={isSubmitting}
                    className={clsx(
                      "w-full h-8 sm:h-9 px-3 rounded-[10px] text-xs sm:text-sm bg-white text-navy placeholder:text-navy/40",
                      "border transition-colors duration-200 outline-none",
                      nameTouched && !name.trim()
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400/30"
                        : "border-navy/15 focus:border-ocean focus:ring-2 focus:ring-ocean/15",
                      isSubmitting && "opacity-60 cursor-not-allowed"
                    )}
                  />
                  {nameTouched && !name.trim() && (
                    <span className="text-[10px] text-red-500 mt-0.5 font-medium">
                      Name is required
                    </span>
                  )}
                </div>

                {/* Testimonial Textarea */}
                <div className="sm:col-span-8 flex flex-col">
                  <label
                    htmlFor="testimonial-text"
                    className="text-[11px] font-heading font-semibold text-navy/70 mb-1"
                  >
                    Your Experience <span className="text-ocean">*</span>
                  </label>
                  <textarea
                    id="testimonial-text"
                    required
                    rows={2}
                    maxLength={500}
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                      if (submitError) setSubmitError("");
                    }}
                    onBlur={() => setTextTouched(true)}
                    placeholder="Tell us about the boat, crew, or your day on the lagoon..."
                    disabled={isSubmitting}
                    className={clsx(
                      "w-full p-2 sm:p-2.5 rounded-[10px] text-xs sm:text-sm bg-white text-navy placeholder:text-navy/40 resize-none",
                      "border transition-colors duration-200 outline-none leading-relaxed",
                      textTouched && !text.trim()
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400/30"
                        : "border-navy/15 focus:border-ocean focus:ring-2 focus:ring-ocean/15",
                      isSubmitting && "opacity-60 cursor-not-allowed"
                    )}
                  />
                  {textTouched && !text.trim() && (
                    <span className="text-[10px] text-red-500 mt-0.5 font-medium">
                      Please write a brief testimonial
                    </span>
                  )}
                </div>
              </div>

              {/* Form Bottom Row: Error and Submit Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-0.5">
                {submitError ? (
                  <p className="text-[11px] text-red-600 font-medium">
                    {submitError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !text.trim()}
                  className={clsx(
                    "px-4 py-1.5 sm:py-2 rounded-[10px] font-heading font-semibold text-xs sm:text-sm",
                    "bg-gold text-navy hover:bg-amber active:scale-[0.98] transition-all duration-200",
                    "shadow-xs shrink-0 cursor-pointer sm:ml-auto",
                    (isSubmitting || !name.trim() || !text.trim()) &&
                      "opacity-50 cursor-not-allowed active:scale-100"
                  )}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <svg
                        className="animate-spin h-3.5 w-3.5 text-navy"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Submitting...</span>
                    </span>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
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
