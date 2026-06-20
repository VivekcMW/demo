"use client";

// HIPAA §164.312(a)(2)(iii) — Automatic Logoff
// Automatically log out the user after a period of inactivity.
// Default: 30 minutes (configurable via NEXT_PUBLIC_SESSION_TIMEOUT_MINUTES).

import { useEffect, useRef, useCallback } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const INACTIVITY_TIMEOUT_MS =
  (Number(process.env.NEXT_PUBLIC_SESSION_TIMEOUT_MINUTES) || 30) * 60 * 1000;

const ACTIVITY_EVENTS: (keyof WindowEventMap)[] = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "scroll",
  "click",
];

/**
 * Attaches inactivity detection to the window.
 * Must be used inside an authenticated layout only.
 * Shows a 60-second warning before logout.
 */
export function useSessionTimeout(onTimeout?: () => void) {
  const logout = useAuthStore((s) => s.logout);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (warnTimerRef.current) clearTimeout(warnTimerRef.current);
  }, []);

  const resetTimer = useCallback(() => {
    clearTimers();

    // Warn 60 seconds before logout
    warnTimerRef.current = setTimeout(() => {
      // Dispatch a custom event that the UI can listen to for showing a warning modal
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("session:warning", { detail: { secondsLeft: 60 } }));
      }
    }, INACTIVITY_TIMEOUT_MS - 60_000);

    // Auto-logout on timeout
    timerRef.current = setTimeout(() => {
      logout();
      onTimeout?.();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("session:expired"));
      }
    }, INACTIVITY_TIMEOUT_MS);
  }, [clearTimers, logout, onTimeout]);

  useEffect(() => {
    // Start the timer immediately on mount
    resetTimer();

    // Reset on any user activity
    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, resetTimer, { passive: true });
    }

    return () => {
      clearTimers();
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, resetTimer);
      }
    };
  }, [resetTimer, clearTimers]);
}
