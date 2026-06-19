"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
  metric?: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "We moved 11 OPDs and 240 beds off paper in 6 weeks. Discharge time dropped from 5 hours to 90 minutes.",
    author: "Medical Director",
    role: "",
    organization: "240-bed multi-specialty hospital, Pune",
    metric: "5 hrs → 90 min discharge",
  },
  {
    quote:
      "The dialysis module finally matches how we actually run our unit. Slot scheduling and package billing just work.",
    author: "Chief Nephrologist",
    role: "",
    organization: "Dialysis chain, 8 centers, Maharashtra",
    metric: "8 centers standardized",
  },
  {
    quote:
      "Our nurses stopped keeping shadow paper records. That's when I knew the system actually worked.",
    author: "Nursing Superintendent",
    role: "",
    organization: "150-bed nursing home, Bangalore",
    metric: "Zero paper backup",
  },
];

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const testimonial = testimonials[current];

  return (
    <section className="marketing-section bg-section-alt">
      <Container>
        <SectionHeader
          eyebrow="Customer stories"
          title="Hospitals that made the switch"
        />

        <div className="mt-8 sm:mt-12 max-w-3xl mx-auto">
          <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
            {/* Quote icon */}
            <div className="absolute -top-3 sm:-top-4 left-6 sm:left-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--action-primary)] flex items-center justify-center">
              <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>

            {/* Quote */}
            <blockquote className="text-lg sm:text-xl md:text-2xl text-[var(--text-primary)] leading-relaxed font-medium pt-2 sm:pt-0">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                  {testimonial.author}
                </div>
                <div className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  {testimonial.organization}
                </div>
              </div>
              {testimonial.metric && (
                <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[var(--action-subtle)] rounded-full text-xs sm:text-sm font-medium text-[var(--action-primary)]">
                  {testimonial.metric}
                </div>
              )}
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
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-secondary)]" />
                </button>
                <button
                  onClick={next}
                  className="p-1.5 sm:p-2 rounded-full border border-[var(--border-default)] hover:bg-[var(--surface-sunken)] transition-colors"
                  aria-label="Next testimonial"
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
