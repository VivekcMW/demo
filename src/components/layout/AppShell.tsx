"use client";

import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useUIStore } from "@/store/useUIStore";

export function AppShell({ children }: { children: React.ReactNode }) {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);

  return (
    <div className="flex h-full min-h-screen bg-[var(--surface-page)]">
      <Sidebar />

      {/*
       * Content wrapper — takes remaining width on mobile (no sidebar offset),
       * and shifts right on desktop based on sidebar state.
       */}
      <div
        className={[
          "flex flex-1 flex-col min-w-0",
          "transition-[margin-left] duration-[280ms] ease-[cubic-bezier(0.2,0,0,1)]",
          sidebarOpen ? "md:ml-60" : "md:ml-16",
        ].join(" ")}
      >
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
