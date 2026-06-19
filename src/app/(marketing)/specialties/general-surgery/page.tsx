"use client";

import {
  Scissors,
  UserCheck,
  Stethoscope,
  Calendar,
  FileText,
  PenTool,
  BedDouble,
  Siren,
  ClipboardCheck,
  TrendingUp,
  Activity,
  Shield,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  FAQSection,
  PageCTA,
  PageBreadcrumb,
  CrossLinks,
} from "@/components/marketing/templates";
import { GeneralSurgeryDashboard } from "@/components/marketing/specialty/general-surgery";
import { generalSurgeryTemplates } from "@/data/seeded/general-surgery";
import { useTranslation } from "@/hooks/useTranslation";

const problems = [
  {
    icon: Scissors,
    title: "OT Scheduling Conflicts",
    description:
      "Multiple surgeons competing for limited OT slots, no visibility into instrument availability, and last-minute cancellations.",
  },
  {
    icon: BedDouble,
    title: "Ward Management Gaps",
    description:
      "Post-op patients scattered across wards, missed rounds, delayed discharge planning, and handover communication failures.",
  },
  {
    icon: FileText,
    title: "Incomplete Documentation",
    description:
      "Operative notes written days after surgery, consent forms lost, and discharge summaries missing critical follow-up instructions.",
  },
];

