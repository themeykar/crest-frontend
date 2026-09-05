"use client";

import { useState } from "react";
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

function MailIcon({ className }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function CopyIcon({ className }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function InstagramIcon({ size = 20, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

const EMAIL_ADDRESS = "crestlagosboats@gmail.com";
const INSTAGRAM_URL = "https://instagram.com/crestboats";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback for clipboard restrictions
      const textArea = document.createElement("textarea");
      textArea.value = EMAIL_ADDRESS;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-dvh snap-start flex flex-col justify-between bg-navy text-white pt-20 sm:pt-24 pb-6 sm:pb-8 overflow-hidden"
    >
      {/* ── Atmospheric Ambient Shimmer ── */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-ocean/[0.12] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 right-8 w-[380px] h-[220px] bg-gold/[0.05] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Main Section Content ── */}
      <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 my-auto py-8 sm:py-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* ── Left Column: Brand Sign-off Narrative ── */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="flex items-center gap-2.5 text-gold">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] font-heading">
                Until We Cast Off
              </span>
              <WaveMotif className="text-gold/60" />
            </div>

            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-white leading-[1.12]">
              We&apos;ll See You on the Water.
            </h2>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-white/75 max-w-xl font-normal leading-relaxed">
              Have questions about private charters, special occasion arrangements, or route planning? Reach out directly by email or keep up with daily departures on Instagram.
            </p>
          </div>

          {/* ── Right Column: Distinct Contact Actions ── */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-4">
            {/* 1. Email Card (Clipboard Utility) */}
            <div className="relative rounded-2xl bg-white/[0.04] border border-white/[0.1] p-5 sm:p-6 backdrop-blur-xs transition-all duration-200 hover:bg-white/[0.06] hover:border-white/20">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-[0.14em] font-heading">
                  <MailIcon className="text-ocean" />
                  <span>Direct Inquiries</span>
                </div>

                {copied && (
                  <span
                    role="status"
                    aria-live="polite"
                    className="text-xs font-medium text-emerald-400 font-heading animate-fade-in"
                  >
                    Copied!
                  </span>
                )}
              </div>

              <div className="mt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-mono text-sm sm:text-base text-white/95 select-all tracking-tight break-all sm:break-normal">
                  {EMAIL_ADDRESS}
                </span>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address to clipboard"
                  className={clsx(
                    "inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold font-heading tracking-wide transition-all duration-150 cursor-pointer shrink-0",
                    copied
                      ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/40"
                      : "bg-white/10 hover:bg-white/15 text-white border border-white/15 active:scale-98"
                  )}
                >
                  {copied ? (
                    <>
                      <CheckIcon className="text-emerald-300" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon className="text-white/70" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              <p className="mt-3 text-xs text-white/45">
                Click to copy address for route proposals, group bookings, or general inquiries.
              </p>
            </div>

            {/* 2. Instagram Card (External Brand & Social Link) */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Crest Boats on Instagram (opens in new tab)"
              className="group relative block rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.1] p-5 sm:p-6 transition-all duration-200 hover:bg-white/[0.07] hover:border-gold/40 hover:shadow-[0_8px_30px_rgba(247,148,29,0.06)] cursor-pointer"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-[0.14em] font-heading">
                  <InstagramIcon size={18} className="text-gold" />
                  <span>Visual Journal</span>
                </div>

                <span className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-white/60 group-hover:text-gold group-hover:bg-gold/10 transition-colors">
                  <ArrowUpRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>

              <div className="mt-1">
                <div className="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight group-hover:text-gold transition-colors duration-150">
                  @crestboats
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-white/65 leading-relaxed">
                  Daily departures, coastal views, and guest moments on the Lagos waterways.
                </p>
              </div>

              <div className="mt-4 pt-3.5 border-t border-white/[0.06] flex items-center gap-1.5 text-xs font-medium text-white/50 group-hover:text-gold/90 transition-colors font-heading">
                <span>View on Instagram</span>
                <span aria-hidden="true">→</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom Section Footer Bar ── */}
      <footer className="w-full border-t border-white/[0.08] z-10 shrink-0">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 py-4 sm:py-5 flex items-center justify-center sm:justify-start text-xs text-white/40">
          <p className="text-center sm:text-left">
            © 2026 Crest Boats. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}
