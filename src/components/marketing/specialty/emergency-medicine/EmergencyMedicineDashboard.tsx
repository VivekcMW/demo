"use client";

import { useState } from "react";
import {
  Siren,
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
  AlertCircle,
  BedDouble,
  Heart,
  Ambulance,
  Zap,
} from "lucide-react";
import { TrendChart } from "@/components/marketing/specialty";
import { emergencyMedicineDashboardData } from "@/data/seeded/emergency-medicine";

function getTriageClasses(triage: string): string {
  if (triage === "red") return "bg-red-600 text-white";
  if (triage === "orange") return "bg-orange-500 text-white";
  if (triage === "yellow") return "bg-yellow-400 text-yellow-900";
  return "bg-green-500 text-white";
}

function getTriageBorderClasses(triage: string): string {
  if (triage === "red") return "border-red-300 bg-red-50";
  if (triage === "orange") return "border-orange-300 bg-orange-50";
  if (triage === "yellow") return "border-yellow-300 bg-yellow-50";
  return "border-green-300 bg-green-50";
}

function getQueueStatusClasses(status: string): string {
  if (status === "in-progress") return "bg-blue-100 text-blue-700";
  if (status === "waiting") return "bg-gray-100 text-gray-600";
  return "bg-gray-100 text-gray-600";
}

function getPriorityClasses(priority: string): string {
  if (priority === "high") return "text-red-600";
  if (priority === "medium") return "text-amber-600";
  return "text-gray-500";
}

function getAmbulancePriorityClasses(priority: string): string {
  if (priority === "red") return "bg-red-100 text-red-700 border-red-200";
  return "bg-orange-100 text-orange-700 border-orange-200";
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Siren, label: "Triage", badge: "24" },
  { icon: Heart, label: "Resus Bays", badge: "2" },
  { icon: BedDouble, label: "ED Beds" },
  { icon: Ambulance, label: "Incoming" },
  { icon: Clock, label: "Pending", badge: "35" },
  { icon: Activity, label: "Codes" },
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
  if (highlight) return "bg-red-50 border-red-200";
  return "bg-white border-gray-200";
}

