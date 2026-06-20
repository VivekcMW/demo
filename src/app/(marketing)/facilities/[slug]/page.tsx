import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  Users,
  Bed,
  Clock,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  PageHero,
  FeatureGrid,
  FAQBlock,
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
import { getServerT, getContentLanguage } from "@/i18n/server";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("facilities");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lang = await getContentLanguage();
  const content = getContentFile("facilities", slug, lang);
  if (!content) {
    return { title: "Facility Not Found" };
  }
  const t = await getServerT();
  return {
    title: content.meta.meta_title || `${t(formatTitle(slug))} EMR — AarogyaEHR`,
    description: content.meta.meta_description,
  };
}

function formatTitle(slug: string): string {
  const keys: Record<string, string> = {
    "clinics-polyclinics": "page.clinicsPolyclinics",
    "diagnostic-centers-labs": "page.diagnosticCentersLabs",
    "dialysis-daycare-centers": "page.dialysisDaycareCenters",
    "multi-specialty-hospitals": "page.multiSpecialtyHospitals",
    "nursing-homes": "page.nursingHomesPage",
    "single-specialty-chains": "page.singleSpecialtyChains",
    "super-specialty-chains": "page.superSpecialtyChains",
  };
  return keys[slug] || `page.${slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`;
}

export default async function FacilityPage({ params }: Props) {
  const { slug } = await params;
  const lang = await getContentLanguage();
  const content = getContentFile("facilities", slug, lang);
  if (!content) notFound();

  const t = await getServerT();
  const hero = extractHero(content.content);
  const features = extractFeatures(content.content);
  const faqs = extractFAQs(content.content);
  const title = t(formatTitle(slug));

  // Extract first H1 from content if no hero.h1
  const h1Match = content.content.match(/^#\s+(.+)$/m);
  const pageTitle = hero.h1 || h1Match?.[1] || title;

  // Extract "Who this is for" section
  const whoMatch = content.content.match(/## Who this is for\n([\s\S]*?)(?=\n## |$)/);
  const whoContent = whoMatch?.[1]?.trim() || "";

  // Extract problems section
  const problemsMatch = content.content.match(/## The problems we solve[^\n]*\n([\s\S]*?)(?=\n## |$)/);
  const problems = problemsMatch ? extractFeatures(problemsMatch[1]) : [];

  // Extract modules section
  const modulesMatch = content.content.match(/## Modules[^\n]*\n([\s\S]*?)(?=\n## |$)/);
  const modulesContent = modulesMatch?.[1] || "";

  const relatedFacilities = getAllSlugs("facilities")
    .filter((s) => s !== slug)
    .map((s) => ({
      label: t(formatTitle(s)),
      href: `/facilities/${s}`,
    }));

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: t("page.facilities"), href: "/facilities" },
          { label: title },
        ]}
      />

      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              {t("page.byFacilityType")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {pageTitle.replace("{Product}", "AarogyaEHR")}
            </h1>
            {hero.subhead && (
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
                {hero.subhead.replace("{Product}", "AarogyaEHR")}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/book-demo">{t("page.facilityBookDemo")}</Button>
              <Button href="/pricing" variant="secondary">{t("page.facilitySeePricing")}</Button>
            </div>
          </div>
        </Container>
      </section>

      {whoContent && (
        <section className="py-16 md:py-24">
          <Container narrow>
            <SectionHeader title={t("page.whoThisIsFor")} />
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                {whoContent.replace(/\{Product\}/g, "AarogyaEHR")}
              </p>
            </div>
          </Container>
        </section>
      )}

      {problems.length > 0 && (
        <section className="py-16 md:py-24 bg-[var(--bg-subtle)]">
          <Container>
            <SectionHeader
              title={t("page.problemsScaleTitle")}
              subtitle={t("page.problemsScaleSubtitle")}
            />
            <div className="grid md:grid-cols-2 gap-8">
              {problems.map((problem, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white border border-[var(--border-default)]"
                >
                  <h3 className="font-semibold text-foreground mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {problem.description.replace(/\{Product\}/g, "AarogyaEHR")}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {faqs.length > 0 && (
        <FAQBlock
          faqs={faqs.map((f) => ({
            question: f.question,
            answer: f.answer.replace(/\{Product\}/g, "AarogyaEHR"),
          }))}
        />
      )}

      <PageCTA
        title={t("page.facilityCtaTitle")}
        subtitle={t("page.facilityCtaSubtitle")}
      />

      <CrossLinks title={t("page.otherFacilityTypes")} links={relatedFacilities} />
    </>
  );
}
