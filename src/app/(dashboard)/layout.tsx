"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useApiInit } from "@/hooks/useApiInit";
import { AppShell } from "@/components/layout/AppShell";
import { SentryErrorBoundary } from "@/components/monitoring/SentryErrorBoundary";

function LoadingShell() {
  return <div className="min-h-screen flex items-center justify-center" data-testid="loading-shell">Loading…</div>;
}

function hasValidSession() {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("api_token");
  const authStore = localStorage.getItem("aarogya-auth-store");
  return !!(token && authStore);
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentUser = useAuthStore((s) => s.currentUser);
  const [mounted, setMounted] = useState(false);

  useApiInit();

  useEffect(() => {
    setMounted(true);
    if (!currentUser && !hasValidSession()) {
      router.replace("/login");
    }
  }, [currentUser, router]);

  if (!mounted) {
    return <LoadingShell />;
  }

  if (!currentUser && !hasValidSession()) {
    return <LoadingShell />;
  }

  return (
    <SentryErrorBoundary>
      <AppShell>{children}</AppShell>
    </SentryErrorBoundary>
  );
}
