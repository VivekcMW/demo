"use client";

import {
  CheckCircle2,
  Play,
  Baby,
  Syringe,
  Heart,
  ClipboardList,
  FileText,
  Scale,
  Activity,
  TrendingUp,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  FAQSection,
  PageCTA,
  PageBreadcrumb,
  CrossLinks,
} from "@/components/marketing/templates";
import { PediatricsDashboard } from "@/components/marketing/specialty/pediatrics";
import { useTranslation } from "@/hooks/useTranslation";

const problems = [
  {
    title: "Vaccination records are incomplete",
    description:
      "Parents carry different cards, dates don't match, and no one knows which vaccines are overdue. Catch-up schedules become guesswork.",
    icon: Syringe,
  },
  {
    title: "NICU documentation is fragmented",
    description:
      "Daily weights, feeds, phototherapy hours, and ventilator settings scattered across charts. Handoffs are risky when the trail is paper.",
    icon: Baby,
  },
  {
    title: "Growth monitoring is episodic",
    description:
      "Z-scores calculated on paper, percentiles eyeballed on charts. Malnutrition gets flagged late because trends aren't tracked digitally.",
    icon: Scale,
  },
];

const features = [
  {
    title: "Vaccination Tracker",
    description:
      "IAP schedule with due dates, catch-up logic, overdue alerts, SMS reminders, and batch vaccination for camps and schools.",
    icon: Syringe,
  },
  {
    title: "NICU Module",
    description:
      "Daily notes with weight trends, feed volumes, phototherapy tracking, ventilator parameters, and seamless discharge summaries.",
    icon: Baby,
  },
  {
    title: "WHO Growth Charts",
    description:
      "Auto-plotted weight-for-age, height-for-age, and BMI with Z-score calculations. Malnutrition flags appear automatically.",
    icon: Scale,
  },
  {
    title: "Developmental Screening",
    description:
      "Age-appropriate milestone checklists, developmental delay flags, and referral triggers for early intervention.",
    icon: Activity,
  },
];

const faqs = [
  {
    question: "Which vaccination schedule is supported?",
    answer:
      "The IAP (Indian Academy of Pediatrics) schedule is built-in, with optional vaccines clearly marked. Catch-up schedules are auto-calculated for children with missed doses.",
  },
  {
    question: "Can NICU notes be dictated?",
    answer:
      "Yes — voice-to-text is available for daily NICU notes. Templates ensure all required fields (weight, feeds, vitals, interventions) are captured.",
  },
  {
    question: "How are growth charts generated?",
    answer:
      "Weight, height, and head circumference are plotted against WHO standards automatically. Z-scores are calculated and color-coded. Parents can receive printed charts.",
  },
  {
    question: "Does it support school health programs?",
    answer:
      "Yes — batch vaccination entry, camp registration, and health screening for schools are supported with bulk data capture.",
  },
  {
    question: "Is there a parent portal?",
    answer:
      "Parents can view vaccination due dates, growth charts, and upcoming appointments through a mobile app. Prescription sharing is also available.",
  },
];

const templates = [
  { id: "well-baby", name: "Well-Baby Checkup", category: "Preventive", usageCount: 4200 },
  { id: "vaccination", name: "Vaccination Visit", category: "Immunization", usageCount: 8500 },
  { id: "fever-child", name: "Fever in Child", category: "Acute", usageCount: 6200 },
  { id: "diarrhea", name: "AGE / Diarrhea", category: "Acute", usageCount: 3800 },
  { id: "respiratory", name: "Respiratory Illness", category: "Acute", usageCount: 4100 },
  { id: "growth-assess", name: "Growth Assessment", category: "Preventive", usageCount: 2800 },
  { id: "nicu-admission", name: "NICU Admission", category: "Neonatal", usageCount: 420 },
  { id: "nicu-daily", name: "NICU Daily Note", category: "Neonatal", usageCount: 2100 },
  { id: "discharge-nicu", name: "NICU Discharge", category: "Neonatal", usageCount: 380 },
];

