import { notFound } from "next/navigation";
import { getServerT } from "@/i18n/server";
import {
  Building,
  Users,
  Briefcase,
  Mail,
  Newspaper,
  Handshake,
  MapPin,
  Phone,
  MessageSquare,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  PageBreadcrumb,
  PageCTA,
} from "@/components/marketing/templates";
import {
  getContentFile,
} from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatTitle(slug: string): string {
  const cases: Record<string, string> = {
    "about": "About Us",
    "careers": "Careers",
    "contact": "Contact",
    "news": "News",
    "partners": "Partners",
  };
  return cases[slug] || slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default async function CompanyPage({ params }: Props) {
  const t = await getServerT();
  const { slug } = await params;
  const content = getContentFile("company", slug);

  if (!content) {
    notFound();
  }

  const title = formatTitle(slug);

  function ContactPage() {
    return (
      <>
        <PageBreadcrumb
          items={[
            { label: t("page.company"), href: "/company" },
            { label: "Contact" },
          ]}
        />

        <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {t("page.contactGetInTouch")}
              </h1>
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                {t("page.contactSubtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-8 rounded-2xl bg-white border border-[var(--border-default)]">
                <Mail className="w-10 h-10 text-[var(--action-primary)] mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{t("page.contactEmail")}</h3>
                <a href="mailto:hello@aarogyaehr.com" className="text-[var(--action-primary)] hover:underline">
                  hello@aarogyaehr.com
                </a>
              </div>
              <div className="text-center p-8 rounded-2xl bg-white border border-[var(--border-default)]">
                <Phone className="w-10 h-10 text-[var(--action-primary)] mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{t("page.contactPhone")}</h3>
                <a href="tel:+919876543210" className="text-[var(--action-primary)] hover:underline">
                  +91 98765 43210
                </a>
              </div>
              <div className="text-center p-8 rounded-2xl bg-white border border-[var(--border-default)]">
                <MessageSquare className="w-10 h-10 text-[var(--action-primary)] mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{t("page.contactWhatsapp")}</h3>
                <a href="https://wa.me/919876543210" className="text-[var(--action-primary)] hover:underline">
                  {t("page.chatWithUs")}
                </a>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">{t("page.sendMessage")}</h2>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">{t("page.nameLabel")}</label>
                      <input type="text" className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">{t("page.emailLabel")}</label>
                      <input type="email" className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t("page.subjectLabel")}</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white">
                      <option>{t("page.salesInquiry")}</option>
                      <option>{t("page.supportRequest")}</option>
                      <option>{t("page.partnership")}</option>
                      <option>{t("page.pressMedia")}</option>
                      <option>{t("page.other")}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t("page.messageLabel")}</label>
                    <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white"></textarea>
                  </div>
                  <Button>{t("page.sendMessageBtn")}</Button>
                </form>
              </div>
              <div className="lg:pl-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">{t("page.office")}</h2>
                <div className="flex gap-4 mb-8">
                  <MapPin className="w-6 h-6 text-[var(--action-primary)] flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">AarogyaEHR Technologies</p>
                    <p className="text-[var(--text-secondary)]">
                      123 Tech Park, Whitefield<br />
                      Bangalore, Karnataka 560066<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </>
    );
  }

  function CareersPage() {
    const openings = [
      { title: "Senior Product Engineer", team: "Engineering", location: "Bangalore / Remote" },
      { title: "Clinical Implementation Specialist", team: "Customer Success", location: "Mumbai" },
      { title: "Product Designer", team: "Design", location: "Bangalore" },
      { title: "Sales Development Representative", team: "Sales", location: "Delhi NCR" },
    ];

    return (
      <>
        <PageBreadcrumb
          items={[
            { label: t("page.company"), href: "/company" },
            { label: "Careers" },
          ]}
        />

        <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {t("page.careersHeroTitle")}
              </h1>
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
                {t("page.careersHeroSubtitle")}
              </p>
              <Button href="#openings">{t("page.viewOpenings")}</Button>
            </div>
          </Container>
        </section>

        <section id="openings" className="py-16 md:py-24">
          <Container>
            <SectionHeader title={t("page.openPositions")} />
            <div className="space-y-4 max-w-3xl mx-auto">
              {openings.map((job, idx) => (
                <div
                  key={idx}
                  className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-xl border border-[var(--border-default)] bg-white hover:border-[var(--action-primary)] transition-colors cursor-pointer"
                >
                  <div>
                    <h3 className="font-semibold text-foreground">{job.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {job.team} · {job.location}
                    </p>
                  </div>
                  <Button variant="secondary">{t("page.apply")}</Button>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <PageCTA
          title={t("page.dontSeeRole")}
          subtitle={t("page.sendResumeSubtitle")}
          primaryCta={{ label: t("page.sendResume"), href: "mailto:careers@aarogyaehr.com" }}
        />
      </>
    );
  }

  function AboutPage({ content: _ }: { content: string }) {
    return (
      <>
        <PageBreadcrumb
          items={[
            { label: t("page.company"), href: "/company" },
            { label: "About" },
          ]}
        />

        <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {t("page.aboutAarogyaEHR")}
              </h1>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24">
          <Container narrow>
            <div className="prose prose-slate prose-lg max-w-none">
              <h2>Why we exist</h2>
              <p>
                Indian healthcare digitised its billing a decade ago and stopped. Clinical
                records — the part that determines whether the 3 am decision is informed —
                largely stayed on paper, because the software on offer was built for Western
                workflows, priced for metro chains, and designed for machines Indian hospitals
                don't have.
              </p>
              <p>
                We started AarogyaEHR to close that gap: an EHR with genuine specialty depth,
                native ABDM compliance, nine Indian languages in the clinical interface, and
                engineering that respects the 1366×768 desktop at a Tier-2 city nursing station.
              </p>

              <h2>What we believe</h2>
              <p>
                <strong>Specialty depth is the product.</strong> A cardiologist needs a cath
                report, not a customisable form. Depth is why doctors adopt, and doctor adoption
                is the only metric that predicts whether a hospital's digitisation survives.
              </p>
              <p>
                <strong>Compliance is never an upsell.</strong> ABDM, NABH reporting, statutory
                registers — built in, for every customer, at every size.
              </p>
              <p>
                <strong>Patient safety is a design discipline.</strong> Allergy banners that
                can't be hidden, colour never used alone, ASCII numerals for every dose. Our
                design system treats these as hard rules, not preferences.
              </p>
              <p>
                <strong>Honesty compounds.</strong> Our exit-rights promise is public. Our case
                studies include what went wrong. Our calculator shows our price next to the
                benefit. We'd rather lose a deal than win it on fog.
              </p>
            </div>
          </Container>
        </section>

        <PageCTA
          title={t("page.seeWhatWeBuilt")}
          subtitle={t("page.ctaSubtitle")}
          primaryCta={{ label: t("page.facilityBookDemo"), href: "/book-demo" }}
          secondaryCta={{ label: t("page.joinTheTeam"), href: "/company/careers" }}
        />
      </>
    );
  }

  if (slug === "contact") {
    return <ContactPage />;
  }

  if (slug === "careers") {
    return <CareersPage />;
  }

  if (slug === "about") {
    return <AboutPage content={content.content} />;
  }

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: t("page.company"), href: "/company" },
          { label: title },
        ]}
      />

      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
              {content.meta.meta_description?.replace("{Product}", "AarogyaEHR") || ""}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container narrow>
          <p className="text-[var(--text-secondary)] text-center">
            Content coming soon.
          </p>
        </Container>
      </section>
    </>
  );
}

