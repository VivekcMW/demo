"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useApiInit } from "@/hooks/useApiInit";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
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

function AuthenticatedShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // HIPAA §164.312(a)(2)(iii): Auto-logoff on inactivity (30 min default)
  const handleTimeout = useCallback(() => {
    router.replace("/login?reason=timeout");
  }, [router]);

  useSessionTimeout(handleTimeout);

  return (
    <SentryErrorBoundary>
      <AppShell>{children}</AppShell>
    </SentryErrorBoundary>
  );
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

  return <AuthenticatedShell>{children}</AuthenticatedShell>;
}
