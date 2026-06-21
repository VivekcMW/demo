"use client";

import { useState, useEffect } from "react";
import {
  ShieldAlert, Bell, BellOff, FlaskConical, AlertTriangle,
  CheckCircle2, XCircle, RefreshCw, Plus, ToggleLeft, ToggleRight,
} from "lucide-react";

interface AlertStat {
  alertType: string;
  count: number;
  severity: string;
  unacknowledged: number;
}

interface CdsAlert {
  id: string;
  patientId: string | null;
  alertType: string;
  severity: string;
  message: string;
  details: Record<string, unknown> | null;
  acknowledgedBy: string | null;
  acknowledgedAt: string | null;
  createdAt: string;
}

interface NotificationRule {
  id: string;
  alertType: string;
  channel: string;
  recipient: string;
  enabled: boolean;
  createdAt: string;
}

interface TestThreshold {
  id: string;
  name: string;
  loincCode: string | null;
  criticalThresholds: Record<string, { low?: number; high?: number; unit?: string }>;
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

const SEVERITY_CLS: Record<string, string> = {
  critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  moderate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  info: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
};

export default function CdsAdminPage() {
  const [tab, setTab] = useState<"alerts" | "rules" | "thresholds">("alerts");
  const [stats, setStats] = useState<AlertStat[]>([]);
  const [alerts, setAlerts] = useState<CdsAlert[]>([]);
  const [rules, setRules] = useState<NotificationRule[]>([]);
  const [thresholds, setThresholds] = useState<TestThreshold[]>([]);
  const [loading, setLoading] = useState(true);

  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    loadData();
  }, [tab]);

  async function loadData() {
    setLoading(true);
    try {
      if (tab === "alerts") {
        const [statsRes, alertsRes] = await Promise.all([
          fetch(`${base}/api/v1/cds/alerts/stats`).then((r) => r.json()),
          fetch(`${base}/api/v1/cds/alerts`).then((r) => r.json()),
        ]);
        setStats(statsRes.data ?? []);
        setAlerts(alertsRes.data ?? []);
      } else if (tab === "rules") {
        const res = await fetch(`${base}/api/v1/alerting/rules`).then((r) => r.json());
        setRules(res.data ?? []);
      } else if (tab === "thresholds") {
        const res = await fetch(`${base}/api/v1/alerting/thresholds`).then((r) => r.json());
        setThresholds(res.data ?? []);
      }
    } catch {
      // Silent — demo mode
    } finally {
      setLoading(false);
    }
  }

  async function acknowledgeAlert(id: string) {
    try {
      await fetch(`${base}/api/v1/cds/alerts/${id}/acknowledge`, { method: "POST" });
      setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledgedBy: "admin", acknowledgedAt: new Date().toISOString() } : a)));
    } catch {
      // silent
    }
  }

  async function toggleRule(id: string, current: boolean) {
    try {
      await fetch(`${base}/api/v1/alerting/rules/${id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !current }),
      });
      setRules((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !current } : r)));
    } catch {
      // silent
    }
  }

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[var(--border-default)]">
        {(["alerts", "rules", "thresholds"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
              tab === t
                ? "border-[var(--action-primary)] text-[var(--action-primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {t === "alerts" ? "CDS Alerts" : t === "rules" ? "Notification Rules" : "Critical Thresholds"}
          </button>
        ))}
      </div>

      {tab === "alerts" && (
        <>
          {/* Stats cards */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.alertType} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
                  <p className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">{s.alertType.replace(/_/g, " ")}</p>
                  <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">{s.count}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <ShieldAlert size={12} className="text-[var(--warning-fg)]" />
                    <span>{s.unacknowledged} unacknowledged</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Alerts table */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-default)]">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Recent Alerts</p>
              <button onClick={loadData} className="flex items-center gap-1.5 text-xs font-medium text-[var(--action-primary)] hover:underline">
                <RefreshCw size={14} /> Refresh
              </button>
            </div>
            {loading ? (
              <div className="p-8 text-center text-sm text-[var(--text-secondary)]">Loading...</div>
            ) : alerts.length === 0 ? (
              <div className="p-8 text-center text-sm text-[var(--text-secondary)]">No alerts yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">
                      <th className="px-5 py-3 text-left font-medium text-[var(--text-secondary)]">Type</th>
                      <th className="px-5 py-3 text-left font-medium text-[var(--text-secondary)]">Severity</th>
                      <th className="px-5 py-3 text-left font-medium text-[var(--text-secondary)]">Message</th>
                      <th className="px-5 py-3 text-left font-medium text-[var(--text-secondary)]">Status</th>
                      <th className="px-5 py-3 text-left font-medium text-[var(--text-secondary)]">Created</th>
                      <th className="px-5 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {alerts.slice(0, 50).map((alert) => (
                      <tr key={alert.id} className="border-b border-[var(--border-default)] hover:bg-[var(--surface-sunken)]">
                        <td className="px-5 py-3 text-[var(--text-primary)]">{alert.alertType.replace(/_/g, " ")}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${SEVERITY_CLS[alert.severity] ?? ""}`}>
                            {alert.severity}
                          </span>
                        </td>
                        <td className="px-5 py-3 max-w-xs truncate text-[var(--text-secondary)]">{alert.message}</td>
                        <td className="px-5 py-3">
                          {alert.acknowledgedBy ? (
                            <span className="flex items-center gap-1 text-xs text-[var(--normal-fg)]">
                              <CheckCircle2 size={12} /> Acknowledged
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-[var(--warning-fg)]">
                              <AlertTriangle size={12} /> Pending
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3 text-xs text-[var(--text-secondary)]">{fmtTime(alert.createdAt)}</td>
                        <td className="px-5 py-3 text-right">
                          {!alert.acknowledgedBy && (
                            <button
                              onClick={() => acknowledgeAlert(alert.id)}
                              className="rounded-lg bg-[var(--action-primary)] px-3 py-1 text-[10px] font-medium text-white hover:bg-[var(--action-primary-hover)]"
                            >
                              Acknowledge
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {tab === "rules" && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-default)]">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Alert Notification Rules</p>
          </div>
          {loading ? (
            <div className="p-8 text-center text-sm text-[var(--text-secondary)]">Loading...</div>
          ) : rules.length === 0 ? (
            <div className="p-8 text-center text-sm text-[var(--text-secondary)]">No notification rules configured</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">
                    <th className="px-5 py-3 text-left font-medium text-[var(--text-secondary)]">Alert Type</th>
                    <th className="px-5 py-3 text-left font-medium text-[var(--text-secondary)]">Channel</th>
                    <th className="px-5 py-3 text-left font-medium text-[var(--text-secondary)]">Recipient</th>
                    <th className="px-5 py-3 text-left font-medium text-[var(--text-secondary)]">Enabled</th>
                    <th className="px-5 py-3 text-left font-medium text-[var(--text-secondary)]">Created</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {rules.map((rule) => (
                    <tr key={rule.id} className="border-b border-[var(--border-default)] hover:bg-[var(--surface-sunken)]">
                      <td className="px-5 py-3 text-[var(--text-primary)]">{rule.alertType.replace(/_/g, " ")}</td>
                      <td className="px-5 py-3 text-[var(--text-secondary)]">{rule.channel === "webhook" ? "Webhook" : "In-App"}</td>
                      <td className="px-5 py-3 text-xs text-[var(--text-secondary)]">{rule.recipient}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${rule.enabled ? "text-[var(--normal-fg)]" : "text-[var(--text-secondary)]"}`}>
                          {rule.enabled ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                          {rule.enabled ? "Active" : "Disabled"}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-[var(--text-secondary)]">{fmtTime(rule.createdAt)}</td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => toggleRule(rule.id, rule.enabled)}
                          className={`rounded-lg px-3 py-1 text-[10px] font-medium ${
                            rule.enabled
                              ? "bg-[var(--critical-bg)] text-[var(--critical-fg)] hover:bg-red-200 dark:hover:bg-red-900/50"
                              : "bg-[var(--normal-bg)] text-[var(--normal-fg)] hover:bg-green-200 dark:hover:bg-green-900/50"
                          }`}
                        >
                          {rule.enabled ? "Disable" : "Enable"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === "thresholds" && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-default)]">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Lab Test Critical Thresholds</p>
          </div>
          {loading ? (
            <div className="p-8 text-center text-sm text-[var(--text-secondary)]">Loading...</div>
          ) : thresholds.length === 0 ? (
            <div className="p-8 text-center text-sm text-[var(--text-secondary)]">No critical thresholds configured</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">
                    <th className="px-5 py-3 text-left font-medium text-[var(--text-secondary)]">Test</th>
                    <th className="px-5 py-3 text-left font-medium text-[var(--text-secondary)]">LOINC</th>
                    <th className="px-5 py-3 text-left font-medium text-[var(--text-secondary)]">Parameter</th>
                    <th className="px-5 py-3 text-left font-medium text-[var(--text-secondary)]">Low</th>
                    <th className="px-5 py-3 text-left font-medium text-[var(--text-secondary)]">High</th>
                    <th className="px-5 py-3 text-left font-medium text-[var(--text-secondary)]">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {thresholds.map((test) => {
                    const params = Object.entries(test.criticalThresholds);
                    if (params.length === 0) {
                      return (
                        <tr key={test.id} className="border-b border-[var(--border-default)]">
                          <td className="px-5 py-3 text-[var(--text-primary)]">{test.name}</td>
                          <td className="px-5 py-3 text-xs text-[var(--text-secondary)]">{test.loincCode ?? "—"}</td>
                          <td className="px-5 py-3 text-[var(--text-secondary)]">—</td>
                          <td className="px-5 py-3">—</td>
                          <td className="px-5 py-3">—</td>
                          <td className="px-5 py-3">—</td>
                        </tr>
                      );
                    }
                    return params.map(([param, thresh], idx) => (
                      <tr key={`${test.id}-${param}`} className="border-b border-[var(--border-default)] hover:bg-[var(--surface-sunken)]">
                        {idx === 0 && (
                          <>
                            <td className="px-5 py-3 text-[var(--text-primary)]" rowSpan={params.length}>{test.name}</td>
                            <td className="px-5 py-3 text-xs text-[var(--text-secondary)]" rowSpan={params.length}>{test.loincCode ?? "—"}</td>
                          </>
                        )}
                        <td className="px-5 py-3 text-[var(--text-secondary)]">{param}</td>
                        <td className="px-5 py-3 tabular-nums">{thresh.low != null ? `< ${thresh.low}` : "—"}</td>
                        <td className="px-5 py-3 tabular-nums">{thresh.high != null ? `> ${thresh.high}` : "—"}</td>
                        <td className="px-5 py-3 text-xs text-[var(--text-secondary)]">{thresh.unit ?? "—"}</td>
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
