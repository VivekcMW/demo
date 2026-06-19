"use client";

import { useEffect, useRef, useState, RefObject } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            setIsRevealed(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isRevealed];
}

// Component wrapper for scroll reveal
export function ScrollReveal({
  children,
  className = "",
  variant = "default",
  delay = 0,
  threshold = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "left" | "right" | "scale";
  delay?: number;
  threshold?: number;
}) {
  const [ref, isRevealed] = useScrollReveal<HTMLDivElement>({ threshold });

  const variantClasses = {
    default: "reveal",
    left: "reveal-left",
    right: "reveal-right",
    scale: "reveal-scale",
  };

  const delayClasses: Record<number, string> = {
    1: "reveal-delay-1",
    2: "reveal-delay-2",
    3: "reveal-delay-3",
    4: "reveal-delay-4",
    5: "reveal-delay-5",
    6: "reveal-delay-6",
  };

  return (
    <div
      ref={ref}
      className={`${variantClasses[variant]} ${delay ? delayClasses[delay] || "" : ""} ${isRevealed ? "revealed" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
