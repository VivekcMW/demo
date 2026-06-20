import { notFound } from "next/navigation";
import { getServerT } from "@/i18n/server";
import {
  Shield,
  FileText,
  Cookie,
  RefreshCw,
} from "lucide-react";
import { Container } from "@/components/marketing/ui";
import {
  PageBreadcrumb,
} from "@/components/marketing/templates";
import {
  getContentFile,
} from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatTitle(slug: string): string {
  const keys: Record<string, string> = {
    "privacy-policy": "page.legalPrivacyPolicy",
    "terms-of-service": "page.legalTermsOfService",
    "cookie-policy": "page.legalCookiePolicy",
    "refund-policy": "page.legalRefundPolicy",
  };
  return keys[slug] || `page.${slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`;
}

function getIcon(slug: string) {
  const icons: Record<string, typeof Shield> = {
    "privacy-policy": Shield,
    "terms-of-service": FileText,
    "cookie-policy": Cookie,
    "refund-policy": RefreshCw,
  };
  return icons[slug] || FileText;
}

export default async function LegalPage({ params }: Props) {
  const t = await getServerT();
  const { slug } = await params;
  const content = getContentFile("legal", slug);

  if (!content) {
    notFound();
  }

  const title = t(formatTitle(slug));
  const Icon = getIcon(slug);

  const LegalContent = <LegalContentRenderer slug={slug} t={t} />;

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: t("page.legal"), href: "/legal" },
          { label: title },
        ]}
      />

      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-sm font-medium mb-4">
              <Icon className="w-4 h-4" />
              {t("page.legalBadge")}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {title}
            </h1>
            <p className="text-[var(--text-secondary)]">
              {t("page.lastUpdated")}
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <Container narrow>
          <div className="prose prose-slate max-w-none">
            {LegalContent}
          </div>
        </Container>
      </section>
    </>
  );
}

function LegalContentRenderer({ slug, t }: { slug: string; t: (key: string) => string }) {
  switch (slug) {
    case "privacy-policy":
      return (
        <>
          <h2>{t("legalContent.privacyTitleIntroduction")}</h2>
          <p>{t("legalContent.privacyP1")}</p>
          <h2>{t("legalContent.privacyTitleCollect")}</h2>
          <h3>{t("legalContent.privacyTitleYouProvide")}</h3>
          <ul>
            <li>{t("legalContent.privacyLiAccount")}</li>
            <li>{t("legalContent.privacyLiPhi")}</li>
            <li>{t("legalContent.privacyLiPayment")}</li>
          </ul>
          <h3>{t("legalContent.privacyTitleAuto")}</h3>
          <ul>
            <li>{t("legalContent.privacyLiDevice")}</li>
            <li>{t("legalContent.privacyLiUsage")}</li>
            <li>{t("legalContent.privacyLiIp")}</li>
          </ul>
          <h2>{t("legalContent.privacyTitleUse")}</h2>
          <ul>
            <li>{t("legalContent.privacyLiProvide")}</li>
            <li>{t("legalContent.privacyLiComply")}</li>
            <li>{t("legalContent.privacyLiImprove")}</li>
            <li>{t("legalContent.privacyLiComm")}</li>
            <li>{t("legalContent.privacyLiFraud")}</li>
          </ul>
          <h2>{t("legalContent.privacyTitleStorage")}</h2>
          <p>{t("legalContent.privacyStorageP")}</p>
          <h2>{t("legalContent.privacyTitleRights")}</h2>
          <p>{t("legalContent.privacyRightsP")}</p>
          <h2>{t("legalContent.privacyTitleContact")}</h2>
          <p>{t("legalContent.privacyContactP")}</p>
        </>
      );
    case "terms-of-service":
      return (
        <>
          <h2>{t("legalContent.termsTitleAgreement")}</h2>
          <p>{t("legalContent.termsAgreementP")}</p>
          <h2>{t("legalContent.termsTitleLicense")}</h2>
          <p>{t("legalContent.termsLicenseP")}</p>
          <h2>{t("legalContent.termsTitleResponsibilities")}</h2>
          <ul>
            <li>{t("legalContent.termsLiCredentials")}</li>
            <li>{t("legalContent.termsLiComply")}</li>
            <li>{t("legalContent.termsLiLawful")}</li>
            <li>{t("legalContent.termsLiReport")}</li>
          </ul>
          <h2>{t("legalContent.termsTitleOwnership")}</h2>
          <p>{t("legalContent.termsOwnershipP")}</p>
          <h2>{t("legalContent.termsTitleExit")}</h2>
          <p>{t("legalContent.termsExitP")}</p>
          <h2>{t("legalContent.termsTitleSla")}</h2>
          <p>{t("legalContent.termsSlaP")}</p>
          <h2>{t("legalContent.termsTitleLiability")}</h2>
          <p>{t("legalContent.termsLiabilityP")}</p>
          <h2>{t("legalContent.termsTitleChanges")}</h2>
          <p>{t("legalContent.termsChangesP")}</p>
        </>
      );
    case "cookie-policy":
      return (
        <>
          <h2>{t("legalContent.cookieTitleWhat")}</h2>
          <p>{t("legalContent.cookieWhatP")}</p>
          <h2>{t("legalContent.cookieTitleWeUse")}</h2>
          <h3>{t("legalContent.cookieTitleEssential")}</h3>
          <p>{t("legalContent.cookieEssentialP")}</p>
          <h3>{t("legalContent.cookieTitleAnalytics")}</h3>
          <p>{t("legalContent.cookieAnalyticsP")}</p>
          <h3>{t("legalContent.cookieTitlePreference")}</h3>
          <p>{t("legalContent.cookiePreferenceP")}</p>
          <h2>{t("legalContent.cookieTitleThirdParty")}</h2>
          <p>{t("legalContent.cookieThirdPartyP")}</p>
          <h2>{t("legalContent.cookieTitleManaging")}</h2>
          <p>{t("legalContent.cookieManagingP")}</p>
          <h2>{t("legalContent.cookieTitleContact")}</h2>
          <p>{t("legalContent.cookieContactP")}</p>
        </>
      );
    case "refund-policy":
      return (
        <>
          <h2>{t("legalContent.refundTitleCommitment")}</h2>
          <p>{t("legalContent.refundCommitmentP")}</p>
          <h2>{t("legalContent.refundTitleSubscription")}</h2>
          <h3>{t("legalContent.refundTitleAnnual")}</h3>
          <p>{t("legalContent.refundAnnualP")}</p>
          <h3>{t("legalContent.refundTitleMonthly")}</h3>
          <p>{t("legalContent.refundMonthlyP")}</p>
          <h2>{t("legalContent.refundTitleImplementation")}</h2>
          <p>{t("legalContent.refundImplementationP")}</p>
          <h2>{t("legalContent.refundTitlePartial")}</h2>
          <p>{t("legalContent.refundPartialP")}</p>
          <h2>{t("legalContent.refundTitleHowTo")}</h2>
          <ol>
            <li>{t("legalContent.refundLi1")}</li>
            <li>{t("legalContent.refundLi2")}</li>
            <li>{t("legalContent.refundLi3")}</li>
            <li>{t("legalContent.refundLi4")}</li>
          </ol>
          <h2>{t("legalContent.refundTitleDisputes")}</h2>
          <p>{t("legalContent.refundDisputesP")}</p>
        </>
      );
    default:
      return <p>{t("page.contentComingSoon")}</p>;
  }
}
