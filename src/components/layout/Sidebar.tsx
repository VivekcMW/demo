"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, HeartPulse, ChevronLeft, ChevronRight } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { navigation } from "@/config/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <>
      {/* Mobile backdrop — only visible when sidebar is open on small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel
          Mobile  : fixed overlay, w-64, slide in/out via translate
          Desktop : fixed, always visible, width switches between w-60 (open) and w-16 (collapsed)
      */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-30 flex flex-col",
          "border-r border-[var(--border-default)] bg-[var(--surface-raised)]",
          "transition-[transform,width] duration-[280ms] ease-[cubic-bezier(0.2,0,0,1)]",
          /* Mobile width — drawer is always 64, position controlled by translate */
          "w-64",
          /* Desktop width override */
          sidebarOpen ? "md:w-60" : "md:w-16",
          /* Mobile: slide based on open state; Desktop: always visible */
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        {/* Logo row */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--border-default)] px-3">
          {/* Brand — hidden on desktop when collapsed */}
          <div className={["flex items-center gap-2.5 overflow-hidden", !sidebarOpen ? "md:hidden" : ""].join(" ")}>
            <HeartPulse size={22} className="shrink-0 text-[var(--action-primary)]" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-[var(--text-primary)] leading-snug">Aarogya EHR</span>
              <span className="text-[10px] font-medium text-[var(--text-secondary)] leading-tight">By TheCgroup Pvt. Ltd.</span>
            </div>
          </div>
          {/* Icon-only logo shown on desktop collapsed */}
          {!sidebarOpen && (
            <div className="hidden w-full items-center justify-center md:flex">
              <HeartPulse size={22} className="text-[var(--action-primary)]" />
            </div>
          )}
          {/* Close button — mobile only */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] md:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3" aria-label="Main navigation">
          {navigation.map((group) => (
            <div key={group.group} className="mb-1">
              {sidebarOpen && (
                <p className="mb-0.5 px-3 text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                  {group.group}
                </p>
              )}
              {group.items.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => { if (window.innerWidth < 768) setSidebarOpen(false); }}
                    title={!sidebarOpen ? item.label : undefined}
                    className={[
                      "relative flex h-10 items-center gap-3 rounded-md mx-2 px-2.5 text-sm transition-colors",
                      active
                        ? "bg-[var(--action-subtle)] font-medium text-[var(--action-primary)] before:absolute before:left-0 before:top-1/2 before:h-6 before:-translate-y-1/2 before:w-[3px] before:rounded-r-full before:bg-[var(--action-primary)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-primary)]",
                    ].join(" ")}
                  >
                    <Icon size={18} className="shrink-0" />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                    {sidebarOpen && item.badge && (
                      <span className="ml-auto rounded-full bg-[var(--action-primary)] px-1.5 py-0.5 text-[10px] font-medium text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              {!sidebarOpen && group !== navigation[navigation.length - 1] && (
                <hr className="my-2 mx-3 border-[var(--border-default)]" />
              )}
            </div>
          ))}
        </nav>

        {/* Collapse toggle — desktop only */}
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
