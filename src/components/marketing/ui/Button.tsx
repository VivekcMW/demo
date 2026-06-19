import { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

interface ButtonAsButton extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  external?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--action-primary)] text-white hover:bg-[var(--action-primary-hover)] shadow-sm",
  secondary:
    "bg-white text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--surface-sunken)] shadow-sm",
  ghost:
    "text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]",
  inverse:
    "bg-white text-[var(--action-primary)] hover:bg-slate-100 shadow-sm",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  iconPosition = "right",
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-150 ease-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `;

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </>
  );

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseStyles}
          {...rest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseStyles} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseStyles} {...(props as ButtonAsButton)}>
      {content}
    </button>
  );
}
