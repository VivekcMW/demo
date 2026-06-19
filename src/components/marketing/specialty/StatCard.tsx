"use client";

import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  variant?: "default" | "highlight" | "warning" | "success";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  variant = "default",
}: StatCardProps) {
  const variantStyles = {
    default: "bg-white border-[var(--border-default)]",
    highlight: "bg-gradient-to-br from-[var(--action-primary)] to-[#2878BC] text-white border-transparent",
    warning: "bg-amber-50 border-amber-200",
    success: "bg-green-50 border-green-200",
  };

  const trendColors = {
    up: "text-green-600",
    down: "text-red-600",
    stable: "text-gray-500",
  };

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div className={`p-4 sm:p-5 rounded-xl border ${variantStyles[variant]} transition-all hover:shadow-md`}>
      <div className="flex items-start justify-between mb-2">
        <span className={`text-xs sm:text-sm font-medium ${variant === "highlight" ? "text-white/80" : "text-[var(--text-secondary)]"}`}>
          {title}
        </span>
        {icon && (
          <div className={`p-1.5 rounded-lg ${variant === "highlight" ? "bg-white/20" : "bg-[var(--bg-subtle)]"}`}>
            {icon}
          </div>
        )}
      </div>
      <div className={`text-2xl sm:text-3xl font-bold ${variant === "highlight" ? "text-white" : "text-foreground"}`}>
        {value}
      </div>
      {(subtitle || trend) && (
        <div className="flex items-center gap-2 mt-1">
          {trend && (
            <span className={`flex items-center gap-1 text-xs ${trendColors[trend]}`}>
              <TrendIcon className="w-3 h-3" />
              {trendValue}
            </span>
          )}
          {subtitle && (
            <span className={`text-xs ${variant === "highlight" ? "text-white/70" : "text-[var(--text-secondary)]"}`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
