"use client";

import { useState } from "react";
import {
  HeartPulse,
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
  AlertCircle,
  BedDouble,
  Wind,
  Droplet,
  Thermometer,
} from "lucide-react";
import { TrendChart } from "@/components/marketing/specialty";
import { criticalCareDashboardData } from "@/data/seeded/critical-care";

function getPatientStatusClasses(status: string): string {
  if (status === "critical") return "bg-red-100 text-red-700 border-red-200";
  if (status === "stable") return "bg-green-100 text-green-700 border-green-200";
  return "bg-amber-100 text-amber-700 border-amber-200";
}

function getStatusBorderClasses(status: string): string {
  if (status === "critical") return "border-red-300 bg-red-50";
  if (status === "stable") return "border-green-300 bg-green-50";
  return "border-amber-300 bg-amber-50";
}

function getLabFlagClasses(flag: string): string {
  if (flag === "high") return "text-red-600 bg-red-50";
  if (flag === "low") return "text-blue-600 bg-blue-50";
  return "text-gray-600 bg-gray-50";
}

function getPriorityClasses(priority: string): string {
  if (priority === "urgent") return "text-red-600";
  return "text-gray-500";
}

function getSupportLabel(support: string): string {
  if (support === "Ventilator") return "Vent";
  if (support === "Vasopressors") return "Vaso";
  return support;
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BedDouble, label: "Bed Census", badge: "18" },
  { icon: Wind, label: "Ventilators", badge: "8" },
  { icon: HeartPulse, label: "Hemodynamics" },
  { icon: Droplet, label: "Fluids/I-O" },
  { icon: Activity, label: "Labs" },
  { icon: Clock, label: "Tasks", badge: "24" },
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
  if (highlight) return "bg-cyan-50 border-cyan-200";
  return "bg-white border-gray-200";
}

