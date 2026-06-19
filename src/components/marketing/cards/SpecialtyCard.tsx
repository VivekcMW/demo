import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

interface SpecialtyCardProps {
  name: string;
  tagline: string;
  href: string;
  icon: LucideIcon;
  features: string[];
}

export function SpecialtyCard({ name, tagline, href, icon: Icon, features }: SpecialtyCardProps) {
  return (
    <Link
      href={href}
      className="marketing-card group p-6 flex flex-col h-full"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[var(--action-subtle)] flex items-center justify-center mb-4 group-hover:bg-[var(--action-primary)] transition-colors">
        <Icon className="w-6 h-6 text-[var(--action-primary)] group-hover:text-white transition-colors" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
        {name}
      </h3>
      <p className="text-[var(--text-secondary)] text-sm mb-4">
        {tagline}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-6 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--action-primary)] mt-2 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Link */}
      <div className="flex items-center gap-1 text-sm font-medium text-[var(--action-primary)] group-hover:gap-2 transition-all">
        <span>View workflow</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
