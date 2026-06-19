"use client";

import { useState } from "react";
import {
  Baby,
  Users,
  Syringe,
  Calendar,
  IndianRupee,
  ChevronRight,
  Bell,
  Search,
  Settings,
  LayoutDashboard,
  FileText,
  Activity,
  HelpCircle,
  ChevronDown,
  TrendingUp,
  Clock,
  AlertCircle,
  Heart,
  Scale,
  Thermometer,
} from "lucide-react";
import { TrendChart } from "@/components/marketing/specialty";
import { pediatricsDashboardData } from "@/data/seeded/pediatrics";

function getQueueStatusClasses(status: string): string {
  if (status === "in-progress") return "bg-green-100 text-green-700";
  if (status === "waiting") return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-600";
}

function getVisitTypeClasses(type: string): string {
  if (type === "Vaccination") return "bg-green-100 text-green-700";
  if (type === "Sick") return "bg-red-100 text-red-700";
  if (type === "Well-baby") return "bg-blue-100 text-blue-700";
  return "bg-purple-100 text-purple-700";
}

function getNicuStatusClasses(status: string): string {
  if (status === "critical") return "bg-red-100 text-red-700 border-red-200";
  if (status === "stable") return "bg-green-100 text-green-700 border-green-200";
  return "bg-amber-100 text-amber-700 border-amber-200";
}

function getGrowthStatusClasses(status: string): string {
  if (status === "normal") return "text-green-600";
  if (status === "underweight") return "text-amber-600";
  if (status === "wasted") return "text-red-600";
  return "text-gray-600";
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "OPD Queue", badge: "8" },
  { icon: Baby, label: "NICU", badge: "8/12", highlight: true },
  { icon: Syringe, label: "Vaccinations", badge: "16" },
  { icon: Scale, label: "Growth Charts" },
  { icon: Activity, label: "Development" },
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
  const bgClass = alert
    ? "bg-red-50 border-red-200"
    : highlight
    ? "bg-teal-50 border-teal-200"
    : "bg-white border-gray-200";

  const valueClass = alert
    ? "text-red-700"
    : highlight
    ? "text-teal-700"
    : "text-gray-900";

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

