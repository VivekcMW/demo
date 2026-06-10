"use client";

import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 z-50 inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 text-sm font-medium text-[var(--text-primary)] shadow-sm transition-colors hover:bg-[var(--action-subtle)]"
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      title={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      {isLight ? <Moon size={16} /> : <Sun size={16} />}
      {isLight ? "Dark" : "Light"}
    </button>
  );
}
