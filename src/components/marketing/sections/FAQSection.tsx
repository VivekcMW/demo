"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const FAQ_CATEGORIES = [
  {
    category: "Implementation & Go-live",
    faqs: [
      {
        q: "How long does implementation actually take?",
        a: "Clinics and nursing homes are typically live in 2–3 weeks. Multi-specialty hospitals with 200+ beds take 6–8 weeks. We assign a dedicated go-live coordinator and handle training, data migration, and cutover support.",
      },
      {
        q: "What does the go-live process look like day by day?",
        a: "Week 1: configuration and data migration. Week 2: staff training in role-specific batches. Week 3: parallel running (old system + AarogyaEHR side by side). Cutover happens on a pre-agreed date with our team on-site or on call. A 30-day hyper-care period follows with priority support.",
      },
      {
        q: "Do you migrate data from our existing system?",
        a: "Yes. We migrate patient master records, past encounter summaries, inventory balances, and billing history. The exact scope depends on your legacy system's export capability. Our team handles the full migration — you don't need a separate IT vendor.",
      },
      {
        q: "Can we run AarogyaEHR alongside our existing system before fully switching?",
        a: "Yes. Parallel running is our standard go-live approach. Your team enters data in both systems for a defined period (usually 1–2 weeks), so they build confidence before the final cutover. Nothing is switched off until you say so.",
      },
      {
        q: "What if our go-live gets delayed due to staff availability?",
        a: "We hold your configuration slot and adjust the timeline at no extra cost. Implementation timelines are flexible — we've worked with hospitals during peak admission seasons, Navratri, and other disruptions. Your dedicated coordinator stays assigned throughout.",
      },
    ],
  },
  {
    category: "Technology & Infrastructure",
    faqs: [
      {
        q: "Does AarogyaEHR work on older hardware?",
        a: "Yes. It's designed for 1366×768 screens and tested on older Core i3 PCs common in Indian hospitals. It runs in any modern browser — Chrome, Edge, or Firefox. No desktop installation required.",
      },
      {
        q: "What happens when our internet goes down?",
        a: "AarogyaEHR includes offline-tolerant data entry for OPD and nursing workflows. Data is queued locally and syncs automatically when connectivity returns. Critical workflows never stop because of network drops.",
      },
      {
        q: "Is AarogyaEHR cloud-based or on-premise?",
        a: "Cloud-hosted by default on AWS Mumbai region — keeping data within India. On-premise deployment is available for large hospitals or networks with data residency requirements. Both options use the same codebase and feature set.",
      },
      {
        q: "What browsers and devices does it support?",
        a: "Chrome, Edge, Firefox, and Safari on Windows, Mac, and Linux desktops. It also works on tablets (Android and iPad). The OPD queue display and nursing station views are optimised for shared terminals and wall-mounted screens.",
      },
      {
        q: "How do you handle system downtime or maintenance?",
        a: "Planned maintenance happens between 2–4 AM IST and is announced at least 48 hours in advance. Unplanned downtime triggers our 15-minute response SLA. Our uptime target is 99.9% — tracked publicly on our status page.",
      },
      {
        q: "Can AarogyaEHR integrate with our existing lab or radiology equipment?",
        a: "Yes. We support HL7 and FHIR-based integrations with most lab analysers and PACS systems. We also have pre-built connectors for common Indian LIS/RIS vendors. Custom integrations are scoped and quoted separately.",
      },
      {
        q: "Do you support barcode and label printing?",
        a: "Yes — sample labels, wristbands, medicine dispensing slips, and pharmacy shelf labels. We work with Zebra, TSC, and any standard label printer accessible on your network.",
      },
    ],
  },
  {
    category: "Clinical & Specialty Features",
    faqs: [
      {
        q: "How many specialties does AarogyaEHR support?",
        a: "42 specialty configurations including General Medicine, Cardiology, Nephrology, Oncology, OBG, Paediatrics, Orthopaedics, Ophthalmology, Psychiatry, ENT, Dermatology, Neurology, and more. Each specialty has its own clinical templates, order sets, and safety logic — not generic fields with a different label.",
      },
      {
        q: "Can doctors customise their own templates?",
        a: "Yes. Every doctor can create personal template libraries for their most common presentations, save favourite drug combinations, and build custom examination checklists. Templates can also be shared across a department or the whole hospital.",
      },
      {
        q: "How does the pharmacy module handle controlled substances?",
        a: "Controlled substances (Schedule H1, X) require dual-authorisation dispensing, maintain a separate narcotic register that auto-populates for regulatory submission, and flag any prescription that exceeds standard dosing thresholds.",
      },
      {
        q: "Does AarogyaEHR support clinical decision support (drug alerts, allergy checks)?",
        a: "Yes — at the point of prescribing. Drug–drug interaction alerts, drug–allergy cross-checks, and dose range warnings appear in real time. Severity is colour-coded (advisory / warning / critical). Critical alerts require an override reason to proceed.",
      },
      {
        q: "How is the IPD nursing workflow handled?",
        a: "Nurses get a dedicated station view with active patient list, pending tasks, vitals entry, intake/output tracking, medication administration records (MAR), and handover notes. Each action is timestamped and attributed to the nurse — fully NABH audit-ready.",
      },
      {
        q: "Can we configure our own disease-specific discharge summaries?",
        a: "Yes. Discharge summary templates are configurable per specialty. You can define mandatory fields, auto-pull diagnosis and procedure codes, link to the billing encounter, and generate print-ready PDFs in the patient's preferred language.",
      },
      {
        q: "Is ICD-10 and procedure coding built in?",
        a: "Yes. Full ICD-10-CM/PCS code library with specialty-specific favourites, search by keyword or code, and POA (Present on Admission) indicators. Codes are linked to the billing module for DRG and TPA claims.",
      },
    ],
  },
  {
    category: "Billing, TPA & Revenue",
    faqs: [
      {
        q: "How is pricing structured?",
        a: "Pricing is per-patient-visit, based on your specialty mix. Higher-complexity specialties (oncology, nephrology, cardiac surgery) are priced slightly higher to reflect the clinical depth. Volume discounts apply automatically above 500 patients/month.",
      },
      {
        q: "Does AarogyaEHR handle GST billing and e-invoicing?",
        a: "Yes. GST-compliant invoicing with GSTIN validation, HSN/SAC codes per service, and IRN generation via the NIC e-invoice portal. GST summaries and GSTR-1 export are available from the finance module.",
      },
      {
        q: "How does TPA and insurance claims processing work?",
        a: "AarogyaEHR includes pre-auth request generation, cashless desk workflows, claim document bundling, and rejection analytics. Common TPA portals (FHPL, Medi Assist, Star, HDFC Ergo, etc.) have pre-built submission templates.",
      },
      {
        q: "Can we handle package billing (e.g. delivery package, CABG package)?",
        a: "Yes. Package definitions include all service components, ward days, and consumable inclusions. At billing, package items are auto-populated and exceptions (out-of-package items) are flagged for manual approval.",
      },
      {
        q: "Does the system support Ayushman Bharat / PMJAY claims?",
        a: "Yes. AB-PMJAY empanelment workflows, pre-auth generation, claim submission, and payment reconciliation are built in. We support NHA's claims portal API directly.",
      },
      {
        q: "How do we track revenue leakage?",
        a: "The billing module flags billable services ordered in clinical modules that haven't been charged — at point-of-care and in end-of-day reconciliation reports. Typical hospitals recover 15–25% additional revenue in the first 90 days.",
      },
    ],
  },
  {
    category: "Compliance & Security",
    faqs: [
      {
        q: "Is ABDM / ABHA integration included in all plans?",
        a: "Yes. ABHA creation, verification, and record linking (Milestone 3) is included in every plan — it's not an add-on. We consider ABDM compliance a baseline, not a premium feature.",
      },
      {
        q: "Is AarogyaEHR NABH-ready?",
        a: "Yes. Audit trails, medication reconciliation, surgical safety checklists, infection control logs, and consent management are all built to meet NABH HCO standards. We've supported hospitals through NABH accreditation cycles.",
      },
      {
        q: "How is patient data protected?",
        a: "Data is encrypted at rest (AES-256) and in transit (TLS 1.3). Role-based access control ensures staff see only what their role requires. All PHI access is logged for audit. We are HIPAA-ready and follow DPDP Act guidelines for Indian data residency.",
      },
      {
        q: "Who owns the patient data?",
        a: "You do — always. AarogyaEHR is a data processor, not a data controller. Patient records belong to your hospital. On contract termination, we provide a full data export in standard formats (HL7 FHIR, CSV) within 30 days, then delete our copies.",
      },
      {
        q: "Can we configure role-based access for different staff types?",
        a: "Yes. Granular permission sets for 15+ role types — from junior nurse to CMO to billing clerk to pharmacy dispenser. Permissions can be further restricted by department, ward, or patient type. All access changes are audit-logged.",
      },
      {
        q: "Does AarogyaEHR support digital consent management?",
        a: "Yes. Procedure-specific consent forms can be presented on a tablet, signed digitally by the patient or guardian, and stored against the encounter. Language-specific consent templates are available for all 12 supported languages.",
      },
    ],
  },
  {
    category: "Multi-Centre & Enterprise",
    faqs: [
      {
        q: "Can we run multiple branches on one system?",
        a: "Yes. Multi-center management with consolidated MIS, cross-center patient lookup, and centralized inventory is supported from the Growth plan upward. Each branch has its own user permissions and department structure.",
      },
      {
        q: "Can patients be referred between our centres within the system?",
        a: "Yes. Internal referrals carry the full clinical record — diagnosis, active medications, recent investigations, and pending orders. The receiving centre sees the patient's history from the moment they accept the referral.",
      },
      {
        q: "How does centralised inventory work across multiple branches?",
        a: "A central warehouse can push stock to branch pharmacies and stores. Inter-branch transfer requests, approval workflows, and reconciliation reports are built in. You can also set branch-level reorder points independently.",
      },
      {
        q: "Is there a corporate MIS dashboard for group-level reporting?",
        a: "Yes. The enterprise dashboard aggregates OPD/IPD volumes, revenue, bed occupancy, top diagnoses, and payer mix across all centres in real time. Custom KPI dashboards can be built for C-suite and operations teams.",
      },
    ],
  },
  {
    category: "Support & Onboarding",
    faqs: [
      {
        q: "Do you provide training for all staff?",
        a: "Training is included for all roles — doctors, nurses, receptionists, billing staff, pharmacists, and lab technicians. We deliver it on-site or via video call, with role-specific modules and hands-on walkthroughs.",
      },
      {
        q: "What does post-go-live support look like?",
        a: "30-day hyper-care immediately after go-live with a dedicated contact. Then ongoing support via in-app chat, WhatsApp, email, and phone — with SLAs of 1 hour for critical issues and 4 hours for standard issues during business hours.",
      },
      {
        q: "Is there a user manual or help documentation?",
        a: "Yes. Role-based help articles, video walkthroughs, and in-app contextual tips are available. We also run monthly webinars covering new features and best practices. All documentation is available in English and Hindi.",
      },
      {
        q: "Can we get dedicated account management?",
        a: "Growth and Enterprise plan customers get a named Customer Success Manager who conducts quarterly business reviews, monitors adoption metrics, and proactively recommends configuration changes as your hospital grows.",
      },
    ],
  },
];

