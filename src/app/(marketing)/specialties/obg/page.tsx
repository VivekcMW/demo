"use client";

import {
  CheckCircle2,
  Play,
  Baby,
  Heart,
  AlertTriangle,
  Activity,
  ClipboardList,
  FileText,
  Bed,
  Stethoscope,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  FAQSection,
  PageCTA,
  PageBreadcrumb,
  CrossLinks,
} from "@/components/marketing/templates";
import { OBGDashboard } from "@/components/marketing/specialty/obg";
import { useTranslation } from "@/hooks/useTranslation";

const problems = [
  {
    title: "ANC visits scattered across registers",
    description:
      "High-risk flags get lost between the OPD card, the scan report, and the mother's file. Critical information disappears at the worst possible time.",
    icon: AlertTriangle,
  },
  {
    title: "Labour-room documentation under pressure",
    description:
      "Partographs on paper are incomplete exactly when they matter most — medico-legally and clinically. Digital capture is the only reliable solution.",
    icon: Bed,
  },
  {
    title: "PC-PNDT compliance is manual and risky",
    description:
      "Form-F errors carry license-level consequences, yet most units still run on photocopies. One missed field can mean suspension.",
    icon: ClipboardList,
  },
];

const features = [
  {
    title: "ANC Journey Tracker",
    description:
      "Visit-wise ANC record with EDD auto-calculation, trimester checklists, high-risk scoring (anemia, PIH, GDM) that follows the mother to every department.",
    icon: Baby,
  },
  {
    title: "Digital Partograph",
    description:
      "WHO-pattern partograph with alert/action line plotting, contraction and FHR charting on labour-room tablets, automatic time-stamping for medico-legal integrity.",
    icon: Activity,
  },
  {
    title: "Delivery & OT Documentation",
    description:
      "Normal delivery notes, LSCS operative templates with consent capture, newborn record creation linked to the mother, birth register auto-population.",
    icon: Heart,
  },
  {
    title: "PC-PNDT Built In",
    description:
      "Form-F captured inside the obstetric USG workflow with statutory register exports — no parallel paperwork, full compliance.",
    icon: ClipboardList,
  },
];

const faqs = [
  {
    question: "Does the newborn get a linked record automatically?",
    answer:
      "Yes — baby records are created at delivery, linked to the mother, with birth weight, APGAR, and immunization due-lists. NICU handoff happens seamlessly if needed.",
  },
  {
    question: "Is Form-F legally compliant?",
    answer:
      "The capture follows the statutory format with register exports; your radiologist/obstetrician reviews and signs digitally. Full audit trail maintained.",
  },
  {
    question: "Can ASHA/ANM referral data be captured?",
    answer:
      "Referral-in source fields and high-risk referral documentation are part of the ANC record. Camp and PHC referrals are tracked end-to-end.",
  },
  {
    question: "How does high-risk pregnancy tracking work?",
    answer:
      "Automatic flagging based on clinical criteria (PIH, GDM, previous LSCS, age extremes, etc.). High-risk patients appear on dedicated dashboards with visit compliance tracking.",
  },
  {
    question: "Does it support maternity packages?",
    answer:
      "Yes — package billing for normal/LSCS with auto-tracked inclusions, scheme support (JSY/PM-JAY), deposit and final-bill clarity for families.",
  },
];

const templates = [
  { id: "anc-reg", name: "ANC Registration", category: "Obstetrics", usageCount: 4250 },
  { id: "anc-followup", name: "ANC Follow-up", category: "Obstetrics", usageCount: 12800 },
  { id: "partograph", name: "Digital Partograph", category: "Labor", usageCount: 1890 },
  { id: "nvd-note", name: "Normal Delivery Note", category: "Delivery", usageCount: 1420 },
  { id: "lscs-note", name: "LSCS Operative Note", category: "Surgery", usageCount: 680 },
  { id: "pph-checklist", name: "PPH Management Checklist", category: "Emergency", usageCount: 85 },
  { id: "gynec-opd", name: "Gynec OPD (AUB/PCOS)", category: "Gynecology", usageCount: 3200 },
  { id: "hysterectomy", name: "Hysterectomy Note", category: "Surgery", usageCount: 420 },
  { id: "newborn-exam", name: "Newborn Examination", category: "Neonatology", usageCount: 1890 },
];

const relatedSpecialties = [
  { label: "Pediatrics & Neonatology", href: "/specialties/pediatrics-neonatology" },
  { label: "IVF & Reproductive Medicine", href: "/specialties/ivf-reproductive-medicine" },
  { label: "Fetal Medicine", href: "/specialties/fetal-medicine" },
  { label: "General Surgery", href: "/specialties/general-surgery" },
  { label: "Anesthesiology", href: "/specialties/anaesthesiology" },
];

export default function OBGPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageBreadcrumb
        items={[
          { label: t("page.specialties"), href: "/specialties" },
          { label: "Obstetrics & Gynaecology" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-linear-to-b from-(--bg-subtle) to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
              <Baby className="w-4 h-4" />
              {t("page.obg")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              From the first ANC visit to the birth register — one record.
            </h1>
            <p className="text-xl text-(--text-secondary) leading-relaxed mb-8">
              Antenatal tracking, digital partograph, delivery documentation,
              and PC-PNDT compliance, built for India&apos;s busiest maternity units.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/book-demo">{t("page.bookDemo", { name: "OBG" })}</Button>
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
            subtitle={t("page.problemsSubtitle", { name: "OBG" })}
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
            title={t("page.workflowsTitle", { name: "OBG" })}
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
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-purple-600" />
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
            title={t("page.dashboardPreview", { name: "OBG" })}
            subtitle={t("page.dashboardSubtitle")}
          />
          <OBGDashboard />
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
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-purple-600" />
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

      {/* Device Integrations */}
      <section className="py-16 md:py-20">
        <Container>
          <SectionHeader
            title={t("page.integrationsTitle")}
            subtitle="Connect your existing equipment for seamless data flow."
          />
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {[
              "Obstetric USG (PC-PNDT)",
              "CTG trace attachment",
              "NICU handoff to Pediatrics",
              "Birth registration exports",
              "Fetal Doppler",
              "Labor room tablets",
              "Newborn hearing screening",
              "Scheme integration (JSY/PM-JAY)",
            ].map((device) => (
              <div
                key={device}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-(--bg-subtle) border border-(--border-default)"
              >
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-sm text-foreground">{device}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Outcome */}
      <section className="py-16 md:py-20 bg-purple-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Stethoscope className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("page.outcomeTitle")}
            </h2>
            <p className="text-lg text-(--text-secondary) leading-relaxed">
              Maternity units report <strong className="text-purple-700">complete partographs on 100% of monitored labours</strong> — because the chart is the workflow, not an afterthought.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <FAQSection faqs={faqs} />

      {/* CTA */}
      <PageCTA
        title={t("page.ctaTitle", { name: "OBG" })}
        subtitle={t("page.ctaSubtitle")}
      />

      {/* Related Specialties */}
      <CrossLinks title={t("page.relatedSpecialties")} links={relatedSpecialties} />
    </>
  );
}
