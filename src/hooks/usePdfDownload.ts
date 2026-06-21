"use client";

import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface PdfOptions {
  lang?: string;
  watermark?: string;
}

export function usePdfDownload() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function downloadPdf(
    template: string,
    id: string,
    filename?: string,
    options?: PdfOptions,
  ): Promise<void> {
    setLoading(template);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/v1/pdf/${template}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          lang: options?.lang || "en",
          watermark: options?.watermark,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || `HTTP ${res.status}`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || `${template}-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "PDF download failed";
      setError(msg);
      throw err;
    } finally {
      setLoading(null);
    }
  }

  return { downloadPdf, loading, error };
}
