"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Calendar, X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

// ── MobileCtaBar ─────────────────────────────────────────────────────────────
// Sticky bottom bar on mobile/tablet — shows after 4 seconds scroll.
// Hidden on desktop (lg+) where StickyCTA floating card handles it.
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (dismissed) return;
    // Show after user has scrolled 300px
    const onScroll = () => {
      if (window.scrollY > 300) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden safe-area-bottom">
        <div className="bg-white border-t border-(--border-default) shadow-xl px-4 py-3">
        <div className="flex items-center gap-2">
          <Link
            href="/book-demo"
            className="flex-1 flex items-center justify-center gap-2 bg-(--action-primary) text-white text-sm font-semibold rounded-xl py-3 hover:bg-(--action-primary-hover) transition-colors"
          >
            <Calendar className="w-4 h-4" />
            {t("common.bookDemo")}
          </Link>
          <a
            href="https://wa.me/919999999999?text=Hi%2C+I%27d+like+a+demo+of+AarogyaEHR"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-(--border-default) text-(--text-secondary) text-sm font-medium rounded-xl py-3 px-4 hover:bg-(--surface-sunken) transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden xs:inline">{t("common.whatsapp")}</span>
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="p-3 text-(--text-secondary) hover:text-foreground"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
