import { notFound } from "next/navigation";
import {
  Shield,
  Server,
  Code,
  Link as LinkIcon,
  FileCheck,
  Bot,
  Lock,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  PageHero,
  FAQSection,
  PageCTA,
  PageBreadcrumb,
  CrossLinks,
} from "@/components/marketing/templates";
import {
  getContentFile,
  getAllSlugs,
  extractHero,
  extractFAQs,
  extractFeatures,
} from "@/lib/content";
import { getServerT, getContentLanguage } from "@/i18n/server";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatTitle(slug: string): string {
  const keys: Record<string, string> = {
    "abdm-compliance": "page.platformAbdm",
    "ai-capabilities": "page.platformAi",
    "architecture-reliability": "page.platformArchitecture",
    integrations: "page.platformIntegrations",
    interoperability: "page.platformInteroperability",
    "security-data-privacy": "page.platformSecurity",
  };
  return keys[slug] || `page.${slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`;
}

function getPlatformIcon(slug: string) {
  const icons: Record<string, typeof Shield> = {
    "abdm-compliance": FileCheck,
    "ai-capabilities": Bot,
    "architecture-reliability": Server,
    "integrations": LinkIcon,
    "interoperability": Code,
    "security-data-privacy": Lock,
  };
  return icons[slug] || Shield;
}

export default async function PlatformPage({ params }: Props) {
  const t = await getServerT();
  const lang = await getContentLanguage();
  const { slug } = await params;
  const content = getContentFile("platform", slug, lang);

  if (!content) {
    notFound();
  }

  const hero = extractHero(content.content);
  const faqs = extractFAQs(content.content);
  const features = extractFeatures(content.content);
  const title = t(formatTitle(slug));
  const PlatformIcon = getPlatformIcon(slug);

  // Extract first H1 from content
  const h1Match = content.content.match(/^#\s+(.+)$/m);
  const pageTitle = hero.h1 || h1Match?.[1] || title;

  // Extract main content sections
  const sections = content.content.split(/\n## /).slice(1).map((section) => {
    const lines = section.split("\n");
    const sectionTitle = lines[0];
    const sectionContent = lines.slice(1).join("\n").trim();
    return { title: sectionTitle, content: sectionContent };
  });

  const relatedPlatform = getAllSlugs("platform")
    .filter((s) => s !== slug)
    .map((s) => ({
      label: t(formatTitle(s)),
      href: `/platform/${s}`,
    }));

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: t("page.platform"), href: "/platform" },
          { label: title },
        ]}
      />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-sm font-medium mb-6">
              <PlatformIcon className="w-4 h-4" />
              {t("page.platformBadge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {pageTitle.replace("{Product}", "AarogyaEHR")}
            </h1>
            {hero.subhead && (
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
                {hero.subhead.replace("{Product}", "AarogyaEHR")}
              </p>
            )}
            <Button href="/book-demo">{t("page.facilityBookDemo")}</Button>
          </div>
        </Container>
      </section>

      {/* Content sections */}
      {sections.slice(0, 4).map((section, idx) => (
        <section
          key={idx}
          className={`py-16 md:py-24 ${idx % 2 === 0 ? "" : "bg-[var(--bg-subtle)]"}`}
        >
          <Container narrow>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {section.title}
            </h2>
            <div className="prose prose-slate max-w-none">
              {section.content.split("\n\n").map((para, pIdx) => {
                if (para.startsWith("**") && para.includes("**")) {
                  // Feature list item
                  const match = para.match(/\*\*(.+?)\*\*\s*[—–-]?\s*(.+)/);
                  if (match) {
                    return (
                      <div key={pIdx} className="flex gap-4 mb-4">
                        <Shield className="w-5 h-5 text-[var(--action-primary)] flex-shrink-0 mt-1" />
                        <div>
                          <strong className="text-foreground">{match[1]}</strong>
                          <span className="text-[var(--text-secondary)]"> {match[2].replace(/\{Product\}/g, "AarogyaEHR")}</span>
                        </div>
                      </div>
                    );
                  }
                }
                return (
                  <p key={pIdx} className="text-[var(--text-secondary)] leading-relaxed mb-4">
                    {para.replace(/\{Product\}/g, "AarogyaEHR")}
                  </p>
                );
              })}
            </div>
          </Container>
        </section>
      ))}

      {/* FAQ */}
      {faqs.length > 0 && (
        <FAQSection
          faqs={faqs.map((f) => ({
            question: f.question,
            answer: f.answer.replace(/\{Product\}/g, "AarogyaEHR"),
          }))}
        />
      )}

      {/* CTA */}
      <PageCTA
        title={t("page.platformCtaTitle")}
        subtitle={t("page.platformCtaSubtitle")}
      />

      {/* Related */}
      <CrossLinks title={t("page.moreAboutPlatform")} links={relatedPlatform} />
    </>
  );
}
