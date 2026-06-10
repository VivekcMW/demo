"use client";

import { useState, useMemo } from "react";
import { useUserStore, type SeedUser, type UserRole, type UserStatus } from "@/store/useUserStore";
import { ROLE_LABELS, DEPARTMENTS } from "@/data/seedUsers";
import {
  Users, Search, SlidersHorizontal, X, RotateCcw,
  UserPlus, ShieldCheck, Stethoscope, HeartPulse,
  FlaskConical, Pill, PhoneCall, Shield,
  MoreHorizontal, Pencil, Trash2, Lock, CheckCircle2,
} from "lucide-react";

// ── DS helpers ────────────────────────────────────────────────────────────────

const ROLE_CLS: Record<UserRole, string> = {
  doctor:       "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  nurse:        "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  admin:        "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  pharmacist:   "bg-[var(--info-bg)] text-[var(--info-fg)]",
  lab_tech:     "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  receptionist: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

const STATUS_CLS: Record<UserStatus, string> = {
  Active:    "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Inactive:  "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  Suspended: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
};

const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  doctor:       <Stethoscope size={14} />,
  nurse:        <HeartPulse size={14} />,
  admin:        <Shield size={14} />,
  pharmacist:   <Pill size={14} />,
  lab_tech:     <FlaskConical size={14} />,
  receptionist: <PhoneCall size={14} />,
};

const ALL_ROLES: UserRole[] = ["doctor", "nurse", "admin", "pharmacist", "lab_tech", "receptionist"];
const ALL_STATUSES: UserStatus[] = ["Active", "Inactive", "Suspended"];

