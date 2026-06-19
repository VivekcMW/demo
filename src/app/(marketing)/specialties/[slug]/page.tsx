import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Stethoscope,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  FAQSection,
  PageCTA,
  PageBreadcrumb,
  CrossLinks,
} from "@/components/marketing/templates";
import {
  getContentFile,
  getAllSlugs,
  extractHero,
  extractFeatures,
  extractFAQs,
} from "@/lib/content";

// Dashboard component imports
import { AnaesthesiologyDashboard } from "@/components/marketing/specialty/anaesthesiology";
import { AYUSHDashboard } from "@/components/marketing/specialty/ayush";
import { BariatricDashboard } from "@/components/marketing/specialty/bariatric";
import { CardiologyDashboard } from "@/components/marketing/specialty/cardiology";
import { CriticalCareDashboard } from "@/components/marketing/specialty/critical-care";
import { CTVSDashboard } from "@/components/marketing/specialty/ctvs";
import { DentalDashboard } from "@/components/marketing/specialty/dental";
import { DermatologyDashboard } from "@/components/marketing/specialty/dermatology";
import { EmergencyMedicineDashboard } from "@/components/marketing/specialty/emergency-medicine";
import { EndocrinologyDashboard } from "@/components/marketing/specialty/endocrinology";
import { ENTDashboard } from "@/components/marketing/specialty/ent";
import { FetalMedicineDashboard } from "@/components/marketing/specialty/fetal-medicine";
import { GastroenterologyDashboard } from "@/components/marketing/specialty/gastroenterology";
import { GeneralMedicineDashboard } from "@/components/marketing/specialty/general-medicine";
import { GeneralSurgeryDashboard } from "@/components/marketing/specialty/general-surgery";
import { HematologyDashboard } from "@/components/marketing/specialty/hematology";
import { HepatologyDashboard } from "@/components/marketing/specialty/hepatology";
import { InfectiousDiseasesDashboard } from "@/components/marketing/specialty/infectious-diseases";
import { IVFDashboard } from "@/components/marketing/specialty/ivf";
import { NephrologyDashboard } from "@/components/marketing/specialty/nephrology";
import { NeurologyDashboard } from "@/components/marketing/specialty/neurology";
import { NuclearMedicineDashboard } from "@/components/marketing/specialty/nuclear-medicine";
import { OBGDashboard } from "@/components/marketing/specialty/obg";
import { OccupationalHealthDashboard } from "@/components/marketing/specialty/occupational-health";
import { OncologyDashboard } from "@/components/marketing/specialty/oncology";
import { OphthalmologyDashboard } from "@/components/marketing/specialty/ophthalmology";
import { OrthopedicsDashboard } from "@/components/marketing/specialty/orthopedics";
import { PainMedicineDashboard } from "@/components/marketing/specialty/pain-medicine";
import { PalliativeGeriatricsDashboard } from "@/components/marketing/specialty/palliative-geriatrics";
import { PediatricsDashboard } from "@/components/marketing/specialty/pediatrics";
import { PediatricSubspecialtiesDashboard } from "@/components/marketing/specialty/pediatric-subspecialties";
import { PhysiotherapyRehabDashboard } from "@/components/marketing/specialty/physiotherapy-rehab";
import { PlasticSurgeryDashboard } from "@/components/marketing/specialty/plastic-surgery";
import { PreventiveHealthDashboard } from "@/components/marketing/specialty/preventive-health";
import { PsychiatryDashboard } from "@/components/marketing/specialty/psychiatry";
import { PulmonologyDashboard } from "@/components/marketing/specialty/pulmonology";
import { RheumatologyDashboard } from "@/components/marketing/specialty/rheumatology";
import { SleepMedicineDashboard } from "@/components/marketing/specialty/sleep-medicine";
import { SportsMedicineDashboard } from "@/components/marketing/specialty/sports-medicine";
import { TransplantDashboard } from "@/components/marketing/specialty/transplant";
import { UrologyDashboard } from "@/components/marketing/specialty/urology";
import { VascularSurgeryDashboard } from "@/components/marketing/specialty/vascular-surgery";

