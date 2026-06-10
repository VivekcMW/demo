export function Footer() {
  return (
    <footer className="w-full shrink-0 border-t border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-3 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-1 sm:flex-row">
        <p className="text-xs text-[var(--text-secondary)]">
          © {new Date().getFullYear()} Aarogya EHR by TheCgroup Private Limited — All rights reserved
        </p>
        <p className="text-xs text-[var(--text-secondary)]">UI Prototype v1.0.0</p>
      </div>
    </footer>
  );
}