const AVATAR_COLORS = [
  "bg-[var(--action-primary)]", "bg-[var(--info-fg)]",
  "bg-[var(--warning-fg)]", "bg-[var(--critical-fg)]", "bg-[var(--normal-fg)]",
];
function avatarColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function fmtDate(d?: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

// ── Filter Drawer ─────────────────────────────────────────────────────────────

interface FilterDrawerProps {
  open: boolean; onClose: () => void;
  roleFilter: UserRole | ""; setRoleFilter: (v: UserRole | "") => void;
  statusFilter: UserStatus | ""; setStatusFilter: (v: UserStatus | "") => void;
  deptFilter: string; setDeptFilter: (v: string) => void;
  hasFilters: boolean; onClear: () => void; resultCount: number;
}

function FilterDrawer({ open, onClose, roleFilter, setRoleFilter, statusFilter, setStatusFilter, deptFilter, setDeptFilter, hasFilters, onClear, resultCount }: FilterDrawerProps) {
  if (!open) return null;
  function Btn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
      <button onClick={onClick} className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${active ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] bg-[var(--surface-sunken)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
        {children}
      </button>
    );
  }
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />
      <aside className="fixed inset-y-0 right-0 z-50 w-80 border-l border-[var(--border-default)] bg-[var(--surface-raised)] shadow-2xl flex flex-col">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
          <span className="font-semibold text-[var(--text-primary)]">Filters</span>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-[var(--surface-sunken)]"><X size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Role</p>
            <div className="flex flex-wrap gap-2">
              {ALL_ROLES.map((r) => <Btn key={r} active={roleFilter === r} onClick={() => setRoleFilter(roleFilter === r ? "" : r)}>{ROLE_LABELS[r]}</Btn>)}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Status</p>
            <div className="flex flex-wrap gap-2">
              {ALL_STATUSES.map((s) => <Btn key={s} active={statusFilter === s} onClick={() => setStatusFilter(statusFilter === s ? "" : s)}>{s}</Btn>)}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Department</p>
            <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)]">
              <option value="">All Departments</option>
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className="border-t border-[var(--border-default)] p-4 flex items-center justify-between">
          <span className="text-xs text-[var(--text-secondary)]">{resultCount} result{resultCount !== 1 ? "s" : ""}</span>
          {hasFilters && (
            <button onClick={onClear} className="flex items-center gap-1.5 text-xs text-[var(--action-primary)] hover:underline">
              <RotateCcw size={12} /> Clear all
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

// ── User Form Drawer ──────────────────────────────────────────────────────────

interface UserFormDrawerProps {
  open: boolean;
  onClose: () => void;
  editing?: SeedUser | null;
}

function UserFormDrawer({ open, onClose, editing }: UserFormDrawerProps) {
  const store = useUserStore();
  const isEdit = !!editing;

  const [name, setName] = useState(editing?.name ?? "");
  const [email, setEmail] = useState(editing?.email ?? "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(editing?.role ?? "doctor");
  const [dept, setDept] = useState(editing?.department ?? "");
  const [phone, setPhone] = useState(editing?.phone ?? "");
  const [qualification, setQualification] = useState(editing?.qualification ?? "");
  const [error, setError] = useState("");

  // Re-fill form when editing changes
  function resetToEditing() {
    setName(editing?.name ?? "");
    setEmail(editing?.email ?? "");
    setPassword("");
    setRole(editing?.role ?? "doctor");
    setDept(editing?.department ?? "");
    setPhone(editing?.phone ?? "");
    setQualification(editing?.qualification ?? "");
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim()) { setError("Name and email are required."); return; }
    if (!isEdit && !password.trim()) { setError("Password is required for new users."); return; }

    if (isEdit && editing) {
      store.updateUser(editing.id, { name, role, department: dept || undefined, phone: phone || undefined, qualification: qualification || undefined });
      if (password.trim()) store.changePassword(editing.id, password);
    } else {
      const res = store.createUser({ name, email, password, role, department: dept || undefined, phone: phone || undefined, qualification: qualification || undefined });
      if (!res.ok) { setError(res.message); return; }
    }
    onClose();
    resetToEditing();
  }

  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30" onClick={() => { onClose(); resetToEditing(); }} />
      <aside className="fixed inset-y-0 right-0 z-50 w-[420px] max-w-full border-l border-[var(--border-default)] bg-[var(--surface-raised)] shadow-2xl flex flex-col">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
          <span className="font-semibold text-[var(--text-primary)]">{isEdit ? "Edit User" : "Add New User"}</span>
          <button onClick={() => { onClose(); resetToEditing(); }} className="rounded-lg p-1.5 hover:bg-[var(--surface-sunken)]"><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {error && (
            <div className="rounded-lg bg-[var(--critical-bg)] px-3 py-2 text-sm text-[var(--critical-fg)]">{error}</div>
          )}
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Full Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" placeholder="e.g. Dr. Priya Menon" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Email *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isEdit} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none disabled:opacity-50" placeholder="user@aarogya.app" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">{isEdit ? "New Password (leave blank to keep)" : "Password *"}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" placeholder="••••••••" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Role *</label>
            <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)]">
              {ALL_ROLES.map((r) => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Department</label>
            <select value={dept} onChange={(e) => setDept(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)]">
              <option value="">Select department</option>
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" placeholder="10-digit mobile number" maxLength={10} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Qualification</label>
            <input value={qualification} onChange={(e) => setQualification(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" placeholder="e.g. MBBS, MD (Cardiology)" />
          </div>
        </form>
        <div className="border-t border-[var(--border-default)] p-4 flex justify-end gap-3">
          <button type="button" onClick={() => { onClose(); resetToEditing(); }} className="rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
            Cancel
          </button>
          <button onClick={handleSubmit as unknown as React.MouseEventHandler} className="rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">
            {isEdit ? "Save Changes" : "Create User"}
          </button>
        </div>
      </aside>
    </>
  );
}

// ── Confirm Dialog ────────────────────────────────────────────────────────────

function ConfirmDialog({ open, message, onConfirm, onCancel }: { open: boolean; message: string; onConfirm: () => void; onCancel: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl">
        <p className="text-sm text-[var(--text-primary)] mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">Cancel</button>
          <button onClick={onConfirm} className="rounded-lg bg-[var(--critical-fg)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Confirm</button>
        </div>
      </div>
    </div>
  );
}

// ── Row action menu ───────────────────────────────────────────────────────────

function ActionMenu({ user, onEdit, onToggleStatus, onDelete }: { user: SeedUser; onEdit: () => void; onToggleStatus: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="rounded-lg p-1.5 hover:bg-[var(--surface-sunken)] text-[var(--text-secondary)]">
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-40 min-w-[160px] rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] shadow-xl py-1">
            <button onClick={() => { setOpen(false); onEdit(); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]">
              <Pencil size={14} /> Edit
            </button>
            <button onClick={() => { setOpen(false); onToggleStatus(); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]">
              {user.status === "Active" ? <><Lock size={14} /> Deactivate</> : <><CheckCircle2 size={14} /> Activate</>}
            </button>
            <div className="my-1 border-t border-[var(--border-default)]" />
            <button onClick={() => { setOpen(false); onDelete(); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[var(--critical-fg)] hover:bg-[var(--critical-bg)]">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const users = useUserStore((s) => s.users);
  const store = useUserStore();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "">("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "">("");
  const [deptFilter, setDeptFilter] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<SeedUser | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<SeedUser | null>(null);
  const [activeTab, setActiveTab] = useState<UserRole | "all">("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter((u) => {
      if (q && !u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q) && !(u.department?.toLowerCase().includes(q))) return false;
      if (roleFilter && u.role !== roleFilter) return false;
      if (statusFilter && u.status !== statusFilter) return false;
      if (deptFilter && u.department !== deptFilter) return false;
      if (activeTab !== "all" && u.role !== activeTab) return false;
      return true;
    });
  }, [users, search, roleFilter, statusFilter, deptFilter, activeTab]);

  const hasFilters = !!(search || roleFilter || statusFilter || deptFilter);
  function clearFilters() { setSearch(""); setRoleFilter(""); setStatusFilter(""); setDeptFilter(""); }

  // KPIs
  const total = users.length;
  const active = users.filter((u) => u.status === "Active").length;
  const doctors = users.filter((u) => u.role === "doctor").length;
  const nurses = users.filter((u) => u.role === "nurse").length;

  const TABS: { key: UserRole | "all"; label: string }[] = [
    { key: "all", label: "All" },
    { key: "doctor", label: "Doctors" },
    { key: "nurse", label: "Nurses" },
    { key: "admin", label: "Admin" },
    { key: "pharmacist", label: "Pharmacists" },
    { key: "lab_tech", label: "Lab Techs" },
    { key: "receptionist", label: "Reception" },
  ];

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">User Management</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">{total} staff member{total !== 1 ? "s" : ""} · {active} active</p>
        </div>
        <button onClick={() => { setEditing(null); setDrawerOpen(true); }} className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">
          <UserPlus size={16} /> Add User
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Staff", value: total, icon: <Users size={20} />, color: "text-[var(--action-primary)]", bg: "bg-[var(--action-subtle)]" },
          { label: "Active", value: active, icon: <CheckCircle2 size={20} />, color: "text-[var(--normal-fg)]", bg: "bg-[var(--normal-bg)]" },
          { label: "Doctors", value: doctors, icon: <Stethoscope size={20} />, color: "text-[var(--info-fg)]", bg: "bg-[var(--info-bg)]" },
          { label: "Nurses", value: nurses, icon: <HeartPulse size={20} />, color: "text-[var(--warning-fg)]", bg: "bg-[var(--warning-bg)]" },
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

      {/* Tabs + search row */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        {/* Quick-tabs */}
        <div className="flex gap-0.5 overflow-x-auto border-b border-[var(--border-default)] px-4 pt-3">
          {TABS.map((t) => {
            const count = t.key === "all" ? users.length : users.filter((u) => u.role === t.key).length;
            return (
              <button key={t.key} onClick={() => setActiveTab(t.key)} className={`flex items-center gap-1.5 rounded-t-lg px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === t.key ? "border-[var(--action-primary)] text-[var(--action-primary)]" : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
                {t.label}
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${activeTab === t.key ? "bg-[var(--action-subtle)] text-[var(--action-primary)]" : "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>{count}</span>
              </button>
            );
          })}
        </div>
        {/* Search + filter bar */}
        <div className="flex items-center gap-3 p-4 border-b border-[var(--border-default)]">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, dept…" className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] pl-9 pr-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--action-primary)] outline-none" />
          </div>
          <button onClick={() => setFilterOpen(true)} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${hasFilters ? "border-[var(--action-primary)] text-[var(--action-primary)] bg-[var(--action-subtle)]" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
            <SlidersHorizontal size={14} /> Filters {hasFilters && <span className="rounded-full bg-[var(--action-primary)] text-white text-[10px] px-1.5">!</span>}
          </button>
          {hasFilters && <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--critical-fg)]"><X size={12} /> Clear</button>}
          <span className="ml-auto text-xs text-[var(--text-secondary)]">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Users size={36} className="mx-auto mb-3 text-[var(--text-secondary)] opacity-40" />
            <p className="text-sm font-medium text-[var(--text-secondary)]">No users found</p>
            {hasFilters && <button onClick={clearFilters} className="mt-2 text-xs text-[var(--action-primary)] hover:underline">Clear filters</button>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--surface-sunken)] text-xs text-[var(--text-secondary)] uppercase tracking-wide">
                  <th className="px-4 py-3 text-left font-medium">User</th>
                  <th className="px-4 py-3 text-left font-medium">Role</th>
                  <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Department</th>
                  <th className="px-4 py-3 text-left font-medium hidden lg:table-cell">Phone</th>
                  <th className="px-4 py-3 text-left font-medium hidden lg:table-cell">Joined</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-default)]">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-[var(--surface-sunken)] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full ${avatarColor(user.name)} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                          {initials(user.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-[var(--text-primary)] truncate">{user.name}</p>
                          <p className="text-xs text-[var(--text-secondary)] truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${ROLE_CLS[user.role]}`}>
                        {ROLE_ICONS[user.role]} {ROLE_LABELS[user.role]}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-[var(--text-secondary)]">{user.department || "—"}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-[var(--text-secondary)]">{user.phone || "—"}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-[var(--text-secondary)]">{fmtDate(user.joinedAt)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_CLS[user.status ?? "Active"]}`}>
                        {user.status ?? "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ActionMenu
                        user={user}
                        onEdit={() => { setEditing(user); setDrawerOpen(true); }}
                        onToggleStatus={() => store.setStatus(user.id, user.status === "Active" ? "Inactive" : "Active")}
                        onDelete={() => setConfirmDelete(user)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Security note */}
      <div className="flex items-start gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[var(--action-primary)]" />
        <p className="text-xs text-[var(--text-secondary)]">
          Passwords are stored for demo purposes only. In production, use bcrypt hashing and never expose credentials in the UI.
          Role-based access control (RBAC) should be enforced server-side.
        </p>
      </div>

      {/* Drawers / Dialogs */}
      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} roleFilter={roleFilter} setRoleFilter={setRoleFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} deptFilter={deptFilter} setDeptFilter={setDeptFilter} hasFilters={hasFilters} onClear={clearFilters} resultCount={filtered.length} />
      <UserFormDrawer open={drawerOpen} onClose={() => { setDrawerOpen(false); setEditing(null); }} editing={editing} />
      <ConfirmDialog open={!!confirmDelete} message={`Permanently delete user "${confirmDelete?.name}"? This cannot be undone.`} onConfirm={() => { if (confirmDelete) { store.deleteUser(confirmDelete.id); setConfirmDelete(null); } }} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
}
