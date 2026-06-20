"use client";

import {
  Activity,
  UserCheck,
  Stethoscope,
  Calendar,
  PenTool,
  Droplet,
  Pill,
  Target,
  TrendingUp,
  Clock,
  AlertCircle,
  Smartphone,
  Shield,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  FAQBlock,
  PageCTA,
  PageBreadcrumb,
  CrossLinks,
} from "@/components/marketing/templates";
import { EndocrinologyDashboard } from "@/components/marketing/specialty/endocrinology";
import { endocrinologyTemplates } from "@/data/seeded/endocrinology";
import { useTranslation } from "@/hooks/useTranslation";

const problems = [
  {
    icon: Droplet,
    title: "Scattered Glucose Data",
    description:
      "Patient glucose logs in notebooks, lab HbA1c in reports, CGM data in apps — no unified view to guide treatment decisions.",
  },
  {
    icon: Clock,
    title: "Insulin Dose Guesswork",
    description:
      "Without seeing patterns across visits, insulin adjustments become trial and error. Poor titration leads to hypoglycemia or poor control.",
  },
  {
    icon: AlertCircle,
    title: "Missed Complications",
    description:
      "Annual eye exams, foot checks, kidney function — tracking when each patient is due for screening is nearly impossible at scale.",
  },
];

const features = [
  {
    icon: Droplet,
    title: "Diabetes Registry & Analytics",
    description:
      "Comprehensive diabetes registry with population-level insights. Track HbA1c trends, time-in-range, and control rates across your patient panel.",
    highlights: [
      "HbA1c trending",
      "Time-in-range analysis",
      "Population analytics",
      "Control rate tracking",
    ],
  },
  {
    icon: Pill,
    title: "Intelligent Insulin Management",
    description:
      "Track all insulin regimens — basal-bolus, premixed, pump. Log dose adjustments with rationale. Pattern detection for hypoglycemia risk.",
    highlights: [
      "Regimen tracking",
      "Dose adjustment logs",
      "Hypo risk alerts",
      "Titration protocols",
    ],
  },
  {
    icon: Activity,
    title: "Thyroid & Endocrine Tracking",
    description:
      "Complete thyroid management from TSH monitoring to nodule surveillance. PCOS, adrenal, and pituitary disorder workflows included.",
    highlights: [
      "TSH trending",
      "Nodule tracking",
      "PCOS protocols",
      "Medication titration",
    ],
  },
  {
    icon: Target,
    title: "Complication Screening",
    description:
      "Automated reminders for retinopathy screening, nephropathy monitoring, foot exams, and cardiac risk assessment. Never miss a screening.",
    highlights: [
      "Eye exam reminders",
      "Nephropathy tracking",
      "Foot exam scheduling",
      "Risk stratification",
    ],
  },
];

const faqs = [
  {
    question: "How does the diabetes registry work?",
    answer:
      "Every diabetes patient is automatically enrolled in the registry with their diagnosis type, treatment regimen, and key metrics (HbA1c, weight, BP). You can filter by control status, medication type, or complication risk to identify patients needing intervention.",
  },
  {
    question: "Can I integrate CGM data into the system?",
    answer:
      "Yes. We integrate with major CGM platforms (Libre, Dexcom) to pull glucose data, time-in-range metrics, and AGP reports directly into the patient chart. This data informs your visit documentation and insulin adjustments.",
  },
  {
    question: "How are insulin dose adjustments tracked?",
    answer:
      "Every insulin adjustment is logged with date, rationale (fasting high, post-meal spikes, hypo events), and expected outcome. The system shows a timeline of all adjustments to help you identify patterns and refine therapy.",
  },
  {
    question: "How do complication screening reminders work?",
    answer:
      "Based on diabetes duration and risk factors, the system calculates when each screening is due (annual dilated eye exam, yearly urine microalbumin, quarterly foot check). Reminders appear on the patient chart and in your daily task list.",
  },
  {
    question: "Can patients share their glucose logs before visits?",
    answer:
      "Yes. Patients can log glucose readings in our companion app or share screenshots of their glucometer logs. This data is available in the chart before the consultation, making visits more efficient.",
  },
];

