"use client";

import {
  ReceiptText, TrendingUp, TrendingDown, IndianRupee,
  Users, CreditCard, Banknote, FileText,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from "recharts";

// ── Seed financial data ───────────────────────────────────────────────────────
const monthlyRevenue = [
  { month: "Jan", opd: 620000, ipd: 1450000, lab: 310000, pharmacy: 520000 },
  { month: "Feb", opd: 580000, ipd: 1320000, lab: 290000, pharmacy: 490000 },
  { month: "Mar", opd: 710000, ipd: 1560000, lab: 340000, pharmacy: 610000 },
  { month: "Apr", opd: 690000, ipd: 1480000, lab: 320000, pharmacy: 580000 },
  { month: "May", opd: 740000, ipd: 1620000, lab: 360000, pharmacy: 640000 },
  { month: "Jun", opd: 390000, ipd: 890000,  lab: 190000, pharmacy: 340000 },
];

const collectionTrend = [
  { week: "W1", billed: 420000, collected: 380000 },
  { week: "W2", billed: 510000, collected: 460000 },
  { week: "W3", billed: 480000, collected: 420000 },
  { week: "W4", billed: 550000, collected: 510000 },
  { week: "W5", billed: 390000, collected: 340000 },
  { week: "W6", billed: 610000, collected: 560000 },
];

const pendingBills = [
  { patient: "Rajiv Menon",   uhid: "AHC-00142", amount: "₹12,400", days: 32, dept: "IPD", status: "Overdue" },
  { patient: "Sunita Devi",   uhid: "AHC-00189", amount: "₹8,750",  days: 18, dept: "Lab", status: "Due" },
  { patient: "Arjun Patel",   uhid: "AHC-00211", amount: "₹5,200",  days: 45, dept: "OPD", status: "Overdue" },
  { patient: "Meena Sharma",  uhid: "AHC-00098", amount: "₹21,600", days: 7,  dept: "IPD", status: "Due" },
  { patient: "Kiran Bhat",    uhid: "AHC-00303", amount: "₹3,900",  days: 60, dept: "OPD", status: "Overdue" },
  { patient: "Priya Nair",    uhid: "AHC-00274", amount: "₹9,100",  days: 12, dept: "Pharmacy", status: "Due" },
];

const recentInvoices = [
  { id: "INV-2026-0841", patient: "Kavya Reddy",  dept: "OPD",       amount: "₹1,200", date: "10 Jun", mode: "UPI",  status: "Paid" },
  { id: "INV-2026-0840", patient: "Mohan Lal",    dept: "Lab",       amount: "₹3,450", date: "10 Jun", mode: "Cash", status: "Paid" },
  { id: "INV-2026-0839", patient: "Fatima Sheikh", dept: "IPD",      amount: "₹18,200", date: "10 Jun", mode: "Card", status: "Paid" },
  { id: "INV-2026-0838", patient: "Ravi Teja",    dept: "Pharmacy",  amount: "₹680",   date: "10 Jun", mode: "UPI",  status: "Paid" },
  { id: "INV-2026-0837", patient: "Anita Joshi",  dept: "OPD",       amount: "₹1,500", date: "09 Jun", mode: "Cash", status: "Paid" },
];

const deptBreakdown = [
  { dept: "IPD",       today: "₹52,400", month: "₹8,92,000", pct: 47 },
  { dept: "OPD",       today: "₹18,300", month: "₹3,90,000", pct: 21 },
  { dept: "Lab",       today: "₹9,200",  month: "₹1,90,000", pct: 10 },
  { dept: "Pharmacy",  today: "₹4,420",  month: "₹3,40,000", pct: 18 },
  { dept: "Radiology", today: "₹0",      month: "₹76,000",   pct: 4  },
];

function fmt(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

function InvoiceStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Paid:    "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
    Pending: "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
    Overdue: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
    Due:     "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  };
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${map[status] ?? ""}`}>
      {status}
    </span>
  );
}

function PayModeBadge({ mode }: { mode: string }) {
  const map: Record<string, string> = {
    UPI:  "bg-[var(--action-subtle)] text-[var(--action-primary)]",
    Cash: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
    Card: "bg-[var(--info-bg)] text-[var(--info-fg)]",
  };
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${map[mode] ?? ""}`}>
      {mode}
    </span>
  );
}

