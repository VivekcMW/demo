"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  Phone,
  PhoneOff,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  MessageSquare,
  Pill,
  Clock,
  CalendarDays,
  Plus,
  Activity,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User,
  Play,
} from "lucide-react";
import { useTelemedicineStore } from "@/store/useTelemedicineStore";
import type { CallStatus } from "@/data/seedTelemedicine";
import type { Teleconsultation } from "@/store/useTelemedicineStore";
import { PrescriptionForm } from "@/components/telemedicine/PrescriptionForm";
import { PostCallActions } from "@/components/telemedicine/PostCallActions";

// ── Helpers ────────────────────────────────────────────────────────────────────

const NOW = "2026-06-10T14:00:00";

function timeStr(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function waitMinutes(scheduledAt: string) {
  const diff = new Date(NOW).getTime() - new Date(scheduledAt).getTime();
  return Math.max(0, Math.floor(diff / 60000));
}

function todayDate() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── StatusBadge ────────────────────────────────────────────────────────────────

const STATUS_CLS: Record<CallStatus, string> = {
  Scheduled: "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Ringing: "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  "In-Progress": "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  Completed: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Missed: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  Cancelled: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

function CallBadge({ status }: { status: CallStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLS[status]}`}
    >
      {status}
    </span>
  );
}

// ── KPI Card ───────────────────────────────────────────────────────────────────

function KpiStat({
  label,
  value,
  sub,
  icon: Icon,
  color,
}: {
  label: string;
  value: number | string;
  sub?: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
          {label}
        </p>
        <Icon size={16} style={{ color }} />
      </div>
      <p className="mt-3 text-2xl font-semibold tabular-nums text-[var(--text-primary)]">
        {value}
      </p>
      {sub && (
        <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{sub}</p>
      )}
    </div>
  );
}

// ── Video Call Interface ───────────────────────────────────────────────────────

function CallTimer({ startedAt }: { startedAt: string }) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const start = new Date(startedAt).getTime();
    setElapsed(Math.floor((Date.now() - start) / 1000));
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [startedAt]);
  return <span className="font-mono">{formatDuration(elapsed)}</span>;
}

function QualityIndicator() {
  const bars = useMemo(() => {
    const n = Math.random();
    return n > 0.7 ? "Good" : n > 0.3 ? "Fair" : "Poor";
  }, []);
  const cls =
    bars === "Good"
      ? "text-[var(--normal-fg)]"
      : bars === "Fair"
        ? "text-[var(--warning-fg)]"
        : "text-[var(--critical-fg)]";
  return (
    <span className={`text-xs font-medium ${cls}`}>
      {bars === "Good"
        ? "●●●"
        : bars === "Fair"
          ? "●●○"
          : "●○○"}{" "}
      {bars}
    </span>
  );
}

function VideoCall({
  consultation,
  onEnd,
  onToggleVideo,
  onToggleAudio,
  onToggleRecording,
  onToggleScreenShare,
  onShowNotes,
  onShowPrescribe,
}: {
  consultation: Teleconsultation;
  onEnd: () => void;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
  onToggleRecording: () => void;
  onToggleScreenShare: () => void;
  onShowNotes: () => void;
  onShowPrescribe: () => void;
}) {
  const btnCls =
    "flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--surface-raised)] text-[var(--text-primary)] hover:bg-[var(--surface-sunken)] transition-colors";
  return (
    <div className="flex h-full flex-col">
      {/* Timer bar */}
      <div className="flex items-center justify-between border-b border-[var(--border-default)] px-4 py-2">
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
          <Activity size={14} className="text-[var(--action-primary)]" />
          <CallTimer startedAt={consultation.callStartedAt!} />
          {consultation.isRecording && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--critical-bg)] px-2 py-0.5 text-[10px] font-bold text-[var(--critical-fg)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--critical-fg)] animate-pulse" />
              REC
            </span>
          )}
          {consultation.screenShare && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--info-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--info-fg)]">
              <MonitorOff size={10} />
              Sharing
            </span>
          )}
        </div>
        <QualityIndicator />
      </div>

      {/* Video area */}
      <div className="relative flex-1 bg-black/80">
        {/* Remote video placeholder */}
        <div className="flex h-full items-center justify-center">
          <div className="text-center text-white/40">
            <User size={64} className="mx-auto mb-3 opacity-30" />
            <p className="text-lg font-semibold">
              {consultation.patientName}
            </p>
            <p className="text-sm opacity-50">Connected</p>
          </div>
        </div>

        {/* Self view PIP */}
        <div className="absolute bottom-4 right-4 h-28 w-36 rounded-lg border-2 border-white/30 bg-black/60 flex items-center justify-center">
          {consultation.screenShare ? (
            <div className="text-center text-white/40">
              <MonitorOff size={20} className="mx-auto mb-1" />
              <span className="text-[9px]">Your Screen</span>
            </div>
          ) : consultation.videoEnabled ? (
            <Video size={24} className="text-white/40" />
          ) : (
            <VideoOff size={24} className="text-[var(--critical-fg)]" />
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 border-t border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-3">
        <button
          onClick={onToggleAudio}
          className={`${btnCls} ${consultation.audioEnabled ? "" : "bg-[var(--critical-bg)] text-[var(--critical-fg)] border-[var(--critical-fg)]"}`}
          title={consultation.audioEnabled ? "Mute" : "Unmute"}
        >
          {consultation.audioEnabled ? <Mic size={16} /> : <MicOff size={16} />}
        </button>
        <button
          onClick={onToggleVideo}
          className={`${btnCls} ${consultation.videoEnabled ? "" : "bg-[var(--critical-bg)] text-[var(--critical-fg)] border-[var(--critical-fg)]"}`}
          title={consultation.videoEnabled ? "Camera Off" : "Camera On"}
        >
          {consultation.videoEnabled ? (
            <Video size={16} />
          ) : (
            <VideoOff size={16} />
          )}
        </button>
        <button
          onClick={onEnd}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--critical-fg)] text-white hover:opacity-90 transition-opacity"
          title="End Call"
        >
          <PhoneOff size={16} />
        </button>
        <button
          onClick={onToggleRecording}
          className={`${btnCls} ${consultation.isRecording ? "bg-[var(--critical-bg)] text-[var(--critical-fg)] border-[var(--critical-fg)]" : ""}`}
          title={consultation.isRecording ? "Stop Recording" : "Record"}
        >
          <Monitor size={16} />
        </button>
        <button
          onClick={onToggleScreenShare}
          className={`${btnCls} ${consultation.screenShare ? "bg-[var(--info-bg)] text-[var(--info-fg)] border-[var(--info-fg)]" : ""}`}
          title={consultation.screenShare ? "Stop Sharing" : "Share Screen"}
        >
          {consultation.screenShare ? <MonitorOff size={16} /> : <Monitor size={16} />}
        </button>
        <button
          onClick={onShowNotes}
          className={btnCls}
          title="Notes"
        >
          <MessageSquare size={16} />
        </button>
        <button
          onClick={onShowPrescribe}
          className={btnCls}
          title="Prescribe"
        >
          <Pill size={16} />
        </button>
      </div>

      {/* Participant info */}
      <div className="flex items-center justify-between border-t border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
          <User size={12} />
          <span className="font-medium text-[var(--text-primary)]">
            {consultation.patientName}
          </span>
          <span>·</span>
          <span>{consultation.reason}</span>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function TelemedicinePage() {
  const consultations = useTelemedicineStore((s) => s.consultations);
  const activeCallId = useTelemedicineStore((s) => s.activeCallId);
  const startCall = useTelemedicineStore((s) => s.startCall);
  const endCall = useTelemedicineStore((s) => s.endCall);
  const toggleVideo = useTelemedicineStore((s) => s.toggleVideo);
  const toggleAudio = useTelemedicineStore((s) => s.toggleAudio);
  const toggleRecording = useTelemedicineStore((s) => s.toggleRecording);
  const toggleScreenShare = useTelemedicineStore((s) => s.toggleScreenShare);
  const addPrescription = useTelemedicineStore((s) => s.addPrescription);
  const removePrescription = useTelemedicineStore((s) => s.removePrescription);
  const getWaitingRoom = useTelemedicineStore((s) => s.getWaitingRoom);
  const getStats = useTelemedicineStore((s) => s.getStats);
  const getTodayConsultations = useTelemedicineStore(
    (s) => s.getTodayConsultations
  );
  const getById = useTelemedicineStore((s) => s.getById);
  const addConsultation = useTelemedicineStore((s) => s.addConsultation);

  const [showPrescribe, setShowPrescribe] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notesText, setNotesText] = useState("");
  const [showPostCall, setShowPostCall] = useState(false);
  const [showNewConsult, setShowNewConsult] = useState(false);
  const [newPatient, setNewPatient] = useState("");
  const [newReason, setNewReason] = useState("");

  const waiting = useMemo(() => getWaitingRoom(), [getWaitingRoom, consultations]);
  const stats = useMemo(() => getStats(), [getStats, consultations]);
  const todayList = useMemo(
    () => getTodayConsultations(),
    [getTodayConsultations, consultations]
  );
  const activeConsultation = activeCallId ? getById(activeCallId) : null;

  // Detect call ended
  const prevActive = useMemo(() => activeCallId, [activeCallId]);
  useEffect(() => {
    if (prevActive && !activeCallId && !showPostCall) {
      setShowPostCall(true);
    }
  }, [prevActive, activeCallId, showPostCall]);

  const handleEndCall = useCallback(() => {
    if (activeCallId) {
      endCall(activeCallId);
    }
  }, [activeCallId, endCall]);

  const handleStartCall = useCallback(
    (id: string) => {
      setShowPostCall(false);
      startCall(id);
    },
    [startCall]
  );

  const handleAddPrescription = useCallback(
    (rx: Parameters<typeof addPrescription>[1]) => {
      if (activeCallId) addPrescription(activeCallId, rx);
    },
    [activeCallId, addPrescription]
  );

  const handleRemovePrescription = useCallback(
    (rxId: string) => {
      if (activeCallId) removePrescription(activeCallId, rxId);
    },
    [activeCallId, removePrescription]
  );

  const handleNewConsult = useCallback(() => {
    if (!newPatient.trim() || !newReason.trim()) return;
    addConsultation({
      patientId: "PT-0000",
      patientName: newPatient.trim(),
      doctor: "Dr. Ananya Krishnan",
      scheduledAt: NOW,
      scheduledDuration: 15,
      reason: newReason.trim(),
    });
    setNewPatient("");
    setNewReason("");
    setShowNewConsult(false);
  }, [newPatient, newReason, addConsultation]);

  function handleReturnToDashboard() {
    setShowPostCall(false);
  }

  const sortedToday = [...todayList].sort(
    (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
  );

  const inputCls =
    "w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] placeholder:text-[var(--text-secondary)]";

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">
            Telemedicine
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            {todayDate()} · Video consultation command center
          </p>
        </div>
        <button
          onClick={() => setShowNewConsult(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 w-fit"
        >
          <Plus size={15} /> Start a Consultation
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <KpiStat
          label="Pending"
          value={stats.pending}
          sub="waiting"
          icon={Users}
          color="var(--info-fg)"
        />
        <KpiStat
          label="In Progress"
          value={stats.inProgress}
          icon={Activity}
          color="var(--action-primary)"
        />
        <KpiStat
          label="Completed Today"
          value={stats.completed}
          icon={CheckCircle2}
          color="var(--normal-fg)"
        />
        <KpiStat
          label="Missed / Avg Wait"
          value={stats.missed}
          sub={`~${stats.averageWaitMinutes} min avg wait`}
          icon={Clock}
          color="var(--critical-fg)"
        />
      </div>

      {/* Three-column layout */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* ─── Left Column: Waiting Room ─── */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)]">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              Waiting Room
            </p>
            <span className="text-xs text-[var(--text-secondary)]">
              {waiting.length} waiting
            </span>
          </div>
          {waiting.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users
                size={36}
                className="mb-3 text-[var(--text-secondary)] opacity-20"
              />
              <p className="text-sm text-[var(--text-secondary)]">
                No patients waiting
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                All consultations are attended
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border-default)]">
              {waiting.map((c) => {
                const wm = waitMinutes(c.scheduledAt);
                return (
                  <div
                    key={c.id}
                    className="flex flex-col gap-2 px-5 py-4 hover:bg-[var(--surface-sunken)] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {c.patientName}
                      </p>
                      <CallBadge status={c.callStatus} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                      <span className="inline-flex items-center gap-1">
                        <Clock size={11} />
                        {timeStr(c.scheduledAt)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <AlertCircle size={11} />
                        {c.reason}
                      </span>
                    </div>
                    {wm > 0 && (
                      <p className="text-xs text-[var(--warning-fg)] font-medium">
                        Waiting {wm} min
                      </p>
                    )}
                    <button
                      onClick={() => handleStartCall(c.id)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--action-primary)] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 w-fit"
                    >
                      <Play size={12} /> Start Call
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ─── Center Column: Active Call / No Call ─── */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] min-h-[400px] flex flex-col">
          {activeConsultation ? (
            showPrescribe ? (
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    E-Prescription
                  </p>
                  <button
                    onClick={() => setShowPrescribe(false)}
                    className="rounded-lg px-3 py-1 text-xs font-medium text-[var(--action-primary)] border border-[var(--action-primary)] hover:bg-[var(--action-subtle)]"
                  >
                    Back to Call
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <PrescriptionForm
                    prescriptions={activeConsultation.prescriptions}
                    onAdd={handleAddPrescription}
                    onRemove={handleRemovePrescription}
                    onClose={() => setShowPrescribe(false)}
                  />
                </div>
              </div>
            ) : showNotes ? (
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Consultation Notes
                  </p>
                  <button
                    onClick={() => setShowNotes(false)}
                    className="rounded-lg px-3 py-1 text-xs font-medium text-[var(--action-primary)] border border-[var(--action-primary)] hover:bg-[var(--action-subtle)]"
                  >
                    Back to Call
                  </button>
                </div>
                <div className="flex-1 p-4">
                  <textarea
                    className="h-full w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] p-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                    placeholder="Type consultation notes here..."
                    value={notesText}
                    onChange={(e) => setNotesText(e.target.value)}
                  />
                </div>
              </div>
            ) : showPostCall ? (
              <div className="flex-1 p-6">
                <PostCallActions
                  patientId={activeConsultation.patientId}
                  patientName={activeConsultation.patientName}
                  doctor={activeConsultation.doctor}
                  appointmentId={activeConsultation.appointmentId}
                  onWritePrescription={() => setShowPrescribe(true)}
                  onScheduleFollowUp={() => {
                    alert("Follow-up booking flow would open here.");
                  }}
                  onReturnToDashboard={handleReturnToDashboard}
                />
              </div>
            ) : (
              <VideoCall
                consultation={activeConsultation}
                onEnd={handleEndCall}
                onToggleVideo={() => toggleVideo(activeCallId!)}
                onToggleAudio={() => toggleAudio(activeCallId!)}
                onToggleRecording={() => toggleRecording(activeCallId!)}
                onToggleScreenShare={() => toggleScreenShare(activeCallId!)}
                onShowNotes={() => setShowNotes(true)}
                onShowPrescribe={() => setShowPrescribe(true)}
              />
            )
          ) : (
            /* No active call */
            <div className="flex flex-1 flex-col items-center justify-center p-6">
              <Phone
                size={48}
                className="mb-4 text-[var(--text-secondary)] opacity-20"
              />
              <p className="text-base font-semibold text-[var(--text-primary)]">
                No Active Call
              </p>
              <p className="mb-6 text-sm text-[var(--text-secondary)] text-center max-w-xs">
                Select a patient from the waiting room or start a new consultation
              </p>
              <div className="grid w-full max-w-xs grid-cols-1 gap-2">
                {[
                  {
                    label: "View Schedule",
                    desc: "See today&apos;s timeline",
                    icon: CalendarDays,
                  },
                  {
                    label: "Call History",
                    desc: "Review past consultations",
                    icon: Clock,
                  },
                ].map((a) => (
                  <button
                    key={a.label}
                    className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-3 text-left hover:bg-[var(--surface-sunken)] transition-colors"
                  >
                    <a.icon
                      size={18}
                      className="text-[var(--action-primary)]"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {a.label}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {a.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              {stats.totalToday > 0 && (
                <div className="mt-6 w-full max-w-xs rounded-xl bg-[var(--surface-sunken)] p-3">
                  <p className="mb-1.5 text-xs font-medium text-[var(--text-secondary)]">
                    Today&apos;s Summary
                  </p>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-secondary)]">Total</span>
                    <span className="font-medium text-[var(--text-primary)]">
                      {stats.totalToday}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-secondary)]">Completed</span>
                    <span className="font-medium text-[var(--normal-fg)]">
                      {stats.completed}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-secondary)]">In Progress</span>
                    <span className="font-medium text-[var(--action-primary)]">
                      {stats.inProgress}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-secondary)]">Missed</span>
                    <span className="font-medium text-[var(--critical-fg)]">
                      {stats.missed}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ─── Right Column: Today's Schedule ─── */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)]">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              Today&apos;s Schedule
            </p>
            <span className="text-xs text-[var(--text-secondary)]">
              {sortedToday.length} calls
            </span>
          </div>
          {sortedToday.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarDays
                size={36}
                className="mb-3 text-[var(--text-secondary)] opacity-20"
              />
              <p className="text-sm text-[var(--text-secondary)]">
                No consultations scheduled
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border-default)]">
              {sortedToday.map((c, i) => {
                const isActive = c.callStatus === "In-Progress";
                const isDone = c.callStatus === "Completed";
                const isBad =
                  c.callStatus === "Missed" || c.callStatus === "Cancelled";
                return (
                  <div
                    key={c.id}
                    className={`flex items-center gap-3 px-5 py-3 transition-colors ${
                      isActive ? "bg-[var(--warning-bg)]" : ""
                    } ${isDone || isBad ? "opacity-50" : "hover:bg-[var(--surface-sunken)]"}`}
                  >
                    <div className="flex flex-col items-center">
                      <span
                        className={`w-16 shrink-0 font-mono text-xs tabular-nums ${
                          isActive
                            ? "font-bold text-[var(--warning-fg)]"
                            : "text-[var(--text-secondary)]"
                        }`}
                      >
                        {timeStr(c.scheduledAt)}
                      </span>
                      <span className="text-[10px] text-[var(--text-secondary)]">
                        {c.scheduledDuration} min
                      </span>
                    </div>
                    <div className="flex h-full flex-col items-center">
                      <div
                        className={`h-4 w-0.5 ${
                          i === 0
                            ? "opacity-0"
                            : isActive
                              ? "bg-[var(--warning-fg)]"
                              : isDone
                                ? "bg-[var(--normal-fg)]"
                                : "bg-[var(--border-default)]"
                        }`}
                      />
                      <div
                        className={`h-2.5 w-2.5 shrink-0 rounded-full border-2 ${
                          isActive
                            ? "border-[var(--warning-fg)] bg-[var(--warning-fg)]"
                            : isDone
                              ? "border-[var(--normal-fg)] bg-[var(--normal-fg)]"
                              : isBad
                                ? "border-[var(--text-secondary)]"
                                : "border-[var(--action-primary)]"
                        }`}
                      />
                      <div
                        className={`flex-1 w-0.5 ${
                          i === sortedToday.length - 1
                            ? "opacity-0"
                            : isActive
                              ? "bg-[var(--warning-fg)]"
                              : isDone
                                ? "bg-[var(--normal-fg)]"
                                : "bg-[var(--border-default)]"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium ${
                          isDone || isBad
                            ? "line-through text-[var(--text-secondary)]"
                            : "text-[var(--text-primary)]"
                        }`}
                      >
                        {c.patientName}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] truncate">
                        {c.reason}
                      </p>
                    </div>
                    <CallBadge status={c.callStatus} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ─── New Consultation Modal ─── */}
      {showNewConsult && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setShowNewConsult(false)}
          />
          <div className="fixed left-1/2 top-1/2 z-50 w-96 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-xl">
            <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">
              Start a New Consultation
            </p>
            <p className="mb-4 text-xs text-[var(--text-secondary)]">
              Schedule an ad-hoc tele-consultation
            </p>
            <div className="space-y-3">
              <input
                className={inputCls}
                placeholder="Patient name"
                value={newPatient}
                onChange={(e) => setNewPatient(e.target.value)}
              />
              <input
                className={inputCls}
                placeholder="Reason for consultation"
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
              />
            </div>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setShowNewConsult(false)}
                className="flex-1 rounded-lg border border-[var(--border-default)] py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
              >
                Cancel
              </button>
              <button
                onClick={handleNewConsult}
                disabled={!newPatient.trim() || !newReason.trim()}
                className="flex-1 rounded-lg bg-[var(--action-primary)] py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-40"
              >
                Start
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
