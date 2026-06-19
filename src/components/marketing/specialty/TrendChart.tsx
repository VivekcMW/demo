"use client";

interface TrendDataPoint {
  day: string;
  opd?: number;
  surgery?: number;
  date?: string;
  value?: number;
  secondary?: number;
}

interface TrendChartProps {
  data: TrendDataPoint[];
  title?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
}

export function TrendChart({ 
  data, 
  title = "Weekly Trend",
  primaryLabel = "OPD",
  secondaryLabel = "Surgery"
}: TrendChartProps) {
  // Support both old (opd/surgery) and new (value/secondary) formats
  const getPrimary = (d: TrendDataPoint) => d.opd ?? d.value ?? 0;
  const getSecondary = (d: TrendDataPoint) => d.surgery ?? d.secondary ?? 0;
  
  const maxPrimary = Math.max(...data.map(getPrimary));
  const maxSecondary = Math.max(...data.map(getSecondary));
  const maxValue = Math.max(maxPrimary, maxSecondary) || 1;

  return (
    <div className="p-5 rounded-xl bg-white border border-(--border-default)">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-(--action-primary)" />
            {primaryLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            {secondaryLabel}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-40 flex items-end gap-2">
        {data.map((point) => {
          const primaryValue = getPrimary(point);
          const secondaryValue = getSecondary(point);
          const primaryHeight = (primaryValue / maxValue) * 100;
          const secondaryHeight = (secondaryValue / maxValue) * 100;

          return (
            <div key={point.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center gap-1 h-32">
                {/* Primary bar */}
                <div
                  className="w-3 sm:w-4 bg-(--action-primary) rounded-t transition-all hover:opacity-80 group relative"
                  style={{ height: `${primaryHeight}%` }}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-white px-1 rounded whitespace-nowrap">
                    {primaryValue}
                  </span>
                </div>
                {/* Secondary bar */}
                <div
                  className="w-3 sm:w-4 bg-amber-500 rounded-t transition-all hover:opacity-80 group relative"
                  style={{ height: `${secondaryHeight}%` }}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-white px-1 rounded whitespace-nowrap">
                    {secondaryValue}
                  </span>
                </div>
              </div>
              <span className="text-xs text-(--text-secondary)">{point.day}</span>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="flex justify-between mt-4 pt-4 border-t border-(--border-default)">
        <div>
          <p className="text-xs text-(--text-secondary)">Avg. {primaryLabel}/day</p>
          <p className="text-lg font-bold text-foreground">
            {Math.round(data.reduce((a, b) => a + getPrimary(b), 0) / data.length)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-(--text-secondary)">Avg. {secondaryLabel}/day</p>
          <p className="text-lg font-bold text-foreground">
            {Math.round(data.reduce((a, b) => a + getSecondary(b), 0) / data.length)}
          </p>
        </div>
      </div>
    </div>
  );
}
