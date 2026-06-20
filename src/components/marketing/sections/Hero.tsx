"use client";

import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { ScrollReveal } from "@/hooks/useScrollReveal";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="marketing-hero bg-[var(--surface-page)]">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <ScrollReveal>
              <h1 className="text-3xl sm:text-4xl md:text-hero font-semibold text-[var(--text-primary)] tracking-tight leading-tight">
                {t("hero.title")}{" "}
                <span className="text-gradient">{t("hero.titleHighlight")}</span> {t("hero.titleEnd")}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button href="/book-demo" size="lg" icon={<ArrowRight className="w-5 h-5" />} className="w-full sm:w-auto btn-shine">
                  {t("common.bookDemo")}
                </Button>
                <Button href="/specialties" variant="secondary" size="lg" className="w-full sm:w-auto">
                  {t("hero.seeSpecialty")}
                </Button>
              </div>
            </ScrollReveal>
            
            {/* Quick proof points */}
            <ScrollReveal delay={3}>
              <div className="mt-8 sm:mt-10 flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-2 sm:gap-y-3 text-xs sm:text-sm text-[var(--text-secondary)] justify-center lg:justify-start">
                <div className="flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--action-primary)] group-hover:scale-150 transition-transform" />
                  <span>{t("hero.specialties")}</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--action-primary)] group-hover:scale-150 transition-transform" />
                  <span>{t("hero.languages")}</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--action-primary)] group-hover:scale-150 transition-transform" />
                  <span>{t("hero.abdm")}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Product screenshot */}
          <ScrollReveal variant="right" className="relative mt-8 lg:mt-0">
            {/* Main screenshot container */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[var(--border-default)] bg-white mx-auto max-w-md lg:max-w-none">
              {/* Browser chrome mockup */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-md px-3 py-1 text-xs text-slate-500 text-center">
                    app.aarogyaehr.com/opd
                  </div>
                </div>
              </div>
              
              {/* Screenshot placeholder - OPD view */}
              <div className="aspect-[16/10] bg-gradient-to-br from-slate-50 to-slate-100 p-6">
                <div className="h-full rounded-lg border border-slate-200 bg-white shadow-sm p-4">
                  {/* Mock OPD interface */}
                  <div className="flex gap-4 h-full">
                    {/* Sidebar */}
                    <div className="w-48 space-y-3">
                      <div className="h-8 bg-teal-50 rounded-lg flex items-center px-3">
                        <div className="w-3 h-3 rounded bg-teal-500" />
                        <div className="ml-2 h-2 w-16 bg-teal-200 rounded" />
                      </div>
                      <div className="h-8 bg-slate-50 rounded-lg flex items-center px-3">
                        <div className="w-3 h-3 rounded bg-slate-300" />
                        <div className="ml-2 h-2 w-12 bg-slate-200 rounded" />
                      </div>
                      <div className="h-8 bg-slate-50 rounded-lg flex items-center px-3">
                        <div className="w-3 h-3 rounded bg-slate-300" />
                        <div className="ml-2 h-2 w-20 bg-slate-200 rounded" />
                      </div>
                    </div>
                    
                    {/* Main content */}
                    <div className="flex-1 space-y-4">
                      {/* Patient header */}
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-semibold text-sm">
                          PS
                        </div>
                        <div>
                          <div className="h-3 w-28 bg-slate-300 rounded" />
                          <div className="h-2 w-20 bg-slate-200 rounded mt-1.5" />
                        </div>
                        <div className="ml-auto px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded font-medium">
                          {t("hero.allergyLabel")}
                        </div>
                      </div>
                      
                      {/* Content area */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <div className="h-2 w-16 bg-slate-300 rounded mb-2" />
                          <div className="space-y-1.5">
                            <div className="h-2 w-full bg-slate-200 rounded" />
                            <div className="h-2 w-3/4 bg-slate-200 rounded" />
                          </div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <div className="h-2 w-12 bg-slate-300 rounded mb-2" />
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-center p-2 bg-white rounded border border-slate-200">
                              <div className="text-lg font-semibold text-slate-700">120</div>
                              <div className="text-[10px] text-slate-400">{t("hero.systolicLabel")}</div>
                            </div>
                            <div className="text-center p-2 bg-white rounded border border-slate-200">
                              <div className="text-lg font-semibold text-slate-700">80</div>
                              <div className="text-[10px] text-slate-400">{t("hero.diastolicLabel")}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Caption */}
            <p className="mt-6 lg:mt-8 text-xs sm:text-sm text-center text-[var(--text-secondary)]">
              {t("hero.caption")}
            </p>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
