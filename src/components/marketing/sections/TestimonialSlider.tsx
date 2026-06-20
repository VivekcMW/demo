"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
  metric: string;
  metricLabel: string;
  avatar: string;
}

const AUTOPLAY_DELAY = 5000;

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animDir, setAnimDir] = useState<"next" | "prev">("next");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { t } = useTranslation();

  const testimonials: Testimonial[] = [
    {
      quote: t("testimonials.testimonial1Quote"),
      author: t("testimonials.testimonial1Author"),
      role: "Medical Director",
      organization: t("testimonials.testimonial1Org"),
      metric: "90 min",
      metricLabel: "Discharge time",
      avatar: "MD",
    },
    {
      quote: t("testimonials.testimonial2Quote"),
      author: t("testimonials.testimonial2Author"),
      role: "Chief Nephrologist",
      organization: t("testimonials.testimonial2Org"),
      metric: "8",
      metricLabel: "Centers standardized",
      avatar: "CN",
    },
    {
      quote: t("testimonials.testimonial3Quote"),
      author: t("testimonials.testimonial3Author"),
      role: "Nursing Superintendent",
      organization: t("testimonials.testimonial3Org"),
      metric: "0",
      metricLabel: "Paper backup records",
      avatar: "NS",
    },
    {
      quote: "Revenue leakage dropped by 23% in the first quarter. The billing team finally has visibility.",
      author: "CFO",
      role: "Chief Financial Officer",
      organization: "350-bed super-specialty, Chennai",
      metric: "23%",
      metricLabel: "Revenue recovered",
      avatar: "CF",
    },
    {
      quote: "The OPD queue system reduced patient waiting time. Front desk handles 180+ patients a day without stress.",
      author: "Hospital Administrator",
      role: "Administrator",
      organization: "Tertiary hospital, Hyderabad",
      metric: "180+",
      metricLabel: "Patients/day",
      avatar: "HA",
    },
  ];

  const total = testimonials.length;

  const go = useCallback((dir: "next" | "prev") => {
    setAnimDir(dir);
    setCurrent((c) => (dir === "next" ? (c + 1) % total : (c - 1 + total) % total));
  }, [total]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!paused) {
      timerRef.current = setTimeout(() => go("next"), AUTOPLAY_DELAY);
    }
  }, [paused, go]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, resetTimer]);

  const t_ = testimonials[current];
  const avatarColors = [
    "bg-teal-100 text-teal-700",
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
  ];

  return (
    <section className="marketing-section bg-section-alt overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow={t("testimonials.eyebrow")}
          title={t("testimonials.title")}
        />

        <div
          className="mt-10 sm:mt-14 max-w-4xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Main card */}
          <div
            key={current}
            className={`relative bg-white rounded-2xl shadow-xl border border-[var(--border-default)] p-8 sm:p-10 md:p-12 animate-slide-card`}
          >
            {/* Top row: stars + metric */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl sm:text-3xl font-bold text-[var(--action-primary)]">{t_.metric}</div>
                <div className="text-xs text-[var(--text-secondary)]">{t_.metricLabel}</div>
              </div>
            </div>

            {/* Quote */}
            <Quote className="w-8 h-8 text-[var(--action-primary)] opacity-20 mb-3" />
            <blockquote className="text-lg sm:text-xl md:text-2xl text-[var(--text-primary)] leading-relaxed font-medium">
              &ldquo;{t_.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${avatarColors[current % avatarColors.length]}`}>
                {t_.avatar}
              </div>
              <div>
                <div className="font-semibold text-[var(--text-primary)]">{t_.author}</div>
                <div className="text-sm text-[var(--text-secondary)]">{t_.role} · {t_.organization}</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-8 h-0.5 bg-[var(--border-default)] rounded-full overflow-hidden">
              <div
                key={`${current}-progress`}
                className="h-full bg-[var(--action-primary)] rounded-full"
                style={{
                  width: paused ? "0%" : "100%",
                  transition: paused ? "none" : `width ${AUTOPLAY_DELAY}ms linear`,
                }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAnimDir(i > current ? "next" : "prev"); setCurrent(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-2 bg-[var(--action-primary)]"
                      : "w-2 h-2 bg-[var(--border-default)] hover:bg-[var(--action-primary)]/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => go("prev")}
                className="w-10 h-10 rounded-full border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--action-primary)] hover:text-[var(--action-primary)] transition-colors"
                aria-label={t("testimonials.previous")}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => go("next")}
                className="w-10 h-10 rounded-full border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--action-primary)] hover:text-[var(--action-primary)] transition-colors"
                aria-label={t("testimonials.next")}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mini cards preview */}
          <div className="mt-6 grid grid-cols-5 gap-2 opacity-60">
            {testimonials.map((item, i) => (
              <button
                key={i}
                onClick={() => { setAnimDir(i > current ? "next" : "prev"); setCurrent(i); }}
                className={`p-2 rounded-lg border text-left transition-all text-xs truncate ${
                  i === current
                    ? "border-[var(--action-primary)] bg-[var(--action-subtle)] opacity-100"
                    : "border-[var(--border-default)] bg-white hover:border-[var(--action-primary)]/40"
                }`}
              >
                <div className="font-medium text-[var(--text-primary)] truncate">{item.author}</div>
                <div className="text-[var(--text-secondary)] truncate">{item.organization.split(",")[0]}</div>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

            </div>

            {/* Navigation */}
            <div className="mt-6 sm:mt-8 flex items-center justify-between border-t border-[var(--border-default)] pt-4 sm:pt-6">
              <div className="flex gap-1.5 sm:gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === current
                        ? "bg-[var(--action-primary)]"
                        : "bg-slate-200 hover:bg-slate-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="p-1.5 sm:p-2 rounded-full border border-[var(--border-default)] hover:bg-[var(--surface-sunken)] transition-colors"
                  aria-label={t("testimonials.previous")}
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-secondary)]" />
                </button>
                <button
                  onClick={next}
                  className="p-1.5 sm:p-2 rounded-full border border-[var(--border-default)] hover:bg-[var(--surface-sunken)] transition-colors"
                  aria-label={t("testimonials.next")}
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-secondary)]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
