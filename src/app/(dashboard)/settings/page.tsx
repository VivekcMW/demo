"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { ROLE_LABELS, DEPARTMENTS } from "@/data/seedUsers";
import {
  UserCircle, Lock, Activity, Save, Eye, EyeOff,
  CheckCircle2, AlertTriangle, ShieldCheck, LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

// ── Activity log seed ─────────────────────────────────────────────────────────

const ACTIVITY_LOG = [
  { id: "log-001", action: "Logged in",                              by: "Dr. Ananya Sharma",  at: "2026-06-11T01:00:00", ip: "192.168.1.10", category: "Auth"     },
  { id: "log-002", action: "Started examination EXM-0017",           by: "Dr. Ananya Sharma",  at: "2026-06-11T00:45:00", ip: "192.168.1.10", category: "Clinical" },
  { id: "log-003", action: "Sent prescription to pharmacy (RX-0016)",by: "Dr. Ananya Sharma",  at: "2026-06-11T00:42:00", ip: "192.168.1.10", category: "Clinical" },
  { id: "log-004", action: "Verified prescription RX-0013",          by: "Arun Kumar",         at: "2026-06-10T22:15:00", ip: "192.168.1.22", category: "Pharmacy" },
  { id: "log-005", action: "Admitted patient PAT-0023 to IPD",       by: "Dr. Kiran Patel",    at: "2026-06-10T21:30:00", ip: "192.168.1.14", category: "IPD"      },
  { id: "log-006", action: "Generated bill BL-00012",                by: "Nalini Das",         at: "2026-06-10T20:00:00", ip: "192.168.1.30", category: "Billing"  },
  { id: "log-007", action: "Updated user u-nrs-002",                 by: "Rahul Verma",        at: "2026-06-10T18:45:00", ip: "192.168.1.05", category: "Admin"    },
  { id: "log-008", action: "Logged in",                              by: "Rahul Verma",        at: "2026-06-10T18:40:00", ip: "192.168.1.05", category: "Auth"     },
  { id: "log-009", action: "Marked order ORD-0008 as completed",     by: "Ravi Shankar",       at: "2026-06-10T16:30:00", ip: "192.168.1.18", category: "Orders"   },
  { id: "log-010", action: "Discharged patient PAT-0015",            by: "Dr. Suresh Nair",    at: "2026-06-10T15:10:00", ip: "192.168.1.11", category: "IPD"      },
  { id: "log-011", action: "Created appointment APT-0091",           by: "Nalini Das",         at: "2026-06-10T14:00:00", ip: "192.168.1.30", category: "Appt"     },
  { id: "log-012", action: "Dispensed RX-0010 fully",                by: "Deepa Iyer",         at: "2026-06-10T13:20:00", ip: "192.168.1.23", category: "Pharmacy" },
  { id: "log-013", action: "Password changed",                       by: "Dr. Priya Menon",    at: "2026-06-10T11:00:00", ip: "192.168.1.15", category: "Auth"     },
  { id: "log-014", action: "Signed off examination EXM-0005",        by: "Dr. Ananya Sharma",  at: "2026-06-10T09:30:00", ip: "192.168.1.10", category: "Clinical" },
  { id: "log-015", action: "Added new department: Oncology",         by: "Rahul Verma",        at: "2026-06-09T17:00:00", ip: "192.168.1.05", category: "Admin"    },
  { id: "log-016", action: "Logged in",                              by: "Kavitha Rao",        at: "2026-06-09T23:00:00", ip: "192.168.1.25", category: "Auth"     },
  { id: "log-017", action: "Recorded lab result for ORD-0004",       by: "Ravi Shankar",       at: "2026-06-09T14:45:00", ip: "192.168.1.18", category: "Orders"   },
  { id: "log-018", action: "Cancelled prescription RX-0014",         by: "Dr. Kiran Patel",    at: "2026-06-09T12:30:00", ip: "192.168.1.14", category: "Pharmacy" },
  { id: "log-019", action: "Applied waiver to bill BL-00008",        by: "Rahul Verma",        at: "2026-06-09T11:00:00", ip: "192.168.1.05", category: "Billing"  },
  { id: "log-020", action: "System backup completed",                by: "System",             at: "2026-06-09T02:00:00", ip: "10.0.0.1",     category: "System"   },
  { id: "log-021", action: "Logged in",                              by: "Dr. Ananya Sharma",  at: "2026-06-09T07:55:00", ip: "192.168.1.10", category: "Auth"     },
  { id: "log-022", action: "Transferred bed from B-04 to A-02",      by: "Dr. Suresh Nair",    at: "2026-06-08T20:00:00", ip: "192.168.1.11", category: "IPD"      },
  { id: "log-023", action: "New user created: Nalini Das",           by: "Rahul Verma",        at: "2026-06-08T09:30:00", ip: "192.168.1.05", category: "Admin"    },
  { id: "log-024", action: "Maintenance window started",             by: "System",             at: "2026-06-08T02:00:00", ip: "10.0.0.1",     category: "System"   },
  { id: "log-025", action: "Marked patient PAT-0005 as inactive",    by: "Rahul Verma",        at: "2026-06-07T16:00:00", ip: "192.168.1.05", category: "Admin"    },
];

const CATEGORY_CLS: Record<string, string> = {
  Auth:     "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  Clinical: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Pharmacy: "bg-[var(--info-bg)] text-[var(--info-fg)]",
  IPD:      "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Billing:  "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  Admin:    "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Orders:   "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Appt:     "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  System:   "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
};

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true });
}

