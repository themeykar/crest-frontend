"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";

function InstagramIcon({ size = 20, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
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

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Fleet", id: "fleet" },
  { label: "Trips", id: "trips" },
  { label: "Gallery", id: "gallery" },
  { label: "Testimonials", id: "testimonials" },
  { label: "FAQs", id: "faqs" },
];

// PLACEHOLDER — replace 2341234567890 with the real WhatsApp number
const WHATSAPP_NUMBER = "2349110164243";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Crest%20Boats%2C%20I%27d%20like%20to%20book%20a%20boat`;
const INSTAGRAM_URL = "https://instagram.com/crestboats";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  /* ── Observe hero to toggle nav background ── */
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  /* ── Track which section is in view ── */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── Close mobile menu when viewport widens past lg ── */
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handler = () => {
      if (mql.matches) setIsMobileOpen(false);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  /* ── Lock page scroll while mobile menu is open ── */
  useEffect(() => {
    document.documentElement.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isMobileOpen]);

  const scrollToSection = useCallback((id) => {
    // Restore scroll before navigating so scrollIntoView works
    document.documentElement.style.overflow = "";
    setIsMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-40",
        "transition-[background-color,box-shadow] duration-300 ease-out",
        isScrolled
          ? "bg-sand shadow-[0_1px_0_rgba(18,32,63,0.08)]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 lg:px-10">
        {/* ── Logo ── */}
        <a
          href="#home"
          onClick={(e) => handleAnchorClick(e, "home")}
          className="relative z-10"
        >
          <Image
            src="/logo.png"
            alt="Crest Boats"
            width={52}
            height={52}
            priority
          />
        </a>

        {/* ── Desktop links (centered) ── */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map(({ label, id }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleAnchorClick(e, id)}
                className={clsx(
                  "relative px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-200",
                  isActive ? "text-ocean" : "text-navy/65 hover:text-navy"
                )}
              >
                {label}
                <span
                  className={clsx(
                    "absolute bottom-0 left-3.5 right-3.5 h-[2px] rounded-full bg-ocean",
                    "transition-transform duration-300 origin-left",
                    isActive ? "scale-x-100" : "scale-x-0"
                  )}
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </div>

        {/* ── Desktop actions (right) ── */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-navy/50 hover:text-navy transition-colors duration-200"
            aria-label="Crest Boats on Instagram"
          >
            <InstagramIcon size={20} strokeWidth={1.5} />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "bg-gold text-navy px-5 py-2 rounded-[10px]",
              "text-[0.9375rem] font-semibold font-heading",
              "hover:bg-amber active:scale-[0.97] transition-all duration-200"
            )}
          >
            Book Now
          </a>
        </div>

        {/* ── Mobile toggle ── */}
        <button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="relative z-10 lg:hidden p-2 -mr-2"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
        >
          <div className="flex w-6 flex-col gap-[6px]">
            <span
              className={clsx(
                "block h-[2px] w-6 rounded-full bg-navy transition-all duration-300 origin-center",
                isMobileOpen && "translate-y-[8px] rotate-45"
              )}
            />
            <span
              className={clsx(
                "block h-[2px] w-4 rounded-full bg-navy transition-all duration-300 ml-auto",
                isMobileOpen && "opacity-0 translate-x-2"
              )}
            />
            <span
              className={clsx(
                "block h-[2px] w-6 rounded-full bg-navy transition-all duration-300 origin-center",
                isMobileOpen && "-translate-y-[8px] -rotate-45"
              )}
            />
          </div>
        </button>
      </nav>

      {/* ── Mobile menu panel ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden border-t border-navy/5 bg-sand"
          >
            <div className="mx-auto max-w-[1400px] px-5 py-6 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, id }) => {
                const isActive = activeSection === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => handleAnchorClick(e, id)}
                    className={clsx(
                      "py-3 text-[1.0625rem] font-medium font-heading transition-colors",
                      isActive ? "text-ocean" : "text-navy/65"
                    )}
                  >
                    {label}
                  </a>
                );
              })}

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 text-[1.0625rem] font-medium font-heading text-navy/65 inline-flex items-center gap-2.5"
              >
                <InstagramIcon size={18} strokeWidth={1.5} />
                Instagram
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "mt-3 bg-gold text-navy text-center px-6 py-3 rounded-[10px]",
                  "text-[1.0625rem] font-semibold font-heading",
                  "hover:bg-amber active:scale-[0.97] transition-all duration-200"
                )}
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
