import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BookOpen,
  FileText,
  Video,
  Calculator,
  HelpCircle,
  Code,
  Newspaper,
  ArrowRight,
  Search,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  PageBreadcrumb,
  PageCTA,
} from "@/components/marketing/templates";
import {
  getContentFile,
  getAllSlugs,
} from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("resources");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentFile("resources", slug);

  if (!content) {
    return { title: "Resource Not Found" };
  }

  return {
    title: content.meta.meta_title?.replace("{Product}", "AarogyaEHR") || `${formatTitle(slug)} — AarogyaEHR`,
    description: content.meta.meta_description?.replace("{Product}", "AarogyaEHR"),
  };
}

function formatTitle(slug: string): string {
  const cases: Record<string, string> = {
    "api-docs": "API Documentation",
    "blog": "Blog",
    "case-studies": "Case Studies",
    "guides": "Guides",
    "help-center": "Help Center",
    "roi-calculator": "ROI Calculator",
    "webinars": "Webinars",
  };
  return cases[slug] || slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function getResourceIcon(slug: string) {
  const icons: Record<string, typeof BookOpen> = {
    "api-docs": Code,
    "blog": Newspaper,
    "case-studies": FileText,
    "guides": BookOpen,
    "help-center": HelpCircle,
    "roi-calculator": Calculator,
    "webinars": Video,
  };
  return icons[slug] || BookOpen;
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const content = getContentFile("resources", slug);

  if (!content) {
    notFound();
  }

  const title = formatTitle(slug);
  const ResourceIcon = getResourceIcon(slug);

  // Placeholder content for resource pages
  const placeholderItems = [
    { title: "Getting started guide", description: "Everything you need to know to begin." },
    { title: "Best practices", description: "Tips from successful implementations." },
    { title: "Troubleshooting", description: "Common issues and how to solve them." },
    { title: "Advanced features", description: "Power-user tips and hidden capabilities." },
  ];

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: title },
        ]}
      />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-sm font-medium mb-6">
              <ResourceIcon className="w-4 h-4" />
              Resources
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
              {content.meta.meta_description?.replace("{Product}", "AarogyaEHR") ||
                `Browse our ${title.toLowerCase()} to get the most from AarogyaEHR.`}
            </p>

            {/* Search (placeholder) */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                <input
                  type="text"
                  placeholder={`Search ${title.toLowerCase()}...`}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Content (placeholder) */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <p className="text-[var(--text-secondary)]">
              Content coming soon. Check back for updates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {placeholderItems.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[var(--border-default)] bg-white hover:shadow-lg transition-shadow cursor-pointer"
              >
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <PageCTA
        title="Need personalized help?"
        subtitle="Our support team is ready to assist."
        primaryCta={{ label: "Contact support", href: "/company/contact" }}
        secondaryCta={{ label: "Book a demo", href: "/book-demo" }}
      />
    </>
  );
}