const relatedSpecialties = [
  { label: t("page.obg"), href: "/specialties/obg" },
  { label: "Fetal Medicine", href: "/specialties/fetal-medicine" },
  { label: "Pediatric Surgery", href: "/specialties/pediatric-surgery" },
  { label: "Pediatric Cardiology", href: "/specialties/pediatric-cardiology" },
  { label: t("page.generalMedicine"), href: "/specialties/general-medicine" },
];

export default function PediatricsPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageBreadcrumb
        items={[
          { label: t("page.specialties"), href: "/specialties" },
          { label: t("page.pediatrics") },
        ]}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-linear-to-b from-(--bg-subtle) to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-6">
              <Baby className="w-4 h-4" />
              {t("page.pediatrics")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              From NICU to school physicals — every child, every milestone.
            </h1>
            <p className="text-xl text-(--text-secondary) leading-relaxed mb-8">
              Vaccination tracking, growth charts, NICU documentation, and developmental screening —
              built for India&apos;s pediatric practices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/book-demo">{t("page.bookDemo", { name: "Pediatrics" })}</Button>
              <Button href="#dashboard" variant="secondary">
                <Play className="w-4 h-4 mr-2" />
                {t("page.seeLiveDashboard")}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Problems Section */}
      <section className="py-16 md:py-20">
        <Container>
          <SectionHeader
            title={t("page.problemsTitle")}
            subtitle={t("page.problemsSubtitle", { name: "Pediatrics" })}
          />
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((problem) => {
              const Icon = problem.icon;
              return (
                <div
                  key={problem.title}
                  className="p-6 rounded-xl bg-red-50 border border-red-100"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-(--text-secondary) leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-(--bg-subtle)">
        <Container>
          <SectionHeader
            title={t("page.workflowsTitle", { name: "Pediatrics" })}
            subtitle={t("page.workflowsSubtitle")}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl bg-white border border-(--border-default) hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-(--text-secondary) leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Interactive Dashboard */}
      <section id="dashboard" className="py-16 md:py-20">
        <Container>
          <SectionHeader
            title={t("page.dashboardPreview", { name: "Pediatrics" })}
            subtitle={t("page.dashboardSubtitle")}
          />
          <PediatricsDashboard />
        </Container>
      </section>

      {/* Templates */}
      <section className="py-16 md:py-20 bg-(--bg-subtle)">
        <Container>
          <SectionHeader
            title={t("page.templatesTitle")}
            subtitle={t("page.templatesSubtitle")}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {templates.map((template) => (
              <div
                key={template.id}
                className="flex items-center gap-3 p-4 rounded-lg bg-white border border-(--border-default)"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {template.name}
                  </p>
                  <p className="text-xs text-(--text-secondary)">
                    {t("page.templateMeta", { category: template.category, count: template.usageCount.toLocaleString() })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Integrations */}
      <section className="py-16 md:py-20">
        <Container>
          <SectionHeader
            title={t("page.integrationsTitle")}
            subtitle={t("page.integrationsPediatrics")}
          />
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {[
              "NICU monitors integration",
              "Phototherapy tracking",
              "Growth chart printing",
              "Vaccination SMS reminders",
              "Parent mobile app",
              "OBG → Neonatal handoff",
              "School health camps",
              "Referral to specialists",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-(--bg-subtle) border border-(--border-default)"
              >
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Outcome */}
      <section className="py-16 md:py-20 bg-teal-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <TrendingUp className="w-12 h-12 text-teal-600 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("page.outcomeTitle")}
            </h2>
            <p className="text-lg text-(--text-secondary) leading-relaxed">
              Pediatric units report <strong className="text-teal-700">100% vaccination schedule adherence</strong> and <strong className="text-teal-700">early malnutrition detection in 3x more cases</strong> — because every weight is plotted, every vaccine is tracked.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <FAQSection faqs={faqs} />

      {/* CTA */}
      <PageCTA
        title={t("page.ctaTitle", { name: "Pediatrics" })}
        subtitle={t("page.ctaSubtitle")}
      />

      {/* Related Specialties */}
      <CrossLinks title={t("page.relatedSpecialties")} links={relatedSpecialties} />
    </>
  );
}
