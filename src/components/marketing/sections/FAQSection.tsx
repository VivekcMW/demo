"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const FAQS = [
  {
    q: "How long does implementation actually take?",
    a: "Clinics and nursing homes are typically live in 2–3 weeks. Multi-specialty hospitals with 200+ beds take 6–8 weeks. We assign a dedicated go-live coordinator and handle training, data migration, and cutover support.",
  },
  {
    q: "Does AarogyaEHR work on older hardware?",
    a: "Yes. It's designed for 1366×768 screens and tested on older Core i3 PCs common in Indian hospitals. It runs in any modern browser — Chrome, Edge, or Firefox. No desktop installation required.",
  },
  {
    q: "What happens when our internet goes down?",
    a: "AarogyaEHR includes offline-tolerant data entry for OPD and nursing workflows. Data is queued locally and syncs automatically when connectivity returns. Critical workflows never stop because of network drops.",
  },
  {
    q: "Is ABDM / ABHA integration included in all plans?",
    a: "Yes. ABHA creation, verification, and record linking (Milestone 3) is included in every plan — it's not an add-on. We consider ABDM compliance a baseline, not a premium feature.",
  },
  {
    q: "How is pricing structured?",
    a: "Pricing is per-patient-visit, based on your specialty mix. Higher-complexity specialties (oncology, nephrology, cardiac surgery) are priced slightly higher to reflect the clinical depth. Volume discounts apply automatically above 500 patients/month.",
  },
  {
    q: "Can we run multiple branches on one system?",
    a: "Yes. Multi-center management with consolidated MIS, cross-center patient lookup, and centralized inventory is supported from the Growth plan upward. Each branch has its own user permissions and department structure.",
  },
  {
    q: "Do you provide training for all staff?",
    a: "Training is included for all roles — doctors, nurses, receptionists, billing staff, pharmacists, and lab technicians. We deliver it on-site or via video call, with role-specific modules and hands-on walkthroughs.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));

  return (
    <section className="marketing-section bg-section-alt">
      <Container>
        <SectionHeader
          eyebrow="FAQ"
          title="Common questions, honest answers."
          subtitle="If you don't find what you're looking for, our team responds within 2 hours."
        />

        <div className="mt-10 sm:mt-14 max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <ScrollReveal key={faq.q} delay={(i % 3) + 1}>
              <div
                className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                  open === i
                    ? "border-(--action-primary) shadow-md"
                    : "border-(--border-default) hover:border-(--action-primary)/40"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => toggle(i)}
                  aria-expanded={open === i}
                >
                  <span className="text-sm sm:text-base font-semibold text-foreground">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-(--action-primary) shrink-0 transition-transform duration-200 ${
                      open === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open === i && (
                  <div className="px-5 pb-5 animate-accordion">
                    <p className="text-sm sm:text-base text-(--text-secondary) leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-10 text-center">
            <p className="text-sm text-(--text-secondary)">
              Still have questions?{" "}
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--action-primary) font-medium hover:underline"
              >
                Message us on WhatsApp
              </a>{" "}
              — we respond within 2 hours.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
