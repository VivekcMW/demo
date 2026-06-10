"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { opdTrend } from "@/data/seedDashboard";

export function OpdTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={opdTrend.slice(-14)} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barSize={12}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: "var(--text-secondary)" }}
          tickLine={false}
          axisLine={false}
          interval={1}
        />
        <YAxis tick={{ fontSize: 11, fill: "var(--text-secondary)" }} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            background: "var(--surface-raised)",
            border: "1px solid var(--border-default)",
            borderRadius: 8,
            fontSize: 12,
            color: "var(--text-primary)",
          }}
          cursor={{ fill: "var(--surface-sunken)" }}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)" }} />
        <Bar dataKey="new" name="New" fill="#0d9488" stackId="a" radius={[0, 0, 0, 0]} />
        <Bar dataKey="followUp" name="Follow-up" fill="#94a3b8" stackId="a" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
