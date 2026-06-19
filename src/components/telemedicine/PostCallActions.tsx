"use client";

import { useRouter } from "next/navigation";
import { FileText, Pill, CalendarDays, LayoutDashboard } from "lucide-react";
import { useExaminationStore } from "@/store/useExaminationStore";

interface PostCallActionsProps {
  patientId: string;
  patientName: string;
  doctor: string;
  appointmentId?: string;
  onWritePrescription: () => void;
  onScheduleFollowUp: () => void;
  onReturnToDashboard: () => void;
}

export function PostCallActions({
  patientId,
  patientName,
  doctor,
  appointmentId,
  onWritePrescription,
  onScheduleFollowUp,
  onReturnToDashboard,
}: PostCallActionsProps) {
  const router = useRouter();
  const startExamination = useExaminationStore((s) => s.startExamination);

  function handleCreateExam() {
    const exam = startExamination({
      patientId,
      patientName,
      appointmentId,
      type: "Tele",
      doctor,
      dept: "General Medicine",
    });
    router.push(`/examination/${exam.id}`);
  }

  const actions = [
    {
      label: "Create Examination Note",
      desc: "Start a Tele exam note for this patient",
      icon: FileText,
      cls: "text-[var(--action-primary)] border-[var(--action-primary)] hover:bg-[var(--action-subtle)]",
      onClick: handleCreateExam,
    },
    {
      label: "Write E-Prescription",
      desc: "Add prescriptions to this consultation",
      icon: Pill,
      cls: "text-[var(--info-fg)] border-[var(--info-fg)] hover:bg-[var(--info-bg)]",
      onClick: onWritePrescription,
    },
    {
      label: "Schedule Follow-up",
      desc: "Book a follow-up Tele appointment",
      icon: CalendarDays,
      cls: "text-[var(--warning-fg)] border-[var(--warning-fg)] hover:bg-[var(--warning-bg)]",
      onClick: onScheduleFollowUp,
    },
    {
      label: "Return to Dashboard",
      desc: "Go back to telemedicine command center",
      icon: LayoutDashboard,
      cls: "text-[var(--text-secondary)] border-[var(--border-default)] hover:bg-[var(--surface-sunken)]",
      onClick: onReturnToDashboard,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <p className="mb-1 text-lg font-semibold text-[var(--text-primary)]">
        Call Completed
      </p>
      <p className="mb-6 text-sm text-[var(--text-secondary)]">
        Post-call actions for {patientName}
      </p>
      <div className="grid w-full max-w-sm grid-cols-1 gap-3 sm:grid-cols-2">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={a.onClick}
            className={`flex flex-col items-center gap-2 rounded-xl border bg-[var(--surface-raised)] p-4 text-center transition-colors ${a.cls}`}
          >
            <a.icon size={22} />
            <div>
              <p className="text-sm font-semibold">{a.label}</p>
              <p className="text-xs opacity-70">{a.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