export function PediatricsDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const data = pediatricsDashboardData;

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
            <span className="truncate">app.aarogyaehr.com/pediatrics/dashboard</span>
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
              <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center">
                <Baby className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-xs">AarogyaEHR</p>
                <p className="text-[9px] text-slate-400">Pediatrics & NICU</p>
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
                      ? "bg-teal-600 text-white"
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
              <div className="md:hidden w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center">
                <Baby className="w-4 h-4 text-white" />
              </div>
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search children..."
                  className="pl-8 pr-3 py-1 text-xs rounded-md border border-gray-200 bg-gray-50 w-44 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
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
                <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-white text-[10px] font-semibold">
                  PS
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-gray-900 leading-tight">Dr. Priya Singh</p>
                  <p className="text-[9px] text-gray-500 leading-tight">Pediatrician</p>
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
                  <h1 className="text-sm font-semibold text-gray-900">Pediatrics Dashboard</h1>
                  <p className="text-[10px] text-gray-500">Today&apos;s overview</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 text-[10px] font-medium">
                    <Syringe className="w-3 h-3" />
                    {data.vaccinationTracker.pending} vaccines pending
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />{" "}
                    NICU {data.nicuStatus.occupied}/{data.nicuStatus.totalBeds}
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                <Stat
                  title="OPD Today"
                  value={data.todayStats.opdPatients}
                  icon={<Users className="w-3.5 h-3.5 text-teal-600" />}
                  trend="+4%"
                />
                <Stat
                  title="Vaccinations"
                  value={data.todayStats.vaccinations}
                  icon={<Syringe className="w-3.5 h-3.5 text-green-600" />}
                  highlight
                />
                <Stat
                  title="NICU"
                  value={`${data.nicuStatus.occupied}/${data.nicuStatus.totalBeds}`}
                  icon={<Baby className="w-3.5 h-3.5 text-red-600" />}
                  alert={data.nicuStatus.patients.some(p => p.status === "critical")}
                />
                <Stat
                  title="New Patients"
                  value={data.todayStats.newPatients}
                  icon={<Heart className="w-3.5 h-3.5 text-pink-600" />}
                />
                <Stat
                  title="Emergencies"
                  value={data.todayStats.emergencies}
                  icon={<Thermometer className="w-3.5 h-3.5 text-orange-600" />}
                />
                <Stat
                  title="Revenue"
                  value={`₹${(data.todayStats.revenue / 100000).toFixed(2)}L`}
                  icon={<IndianRupee className="w-3.5 h-3.5 text-teal-600" />}
                />
              </div>

              {/* Main Grid */}
              <div className="grid lg:grid-cols-2 gap-3">
                {/* Left Column */}
                <div className="space-y-3">
                  {/* NICU Status */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Baby className="w-3.5 h-3.5 text-red-600" />
                        NICU Status
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] rounded bg-red-100 text-red-700">
                          {data.nicuStatus.patients.filter(p => p.status === "critical").length} critical
                        </span>
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <span>Vent: <strong className="text-gray-900">{data.nicuStatus.ventilators.inUse}/{data.nicuStatus.ventilators.total}</strong></span>
                        <span>Photo: <strong className="text-gray-900">{data.nicuStatus.phototherapy.inUse}/{data.nicuStatus.phototherapy.total}</strong></span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {data.nicuStatus.patients.map((patient) => (
                        <div
                          key={patient.id}
                          className={`p-2 rounded-md border ${getNicuStatusClasses(patient.status)}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium">{patient.name}</span>
                              <span className="text-[10px] text-gray-500">GA {patient.ga}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {patient.onVentilator && (
                                <span className="px-1.5 py-0.5 text-[9px] rounded bg-red-200 text-red-800">Vent</span>
                              )}
                              {patient.phototherapy && (
                                <span className="px-1.5 py-0.5 text-[9px] rounded bg-blue-200 text-blue-800">Photo</span>
                              )}
                              <span className={`px-1.5 py-0.5 text-[9px] rounded capitalize ${
                                patient.status === "critical" ? "bg-red-500 text-white" : "bg-green-200 text-green-800"
                              }`}>
                                {patient.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-gray-600">
                            <span>{patient.diagnosis}</span>
                            <span>BW: {patient.birthWeight} → {patient.currentWeight} | Day {patient.los}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button type="button" className="mt-2 w-full py-1.5 text-[10px] text-teal-600 hover:bg-teal-50 rounded-md transition-colors">
                      View all NICU patients ({data.nicuStatus.occupied}) →
                    </button>
                  </div>

                  {/* OPD Queue */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-teal-600" />
                        OPD Queue
                      </h4>
                      <span className="text-[10px] text-gray-500">
                        Avg wait: <strong className="text-gray-900">{data.queueStatus.avgWaitTime}m</strong>
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
                              <span className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-white text-[10px] font-bold">
                                {patient.tokenNo}
                              </span>
                              <div>
                                <span className="text-xs font-medium">{patient.name}</span>
                                <span className="text-[10px] text-gray-500 ml-1">{patient.age}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className={`px-1.5 py-0.5 text-[9px] rounded ${getVisitTypeClasses(patient.visitType)}`}>
                                {patient.visitType}
                              </span>
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
                  {/* Vaccination Tracker */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Syringe className="w-3.5 h-3.5 text-green-600" />
                        Vaccination Tracker
                      </h4>
                      <button type="button" className="text-[10px] text-teal-600 hover:underline flex items-center gap-0.5">
                        View all <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    
                    {/* Summary Row */}
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div className="text-center p-2 rounded-md bg-gray-50 border border-gray-100">
                        <p className="text-lg font-bold text-gray-900">{data.vaccinationTracker.todayScheduled}</p>
                        <p className="text-[9px] text-gray-500">Scheduled</p>
                      </div>
                      <div className="text-center p-2 rounded-md bg-green-50 border border-green-100">
                        <p className="text-lg font-bold text-green-700">{data.vaccinationTracker.completed}</p>
                        <p className="text-[9px] text-green-600">Done</p>
                      </div>
                      <div className="text-center p-2 rounded-md bg-amber-50 border border-amber-100">
                        <p className="text-lg font-bold text-amber-700">{data.vaccinationTracker.pending}</p>
                        <p className="text-[9px] text-amber-600">Pending</p>
                      </div>
                      <div className="text-center p-2 rounded-md bg-red-50 border border-red-100">
                        <p className="text-lg font-bold text-red-700">{data.vaccinationTracker.overdue}</p>
                        <p className="text-[9px] text-red-600">Overdue</p>
                      </div>
                    </div>

                    {/* Vaccine Progress */}
                    <div className="space-y-1.5">
                      {data.vaccinationTracker.schedule.slice(0, 4).map((vaccine) => (
                        <div key={vaccine.vaccine} className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-700 w-20">{vaccine.vaccine}</span>
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${(vaccine.completed / vaccine.due) * 100}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-gray-500 w-10 text-right">{vaccine.completed}/{vaccine.due}</span>
                        </div>
                      ))}
                    </div>

                    {/* Overdue Alert */}
                    {data.vaccinationTracker.overdueList.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1 text-[10px] text-red-600 mb-1.5">
                          <AlertCircle className="w-3 h-3" />
                          Overdue vaccinations
                        </div>
                        {data.vaccinationTracker.overdueList.slice(0, 2).map((item) => (
                          <div key={`${item.name}-${item.vaccine}`} className="flex items-center justify-between py-1 text-[10px]">
                            <span className="text-gray-700">{item.name} ({item.age})</span>
                            <span className="text-gray-500">{item.vaccine} · {item.daysPast}d late</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Growth Monitoring */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-purple-600" />
                        Growth Monitoring
                      </h4>
                      <span className="text-[10px] text-gray-500">
                        {data.growthMonitoring.todayAssessed} assessed today
                      </span>
                    </div>
                    
                    {/* Status Summary */}
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div className="text-center p-1.5 rounded-md bg-green-50">
                        <p className="text-sm font-bold text-green-700">{data.growthMonitoring.normal}</p>
                        <p className="text-[8px] text-green-600">Normal</p>
                      </div>
                      <div className="text-center p-1.5 rounded-md bg-amber-50">
                        <p className="text-sm font-bold text-amber-700">{data.growthMonitoring.underweight}</p>
                        <p className="text-[8px] text-amber-600">Underweight</p>
                      </div>
                      <div className="text-center p-1.5 rounded-md bg-orange-50">
                        <p className="text-sm font-bold text-orange-700">{data.growthMonitoring.stunted}</p>
                        <p className="text-[8px] text-orange-600">Stunted</p>
                      </div>
                      <div className="text-center p-1.5 rounded-md bg-red-50">
                        <p className="text-sm font-bold text-red-700">{data.growthMonitoring.wasted}</p>
                        <p className="text-[8px] text-red-600">Wasted</p>
                      </div>
                    </div>

                    {/* Recent Assessments */}
                    <div className="space-y-1">
                      {data.growthMonitoring.recentAssessments.map((child) => (
                        <div key={child.name} className="flex items-center justify-between py-1 px-2 rounded bg-gray-50 text-[10px]">
                          <span className="text-gray-700">{child.name} ({child.age})</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">{child.weight} / {child.height}</span>
                            <span className={`font-medium ${getGrowthStatusClasses(child.status)}`}>
                              {child.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Diagnosis Distribution */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-900 mb-2">Today&apos;s Diagnoses</h4>
                    <div className="space-y-1.5">
                      {data.diagnosisDistribution.slice(0, 4).map((item) => (
                        <div key={item.diagnosis} className="flex items-center gap-2">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-[10px] text-gray-700 truncate max-w-32">{item.diagnosis}</span>
                              <span className="text-[10px] text-gray-500">{item.count}</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-teal-500 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
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
                  secondary: d.vaccinations
                }))}
                title="Weekly OPD & Vaccinations"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
