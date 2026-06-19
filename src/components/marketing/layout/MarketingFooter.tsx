"use client";

import Link from "next/link";
import { Container } from "../ui/Container";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const footerLinks = {
  product: [
    { name: "OPD management", href: "/product/opd-management" },
    { name: "IPD & wards", href: "/product/ipd-wards" },
    { name: "Clinical EMR", href: "/product/clinical-emr" },
    { name: "e-Prescription", href: "/product/e-prescription" },
    { name: "Laboratory (LIS)", href: "/product/laboratory-lis" },
    { name: "Billing & TPA", href: "/product/billing-tpa-insurance" },
    { name: "ABDM / ABHA", href: "/product/abdm-abha" },
  ],
  solutions: [
    { name: "By specialty", href: "/specialties" },
    { name: "By facility type", href: "/facilities" },
    { name: "By role", href: "/roles" },
    { name: "Cardiology", href: "/specialties/cardiology" },
    { name: "OBG", href: "/specialties/obstetrics-gynaecology" },
    { name: "Nephrology", href: "/specialties/nephrology-dialysis" },
    { name: "Oncology", href: "/specialties/oncology" },
  ],
  resources: [
    { name: "Case studies", href: "/resources/case-studies" },
    { name: "Guides", href: "/resources/guides" },
    { name: "Help center", href: "/resources/help-center" },
    { name: "API documentation", href: "/resources/api-docs" },
    { name: "Webinars", href: "/resources/webinars" },
  ],
  company: [
    { name: "About", href: "/company/about" },
    { name: "Careers", href: "/company/careers" },
    { name: "Contact", href: "/company/contact" },
    { name: "Partners", href: "/company/partners" },
  ],
  legal: [
    { name: "Privacy policy", href: "/legal/privacy-policy" },
    { name: "Terms of service", href: "/legal/terms-of-service" },
    { name: "DPDP compliance", href: "/legal/cookie-policy" },
  ],
};

export function MarketingFooter() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <Container className="py-10 sm:py-12 md:py-16">
        <ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {/* Brand column */}
            <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-semibold text-base sm:text-lg text-white">
                  AarogyaEHR
                </span>
              </Link>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t("footer.tagline")}
              </p>
            <div className="mt-4 sm:mt-6 flex gap-4">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-teal-400 transition-colors p-1.5 -ml-1.5"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/aarogyaehr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-teal-400 transition-colors p-1.5"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/aarogyaehr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-teal-400 transition-colors p-1.5"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-white mb-3 sm:mb-4">{t("footer.product")}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm hover:text-teal-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-white mb-3 sm:mb-4">{t("footer.solutions")}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm hover:text-teal-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-white mb-3 sm:mb-4">{t("footer.resources")}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm hover:text-teal-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-white mb-3 sm:mb-4">{t("footer.company")}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm hover:text-teal-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </ScrollReveal>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
              © {new Date().getFullYear()} TheCgroup Private Limited. All rights reserved.
            </p>
            <LanguageSwitcher variant="footer" />
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs sm:text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
