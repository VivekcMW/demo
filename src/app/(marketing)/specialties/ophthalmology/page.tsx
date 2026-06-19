"use client";

import {
  CheckCircle2,
  Play,
  Eye,
  Scissors,
  MapPin,
  Activity,
  Wifi,
  FileText,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  FAQSection,
  PageCTA,
  PageBreadcrumb,
  CrossLinks,
} from "@/components/marketing/templates";
import { OphthalmologyDashboard } from "@/components/marketing/specialty/ophthalmology";
import { ophthalmologyTemplates } from "@/data/seeded/ophthalmology";
import { useTranslation } from "@/hooks/useTranslation";

const problems = [
  {
    title: "Cataract is a throughput business",
    description:
      "Counseling-to-surgery conversion and OT turnover decide unit economics. Generic EMRs don't track the cataract funnel.",
    icon: Scissors,
  },
  {
    title: "Refraction data is clinical currency",
    description:
      "Serial vision and refraction must compare instantly across visits. Paper-based or generic records make this impossible.",
    icon: Eye,
  },
  {
    title: "Camps feed the hospital",
    description:
      "Outreach screening data rarely connects to the surgical pipeline. Camp referrals arrive without context.",
    icon: MapPin,
  },
];

const features = [
  {
    title: "Cataract Pipeline Dashboard",
    description:
      "Track every patient from diagnosis through surgery to 1-month outcome with conversion analytics per counselor.",
    icon: Activity,
  },
  {
    title: "IOL Inventory by Power",
    description:
      "Power-wise IOL stock management with barcode pick at surgery, auto-billing, and expiry alerts.",
    icon: Eye,
  },
  {
    title: "Camp Module with Offline Sync",
    description:
      "Screening lists from outreach camps work offline. Patients arrive pre-registered with data attached.",
    icon: MapPin,
  },
  {
    title: "Device Integration",
    description:
      "Connect biometers, auto-refractors, fundus cameras, and OCT devices. Readings flow directly into patient records.",
    icon: Wifi,
  },
];

const faqs = [
  {
    question: "Does it support eye-camp offline use?",
    answer:
      "Yes. Camp lists work offline and sync when the van reaches network — built for outreach reality. Screening data, photos, and referral decisions are captured without connectivity.",
  },
  {
    question: "Can both eyes be tracked distinctly?",
    answer:
      "All records are laterality-structured (OD/OS/OU) throughout. Refraction, surgery notes, and follow-ups maintain strict eye-specific tracking.",
  },
  {
    question: "Is the optical shop integrated?",
    answer:
      "Glass prescriptions flow directly to the optical POS with order tracking, inventory deduction, and delivery status updates.",
  },
  {
    question: "How does IOL inventory work?",
    answer:
      "IOL stock is managed power-wise. During surgery, the surgeon picks the IOL by barcode, which triggers auto-deduction and billing. Low-stock alerts prevent last-minute surprises.",
  },
  {
    question: "Can I track counselor conversion rates?",
    answer:
      "Yes. The cataract pipeline dashboard shows conversion rates at each stage — diagnosed, counseled, biometry done, surgery scheduled, completed — with per-counselor breakdowns.",
  },
];

const relatedSpecialties = [
  { label: "Endocrinology", href: "/specialties/endocrinology-diabetology" },
  { label: "General Medicine", href: "/specialties/general-medicine" },
  { label: "Pediatrics", href: "/specialties/pediatrics-neonatology" },
  { label: "ENT", href: "/specialties/ent" },
  { label: "Neurology", href: "/specialties/neurology-neurosurgery" },
];

export default function OphthalmologyPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageBreadcrumb
        items={[
          { label: t("page.specialties"), href: "/specialties" },
          { label: "Ophthalmology" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-linear-to-b from-(--bg-subtle) to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--action-primary)/10 text-(--action-primary) text-sm font-medium mb-6">
              <Eye className="w-4 h-4" />
              {t("page.ophthalmology")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              India&apos;s most performed surgery deserves its fastest workflow.
            </h1>
            <p className="text-xl text-(--text-secondary) leading-relaxed mb-8">
              Cataract pipelines, refraction records, IOL inventory, and
              camp-to-OT funnels — engineered for eye-care volume.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/book-demo">{t("page.bookDemo", { name: "Ophthalmology" })}</Button>
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
            subtitle={t("page.problemsSubtitle", { name: "Ophthalmology" })}
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
            title={t("page.workflowsTitle", { name: "Ophthalmology" })}
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
                  <div className="w-10 h-10 rounded-lg bg-(--action-primary)/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-(--action-primary)" />
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
            title={t("page.dashboardPreview", { name: "Ophthalmology" })}
            subtitle={t("page.dashboardSubtitle")}
          />
          <OphthalmologyDashboard />
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
            {ophthalmologyTemplates.slice(0, 9).map((template) => (
              <div
                key={template.id}
                className="flex items-center gap-3 p-4 rounded-lg bg-white border border-(--border-default)"
              >
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-green-600" />
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
              "Biometers (Zeiss, Nidek)",
              "Auto-refractors",
              "Fundus cameras",
              "OCT devices",
              "Visual field analyzers",
              "Optical shop POS",
              "Camp tablets",
              "Barcode scanners",
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

      {/* FAQ */}
      <FAQSection faqs={faqs} />

      {/* CTA */}
      <PageCTA
        title={t("page.ctaTitle", { name: "Ophthalmology" })}
        subtitle={t("page.ctaSubtitle")}
      />

      {/* Related Specialties */}
      <CrossLinks title={t("page.relatedSpecialties")} links={relatedSpecialties} />
    </>
  );
}
