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
import { getServerT } from "@/i18n/server";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatTitle(slug: string): string {
  const keys: Record<string, string> = {
    administrators: "page.rolesAdmin",
    "billing-tpa-teams": "page.rolesBillingTpa",
    doctors: "page.rolesDoctors",
    "front-desk": "page.rolesFrontDesk",
    "lab-technicians": "page.rolesLabTechnicians",
    nurses: "page.rolesNurses",
    pharmacists: "page.rolesPharmacists",
  };
  return keys[slug] || `page.${slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`;
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
  const t = await getServerT();
  const { slug } = await params;
  const content = getContentFile("roles", slug);

  if (!content) {
    notFound();
  }

  const hero = extractHero(content.content);
  const faqs = extractFAQs(content.content);
  const title = t(formatTitle(slug));
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
      label: t("page.forRole", { name: t(formatTitle(s)).toLowerCase() }),
      href: `/roles/${s}`,
    }));

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: t("page.byRole"), href: "/roles" },
          { label: t("page.forRole", { name: title.toLowerCase() }) },
        ]}
      />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-sm font-medium mb-6">
              <RoleIcon className="w-4 h-4" />
              {t("page.forRole", { name: title.toLowerCase() })}
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
              <Button href="/book-demo">{t("page.seeYourScreen")}</Button>
              <Button href="/specialties" variant="secondary">{t("page.browseSpecialties")}</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* What changes for you */}
      {changes.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <SectionHeader
              title={t("page.whatChangesForYou")}
              subtitle={t("page.workdayImproves")}
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
            <SectionHeader title={t("page.dayWithEhr", { name: title.toLowerCase() })} />
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
          title={t("page.whatNameAsk", { name: title.toLowerCase() })}
          faqs={faqs.map((f) => ({
            question: f.question,
            answer: f.answer.replace(/\{Product\}/g, "AarogyaEHR"),
          }))}
        />
      )}

      {/* CTA */}
      <PageCTA
        title={t("page.roleCtaTitle")}
        subtitle={t("page.roleCtaSubtitle", { name: title.toLowerCase() })}
      />

      {/* Related */}
      <CrossLinks title={t("page.otherRoles")} links={relatedRoles} />
    </>
  );
}