const features = [
  {
    icon: Scissors,
    title: "Smart OT Scheduling",
    description:
      "Drag-and-drop OT calendar with instrument set allocation, anaesthesia coordination, and real-time status updates.",
    highlights: [
      "Multi-OT management",
      "Instrument set linking",
      "Anaesthesia slots",
      "Turnover analytics",
    ],
  },
  {
    icon: BedDouble,
    title: "Ward Dashboard",
    description:
      "Complete visibility into all admitted patients, bed status, critical alerts, and pending tasks — all on one screen.",
    highlights: [
      "Bed census",
      "Critical alerts",
      "Diet orders",
      "Discharge planning",
    ],
  },
  {
    icon: Siren,
    title: "Emergency Integration",
    description:
      "Seamless handoff from ED to surgery. Track emergency cases, prioritize acute abdomen, and coordinate rapid response.",
    highlights: [
      "Triage integration",
      "Acute abdomen protocol",
      "Emergency OT booking",
      "Team alerts",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Post-Op Care Tracking",
    description:
      "Automated post-op checklists, drain output monitoring, wound care schedules, and complication tracking.",
    highlights: [
      "POD-wise protocols",
      "Drain monitoring",
      "Wound care",
      "Complication alerts",
    ],
  },
];

const faqs = [
  {
    question: "How does OT scheduling work?",
    answer:
      "Our drag-and-drop calendar lets you schedule surgeries across multiple OTs. The system checks surgeon availability, anaesthesia slots, and instrument set readiness before confirming. Real-time status updates show procedure progress.",
  },
  {
    question: "Can I manage emergency surgeries?",
    answer:
      "Yes. Emergency cases can be booked directly from ED with priority override. The system alerts the OT team, anaesthesia, and support staff automatically. Emergency slots can be protected in your schedule.",
  },
  {
    question: "How does ward management integrate with OT?",
    answer:
      "Post-op patients are automatically transferred to the ward census. POD-wise protocols activate based on surgery type, and all orders (diet, medications, monitoring) are pre-populated but editable.",
  },
  {
    question: "What operative note templates are available?",
    answer:
      "We have templates for common procedures: cholecystectomy, appendicectomy, hernia repair, mastectomy, thyroidectomy, and more. Each template captures procedure-specific details and auto-populates billing codes.",
  },
  {
    question: "How are surgical consent forms handled?",
    answer:
      "Digital consent forms with procedure-specific risks are available. Patients can sign on a tablet, and forms are stored in their record. Pre-op checklists ensure all consents are obtained before OT.",
  },
];

export default function GeneralSurgeryPage() {
  const { t } = useTranslation();
  return (
    <main className="flex flex-col">
      {/* Breadcrumb */}
      <PageBreadcrumb
        items={[
          { label: t("page.specialties"), href: "/specialties" },
          { label: "General Surgery" },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-linear-to-br from-emerald-50 via-white to-teal-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
              <Scissors className="w-4 h-4" />
              {t("page.generalSurgery")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Complete Surgical Practice{" "}
              <span className="text-emerald-600">Management</span>
            </h1>
            <p className="text-lg md:text-xl text-(--text-secondary) mb-8 max-w-2xl mx-auto">
              From OPD to OT to ward — manage your entire surgical workflow in one
              integrated platform. Reduce documentation burden, improve outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Stethoscope className="w-5 h-5" />
                Request Demo
              </Button>
              <Button variant="secondary" size="lg" className="gap-2">
                <Calendar className="w-5 h-5" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Problems Section */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeader
            eyebrow="Challenges"
            title="Surgical Practice Bottlenecks"
            subtitle="Managing surgeries, wards, and emergencies across disconnected systems creates patient safety risks."
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {problems.map((problem) => {
              const Icon = problem.icon;
              return (
                <div
                  key={problem.title}
                  className="p-6 rounded-xl border border-red-100 bg-red-50/50"
                >
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-(--text-secondary)">{problem.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-(--bg-subtle)">
        <Container>
          <SectionHeader
            eyebrow="Capabilities"
            title="Built for Surgical Excellence"
            subtitle="Every feature designed with input from practicing surgeons across India."
          />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl border border-(--border-default) bg-white"
                >
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-(--text-secondary) mb-4">{feature.description}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {feature.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-(--text-secondary)">
                        <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Dashboard Embed */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeader
            eyebrow="Live Preview"
            title="See It In Action"
            subtitle="Experience the surgical dashboard that powers hundreds of surgeons daily."
          />
          <div className="mt-10">
            <GeneralSurgeryDashboard />
          </div>
        </Container>
      </section>

      {/* Templates Section */}
      <section className="py-16 bg-(--bg-subtle)">
        <Container>
          <SectionHeader
            eyebrow="Documentation"
            title="Surgical Templates"
            subtitle="Pre-built templates for every surgical scenario — from OPD to OT to discharge."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {generalSurgeryTemplates.map((template) => (
              <div
                key={template.id}
                className="p-4 rounded-lg border border-(--border-default) bg-white flex items-center justify-between hover:border-emerald-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <PenTool className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{template.name}</p>
                    <p className="text-xs text-(--text-secondary)">{template.category}</p>
                  </div>
                </div>
                <span className="text-xs text-(--text-secondary) bg-gray-100 px-2 py-1 rounded">
                  {template.usageCount.toLocaleString()} uses
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Integrations */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeader
            eyebrow="Integrations"
            title="Connected Surgical Ecosystem"
            subtitle="Seamlessly integrate with imaging, labs, and billing systems."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Activity, name: "PACS/Imaging", desc: "CT, USG, X-ray access" },
              { icon: Shield, name: "Anaesthesia", desc: "Pre-op assessment" },
              { icon: FileText, name: "Insurance/TPA", desc: "Pre-auth & claims" },
              { icon: TrendingUp, name: "Analytics", desc: "Surgical outcomes" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="p-4 rounded-xl border border-(--border-default) bg-(--bg-subtle) text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-(--text-secondary)">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <FAQSection
        title="Frequently Asked Questions"
        faqs={faqs}
      />

      {/* CTA Section */}
      <PageCTA
        title={t("page.ctaTitle", { name: "General Surgery" })}
        subtitle="Join surgeons across India who have streamlined their workflows with AarogyaEHR."
        primaryCta={{ label: "Start Free Trial", href: "/demo" }}
        secondaryCta={{ label: "Talk to Sales", href: "/contact" }}
      />

      {/* Cross Links */}
      <CrossLinks
        title={t("page.relatedSpecialties")}
        links={[
          { href: "/specialties/orthopedics", label: "Orthopedics" },
          { href: "/specialties/emergency-medicine", label: "Emergency Medicine" },
          { href: "/specialties/critical-care-icu", label: "Critical Care/ICU" },
          { href: "/specialties/gastroenterology", label: "Gastroenterology" },
        ]}
      />
    </main>
  );
}
