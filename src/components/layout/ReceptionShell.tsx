"use client";

import { ReceptionSidebar } from "./ReceptionSidebar";
import { ReceptionNavbar } from "./ReceptionNavbar";
import { BottomNav } from "./BottomNav";
import { useUIStore } from "@/store/useUIStore";

export function ReceptionShell({ children }: { children: React.ReactNode }) {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);

  return (
    <div className="flex h-full min-h-screen bg-[var(--surface-page)]">
      <ReceptionSidebar />

      <div
        className={[
          "flex flex-1 flex-col min-w-0",
          "transition-[margin-left] duration-[280ms] ease-[cubic-bezier(0.2,0,0,1)]",
          sidebarOpen ? "md:ml-60" : "md:ml-16",
        ].join(" ")}
      >
        <ReceptionNavbar />
        <main className="flex-1 overflow-y-auto p-4 pb-20 sm:p-6 sm:pb-6 animate-fade-in">{children}</main>
        <footer className="shrink-0 border-t border-[var(--border-default)] bg-[var(--surface-raised)] px-6 py-3 text-center text-xs text-[var(--text-secondary)]">
          Aarogya EHR — Reception Module · TheCgroup Pvt. Ltd.
        </footer>
      </div>
      <BottomNav />
    </div>
  );
}
