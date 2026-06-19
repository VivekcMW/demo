"use client";

import Link from "next/link";
import {
  Stethoscope,
  Building2,
  FlaskConical,
  Pill,
  Activity,
  Calendar,
  FileText,
  CreditCard,
  Bed,
  AlertTriangle,
  BarChart3,
  Smartphone,
  Shield,
  Ambulance,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import { useTranslation } from "@/hooks/useTranslation";

const productCategories = [
  {
    titleKey: "product.categoryClinical",
    products: [
      { slug: "clinical-emr", nameKey: "product.prodClinicalEmr", icon: FileText },
      { slug: "e-prescription", nameKey: "product.prodEPrescription", icon: Pill },
      { slug: "opd-management", nameKey: "product.prodOpdManagement", icon: Calendar },
      { slug: "ipd-wards", nameKey: "product.prodIpdWards", icon: Bed },
    ],
  },
  {
    titleKey: "product.categoryDiagnostics",
    products: [
      { slug: "laboratory-lis", nameKey: "product.prodLaboratoryLis", icon: FlaskConical },
      { slug: "radiology-ris-pacs", nameKey: "product.prodRadiologyRisPacs", icon: Activity },
    ],
  },
  {
    titleKey: "product.categoryOperations",
    products: [
      { slug: "pharmacy-inventory", nameKey: "product.prodPharmacyInventory", icon: Pill },
      { slug: "billing-tpa-insurance", nameKey: "product.prodBillingTpa", icon: CreditCard },
      { slug: "ot-anaesthesia", nameKey: "product.prodOtAnaesthesia", icon: Stethoscope },
      { slug: "emergency-triage", nameKey: "product.prodEmergencyTriage", icon: Ambulance },
      { slug: "daycare-workflows", nameKey: "product.prodDaycareWorkflows", icon: Calendar },
    ],
  },
  {
    titleKey: "product.categoryPlatform",
    products: [
      { slug: "analytics-mis-nabh", nameKey: "product.prodAnalyticsNabh", icon: BarChart3 },
      { slug: "abdm-abha", nameKey: "product.prodAbdmAbha", icon: Shield },
      { slug: "telemedicine-patient-app", nameKey: "product.prodTelemedicinePatientApp", icon: Smartphone },
    ],
  },
];

export default function ProductIndexPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t("product.heroTitle")}
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
              {t("product.heroSubtitle")}
            </p>
            <Button href="/book-demo">{t("common.bookDemo")}</Button>
          </div>
        </Container>
      </section>

      {/* Product grid by category */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="space-y-16">
            {productCategories.map((category) => (
              <div key={category.titleKey}>
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  {t(category.titleKey)}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.products.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/product/${product.slug}`}
                      className="group p-6 rounded-xl border border-[var(--border-default)] bg-white hover:border-[var(--action-primary)] hover:shadow-lg transition-all"
                    >
                      <product.icon className="w-10 h-10 text-[var(--action-primary)] mb-4" />
                      <h3 className="font-semibold text-foreground group-hover:text-[var(--action-primary)] transition-colors">
                        {t(product.nameKey)}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[var(--action-primary)]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("product.ctaTitle")}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t("product.ctaSubtitle")}
            </p>
            <Button href="/book-demo" variant="inverse">
              {t("common.bookDemo")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
