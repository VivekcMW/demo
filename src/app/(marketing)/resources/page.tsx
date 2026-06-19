import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  Video,
  Calculator,
  HelpCircle,
  Code,
  Newspaper,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";

export const metadata: Metadata = {
  title: "Resources — AarogyaEHR",
  description:
    "Guides, case studies, webinars, API docs, and help center for AarogyaEHR users.",
};

const resources = [
  {
    slug: "help-center",
    name: "Help Center",
    description: "Searchable knowledge base for users and administrators.",
    icon: HelpCircle,
    cta: "Browse articles",
  },
  {
    slug: "guides",
    name: "Guides",
    description: "Step-by-step guides for common workflows and configurations.",
    icon: BookOpen,
    cta: "View guides",
  },
  {
    slug: "case-studies",
    name: "Case Studies",
    description: "How hospitals like yours implemented AarogyaEHR.",
    icon: FileText,
    cta: "Read stories",
  },
  {
    slug: "webinars",
    name: "Webinars",
    description: "Live and recorded sessions on features, best practices, and compliance.",
    icon: Video,
    cta: "Watch webinars",
  },
  {
    slug: "roi-calculator",
    name: "ROI Calculator",
    description: "Estimate time and cost savings for your facility.",
    icon: Calculator,
    cta: "Calculate ROI",
  },
  {
    slug: "api-docs",
    name: "API Documentation",
    description: "REST API reference for integrations and custom development.",
    icon: Code,
    cta: "View API docs",
  },
  {
    slug: "blog",
    name: "Blog",
    description: "Product updates, healthcare insights, and best practices.",
    icon: Newspaper,
    cta: "Read blog",
  },
];

export default function ResourcesIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Resources
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Learn, implement, succeed.
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
              Guides, case studies, webinars, and documentation to help you
              get the most from AarogyaEHR.
            </p>
          </div>
        </Container>
      </section>

      {/* Resources grid */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <Link
                key={resource.slug}
                href={`/resources/${resource.slug}`}
                className="group p-8 rounded-2xl border border-[var(--border-default)] bg-white hover:border-[var(--action-primary)] hover:shadow-xl transition-all"
              >
                <resource.icon className="w-10 h-10 text-[var(--action-primary)] mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[var(--action-primary)] transition-colors">
                  {resource.name}
                </h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  {resource.description}
                </p>
                <span className="inline-flex items-center text-[var(--action-primary)] font-medium text-sm">
                  {resource.cta}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[var(--action-primary)]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Can't find what you need?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Our support team is available via WhatsApp and email.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/company/contact" variant="inverse">
                Contact support
              </Button>
              <Button href="/book-demo" variant="ghost" className="text-white border-white/30 hover:bg-white/10">
                Book a demo
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
