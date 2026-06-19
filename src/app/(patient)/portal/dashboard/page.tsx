"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePatientAuthStore } from "@/store/usePatientAuthStore";
import { usePatientStore } from "@/store/usePatientStore";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { useExaminationStore } from "@/store/useExaminationStore";
import { useBillingStore } from "@/store/useBillingStore";
import { usePharmacyStore } from "@/store/usePharmacyStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useMemo, useEffect, useState } from "react";
import {
  Calendar, FileText, Pill, IndianRupee, FlaskConical,
  Heart, Activity, ShieldCheck, ChevronRight, AlertCircle,
  Clock, User,
} from "lucide-react";

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtTime(t: string) {
  return new Date(`2000-01-01T${t}`).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

export default function PatientDashboardPage() {
  const router = useRouter();
  const loggedInPatientId = usePatientAuthStore((s) => s.loggedInPatientId);
  const patient = usePatientStore((s) =>
    loggedInPatientId ? s.patients.find((p) => p.id === loggedInPatientId) ?? null : null
  );
  const appointments = useAppointmentStore((s) => s.appointments);
  const examinations = useExaminationStore((s) => s.examinations);
  const bills = useBillingStore((s) => s.bills);
  const prescriptions = usePharmacyStore((s) => s.prescriptions);
  const orders = useOrderStore((s) => s.orders);

  const patientAppts = useMemo(
    () => appointments.filter((a) => a.patient === patient?.name).sort((a, b) => a.date.localeCompare(b.date)),
    [appointments, patient?.name]
  );
  const upcomingAppts = useMemo(
    () => patientAppts.filter((a) => a.date >= new Date().toISOString().slice(0, 10) && a.status === "Scheduled").slice(0, 3),
    [patientAppts]
  );
  const patientExams = useMemo(
    () => (patient ? examinations.filter((e) => e.patientId === patient.id) : []),
    [examinations, patient]
  );
  const recentExams = useMemo(() => patientExams.slice(-3).reverse(), [patientExams]);

  const patientBills = useMemo(
    () => (patient ? bills.filter((b) => b.patientId === patient.id) : []),
    [bills, patient]
  );
  const pendingBills = useMemo(() => patientBills.filter((b) => b.amountDue > 0 && b.status !== "Waived" && b.status !== "Cancelled"), [patientBills]);

  const patientRxs = useMemo(
    () => (patient ? prescriptions.filter((p) => p.patientId === patient.id) : []),
    [prescriptions, patient]
  );
  const activeRxs = useMemo(() => patientRxs.filter((r) => r.status === "Pending" || r.status === "Verified" || r.status === "Dispensing").slice(0, 5), [patientRxs]);

  const patientLabs = useMemo(
    () => (patient ? orders.filter((o) => o.patientId === patient.id && o.type === "Lab" && o.status === "Completed").slice(-3).reverse() : []),
    [orders, patient]
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!patient) {
    if (mounted) router.replace("/portal/login");
    return null;
  }

  const QUICK_LINKS = [
    { label: "Book Appointment", href: "/portal/appointments", icon: Calendar, color: "bg-blue-100 text-blue-700" },
    { label: "View Reports", href: "/portal/records", icon: FlaskConical, color: "bg-purple-100 text-purple-700" },
    { label: "My Prescriptions", href: "/portal/prescriptions", icon: Pill, color: "bg-green-100 text-green-700" },
    { label: "Pay Bills", href: "/portal/bills", icon: IndianRupee, color: "bg-amber-100 text-amber-700" },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-8">
      {/* Greeting */}
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--action-primary)] text-lg font-bold text-white">
            {patient.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-[var(--text-primary)]">Welcome, {patient.name.split(" ")[0]}!</h1>
            <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
              UHID: {patient.uhid} · {patient.age} yrs · {patient.sex === "M" ? "Male" : patient.sex === "F" ? "Female" : "Other"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {patient.bloodGroup && patient.bloodGroup !== "Unknown" && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-2.5 py-0.5 text-xs font-semibold text-[var(--critical-fg)]">
                  <Heart size={11} /> {patient.bloodGroup}
                </span>
              )}
              {patient.chronicConditions.length > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--warning-fg)]/20 bg-[var(--warning-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--warning-fg)]">
                  <Activity size={11} /> {patient.chronicConditions.length} condition{patient.chronicConditions.length > 1 ? "s" : ""}
                </span>
              )}
              {patient.labs.length > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--info-fg)]/20 bg-[var(--info-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--info-fg)]">
                  <FlaskConical size={11} /> {patient.labs.length} lab{patient.labs.length > 1 ? "s" : ""} on record
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {QUICK_LINKS.map((ql) => {
          const Icon = ql.icon;
          return (
            <Link
              key={ql.label}
              href={ql.href}
              className="flex flex-col items-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 text-center hover:shadow-sm hover:-translate-y-0.5 transition-all"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ql.color}`}>
                <Icon size={18} />
              </div>
              <p className="text-xs font-semibold text-[var(--text-primary)]">{ql.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Upcoming Appointments */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-[var(--action-primary)]" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">Upcoming Appointments</p>
            </div>
            <Link href="/portal/appointments" className="text-xs font-medium text-[var(--action-primary)] hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-default)]">
            {upcomingAppts.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-center">
                <Calendar size={24} className="mb-2 text-[var(--text-secondary)] opacity-30" />
                <p className="text-sm text-[var(--text-secondary)]">No upcoming appointments</p>
                <Link href="/portal/appointments" className="mt-2 text-xs font-medium text-[var(--action-primary)] hover:underline">
                  Book an Appointment
                </Link>
              </div>
            ) : (
              upcomingAppts.map((appt) => (
                <div key={appt.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--action-subtle)]">
                    <Calendar size={16} className="text-[var(--action-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{appt.doctor}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{fmtDate(appt.date)} at {fmtTime(appt.time)} · {appt.dept} · {appt.type}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[var(--info-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--info-fg)]">{appt.status}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Examinations */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
            <div className="flex items-center gap-2">
              <FileText size={15} className="text-[var(--action-primary)]" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">Recent Visit Notes</p>
            </div>
            <Link href="/portal/records" className="text-xs font-medium text-[var(--action-primary)] hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-default)]">
            {recentExams.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-center">
                <FileText size={24} className="mb-2 text-[var(--text-secondary)] opacity-30" />
                <p className="text-sm text-[var(--text-secondary)]">No visit records yet</p>
              </div>
            ) : (
              recentExams.map((exam) => (
                <Link key={exam.id} href={`/portal/records#${exam.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--surface-sunken)] transition-colors group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-sunken)]">
                    <User size={16} className="text-[var(--text-secondary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)]">Visit with {exam.doctor}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{exam.dept} · {fmtDate(exam.startedAt)} · {exam.type}</p>
                  </div>
                  <ChevronRight size={14} className="shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Pending Bills */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
            <div className="flex items-center gap-2">
              <IndianRupee size={15} className="text-[var(--action-primary)]" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">Bills & Payments</p>
            </div>
            <Link href="/portal/bills" className="text-xs font-medium text-[var(--action-primary)] hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-default)]">
            {pendingBills.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-center">
                <ShieldCheck size={24} className="mb-2 text-[var(--normal-fg)] opacity-50" />
                <p className="text-sm text-[var(--text-secondary)]">No pending bills</p>
              </div>
            ) : (
              pendingBills.slice(0, 3).map((bill) => (
                <Link key={bill.id} href={`/portal/bills#${bill.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--surface-sunken)] transition-colors group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--critical-bg)]">
                    <IndianRupee size={16} className="text-[var(--critical-fg)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{bill.category} Bill</p>
                    <p className="text-xs text-[var(--text-secondary)]">Due: {fmtDate(bill.dueDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[var(--critical-fg)]">₹{bill.amountDue.toLocaleString("en-IN")}</p>
                    <p className="text-[10px] text-[var(--text-secondary)]">{bill.status}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Active Prescriptions */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
            <div className="flex items-center gap-2">
              <Pill size={15} className="text-[var(--action-primary)]" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">Active Prescriptions</p>
            </div>
            <Link href="/portal/prescriptions" className="text-xs font-medium text-[var(--action-primary)] hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-default)]">
            {activeRxs.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-center">
                <Pill size={24} className="mb-2 text-[var(--text-secondary)] opacity-30" />
                <p className="text-sm text-[var(--text-secondary)]">No active prescriptions</p>
              </div>
            ) : (
              activeRxs.map((rx) => (
                <div key={rx.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--normal-bg)]">
                    <Pill size={16} className="text-[var(--normal-fg)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{rx.items.map((i) => i.drug).join(", ")}</p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Prescribed by {rx.prescribedBy} · {new Date(rx.receivedAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[var(--info-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--info-fg)]">{rx.status}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Lab Results */}
        {patientLabs.length > 0 && (
          <div className="lg:col-span-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
              <div className="flex items-center gap-2">
                <FlaskConical size={15} className="text-[var(--action-primary)]" />
                <p className="text-sm font-semibold text-[var(--text-primary)]">Recent Lab Results</p>
              </div>
              <Link href="/portal/records" className="text-xs font-medium text-[var(--action-primary)] hover:underline">
                View all
              </Link>
            </div>
            <div className="divide-y divide-[var(--border-default)]">
              {patientLabs.map((lab) => (
                <div key={lab.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-sunken)]">
                    <FlaskConical size={16} className="text-[var(--text-secondary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{lab.title}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{fmtDate(lab.orderedAt)} · {lab.orderedBy}</p>
                  </div>
                  {lab.result?.critical && (
                    <span className="shrink-0 rounded-full bg-[var(--critical-bg)] px-2 py-0.5 text-[10px] font-bold text-[var(--critical-fg)]">Critical</span>
                  )}
                  <span className="shrink-0 rounded-full bg-[var(--normal-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--normal-fg)]">{lab.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