// ── Profile Tab ───────────────────────────────────────────────────────────────

function ProfileTab() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const store = useUserStore();

  const [name, setName] = useState(currentUser?.name ?? "");
  const [dept, setDept] = useState(currentUser?.department ?? "");
  const [phone, setPhone] = useState(currentUser?.phone ?? "");
  const [qualification, setQualification] = useState(currentUser?.qualification ?? "");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (!currentUser) return;
    store.updateUser(currentUser.id, { name, department: dept || undefined, phone: phone || undefined, qualification: qualification || undefined });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const avatarColors = ["#0d9488", "#3b82f6", "#f59e0b", "#ef4444", "#22c55e"];
  function avatarColor(n: string) { let h = 0; for (let i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) & 0xffff; return avatarColors[h % avatarColors.length]; }
  function initials(n: string) { return n.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase(); }

  if (!currentUser) return <div className="py-20 text-center text-sm text-[var(--text-secondary)]">Not logged in.</div>;

  return (
    <div className="max-w-xl space-y-6 p-6">
      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-[var(--normal-bg)] px-4 py-3 text-sm font-medium text-[var(--normal-fg)]">
          <CheckCircle2 size={16} /> Profile updated successfully.
        </div>
      )}
      {/* Avatar row */}
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0" style={{ backgroundColor: avatarColor(currentUser.name) }}>
          {initials(currentUser.name)}
        </div>
        <div>
          <p className="font-semibold text-[var(--text-primary)]">{currentUser.name}</p>
          <p className="text-sm text-[var(--text-secondary)]">{currentUser.email}</p>
          <span className="mt-1 inline-block rounded-full bg-[var(--action-subtle)] px-2.5 py-0.5 text-xs font-medium text-[var(--action-primary)]">{ROLE_LABELS[currentUser.role]}</span>
        </div>
      </div>
      {/* Fields */}
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--text-secondary)]">Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--text-secondary)]">Email</label>
          <input value={currentUser.email} disabled className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-secondary)] opacity-60 cursor-not-allowed" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--text-secondary)]">Department</label>
          <select value={dept} onChange={(e) => setDept(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)]">
            <option value="">Select department</option>
            {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--text-secondary)]">Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" placeholder="10-digit mobile number" maxLength={10} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--text-secondary)]">Qualification</label>
          <input value={qualification} onChange={(e) => setQualification(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" placeholder="e.g. MBBS, MD" />
        </div>
      </div>
      <button onClick={handleSave} className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-5 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">
        <Save size={15} /> Save Changes
      </button>
    </div>
  );
}

// ── Security Tab ──────────────────────────────────────────────────────────────

