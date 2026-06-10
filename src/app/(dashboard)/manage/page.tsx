"use client";

import { useState, useMemo } from "react";
import { useManageStore, type Department, type StaffShift, type SystemAnnouncement } from "@/store/useManageStore";
import { DEPARTMENTS } from "@/data/seedUsers";
import {
  Building2, Clock, Megaphone, Plus, X, Pencil, Trash2,
  BedDouble, Users, CheckCircle2, AlertTriangle, ChevronDown,
} from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";

// ── helpers ───────────────────────────────────────────────────────────────────

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true });
}

const PRIORITY_CLS = {
  High:   "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  Medium: "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Low:    "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
};

const SHIFT_CLS: Record<string, string> = {
  Morning:   "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Afternoon: "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Night:     "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  Emergency: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
};

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SHIFT_TYPES = ["Morning", "Afternoon", "Night", "Emergency"];
const ROLES = ["Doctor", "Nurse", "Pharmacist", "Lab Technician", "Receptionist", "Admin"];

// ── Dept Form Drawer ──────────────────────────────────────────────────────────

function DeptFormDrawer({ open, onClose, editing }: { open: boolean; onClose: () => void; editing?: Department | null }) {
  const store = useManageStore();
  const isEdit = !!editing;
  const [name, setName] = useState(editing?.name ?? "");
  const [head, setHead] = useState(editing?.head ?? "");
  const [floor, setFloor] = useState(editing?.floor ?? "");
  const [phone, setPhone] = useState(editing?.phone ?? "");
  const [bedCount, setBedCount] = useState(String(editing?.bedCount ?? 0));
  const [staffCount, setStaffCount] = useState(String(editing?.staffCount ?? 0));
  const [error, setError] = useState("");

  function reset() { setName(editing?.name ?? ""); setHead(editing?.head ?? ""); setFloor(editing?.floor ?? ""); setPhone(editing?.phone ?? ""); setBedCount(String(editing?.bedCount ?? 0)); setStaffCount(String(editing?.staffCount ?? 0)); setError(""); }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("Department name is required."); return; }
    const payload = { name, head, floor, phone: phone || undefined, bedCount: parseInt(bedCount) || 0, staffCount: parseInt(staffCount) || 0, status: editing?.status ?? "Active" as const, headId: editing?.headId ?? "" };
    if (isEdit && editing) store.updateDepartment(editing.id, payload);
    else store.addDepartment(payload);
    onClose(); reset();
  }
  if (!open) return null;
  return (
    <Drawer open={open} onClose={() => { onClose(); reset(); }} maxWidth="max-w-sm" aria-label={isEdit ? "Edit Department" : "Add Department"}>
      <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
          <span className="font-semibold text-[var(--text-primary)]">{isEdit ? "Edit Department" : "Add Department"}</span>
          <button onClick={() => { onClose(); reset(); }} className="rounded-lg p-1.5 hover:bg-[var(--surface-sunken)]"><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {error && <div className="rounded-lg bg-[var(--critical-bg)] px-3 py-2 text-sm text-[var(--critical-fg)]">{error}</div>}
          {[
            { label: "Department Name *", val: name, set: setName, placeholder: "e.g. Oncology" },
            { label: "Department Head", val: head, set: setHead, placeholder: "e.g. Dr. Suresh Nair" },
            { label: "Floor / Location", val: floor, set: setFloor, placeholder: "e.g. 4th Floor" },
            { label: "Phone Extension", val: phone, set: setPhone, placeholder: "e.g. 080-4455-3010" },
          ].map(({ label, val, set, placeholder }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-[var(--text-secondary)]">{label}</label>
              <input value={val} onChange={(e) => set(e.target.value)} placeholder={placeholder} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--text-secondary)]">Bed Count</label>
              <input type="number" min={0} value={bedCount} onChange={(e) => setBedCount(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--text-secondary)]">Staff Count</label>
              <input type="number" min={0} value={staffCount} onChange={(e) => setStaffCount(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" />
            </div>
          </div>
        </form>
        <div className="border-t border-[var(--border-default)] p-4 flex justify-end gap-3">
          <button type="button" onClick={() => { onClose(); reset(); }} className="rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">Cancel</button>
          <button onClick={handleSubmit as unknown as React.MouseEventHandler} className="rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">{isEdit ? "Save Changes" : "Add Department"}</button>
        </div>
    </Drawer>
  );
}

// ── Shift Form Drawer ─────────────────────────────────────────────────────────

function ShiftFormDrawer({ open, onClose, editing }: { open: boolean; onClose: () => void; editing?: StaffShift | null }) {
  const store = useManageStore();
  const isEdit = !!editing;
  const [staffName, setStaffName] = useState(editing?.staffName ?? "");
  const [role, setRole] = useState(editing?.role ?? "Nurse");
  const [dept, setDept] = useState(editing?.department ?? "");
  const [shiftType, setShiftType] = useState<StaffShift["shiftType"]>(editing?.shiftType ?? "Morning");
  const [startTime, setStartTime] = useState(editing?.startTime ?? "08:00");
  const [endTime, setEndTime] = useState(editing?.endTime ?? "16:00");
  const [days, setDays] = useState<string[]>(editing?.days ?? ["Mon", "Tue", "Wed", "Thu", "Fri"]);
  const [error, setError] = useState("");

  function reset() { setStaffName(editing?.staffName ?? ""); setRole(editing?.role ?? "Nurse"); setDept(editing?.department ?? ""); setShiftType(editing?.shiftType ?? "Morning"); setStartTime(editing?.startTime ?? "08:00"); setEndTime(editing?.endTime ?? "16:00"); setDays(editing?.days ?? ["Mon","Tue","Wed","Thu","Fri"]); setError(""); }
  function toggleDay(d: string) { setDays((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]); }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!staffName.trim()) { setError("Staff name is required."); return; }
    if (!days.length) { setError("Select at least one working day."); return; }
    const payload = { staffName, staffId: editing?.staffId ?? "", role, department: dept, shiftType: shiftType as StaffShift["shiftType"], startTime, endTime, days, isActive: editing?.isActive ?? true };
    if (isEdit && editing) store.updateShift(editing.id, payload);
    else store.addShift(payload);
    onClose(); reset();
  }
  if (!open) return null;
  return (
    <Drawer open={open} onClose={() => { onClose(); reset(); }} maxWidth="max-w-sm" aria-label={isEdit ? "Edit Shift" : "Add Shift"}>
      <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
          <span className="font-semibold text-[var(--text-primary)]">{isEdit ? "Edit Shift" : "Add Shift"}</span>
          <button onClick={() => { onClose(); reset(); }} className="rounded-lg p-1.5 hover:bg-[var(--surface-sunken)]"><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {error && <div className="rounded-lg bg-[var(--critical-bg)] px-3 py-2 text-sm text-[var(--critical-fg)]">{error}</div>}
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Staff Name *</label>
            <input value={staffName} onChange={(e) => setStaffName(e.target.value)} placeholder="e.g. Meena Pillai" className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--text-secondary)]">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)]">
                {ROLES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--text-secondary)]">Department</label>
              <select value={dept} onChange={(e) => setDept(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)]">
                <option value="">Select dept.</option>
                {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Shift Type</label>
            <div className="flex gap-2 flex-wrap">
              {SHIFT_TYPES.map((s) => (
                <button key={s} type="button" onClick={() => setShiftType(s as StaffShift["shiftType"])} className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${shiftType === s ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--text-secondary)]">Start Time</label>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--text-secondary)]">End Time</label>
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Working Days</label>
            <div className="flex gap-2 flex-wrap">
              {WEEK_DAYS.map((d) => (
                <button key={d} type="button" onClick={() => toggleDay(d)} className={`w-10 rounded-lg border py-1.5 text-xs font-medium ${days.includes(d) ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>{d}</button>
              ))}
            </div>
          </div>
        </form>
        <div className="border-t border-[var(--border-default)] p-4 flex justify-end gap-3">
          <button type="button" onClick={() => { onClose(); reset(); }} className="rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">Cancel</button>
          <button onClick={handleSubmit as unknown as React.MouseEventHandler} className="rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">{isEdit ? "Save Changes" : "Add Shift"}</button>
        </div>
    </Drawer>
  );
}

// ── Announcement Form ─────────────────────────────────────────────────────────

function AnnDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const store = useManageStore();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState<SystemAnnouncement["priority"]>("Medium");
  function reset() { setTitle(""); setBody(""); setPriority("Medium"); }
  function handleSubmit() {
    if (!title.trim() || !body.trim()) return;
    store.addAnnouncement({ title, body, priority, postedBy: "Admin" });
    onClose(); reset();
  }
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[var(--text-primary)]">Post Announcement</span>
          <button onClick={() => { onClose(); reset(); }} className="rounded-lg p-1.5 hover:bg-[var(--surface-sunken)]"><X size={16} /></button>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--text-secondary)]">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" placeholder="Announcement title…" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--text-secondary)]">Message</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none resize-none" placeholder="Announcement body…" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--text-secondary)]">Priority</label>
          <div className="flex gap-2">
            {(["High", "Medium", "Low"] as const).map((p) => (
              <button key={p} type="button" onClick={() => setPriority(p)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${priority === p ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>{p}</button>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-1">
          <button onClick={() => { onClose(); reset(); }} className="rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">Cancel</button>
          <button onClick={handleSubmit} className="rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">Post</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

type Tab = "departments" | "shifts" | "announcements";

export default function ManagePage() {
  const { departments, shifts, announcements, toggleDeptStatus, deleteDepartment, deleteShift, deleteAnnouncement } = useManageStore();
  const [tab, setTab] = useState<Tab>("departments");
  const [deptDrawerOpen, setDeptDrawerOpen] = useState(false);
  const [deptEditing, setDeptEditing] = useState<Department | null>(null);
  const [shiftDrawerOpen, setShiftDrawerOpen] = useState(false);
  const [shiftEditing, setShiftEditing] = useState<StaffShift | null>(null);
  const [annDialogOpen, setAnnDialogOpen] = useState(false);
  const [deptSearch, setDeptSearch] = useState("");
  const [shiftSearch, setShiftSearch] = useState("");

  const filteredDepts = useMemo(() => {
    const q = deptSearch.toLowerCase();
    return departments.filter((d) => !q || d.name.toLowerCase().includes(q) || d.head.toLowerCase().includes(q));
  }, [departments, deptSearch]);

  const filteredShifts = useMemo(() => {
    const q = shiftSearch.toLowerCase();
    return shifts.filter((s) => !q || s.staffName.toLowerCase().includes(q) || s.department.toLowerCase().includes(q));
  }, [shifts, shiftSearch]);

  const activeDepts = departments.filter((d) => d.status === "Active").length;
  const totalBeds = departments.reduce((a, d) => a + d.bedCount, 0);
  const totalStaff = departments.reduce((a, d) => a + d.staffCount, 0);
  const activeShifts = shifts.filter((s) => s.isActive).length;

  const TABS: { key: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { key: "departments", label: "Departments", icon: <Building2 size={15} />, count: departments.length },
    { key: "shifts",      label: "Shifts",      icon: <Clock size={15} />,     count: shifts.length },
    { key: "announcements", label: "Announcements", icon: <Megaphone size={15} />, count: announcements.length },
  ];

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Manage</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Departments, staff shifts, and system announcements</p>
        </div>
        {tab === "departments" && (
          <button onClick={() => { setDeptEditing(null); setDeptDrawerOpen(true); }} className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">
            <Plus size={16} /> Add Department
          </button>
        )}
        {tab === "shifts" && (
          <button onClick={() => { setShiftEditing(null); setShiftDrawerOpen(true); }} className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">
            <Plus size={16} /> Add Shift
          </button>
        )}
        {tab === "announcements" && (
          <button onClick={() => setAnnDialogOpen(true)} className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">
            <Plus size={16} /> Post Announcement
          </button>
        )}
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Departments", value: activeDepts, icon: <Building2 size={20} />, color: "text-[var(--action-primary)]", bg: "bg-[var(--action-subtle)]" },
          { label: "Total Beds",         value: totalBeds,   icon: <BedDouble size={20} />, color: "text-[var(--info-fg)]",       bg: "bg-[var(--info-bg)]" },
          { label: "Total Staff",        value: totalStaff,  icon: <Users size={20} />,     color: "text-[var(--normal-fg)]",     bg: "bg-[var(--normal-bg)]" },
          { label: "Active Shifts",      value: activeShifts,icon: <Clock size={20} />,     color: "text-[var(--warning-fg)]",   bg: "bg-[var(--warning-bg)]" },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-center gap-3">
              <div className={`rounded-lg p-2 ${c.bg} ${c.color}`}>{c.icon}</div>
              <div>
                <p className="text-2xl font-bold text-[var(--text-primary)]">{c.value}</p>
                <p className="text-xs text-[var(--text-secondary)]">{c.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="flex gap-0.5 overflow-x-auto border-b border-[var(--border-default)] px-4 pt-3">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1.5 rounded-t-lg px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${tab === t.key ? "border-[var(--action-primary)] text-[var(--action-primary)]" : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
              {t.icon} {t.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${tab === t.key ? "bg-[var(--action-subtle)] text-[var(--action-primary)]" : "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* ── Departments Tab ── */}
        {tab === "departments" && (
          <div>
            <div className="flex items-center gap-3 p-4 border-b border-[var(--border-default)]">
              <div className="relative flex-1 max-w-xs">
                <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                <input value={deptSearch} onChange={(e) => setDeptSearch(e.target.value)} placeholder="Search departments…" className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] pl-9 pr-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--action-primary)] outline-none" />
              </div>
              {deptSearch && <button onClick={() => setDeptSearch("")} className="text-xs text-[var(--text-secondary)] hover:text-[var(--critical-fg)] flex items-center gap-1"><X size={12} /> Clear</button>}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--surface-sunken)] text-xs text-[var(--text-secondary)] uppercase tracking-wide">
                    <th className="px-4 py-3 text-left font-medium">Department</th>
                    <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Floor</th>
                    <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Head</th>
                    <th className="px-4 py-3 text-center font-medium">Beds</th>
                    <th className="px-4 py-3 text-center font-medium">Staff</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-default)]">
                  {filteredDepts.map((d) => (
                    <tr key={d.id} className="hover:bg-[var(--surface-sunken)] transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-[var(--text-primary)]">{d.name}</p>
                        <p className="text-xs text-[var(--text-secondary)] hidden md:block">{d.phone || "—"}</p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell text-[var(--text-secondary)] text-xs">{d.floor}</td>
                      <td className="px-4 py-3 hidden md:table-cell text-[var(--text-secondary)] text-xs">{d.head || "—"}</td>
                      <td className="px-4 py-3 text-center text-[var(--text-primary)] font-medium">{d.bedCount}</td>
                      <td className="px-4 py-3 text-center text-[var(--text-primary)] font-medium">{d.staffCount}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${d.status === "Active" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>{d.status}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button onClick={() => { setDeptEditing(d); setDeptDrawerOpen(true); }} className="rounded-lg p-1.5 hover:bg-[var(--surface-sunken)] text-[var(--text-secondary)]"><Pencil size={14} /></button>
                          <button onClick={() => toggleDeptStatus(d.id)} className="rounded-lg p-1.5 hover:bg-[var(--surface-sunken)] text-[var(--text-secondary)]" title={d.status === "Active" ? "Deactivate" : "Activate"}>{d.status === "Active" ? <CheckCircle2 size={14} className="text-[var(--normal-fg)]" /> : <AlertTriangle size={14} className="text-[var(--warning-fg)]" />}</button>
                          <button onClick={() => deleteDepartment(d.id)} className="rounded-lg p-1.5 hover:bg-[var(--critical-bg)] text-[var(--text-secondary)] hover:text-[var(--critical-fg)]"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredDepts.length === 0 && (
                <div className="py-16 text-center text-sm text-[var(--text-secondary)]">No departments found.</div>
              )}
            </div>
          </div>
        )}

        {/* ── Shifts Tab ── */}
        {tab === "shifts" && (
          <div>
            <div className="flex items-center gap-3 p-4 border-b border-[var(--border-default)]">
              <div className="relative flex-1 max-w-xs">
                <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                <input value={shiftSearch} onChange={(e) => setShiftSearch(e.target.value)} placeholder="Search staff or department…" className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] pl-9 pr-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--action-primary)] outline-none" />
              </div>
              {shiftSearch && <button onClick={() => setShiftSearch("")} className="text-xs text-[var(--text-secondary)] hover:text-[var(--critical-fg)] flex items-center gap-1"><X size={12} /> Clear</button>}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--surface-sunken)] text-xs text-[var(--text-secondary)] uppercase tracking-wide">
                    <th className="px-4 py-3 text-left font-medium">Staff</th>
                    <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Role</th>
                    <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Department</th>
                    <th className="px-4 py-3 text-left font-medium">Shift</th>
                    <th className="px-4 py-3 text-left font-medium hidden lg:table-cell">Hours</th>
                    <th className="px-4 py-3 text-left font-medium hidden lg:table-cell">Days</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-default)]">
                  {filteredShifts.map((s) => (
                    <tr key={s.id} className="hover:bg-[var(--surface-sunken)] transition-colors">
                      <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{s.staffName}</td>
                      <td className="px-4 py-3 hidden sm:table-cell text-xs text-[var(--text-secondary)]">{s.role}</td>
                      <td className="px-4 py-3 hidden md:table-cell text-xs text-[var(--text-secondary)]">{s.department || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${SHIFT_CLS[s.shiftType]}`}>{s.shiftType}</span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-xs text-[var(--text-secondary)]">{s.startTime} – {s.endTime}</td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="flex gap-0.5 flex-wrap">
                          {WEEK_DAYS.map((d) => (
                            <span key={d} className={`rounded text-[10px] px-1 py-0.5 ${s.days.includes(d) ? "bg-[var(--action-subtle)] text-[var(--action-primary)]" : "text-[var(--text-secondary)] opacity-30"}`}>{d}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button onClick={() => { setShiftEditing(s); setShiftDrawerOpen(true); }} className="rounded-lg p-1.5 hover:bg-[var(--surface-sunken)] text-[var(--text-secondary)]"><Pencil size={14} /></button>
                          <button onClick={() => deleteShift(s.id)} className="rounded-lg p-1.5 hover:bg-[var(--critical-bg)] text-[var(--text-secondary)] hover:text-[var(--critical-fg)]"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredShifts.length === 0 && (
                <div className="py-16 text-center text-sm text-[var(--text-secondary)]">No shifts found.</div>
              )}
            </div>
          </div>
        )}

        {/* ── Announcements Tab ── */}
        {tab === "announcements" && (
          <div className="divide-y divide-[var(--border-default)]">
            {announcements.length === 0 && (
              <div className="py-16 text-center text-sm text-[var(--text-secondary)]">No announcements posted.</div>
            )}
            {announcements.map((a) => (
              <div key={a.id} className="flex items-start gap-4 p-5 hover:bg-[var(--surface-sunken)] transition-colors">
                <div className={`mt-0.5 rounded-lg p-2 ${PRIORITY_CLS[a.priority]}`}>
                  <Megaphone size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-[var(--text-primary)]">{a.title}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${PRIORITY_CLS[a.priority]}`}>{a.priority}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">{a.body}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-2">Posted by {a.postedBy} · {fmtTime(a.postedAt)}</p>
                </div>
                <button onClick={() => deleteAnnouncement(a.id)} className="shrink-0 rounded-lg p-1.5 hover:bg-[var(--critical-bg)] text-[var(--text-secondary)] hover:text-[var(--critical-fg)]"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Drawers / Dialogs */}
      <DeptFormDrawer open={deptDrawerOpen} onClose={() => { setDeptDrawerOpen(false); setDeptEditing(null); }} editing={deptEditing} />
      <ShiftFormDrawer open={shiftDrawerOpen} onClose={() => { setShiftDrawerOpen(false); setShiftEditing(null); }} editing={shiftEditing} />
      <AnnDialog open={annDialogOpen} onClose={() => setAnnDialogOpen(false)} />
    </div>
  );
}
