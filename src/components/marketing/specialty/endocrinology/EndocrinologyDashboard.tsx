"use client";

import { useState } from "react";
import {
  Users,
  Activity,
  Clock,
  ChevronRight,
  Bell,
  Search,
  Settings,
  LayoutDashboard,
  FileText,
  HelpCircle,
  ChevronDown,
  TrendingUp,
  Droplet,
  Pill,
  Target,
  Calendar,
} from "lucide-react";
import { TrendChart } from "@/components/marketing/specialty";
import { endocrinologyDashboardData } from "@/data/seeded/endocrinology";

function getAppointmentStatusClasses(status: string): string {
  if (status === "completed") return "bg-green-100 text-green-700";
  if (status === "in-progress") return "bg-blue-100 text-blue-700";
  if (status === "waiting") return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-600";
}

function getTypeClasses(type: string): string {
  if (type === "DM1") return "bg-purple-100 text-purple-700";
  if (type === "DM2") return "bg-orange-100 text-orange-700";
  if (type === "GDM") return "bg-pink-100 text-pink-700";
  if (type === "Thyroid") return "bg-blue-100 text-blue-700";
  return "bg-gray-100 text-gray-600";
}

function getControlClasses(hbA1c: number | undefined): string {
  if (!hbA1c) return "";
  if (hbA1c <= 7) return "text-green-600";
  if (hbA1c <= 8) return "text-amber-600";
  return "text-red-600";
}

function getComplianceClasses(compliance: string): string {
  if (compliance === "good") return "bg-green-100 text-green-700";
  if (compliance === "fair") return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-600";
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Patients", badge: "1284" },
  { icon: Droplet, label: "Diabetes Registry" },
  { icon: Activity, label: "Thyroid Cases", badge: "9" },
  { icon: Pill, label: "Insulin Tracking" },
  { icon: Target, label: "Lab Results" },
  { icon: Clock, label: "Schedule", badge: "42" },
  { icon: FileText, label: "Reports" },
];

interface StatProps {
  readonly title: string;
  readonly value: string | number;
  readonly icon: React.ReactNode;
  readonly trend?: string;
  readonly highlight?: boolean;
  readonly alert?: boolean;
  readonly suffix?: string;
}

function getStatBgClasses(alert?: boolean, highlight?: boolean): string {
  if (alert) return "bg-red-50 border-red-200";
  if (highlight) return "bg-violet-50 border-violet-200";
  return "bg-white border-gray-200";
}

function getStatValueClasses(alert?: boolean, highlight?: boolean): string {
  if (alert) return "text-red-700";
  if (highlight) return "text-violet-700";
  return "text-gray-900";
}

