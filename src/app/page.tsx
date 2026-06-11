"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function Home() {
  const router = useRouter();
  const currentUser = useAuthStore((s) => s.currentUser);

  useEffect(() => {
    if (currentUser) {
      if ((currentUser as { role?: string }).role === "receptionist") {
        router.replace("/reception");
      } else {
        router.replace("/dashboard");
      }
    } else {
      router.replace("/login");
    }
  }, [currentUser, router]);

  return null;
}
