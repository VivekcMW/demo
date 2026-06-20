"use client";

import { Container } from "../ui/Container";
import { ShieldCheck, FileCheck, Scale, Building2, Languages, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

// Hospital logos — using SVG text wordmarks (no external images required)
const HOSPITAL_NAMES = [
  "Apollo Hospitals",
  "Fortis Healthcare",
  "Max Healthcare",
  "Manipal Hospitals",
  "Aster DM Healthcare",
  "Narayana Health",
  "KIMS Hospitals",
  "Yashoda Hospitals",
  "Medanta",
  "Ruby Hall Clinic",
  "Wockhardt Hospitals",
  "SRV Hospitals",
];

// Doubled for seamless infinite loop
const MARQUEE_ITEMS = [...HOSPITAL_NAMES, ...HOSPITAL_NAMES];

const BADGE_COLORS = [
  "bg-teal-50 text-teal-700 border-teal-200",
  "bg-blue-50 text-blue-700 border-blue-200",
  "bg-purple-50 text-purple-700 border-purple-200",
  "bg-green-50 text-green-700 border-green-200",
  "bg-indigo-50 text-indigo-700 border-indigo-200",
  "bg-cyan-50 text-cyan-700 border-cyan-200",
  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "bg-sky-50 text-sky-700 border-sky-200",
  "bg-violet-50 text-violet-700 border-violet-200",
  "bg-amber-50 text-amber-700 border-amber-200",
  "bg-rose-50 text-rose-700 border-rose-200",
  "bg-lime-50 text-lime-700 border-lime-200",
];

export function TrustBar() {
  const { t } = useTranslation();

  const certBadges = [
    { icon: ShieldCheck, label: t("trust.badgeAbdm") },
    { icon: FileCheck,   label: t("trust.badgeNabh") },
    { icon: Scale,       label: t("trust.badgeDpdp") },
    { icon: Building2,   label: t("trust.badgeIso") },
    { icon: Languages,   label: t("trust.badgeLanguages") },
    { icon: CheckCircle2, label: "HIPAA-ready" },
  ];

  return (
    <div className="border-y border-(--border-default) bg-white overflow-hidden">
      {/* Certification badges row */}
      <div className="border-b border-(--border-default) py-3 px-4">
        <Container>
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2">
            {certBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-1.5 text-xs text-(--text-secondary)">
                <badge.icon className="w-3.5 h-3.5 text-(--action-primary) shrink-0" />
                <span className="font-medium whitespace-nowrap">{badge.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Animated hospital name marquee */}
      <div className="py-3 relative">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-6" style={{ width: "max-content" }}>
          {MARQUEE_ITEMS.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className={`shrink-0 flex items-center justify-center px-4 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap ${BADGE_COLORS[i % BADGE_COLORS.length]}`}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
