"use client";

import { Bell, Menu, Sun, Moon, ChevronDown, LogOut, User, ConciergeBell } from "lucide-react";
import { useState, useEffect } from "react";
import { useUIStore } from "@/store/useUIStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useRouter } from "next/navigation";

function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <div className="hidden sm:flex flex-col items-end leading-tight mr-1 w-28" />;

  const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  const date = now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="hidden sm:flex flex-col items-end leading-tight mr-1">
      <span className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">{time}</span>
      <span className="text-[11px] text-[var(--text-secondary)]">{date}</span>
    </div>
  );
}

export function ReceptionNavbar() {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const currentUser = useAuthStore((s) => s.currentUser);
  const logout = useAuthStore((s) => s.logout);
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const initials = currentUser?.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() ?? "R";

  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b border-[var(--border-default)] bg-[var(--surface-raised)] px-4">
      {/* Hamburger */}
      <button
        onClick={toggleSidebar}
        className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Reception badge */}
      <div className="flex items-center gap-1.5 rounded-lg bg-[var(--action-subtle)] px-2.5 py-1">
        <ConciergeBell size={13} className="text-[var(--action-primary)]" />
        <span className="text-xs font-semibold text-[var(--action-primary)]">Reception Desk</span>
      </div>

      <div className="flex-1" />

      <LiveClock />

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      </button>

      {/* Profile dropdown */}
      <div className="relative">
        <button
          onClick={() => setProfileOpen((v) => !v)}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--action-primary)] text-[11px] font-bold text-white">
            {initials}
          </div>
          <span className="hidden text-[var(--text-primary)] sm:inline">{currentUser?.name?.split(" ")[0] ?? "Reception"}</span>
          <ChevronDown size={14} />
        </button>

        {profileOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
            <div className="absolute right-0 top-full z-20 mt-1 w-52 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] py-1 shadow-lg">
              <div className="border-b border-[var(--border-default)] px-4 py-3">
                <p className="text-sm font-medium text-[var(--text-primary)]">{currentUser?.name}</p>
                <p className="text-xs text-[var(--text-secondary)]">{currentUser?.email}</p>
                <span className="mt-1 inline-block rounded-full bg-[var(--action-subtle)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--action-primary)]">
                  Receptionist
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-[var(--critical-fg)] hover:bg-[var(--surface-sunken)]"
              >
                <LogOut size={15} /> Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
