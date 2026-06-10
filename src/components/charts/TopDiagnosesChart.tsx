"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { topDiagnoses } from "@/data/seedDashboard";

export function TopDiagnosesChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={topDiagnoses}
        layout="vertical"
        margin={{ top: 0, right: 16, left: 8, bottom: 0 }}
        barSize={14}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} tickLine={false} axisLine={false} />
        <YAxis
          dataKey="name"
          type="category"
          width={148}
          tick={{ fontSize: 11, fill: "var(--text-secondary)" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "var(--surface-raised)",
            border: "1px solid var(--border-default)",
            borderRadius: 8,
            fontSize: 12,
            color: "var(--text-primary)",
          }}
          cursor={{ fill: "var(--surface-sunken)" }}
          formatter={(value) => [`${value} cases`, "Count"]}
        />
        <Bar dataKey="count" name="Cases" radius={[0, 4, 4, 0]}>
          {topDiagnoses.map((_, i) => (
            <Cell
              key={i}
              fill={i === 0 ? "#0d9488" : i < 3 ? "#14b8a6" : "#94a3b8"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
