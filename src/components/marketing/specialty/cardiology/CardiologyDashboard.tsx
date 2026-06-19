"use client";

import { useState } from "react";
import {
  Heart,
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
  Zap,
  HeartPulse,
  Stethoscope,
} from "lucide-react";
import { TrendChart } from "@/components/marketing/specialty";
import { cardiologyDashboardData } from "@/data/seeded/cardiology";

function getQueueStatusClasses(status: string): string {
  if (status === "in-progress") return "bg-green-100 text-green-700";
  if (status === "waiting") return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-600";
}

function getRiskLevelClasses(level: string): string {
  if (level === "urgent") return "bg-red-100 text-red-700";
  if (level === "high") return "bg-orange-100 text-orange-700";
  if (level === "moderate") return "bg-amber-100 text-amber-700";
  return "bg-green-100 text-green-700";
}

function getCcuStatusClasses(status: string): string {
  if (status === "critical") return "bg-red-100 text-red-700 border-red-200";
  if (status === "improving") return "bg-blue-100 text-blue-700 border-blue-200";
  return "bg-green-100 text-green-700 border-green-200";
}

function getEchoStatusClasses(status: string): string {
  if (status === "abnormal") return "text-red-600";
  if (status === "borderline") return "text-amber-600";
  return "text-green-600";
}

function getStatBgClasses(alert?: boolean, highlight?: boolean): string {
  if (alert) return "bg-red-50 border-red-200";
  if (highlight) return "bg-rose-50 border-rose-200";
  return "bg-white border-gray-200";
}

function getStatValueClasses(alert?: boolean, highlight?: boolean): string {
  if (alert) return "text-red-700";
  if (highlight) return "text-rose-700";
  return "text-gray-900";
}

function getCcuPatientStatusClasses(status: string): string {
  if (status === "critical") return "bg-red-500 text-white";
  if (status === "improving") return "bg-blue-500 text-white";
  return "bg-green-200 text-green-800";
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "OPD Queue", badge: "6" },
  { icon: Heart, label: "CCU", badge: "6/8", highlight: true },
  { icon: HeartPulse, label: "Echo Queue", badge: "3" },
  { icon: Activity, label: "TMT Lab", badge: "2" },
  { icon: Zap, label: "Cath Lab", badge: "2" },
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

