import { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  HeartPulse,
  Brain,
  Baby,
  Bone,
  Eye,
  Ear,
  Wind,
  Stethoscope,
  Activity,
  Pill,
  Scissors,
  Sparkles,
  ArrowRight,
  Droplets,
  Droplet,
  Syringe,
  Bug,
  CircleDot,
  GitBranch,
  Scale,
  RefreshCw,
  Dna,
  Smile,
  Radiation,
  Atom,
  Zap,
  HandHeart,
  Monitor,
  Siren,
  Moon,
  Dumbbell,
  Briefcase,
  ClipboardCheck,
  Leaf,
  Users,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";

export const metadata: Metadata = {
  title: "Specialties — AarogyaEHR | 42 specialty workflows",
  description:
    "Specialty-deep EHR workflows for 42 medical specialties. Not generic forms — actual cardiology, OBG, nephrology, oncology workflows designed with Indian specialists.",
};

// Specialty categories with icons
const specialtyCategories = [
  {
    title: "Medicine",
    specialties: [
      { slug: "general-medicine", name: "General Medicine", icon: Stethoscope },
      { slug: "cardiology", name: "Cardiology", icon: Heart },
      { slug: "neurology-neurosurgery", name: "Neurology & Neurosurgery", icon: Brain },
      { slug: "pulmonology", name: "Pulmonology", icon: Wind },
      { slug: "gastroenterology", name: "Gastroenterology", icon: CircleDot },
      { slug: "nephrology-dialysis", name: "Nephrology & Dialysis", icon: Droplets },
      { slug: "endocrinology-diabetology", name: "Endocrinology & Diabetology", icon: Syringe },
      { slug: "rheumatology", name: "Rheumatology", icon: Bone },
      { slug: "infectious-diseases", name: "Infectious Diseases", icon: Bug },
      { slug: "hematology", name: "Hematology", icon: Droplet },
      { slug: "hepatology", name: "Hepatology", icon: Activity },
    ],
  },
  {
    title: "Surgery",
    specialties: [
      { slug: "general-surgery", name: "General Surgery", icon: Scissors },
      { slug: "orthopaedics", name: "Orthopaedics", icon: Bone },
      { slug: "ctvs", name: "CTVS", icon: HeartPulse },
      { slug: "neurology-neurosurgery", name: "Neurosurgery", icon: Brain },
      { slug: "urology", name: "Urology", icon: Droplets },
      { slug: "plastic-surgery", name: "Plastic Surgery", icon: Sparkles },
      { slug: "vascular-surgery", name: "Vascular Surgery", icon: GitBranch },
      { slug: "bariatric-metabolic-surgery", name: "Bariatric Surgery", icon: Scale },
      { slug: "transplant", name: "Transplant", icon: RefreshCw },
    ],
  },
  {
    title: "Women & Children",
    specialties: [
      { slug: "obstetrics-gynaecology", name: "Obstetrics & Gynaecology", icon: Baby },
      { slug: "pediatrics-neonatology", name: "Pediatrics & Neonatology", icon: Baby },
      { slug: "pediatric-subspecialties", name: "Pediatric Subspecialties", icon: Users },
      { slug: "fetal-medicine", name: "Fetal Medicine", icon: HeartPulse },
      { slug: "ivf-reproductive-medicine", name: "IVF & Reproductive Medicine", icon: Dna },
    ],
  },
  {
    title: "Senses & ENT",
    specialties: [
      { slug: "ophthalmology", name: "Ophthalmology", icon: Eye },
      { slug: "ent", name: "ENT", icon: Ear },
      { slug: "dental-maxillofacial", name: "Dental & Maxillofacial", icon: Smile },
    ],
  },
  {
    title: "Oncology & Specialised",
    specialties: [
      { slug: "oncology", name: "Oncology", icon: Radiation },
      { slug: "nuclear-medicine", name: "Nuclear Medicine", icon: Atom },
      { slug: "pain-medicine", name: "Pain Medicine", icon: Zap },
      { slug: "palliative-geriatrics", name: "Palliative & Geriatrics", icon: HandHeart },
    ],
  },
  {
    title: "Critical & Emergency",
    specialties: [
      { slug: "critical-care-icu", name: "Critical Care / ICU", icon: Monitor },
      { slug: "emergency-medicine", name: "Emergency Medicine", icon: Siren },
      { slug: "anaesthesiology", name: "Anaesthesiology", icon: Moon },
    ],
  },
  {
    title: "Mental Health & Lifestyle",
    specialties: [
      { slug: "psychiatry-mental-health", name: "Psychiatry & Mental Health", icon: Brain },
      { slug: "dermatology-cosmetology", name: "Dermatology & Cosmetology", icon: Sparkles },
      { slug: "sleep-medicine", name: "Sleep Medicine", icon: Moon },
    ],
  },
  {
    title: "Rehabilitation & Wellness",
    specialties: [
      { slug: "physiotherapy-rehab", name: "Physiotherapy & Rehab", icon: Dumbbell },
      { slug: "sports-medicine", name: "Sports Medicine", icon: Activity },
      { slug: "occupational-health", name: "Occupational Health", icon: Briefcase },
      { slug: "preventive-health-checkup", name: "Preventive Health Checkup", icon: ClipboardCheck },
    ],
  },
  {
    title: "Traditional Medicine",
    specialties: [
      { slug: "ayush", name: "AYUSH", icon: Leaf },
    ],
  },
];

export default function SpecialtiesIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center px-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Stethoscope className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>42 specialties</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight tracking-tight">
              Specialty-deep. Not specialty-wide.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-6 sm:mb-8">
              A cardiologist needs a cath lab report, not a customizable form.
              Each specialty workflow was built with practicing Indian specialists —
              not adapted from generic templates.
            </p>
            <Button href="/book-demo" className="w-full sm:w-auto">Book a demo for your specialties</Button>
          </div>
        </Container>
      </section>

      {/* Featured specialties */}
      <section className="py-12 sm:py-16 md:py-24">
        <Container>
          <SectionHeader
            eyebrow="Featured"
            title="Our deepest specialty workflows"
            subtitle="Start here if you're evaluating specialty depth."
            className="mb-8 sm:mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
            {[
              {
                slug: "obstetrics-gynaecology",
                name: "Obstetrics & Gynaecology",
                description: "ANC tracking, fetal monitoring, labor suite, c-section documentation",
                icon: Baby,
              },
              {
                slug: "nephrology-dialysis",
                name: "Nephrology & Dialysis",
                description: "Dialysis scheduling, session documentation, vascular access tracking",
                icon: Activity,
              },
              {
                slug: "oncology",
                name: "Oncology",
                description: "Protocol management, chemo scheduling, tumor board, survival tracking",
                icon: Pill,
              },
            ].map((specialty) => (
              <Link
                key={specialty.slug}
                href={`/specialties/${specialty.slug}`}
                className="group p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-[var(--border-default)] bg-white hover:border-[var(--action-primary)] hover:shadow-xl transition-all duration-200"
              >
                <specialty.icon className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--action-primary)] mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-[var(--action-primary)] transition-colors">
                  {specialty.name}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-3 sm:mb-4 leading-relaxed">
                  {specialty.description}
                </p>
                <span className="inline-flex items-center text-[var(--action-primary)] font-medium text-sm">
                  View workflow
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* All specialties by category */}
      <section className="py-12 sm:py-16 md:py-24 bg-[var(--bg-subtle)]">
        <Container>
          <SectionHeader title="All 42 specialties" className="mb-8 sm:mb-12" />
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {specialtyCategories.map((category) => (
              <div key={category.title}>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 pb-2 border-b border-[var(--border-default)]">
                  {category.title}
                </h3>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {category.specialties.map((specialty) => (
                    <Link
                      key={specialty.slug}
                      href={`/specialties/${specialty.slug}`}
                      className="group flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-white border border-[var(--border-default)] hover:border-[var(--action-primary)] hover:shadow-md transition-all duration-200"
                    >
                      <specialty.icon className="w-5 h-5 text-[var(--action-primary)] flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-foreground group-hover:text-[var(--action-primary)] transition-colors">
                        {specialty.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-24 bg-[var(--action-primary)]">
        <Container>
          <div className="text-center px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              See your specialties in action.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Tell us your specialty mix. We'll configure the demo to show workflows
              your doctors will actually recognize.
            </p>
            <Button href="/book-demo" variant="inverse" className="w-full sm:w-auto">
              Book a demo
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
