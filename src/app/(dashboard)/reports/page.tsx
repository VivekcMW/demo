"use client";

import { useState, useMemo } from "react";
import {
  ReceiptText, TrendingUp, TrendingDown, IndianRupee,
  Users, CreditCard, Banknote, FileText,
  Activity, FlaskConical, Stethoscope, BedDouble,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell,
} from "recharts";
import { useExaminationStore } from "@/store/useExaminationStore";
import { usePatientStore } from "@/store/usePatientStore";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useIPDStore } from "@/store/useIPDStore";
import { useLabStore } from "@/store/useLabStore";
import { useRadiologyStore } from "@/store/useRadiologyStore";

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

const TABS = [
  { key: "financial",  label: "Financial",  icon: ReceiptText },
  { key: "clinical",   label: "Clinical",   icon: Stethoscope },
  { key: "lab",        label: "Lab & Imaging", icon: FlaskConical },
  { key: "operations", label: "Operations", icon: BedDouble },
] as const;

const CHART_COLORS = ["#0d9488", "#2dd4bf", "#94a3b8", "#cbd5e1", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

function StatusBadge({ status, map }: { status: string; map: Record<string, string> }) {
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${map[status] ?? ""}`}>
      {status}
    </span>
  );
}

export default function ReportsPage() {
  const [tab, setTab] = useState("financial");

  // Store hooks with safe fallbacks
  const examinations = useExaminationStore((s) => s.examinations ?? []);
  const patients = usePatientStore((s) => s.patients ?? []);
  const appointments = useAppointmentStore((s) => s.appointments ?? []);
  const orders = useOrderStore((s) => s.orders ?? []);
  const admissions = useIPDStore((s) => s.admissions ?? []);
  const bedMap = useIPDStore((s) => s.bedMap ?? []);
  const catalog = useLabStore((s) => s.catalog ?? []);
  const procedures = useRadiologyStore((s) => s.procedures ?? []);

  // ── Clinical analytics ──────────────────────────────────────────
  const clinicalData = useMemo(() => {
    const diagCount: Record<string, number> = {};
    let newCases = 0, followUps = 0, reviews = 0, tele = 0, emergencies = 0;
    const ageBuckets: Record<string, number> = {
      "0-12": 0, "13-18": 0, "19-35": 0, "36-50": 0, "51-65": 0, "66+": 0,
    };

    for (const exam of examinations ?? []) {
      for (const d of exam.assessment.diagnoses) {
        const label = d.label.length > 40 ? d.label.slice(0, 37) + "..." : d.label;
        diagCount[label] = (diagCount[label] ?? 0) + 1;
      }

      if (exam.type === "OPD" || exam.type === "IPD Admission" || exam.type === "Discharge Summary") newCases++;
      else if (exam.type === "Follow-up") followUps++;
      else if (exam.type === "IPD Review") reviews++;
      else if (exam.type === "Tele") tele++;
      else if (exam.type === "Emergency") emergencies++;

      const pt = patients.find((p) => p.id === exam.patientId);
      if (pt) {
        const age = pt.age;
        if (age <= 12) ageBuckets["0-12"]++;
        else if (age <= 18) ageBuckets["13-18"]++;
        else if (age <= 35) ageBuckets["19-35"]++;
        else if (age <= 50) ageBuckets["36-50"]++;
        else if (age <= 65) ageBuckets["51-65"]++;
        else ageBuckets["66+"]++;
      }
    }

    const topDiagnoses = Object.entries(diagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([label, count]) => ({ label, count }));

    const caseTypeData = [
      { name: "New OPD / IPD", value: newCases },
      { name: "Follow-up",     value: followUps },
      { name: "IPD Review",    value: reviews },
      { name: "Telemedicine",  value: tele },
      { name: "Emergency",     value: emergencies },
    ].filter((d) => d.value > 0);

    const ageDistData = Object.entries(ageBuckets)
      .map(([range, count]) => ({ range, count }));

    return { topDiagnoses, caseTypeData, ageDistData };
  }, [examinations, patients]);

  // ── Lab & Imaging analytics ──────────────────────────────────────
  const labImagingData = useMemo(() => {
    const labOrders = (orders ?? []).filter((o) => o.type === "Lab");
    const imagingOrders = (orders ?? []).filter((o) => o.type === "Imaging");
    const criticalResults = (orders ?? []).filter((o) => o.result?.critical);

    const catCount: Record<string, number> = {};
    for (const o of labOrders) {
      const cat = (catalog ?? []).find((t) => o.title.toLowerCase().includes(t.name.toLowerCase()))?.category ?? "Other";
      catCount[cat] = (catCount[cat] ?? 0) + 1;
    }

    const modalityCount: Record<string, number> = {};
    for (const o of imagingOrders) {
      const proc = (procedures ?? []).find((p) => o.title.toLowerCase().includes(p.name.toLowerCase()));
      const mod = proc ? (proc.modality === "X-Ray" ? "X-Ray" : proc.modality === "Ultrasound" ? "US" : proc.modality === "CT" ? "CT" : proc.modality === "MRI" ? "MRI" : "Other") : "Other";
      modalityCount[mod] = (modalityCount[mod] ?? 0) + 1;
    }

    const labCategoryData = Object.entries(catCount).map(([name, count]) => ({ name, count }));
    const modalityData = Object.entries(modalityCount).map(([name, count]) => ({ name, count }));

    const labStatusData = [
      { name: "Ordered",       value: labOrders.filter((o) => o.status === "Ordered").length },
      { name: "Acknowledged",  value: labOrders.filter((o) => o.status === "Acknowledged").length },
      { name: "In Progress",   value: labOrders.filter((o) => o.status === "In-Progress").length },
      { name: "Completed",     value: labOrders.filter((o) => o.status === "Completed").length },
    ];

    return { labOrders: labOrders.length, imagingOrders: imagingOrders.length, criticalResults: criticalResults.length, labCategoryData, modalityData, labStatusData };
  }, [orders, catalog, procedures]);

  // ── Operations analytics ─────────────────────────────────────────
  const opsData = useMemo(() => {
    const apptStatusCount: Record<string, number> = {};
    for (const a of appointments ?? []) {
      apptStatusCount[a.status] = (apptStatusCount[a.status] ?? 0) + 1;
    }

    const wardOccupancy: { ward: string; total: number; occupied: number; pct: number }[] = [];
    const wardNames = [...new Set((bedMap ?? []).map((b) => b.ward))];
    for (const w of wardNames) {
      const beds = (bedMap ?? []).filter((b) => b.ward === w);
      const occupied = beds.filter((b) => b.status === "Occupied" || b.status === "Reserved").length;
      wardOccupancy.push({ ward: w, total: beds.length, occupied, pct: Math.round((occupied / beds.length) * 100) });
    }

    const admissionStatusData = [
      { name: "Active",     value: (admissions ?? []).filter((a) => a.status === "Active").length },
      { name: "Planned",    value: (admissions ?? []).filter((a) => a.status === "Planned").length },
      { name: "Discharged", value: (admissions ?? []).filter((a) => a.status === "Discharged").length },
    ];

    return { apptStatusCount, wardOccupancy, admissionStatusData };
  }, [appointments, bedMap, admissions]);

  // ── Financial (unchanged) ────────────────────────────────────────
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
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Reports & Analytics</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            {tab === "financial" && "Revenue, billing & collections — June 2026"}
            {tab === "clinical" && "Diagnoses, case mix & patient demographics"}
            {tab === "lab" && "Laboratory & imaging utilisation"}
            {tab === "operations" && "Bed occupancy, OPD volumes & appointment status"}
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]">
          <FileText size={14} />
          Export Report
        </button>
      </div>

      {/* ── Tab bar ──────────────────────────────────────────────── */}
      <div className="flex gap-1 border-b border-[var(--border-default)]">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
              tab === t.key
                ? "border-[var(--action-primary)] text-[var(--action-primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* ── FINANCIAL TAB ──────────────────────────────────────── */}
      {/* ════════════════════════════════════════════════════════════ */}
      {tab === "financial" && (
        <>
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
        </>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* ── CLINICAL TAB ───────────────────────────────────────── */}
      {/* ════════════════════════════════════════════════════════════ */}
      {tab === "clinical" && (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: "Total Examinations", value: examinations.length, sub: `Across ${patients.length} patients`, icon: Stethoscope, color: "var(--action-primary)" },
              { label: "New Cases", value: clinicalData.caseTypeData.find((d) => d.name === "New OPD / IPD")?.value ?? 0, sub: "OPD / IPD / Discharge", icon: Activity, color: "var(--normal-fg)" },
              { label: "Follow-ups", value: clinicalData.caseTypeData.find((d) => d.name === "Follow-up")?.value ?? 0, sub: "Routine & post-op", icon: TrendingUp, color: "var(--info-fg)" },
              { label: "Emergency", value: clinicalData.caseTypeData.find((d) => d.name === "Emergency")?.value ?? 0, sub: "Acute care cases", icon: TrendingDown, color: "var(--critical-fg)" },
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

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Top 10 Diagnoses */}
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
              <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Top Diagnoses</p>
              <p className="mb-4 text-xs text-[var(--text-secondary)]">Across all examinations</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={clinicalData.topDiagnoses} layout="vertical" barSize={12}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="label" tick={{ fontSize: 10, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} width={140} />
                  <Tooltip contentStyle={{ background: "var(--surface-raised)", border: "1px solid var(--border-default)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="count" fill="#0d9488" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Case Type Mix */}
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
              <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Case Type Mix</p>
              <p className="mb-4 text-xs text-[var(--text-secondary)]">Exam type distribution</p>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={clinicalData.caseTypeData} cx="50%" cy="50%" outerRadius={90} innerRadius={50} dataKey="value" label={((d: { name?: string; percent?: number }) => `${d.name ?? ""} ${((d.percent ?? 0) * 100).toFixed(0)}%`) as never}>
                    {clinicalData.caseTypeData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--surface-raised)", border: "1px solid var(--border-default)", borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Age Distribution */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
            <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Age Distribution</p>
            <p className="mb-4 text-xs text-[var(--text-secondary)]">Patients seen, by age group</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={clinicalData.ageDistData} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                <XAxis dataKey="range" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} width={32} />
                <Tooltip contentStyle={{ background: "var(--surface-raised)", border: "1px solid var(--border-default)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="count" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* ── LAB & IMAGING TAB ──────────────────────────────────── */}
      {/* ════════════════════════════════════════════════════════════ */}
      {tab === "lab" && (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: "Lab Orders", value: labImagingData.labOrders, sub: "Total diagnostic tests ordered", icon: FlaskConical, color: "var(--action-primary)" },
              { label: "Imaging Orders", value: labImagingData.imagingOrders, sub: "Radiology & ultrasound", icon: Activity, color: "var(--normal-fg)" },
              { label: "Critical Results", value: labImagingData.criticalResults, sub: "Requiring immediate attention", icon: TrendingDown, color: "var(--critical-fg)" },
              { label: "Completed", value: labImagingData.labStatusData.find((d) => d.name === "Completed")?.value ?? 0, sub: "Lab orders completed", icon: TrendingUp, color: "var(--normal-fg)" },
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

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Lab by Category */}
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
              <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Lab Orders by Category</p>
              <p className="mb-4 text-xs text-[var(--text-secondary)]">Test type distribution</p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={labImagingData.labCategoryData} layout="vertical" barSize={12}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} width={100} />
                  <Tooltip contentStyle={{ background: "var(--surface-raised)", border: "1px solid var(--border-default)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="count" fill="#0d9488" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Lab Status */}
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
              <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Lab Order Status</p>
              <p className="mb-4 text-xs text-[var(--text-secondary)]">Current workflow state</p>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={labImagingData.labStatusData} cx="50%" cy="50%" outerRadius={80} innerRadius={45} dataKey="value" label={((d: { name?: string; percent?: number }) => `${d.name ?? ""} ${((d.percent ?? 0) * 100).toFixed(0)}%`) as never}>
                    {labImagingData.labStatusData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--surface-raised)", border: "1px solid var(--border-default)", borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Imaging modality breakdown */}
          {labImagingData.modalityData.length > 0 && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
              <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Imaging by Modality</p>
              <p className="mb-4 text-xs text-[var(--text-secondary)]">Radiology & ultrasound procedures</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={labImagingData.modalityData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} width={32} />
                  <Tooltip contentStyle={{ background: "var(--surface-raised)", border: "1px solid var(--border-default)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* ── OPERATIONS TAB ─────────────────────────────────────── */}
      {/* ════════════════════════════════════════════════════════════ */}
      {tab === "operations" && (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: "Total Appointments", value: appointments.length, sub: "All scheduled visits", icon: Users, color: "var(--action-primary)" },
              { label: "Active IPD", value: opsData.admissionStatusData.find((d) => d.name === "Active")?.value ?? 0, sub: "Currently admitted", icon: BedDouble, color: "var(--info-fg)" },
              { label: "Total Discharges", value: opsData.admissionStatusData.find((d) => d.name === "Discharged")?.value ?? 0, sub: "Discharged patients", icon: TrendingUp, color: "var(--normal-fg)" },
              { label: "Planned IPD", value: opsData.admissionStatusData.find((d) => d.name === "Planned")?.value ?? 0, sub: "Scheduled admissions", icon: Activity, color: "var(--warning-fg)" },
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

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Ward Occupancy */}
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
              <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Bed Occupancy by Ward</p>
              <p className="mb-4 text-xs text-[var(--text-secondary)]">Occupied / total beds</p>
              <div className="space-y-3">
                {opsData.wardOccupancy.map((w) => (
                  <div key={w.ward}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--text-primary)] font-medium">{w.ward}</span>
                      <span className="text-[var(--text-secondary)] tabular-nums">{w.occupied}/{w.total} ({w.pct}%)</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-[var(--surface-sunken)]">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          w.pct >= 80 ? "bg-[var(--critical-fg)]" : w.pct >= 50 ? "bg-[var(--warning-fg)]" : "bg-[var(--normal-fg)]"
                        }`}
                        style={{ width: `${w.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Appointment Status */}
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
              <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Appointment Status</p>
              <p className="mb-4 text-xs text-[var(--text-secondary)]">All appointments breakdown</p>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={Object.entries(opsData.apptStatusCount)
                      .filter(([_, v]) => v > 0)
                      .map(([name, value]) => ({ name, value }))}
                    cx="50%" cy="50%" outerRadius={80} innerRadius={45}
                    dataKey="value"
                    label={false}
                    legendType="circle"
                  >
                    {Object.entries(opsData.apptStatusCount).filter(([_, v]) => v > 0).map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--surface-raised)", border: "1px solid var(--border-default)", borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Admission Status Table */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)]">
            <div className="border-b border-[var(--border-default)] px-5 py-3">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Recent Admissions</p>
              <p className="text-xs text-[var(--text-secondary)]">Last 5 IPD admissions</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">
                    {["Patient", "Ward / Bed", "Diagnosis", "Doctor", "Status"].map((h) => (
                      <th key={h} className="px-5 py-2.5 text-left text-xs font-medium text-[var(--text-secondary)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {admissions.slice(0, 5).map((a) => (
                    <tr key={a.id} className="border-b border-[var(--border-default)] last:border-0 hover:bg-[var(--surface-sunken)]">
                      <td className="px-5 py-3 font-medium text-[var(--text-primary)]">{a.patientName}</td>
                      <td className="px-5 py-3 text-xs text-[var(--text-secondary)]">{a.ward} ({a.bed})</td>
                      <td className="px-5 py-3 text-xs text-[var(--text-secondary)] max-w-[200px] truncate">{a.admitDiagnosis}</td>
                      <td className="px-5 py-3 text-xs text-[var(--text-secondary)]">{a.attendingDoctor}</td>
                      <td className="px-5 py-3">
                        <StatusBadge
                          status={a.status}
                          map={{
                            Active: "bg-[var(--info-bg)] text-[var(--info-fg)]",
                            Planned: "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
                            Discharged: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