function Stat({ title, value, icon, trend, highlight, alert, suffix }: StatProps) {
  const bgClass = getStatBgClasses(alert, highlight);
  const valueClass = getStatValueClasses(alert, highlight);

  return (
    <div className={`p-3 rounded-lg border ${bgClass}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-gray-500 uppercase tracking-wide">{title}</span>
        {icon}
      </div>
      <p className={`text-xl font-bold ${valueClass}`}>
        {value}
        {suffix && <span className="text-sm font-normal ml-0.5">{suffix}</span>}
      </p>
      {trend && (
        <div className="flex items-center gap-1 mt-0.5">
          <TrendingUp className="w-3 h-3 text-green-600" />
          <span className="text-[10px] text-green-600 font-medium">{trend}</span>
        </div>
      )}
    </div>
  );
}

export function EndocrinologyDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const data = endocrinologyDashboardData;

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
            <span className="truncate">app.aarogyaehr.com/endocrinology/dashboard</span>
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
              <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-xs">AarogyaEHR</p>
                <p className="text-[9px] text-slate-400">Endocrinology</p>
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
                      ? "bg-violet-600 text-white"
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
              <div className="md:hidden w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-8 pr-3 py-1 text-xs rounded-md border border-gray-200 bg-gray-50 w-44 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
                <Target className="w-3 h-3" />
                {data.todayStats.controlledDM}% controlled
              </span>
              <button type="button" className="relative p-1.5 rounded-md hover:bg-gray-100">
                <Bell className="w-4 h-4 text-gray-600" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-1.5 pl-2 border-l border-gray-200">
                <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white text-[10px] font-semibold">
                  SM
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-gray-900 leading-tight">Dr. Smita Mehta</p>
                  <p className="text-[9px] text-gray-500 leading-tight">Endocrinologist</p>
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
                  <h1 className="text-sm font-semibold text-gray-900">Diabetes & Thyroid Clinic</h1>
                  <p className="text-[10px] text-gray-500">Today&apos;s Overview</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-medium">
                    <Droplet className="w-3 h-3" />
                    Avg HbA1c: {data.todayStats.avgHbA1c}%
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-medium">
                    <Pill className="w-3 h-3" />
                    {data.todayStats.insulinAdjustments} adjustments
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                <Stat
                  title="Today's Patients"
                  value={data.todayStats.totalPatients}
                  icon={<Users className="w-3.5 h-3.5 text-violet-600" />}
                  highlight
                />
                <Stat
                  title="DM Visits"
                  value={data.todayStats.diabetesVisits}
                  icon={<Droplet className="w-3.5 h-3.5 text-orange-600" />}
                />
                <Stat
                  title="Thyroid Cases"
                  value={data.todayStats.thyroidCases}
                  icon={<Activity className="w-3.5 h-3.5 text-blue-600" />}
                />
                <Stat
                  title="Pending Reviews"
                  value={data.todayStats.pendingReviews}
                  icon={<Clock className="w-3.5 h-3.5 text-amber-600" />}
                  alert={data.todayStats.pendingReviews > 5}
                />
                <Stat
                  title="On Insulin"
                  value={data.diabetesRegistry.onInsulin}
                  icon={<Pill className="w-3.5 h-3.5 text-purple-600" />}
                  suffix="/1284"
                />
              </div>

              {/* Main Grid */}
              <div className="grid lg:grid-cols-2 gap-3">
                {/* Left Column - Schedule */}
                <div className="space-y-3">
                  {/* Today's Schedule */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-violet-600" />
                        Today&apos;s Schedule
                      </h4>
                      <button type="button" className="text-[10px] text-violet-600 hover:underline flex items-center gap-0.5">
                        View all <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {data.todaySchedule.map((appt) => (
                        <div
                          key={appt.id}
                          className={`p-2 rounded-md border ${
                            appt.status === "in-progress"
                              ? "border-violet-300 bg-violet-50"
                              : "border-gray-200 bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-gray-500">{appt.time}</span>
                              <span className="text-xs font-semibold">{appt.name}</span>
                              <span className="text-[10px] text-gray-500">{appt.age}y</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className={`px-1.5 py-0.5 text-[9px] rounded ${getTypeClasses(appt.type)}`}>
                                {appt.type}
                              </span>
                              <span className={`px-1.5 py-0.5 text-[9px] rounded capitalize ${getAppointmentStatusClasses(appt.status)}`}>
                                {appt.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-gray-600">{appt.reason}</span>
                            {appt.hbA1c && (
                              <span className={`font-semibold ${getControlClasses(appt.hbA1c)}`}>
                                HbA1c: {appt.hbA1c}%
                              </span>
                            )}
                            {appt.tsh && (
                              <span className="font-semibold text-blue-600">
                                TSH: {appt.tsh}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  {/* Insulin Patients */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Pill className="w-3.5 h-3.5 text-purple-600" />
                        Insulin Regimens
                      </h4>
                    </div>
                    <div className="space-y-1.5">
                      {data.insulinPatients.map((patient) => (
                        <div key={patient.id} className="p-2 rounded bg-purple-50 border border-purple-100">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-semibold text-gray-800">{patient.name}</span>
                              <span className="px-1.5 py-0.5 text-[9px] rounded bg-purple-600 text-white">
                                {patient.regimen}
                              </span>
                            </div>
                            {patient.cgm && (
                              <span className="px-1.5 py-0.5 text-[9px] rounded bg-green-100 text-green-700">
                                CGM
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[9px] text-gray-600">
                            <span>{patient.basalDose}</span>
                            {patient.bolusDose && <span>· {patient.bolusDose}</span>}
                            {patient.dose && <span>{patient.dose}</span>}
                          </div>
                          <div className="text-[9px] text-gray-400 mt-0.5">
                            Last adjusted: {patient.lastAdjustment}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Thyroid Cases */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-blue-600" />
                        Active Thyroid Cases
                      </h4>
                    </div>
                    <div className="space-y-1.5">
                      {data.thyroidCases.map((tc) => (
                        <div key={tc.id} className="p-2 rounded bg-blue-50 border border-blue-100">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-semibold">{tc.name}</span>
                              <span className="text-[10px] text-gray-500">{tc.age}y</span>
                            </div>
                            <span className={`px-1.5 py-0.5 text-[9px] rounded ${getComplianceClasses(tc.compliance)}`}>
                              {tc.compliance}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[9px]">
                            <span className="text-blue-700 font-medium">{tc.condition}</span>
                            {tc.currentTSH && (
                              <span className="text-gray-600">TSH: {tc.currentTSH} (Target: {tc.targetTSH})</span>
                            )}
                            {tc.fnacResult && (
                              <span className="text-amber-600">{tc.fnacResult} → {tc.nextAction}</span>
                            )}
                          </div>
                          {tc.medication && (
                            <div className="text-[9px] text-gray-500 mt-0.5">{tc.medication}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pending Labs */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-amber-600" />
                        Pending Labs
                      </h4>
                      <span className="text-[10px] text-gray-500">{data.pendingLabs.length} awaited</span>
                    </div>
                    <div className="space-y-1">
                      {data.pendingLabs.map((lab) => (
                        <div key={`${lab.patient}-${lab.test}`} className="flex items-center justify-between py-1.5 px-2 rounded bg-gray-50 text-[10px]">
                          <div className="flex-1">
                            <span className="text-gray-700 font-medium">{lab.patient}</span>
                            <span className="text-gray-400 ml-1">· {lab.test}</span>
                          </div>
                          <span className="text-gray-400">{lab.ordered}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row - HbA1c Trends */}
              <TrendChart
                data={data.hbA1cTrends.map(d => ({
                  day: d.month,
                  value: d.value,
                }))}
                title="Avg HbA1c Trend (Clinic)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