function getStatValueClasses(alert?: boolean, highlight?: boolean): string {
  if (alert) return "text-red-700";
  if (highlight) return "text-red-700";
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

export function EmergencyMedicineDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const data = emergencyMedicineDashboardData;

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
            <span className="truncate">app.aarogyaehr.com/emergency/dashboard</span>
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
              <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center">
                <Siren className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-xs">AarogyaEHR</p>
                <p className="text-[9px] text-slate-400">Emergency</p>
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
                      ? "bg-red-600 text-white"
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
              <div className="md:hidden w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center">
                <Siren className="w-4 h-4 text-white" />
              </div>
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-8 pr-3 py-1 text-xs rounded-md border border-gray-200 bg-gray-50 w-44 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Code Alerts */}
              {data.codeStatus.stemiAlert.active && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-600 text-white text-[9px] font-bold animate-pulse">
                  <Heart className="w-3 h-3" />
                  STEMI ALERT
                </span>
              )}
              {data.codeStatus.traumaAlert.active && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-orange-600 text-white text-[9px] font-bold animate-pulse">
                  <Zap className="w-3 h-3" />
                  TRAUMA
                </span>
              )}
              <button type="button" className="relative p-1.5 rounded-md hover:bg-gray-100">
                <Bell className="w-4 h-4 text-gray-600" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-1.5 pl-2 border-l border-gray-200">
                <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] font-semibold">
                  PS
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-gray-900 leading-tight">Dr. Priya Sharma</p>
                  <p className="text-[9px] text-gray-500 leading-tight">ED In-Charge</p>
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
                  <h1 className="text-sm font-semibold text-gray-900">Emergency Department</h1>
                  <p className="text-[10px] text-gray-500">Real-time overview</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-medium">
                    <Heart className="w-3 h-3" />
                    {data.resuscitationBays.occupied} in Resus
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-medium">
                    <Ambulance className="w-3 h-3" />
                    {data.ambulanceLog.expected} incoming
                  </span>
                </div>
              </div>

              {/* Triage Summary */}
              <div className="p-3 rounded-lg bg-white border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-gray-900">Triage Status</h4>
                  <span className="text-[10px] text-gray-500">Avg triage: {data.triageStatus.avgTriageTime}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center p-2 rounded bg-red-600">
                    <p className="text-lg font-bold text-white">{data.triageStatus.red}</p>
                    <p className="text-[9px] text-red-100">RED - Resus</p>
                  </div>
                  <div className="text-center p-2 rounded bg-orange-500">
                    <p className="text-lg font-bold text-white">{data.triageStatus.orange}</p>
                    <p className="text-[9px] text-orange-100">ORANGE - Urgent</p>
                  </div>
                  <div className="text-center p-2 rounded bg-yellow-400">
                    <p className="text-lg font-bold text-yellow-900">{data.triageStatus.yellow}</p>
                    <p className="text-[9px] text-yellow-800">YELLOW - Standard</p>
                  </div>
                  <div className="text-center p-2 rounded bg-green-500">
                    <p className="text-lg font-bold text-white">{data.triageStatus.green}</p>
                    <p className="text-[9px] text-green-100">GREEN - Minor</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                <Stat
                  title="In ED"
                  value={data.todayStats.currentlyInED}
                  icon={<Users className="w-3.5 h-3.5 text-red-600" />}
                  highlight
                />
                <Stat
                  title="Today"
                  value={data.todayStats.totalPatients}
                  icon={<Activity className="w-3.5 h-3.5 text-blue-600" />}
                />
                <Stat
                  title="Admitted"
                  value={data.todayStats.admissions}
                  icon={<BedDouble className="w-3.5 h-3.5 text-teal-600" />}
                />
                <Stat
                  title="Discharged"
                  value={data.todayStats.discharges}
                  icon={<Activity className="w-3.5 h-3.5 text-green-600" />}
                />
                <Stat
                  title="Door-to-Doc"
                  value={data.todayStats.avgDoorToDoc}
                  icon={<Clock className="w-3.5 h-3.5 text-purple-600" />}
                />
              </div>

              {/* Main Grid */}
              <div className="grid lg:grid-cols-2 gap-3">
                {/* Left Column */}
                <div className="space-y-3">
                  {/* Resuscitation Bays */}
                  <div className="p-3 rounded-lg bg-white border border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-red-600" />
                        Resuscitation Bays
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] rounded bg-red-100 text-red-700">
                          {data.resuscitationBays.occupied}/{data.resuscitationBays.total}
                        </span>
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {data.resuscitationBays.patients.map((patient) => (
                        <div
                          key={patient.id}
                          className="p-2 rounded-md border border-red-200 bg-red-50"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 text-[9px] rounded bg-red-600 text-white font-bold">
                                {patient.bay}
                              </span>
                              <span className="text-xs font-semibold">{patient.name}</span>
                              <span className="text-[10px] text-gray-500">{patient.age}y/{patient.gender}</span>
                            </div>
                            <span className="text-[9px] text-gray-500">{patient.arrivedAt}</span>
                          </div>
                          <p className="text-[10px] text-gray-700 mb-1">{patient.chiefComplaint}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[9px]">
                              <span className="text-red-600 font-medium">BP {patient.vitals.bp}</span>
                              <span className="text-red-600">HR {patient.vitals.hr}</span>
                              <span className="text-red-600">SpO2 {patient.vitals.spo2}%</span>
                            </div>
                            <span className="px-1.5 py-0.5 text-[9px] rounded bg-red-600 text-white">
                              {patient.status}
                            </span>
                          </div>
                        </div>
                      ))}
                      {data.resuscitationBays.available > 0 && (
                        <div className="p-2 rounded-md border border-dashed border-gray-300 bg-gray-50 text-center">
                          <span className="text-[10px] text-gray-500">{data.resuscitationBays.available} bay(s) available</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ED Queue */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-red-600" />
                        ED Queue
                      </h4>
                      <button type="button" className="text-[10px] text-red-600 hover:underline flex items-center gap-0.5">
                        View all <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {data.currentQueue.map((patient) => (
                        <div
                          key={patient.id}
                          className={`p-2 rounded-md border ${getTriageBorderClasses(patient.triage)}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold ${getTriageClasses(patient.triage)}`}>
                                {patient.triage.charAt(0).toUpperCase()}
                              </span>
                              <span className="text-xs font-medium">{patient.name}</span>
                              <span className="text-[10px] text-gray-500">{patient.age}y</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] text-gray-500">{patient.zone}</span>
                              <span className={`px-1.5 py-0.5 text-[9px] rounded ${getQueueStatusClasses(patient.status)}`}>
                                {patient.status === "in-progress" ? "Being seen" : "Waiting"}
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
                  {/* Incoming Ambulances */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Ambulance className="w-3.5 h-3.5 text-red-600" />
                        Incoming
                      </h4>
                      <span className="text-[10px] text-gray-500">{data.ambulanceLog.expected} expected</span>
                    </div>
                    <div className="space-y-1.5">
                      {data.ambulanceLog.cases.map((amb, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded-md border ${getAmbulancePriorityClasses(amb.priority)}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold">ETA {amb.eta}</span>
                              <span className="text-[10px] font-medium">{amb.type}</span>
                            </div>
                            <span className="text-[9px] text-gray-500">{amb.source}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bed Status */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <BedDouble className="w-3.5 h-3.5 text-teal-600" />
                        ED Zones
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(data.bedStatus).map(([key, zone]) => (
                        <div key={key} className="p-2 rounded bg-gray-50">
                          <p className="text-[10px] text-gray-500 mb-0.5">{zone.name}</p>
                          <p className="text-sm font-bold text-gray-900">
                            {zone.occupied}/{zone.total}
                          </p>
                          <div className="w-full h-1 bg-gray-200 rounded mt-1">
                            <div
                              className="h-1 bg-teal-500 rounded"
                              style={{ width: `${(zone.occupied / zone.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pending Actions */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        Pending Actions
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] rounded bg-amber-100 text-amber-700">
                          {data.pendingActions.labsAwaited + data.pendingActions.imagingAwaited + data.pendingActions.consultsPending}
                        </span>
                      </h4>
                    </div>
                    <div className="space-y-1">
                      {data.pendingActions.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-1.5 px-2 rounded bg-gray-50 text-[10px]">
                          <div className="flex-1">
                            <span className="text-gray-700 font-medium">{item.patient}</span>
                            <span className="text-gray-400 ml-1">· {item.action}</span>
                          </div>
                          <span className={`font-medium ${getPriorityClasses(item.priority)}`}>
                            {item.priority}
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
                  value: d.arrivals,
                  secondary: d.discharges
                }))}
                title="Hourly Arrivals & Discharges"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
