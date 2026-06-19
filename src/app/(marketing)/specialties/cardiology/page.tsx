"use client";

import {
  CheckCircle2,
  Play,
  Heart,
  Activity,
  Zap,
  ClipboardList,
  FileText,
  MonitorCheck,
  TrendingUp,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  FAQSection,
  PageCTA,
  PageBreadcrumb,
  CrossLinks,
} from "@/components/marketing/templates";
import { CardiologyDashboard } from "@/components/marketing/specialty/cardiology";
import { useTranslation } from "@/hooks/useTranslation";

const problems = [
  {
    title: "Echo reports are PDF islands",
    description:
      "EF values trapped in scanned PDFs, valve gradients not in structured data. Trending cardiac function over time requires digging through folders.",
    icon: MonitorCheck,
  },
  {
    title: "Cath lab documentation is fragmented",
    description:
      "Procedure notes in one system, images in PACS, stent details on paper. Complete interventional records require stitching three sources together.",
    icon: Zap,
  },
  {
    title: "CCU handoffs are risky",
    description:
      "Critical troponins, hemodynamic trends, and ventilator changes scattered. Night shift starts without a complete picture of the day's events.",
    icon: Heart,
  },
];

const features = [
  {
    title: "Structured Echo Reporting",
    description:
      "Template-driven 2D Echo reports with EF trending, valve assessment, and automatic comparison with previous studies. No more PDF hunting.",
    icon: MonitorCheck,
  },
  {
    title: "Cath Lab Integration",
    description:
      "CAG findings, PCI details, stent registry, and radiation exposure — all captured during the procedure. PACS images linked automatically.",
    icon: Zap,
  },
  {
    title: "CCU Dashboard",
    description:
      "Real-time bed board with troponin trends, hemodynamic monitoring, ventilator settings, and IABP status. Critical alerts front and center.",
    icon: Heart,
  },
  {
    title: "Cardiac Rehab Tracking",
    description:
      "Post-MI and post-CABG rehabilitation protocols with exercise tolerance logging, medication adherence, and lifestyle modification tracking.",
    icon: Activity,
  },
];

const faqs = [
  {
    question: "Can Echo reports be compared over time?",
    answer:
      "Yes — EF, chamber dimensions, and valve gradients are stored as structured data. The system auto-generates comparison tables showing trends across studies.",
  },
  {
    question: "How does Cath Lab documentation work?",
    answer:
      "Procedure templates capture vessel anatomy, lesion details, intervention performed, and stent specifications. Images from the Cath Lab system are linked automatically.",
  },
  {
    question: "Is there a stent registry?",
    answer:
      "Yes — all implanted stents are tracked with specifications, batch numbers, and implant dates. Required for CDSCO compliance and recall management.",
  },
  {
    question: "How are critical cardiac alerts handled?",
    answer:
      "Troponin elevations, ST changes on monitoring, and hemodynamic instability trigger automatic alerts to the on-call team with escalation protocols.",
  },
  {
    question: "Does it support cardiac rehabilitation programs?",
    answer:
      "Yes — structured cardiac rehab protocols with exercise prescriptions, progress tracking, and lifestyle modification checklists for post-MI and post-CABG patients.",
  },
];

const templates = [
  { id: "chest-pain", name: "Chest Pain Evaluation", category: "Emergency", usageCount: 5200 },
  { id: "ihd-review", name: "IHD Follow-up", category: "Chronic", usageCount: 8400 },
  { id: "htn-review", name: "Hypertension Review", category: "Chronic", usageCount: 7800 },
  { id: "hf-review", name: "Heart Failure Review", category: "Chronic", usageCount: 3200 },
  { id: "echo-report", name: "2D Echo Report", category: "Diagnostic", usageCount: 12500 },
  { id: "tmt-report", name: "TMT Report", category: "Diagnostic", usageCount: 4800 },
  { id: "cag-report", name: "CAG Report", category: "Intervention", usageCount: 1200 },
  { id: "pci-note", name: "PCI Procedure Note", category: "Intervention", usageCount: 680 },
  { id: "pacemaker", name: "Pacemaker Implant", category: "Intervention", usageCount: 220 },
];

const relatedSpecialties = [
  { label: "General Medicine", href: "/specialties/general-medicine" },
  { label: "Critical Care / ICU", href: "/specialties/critical-care" },
  { label: "CTVS", href: "/specialties/ctvs" },
  { label: "Emergency Medicine", href: "/specialties/emergency-medicine" },
  { label: "Endocrinology", href: "/specialties/endocrinology-diabetology" },
];

export default function CardiologyPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageBreadcrumb
        items={[
          { label: t("page.specialties"), href: "/specialties" },
          { label: "Cardiology" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-linear-to-b from-(--bg-subtle) to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              {t("cardiology.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t("cardiology.heroTitle")}
            </h1>
            <p className="text-xl text-(--text-secondary) leading-relaxed mb-8">
              {t("cardiology.heroSubtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/book-demo">{t("page.bookDemo", { name: "Cardiology" })}</Button>
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
            subtitle={t("page.problemsSubtitle", { name: "Cardiology" })}
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
            title={t("page.workflowsTitle", { name: "Cardiology" })}
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
                  <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-rose-600" />
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
            title={t("page.dashboardPreview", { name: "Cardiology" })}
            subtitle={t("page.dashboardSubtitle")}
          />
          <CardiologyDashboard />
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
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-rose-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {template.name}
                  </p>
                  <p className="text-xs text-(--text-secondary)">
                    {template.category} • {template.usageCount.toLocaleString()} uses
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
            subtitle="Connected to your existing cardiac equipment."
          />
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {[
              t("cardiology.integr1"),
              t("cardiology.integr2"),
              t("cardiology.integr3"),
              t("cardiology.integr4"),
              t("cardiology.integr5"),
              t("cardiology.integr6"),
              t("cardiology.integr7"),
              t("cardiology.integr8"),
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
      <section className="py-16 md:py-20 bg-rose-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <TrendingUp className="w-12 h-12 text-rose-600 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("page.outcomeTitle")}
            </h2>
            <p
              className="text-lg text-(--text-secondary) leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("cardiology.outcomeLine") }}
            />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <FAQSection faqs={faqs} />

      {/* CTA */}
      <PageCTA
        title={t("cardiology.ctaTitle")}
        subtitle={t("cardiology.ctaSubtitle")}
      />

      {/* Related Specialties */}
      <CrossLinks title={t("page.relatedSpecialties")} links={relatedSpecialties} />
    </>
  );
}
