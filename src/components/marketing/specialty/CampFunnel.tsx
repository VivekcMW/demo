"use client";

import { MapPin, Users, Scissors, Clock, CheckCircle2 } from "lucide-react";

interface CampLocation {
  id: number;
  name: string;
  date: string;
  screened: number;
  referred: number;
  operated: number;
  pending: number;
  status: "active" | "completed" | "upcoming";
}

interface CampFunnelProps {
  stats: {
    activeCamps: number;
    screenedThisMonth: number;
    referredForSurgery: number;
    surgeryCompleted: number;
    pendingFollowup: number;
    conversionRate: number;
    locations: CampLocation[];
  };
  title?: string;
}

export function CampFunnel({ stats, title = "Camp Screening → Surgery" }: CampFunnelProps) {
  const statusColors = {
    active: "bg-green-100 text-green-700 border-green-200",
    completed: "bg-blue-100 text-blue-700 border-blue-200",
    upcoming: "bg-amber-100 text-amber-700 border-amber-200",
  };

  return (
    <div className="p-5 rounded-xl bg-white border border-[var(--border-default)]">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
          {stats.activeCamps} active camps
        </span>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="text-center p-2 rounded-lg bg-[var(--bg-subtle)]">
          <p className="text-lg font-bold text-foreground">{stats.screenedThisMonth}</p>
          <p className="text-[10px] text-[var(--text-secondary)]">Screened</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-[var(--bg-subtle)]">
          <p className="text-lg font-bold text-foreground">{stats.referredForSurgery}</p>
          <p className="text-[10px] text-[var(--text-secondary)]">Referred</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-[var(--bg-subtle)]">
          <p className="text-lg font-bold text-green-600">{stats.surgeryCompleted}</p>
          <p className="text-[10px] text-[var(--text-secondary)]">Operated</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-[var(--bg-subtle)]">
          <p className="text-lg font-bold text-amber-600">{stats.pendingFollowup}</p>
          <p className="text-[10px] text-[var(--text-secondary)]">Pending</p>
        </div>
      </div>

      {/* Conversion funnel visual */}
      <div className="mb-4">
        <div className="flex items-center gap-1 text-xs mb-1">
          <span className="text-[var(--text-secondary)]">Overall conversion:</span>
          <span className="font-semibold text-green-600">{stats.conversionRate}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--action-primary)] to-green-500 rounded-full"
            style={{ width: `${stats.conversionRate}%` }}
          />
        </div>
      </div>

      {/* Camp locations */}
      <div className="space-y-2">
        {stats.locations.map((camp) => {
          const conversionRate = Math.round((camp.operated / camp.referred) * 100);
          return (
            <div
              key={camp.id}
              className="p-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)]/50"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[var(--action-primary)]" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{camp.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{camp.date}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[camp.status]}`}>
                  {camp.status}
                </span>
              </div>

              {/* Mini funnel */}
              <div className="flex items-center gap-1 text-xs">
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-blue-50 text-blue-700">
                  <Users className="w-3 h-3" />
                  {camp.screened}
                </div>
                <span className="text-[var(--text-secondary)]">→</span>
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-amber-50 text-amber-700">
                  <Clock className="w-3 h-3" />
                  {camp.referred}
                </div>
                <span className="text-[var(--text-secondary)]">→</span>
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-green-50 text-green-700">
                  <CheckCircle2 className="w-3 h-3" />
                  {camp.operated}
                </div>
                <span className="ml-auto text-[var(--text-secondary)]">
                  {conversionRate}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
