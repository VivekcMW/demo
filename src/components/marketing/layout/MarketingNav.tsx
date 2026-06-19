"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";

export function MarketingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useTranslation();

  const productLinks = [
    { name: t("navProduct.opdManagement"), href: "/product/opd-management", description: t("navProduct.opdManagementDesc") },
    { name: t("navProduct.ipdWards"), href: "/product/ipd-wards", description: t("navProduct.ipdWardsDesc") },
    { name: t("navProduct.clinicalEmr"), href: "/product/clinical-emr", description: t("navProduct.clinicalEmrDesc") },
    { name: t("navProduct.ePrescription"), href: "/product/e-prescription", description: t("navProduct.ePrescriptionDesc") },
    { name: t("navProduct.laboratoryLis"), href: "/product/laboratory-lis", description: t("navProduct.laboratoryLisDesc") },
    { name: t("navProduct.radiologyRisPacs"), href: "/product/radiology-ris-pacs", description: t("navProduct.radiologyRisPacsDesc") },
    { name: t("navProduct.pharmacyInventory"), href: "/product/pharmacy-inventory", description: t("navProduct.pharmacyInventoryDesc") },
    { name: t("navProduct.otAnaesthesia"), href: "/product/ot-anaesthesia", description: t("navProduct.otAnaesthesiaDesc") },
    { name: t("navProduct.billingTpa"), href: "/product/billing-tpa-insurance", description: t("navProduct.billingTpaDesc") },
    { name: t("navProduct.abdmAbha"), href: "/product/abdm-abha", description: t("navProduct.abdmAbhaDesc") },
  ];

  const solutionLinks = [
    { name: t("navSolution.bySpecialty"), href: "/specialties", description: t("navSolution.bySpecialtyDesc") },
    { name: t("navSolution.byFacilityType"), href: "/facilities", description: t("navSolution.byFacilityTypeDesc") },
    { name: t("navSolution.byRole"), href: "/roles", description: t("navSolution.byRoleDesc") },
  ];

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
            aria-label={t("nav.toggleMenu")}
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
                {t("nav.more")}
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
                  {t("nav.language")}
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
