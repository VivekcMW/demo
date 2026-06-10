"use client";

import { useState, useCallback } from "react";
import {
  CalendarDays, Clock, UserX, Plus, ChevronLeft, ChevronRight,
  Video, Stethoscope, RefreshCw, CheckCircle2, XCircle, AlertCircle, FileText,
} from "lucide-react";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { NewAppointmentDrawer } from "@/components/appointments/NewAppointmentDrawer";
import { NewExaminationDrawer } from "@/components/examination/NewExaminationDrawer";
import { AppointmentToast } from "@/components/appointments/AppointmentToast";
import {
  type Appointment,
  type ApptStatus,
  type ApptType,
} from "@/data/seedAppointments";

function StatusChip({ status }: { status: ApptStatus }) {
  const map: Record<ApptStatus, string> = {
    "Scheduled":   "bg-[var(--info-bg)] text-[var(--info-fg)]",
    "In Progress": "bg-[var(--warning-bg)] text-[var(--warning-fg)] font-semibold",
    "Completed":   "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
    "Cancelled":   "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
    "No Show":     "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  };
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${map[status]}`}>
      {status}
    </span>
  );
}

function TypeBadge({ type }: { type: ApptType }) {
  const map: Record<ApptType, { cls: string; Icon: React.ElementType }> = {
    OPD:         { cls: "bg-[var(--info-bg)] text-[var(--info-fg)]",              Icon: Stethoscope },
    Tele:        { cls: "bg-[var(--action-subtle)] text-[var(--action-primary)]", Icon: Video },
    "Follow-up": { cls: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",Icon: RefreshCw },
  };
  const { cls, Icon } = map[type];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
      <Icon size={10} />{type}
    </span>
  );
}

const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function MiniCalendar({ selectedDate, apptDates, onSelect }: {
  selectedDate: string; apptDates: Set<string>; onSelect: (d: string) => void;
}) {
  const [viewYear,  setViewYear]  = useState(2026);
  const [viewMonth, setViewMonth] = useState(5);
  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const pad     = (n: number) => String(n).padStart(2, "0");
  const isoDate = (d: number) => `${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`;
  const today   = "2026-06-10";
  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => { if (viewMonth===0){setViewMonth(11);setViewYear(y=>y-1);}else setViewMonth(m=>m-1); }} className="rounded p-1 hover:bg-[var(--surface-sunken)] text-[var(--text-secondary)]"><ChevronLeft size={14}/></button>
        <span className="text-sm font-semibold text-[var(--text-primary)]">{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={() => { if (viewMonth===11){setViewMonth(0);setViewYear(y=>y+1);}else setViewMonth(m=>m+1); }} className="rounded p-1 hover:bg-[var(--surface-sunken)] text-[var(--text-secondary)]"><ChevronRight size={14}/></button>
      </div>
      <div className="grid grid-cols-7 mb-1">{DAYS.map((d)=>(<div key={d} className="text-center text-[10px] font-semibold uppercase text-[var(--text-secondary)] py-1">{d}</div>))}</div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i}/>;
          const iso=isoDate(day), isToday=iso===today, isSel=iso===selectedDate, hasAppts=apptDates.has(iso), isPast=iso<today;
          return (
            <button key={i} onClick={()=>onSelect(iso)} className={["relative flex flex-col items-center justify-center rounded-lg py-1.5 text-xs transition-colors",isSel?"bg-[var(--action-primary)] text-white font-semibold":isToday?"border border-[var(--action-primary)] text-[var(--action-primary)] font-semibold":isPast?"text-[var(--text-secondary)]":"text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]"].join(" ")}>
              {day}{hasAppts&&!isSel&&<span className="mt-0.5 h-1 w-1 rounded-full bg-[var(--action-primary)] opacity-70"/>}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-center text-xs text-[var(--text-secondary)]"><span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[var(--action-primary)]"/>has appointments</span></p>
    </div>
  );
}

type Tab = "today" | "upcoming" | "all";

export default function AppointmentsPage() {
  const appointments = useAppointmentStore((s) => s.appointments);
  const cancelAppt   = useAppointmentStore((s) => s.cancelAppointment);

  const [tab,          setTab]          = useState<Tab>("today");
  const [selectedDate, setSelectedDate] = useState("2026-06-10");
  const [drawerOpen,   setDrawerOpen]   = useState(false);
  const [toast,        setToast]        = useState({ show: false, message: "" });
  const [confirmCancel,setConfirmCancel]= useState<string | null>(null);

  const handleSuccess  = useCallback((msg: string) => setToast({ show: true, message: msg }), []);
  const [examPatient, setExamPatient] = useState<string | null>(null);

  const handleToastClose = useCallback(() => setToast({ show: false, message: "" }), []);

  const todayAppts    = appointments.filter((a) => a.date === "2026-06-10" && a.patient !== "Lunch Break");
  const upcomingAppts = appointments.filter((a) => a.date > "2026-06-10");
  const completed  = todayAppts.filter((a) => a.status === "Completed").length;
  const inProgress = todayAppts.filter((a) => a.status === "In Progress").length;
  const scheduled  = todayAppts.filter((a) => a.status === "Scheduled").length;
  const cancelled  = todayAppts.filter((a) => a.status === "Cancelled").length;
  const noShow     = todayAppts.filter((a) => a.status === "No Show").length;

  const groupedUpcoming: Record<string, Appointment[]> = {};
  upcomingAppts.forEach((a) => { if (!groupedUpcoming[a.date]) groupedUpcoming[a.date]=[]; groupedUpcoming[a.date].push(a); });

  const allSorted      = [...appointments].filter((a) => a.patient !== "Lunch Break").sort((a,b)=>`${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  const filteredByDate = allSorted.filter((a) => a.date === selectedDate);
  const apptDates      = new Set(appointments.map((a) => a.date));
  const cancellationLog= todayAppts.filter((a) => a.status === "Cancelled" || a.status === "No Show");
  const dayLabel       = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { weekday:"short", day:"numeric", month:"short" });

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Appointments</h1>
          <p className="text-sm text-[var(--text-secondary)]">Wednesday, 10 Jun 2026 · Dr. Ananya Sharma</p>
        </div>
        <button onClick={() => setDrawerOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 w-fit">
          <Plus size={15}/>New Appointment
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label:"Scheduled", value:scheduled+inProgress, sub:`${inProgress} in progress`, icon:CalendarDays, color:"var(--info-fg)" },
          { label:"Completed", value:completed,            sub:"on time today",              icon:CheckCircle2, color:"var(--normal-fg)" },
          { label:"Cancelled", value:cancelled,            sub:"today",                      icon:XCircle,      color:"var(--text-secondary)" },
          { label:"No Show",   value:noShow,               sub:"follow-up needed",           icon:UserX,        color:"var(--critical-fg)" },
        ].map((c)=>(
          <div key={c.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">{c.label}</p>
              <c.icon size={16} style={{color:c.color}}/>
            </div>
            <p className="mt-3 text-2xl font-semibold tabular-nums text-[var(--text-primary)]">{c.value}</p>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] p-1 w-fit">
        {(["today","upcoming","all"] as Tab[]).map((t)=>(
          <button key={t} onClick={()=>setTab(t)} className={["rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors",tab===t?"bg-[var(--surface-raised)] text-[var(--text-primary)] shadow-sm":"text-[var(--text-secondary)] hover:text-[var(--text-primary)]"].join(" ")}>
            {t==="today"?"Today":t==="upcoming"?`Upcoming (${upcomingAppts.length})`:"All"}
          </button>
        ))}
      </div>

      {/* TODAY */}
      {tab==="today"&&(
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)]">
            <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Today's Schedule</p>
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]"><Clock size={13}/><span>08:00–18:00</span></div>
            </div>
            <div className="divide-y divide-[var(--border-default)]">
              {[...todayAppts].sort((a,b)=>a.time.localeCompare(b.time)).map((appt)=>{
                const isActive=appt.status==="In Progress", isDone=appt.status==="Completed", isBad=appt.status==="Cancelled"||appt.status==="No Show";
                return (
                  <div key={appt.id} className={["flex items-center gap-3 px-5 py-3 transition-colors",isActive?"bg-[var(--warning-bg)]":"",isDone||isBad?"opacity-50":"hover:bg-[var(--surface-sunken)]"].join(" ")}>
                    <span className={["w-12 shrink-0 font-mono text-sm tabular-nums",isActive?"font-bold text-[var(--warning-fg)]":"text-[var(--text-secondary)]"].join(" ")}>{appt.time}</span>
                    <div className="mt-2 h-3 w-3 shrink-0 self-start rounded-full border-2" style={{borderColor:isActive?"var(--warning-fg)":isDone?"var(--normal-fg)":isBad?"var(--text-secondary)":"var(--action-primary)",background:isActive?"var(--warning-fg)":isDone?"var(--normal-fg)":"transparent"}}/>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={["text-sm font-medium",isDone||isBad?"line-through text-[var(--text-secondary)]":"text-[var(--text-primary)]"].join(" ")}>{appt.patient}</p>
                        <span className="text-xs text-[var(--text-secondary)]">{appt.age}y {appt.sex}</span>
                        <TypeBadge type={appt.type}/>
                      </div>
                      {appt.reason&&<p className="text-xs text-[var(--text-secondary)] mt-0.5"><AlertCircle size={10} className="inline mr-1"/>{appt.reason}</p>}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <StatusChip status={appt.status}/>
                      {(appt.status==="Scheduled"||appt.status==="In Progress")&&(
                        <button
                          onClick={() => setExamPatient(appt.patient)}
                          className="hidden sm:inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs text-[var(--action-primary)] border border-[var(--action-primary)] hover:bg-[var(--action-subtle)] transition-colors"
                        >
                          <FileText size={10}/> Examine
                        </button>
                      )}
                      {(appt.status==="Scheduled"||appt.status==="In Progress")&&(
                        <button onClick={()=>setConfirmCancel(appt.id)} className="hidden sm:inline-flex rounded px-2 py-0.5 text-xs text-[var(--critical-fg)] border border-[var(--critical-fg)] hover:bg-[var(--critical-bg)]">Cancel</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <MiniCalendar selectedDate={selectedDate} apptDates={apptDates} onSelect={(d)=>{setSelectedDate(d);setTab("all");}}/>
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
              <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Type breakdown</p>
              {(["OPD","Tele","Follow-up"] as ApptType[]).map((t)=>{
                const count=todayAppts.filter((a)=>a.type===t).length;
                const pct=todayAppts.length?Math.round((count/todayAppts.length)*100):0;
                return (<div key={t} className="mb-2 last:mb-0"><div className="flex justify-between text-xs mb-1"><span className="text-[var(--text-secondary)]">{t}</span><span className="font-medium tabular-nums text-[var(--text-primary)]">{count}</span></div><div className="h-1.5 w-full rounded-full bg-[var(--surface-sunken)]"><div className="h-1.5 rounded-full bg-[var(--action-primary)]" style={{width:`${pct}%`}}/></div></div>);
              })}
            </div>
          </div>
        </div>
      )}

      {/* UPCOMING */}
      {tab==="upcoming"&&(
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)]">
          <div className="border-b border-[var(--border-default)] px-5 py-3">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Upcoming — next 7 days</p>
            <p className="text-xs text-[var(--text-secondary)]">{upcomingAppts.length} appointments scheduled</p>
          </div>
          {Object.entries(groupedUpcoming).sort(([a],[b])=>a.localeCompare(b)).map(([date,appts])=>(
            <div key={date}>
              <div className="bg-[var(--surface-sunken)] px-5 py-2 border-b border-[var(--border-default)]"><p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">{dayLabel(date)}</p></div>
              <div className="divide-y divide-[var(--border-default)]">
                {[...appts].sort((a,b)=>a.time.localeCompare(b.time)).map((appt)=>(
                  <div key={appt.id} className="flex items-center gap-4 px-5 py-3 hover:bg-[var(--surface-sunken)]">
                    <span className="w-12 shrink-0 font-mono text-sm tabular-nums text-[var(--text-secondary)]">{appt.time}</span>
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium text-[var(--text-primary)]">{appt.patient}</p><p className="text-xs text-[var(--text-secondary)]">{appt.age}y {appt.sex} · {appt.dept}</p></div>
                    <TypeBadge type={appt.type}/><StatusChip status={appt.status}/>
                    <button onClick={()=>setConfirmCancel(appt.id)} className="hidden sm:inline-flex rounded px-2 py-0.5 text-xs text-[var(--critical-fg)] border border-[var(--critical-fg)] hover:bg-[var(--critical-bg)]">Cancel</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {Object.keys(groupedUpcoming).length===0&&(<div className="flex flex-col items-center justify-center py-16 text-[var(--text-secondary)]"><CalendarDays size={36} className="mb-3 opacity-30"/><p className="text-sm">No upcoming appointments</p></div>)}
        </div>
      )}

      {/* ALL */}
      {tab==="all"&&(
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)]">
            <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
              <p className="text-sm font-semibold text-[var(--text-primary)]">{dayLabel(selectedDate)}</p>
              <span className="text-xs text-[var(--text-secondary)]">{filteredByDate.length} appointments</span>
            </div>
            {filteredByDate.length===0?(
              <div className="flex flex-col items-center justify-center py-16 text-[var(--text-secondary)]">
                <CalendarDays size={36} className="mb-3 opacity-30"/><p className="text-sm">No appointments on this date</p>
                <button onClick={()=>setDrawerOpen(true)} className="mt-3 inline-flex items-center gap-1.5 text-xs text-[var(--action-primary)] hover:underline"><Plus size={12}/>Book one</button>
              </div>
            ):(
              <div className="divide-y divide-[var(--border-default)]">
                {filteredByDate.map((appt)=>(
                  <div key={appt.id} className={["flex items-center gap-4 px-5 py-3 hover:bg-[var(--surface-sunken)]",appt.status==="Completed"||appt.status==="Cancelled"||appt.status==="No Show"?"opacity-60":""].join(" ")}>
                    <span className="w-12 shrink-0 font-mono text-sm tabular-nums text-[var(--text-secondary)]">{appt.time}</span>
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium text-[var(--text-primary)]">{appt.patient}</p><p className="text-xs text-[var(--text-secondary)]">{appt.age}y {appt.sex}</p></div>
                    <TypeBadge type={appt.type}/><StatusChip status={appt.status}/>
                  </div>
                ))}
              </div>
            )}
          </div>
          <MiniCalendar selectedDate={selectedDate} apptDates={apptDates} onSelect={setSelectedDate}/>
        </div>
      )}

      {/* CANCELLATION LOG */}
      {cancellationLog.length>0&&(
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)]">
          <div className="flex items-center gap-2 border-b border-[var(--border-default)] px-5 py-3">
            <UserX size={15} className="text-[var(--warning-fg)]"/>
            <div><p className="text-sm font-semibold text-[var(--text-primary)]">Cancellations &amp; No-shows</p><p className="text-xs text-[var(--text-secondary)]">Today — requires follow-up call</p></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">{["Time","Patient","Age / Sex","Type","Reason","Status"].map((h)=>(<th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[var(--text-secondary)]">{h}</th>))}</tr></thead>
              <tbody>
                {cancellationLog.map((a)=>(
                  <tr key={a.id} className={["border-b border-[var(--border-default)] last:border-0",a.status==="No Show"?"bg-[var(--critical-bg)]":""].join(" ")}>
                    <td className="px-4 py-2.5 font-mono text-xs text-[var(--text-secondary)]">{a.time}</td>
                    <td className="px-4 py-2.5 font-medium text-[var(--text-primary)]">{a.patient}</td>
                    <td className="px-4 py-2.5 text-xs text-[var(--text-secondary)]">{a.age}y {a.sex}</td>
                    <td className="px-4 py-2.5"><TypeBadge type={a.type}/></td>
                    <td className="px-4 py-2.5 text-xs text-[var(--text-secondary)]">{a.reason??"—"}</td>
                    <td className="px-4 py-2.5"><StatusChip status={a.status}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONFIRM CANCEL */}
      {confirmCancel&&(
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={()=>setConfirmCancel(null)}/>
          <div className="fixed left-1/2 top-1/2 z-50 w-80 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-xl">
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Cancel appointment?</p>
            <p className="text-xs text-[var(--text-secondary)] mb-5">This will mark the appointment as Cancelled.</p>
            <div className="flex gap-2">
              <button onClick={()=>setConfirmCancel(null)} className="flex-1 rounded-lg border border-[var(--border-default)] py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">Keep</button>
              <button onClick={()=>{cancelAppt(confirmCancel,"Cancelled by staff");setConfirmCancel(null);}} className="flex-1 rounded-lg bg-[var(--critical-fg)] py-2 text-sm font-semibold text-white hover:opacity-90">Yes, Cancel</button>
            </div>
          </div>
        </>
      )}

      <NewAppointmentDrawer open={drawerOpen} onClose={()=>setDrawerOpen(false)} onSuccess={handleSuccess} preselectedDate={selectedDate}/>
      <AppointmentToast show={toast.show} message={toast.message} onClose={handleToastClose}/>
      {examPatient !== null && (
        <NewExaminationDrawer
          open
          onClose={() => setExamPatient(null)}
          prefillPatientName={examPatient}
        />
      )}
    </div>
  );
}