// Dashboard component mapping
const dashboardComponents: Record<string, React.ComponentType> = {
  anaesthesiology: AnaesthesiologyDashboard,
  ayush: AYUSHDashboard,
  "bariatric-metabolic-surgery": BariatricDashboard,
  cardiology: CardiologyDashboard,
  "critical-care-icu": CriticalCareDashboard,
  ctvs: CTVSDashboard,
  "dental-maxillofacial": DentalDashboard,
  "dermatology-cosmetology": DermatologyDashboard,
  "emergency-medicine": EmergencyMedicineDashboard,
  "endocrinology-diabetology": EndocrinologyDashboard,
  ent: ENTDashboard,
  "fetal-medicine": FetalMedicineDashboard,
  gastroenterology: GastroenterologyDashboard,
  "general-medicine": GeneralMedicineDashboard,
  "general-surgery": GeneralSurgeryDashboard,
  hematology: HematologyDashboard,
  hepatology: HepatologyDashboard,
  "infectious-diseases": InfectiousDiseasesDashboard,
  "ivf-reproductive-medicine": IVFDashboard,
  "nephrology-dialysis": NephrologyDashboard,
  "neurology-neurosurgery": NeurologyDashboard,
  "nuclear-medicine": NuclearMedicineDashboard,
  "obstetrics-gynaecology": OBGDashboard,
  "occupational-health": OccupationalHealthDashboard,
  oncology: OncologyDashboard,
  ophthalmology: OphthalmologyDashboard,
  orthopedics: OrthopedicsDashboard,
  "pain-medicine": PainMedicineDashboard,
  "palliative-geriatrics": PalliativeGeriatricsDashboard,
  "pediatrics-neonatology": PediatricsDashboard,
  "pediatric-subspecialties": PediatricSubspecialtiesDashboard,
  "physiotherapy-rehabilitation": PhysiotherapyRehabDashboard,
  "plastic-surgery": PlasticSurgeryDashboard,
  "preventive-health": PreventiveHealthDashboard,
  "psychiatry-mental-health": PsychiatryDashboard,
  pulmonology: PulmonologyDashboard,
  rheumatology: RheumatologyDashboard,
  "sleep-medicine": SleepMedicineDashboard,
  "sports-medicine": SportsMedicineDashboard,
  transplant: TransplantDashboard,
  urology: UrologyDashboard,
  "vascular-surgery": VascularSurgeryDashboard,
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("specialties");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentFile("specialties", slug);

  if (!content) {
    return { title: "Specialty Not Found" };
  }

  return {
    title: content.meta.meta_title || `${formatTitle(slug)} EMR — AarogyaEHR`,
    description: content.meta.meta_description,
  };
}

