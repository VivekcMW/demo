export function Footer() {
  return (
    <footer className="w-full shrink-0 border-t border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-3 sm:px-6">
      <div className="flex items-center justify-center">
        <p className="text-xs text-[var(--text-secondary)]">
          © {new Date().getFullYear()} Aarogya EHR by TheCgroup Private Limited — All rights reserved
        </p>
      </div>
    </footer>
  );
}