function getStatValueClasses(alert?: boolean, highlight?: boolean): string {
  if (alert) return "text-red-700";
  if (highlight) return "text-cyan-700";
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

export function CriticalCareDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const data = criticalCareDashboardData;

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
            <span className="truncate">app.aarogyaehr.com/icu/dashboard</span>
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
              <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center">
                <HeartPulse className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-xs">AarogyaEHR</p>
                <p className="text-[9px] text-slate-400">Critical Care</p>
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
                      ? "bg-cyan-600 text-white"
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
              <div className="md:hidden w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center">
                <HeartPulse className="w-4 h-4 text-white" />
              </div>
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-8 pr-3 py-1 text-xs rounded-md border border-gray-200 bg-gray-50 w-44 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 text-[10px] font-medium">
                <BedDouble className="w-3 h-3" />
                {data.todayStats.available} beds free
              </span>
              <button type="button" className="relative p-1.5 rounded-md hover:bg-gray-100">
                <Bell className="w-4 h-4 text-gray-600" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-1.5 pl-2 border-l border-gray-200">
                <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center text-white text-[10px] font-semibold">
                  RK
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-gray-900 leading-tight">Dr. Rajesh Kumar</p>
                  <p className="text-[9px] text-gray-500 leading-tight">Intensivist</p>
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
                  <h1 className="text-sm font-semibold text-gray-900">ICU Dashboard</h1>
                  <p className="text-[10px] text-gray-500">Real-time monitoring</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-medium">
                    <Wind className="w-3 h-3" />
                    {data.ventilatorStatus.inUse} on vent
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {data.labResults.critical} critical labs
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                <Stat
                  title="Occupied"
                  value={`${data.todayStats.occupied}/${data.todayStats.totalBeds}`}
                  icon={<BedDouble className="w-3.5 h-3.5 text-cyan-600" />}
                  highlight
                />
                <Stat
                  title="On Vent"
                  value={data.todayStats.onVentilator}
                  icon={<Wind className="w-3.5 h-3.5 text-blue-600" />}
                />
                <Stat
                  title="On Vasopressors"
                  value={data.todayStats.onVasopressors}
                  icon={<Droplet className="w-3.5 h-3.5 text-red-600" />}
                  alert={data.todayStats.onVasopressors > 4}
                />
                <Stat
                  title="On Dialysis"
                  value={data.todayStats.onDialysis}
                  icon={<Activity className="w-3.5 h-3.5 text-purple-600" />}
                />
                <Stat
                  title="Avg APACHE II"
                  value={data.todayStats.avgApacheII}
                  icon={<Activity className="w-3.5 h-3.5 text-amber-600" />}
                />
              </div>

              {/* Main Grid */}
              <div className="grid lg:grid-cols-2 gap-3">
                {/* Left Column - Patient List */}
                <div className="space-y-3">
                  {/* ICU Patients */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <BedDouble className="w-3.5 h-3.5 text-cyan-600" />
                        ICU Census
                      </h4>
                      <button type="button" className="text-[10px] text-cyan-600 hover:underline flex items-center gap-0.5">
                        View all <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {data.currentPatients.map((patient) => (
                        <div
                          key={patient.id}
                          className={`p-2 rounded-md border ${getStatusBorderClasses(patient.status)}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 text-[9px] rounded bg-cyan-600 text-white font-bold">
                                {patient.bed}
                              </span>
                              <span className="text-xs font-semibold">{patient.name}</span>
                              <span className="text-[10px] text-gray-500">{patient.age}y/{patient.gender}</span>
                            </div>
                            <span className={`px-1.5 py-0.5 text-[9px] rounded capitalize ${getPatientStatusClasses(patient.status)}`}>
                              {patient.status}
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-700 mb-1 truncate">{patient.diagnosis}</p>
                          <div className="flex items-center justify-between text-[9px]">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Day {patient.dayInICU}</span>
                              <span className="text-amber-600">APACHE {patient.apacheII}</span>
                              <span className="text-purple-600">SOFA {patient.sofa}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {patient.supports.map((support) => (
                                <span key={support} className="px-1 py-0.5 rounded bg-gray-100 text-gray-600">
                                  {getSupportLabel(support)}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 mt-1 pt-1 border-t border-gray-200 text-[9px]">
                            <span>BP {patient.vitals.bp}</span>
                            <span>HR {patient.vitals.hr}</span>
                            <span>SpO2 {patient.vitals.spo2}%</span>
                            <span><Thermometer className="w-2.5 h-2.5 inline" /> {patient.vitals.temp}°C</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  {/* Ventilator Status */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Wind className="w-3.5 h-3.5 text-blue-600" />
                        Ventilator Panel
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] rounded bg-blue-100 text-blue-700">
                          {data.ventilatorStatus.inUse}/{data.ventilatorStatus.total}
                        </span>
                      </h4>
                    </div>
                    <div className="space-y-1.5">
                      {data.ventilatorPatients.slice(0, 3).map((vent) => (
                        <div key={vent.bed} className="p-2 rounded bg-blue-50 border border-blue-100">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] font-bold text-blue-700">{vent.bed}</span>
                              <span className="text-[10px] text-gray-700">{vent.name}</span>
                            </div>
                            <span className="px-1.5 py-0.5 text-[9px] rounded bg-blue-600 text-white font-medium">
                              {vent.mode}
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-2 text-[9px]">
                            <div className="text-center">
                              <p className="text-gray-500">FiO2</p>
                              <p className="font-bold text-gray-900">{vent.fio2}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-gray-500">PEEP</p>
                              <p className="font-bold text-gray-900">{vent.peep}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-gray-500">PIP</p>
                              <p className="font-bold text-gray-900">{vent.pip}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-gray-500">VT</p>
                              <p className="font-bold text-gray-900">{vent.vt}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Critical Labs */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-purple-600" />
                        Recent Labs
                        {data.labResults.critical > 0 && (
                          <span className="ml-1 px-1.5 py-0.5 text-[9px] rounded bg-red-100 text-red-700">
                            {data.labResults.critical} critical
                          </span>
                        )}
                      </h4>
                    </div>
                    <div className="space-y-1">
                      {data.labResults.recent.map((lab) => (
                        <div key={`${lab.patient}-${lab.test}`} className="flex items-center justify-between py-1.5 px-2 rounded bg-gray-50 text-[10px]">
                          <div className="flex-1">
                            <span className="text-gray-700 font-medium">{lab.patient}</span>
                            <span className="text-gray-400 ml-1">· {lab.test}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-1.5 py-0.5 rounded font-medium ${getLabFlagClasses(lab.flag)}`}>
                              {lab.value} {lab.unit}
                            </span>
                            <span className="text-gray-400">{lab.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pending Tasks */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        Pending Tasks
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] rounded bg-amber-100 text-amber-700">
                          {data.pendingTasks.urgent} urgent
                        </span>
                      </h4>
                    </div>
                    <div className="space-y-1">
                      {data.pendingTasks.items.slice(0, 4).map((item) => (
                        <div key={`${item.patient}-${item.task}`} className="flex items-center justify-between py-1.5 px-2 rounded bg-gray-50 text-[10px]">
                          <div className="flex-1">
                            <span className="text-gray-700 font-medium">{item.patient}</span>
                            <span className="text-gray-400 ml-1">· {item.task}</span>
                          </div>
                          <span className={`font-medium ${getPriorityClasses(item.priority)}`}>
                            {item.due}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <TrendChart
                data={data.hourlyTrends.map(d => ({
                  day: d.hour,
                  value: d.avgMAP,
                  secondary: d.avgHR
                }))}
                title="Avg MAP & Heart Rate (Unit)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
