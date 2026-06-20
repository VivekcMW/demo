"use client";

import {
  HeartPulse,
  UserCheck,
  Stethoscope,
  Calendar,
  FileText,
  PenTool,
  Wind,
  Droplet,
  TrendingUp,
  Activity,
  Shield,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  FAQSection,
  PageCTA,
  PageBreadcrumb,
  CrossLinks,
} from "@/components/marketing/templates";
import { CriticalCareDashboard } from "@/components/marketing/specialty/critical-care";
import { criticalCareTemplates } from "@/data/seeded/critical-care";
import { useTranslation } from "@/hooks/useTranslation";

const problems = [
  {
    icon: Activity,
    title: "Information Overload",
    description:
      "Multiple monitors, lab systems, and paper charts. Critical data buried in noise. Trends missed in the chaos.",
  },
  {
    icon: Clock,
    title: "Bundle Compliance Gaps",
    description:
      "Sepsis bundles, VAP prevention, CLABSI protocols — tracking compliance across patients is nearly impossible manually.",
  },
  {
    icon: FileText,
    title: "Incomplete Documentation",
    description:
      "Hourly charting, I/O calculations, and severity scores done on paper. Night shift handovers miss critical information.",
  },
];

const features = [
  {
    icon: HeartPulse,
    title: "Unified Patient Dashboard",
    description:
      "All patient data on one screen: vitals, labs, ventilator settings, medications, and trends. Real-time updates from monitors.",
    highlights: [
      "Vitals streaming",
      "Lab integration",
      "Medication tracking",
      "Trend visualization",
    ],
  },
  {
    icon: Wind,
    title: "Ventilator Management",
    description:
      "Complete ventilator tracking from initiation to weaning. Mode changes, ABG correlation, and weaning trial documentation.",
    highlights: [
      "Vent settings log",
      "ABG correlation",
      "Weaning protocols",
      "Extubation checklist",
    ],
  },
  {
    icon: Droplet,
    title: "Fluid & Hemodynamics",
    description:
      "Automated I/O calculations, fluid balance trends, and vasopressor titration tracking. CVP, MAP trending built-in.",
    highlights: [
      "Auto I/O calculation",
      "Fluid balance charts",
      "Vasopressor tracking",
      "Hemodynamic trends",
    ],
  },
  {
    icon: AlertCircle,
    title: "Severity & Bundles",
    description:
      "Automated APACHE II, SOFA scoring. Bundle compliance tracking for sepsis, VAP, CLABSI, and CAUTI prevention.",
    highlights: [
      "APACHE/SOFA auto-calc",
      "Sepsis bundle",
      "VAP prevention",
      "CLABSI/CAUTI tracking",
    ],
  },
];

const faqs = [
  {
    question: "How does ventilator data integration work?",
    answer:
      "We integrate with major ventilator brands (Drager, Hamilton, Philips) via HL7/serial interfaces. Settings, measurements, and alarms flow directly into the patient chart. ABG results are correlated automatically.",
  },
  {
    question: "Can I track severity scores automatically?",
    answer:
      "Yes. APACHE II and SOFA scores are calculated automatically using data from vitals, labs, and clinical inputs. Scores update in real-time as new data arrives, with trends displayed graphically.",
  },
  {
    question: "How does bundle compliance tracking work?",
    answer:
      "Each bundle (sepsis, VAP prevention, etc.) has defined elements with time targets. The system tracks completion, sends reminders, and generates compliance reports. Non-compliance is flagged in real-time.",
  },
  {
    question: "How are night shift handovers handled?",
    answer:
      "The handover module generates a structured summary for each patient: current status, overnight events, pending tasks, and critical alerts. This ensures complete information transfer between shifts.",
  },
  {
    question: "Can nurses do hourly charting on tablets?",
    answer:
      "Yes. Our mobile-optimized charting interface allows bedside nurses to document vitals, I/O, neurological checks, and interventions on tablets. Data syncs in real-time to the central dashboard.",
  },
];

