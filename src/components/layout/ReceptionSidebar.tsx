"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ConciergeBell, ChevronLeft, ChevronRight } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { receptionNavigation } from "@/config/receptionNavigation";

export function ReceptionSidebar() {
  const pathname = usePathname();
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-30 flex flex-col",
          "border-r border-[var(--border-default)] bg-[var(--surface-raised)]",
          "transition-[transform,width] duration-[280ms] ease-[cubic-bezier(0.2,0,0,1)]",
          "w-64",
          sidebarOpen ? "md:w-60" : "md:w-16",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        {/* Logo row */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--border-default)] px-3">
          <div className={["flex items-center gap-2.5 overflow-hidden", !sidebarOpen ? "md:hidden" : ""].join(" ")}>
            <ConciergeBell size={22} className="shrink-0 text-[var(--action-primary)]" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-[var(--text-primary)] leading-snug">Reception</span>
              <span className="text-[10px] font-medium text-[var(--text-secondary)] leading-tight">Aarogya EHR</span>
            </div>
          </div>
          {!sidebarOpen && (
            <div className="hidden w-full items-center justify-center md:flex">
              <ConciergeBell size={22} className="text-[var(--action-primary)]" />
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] md:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-2" aria-label="Reception navigation">
          {receptionNavigation.map((group, gIdx) => (
            <div key={group.group} className={gIdx > 0 ? "mt-1" : ""}>
              {sidebarOpen && (
                <p className="mb-0.5 mt-2 px-3 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60">
                  {group.group}
                </p>
              )}
              {!sidebarOpen && gIdx > 0 && (
                <hr className="mx-3 my-2 border-[var(--border-default)]" />
              )}
              {group.items.map((item) => {
                const active = pathname === item.href || (item.href !== "/reception" && pathname.startsWith(item.href + "/"));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => { if (window.innerWidth < 768) setSidebarOpen(false); }}
                    title={!sidebarOpen ? item.label : undefined}
                    className={[
                      "relative flex h-9 items-center gap-3 rounded-md mx-2 px-2.5 text-sm transition-colors",
                      active
                        ? "bg-[var(--action-subtle)] font-semibold text-[var(--action-primary)] before:absolute before:left-0 before:top-1/2 before:h-5 before:-translate-y-1/2 before:w-[3px] before:rounded-r-full before:bg-[var(--action-primary)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-primary)]",
                    ].join(" ")}
                  >
                    <Icon size={17} className="shrink-0" />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                    {sidebarOpen && item.badge && (
                      <span className="ml-auto rounded-full bg-[var(--action-primary)] px-1.5 py-0.5 text-[10px] font-medium text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Switch to clinical app link */}
        {sidebarOpen && (
          <div className="border-t border-[var(--border-default)] px-3 py-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span className="text-[10px] uppercase tracking-widest opacity-60">Switch to Clinical</span>
            </Link>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className="hidden h-12 w-full items-center justify-center border-t border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-primary)] md:flex"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </aside>
    </>
  );
}
