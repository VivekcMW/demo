import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Use narrower max-width for text-heavy sections */
  narrow?: boolean;
}

export function Container({ children, className = "", narrow = false }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${
        narrow ? "max-w-3xl" : "max-w-7xl"
      } ${className}`}
    >
      {children}
    </div>
  );
}