export default function ReportsPage() {
  const totalMonth = monthlyRevenue.slice(0, 5).reduce(
    (s, m) => s + m.opd + m.ipd + m.lab + m.pharmacy, 0
  );
  const prevMonth = monthlyRevenue[4];
  const prevTotal = prevMonth.opd + prevMonth.ipd + prevMonth.lab + prevMonth.pharmacy;
  const currMonth = monthlyRevenue[5];
  const currTotal = currMonth.opd + currMonth.ipd + currMonth.lab + currMonth.pharmacy;
  const mtdGrowth = (((currTotal / prevTotal) - 1) * 100).toFixed(1);

  return (
    <div className="space-y-6 pb-8">

      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Financial Reports</h1>
          <p className="text-sm text-[var(--text-secondary)]">Revenue, billing & collections — June 2026</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]">
          <FileText size={14} />
          Export Report
        </button>
      </div>

      {/* ── KPI cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: "Billed today",
            value: "₹84,320",
            sub: "38 of 62 consultations billed",
            icon: ReceiptText,
            color: "var(--action-primary)",
            trend: null,
          },
          {
            label: "Collected today",
            value: "₹71,480",
            sub: "84.8% collection rate",
            icon: Banknote,
            color: "var(--normal-fg)",
            trend: null,
          },
          {
            label: "MTD Revenue",
            value: fmt(currTotal),
            sub: `${Number(mtdGrowth) >= 0 ? "↑" : "↓"} ${Math.abs(Number(mtdGrowth))}% vs last month (MTD)`,
            icon: Number(mtdGrowth) >= 0 ? TrendingUp : TrendingDown,
            color: Number(mtdGrowth) >= 0 ? "var(--normal-fg)" : "var(--critical-fg)",
            trend: Number(mtdGrowth),
          },
          {
            label: "Pending dues",
            value: "₹61,350",
            sub: `${pendingBills.filter(b => b.status === "Overdue").length} overdue · ${pendingBills.filter(b => b.status === "Due").length} due`,
            icon: CreditCard,
            color: "var(--warning-fg)",
            trend: null,
          },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">{c.label}</p>
              <c.icon size={16} style={{ color: c.color }} />
            </div>
            <p className="mt-3 text-2xl font-semibold tabular-nums text-[var(--text-primary)]">{c.value}</p>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Department breakdown ───────────────────────────────────── */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)]">
        <div className="border-b border-[var(--border-default)] px-5 py-3">
          <p className="text-sm font-semibold text-[var(--text-primary)]">Revenue by Department</p>
          <p className="text-xs text-[var(--text-secondary)]">Today vs month-to-date</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">
                {["Department", "Today", "MTD", "MTD Share", ""].map((h) => (
                  <th key={h} className="px-5 py-2.5 text-left text-xs font-medium text-[var(--text-secondary)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deptBreakdown.map((d) => (
                <tr key={d.dept} className="border-b border-[var(--border-default)] last:border-0 hover:bg-[var(--surface-sunken)]">
                  <td className="px-5 py-3 font-medium text-[var(--text-primary)]">{d.dept}</td>
                  <td className="px-5 py-3 tabular-nums text-[var(--text-primary)]">{d.today}</td>
                  <td className="px-5 py-3 tabular-nums text-[var(--text-primary)]">{d.month}</td>
                  <td className="px-5 py-3 text-xs text-[var(--text-secondary)]">{d.pct}%</td>
                  <td className="px-5 py-3 w-32">
                    <div className="h-1.5 w-full rounded-full bg-[var(--surface-sunken)]">
                      <div
                        className="h-1.5 rounded-full bg-[var(--action-primary)]"
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Charts row ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* Monthly revenue by stream */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
          <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Monthly Revenue by Stream</p>
          <p className="mb-4 text-xs text-[var(--text-secondary)]">Jan – Jun 2026 (₹)</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyRevenue} barSize={10} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmt} tick={{ fontSize: 10, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} width={48} />
              <Tooltip formatter={(v) => [fmt(v as number), ""]} contentStyle={{ background: "var(--surface-raised)", border: "1px solid var(--border-default)", borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="ipd"      name="IPD"      stackId="a" fill="#0d9488" radius={[0,0,0,0]} />
              <Bar dataKey="opd"      name="OPD"      stackId="a" fill="#2dd4bf" />
              <Bar dataKey="lab"      name="Lab"      stackId="a" fill="#94a3b8" />
              <Bar dataKey="pharmacy" name="Pharmacy" stackId="a" fill="#cbd5e1" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Billed vs collected */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
          <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Billed vs Collected</p>
          <p className="mb-4 text-xs text-[var(--text-secondary)]">Weekly trend — last 6 weeks</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={collectionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmt} tick={{ fontSize: 10, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} width={48} />
              <Tooltip formatter={(v) => [fmt(v as number), ""]} contentStyle={{ background: "var(--surface-raised)", border: "1px solid var(--border-default)", borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="billed"    name="Billed"    stroke="#0d9488" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="collected" name="Collected" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 2" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Pending dues + Recent invoices ────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        {/* Pending dues */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)]">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Pending Dues</p>
              <p className="text-xs text-[var(--text-secondary)]">
                {pendingBills.filter(b => b.status === "Overdue").length} overdue ·{" "}
                {pendingBills.filter(b => b.status === "Due").length} due soon
              </p>
            </div>
            <IndianRupee size={15} className="text-[var(--warning-fg)]" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">
                  {["Patient", "Dept", "Amount", "Days", "Status"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[var(--text-secondary)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pendingBills.map((b, i) => (
                  <tr key={i} className={[
                    "border-b border-[var(--border-default)] last:border-0 hover:bg-[var(--surface-sunken)]",
                    b.status === "Overdue" ? "bg-[var(--critical-bg)]" : "",
                  ].join(" ")}>
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-[var(--text-primary)]">{b.patient}</p>
                      <p className="font-mono text-[10px] text-[var(--text-secondary)]">{b.uhid}</p>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-[var(--text-secondary)]">{b.dept}</td>
                    <td className="px-4 py-2.5 font-medium tabular-nums text-[var(--text-primary)]">{b.amount}</td>
                    <td className="px-4 py-2.5 text-xs tabular-nums text-[var(--text-secondary)]">{b.days}d</td>
                    <td className="px-4 py-2.5"><InvoiceStatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent invoices */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)]">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Recent Invoices</p>
              <p className="text-xs text-[var(--text-secondary)]">Today · {recentInvoices.length} transactions</p>
            </div>
            <Users size={15} className="text-[var(--text-secondary)]" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">
                  {["Invoice", "Patient", "Dept", "Amount", "Mode"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[var(--text-secondary)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((inv, i) => (
                  <tr key={i} className="border-b border-[var(--border-default)] last:border-0 hover:bg-[var(--surface-sunken)]">
                    <td className="px-4 py-2.5 font-mono text-xs text-[var(--text-secondary)]">{inv.id}</td>
                    <td className="px-4 py-2.5 font-medium text-[var(--text-primary)]">{inv.patient}</td>
                    <td className="px-4 py-2.5 text-xs text-[var(--text-secondary)]">{inv.dept}</td>
                    <td className="px-4 py-2.5 font-medium tabular-nums text-[var(--text-primary)]">{inv.amount}</td>
                    <td className="px-4 py-2.5"><PayModeBadge mode={inv.mode} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
