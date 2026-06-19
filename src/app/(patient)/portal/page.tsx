"use client";

import { useRouter } from "next/navigation";
import { usePatientAuthStore } from "@/store/usePatientAuthStore";
import { useEffect } from "react";

export default function PortalRedirectPage() {
  const router = useRouter();
  const loggedIn = usePatientAuthStore((s) => s.loggedInPatientId);

  useEffect(() => {
    if (!loggedIn) {
      router.replace("/portal/login");
    } else {
      router.replace("/portal/dashboard");
    }
  }, [loggedIn, router]);

  return null;
}
