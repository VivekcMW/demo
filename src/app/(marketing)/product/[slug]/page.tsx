import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("product");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentFile("product", slug);

  if (!content) {
    return { title: "Product Not Found" };
  }

  return {
    title: content.meta.meta_title || `${slug} — AarogyaEHR`,
    description: content.meta.meta_description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const content = getContentFile("product", slug);

  if (!content) {
    notFound();
  }

  const hero = extractHero(content.content);
  const features = extractFeatures(content.content);
  const faqs = extractFAQs(content.content);

  // Format title from slug
  const title = hero.h1 || slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const relatedProducts = getAllSlugs("product")
    .filter((s) => s !== slug)
    .slice(0, 4)
    .map((s) => ({
      label: s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      href: `/product/${s}`,
    }));

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: "Product", href: "/product" },
          { label: title },
        ]}
      />

      <PageHero
        title={title}
        subtitle={hero.subhead || content.meta.meta_description || ""}
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />

      {features.length > 0 && (
        <FeatureGrid
          title="Key capabilities"
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
              <div className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">Average billing time</div>
            </div>
            <div className="text-center min-w-[100px]">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--action-primary)]">9</div>
              <div className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">Indian languages</div>
            </div>
            <div className="text-center min-w-[100px]">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--action-primary)]">100%</div>
              <div className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">ABDM compliant</div>
            </div>
          </div>
        </Container>
      </section>

      {faqs.length > 0 && <FAQSection faqs={faqs} />}

      <PageCTA
        title={`See ${title} in action`}
        subtitle="45-minute live demo configured for your facility."
      />

      <CrossLinks title="Related products" links={relatedProducts} />
    </>
  );
}
