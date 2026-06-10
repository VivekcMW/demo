"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { ageDistribution } from "@/data/seedDashboard";

export function AgeDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={ageDistribution} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barSize={28}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
        <XAxis dataKey="band" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} tickLine={false} axisLine={false} />
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
          formatter={(v) => [`${v} patients`, "Count"]}
        />
        <Bar dataKey="count" name="Patients" fill="#0d9488" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
