import { Metadata } from "next";
import { notFound } from "next/navigation";
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
  getAllSlugs,
} from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("legal");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentFile("legal", slug);

  if (!content) {
    return { title: "Page Not Found" };
  }

  return {
    title: content.meta.meta_title?.replace("{Product}", "AarogyaEHR") || `${formatTitle(slug)} — AarogyaEHR`,
    description: content.meta.meta_description?.replace("{Product}", "AarogyaEHR"),
  };
}

function formatTitle(slug: string): string {
  const cases: Record<string, string> = {
    "privacy-policy": "Privacy Policy",
    "terms-of-service": "Terms of Service",
    "cookie-policy": "Cookie Policy",
    "refund-policy": "Refund Policy",
  };
  return cases[slug] || slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
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
  const { slug } = await params;
  const content = getContentFile("legal", slug);

  if (!content) {
    notFound();
  }

  const title = formatTitle(slug);
  const Icon = getIcon(slug);

  // Render appropriate legal content based on slug
  const LegalContent = getLegalContent(slug);

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: "Legal", href: "/legal" },
          { label: title },
        ]}
      />

      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-sm font-medium mb-4">
              <Icon className="w-4 h-4" />
              Legal
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {title}
            </h1>
            <p className="text-[var(--text-secondary)]">
              Last updated: January 2025
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

function getLegalContent(slug: string) {
  switch (slug) {
    case "privacy-policy":
      return <PrivacyPolicyContent />;
    case "terms-of-service":
      return <TermsOfServiceContent />;
    case "cookie-policy":
      return <CookiePolicyContent />;
    case "refund-policy":
      return <RefundPolicyContent />;
    default:
      return <p>Content coming soon.</p>;
  }
}

function PrivacyPolicyContent() {
  return (
    <>
      <h2>Introduction</h2>
      <p>
        AarogyaEHR Technologies Private Limited ("AarogyaEHR", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our electronic health record software and related services.
      </p>

      <h2>Information We Collect</h2>
      <h3>Information You Provide</h3>
      <ul>
        <li><strong>Account Information:</strong> Name, email address, phone number, and organizational details when you register.</li>
        <li><strong>Patient Health Information (PHI):</strong> Clinical data entered by healthcare providers using our software.</li>
        <li><strong>Payment Information:</strong> Billing details processed through secure payment gateways.</li>
      </ul>

      <h3>Information Collected Automatically</h3>
      <ul>
        <li>Device information (browser type, operating system)</li>
        <li>Usage data (features accessed, time spent)</li>
        <li>IP addresses and approximate location</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To provide and maintain our services</li>
        <li>To comply with healthcare regulations (ABDM, NABH)</li>
        <li>To improve our product and user experience</li>
        <li>To communicate service updates and support</li>
        <li>To detect and prevent fraud or security issues</li>
      </ul>

      <h2>Data Storage and Security</h2>
      <p>
        All data is stored on servers located in India. We implement industry-standard security measures including encryption at rest and in transit, access controls, and regular security audits.
      </p>

      <h2>Your Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal information. Healthcare organizations retain ownership of patient data and can export it at any time.
      </p>

      <h2>Contact Us</h2>
      <p>
        For privacy-related inquiries, contact our Data Protection Officer at{" "}
        <a href="mailto:privacy@aarogyaehr.com">privacy@aarogyaehr.com</a>.
      </p>
    </>
  );
}

function TermsOfServiceContent() {
  return (
    <>
      <h2>Agreement to Terms</h2>
      <p>
        By accessing or using AarogyaEHR, you agree to be bound by these Terms of Service. If you disagree with any part, you may not access our services.
      </p>

      <h2>Use License</h2>
      <p>
        We grant you a limited, non-exclusive, non-transferable license to use AarogyaEHR for your internal healthcare operations in accordance with your subscription plan.
      </p>

      <h2>User Responsibilities</h2>
      <ul>
        <li>Maintain the confidentiality of your account credentials</li>
        <li>Ensure all users comply with applicable healthcare regulations</li>
        <li>Use the software only for lawful healthcare purposes</li>
        <li>Report any security vulnerabilities or breaches promptly</li>
      </ul>

      <h2>Data Ownership</h2>
      <p>
        <strong>You own your data.</strong> All patient health information and clinical data entered into AarogyaEHR remains your property. We process it only to provide our services.
      </p>

      <h2>Exit Rights</h2>
      <p>
        Upon termination of your subscription, you may request a full export of your data in standard formats (HL7 FHIR, CSV) within 30 days at no additional charge. We will delete your data from our systems within 90 days of termination, unless retention is required by law.
      </p>

      <h2>Service Level Agreement</h2>
      <p>
        We commit to 99.9% uptime for cloud-hosted deployments. Scheduled maintenance will be communicated at least 48 hours in advance.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        AarogyaEHR is a tool to support clinical decision-making, not a substitute for professional medical judgment. We are not liable for clinical decisions made using our software.
      </p>

      <h2>Changes to Terms</h2>
      <p>
        We may update these terms with 30 days notice. Continued use after changes constitutes acceptance.
      </p>
    </>
  );
}

function CookiePolicyContent() {
  return (
    <>
      <h2>What Are Cookies</h2>
      <p>
        Cookies are small text files stored on your device when you visit our website or use our application. They help us remember your preferences and improve your experience.
      </p>

      <h2>Cookies We Use</h2>
      <h3>Essential Cookies</h3>
      <p>
        Required for the application to function. These include session cookies for authentication and security.
      </p>

      <h3>Analytics Cookies</h3>
      <p>
        Help us understand how users interact with our software. We use anonymized, aggregated data to improve our product.
      </p>

      <h3>Preference Cookies</h3>
      <p>
        Remember your settings like language preference and interface customizations.
      </p>

      <h2>Third-Party Cookies</h2>
      <p>
        We do not use third-party advertising cookies. Our analytics tools are configured for privacy compliance.
      </p>

      <h2>Managing Cookies</h2>
      <p>
        You can control cookies through your browser settings. Note that disabling essential cookies may affect application functionality.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about our cookie practices? Email{" "}
        <a href="mailto:privacy@aarogyaehr.com">privacy@aarogyaehr.com</a>.
      </p>
    </>
  );
}

function RefundPolicyContent() {
  return (
    <>
      <h2>Our Commitment</h2>
      <p>
        We believe in fair, transparent billing. This policy explains when and how refunds are processed.
      </p>

      <h2>Subscription Refunds</h2>
      <h3>Annual Plans</h3>
      <p>
        If you cancel within 30 days of purchase or renewal, you'll receive a full refund minus any setup or implementation costs already incurred.
      </p>

      <h3>Monthly Plans</h3>
      <p>
        Monthly subscriptions are non-refundable but you may cancel at any time to prevent future charges.
      </p>

      <h2>Implementation Services</h2>
      <p>
        Custom implementation, training, and integration services are non-refundable once work has begun. We provide detailed statements of work before starting.
      </p>

      <h2>Partial Refunds</h2>
      <p>
        If service availability falls below our 99.9% SLA commitment, you're entitled to service credits as outlined in your service agreement.
      </p>

      <h2>How to Request a Refund</h2>
      <ol>
        <li>Email <a href="mailto:billing@aarogyaehr.com">billing@aarogyaehr.com</a> with your account details</li>
        <li>Include your reason for the refund request</li>
        <li>We'll respond within 3 business days</li>
        <li>Approved refunds are processed within 10 business days</li>
      </ol>

      <h2>Payment Disputes</h2>
      <p>
        If you notice an incorrect charge, contact us immediately. We'll investigate and correct any billing errors.
      </p>
    </>
  );
}
