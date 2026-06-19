"use client";

import { useState } from "react";
import {
  Baby,
  Users,
  Heart,
  Calendar,
  IndianRupee,
  ChevronRight,
  Bell,
  Search,
  Settings,
  LayoutDashboard,
  FileText,
  Package,
  Activity,
  HelpCircle,
  ChevronDown,
  TrendingUp,
  AlertTriangle,
  Stethoscope,
  ClipboardList,
  Bed,
} from "lucide-react";
import { FunnelChart, TrendChart } from "@/components/marketing/specialty";
import { obgDashboardData } from "@/data/seeded/obg";

function getRiskStatusClasses(status: string): string {
  if (status === "high-alert") {
    return "bg-red-100 text-red-700";
  }
  if (status === "monitoring") {
    return "bg-amber-100 text-amber-700";
  }
  return "bg-green-100 text-green-700";
}

function getDeliveryTypeClasses(type: string): string {
  if (type === "LSCS") {
    return "bg-purple-100 text-purple-700";
  }
  return "bg-emerald-100 text-emerald-700";
}

function getDeliveryStatusClasses(status: string): string {
  if (status === "mother-baby-stable") return "bg-green-100 text-green-700";
  if (status === "discharged") return "bg-gray-100 text-gray-600";
  return "bg-blue-100 text-blue-700";
}

function getLaborStatusClasses(status: string): string {
  if (status === "delivery-imminent") {
    return "bg-red-100 text-red-700 animate-pulse";
  }
  if (status === "progressing") {
    return "bg-amber-100 text-amber-700";
  }
  return "bg-blue-100 text-blue-700";
}

function getBadgeClasses(isActive: boolean, label: string): string {
  if (isActive) return "bg-white/20";
  if (label === "High Risk") return "bg-red-600";
  if (label === "PC-PNDT") return "bg-amber-600";
  return "bg-slate-700";
}

function getScheduleSlotClasses(type: string): string {
  if (type === "OT") return "border-purple-200 bg-purple-50";
  if (type === "ANC") return "border-pink-200 bg-pink-50";
  return "border-gray-200 bg-gray-50";
}

function getScheduleTypeBadgeClasses(type: string): string {
  if (type === "OT") return "bg-purple-200 text-purple-700";
  if (type === "ANC") return "bg-pink-200 text-pink-700";
  return "bg-blue-200 text-blue-700";
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Baby, label: "ANC Patients", badge: "248" },
  { icon: Bed, label: "Labor Ward", badge: "3", live: true },
  { icon: Heart, label: "Deliveries", badge: "28" },
  { icon: Stethoscope, label: "Gynec OPD" },
  { icon: ClipboardList, label: "PC-PNDT", badge: "2" },
  { icon: Calendar, label: "Schedule" },
  { icon: FileText, label: "Reports" },
  { icon: Package, label: "Supplies" },
  { icon: Activity, label: "High Risk", badge: "12" },
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
  if (highlight) return "bg-purple-50 border-purple-200";
  return "bg-white border-gray-200";
}

function getStatTextClasses(alert?: boolean, highlight?: boolean): string {
  if (alert) return "text-red-700";
  if (highlight) return "text-purple-700";
  return "text-gray-900";
}