function SecurityTab() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const store = useUserStore();
  const authStore = useAuthStore();
  const router = useRouter();

  const [current, setCurrent] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange() {
    setError("");
    if (!current || !newPwd || !confirm) { setError("All fields are required."); return; }
    if (current !== currentUser?.password) { setError("Current password is incorrect."); return; }
    if (newPwd.length < 8) { setError("New password must be at least 8 characters."); return; }
    if (newPwd !== confirm) { setError("New passwords do not match."); return; }
    if (currentUser) store.changePassword(currentUser.id, newPwd);
    setCurrent(""); setNewPwd(""); setConfirm("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  function handleLogout() {
    authStore.logout();
    router.push("/login");
  }

  if (!currentUser) return <div className="py-20 text-center text-sm text-[var(--text-secondary)]">Not logged in.</div>;

  return (
    <div className="max-w-xl space-y-6 p-6">
      {/* Change Password */}
      <div className="rounded-xl border border-[var(--border-default)] p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Lock size={16} className="text-[var(--action-primary)]" />
          <span className="font-medium text-[var(--text-primary)]">Change Password</span>
        </div>
        {error && <div className="rounded-lg bg-[var(--critical-bg)] px-3 py-2 text-sm text-[var(--critical-fg)]">{error}</div>}
        {success && <div className="flex items-center gap-2 rounded-lg bg-[var(--normal-bg)] px-3 py-2 text-sm text-[var(--normal-fg)]"><CheckCircle2 size={15} /> Password changed successfully.</div>}
        <div className="space-y-3">
          {[
            { label: "Current Password", val: current, set: setCurrent, show: showCurrent, toggle: () => setShowCurrent((v) => !v) },
            { label: "New Password",     val: newPwd,  set: setNewPwd,  show: showNew,     toggle: () => setShowNew((v) => !v)     },
          ].map(({ label, val, set, show, toggle }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-[var(--text-secondary)]">{label}</label>
              <div className="relative">
                <input type={show ? "text" : "password"} value={val} onChange={(e) => set(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 pr-10 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" placeholder="••••••••" />
                <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">{show ? <EyeOff size={14} /> : <Eye size={14} />}</button>
              </div>
            </div>
          ))}
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Confirm New Password</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" placeholder="••••••••" />
          </div>
        </div>
        <button onClick={handleChange} className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-5 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">
          <ShieldCheck size={15} /> Update Password
        </button>
      </div>

      {/* Session */}
      <div className="rounded-xl border border-[var(--border-default)] p-5 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-[var(--warning-fg)]" />
          <span className="font-medium text-[var(--text-primary)]">Active Session</span>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">Signed in as <span className="font-medium text-[var(--text-primary)]">{currentUser.name}</span> ({currentUser.email})</p>
        <button onClick={handleLogout} className="flex items-center gap-2 rounded-xl border border-[var(--critical-fg)] px-4 py-2 text-sm font-medium text-[var(--critical-fg)] hover:bg-[var(--critical-bg)]">
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </div>
  );
}

// ── Activity Log Tab ──────────────────────────────────────────────────────────

function ActivityLogTab() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const categories = Array.from(new Set(ACTIVITY_LOG.map((l) => l.category)));

  const filtered = ACTIVITY_LOG.filter((l) => {
    const q = search.toLowerCase();
    if (q && !l.action.toLowerCase().includes(q) && !l.by.toLowerCase().includes(q)) return false;
    if (categoryFilter && l.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-0">
      <div className="flex items-center gap-3 p-4 border-b border-[var(--border-default)]">
        <div className="relative flex-1 max-w-xs">
          <Activity size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search actions or users…" className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] pl-9 pr-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--action-primary)] outline-none" />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)]">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <span className="ml-auto text-xs text-[var(--text-secondary)]">{filtered.length} entries</span>
      </div>
      <div className="divide-y divide-[var(--border-default)]">
        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-[var(--text-secondary)]">No log entries found.</div>
        )}
        {filtered.map((l) => (
          <div key={l.id} className="flex items-start gap-4 px-5 py-3 hover:bg-[var(--surface-sunken)] transition-colors">
            <span className={`mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-medium shrink-0 ${CATEGORY_CLS[l.category] ?? "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>{l.category}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[var(--text-primary)]">{l.action}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{l.by} · {l.ip}</p>
            </div>
            <p className="text-xs text-[var(--text-secondary)] shrink-0">{fmtTime(l.at)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

type Tab = "profile" | "security" | "activity";

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");

  const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "profile",  label: "Profile",      icon: <UserCircle size={15} /> },
    { key: "security", label: "Security",     icon: <Lock size={15} /> },
    { key: "activity", label: "Activity Log", icon: <Activity size={15} /> },
  ];

  return (
    <div className="space-y-5 pb-8">
      <div>
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">Settings</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-0.5">Manage your profile, security, and view system activity</p>
      </div>

      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        {/* Tab bar */}
        <div className="flex gap-0.5 overflow-x-auto border-b border-[var(--border-default)] px-4 pt-3">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1.5 rounded-t-lg px-4 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${tab === t.key ? "border-[var(--action-primary)] text-[var(--action-primary)]" : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {tab === "profile"  && <ProfileTab />}
        {tab === "security" && <SecurityTab />}
        {tab === "activity" && <ActivityLogTab />}
      </div>
    </div>
  );
}
