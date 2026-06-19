"use client";

import { TrendingUp, TrendingDown, Minus, Award } from "lucide-react";

interface CounselorData {
  id: number;
  name: string;
  role: string;
  consultations: number;
  conversions: number;
  rate: number;
  trend: "up" | "down" | "stable";
}

interface CounselorLeaderboardProps {
  counselors: CounselorData[];
  title?: string;
}

export function CounselorLeaderboard({
  counselors,
  title = "Counselor Conversions",
}: CounselorLeaderboardProps) {
  const sorted = [...counselors].sort((a, b) => b.rate - a.rate);

  const getMedal = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return null;
  };

  const TrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-3 h-3 text-green-600" />;
    if (trend === "down") return <TrendingDown className="w-3 h-3 text-red-600" />;
    return <Minus className="w-3 h-3 text-gray-400" />;
  };

  return (
    <div className="p-5 rounded-xl bg-white border border-[var(--border-default)]">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-4 h-4 text-amber-500" />
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      </div>

      <div className="space-y-3">
        {sorted.map((counselor, idx) => {
          const medal = getMedal(idx);
          return (
            <div
              key={counselor.id}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                idx === 0
                  ? "bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200"
                  : "bg-[var(--bg-subtle)]"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-white border border-[var(--border-default)] flex items-center justify-center text-sm font-bold">
                {medal || idx + 1}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {counselor.name}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {counselor.role}
                </p>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-lg font-bold ${
                      idx === 0
                        ? "text-amber-600"
                        : counselor.rate >= 85
                        ? "text-green-600"
                        : "text-foreground"
                    }`}
                  >
                    {counselor.rate}%
                  </span>
                  {TrendIcon(counselor.trend)}
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  {counselor.conversions}/{counselor.consultations}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
