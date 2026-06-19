"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useApiInit } from "@/hooks/useApiInit";
import { ReceptionShell } from "@/components/layout/ReceptionShell";

export default function ReceptionLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentUser = useAuthStore((s) => s.currentUser);

  useApiInit();

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  return <ReceptionShell>{children}</ReceptionShell>;
}
