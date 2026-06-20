import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Stethoscope,
  Building2,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  PageHero,
  FeatureGrid,
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
import { getServerT } from "@/i18n/server";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const t = await getServerT();
  const { slug } = await params;
  const content = getContentFile("product", slug);

  if (!content) {
    notFound();
  }

  const hero = extractHero(content.content);
  const features = extractFeatures(content.content);
  const faqs = extractFAQs(content.content);

  // Format title from slug (uses translation key when available)
  const slugKey = `page.${slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`;
  const title = hero.h1 || t(slugKey);

  const relatedProducts = getAllSlugs("product")
    .filter((s) => s !== slug)
    .slice(0, 4)
    .map((s) => ({
      label: t(`page.${s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`),
      href: `/product/${s}`,
    }));

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: t("page.product"), href: "/product" },
          { label: title },
        ]}
      />

      <PageHero
        title={title}
        subtitle={hero.subhead || content.meta.meta_description || ""}
        primaryCta={{ label: t("page.facilityBookDemo"), href: "/book-demo" }}
        secondaryCta={{ label: t("page.facilitySeePricing"), href: "/pricing" }}
      />

      {features.length > 0 && (
        <FeatureGrid
          title={t("page.keyCapabilities")}
          features={features.map((f) => ({
            title: f.title,
            description: f.description,
          }))}
        />
      )}

      {/* Proof points */}
      <section className="py-10 sm:py-12 md:py-16 bg-[var(--bg-subtle)]">
        <Container>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            <div className="text-center min-w-[100px]">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--action-primary)]">40s</div>
              <div className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">{t("page.avgBillingTime")}</div>
            </div>
            <div className="text-center min-w-[100px]">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--action-primary)]">9</div>
              <div className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">{t("page.indianLanguagesLabel")}</div>
            </div>
            <div className="text-center min-w-[100px]">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--action-primary)]">100%</div>
              <div className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">{t("page.abdmCompliant")}</div>
            </div>
          </div>
        </Container>
      </section>

      {faqs.length > 0 && <FAQSection faqs={faqs} />}

      <PageCTA
        title={t("page.productCtaTitle", { name: title })}
        subtitle={t("page.productCtaSubtitle")}
      />

      <CrossLinks title={t("page.relatedProducts")} links={relatedProducts} />
    </>
  );
}
