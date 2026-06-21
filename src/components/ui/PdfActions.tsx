"use client";

import { Download, Printer } from "lucide-react";
import { usePdfDownload } from "@/hooks/usePdfDownload";

interface PdfActionsProps {
  template: string;
  id: string;
  filename?: string;
  label?: string;
  showPrint?: boolean;
  lang?: string;
  className?: string;
}

export function PdfDownloadButton({
  template,
  id,
  filename,
  label = "Download PDF",
  lang = "en",
  className = "",
}: PdfActionsProps) {
  const { downloadPdf, loading, error } = usePdfDownload();

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        onClick={() => downloadPdf(template, id, filename, { lang })}
        disabled={loading === template}
        className={`flex items-center gap-1.5 rounded-xl bg-[var(--action-primary)] px-4 py-2 text-xs font-medium text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-50 ${className}`}
      >
        <Download size={14} />
        {loading === template ? "Generating..." : label}
      </button>
      {error && <span className="text-[10px] text-[var(--critical-fg)]">{error}</span>}
    </div>
  );
}

export function PdfActions({
  template,
  id,
  filename,
  showPrint = true,
  lang = "en",
  className = "",
}: PdfActionsProps) {
  const { downloadPdf, loading, error } = usePdfDownload();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => downloadPdf(template, id, filename, { lang })}
        disabled={loading === template}
        className="flex items-center gap-1.5 rounded-xl bg-[var(--action-primary)] px-4 py-2 text-xs font-medium text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-50"
      >
        <Download size={14} />
        {loading === template ? "Generating..." : "Download PDF"}
      </button>
      {showPrint && (
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 rounded-xl border border-[var(--border-default)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <Printer size={14} /> Print
        </button>
      )}
      {error && <span className="text-[10px] text-[var(--critical-fg)]">{error}</span>}
    </div>
  );
}
