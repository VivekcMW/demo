import { Metadata } from "next";
import { MarketingNav, MarketingFooter, MobileCtaBar } from "@/components/marketing";
import { LocationDetector } from "@/hooks/useLocationDetection";

export const metadata: Metadata = {
  title: {
    default: "AarogyaEHR — Hospital EHR & HIMS built for India",
    template: "%s | AarogyaEHR",
  },
  description:
    "Specialty-deep EHR for Indian hospitals and clinics. ABDM/ABHA built in, 9 Indian languages, NABH-ready, works offline-tolerant on any hospital PC.",
  keywords: [
    "EHR India",
    "HIMS software",
    "hospital management software India",
    "ABDM compliant EHR",
    "EMR software India",
    "hospital software",
    "clinic management software",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "AarogyaEHR",
  },
};

export default function MarketingLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <LocationDetector />
      <MarketingNav />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
      <MobileCtaBar />
    </div>
  );
}