// Flatten for single-accordion mode
const ALL_FAQS = FAQ_CATEGORIES.flatMap((cat) =>
  cat.faqs.map((faq) => ({ ...faq, category: cat.category }))
);

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...FAQ_CATEGORIES.map((c) => c.category)];

  const visibleFaqs =
    activeCategory === "All"
      ? ALL_FAQS
      : ALL_FAQS.filter((f) => f.category === activeCategory);

  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));

  // Reset open item when category changes
  const switchCategory = (cat: string) => {
    setActiveCategory(cat);
    setOpen(null);
  };

  return (
    <section className="marketing-section bg-section-alt">
      <Container>
        <SectionHeader
          eyebrow="FAQ"
          title="Common questions, honest answers."
          subtitle={`${ALL_FAQS.length} questions across implementation, clinical features, billing, compliance, and support.`}
        />

        {/* Category filter tabs */}
        <div className="mt-8 sm:mt-10 flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => switchCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === cat
                  ? "bg-(--action-primary) text-white border-(--action-primary)"
                  : "bg-white text-(--text-secondary) border-(--border-default) hover:border-(--action-primary)/50 hover:text-(--action-primary)"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className={`ml-1.5 text-xs ${activeCategory === cat ? "opacity-70" : "opacity-50"}`}>
                  {FAQ_CATEGORIES.find((c) => c.category === cat)?.faqs.length}
                </span>
              )}
              {cat === "All" && (
                <span className={`ml-1.5 text-xs ${activeCategory === cat ? "opacity-70" : "opacity-50"}`}>
                  {ALL_FAQS.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* FAQ accordion */}
        <div className="mt-6 sm:mt-8 max-w-3xl mx-auto space-y-3">
          {visibleFaqs.map((faq, i) => {
            // Use a stable global index so open state matches across category switches
            const globalIdx = ALL_FAQS.indexOf(faq);
            return (
              <ScrollReveal key={faq.q} delay={(i % 3) + 1}>
                <div
                  className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                    open === globalIdx
                      ? "border-(--action-primary) shadow-md"
                      : "border-(--border-default) hover:border-(--action-primary)/40"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => toggle(globalIdx)}
                    aria-expanded={open === globalIdx}
                  >
                    <span className="text-sm sm:text-base font-semibold text-foreground">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-(--action-primary) shrink-0 transition-transform duration-200 ${
                        open === globalIdx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {open === globalIdx && (
                    <div className="px-5 pb-5 animate-accordion">
                      <p className="text-sm sm:text-base text-(--text-secondary) leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
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