export default function CriticalCareICUPage() {
  const { t } = useTranslation();
  return (
    <main className="flex flex-col">
      {/* Breadcrumb */}
      <PageBreadcrumb
        items={[
          { label: t("page.specialties"), href: "/specialties" },
          { label: t("page.criticalCare") },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-linear-to-br from-cyan-50 via-white to-blue-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium mb-6">
              <HeartPulse className="w-4 h-4" />
              {t("page.criticalCare")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Intensive Care{" "}
              <span className="text-cyan-600">Intelligence</span>
            </h1>
            <p className="text-lg md:text-xl text-(--text-secondary) mb-8 max-w-2xl mx-auto">
              Real-time monitoring, automated scoring, and bundle compliance — 
              everything your ICU needs on one intelligent platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 bg-cyan-600 hover:bg-cyan-700">
                <Stethoscope className="w-5 h-5" />
                {t("page.requestDemo")}
              </Button>
              <Button variant="secondary" size="lg" className="gap-2">
                <Calendar className="w-5 h-5" />
                {t("page.scheduleConsultation")}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Problems Section */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeader
            eyebrow={t("page.challenges")}
            title="ICU Management Challenges"
            subtitle="Critical care requires managing vast amounts of data under time pressure. Manual systems can't keep up."
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
            eyebrow={t("page.capabilities")}
            title="Built for Critical Care Excellence"
            subtitle="Every feature designed with input from intensivists and ICU nurses across India."
          />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl border border-(--border-default) bg-white"
                >
                  <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-(--text-secondary) mb-4">{feature.description}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {feature.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-(--text-secondary)">
                        <UserCheck className="w-4 h-4 text-cyan-600 shrink-0" />
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
            eyebrow={t("page.livePreview")}
            title="See It In Action"
            subtitle="Experience the ICU dashboard that powers critical care units across India."
          />
          <div className="mt-10">
            <CriticalCareDashboard />
          </div>
        </Container>
      </section>

      {/* Templates Section */}
      <section className="py-16 bg-(--bg-subtle)">
        <Container>
          <SectionHeader
            eyebrow={t("page.documentation")}
            title="ICU Templates & Protocols"
            subtitle="Pre-built templates for every ICU scenario — from admission to discharge."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {criticalCareTemplates.map((template) => (
              <div
                key={template.id}
                className="p-4 rounded-lg border border-(--border-default) bg-white flex items-center justify-between hover:border-cyan-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                    <PenTool className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{template.name}</p>
                    <p className="text-xs text-(--text-secondary)">{template.category}</p>
                  </div>
                </div>
                <span className="text-xs text-(--text-secondary) bg-gray-100 px-2 py-1 rounded">
                  {t("page.templateMeta", { category: template.category, count: template.usageCount.toLocaleString() })}
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
            eyebrow={t("page.integrations")}
            title="Connected ICU Ecosystem"
            subtitle="Seamlessly integrate with monitors, ventilators, and hospital systems."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Activity, name: "Patient Monitors", desc: "Philips, GE, Mindray" },
              { icon: Wind, name: "Ventilators", desc: "Drager, Hamilton" },
              { icon: Shield, name: "Lab/POCT", desc: "ABG, Lactate" },
              { icon: TrendingUp, name: "Analytics", desc: "Outcomes, benchmarks" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="p-4 rounded-xl border border-(--border-default) bg-(--bg-subtle) text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-cyan-600" />
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
        title={t("page.frequentlyAskedQuestions")}
        faqs={faqs}
      />

      {/* CTA Section */}
      <PageCTA
        title={t("page.ctaTitle", { name: "Critical Care" })}
        subtitle="Join hospitals across India delivering better critical care with AarogyaEHR."
        primaryCta={{ label: t("page.startFreeTrial"), href: "/demo" }}
        secondaryCta={{ label: t("page.talkToSales"), href: "/contact" }}
      />

      {/* Cross Links */}
      <CrossLinks
        title={t("page.relatedSpecialties")}
        links={[
          { href: "/specialties/emergency-medicine", label: t("page.emergencyMedicine") },
          { href: "/specialties/pulmonology", label: "Pulmonology" },
          { href: "/specialties/cardiology", label: t("page.cardiology") },
          { href: "/specialties/nephrology", label: "Nephrology" },
        ]}
      />
    </main>
  );
}
