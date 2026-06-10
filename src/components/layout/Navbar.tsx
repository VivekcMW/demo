"use client";

import { Bell, Search, Menu, Sun, Moon, ChevronDown, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useUIStore } from "@/store/useUIStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useRouter } from "next/navigation";

const NOTIFICATIONS = [
  { id: 1, text: "Critical lab result for Rajan Mehta", time: "2 min ago", read: false },
  { id: 2, text: "Dr. Sharma has new appointment at 14:30", time: "10 min ago", read: false },
  { id: 3, text: "Discharge summary pending for Bed A-12", time: "1 hr ago", read: true },
];

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

export function Navbar() {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const currentUser = useAuthStore((s) => s.currentUser);
  const logout = useAuthStore((s) => s.logout);
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const router = useRouter();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const initials = currentUser?.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() ?? "U";

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full shrink-0 items-center gap-3 border-b border-[var(--border-default)] bg-[var(--surface-raised)] px-4 sm:px-6">
      {/* Hamburger */}
      <button
        onClick={toggleSidebar}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-primary)]"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Global search */}
      <div className="relative hidden flex-1 sm:block">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
        />
        <input
          type="search"
          placeholder="Search patient, UHID, ABHA…"
          className="h-9 w-full max-w-sm rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        {/* Live clock */}
        <LiveClock />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-primary)]"
          aria-label="Toggle theme"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen((p) => !p); setProfileOpen(false); }}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-primary)]"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--action-primary)] px-1 text-[10px] font-semibold text-white animate-scale-in">
                {unread}
                <span className="absolute inset-0 rounded-full bg-[var(--action-primary)] animate-ping opacity-60" />
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-11 z-50 w-80 overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] shadow-md animate-scale-in">
              <p className="border-b border-[var(--border-default)] px-4 py-3 text-sm font-semibold text-[var(--text-primary)]">
                Notifications
              </p>
              <ul>
                {NOTIFICATIONS.map((n) => (
                  <li
                    key={n.id}
                    className={[
                      "flex flex-col gap-0.5 px-4 py-3 text-sm border-b border-[var(--border-default)] last:border-0",
                      !n.read ? "bg-[var(--action-subtle)]" : "",
                    ].join(" ")}
                  >
                    <span className={n.read ? "text-[var(--text-secondary)]" : "font-medium text-[var(--text-primary)]"}>
                      {n.text}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)]">{n.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen((p) => !p); setNotifOpen(false); }}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[var(--surface-sunken)]"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--action-primary)] text-xs font-semibold text-white">
              {initials}
            </span>
            <span className="hidden text-sm font-medium text-[var(--text-primary)] md:block">
              {currentUser?.name ?? "User"}
            </span>
            <ChevronDown size={14} className="text-[var(--text-secondary)]" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-11 z-50 w-52 overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] shadow-md">
              <div className="border-b border-[var(--border-default)] px-4 py-3">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{currentUser?.name}</p>
                <p className="text-xs text-[var(--text-secondary)] capitalize">{currentUser?.role}</p>
              </div>
              <button
                onClick={() => router.push("/settings")}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-primary)]"
              >
                <User size={15} />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 border-t border-[var(--border-default)] px-4 py-2.5 text-sm text-[var(--critical-fg)] hover:bg-[var(--critical-bg)]"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
