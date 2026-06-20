import Link from "next/link";

export default function NabhLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5 pb-8">
      <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <Link href="/manage" className="hover:text-[var(--action-primary)]">Admin</Link>
        <span>/</span>
        <span className="text-[var(--text-primary)] font-medium">NABH Compliance</span>
      </nav>
      {children}
    </div>
  );
}