function Stat({ title, value, icon, trend, highlight, alert }: StatProps) {
  return (
    <div className={`p-3 rounded-lg border ${getStatBgClasses(alert, highlight)}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-gray-500 uppercase tracking-wide">{title}</span>
        {icon}
      </div>
      <p className={`text-xl font-bold ${getStatTextClasses(alert, highlight)}`}>{value}</p>
      {trend && (
        <div className="flex items-center gap-1 mt-0.5">
          <TrendingUp className="w-3 h-3 text-green-600" />
          <span className="text-[10px] text-green-600 font-medium">{trend}</span>
        </div>
      )}
    </div>
  );
}

export function OBGDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const data = obgDashboardData;

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
            <span className="truncate">app.aarogyaehr.com/obg/dashboard</span>
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
              <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center">
                <Baby className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-xs">AarogyaEHR</p>
                <p className="text-[9px] text-slate-400">OBG & Maternity</p>
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
                      ? "bg-purple-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                    {item.live && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    )}
                  </span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded ${getBadgeClasses(isActive, item.label)}`}>
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
              <div className="md:hidden w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center">
                <Baby className="w-4 h-4 text-white" />
              </div>
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-8 pr-3 py-1 text-xs rounded-md border border-gray-200 bg-gray-50 w-44 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
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
                <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-[10px] font-semibold">
                  SN
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-gray-900 leading-tight">Dr. Sneha</p>
                  <p className="text-[9px] text-gray-500 leading-tight">OBG Consultant</p>
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
                  <h1 className="text-sm font-semibold text-gray-900">OBG Dashboard</h1>
                  <p className="text-[10px] text-gray-500">Today&apos;s overview</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-medium">
                    <AlertTriangle className="w-3 h-3" />
                    {data.laborWardStatus.activeLabor} in Labor
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{" "}
                    Live
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                <Stat
                  title="ANC Visits"
                  value={data.todayStats.ancVisits}
                  icon={<Baby className="w-3.5 h-3.5 text-purple-600" />}
                  trend="+8%"
                />
                <Stat
                  title="New ANC"
                  value={data.todayStats.newRegistrations}
                  icon={<Users className="w-3.5 h-3.5 text-indigo-600" />}
                />
                <Stat
                  title="Follow-ups"
                  value={data.todayStats.followUps}
                  icon={<Calendar className="w-3.5 h-3.5 text-blue-600" />}
                />
                <Stat
                  title="Deliveries"
                  value={data.todayStats.deliveriesToday}
                  icon={<Heart className="w-3.5 h-3.5 text-pink-600" />}
                />
                <Stat
                  title="High Risk"
                  value={data.todayStats.highRiskPatients}
                  icon={<AlertTriangle className="w-3.5 h-3.5 text-red-600" />}
                  alert
                />
                <Stat
                  title="Revenue"
                  value={`₹${(data.todayStats.revenue / 100000).toFixed(1)}L`}
                  icon={<IndianRupee className="w-3.5 h-3.5 text-purple-600" />}
                  highlight
                />
              </div>

              {/* Main Grid */}
              <div className="grid lg:grid-cols-2 gap-3">
                {/* Left Column */}
                <div className="space-y-3">
                  {/* Delivery Pipeline */}
                  <FunnelChart
                    title="Maternity Pipeline"
                    stages={data.deliveryPipeline.stages}
                    showConversion
                  />

                  {/* Labor Ward Status */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-purple-600" />
                        Labor Ward
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] rounded bg-purple-100 text-purple-700">
                          {data.laborWardStatus.occupied}/{data.laborWardStatus.totalBeds} beds
                        </span>
                      </h4>
                      <button type="button" className="text-[10px] text-purple-600 hover:underline flex items-center gap-0.5">
                        View ward <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {data.laborWardStatus.patients.map((patient) => (
                        <div
                          key={patient.id}
                          className={`p-2 rounded-md border ${
                            patient.status === "delivery-imminent" 
                              ? "border-red-200 bg-red-50" 
                              : "border-gray-100 bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-gray-500">{patient.bedNo}</span>
                              <span className="text-xs font-medium">{patient.name}</span>
                            </div>
                            <span className={`px-1.5 py-0.5 text-[9px] rounded ${getLaborStatusClasses(patient.status)}`}>
                              {patient.stage}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[10px] text-gray-600">
                            <span>Dilatation: <strong className="text-gray-900">{patient.dilatation}</strong></span>
                            <span>FHR: <strong className={patient.fhr < 110 || patient.fhr > 160 ? "text-red-600" : "text-gray-900"}>{patient.fhr}</strong></span>
                            <span>Ctx: <strong className="text-gray-900">{patient.contractions}</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  {/* High Risk Patients */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                        High-Risk Patients
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] rounded bg-red-100 text-red-700">
                          {data.highRiskPatients.length}
                        </span>
                      </h4>
                      <button type="button" className="text-[10px] text-purple-600 hover:underline flex items-center gap-0.5">
                        View all <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {data.highRiskPatients.slice(0, 4).map((patient) => (
                        <div
                          key={patient.id}
                          className="p-2 rounded-md border border-gray-100 bg-gray-50 hover:border-gray-200 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium">{patient.name}</span>
                              <span className="text-[10px] text-gray-500">{patient.age}y</span>
                            </div>
                            <span className={`px-1.5 py-0.5 text-[9px] rounded ${getRiskStatusClasses(patient.status)}`}>
                              {patient.gestationalAge}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {patient.riskFactors.map((factor) => (
                              <span
                                key={factor}
                                className="px-1.5 py-0.5 text-[9px] rounded bg-red-50 text-red-600 border border-red-100"
                              >
                                {factor}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Stats */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-pink-600" />
                      Delivery Breakdown (MTD)
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 rounded-md bg-emerald-50 border border-emerald-100">
                        <p className="text-lg font-bold text-emerald-700">{data.deliveryPipeline.deliveryBreakdown.nvd}</p>
                        <p className="text-[10px] text-emerald-600">NVD</p>
                      </div>
                      <div className="text-center p-2 rounded-md bg-purple-50 border border-purple-100">
                        <p className="text-lg font-bold text-purple-700">{data.deliveryPipeline.deliveryBreakdown.lscs}</p>
                        <p className="text-[10px] text-purple-600">LSCS</p>
                      </div>
                      <div className="text-center p-2 rounded-md bg-blue-50 border border-blue-100">
                        <p className="text-lg font-bold text-blue-700">{data.deliveryPipeline.deliveryBreakdown.instrumental}</p>
                        <p className="text-[10px] text-blue-600">Instrumental</p>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-gray-500">LSCS Rate</span>
                        <span className="font-semibold text-gray-900">
                          {Math.round((data.deliveryPipeline.deliveryBreakdown.lscs / 
                            (data.deliveryPipeline.deliveryBreakdown.nvd + 
                             data.deliveryPipeline.deliveryBreakdown.lscs + 
                             data.deliveryPipeline.deliveryBreakdown.instrumental)) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PC-PNDT Status */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                      <ClipboardList className="w-3.5 h-3.5 text-amber-600" />
                      PC-PNDT Compliance
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-md bg-gray-50 border border-gray-100">
                        <p className="text-[10px] text-gray-500">Today&apos;s Scans</p>
                        <p className="text-lg font-bold text-gray-900">{data.pcpndtRegister.todayScans}</p>
                      </div>
                      <div className="p-2 rounded-md bg-gray-50 border border-gray-100">
                        <p className="text-[10px] text-gray-500">MTD Total</p>
                        <p className="text-lg font-bold text-gray-900">{data.pcpndtRegister.monthToDate}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between p-2 rounded-md bg-green-50 border border-green-100">
                      <span className="text-[10px] text-green-700">Form-F Compliance</span>
                      <span className="text-xs font-bold text-green-700">{data.pcpndtRegister.compliance}%</span>
                    </div>
                    {data.pcpndtRegister.pendingFormF > 0 && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-amber-700">
                        <AlertTriangle className="w-3 h-3" />
                        {data.pcpndtRegister.pendingFormF} Form-F pending signature
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid lg:grid-cols-2 gap-3">
                <TrendChart
                  data={data.weeklyTrends.map(d => ({
                    day: d.day,
                    opd: d.ancVisits,
                    surgery: d.deliveries,
                    date: d.day
                  }))}
                  title="Weekly ANC & Deliveries"
                />

                {/* Recent Deliveries */}
                <div className="p-3 rounded-lg bg-white border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-semibold text-gray-900">Recent Deliveries</h4>
                    <button type="button" className="text-[10px] text-purple-600 hover:underline flex items-center gap-0.5">
                      View all <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-left text-[10px] text-gray-500 border-b border-gray-100">
                          <th className="pb-1.5 font-medium">Mother</th>
                          <th className="pb-1.5 font-medium">Type</th>
                          <th className="pb-1.5 font-medium">Baby</th>
                          <th className="pb-1.5 font-medium hidden sm:table-cell">APGAR</th>
                          <th className="pb-1.5 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.recentDeliveries.slice(0, 4).map((delivery) => (
                          <tr key={delivery.id} className="border-b border-gray-50 last:border-0">
                            <td className="py-2 font-medium">{delivery.motherName}</td>
                            <td className="py-2">
                              <span className={`px-1.5 py-0.5 text-[10px] rounded ${getDeliveryTypeClasses(delivery.type)}`}>
                                {delivery.type}
                              </span>
                            </td>
                            <td className="py-2">
                              <span className="text-gray-600">{delivery.babySex}</span>
                              <span className="text-gray-400 mx-1">·</span>
                              <span className="font-medium">{delivery.babyWeight}kg</span>
                            </td>
                            <td className="py-2 hidden sm:table-cell text-gray-600">
                              {delivery.apgar.oneMin}/{delivery.apgar.fiveMin}
                            </td>
                            <td className="py-2">
                              <span className={`px-1.5 py-0.5 text-[10px] rounded ${getDeliveryStatusClasses(delivery.status)}`}>
                                {delivery.status.split("-").join(" ")}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Today's Schedule */}
              <div className="p-3 rounded-lg bg-white border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-gray-900">Today&apos;s Schedule</h4>
                  <button type="button" className="text-[10px] text-purple-600 hover:underline flex items-center gap-0.5">
                    Full schedule <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {data.upcomingSchedule.slice(0, 8).map((slot) => (
                    <div
                      key={`${slot.time}-${slot.patient}`}
                      className={`p-2 rounded-md border ${getScheduleSlotClasses(slot.type)}`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] font-semibold text-gray-900">{slot.time}</span>
                        <span className={`text-[9px] px-1 rounded ${getScheduleTypeBadgeClasses(slot.type)}`}>
                          {slot.type}
                        </span>
                      </div>
                      <p className="text-[10px] font-medium text-gray-800 truncate">{slot.patient}</p>
                      <p className="text-[9px] text-gray-500 truncate">{slot.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
