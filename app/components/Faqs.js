"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

const FAQ_ITEMS = [
  {
    question: "Can I celebrate a special occasion on the boat?",
    answer:
      "Absolutely! You can celebrate birthdays, bridal showers, proposals, girls' trips, anniversaries, and other special moments onboard.",
  },
  {
    question: "How many people can the boat accommodate?",
    answer:
      "Our boat can accommodate groups comfortably. Please contact us with your preferred date and group size so we can recommend the best option.",
  },
  {
    question: "How long is the boat cruise?",
    answer: "Our cruises start from 1 hour.",
  },
  {
    question: "Can I bring food, drinks, or decorations?",
    answer:
      "Yes, you can bring your own food, drinks, and decorations. Our team can also help you plan the setup.",
  },
  {
    question: "How do I book the boat?",
    answer:
      "Simply contact us with your preferred date, time, and number of guests. Our team will confirm availability and guide you through the booking process.",
  },
];

export default function Faqs() {
  // First item open by default
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      id="faqs"
      className="relative min-h-dvh snap-start flex flex-col justify-center bg-sand text-navy py-16 sm:py-20 lg:py-24"
    >
      <div className="w-full max-w-[860px] mx-auto px-5 sm:px-8 my-auto">
        {/* ── Section Header ── */}
        <div className="mb-8 sm:mb-10 text-left">
          <div className="flex items-center gap-2.5 text-ocean">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] font-heading">
              Frequently Asked Questions
            </span>
            <WaveMotif className="text-ocean/50" />
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold font-heading tracking-tight text-navy">
            Clear Answers Before You Cruise
          </h2>
          <p className="mt-2 text-sm sm:text-base text-navy/70 max-w-xl font-normal leading-relaxed">
            Everything you need to know about planning celebrations, guest capacities, cruise durations, and reservations.
          </p>
        </div>

        {/* ── Single-Column Accordion ── */}
        <div className="space-y-3 sm:space-y-3.5">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={clsx(
                  "rounded-2xl transition-all duration-200 border",
                  isOpen
                    ? "bg-white border-ocean/30 shadow-[0_4px_24px_rgba(18,32,63,0.04)]"
                    : "bg-white/70 border-navy/[0.08] hover:bg-white hover:border-navy/20"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  className="w-full text-left py-4.5 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 rounded-2xl"
                >
                  <span
                    className={clsx(
                      "font-heading font-medium text-base sm:text-lg tracking-tight transition-colors duration-150 pr-2",
                      isOpen ? "text-navy font-semibold" : "text-navy/90"
                    )}
                  >
                    {item.question}
                  </span>

                  <span
                    className={clsx(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200",
                      isOpen
                        ? "bg-ocean/10 text-ocean rotate-180"
                        : "bg-sand text-navy/50 group-hover:text-navy"
                    )}
                    aria-hidden="true"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`faq-content-${index}`}
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.2, 0.9, 0.4, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-sm sm:text-base text-navy/75 font-normal leading-relaxed border-t border-navy/[0.04] mt-1 pt-3">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
