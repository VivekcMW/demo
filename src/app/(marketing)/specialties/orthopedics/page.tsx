"use client";

import {
  Bone,
  UserCheck,
  Stethoscope,
  Calendar,
  FileText,
  PenTool,
  Scissors,
  Dumbbell,
  Package,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  FAQSection,
  PageCTA,
  PageBreadcrumb,
  CrossLinks,
} from "@/components/marketing/templates";
import { OrthopedicsDashboard } from "@/components/marketing/specialty/orthopedics";
import { orthopedicsTemplates } from "@/data/seeded/orthopedics";
import { useTranslation } from "@/hooks/useTranslation";

const problems = [
  {
    icon: Package,
    title: "Implant Tracking Chaos",
    description:
      "Manual tracking of implants leads to stock-outs during surgeries, expired items, and vendor reconciliation nightmares.",
  },
  {
    icon: Calendar,
    title: "Complex OT Scheduling",
    description:
      "Joint replacements, trauma cases, and scope procedures compete for limited OT slots without visibility into resource availability.",
  },
  {
    icon: FileText,
    title: "Incomplete Surgical Records",
    description:
      "Handwritten operative notes miss critical details. Implant stickers get lost. Follow-up protocols aren't standardized.",
  },
];

const features = [
  {
    icon: Scissors,
    title: "Integrated OT Management",
    description:
      "Schedule surgeries with instrument sets, implant allocation, and anaesthesia coordination. Real-time OT status tracking.",
    highlights: [
      "Drag-drop OT scheduling",
      "Instrument set linking",
      "Implant auto-allocation",
      "OT turnaround analytics",
    ],
  },
  {
    icon: Bone,
    title: "Fracture Census & Tracking",
    description:
      "Track all fracture cases from admission to union. Automated follow-up scheduling based on fracture type and treatment.",
    highlights: [
      "Body region mapping",
      "Treatment protocols",
      "Union tracking",
      "Complication alerts",
    ],
  },
  {
    icon: Package,
    title: "Implant Inventory System",
    description:
      "Barcode-based implant tracking from receipt to patient. Automatic billing integration and vendor reconciliation.",
    highlights: [
      "Barcode/QR scanning",
      "Expiry tracking",
      "Auto-billing on use",
      "Vendor consignment",
    ],
  },
  {
    icon: Dumbbell,
    title: "Physiotherapy Integration",
    description:
      "Seamless physio referrals with protocol selection. Track sessions, progress, and outcomes in one system.",
    highlights: [
      "Protocol templates",
      "Session scheduling",
      "Progress tracking",
      "Outcome measures",
    ],
  },
];

const faqs = [
  {
    question: "How does the implant tracking work?",
    answer:
      "Each implant is tracked via barcode/QR code from vendor receipt. During surgery, scanning the implant auto-populates the operative note, triggers billing, and updates inventory. Consignment implants are tracked separately with vendor reconciliation reports.",
  },
  {
    question: "Can I track fracture healing progress?",
    answer:
      "Yes. The fracture census module tracks each case with expected union timelines based on fracture type. X-ray images are linked to visits, and the system alerts you if healing is delayed or complications arise.",
  },
  {
    question: "Does it support arthroscopy documentation?",
    answer:
      "Absolutely. We have dedicated templates for knee/shoulder arthroscopy with intra-operative image capture, findings documentation, and procedure-specific billing codes.",
  },
  {
    question: "How are physiotherapy referrals handled?",
    answer:
      "One-click referral from the consultation generates a physio prescription with selected protocols. The physio team sees the referral in their queue, and all sessions are documented back into the patient's surgical record.",
  },
  {
    question: "Can I generate implant usage reports for vendors?",
    answer:
      "Yes. The system generates detailed reports of implants used, batch numbers, patient details, and billing amounts. These can be shared with vendors for consignment reconciliation or audit purposes.",
  },
];

export default function OrthopedicsPage() {
  const { t } = useTranslation();
  return (
    <main className="flex flex-col">
      {/* Breadcrumb */}
      <PageBreadcrumb
        items={[
          { label: t("page.specialties"), href: "/specialties" },
          { label: t("page.orthopedics") },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
              <Bone className="w-4 h-4" />
              {t("page.orthopedics")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
              Complete Orthopedic Practice
              <span className="block text-indigo-600">Management System</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              From OPD consultations to joint replacements, fracture management
              to physiotherapy — one integrated platform for your entire orthopedic workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
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
            title="Orthopedic Practice Pain Points"
            subtitle="Managing implants, surgeries, and rehab across disconnected systems creates gaps in care."
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
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-[var(--text-secondary)]">{problem.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[var(--bg-subtle)]">
        <Container>
          <SectionHeader
            eyebrow={t("page.capabilities")}
            title="Built for Orthopedic Excellence"
            subtitle="Every feature designed with input from practicing orthopedic surgeons across India."
          />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl border border-[var(--border-default)] bg-white"
                >
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-4">{feature.description}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {feature.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <UserCheck className="w-4 h-4 text-indigo-600 shrink-0" />
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
            subtitle="Experience the orthopedic dashboard that powers hundreds of surgeons daily."
          />
          <div className="mt-10">
            <OrthopedicsDashboard />
          </div>
        </Container>
      </section>

      {/* Templates Section */}
      <section className="py-16 bg-[var(--bg-subtle)]">
        <Container>
          <SectionHeader
            eyebrow={t("page.documentation")}
            title="Orthopedic Templates"
            subtitle="Pre-built templates for every orthopedic scenario — from OPD to OT to physio."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {orthopedicsTemplates.map((template) => (
              <div
                key={template.id}
                className="p-4 rounded-lg border border-[var(--border-default)] bg-white flex items-center justify-between hover:border-indigo-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <PenTool className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{template.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{template.category}</p>
                  </div>
                </div>
                <span className="text-xs text-[var(--text-secondary)] bg-gray-100 px-2 py-1 rounded">
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
            title="Connected Orthopedic Ecosystem"
            subtitle="Seamlessly integrate with imaging, labs, and billing systems."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Activity, name: "PACS Integration", desc: "X-ray, MRI, CT access" },
              { icon: Package, name: "Implant Vendors", desc: "DePuy, Zimmer, S&N" },
              { icon: FileText, name: "Insurance/TPA", desc: "Pre-auth & claims" },
              { icon: TrendingUp, name: "Analytics", desc: "Surgical outcomes" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <p className="font-semibold text-[var(--text-primary)]">{item.name}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
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
        title={t("page.ctaTitle", { name: "Orthopedics" })}
        subtitle="Join surgeons across India who have transformed their workflows with AarogyaEHR."
        primaryCta={{ label: t("page.startFreeTrial"), href: "/demo" }}
        secondaryCta={{ label: t("page.talkToSales"), href: "/contact" }}
      />

      {/* Cross Links */}
      <CrossLinks
        title={t("page.relatedSpecialties")}
        links={[
          { href: "/specialties/general-surgery", label: t("page.generalSurgery") },
          { href: "/specialties/emergency-medicine", label: t("page.emergencyMedicine") },
          { href: "/specialties/rheumatology", label: "Rheumatology" },
          { href: "/specialties/sports-medicine", label: "Sports Medicine" },
        ]}
      />
    </main>
  );
}
