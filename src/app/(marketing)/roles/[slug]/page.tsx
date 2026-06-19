import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  User,
  Stethoscope,
  CreditCard,
  ClipboardList,
  FlaskConical,
  Pill,
  HeartPulse,
  UserCog,
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
} from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("roles");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentFile("roles", slug);

  if (!content) {
    return { title: "Role Not Found" };
  }

  return {
    title: content.meta.meta_title?.replace("{Product}", "AarogyaEHR") || `For ${formatTitle(slug)} — AarogyaEHR`,
    description: content.meta.meta_description?.replace("{Product}", "AarogyaEHR"),
  };
}

function formatTitle(slug: string): string {
  const cases: Record<string, string> = {
    "administrators": "Administrators",
    "billing-tpa-teams": "Billing & TPA Teams",
    "doctors": "Doctors",
    "front-desk": "Front Desk",
    "lab-technicians": "Lab Technicians",
    "nurses": "Nurses",
    "pharmacists": "Pharmacists",
  };
  return cases[slug] || slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function getRoleIcon(slug: string) {
  const icons: Record<string, typeof User> = {
    "administrators": UserCog,
    "billing-tpa-teams": CreditCard,
    "doctors": Stethoscope,
    "front-desk": ClipboardList,
    "lab-technicians": FlaskConical,
    "nurses": HeartPulse,
    "pharmacists": Pill,
  };
  return icons[slug] || User;
}

export default async function RolePage({ params }: Props) {
  const { slug } = await params;
  const content = getContentFile("roles", slug);

  if (!content) {
    notFound();
  }

  const hero = extractHero(content.content);
  const faqs = extractFAQs(content.content);
  const title = formatTitle(slug);
  const RoleIcon = getRoleIcon(slug);

  // Extract first H1 from content
  const h1Match = content.content.match(/^#\s+(.+)$/m);
  const pageTitle = hero.h1 || h1Match?.[1] || `For ${title}`;

  // Extract "What changes for you" section
  const changesMatch = content.content.match(/## What changes for you\n([\s\S]*?)(?=\n## |$)/);
  const changesContent = changesMatch?.[1] || "";
  const changes = changesContent
    .split("\n")
    .filter((l) => l.startsWith("**"))
    .map((l) => {
      const match = l.match(/\*\*(.+?)\*\*\s*(.+)/);
      return match ? { title: match[1], description: match[2] } : null;
    })
    .filter(Boolean) as Array<{ title: string; description: string }>;

  // Extract "A day with" section
  const dayMatch = content.content.match(/## A day with[^\n]*\n([\s\S]*?)(?=\n## |$)/);
  const dayContent = dayMatch?.[1] || "";

  const relatedRoles = getAllSlugs("roles")
    .filter((s) => s !== slug)
    .map((s) => ({
      label: `For ${formatTitle(s)}`,
      href: `/roles/${s}`,
    }));

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: "By Role", href: "/roles" },
          { label: `For ${title}` },
        ]}
      />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-sm font-medium mb-6">
              <RoleIcon className="w-4 h-4" />
              For {title.toLowerCase()}
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
              <Button href="/book-demo">See your screen</Button>
              <Button href="/specialties" variant="secondary">Browse specialties</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* What changes for you */}
      {changes.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <SectionHeader
              title="What changes for you"
              subtitle="How your workday improves."
            />
            <div className="grid md:grid-cols-2 gap-8">
              {changes.map((change, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-6 rounded-xl bg-[var(--bg-subtle)]"
                >
                  <CheckCircle2 className="w-6 h-6 text-[var(--action-primary)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {change.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {change.description.replace(/\{Product\}/g, "AarogyaEHR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* A day with */}
      {dayContent && (
        <section className="py-16 md:py-24 bg-[var(--bg-subtle)]">
          <Container narrow>
            <SectionHeader title={`A day with AarogyaEHR, as a ${title.toLowerCase()}`} />
            <div className="prose prose-slate max-w-none">
              {dayContent.split("\n\n").map((para, idx) => (
                <p key={idx} className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  {para.replace(/\{Product\}/g, "AarogyaEHR").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}
                </p>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <FAQSection
          title={`What ${title.toLowerCase()} ask us`}
          faqs={faqs.map((f) => ({
            question: f.question,
            answer: f.answer.replace(/\{Product\}/g, "AarogyaEHR"),
          }))}
        />
      )}

      {/* CTA */}
      <PageCTA
        title="See your screen, not a sales deck."
        subtitle={`Demos for ${title.toLowerCase()} are run on your workflows — bring a typical case.`}
      />

      {/* Related */}
      <CrossLinks title="Other roles" links={relatedRoles} />
    </>
  );
}
