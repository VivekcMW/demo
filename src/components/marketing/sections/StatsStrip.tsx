"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "../ui/Container";
import { useTranslation } from "@/hooks/useTranslation";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// ── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, started = false) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, started]);

  return value;
}

// ── StatItem ─────────────────────────────────────────────────────────────────
function StatItem({
  value, unit, label, prefix = "", suffix = "", delay, started,
}: {
  value: number;
  unit: string;
  label: string;
  prefix?: string;
  suffix?: string;
  delay: number;
  started: boolean;
}) {
  const count = useCountUp(value, 1600, started);

  return (
    <div
      className="text-center"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums ${started ? "animate-count-pop" : "opacity-0"}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {prefix}{count}{suffix}
        {unit && (
          <span className="text-base sm:text-xl font-normal text-teal-200 ml-1">
            {unit}
          </span>
        )}
      </div>
      <div className="mt-1 text-xs sm:text-sm text-teal-100 leading-snug">{label}</div>
    </div>
  );
}

// ── StatsStrip ────────────────────────────────────────────────────────────────
export function StatsStrip() {
  const { t } = useTranslation();
  const [ref, inView] = useScrollReveal({ threshold: 0.3 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView && !started) setStarted(true);
  }, [inView, started]);

  const stats = [
    { value: 40, unit: "sec", suffix: "", prefix: "", label: t("stats.avgOpdBillTime") },
    { value: 12, unit: "", suffix: "", prefix: "", label: t("stats.indianLanguages") },
    { value: 42, unit: "", suffix: "", prefix: "", label: t("stats.specialtyWorkflows") },
    { value: 99, unit: "", suffix: ".9%", prefix: "", label: t("stats.uptimeSla") },
    { value: 3, unit: "wks", suffix: "", prefix: "<", label: t("stats.clinicGoLive") },
  ];

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-r from-[var(--action-primary)] via-teal-500 to-[var(--action-primary)] animate-gradient">
      <Container>
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <StatItem
              key={i}
              value={stat.value}
              unit={stat.unit}
              label={stat.label}
              prefix={stat.prefix}
              suffix={stat.suffix}
              delay={i * 120}
              started={started}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
