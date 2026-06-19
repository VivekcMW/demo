"use client";

import {
  Siren,
  UserCheck,
  Stethoscope,
  Calendar,
  FileText,
  PenTool,
  BedDouble,
  Heart,
  Clock,
  TrendingUp,
  Activity,
  Ambulance,
  Zap,
  Shield,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  FAQSection,
  PageCTA,
  PageBreadcrumb,
  CrossLinks,
} from "@/components/marketing/templates";
import { EmergencyMedicineDashboard } from "@/components/marketing/specialty/emergency-medicine";
import { emergencyMedicineTemplates } from "@/data/seeded/emergency-medicine";
import { useTranslation } from "@/hooks/useTranslation";

const problems = [
  {
    icon: Clock,
    title: "Time-Critical Delays",
    description:
      "Paper-based triage, manual tracking, and delayed documentation cost precious minutes in life-threatening emergencies.",
  },
  {
    icon: Ambulance,
    title: "No Advance Warning",
    description:
      "Ambulances arrive without prior information. Resus team assembled after patient arrives instead of being ready.",
  },
  {
    icon: FileText,
    title: "Documentation Gaps",
    description:
      "In the chaos of resuscitation, critical interventions go undocumented. Medico-legal records are incomplete.",
  },
];

const features = [
  {
    icon: Siren,
    title: "Smart Triage System",
    description:
      "Color-coded triage with automatic severity scoring. Red patients auto-escalate, green patients auto-route to fast track.",
    highlights: [
      "MTS/START compliant",
      "Auto-escalation alerts",
      "Re-triage prompts",
      "Waiting time tracking",
    ],
  },
  {
    icon: Heart,
    title: "Resuscitation Bay Dashboard",
    description:
      "Real-time view of all resus bays. Vitals streaming, intervention timing, and team coordination on one screen.",
    highlights: [
      "Vitals integration",
      "Intervention logging",
      "Code timers",
      "Team alerts",
    ],
  },
  {
    icon: Ambulance,
    title: "Ambulance Integration",
    description:
      "Receive advance alerts from ambulances. Patient info, vitals, and ETA displayed before arrival. Team pre-assembled.",
    highlights: [
      "108/102 integration",
      "ETA tracking",
      "Pre-arrival alerts",
      "Resource readiness",
    ],
  },
  {
    icon: Zap,
    title: "Code Protocols",
    description:
      "One-click activation of STEMI, Stroke, Trauma, and Sepsis codes. Automatic team paging and documentation.",
    highlights: [
      "STEMI activation",
      "Stroke code",
      "Trauma activation",
      "Sepsis protocol",
    ],
  },
];

const faqs = [
  {
    question: "How does the triage system work?",
    answer:
      "Our triage module follows the Manchester Triage System (MTS) or START protocol as per your preference. Patients are assigned colors (Red/Orange/Yellow/Green) based on presenting complaints and vital signs. The system automatically tracks waiting times and prompts re-triage when thresholds are exceeded.",
  },
  {
    question: "Can ambulances send patient info before arrival?",
    answer:
      "Yes. We integrate with 108/102 services and private ambulance operators. Paramedics can share chief complaint, vitals, and photos/ECGs via our mobile app. This appears on your ED dashboard with ETA countdown.",
  },
  {
    question: "How does the STEMI code work?",
    answer:
      "When a STEMI is identified, one click activates the code. Cath lab is alerted, cardiology is paged, and a timer starts. All interventions are logged with timestamps. Door-to-balloon time is automatically calculated.",
  },
  {
    question: "Can I track door-to-doctor times?",
    answer:
      "Yes. The system automatically calculates key metrics: door-to-triage, triage-to-doctor, door-to-disposition, and length of stay. These are displayed on the dashboard and available in reports.",
  },
  {
    question: "How are critical patients handed off to ICU/OR?",
    answer:
      "When a patient needs ICU or OR, you initiate a handoff request. The receiving team is notified with patient summary, and a checklist ensures complete information transfer. The patient moves to their queue automatically.",
  },
];

export default function EmergencyMedicinePage() {
  const { t } = useTranslation();
  return (
    <main className="flex flex-col">
      {/* Breadcrumb */}
      <PageBreadcrumb
        items={[
          { label: t("page.specialties"), href: "/specialties" },
          { label: "Emergency Medicine" },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-linear-to-br from-red-50 via-white to-orange-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-6">
              <Siren className="w-4 h-4" />
              {t("page.emergencyMedicine")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Every Second Counts{" "}
              <span className="text-red-600">Save More Lives</span>
            </h1>
            <p className="text-lg md:text-xl text-(--text-secondary) mb-8 max-w-2xl mx-auto">
              Real-time triage, resuscitation management, and code protocols — 
              designed for the chaos of the emergency department.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 bg-red-600 hover:bg-red-700">
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
            title="Emergency Department Bottlenecks"
            subtitle="Manual processes and disconnected systems cost precious time in life-threatening emergencies."
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
            title="Built for Emergency Excellence"
            subtitle="Every feature designed with input from emergency physicians across India."
          />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl border border-(--border-default) bg-white"
                >
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-(--text-secondary) mb-4">{feature.description}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {feature.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-(--text-secondary)">
                        <UserCheck className="w-4 h-4 text-red-600 shrink-0" />
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
            subtitle="Experience the emergency dashboard that powers high-volume EDs across India."
          />
          <div className="mt-10">
            <EmergencyMedicineDashboard />
          </div>
        </Container>
      </section>

      {/* Templates Section */}
      <section className="py-16 bg-(--bg-subtle)">
        <Container>
          <SectionHeader
            eyebrow="Protocols"
            title="Emergency Templates"
            subtitle="Pre-built protocols for every emergency scenario — from triage to disposition."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {emergencyMedicineTemplates.map((template) => (
              <div
                key={template.id}
                className="p-4 rounded-lg border border-(--border-default) bg-white flex items-center justify-between hover:border-red-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <PenTool className="w-5 h-5 text-red-600" />
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
            title="Connected Emergency Ecosystem"
            subtitle="Seamlessly integrate with ambulances, labs, and specialty teams."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Ambulance, name: "108/102 Ambulance", desc: "Pre-arrival alerts" },
              { icon: Activity, name: "Lab & Imaging", desc: "Rapid results" },
              { icon: Shield, name: "Cath Lab/OT", desc: "Code activation" },
              { icon: TrendingUp, name: "Analytics", desc: "Door-to-X metrics" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="p-4 rounded-xl border border-(--border-default) bg-(--bg-subtle) text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-red-600" />
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
        title={t("page.ctaTitle", { name: "Emergency Medicine" })}
        subtitle="Join hospitals across India saving more lives with faster, smarter emergency care."
        primaryCta={{ label: "Start Free Trial", href: "/demo" }}
        secondaryCta={{ label: "Talk to Sales", href: "/contact" }}
      />

      {/* Cross Links */}
      <CrossLinks
        title={t("page.relatedSpecialties")}
        links={[
          { href: "/specialties/critical-care-icu", label: "Critical Care/ICU" },
          { href: "/specialties/general-surgery", label: "General Surgery" },
          { href: "/specialties/cardiology", label: "Cardiology" },
          { href: "/specialties/trauma-surgery", label: "Trauma Surgery" },
        ]}
      />
    </main>
  );
}
