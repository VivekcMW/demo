"use client";

import {
  CheckCircle2,
  Play,
  Stethoscope,
  Heart,
  ClipboardList,
  FileText,
  Users,
  TrendingUp,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  FAQBlock,
  PageCTA,
  PageBreadcrumb,
  CrossLinks,
} from "@/components/marketing/templates";
import { GeneralMedicineDashboard } from "@/components/marketing/specialty/general-medicine";
import { useTranslation } from "@/hooks/useTranslation";

const problems = [
  {
    title: "OPD queues are chaotic and unpredictable",
    description:
      "Patients wait without tokens, doctors have no visibility on who's next, and follow-ups get lost in the crowd. The busiest department runs the blindest.",
    icon: Users,
  },
  {
    title: "Chronic patients slip through the cracks",
    description:
      "Diabetics, hypertensives, and thyroid patients need regular reviews — but paper registers can't flag who's overdue. Complications happen because follow-ups don't.",
    icon: Heart,
  },
  {
    title: "Every prescription starts from scratch",
    description:
      "Common fever workups, diabetes annual reviews, hypertension protocols — doctors rewrite the same orders hundreds of times. Order sets exist in theory, not in practice.",
    icon: ClipboardList,
  },
];

const features = [
  {
    title: "Smart Queue Management",
    description:
      "Token-based queue with real-time status, wait time estimates, visit type classification (new/follow-up), and priority flags for urgent cases.",
    icon: Users,
  },
  {
    title: "Chronic Disease Registry",
    description:
      "Diabetes, hypertension, thyroid, and asthma registries with control metrics, HbA1c/BP tracking, automatic due-date reminders, and defaulter lists.",
    icon: Heart,
  },
  {
    title: "One-Click Order Sets",
    description:
      "Pre-configured order bundles for fever workup, diabetes annual review, hypertension protocol — labs, meds, and follow-ups in a single click.",
    icon: ClipboardList,
  },
  {
    title: "SOAP Documentation",
    description:
      "Quick SOAP notes with smart suggestions, ICD-10 mapping, vitals integration, and prescription generation — built for 3-minute consults.",
    icon: FileText,
  },
];

const faqs = [
  {
    question: "How does the chronic disease registry work?",
    answer:
      "Patients are enrolled in condition-specific registries (DM, HTN, thyroid, asthma) with automated tracking of review dates, lab values (HbA1c, BP, TSH), and control status. Dashboards show who's due, who's overdue, and population-level metrics.",
  },
  {
    question: "Can order sets be customized per doctor?",
    answer:
      "Yes — there's a library of standard order sets, plus each physician can create personal variations. Department-level order sets can be shared across the team.",
  },
  {
    question: "Does it handle high-volume OPD (100+ patients/day)?",
    answer:
      "Absolutely. The system is designed for India's busiest medicine OPDs — quick templates, one-click orders, and parallel queue management keep throughput high without compromising documentation.",
  },
  {
    question: "How are follow-ups tracked?",
    answer:
      "Every prescription can set a follow-up date. The system tracks compliance, flags missed appointments, and generates defaulter lists for outreach. SMS reminders can be automated.",
  },
  {
    question: "Is it integrated with pharmacy and lab?",
    answer:
      "Yes — prescriptions flow directly to the pharmacy queue, and lab orders appear in LIS. Results come back into the patient's record automatically.",
  },
];

const templates = [
  { id: "quick-soap", name: "Quick SOAP Note", category: "General", usageCount: 28500 },
  { id: "fever-eval", name: "Fever Evaluation", category: "Infectious", usageCount: 8200 },
  { id: "dm-review", name: "Diabetes Review", category: "Chronic", usageCount: 6400 },
  { id: "htn-review", name: "Hypertension Review", category: "Chronic", usageCount: 5800 },
  { id: "thyroid-fu", name: "Thyroid Follow-up", category: "Chronic", usageCount: 3200 },
  { id: "resp-infect", name: "Respiratory Infection", category: "Infectious", usageCount: 7100 },
  { id: "gi-symptoms", name: "GI Symptoms Workup", category: "GI", usageCount: 4500 },
  { id: "annual-health", name: "Annual Health Check", category: "Preventive", usageCount: 2100 },
  { id: "referral-note", name: "Specialty Referral", category: "General", usageCount: 3800 },
];

export default function GeneralMedicinePage() {
  const { t } = useTranslation();
  const relatedSpecialties = [
    { label: t("page.endocrinology"), href: "/specialties/endocrinology-diabetology" },
    { label: t("page.cardiology"), href: "/specialties/cardiology" },
    { label: t("page.gastroenterology"), href: "/specialties/gastroenterology" },
    { label: "Pulmonology", href: "/specialties/pulmonology" },
    { label: "Nephrology", href: "/specialties/nephrology" },
  ];
  return (
    <>
      <PageBreadcrumb
        items={[
          { label: t("page.specialties"), href: "/specialties" },
          { label: t("page.generalMedicine") },
        ]}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-linear-to-b from-(--bg-subtle) to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Stethoscope className="w-4 h-4" />
              {t("page.generalMedicine")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              High-volume OPD. Chronic registries. Zero chaos.
            </h1>
            <p className="text-xl text-(--text-secondary) leading-relaxed mb-8">
              Queue management, chronic disease tracking, order sets, and SOAP notes —
              built for India&apos;s busiest medicine departments.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/book-demo">{t("page.bookDemo", { name: "General Medicine" })}</Button>
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
            subtitle={t("page.problemsSubtitle", { name: "General Medicine" })}
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
            title={t("page.workflowsTitle", { name: "General Medicine" })}
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
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-blue-600" />
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
            title={t("page.dashboardPreview", { name: "General Medicine" })}
            subtitle={t("page.dashboardSubtitle")}
          />
          <GeneralMedicineDashboard />
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
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
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
            subtitle="Connected to every department your patients touch."
          />
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {[
              "Pharmacy queue integration",
              "Lab order → LIS",
              "Radiology orders",
              "Vital sign devices",
              "SMS follow-up reminders",
              "Referral to specialists",
              "Insurance pre-auth",
              "Chronic care protocols",
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
      <section className="py-16 md:py-20 bg-blue-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("page.outcomeTitle")}
            </h2>
            <p className="text-lg text-(--text-secondary) leading-relaxed">
              Medicine departments report <strong className="text-blue-700">40% reduction in patient wait times</strong> and <strong className="text-blue-700">95%+ chronic care follow-up compliance</strong> — because the system tracks what matters.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <FAQBlock faqs={faqs} />

      {/* CTA */}
      <PageCTA
        title={t("page.ctaTitle", { name: "General Medicine" })}
        subtitle={t("page.ctaSubtitle")}
      />

      {/* Related Specialties */}
      <CrossLinks title={t("page.relatedSpecialties")} links={relatedSpecialties} />
    </>
  );
}