export function CardiologyDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const data = cardiologyDashboardData;

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
            <span className="truncate">app.aarogyaehr.com/cardiology/dashboard</span>
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
              <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-xs">AarogyaEHR</p>
                <p className="text-[9px] text-slate-400">Cardiology</p>
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
                      ? "bg-rose-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                    {item.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    )}
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
              <div className="md:hidden w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-8 pr-3 py-1 text-xs rounded-md border border-gray-200 bg-gray-50 w-44 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
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
                <div className="w-6 h-6 rounded-full bg-rose-600 flex items-center justify-center text-white text-[10px] font-semibold">
                  RK
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-gray-900 leading-tight">Dr. Rajesh Kapoor</p>
                  <p className="text-[9px] text-gray-500 leading-tight">Interventional Cardio</p>
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
                  <h1 className="text-sm font-semibold text-gray-900">Cardiology Dashboard</h1>
                  <p className="text-[10px] text-gray-500">Today&apos;s overview</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-medium">
                    <Activity className="w-3 h-3" />
                    {data.todayStats.echosDone} Echos done
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />{" "}
                    CCU {data.ccuStatus.occupied}/{data.ccuStatus.totalBeds}
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                <Stat
                  title="OPD"
                  value={data.todayStats.opdPatients}
                  icon={<Users className="w-3.5 h-3.5 text-rose-600" />}
                />
                <Stat
                  title="CCU"
                  value={`${data.ccuStatus.occupied}/${data.ccuStatus.totalBeds}`}
                  icon={<Heart className="w-3.5 h-3.5 text-red-600" />}
                  alert={data.ccuStatus.patients.some(p => p.status === "critical")}
                />
                <Stat
                  title="Echos"
                  value={data.todayStats.echosDone}
                  icon={<HeartPulse className="w-3.5 h-3.5 text-blue-600" />}
                />
                <Stat
                  title="TMTs"
                  value={data.todayStats.tmtsDone}
                  icon={<Activity className="w-3.5 h-3.5 text-green-600" />}
                />
                <Stat
                  title="Cath Lab"
                  value={data.todayStats.angiosScheduled}
                  icon={<Zap className="w-3.5 h-3.5 text-amber-600" />}
                  highlight
                />
                <Stat
                  title="New"
                  value={data.todayStats.newPatients}
                  icon={<Stethoscope className="w-3.5 h-3.5 text-indigo-600" />}
                />
                <Stat
                  title="Follow-ups"
                  value={data.todayStats.followUps}
                  icon={<Calendar className="w-3.5 h-3.5 text-purple-600" />}
                />
                <Stat
                  title="Revenue"
                  value={`₹${(data.todayStats.revenue / 100000).toFixed(1)}L`}
                  icon={<IndianRupee className="w-3.5 h-3.5 text-rose-600" />}
                />
              </div>

              {/* Main Grid */}
              <div className="grid lg:grid-cols-2 gap-3">
                {/* Left Column */}
                <div className="space-y-3">
                  {/* CCU Status */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-red-600" />
                        CCU / ICCU Status
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] rounded bg-red-100 text-red-700">
                          {data.ccuStatus.patients.filter(p => p.status === "critical").length} critical
                        </span>
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <span>Vent: <strong className="text-gray-900">{data.ccuStatus.ventilators.inUse}/{data.ccuStatus.ventilators.total}</strong></span>
                        <span>IABP: <strong className="text-gray-900">{data.ccuStatus.iabp.inUse}/{data.ccuStatus.iabp.total}</strong></span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {data.ccuStatus.patients.map((patient) => (
                        <div
                          key={patient.id}
                          className={`p-2 rounded-md border ${getCcuStatusClasses(patient.status)}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 text-[9px] rounded bg-gray-200 font-medium">{patient.bed}</span>
                              <span className="text-xs font-medium">{patient.name}</span>
                              <span className="text-[10px] text-gray-500">{patient.age}y</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {patient.iabp && (
                                <span className="px-1.5 py-0.5 text-[9px] rounded bg-orange-200 text-orange-800">IABP</span>
                              )}
                              {patient.ef && (
                                <span className="px-1.5 py-0.5 text-[9px] rounded bg-purple-100 text-purple-700">EF {patient.ef}</span>
                              )}
                              <span className={`px-1.5 py-0.5 text-[9px] rounded capitalize ${getCcuPatientStatusClasses(patient.status)}`}>
                                {patient.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-gray-600">
                            <span className="truncate max-w-48">{patient.diagnosis}</span>
                            <span className="text-gray-400">Day {patient.los}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button type="button" className="mt-2 w-full py-1.5 text-[10px] text-rose-600 hover:bg-rose-50 rounded-md transition-colors">
                      View all CCU patients ({data.ccuStatus.occupied}) →
                    </button>
                  </div>

                  {/* OPD Queue */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-rose-600" />
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
                          className={`p-2 rounded-md border ${
                            patient.status === "in-progress"
                              ? "border-green-200 bg-green-50"
                              : "border-gray-100 bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-rose-600 flex items-center justify-center text-white text-[10px] font-bold">
                                {patient.tokenNo}
                              </span>
                              <div>
                                <span className="text-xs font-medium">{patient.name}</span>
                                <span className="text-[10px] text-gray-500 ml-1">{patient.age}y</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {patient.riskLevel && (
                                <span className={`px-1.5 py-0.5 text-[9px] rounded ${getRiskLevelClasses(patient.riskLevel)}`}>
                                  {patient.riskLevel}
                                </span>
                              )}
                              <span className={`px-1.5 py-0.5 text-[9px] rounded ${getQueueStatusClasses(patient.status)}`}>
                                {patient.status === "in-progress" ? "In Progress" : "Waiting"}
                              </span>
                            </div>
                          </div>
                          <div className="text-[10px] text-gray-600 truncate">
                            {patient.chiefComplaint}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  {/* Procedure Queues */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-blue-600" />
                        Procedure Queue
                      </h4>
                      <button type="button" className="text-[10px] text-rose-600 hover:underline flex items-center gap-0.5">
                        View all <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    
                    {/* Tabs for procedures */}
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="p-2 rounded-md bg-blue-50 border border-blue-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-medium text-blue-800">Echo</span>
                          <span className="text-xs font-bold text-blue-700">{data.procedureQueue.echos.length}</span>
                        </div>
                        <div className="space-y-1">
                          {data.procedureQueue.echos.slice(0, 2).map((proc) => (
                            <div key={proc.id} className="text-[9px] text-blue-600 truncate">
                              {proc.time} - {proc.name}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 rounded-md bg-green-50 border border-green-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-medium text-green-800">TMT</span>
                          <span className="text-xs font-bold text-green-700">{data.procedureQueue.tmts.length}</span>
                        </div>
                        <div className="space-y-1">
                          {data.procedureQueue.tmts.slice(0, 2).map((proc) => (
                            <div key={proc.id} className="text-[9px] text-green-600 truncate">
                              {proc.time} - {proc.name}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 rounded-md bg-amber-50 border border-amber-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-medium text-amber-800">Cath Lab</span>
                          <span className="text-xs font-bold text-amber-700">{data.procedureQueue.cathlabs.length}</span>
                        </div>
                        <div className="space-y-1">
                          {data.procedureQueue.cathlabs.slice(0, 2).map((proc) => (
                            <div key={proc.id} className="text-[9px] text-amber-600 truncate">
                              {proc.procedure} - {proc.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Echo Findings Summary */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <HeartPulse className="w-3.5 h-3.5 text-blue-600" />
                        Echo Findings (Today)
                      </h4>
                      <span className="text-[10px] text-gray-500">{data.echoFindings.todayCompleted} completed</span>
                    </div>
                    
                    {/* Summary */}
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      <div className="text-center p-1.5 rounded bg-green-50">
                        <p className="text-sm font-bold text-green-700">{data.echoFindings.normalEF}</p>
                        <p className="text-[8px] text-green-600">Normal</p>
                      </div>
                      <div className="text-center p-1.5 rounded bg-amber-50">
                        <p className="text-sm font-bold text-amber-700">{data.echoFindings.mildLVD}</p>
                        <p className="text-[8px] text-amber-600">Mild LVD</p>
                      </div>
                      <div className="text-center p-1.5 rounded bg-orange-50">
                        <p className="text-sm font-bold text-orange-700">{data.echoFindings.moderateLVD}</p>
                        <p className="text-[8px] text-orange-600">Mod LVD</p>
                      </div>
                      <div className="text-center p-1.5 rounded bg-red-50">
                        <p className="text-sm font-bold text-red-700">{data.echoFindings.severeLVD}</p>
                        <p className="text-[8px] text-red-600">Severe</p>
                      </div>
                    </div>

                    {/* Recent Reports */}
                    <div className="space-y-1">
                      {data.echoFindings.recentReports.map((report) => (
                        <div key={report.name} className="flex items-center justify-between py-1 px-2 rounded bg-gray-50 text-[10px]">
                          <span className="text-gray-700">{report.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">EF {report.ef}</span>
                            <span className={`font-medium ${getEchoStatusClasses(report.status)}`}>
                              {report.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Medication Adherence */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      Medication Adherence
                    </h4>
                    <div className="space-y-1.5 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-700 w-24">Statins</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${data.medicationAdherence.statinAdherence}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-500 w-8">{data.medicationAdherence.statinAdherence}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-700 w-24">Antiplatelets</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${data.medicationAdherence.antiplateletAdherence}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-500 w-8">{data.medicationAdherence.antiplateletAdherence}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-700 w-24">Beta Blockers</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${data.medicationAdherence.betaBlockerAdherence}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-500 w-8">{data.medicationAdherence.betaBlockerAdherence}%</span>
                      </div>
                    </div>
                    {data.medicationAdherence.defaulters.length > 0 && (
                      <div className="pt-2 border-t border-gray-100">
                        <div className="text-[9px] text-red-600 mb-1">Medication defaulters:</div>
                        {data.medicationAdherence.defaulters.slice(0, 2).map((d) => (
                          <div key={d.name} className="flex items-center justify-between py-0.5 text-[9px] text-gray-600">
                            <span>{d.name}</span>
                            <span>{d.medication} · {d.daysMissed}d missed</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <TrendChart
                data={data.weeklyTrends.map(d => ({
                  day: d.day,
                  value: d.opdCount,
                  secondary: d.echos
                }))}
                title="Weekly OPD & Echos"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
