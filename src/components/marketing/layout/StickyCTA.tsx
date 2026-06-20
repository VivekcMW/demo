"use client";

import { useState, useEffect } from "react";
import { ArrowRight, MessageCircle, Calendar, X, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { useTranslation } from "@/hooks/useTranslation";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--action-primary)] to-[var(--brand-teal)] shadow-2xl">
          {/* Dismiss button */}
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-3 right-3 p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors z-10"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-1/4 translate-y-1/4" />
          </div>

          <div className="relative p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Left side: Icon + Text */}
              <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
                <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span className="text-xs font-medium text-white/90 uppercase tracking-wide">
                      {t("stickyCta.eyebrow")}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-semibold text-white leading-tight">
                    {t("stickyCta.title")}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                    {t("stickyCta.subtitle")}
                  </p>
                </div>
              </div>

              {/* Right side: Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  href="/book-demo"
                  size="sm"
                  variant="secondary"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto bg-white text-[var(--action-primary)] hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                >
                  {t("stickyCta.bookDemo")}
                </Button>
                <Button
                  href="https://wa.me/919876543210"
                  variant="secondary"
                  size="sm"
                  external
                  className="hidden sm:inline-flex bg-white/20 text-white border-white/30 hover:bg-white/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t("stickyCta.whatsapp")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}