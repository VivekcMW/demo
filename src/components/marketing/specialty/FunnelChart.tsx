"use client";

interface FunnelStage {
  id: string;
  label: string;
  count: number;
  conversion?: number;
  color: string;
}

interface FunnelChartProps {
  title: string;
  stages: FunnelStage[];
  showConversion?: boolean;
}

export function FunnelChart({ title, stages, showConversion = true }: FunnelChartProps) {
  const maxCount = Math.max(...stages.map((s) => s.count));

  return (
    <div className="p-5 rounded-xl bg-white border border-[var(--border-default)]">
      <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
      <div className="space-y-3">
        {stages.map((stage, idx) => {
          const widthPercent = (stage.count / maxCount) * 100;
          return (
            <div key={stage.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[var(--text-secondary)]">{stage.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{stage.count}</span>
                  {showConversion && stage.conversion && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700">
                      {stage.conversion}%
                    </span>
                  )}
                </div>
              </div>
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: stage.color,
                  }}
                >
                  {widthPercent > 20 && (
                    <span className="text-xs font-medium text-white">
                      {stage.count}
                    </span>
                  )}
                </div>
              </div>
              {idx < stages.length - 1 && showConversion && stages[idx + 1].conversion && (
                <div className="flex justify-center my-1">
                  <span className="text-[10px] text-[var(--text-secondary)]">
                    ↓ {stages[idx + 1].conversion}% conversion
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
