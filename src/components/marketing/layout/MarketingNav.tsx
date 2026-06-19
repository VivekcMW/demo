"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";

const productLinks = [
  { name: "OPD management", href: "/product/opd-management", description: "Queue, tokens, consultations" },
  { name: "IPD & wards", href: "/product/ipd-wards", description: "Bed board, admissions, discharge" },
  { name: "Clinical EMR", href: "/product/clinical-emr", description: "SOAP notes, templates, orders" },
  { name: "e-Prescription", href: "/product/e-prescription", description: "Drug database, interactions, CDSS" },
  { name: "Laboratory (LIS)", href: "/product/laboratory-lis", description: "Samples, results, TAT tracking" },
  { name: "Radiology (RIS/PACS)", href: "/product/radiology-ris-pacs", description: "Worklist, reporting, imaging" },
  { name: "Pharmacy & inventory", href: "/product/pharmacy-inventory", description: "Stock, dispensing, expiry" },
  { name: "OT & anaesthesia", href: "/product/ot-anaesthesia", description: "Scheduling, checklists, notes" },
  { name: "Billing & TPA", href: "/product/billing-tpa-insurance", description: "GST, insurance, claims" },
  { name: "ABDM / ABHA", href: "/product/abdm-abha", description: "Health ID, PHR, consent" },
];

const solutionLinks = [
  { name: "By specialty", href: "/specialties", description: "42 specialty workflow packs" },
  { name: "By facility type", href: "/facilities", description: "Clinic to super-specialty" },
  { name: "By role", href: "/roles", description: "Doctor, nurse, admin views" },
];

export function MarketingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[var(--border-default)]">
      <Container>
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--action-primary)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-lg text-[var(--text-primary)]">
              AarogyaEHR
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Product dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("product")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                {t("nav.product")}
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "product" && (
                <div className="absolute top-full left-0 w-[480px] p-4 bg-white rounded-xl shadow-lg border border-[var(--border-default)] grid grid-cols-2 gap-1 animate-fade-in">
                  {productLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block p-3 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors"
                    >
                      <span className="block text-sm font-medium text-[var(--text-primary)]">
                        {link.name}
                      </span>
                      <span className="block text-xs text-[var(--text-secondary)] mt-0.5">
                        {link.description}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Solutions dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("solutions")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                {t("nav.solutions")}
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "solutions" && (
                <div className="absolute top-full left-0 w-72 p-2 bg-white rounded-xl shadow-lg border border-[var(--border-default)] animate-fade-in">
                  {solutionLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block p-3 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors"
                    >
                      <span className="block text-sm font-medium text-[var(--text-primary)]">
                        {link.name}
                      </span>
                      <span className="block text-xs text-[var(--text-secondary)] mt-0.5">
                        {link.description}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className="px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {t("nav.pricing")}
            </Link>

            <Link
              href="/resources"
              className="px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {t("nav.resources")}
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher />
            <Link
              href="/login"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {t("common.login")}
            </Link>
            <Button href="/book-demo" size="sm" className="btn-shine">
              {t("common.bookDemo")}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden py-4 border-t border-[var(--border-default)] animate-fade-in">
            <div className="space-y-1">
              {/* Product section */}
              <div className="px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                {t("nav.product")}
              </div>
              {productLinks.slice(0, 6).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-sunken)] rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Solutions section */}
              <div className="px-3 py-2 mt-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                {t("nav.solutions")}
              </div>
              {solutionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-sunken)] rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Other links */}
              <div className="px-3 py-2 mt-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                More
              </div>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-sunken)] rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                {t("nav.pricing")}
              </Link>
              <Link
                href="/resources"
                className="block px-3 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-sunken)] rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                {t("nav.resources")}
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border-default)] space-y-3">
              {/* Language switcher in mobile */}
              <div className="px-1">
                <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-2 px-2">
                  Language
                </div>
                <LanguageSwitcher />
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Button href="/login" variant="secondary" className="w-full justify-center">
                  {t("common.login")}
                </Button>
                <Button href="/book-demo" className="w-full justify-center btn-shine">
                  {t("common.bookDemo")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
