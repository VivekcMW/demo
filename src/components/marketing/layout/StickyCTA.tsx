"use client";

import { useState, useEffect } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { useTranslation } from "@/hooks/useTranslation";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
        <div className="mx-auto max-w-2xl rounded-xl bg-white border border-[var(--border-default)] shadow-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                {t("stickyCta.title")}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {t("stickyCta.subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                href="/book-demo"
                size="sm"
                icon={<ArrowRight className="w-5 h-5" />}
                className="w-full sm:w-auto btn-shine"
              >
                {t("common.bookDemo")}
              </Button>
              <Button
                href="https://wa.me/919876543210"
                variant="secondary"
                size="sm"
                external
                className="hidden sm:inline-flex"
              >
                <MessageCircle className="w-4 h-4" />
                {t("common.whatsapp")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}