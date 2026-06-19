"use client";

import { useState } from "react";
import {
  Scissors,
  Users,
  Activity,
  Calendar,
  IndianRupee,
  ChevronRight,
  Bell,
  Search,
  Settings,
  LayoutDashboard,
  FileText,
  HelpCircle,
  ChevronDown,
  TrendingUp,
  AlertCircle,
  BedDouble,
  Siren,
  ClipboardCheck,
} from "lucide-react";
import { TrendChart } from "@/components/marketing/specialty";
import { generalSurgeryDashboardData } from "@/data/seeded/general-surgery";

function getQueueStatusClasses(status: string): string {
  if (status === "in-progress") return "bg-green-100 text-green-700";
  if (status === "waiting") return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-600";
}

function getOtStatusClasses(status: string): string {
  if (status === "completed") return "bg-green-100 text-green-700";
  if (status === "in-progress") return "bg-blue-100 text-blue-700";
  return "bg-gray-100 text-gray-600";
}

function getSurgeryBorderClasses(status: string): string {
  if (status === "in-progress") return "border-blue-200 bg-blue-50";
  if (status === "completed") return "border-green-200 bg-green-50";
  return "border-gray-100 bg-gray-50";
}

function getPatientBorderClasses(status: string, priority?: string): string {
  if (status === "in-progress") return "border-green-200 bg-green-50";
  if (priority === "urgent") return "border-red-200 bg-red-50";
  return "border-gray-100 bg-gray-50";
}

function getWardStatusClasses(status: string): string {
  if (status === "stable") return "bg-green-100 text-green-700";
  if (status === "critical") return "bg-red-100 text-red-700";
  return "bg-amber-100 text-amber-700";
}

function getEmergencyStatusClasses(status: string): string {
  if (status === "admitted") return "bg-blue-100 text-blue-700";
  if (status === "post-op") return "bg-green-100 text-green-700";
  if (status === "transferred") return "bg-purple-100 text-purple-700";
  return "bg-gray-100 text-gray-600";
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "OPD Queue", badge: "4" },
  { icon: Scissors, label: "OT Schedule", badge: "8" },
  { icon: BedDouble, label: "Ward", badge: "18" },
  { icon: Siren, label: "Emergency", badge: "2" },
  { icon: ClipboardCheck, label: "Post-Op" },
  { icon: Calendar, label: "Follow-ups" },
  { icon: FileText, label: "Reports" },
];

interface StatProps {
  readonly title: string;
  readonly value: string | number;
  readonly icon: React.ReactNode;
  readonly trend?: string;
  readonly highlight?: boolean;
  readonly alert?: boolean;
}

function getStatBgClasses(alert?: boolean, highlight?: boolean): string {
  if (alert) return "bg-red-50 border-red-200";
  if (highlight) return "bg-emerald-50 border-emerald-200";
  return "bg-white border-gray-200";
}

function getStatValueClasses(alert?: boolean, highlight?: boolean): string {
  if (alert) return "text-red-700";
  if (highlight) return "text-emerald-700";
  return "text-gray-900";
}