export default function EndocrinologyPage() {
  const { t } = useTranslation();
  return (
    <main className="flex flex-col">
      {/* Breadcrumb */}
      <PageBreadcrumb
        items={[
          { label: t("page.specialties"), href: "/specialties" },
          { label: t("page.endocrinology") },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-linear-to-br from-violet-50 via-white to-purple-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-6">
              <Activity className="w-4 h-4" />
              {t("page.endocrinology")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Diabetes Care,{" "}
              <span className="text-violet-600">Elevated</span>
            </h1>
            <p className="text-lg md:text-xl text-(--text-secondary) mb-8 max-w-2xl mx-auto">
              Track every HbA1c, optimize every insulin dose, and never miss a complication screening — 
              all in one specialized platform for endocrinologists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 bg-violet-600 hover:bg-violet-700">
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
            title="Diabetes Management Challenges"
            subtitle="With 77 million diabetics in India, managing chronic care at scale requires specialized tools."
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
            title="Purpose-Built for Endocrine Practice"
            subtitle="Every feature designed for the unique needs of diabetes and thyroid management."
          />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl border border-(--border-default) bg-white"
                >
                  <div className="w-12 h-12 rounded-lg bg-violet-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-violet-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-(--text-secondary) mb-4">{feature.description}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {feature.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-(--text-secondary)">
                        <UserCheck className="w-4 h-4 text-violet-600 shrink-0" />
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
            subtitle="Experience the endocrinology dashboard that helps physicians manage hundreds of diabetic patients."
          />
          <div className="mt-10">
            <EndocrinologyDashboard />
          </div>
        </Container>
      </section>

      {/* Templates Section */}
      <section className="py-16 bg-(--bg-subtle)">
        <Container>
          <SectionHeader
            eyebrow={t("page.documentation")}
            title="Endocrine Templates Library"
            subtitle="Specialized templates for diabetes, thyroid, and metabolic disorders."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {endocrinologyTemplates.map((template) => (
              <div
                key={template.id}
                className="p-4 rounded-lg border border-(--border-default) bg-white flex items-center justify-between hover:border-violet-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                    <PenTool className="w-5 h-5 text-violet-600" />
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
            title="Connected Diabetes Ecosystem"
            subtitle="Seamlessly integrate with devices, labs, and patient apps."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Smartphone, name: "CGM Systems", desc: "Libre, Dexcom" },
              { icon: Target, name: "Labs", desc: "HbA1c, Lipids, Kidney" },
              { icon: Shield, name: "Glucometers", desc: "Patient home data" },
              { icon: TrendingUp, name: "Analytics", desc: "Population insights" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="p-4 rounded-xl border border-(--border-default) bg-(--bg-subtle) text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-violet-600" />
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
      <FAQBlock
        title={t("page.frequentlyAskedQuestions")}
        faqs={faqs}
      />

      {/* CTA Section */}
      <PageCTA
        title={t("page.ctaTitle", { name: "Endocrinology" })}
        subtitle="Join endocrinologists across India delivering better chronic care with AarogyaEHR."
        primaryCta={{ label: t("page.startFreeTrial"), href: "/demo" }}
        secondaryCta={{ label: t("page.talkToSales"), href: "/contact" }}
      />

      {/* Cross Links */}
      <CrossLinks
        title={t("page.relatedSpecialties")}
        links={[
          { href: "/specialties/cardiology", label: t("page.cardiology") },
          { href: "/specialties/nephrology", label: "Nephrology" },
          { href: "/specialties/general-medicine", label: t("page.generalMedicine") },
          { href: "/specialties/bariatric-surgery", label: "Bariatric Surgery" },
        ]}
      />
    </main>
  );
}