function formatTitle(slug: string): string {
  const specialCases: Record<string, string> = {
    "obstetrics-gynaecology": "Obstetrics & Gynaecology",
    "critical-care-icu": "Critical Care / ICU",
    "nephrology-dialysis": "Nephrology & Dialysis",
    "neurology-neurosurgery": "Neurology & Neurosurgery",
    "pediatrics-neonatology": "Pediatrics & Neonatology",
    "dermatology-cosmetology": "Dermatology & Cosmetology",
    "endocrinology-diabetology": "Endocrinology & Diabetology",
    "ivf-reproductive-medicine": "IVF & Reproductive Medicine",
    "palliative-geriatrics": "Palliative & Geriatrics",
    "psychiatry-mental-health": "Psychiatry & Mental Health",
    "physiotherapy-rehab": "Physiotherapy & Rehab",
    "dental-maxillofacial": "Dental & Maxillofacial",
    "bariatric-metabolic-surgery": "Bariatric & Metabolic Surgery",
    ctvs: "CTVS",
    ent: "ENT",
    ayush: "AYUSH",
  };

  if (specialCases[slug]) return specialCases[slug];

  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function SpecialtyPage({ params }: Readonly<Props>) {
  const { slug } = await params;
  const content = getContentFile("specialties", slug);

  if (!content) {
    notFound();
  }

  const hero = extractHero(content.content);
  const faqs = extractFAQs(content.content);
  const title = formatTitle(slug);

  // Extract problems section
  const problemsMatch = content.content.match(
    /## The problems we built around\n([\s\S]*?)(?=\n## |$)/
  );
  const problems = problemsMatch
    ? extractFeatures(problemsMatch[1])
    : [];

  // Extract workflows/how it runs section
  const workflowMatch = content.content.match(
    /## How .+ runs on AarogyaEHR\n([\s\S]*?)(?=\n## |$)/
  );
  const workflows = workflowMatch
    ? extractFeatures(workflowMatch[1])
    : [];

  // Extract templates section
  const templatesMatch = content.content.match(
    /## Specialty templates.+\n([\s\S]*?)(?=\n## |$)/
  );
  const templates = templatesMatch
    ? templatesMatch[1]
        .split("\n")
        .filter((l) => l.startsWith("- "))
        .map((l) => l.slice(2).trim())
    : [];

  // Related specialties
  const allSlugs = getAllSlugs("specialties");
  const relatedSpecialties = allSlugs
    .filter((s) => s !== slug)
    .slice(0, 5)
    .map((s) => ({
      label: formatTitle(s),
      href: `/specialties/${s}`,
    }));

  // Get dashboard component for this specialty
  const DashboardComponent = dashboardComponents[slug];

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: "Specialties", href: "/specialties" },
          { label: title },
        ]}
      />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-linear-to-b from-(--bg-subtle) to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--action-primary)/10 text-(--action-primary) text-sm font-medium mb-6">
              <Stethoscope className="w-4 h-4" />
              Specialty workflow
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {hero.h1 || title}
            </h1>
            <p className="text-xl text-(--text-secondary) leading-relaxed mb-8">
              {hero.subhead || content.meta.meta_description || ""}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/book-demo">Book a {title.toLowerCase()} demo</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Dashboard Preview */}
      {DashboardComponent && (
        <section className="py-16 md:py-24">
          <Container>
            <SectionHeader
              title={`${title} dashboard preview`}
              subtitle="See exactly what your team will use daily."
            />
            <DashboardComponent />
          </Container>
        </section>
      )}

      {/* Problems we solve */}
      {problems.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <SectionHeader
              title="The problems we built around"
              subtitle={`Why generic EMRs fail ${title.toLowerCase()} departments.`}
            />
            <div className="grid md:grid-cols-3 gap-8">
              {problems.map((problem) => (
                <div
                  key={problem.title}
                  className="p-6 rounded-xl bg-red-50 border border-red-100"
                >
                  <h3 className="font-semibold text-foreground mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-(--text-secondary) text-sm leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* How it runs */}
      {workflows.length > 0 && (
        <section id="workflows" className="py-16 md:py-24 bg-(--bg-subtle)">
          <Container>
            <SectionHeader
              title={`How ${title.toLowerCase()} runs on AarogyaEHR`}
              subtitle="Workflows designed with practicing specialists."
            />
            <div className="grid md:grid-cols-2 gap-8">
              {workflows.map((workflow) => (
                <div
                  key={workflow.title}
                  className="p-6 rounded-xl bg-white border border-(--border-default)"
                >
                  <h3 className="font-semibold text-foreground mb-2">
                    {workflow.title}
                  </h3>
                  <p className="text-(--text-secondary) leading-relaxed">
                    {workflow.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Templates included */}
      {templates.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <SectionHeader
              title="Specialty templates & order sets included"
              subtitle="Pre-configured for Indian practice patterns."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {templates.map((template) => (
                <div
                  key={template}
                  className="flex items-center gap-3 p-4 rounded-lg bg-(--bg-subtle)"
                >
                  <CheckCircle2 className="w-5 h-5 text-(--action-primary) shrink-0" />
                  <span className="text-sm text-foreground">{template}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && <FAQSection faqs={faqs} />}

      {/* CTA */}
      <PageCTA
        title={`See ${title.toLowerCase()} handled the way your department actually works.`}
        subtitle="Bring your most complex case to a 45-minute live demo."
      />

      {/* Related */}
      <CrossLinks title="Related specialties" links={relatedSpecialties} />
    </>
  );
}