function Stat({ title, value, icon, trend, highlight, alert }: StatProps) {
  const bgClass = getStatBgClasses(alert, highlight);
  const valueClass = getStatValueClasses(alert, highlight);

  return (
    <div className={`p-3 rounded-lg border ${bgClass}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-gray-500 uppercase tracking-wide">{title}</span>
        {icon}
      </div>
      <p className={`text-xl font-bold ${valueClass}`}>{value}</p>
      {trend && (
        <div className="flex items-center gap-1 mt-0.5">
          <TrendingUp className="w-3 h-3 text-green-600" />
          <span className="text-[10px] text-green-600 font-medium">{trend}</span>
        </div>
      )}
    </div>
  );
}

export function GeneralSurgeryDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const data = generalSurgeryDashboardData;

  return (
    <div className="rounded-xl overflow-hidden border border-gray-300 shadow-2xl bg-gray-100">
      {/* Browser Chrome */}
      <div className="bg-gray-200 px-4 py-2.5 flex items-center gap-3 border-b border-gray-300">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white rounded-md px-4 py-1.5 text-xs text-gray-600 flex items-center gap-2 min-w-70 sm:min-w-85">
            <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="truncate">app.aarogyaehr.com/surgery/dashboard</span>
          </div>
        </div>
        <div className="w-12" />
      </div>

      {/* App Shell */}
      <div className="flex h-170 bg-white">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden md:flex w-52 bg-slate-900 text-white flex-col shrink-0">
          {/* Logo */}
          <div className="p-3 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Scissors className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-xs">AarogyaEHR</p>
                <p className="text-[9px] text-slate-400">General Surgery</p>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveNav(item.label)}
                  className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded ${isActive ? "bg-white/20" : "bg-slate-700"}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="p-2 border-t border-slate-700 space-y-0.5">
            <button type="button" className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-slate-300 hover:bg-slate-800 hover:text-white">
              <Settings className="w-3.5 h-3.5" />
              Settings
            </button>
            <button type="button" className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-slate-300 hover:bg-slate-800 hover:text-white">
              <HelpCircle className="w-3.5 h-3.5" />
              Help
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Bar */}
          <div className="h-11 bg-white border-b border-gray-200 px-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="md:hidden w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Scissors className="w-4 h-4 text-white" />
              </div>
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-8 pr-3 py-1 text-xs rounded-md border border-gray-200 bg-gray-50 w-44 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[10px] text-gray-500">
                Tue, 17 Jun
              </span>
              <button type="button" className="relative p-1.5 rounded-md hover:bg-gray-100">
                <Bell className="w-4 h-4 text-gray-600" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-1.5 pl-2 border-l border-gray-200">
                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] font-semibold">
                  AM
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-gray-900 leading-tight">Dr. Ajay Mehta</p>
                  <p className="text-[9px] text-gray-500 leading-tight">Gen Surgeon</p>
                </div>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
            <div className="space-y-3">
              {/* Page Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-sm font-semibold text-gray-900">Surgery Dashboard</h1>
                  <p className="text-[10px] text-gray-500">Today&apos;s overview</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-medium">
                    <Scissors className="w-3 h-3" />
                    {data.otSchedule.inProgress} OT in progress
                  </span>
                  {data.wardCensus.criticalPatients > 0 && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-medium">
                      <AlertCircle className="w-3 h-3" />
                      {data.wardCensus.criticalPatients} critical
                    </span>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                <Stat
                  title="OPD"
                  value={data.todayStats.opdPatients}
                  icon={<Users className="w-3.5 h-3.5 text-emerald-600" />}
                />
                <Stat
                  title="Surgeries"
                  value={data.todayStats.surgeries}
                  icon={<Scissors className="w-3.5 h-3.5 text-blue-600" />}
                  highlight
                />
                <Stat
                  title="Emergency"
                  value={data.todayStats.emergencies}
                  icon={<Siren className="w-3.5 h-3.5 text-red-600" />}
                  alert={data.todayStats.emergencies > 2}
                />
                <Stat
                  title="New"
                  value={data.todayStats.newPatients}
                  icon={<Activity className="w-3.5 h-3.5 text-green-600" />}
                />
                <Stat
                  title="Follow-ups"
                  value={data.todayStats.followUps}
                  icon={<Calendar className="w-3.5 h-3.5 text-purple-600" />}
                />
                <Stat
                  title="Admitted"
                  value={data.todayStats.admissions}
                  icon={<BedDouble className="w-3.5 h-3.5 text-teal-600" />}
                />
                <Stat
                  title="Discharged"
                  value={data.todayStats.discharges}
                  icon={<Activity className="w-3.5 h-3.5 text-gray-600" />}
                />
                <Stat
                  title="Revenue"
                  value={`₹${(data.todayStats.revenue / 100000).toFixed(1)}L`}
                  icon={<IndianRupee className="w-3.5 h-3.5 text-emerald-600" />}
                />
              </div>

              {/* Main Grid */}
              <div className="grid lg:grid-cols-2 gap-3">
                {/* Left Column */}
                <div className="space-y-3">
                  {/* OT Schedule */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Scissors className="w-3.5 h-3.5 text-blue-600" />
                        OT Schedule
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] rounded bg-blue-100 text-blue-700">
                          {data.otSchedule.completed}/{data.otSchedule.totalSlots} done
                        </span>
                      </h4>
                      <button type="button" className="text-[10px] text-emerald-600 hover:underline flex items-center gap-0.5">
                        View all <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {data.otSchedule.surgeries.slice(0, 4).map((surgery) => (
                        <div
                          key={surgery.id}
                          className={`p-2 rounded-md border ${getSurgeryBorderClasses(surgery.status)}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-gray-500 w-16">{surgery.time}</span>
                              <span className="text-xs font-medium">{surgery.patient}</span>
                              <span className="text-[10px] text-gray-400">{surgery.age}y</span>
                            </div>
                            <span className={`px-1.5 py-0.5 text-[9px] rounded capitalize ${getOtStatusClasses(surgery.status)}`}>
                              {surgery.status === "in-progress" ? "In Progress" : surgery.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-gray-600">
                            <span className="truncate max-w-48">{surgery.procedure}</span>
                            <span className="text-gray-400">{surgery.surgeon}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ward Census */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <BedDouble className="w-3.5 h-3.5 text-teal-600" />
                        Ward Census
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] rounded bg-teal-100 text-teal-700">
                          {data.wardCensus.occupied}/{data.wardCensus.totalBeds} beds
                        </span>
                      </h4>
                    </div>

                    {/* Bed Summary */}
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      <div className="text-center p-1.5 rounded bg-blue-50">
                        <p className="text-sm font-bold text-blue-700">{data.wardCensus.postOp}</p>
                        <p className="text-[8px] text-blue-600">Post-Op</p>
                      </div>
                      <div className="text-center p-1.5 rounded bg-amber-50">
                        <p className="text-sm font-bold text-amber-700">{data.wardCensus.preOp}</p>
                        <p className="text-[8px] text-amber-600">Pre-Op</p>
                      </div>
                      <div className="text-center p-1.5 rounded bg-gray-50">
                        <p className="text-sm font-bold text-gray-700">{data.wardCensus.observation}</p>
                        <p className="text-[8px] text-gray-600">Obs</p>
                      </div>
                      <div className="text-center p-1.5 rounded bg-red-50">
                        <p className="text-sm font-bold text-red-700">{data.wardCensus.criticalPatients}</p>
                        <p className="text-[8px] text-red-600">Critical</p>
                      </div>
                    </div>

                    {/* Patient List */}
                    <div className="space-y-1">
                      {data.wardCensus.patients.map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between py-1.5 px-2 rounded bg-gray-50 text-[10px]">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-emerald-600 font-medium">{patient.bed}</span>
                            <span className="text-gray-700">{patient.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 truncate max-w-24">{patient.diagnosis}</span>
                            <span className={`px-1.5 py-0.5 rounded ${getWardStatusClasses(patient.status)}`}>
                              {patient.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  {/* OPD Queue */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-emerald-600" />
                        OPD Queue
                      </h4>
                      <span className="text-[10px] text-gray-500">
                        {data.queueStatus.waiting} waiting
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {data.currentQueue.slice(0, 3).map((patient) => (
                        <div
                          key={patient.id}
                          className={`p-2 rounded-md border ${getPatientBorderClasses(patient.status, patient.priority)}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] font-bold">
                                {patient.tokenNo}
                              </span>
                              <div>
                                <span className="text-xs font-medium">{patient.name}</span>
                                <span className="text-[10px] text-gray-500 ml-1">{patient.age}y</span>
                              </div>
                            </div>
                            <span className={`px-1.5 py-0.5 text-[9px] rounded ${getQueueStatusClasses(patient.status)}`}>
                              {patient.status === "in-progress" ? "In Progress" : "Waiting"}
                            </span>
                          </div>
                          <div className="text-[10px] text-gray-600 truncate">
                            {patient.chiefComplaint}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Emergency Log */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Siren className="w-3.5 h-3.5 text-red-600" />
                        Emergency Log
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] rounded bg-red-100 text-red-700">
                          {data.emergencyLog.pending} pending
                        </span>
                      </h4>
                      <button type="button" className="text-[10px] text-emerald-600 hover:underline flex items-center gap-0.5">
                        View all <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      {data.emergencyLog.recentCases.map((er) => (
                        <div key={er.id} className="flex items-center justify-between py-1.5 px-2 rounded bg-gray-50 text-[10px]">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">{er.time}</span>
                              <span className="text-gray-700 font-medium">{er.name}</span>
                            </div>
                            <p className="text-gray-500 truncate">{er.complaint}</p>
                          </div>
                          <span className={`px-1.5 py-0.5 rounded ${getEmergencyStatusClasses(er.status)}`}>
                            {er.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Post-Op Checklist */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <ClipboardCheck className="w-3.5 h-3.5 text-purple-600" />
                        Post-Op Tasks
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] rounded bg-purple-100 text-purple-700">
                          {data.postOpChecklist.pending} pending
                        </span>
                      </h4>
                    </div>
                    <div className="space-y-1">
                      {data.postOpChecklist.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-1.5 px-2 rounded bg-gray-50 text-[10px]">
                          <div className="flex-1">
                            <span className="text-gray-700 font-medium">{item.patient}</span>
                            <span className="text-gray-400 ml-1">· {item.task}</span>
                          </div>
                          <span className="text-amber-600 font-medium">Due {item.due}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <TrendChart
                data={data.weeklyTrends.map(d => ({
                  day: d.day,
                  value: d.opdCount,
                  secondary: d.surgeries
                }))}
                title="Weekly OPD & Surgeries"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
