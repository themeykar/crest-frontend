"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1748457440430-948e958f12c6?fm=jpg&q=80&w=3000&auto=format&fit=crop";

const WHATSAPP_NUMBER = "2349110164243";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Crest%20Boats%2C%20I%27d%20like%20to%20book%20a%20boat`;

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: EASE_OUT_EXPO,
    },
  },
};

const bgVariants = {
  hidden: { scale: 1.06, opacity: 0.8 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.3,
      ease: EASE_OUT_EXPO,
    },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-dvh snap-start flex items-end overflow-hidden"
    >
      {/* ── Background Image & Atmospheric Scrims ── */}
      <motion.div
        variants={bgVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-0 select-none pointer-events-none"
      >
        <Image
          src={HERO_IMAGE_URL}
          alt="Speedboat cruising across sunlit turquoise waters in Lagos"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Layered atmospheric scrims: preserves sparkling turquoise water while guaranteeing legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/55 to-navy/15"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/40 to-transparent"
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Hero Content (Orchestrated entrance) ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-24 pt-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]"
          >
            Lagos from the water hits different.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-white/85 max-w-xl font-normal leading-relaxed"
          >
            Private boat charters and jet ski rentals across Lagos waterways,
            tailored for celebrations, quiet escapes, and sunset cruises.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-7 sm:mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "bg-gold text-navy px-7 py-3.5 rounded-[10px]",
                "text-[1rem] sm:text-[1.0625rem] font-semibold font-heading",
                "hover:bg-amber active:scale-[0.98] transition-all duration-200",
                "shadow-[0_4px_20px_rgba(247,148,29,0.3)]"
              )}
            >
              Book Now
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
