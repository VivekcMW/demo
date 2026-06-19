"use client";

import { useState } from "react";
import {
  Stethoscope,
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
  Activity,
  HelpCircle,
  ChevronDown,
  TrendingUp,
  Clock,
  UserCheck,
  AlertCircle,
  Clipboard,
  Pill,
} from "lucide-react";
import { TrendChart } from "@/components/marketing/specialty";
import { generalMedicineDashboardData } from "@/data/seeded/general-medicine";

function getQueueStatusClasses(status: string): string {
  if (status === "in-progress") return "bg-green-100 text-green-700";
  if (status === "waiting") return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-600";
}

function getVisitTypeClasses(type: string): string {
  if (type === "New") return "bg-blue-100 text-blue-700";
  return "bg-purple-100 text-purple-700";
}

function getControlStatusClasses(controlled: number): string {
  if (controlled >= 70) return "text-green-600";
  if (controlled >= 50) return "text-amber-600";
  return "text-red-600";
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "OPD Queue", badge: "14" },
  { icon: UserCheck, label: "Patients", badge: "72" },
  { icon: Heart, label: "Chronic Registry", badge: "4.8K" },
  { icon: Calendar, label: "Follow-ups", badge: "156" },
  { icon: Clipboard, label: "Order Sets" },
  { icon: Pill, label: "Prescriptions" },
  { icon: FileText, label: "Reports" },
  { icon: Activity, label: "Analytics" },
];

interface StatProps {
  readonly title: string;
  readonly value: string | number;
  readonly icon: React.ReactNode;
  readonly trend?: string;
  readonly highlight?: boolean;
}

function Stat({ title, value, icon, trend, highlight }: StatProps) {
  return (
    <div className={`p-3 rounded-lg border ${highlight ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-gray-500 uppercase tracking-wide">{title}</span>
        {icon}
      </div>
      <p className={`text-xl font-bold ${highlight ? "text-blue-700" : "text-gray-900"}`}>{value}</p>
      {trend && (
        <div className="flex items-center gap-1 mt-0.5">
          <TrendingUp className="w-3 h-3 text-green-600" />
          <span className="text-[10px] text-green-600 font-medium">{trend}</span>
        </div>
      )}
    </div>
  );
}

export function GeneralMedicineDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const data = generalMedicineDashboardData;

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
            <span className="truncate">app.aarogyaehr.com/general-medicine/dashboard</span>
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
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-xs">AarogyaEHR</p>
                <p className="text-[9px] text-slate-400">General Medicine</p>
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
                      ? "bg-blue-600 text-white"
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
              <div className="md:hidden w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-white" />
              </div>
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-8 pr-3 py-1 text-xs rounded-md border border-gray-200 bg-gray-50 w-44 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-semibold">
                  AM
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-gray-900 leading-tight">Dr. Anil Mehta</p>
                  <p className="text-[9px] text-gray-500 leading-tight">Sr. Consultant</p>
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
                  <h1 className="text-sm font-semibold text-gray-900">OPD Dashboard</h1>
                  <p className="text-[10px] text-gray-500">Today&apos;s overview</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-medium">
                    <Clock className="w-3 h-3" />
                    {data.queueStatus.waiting} waiting
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
                  title="OPD Today"
                  value={data.todayStats.opdPatients}
                  icon={<Users className="w-3.5 h-3.5 text-blue-600" />}
                  trend="+6%"
                />
                <Stat
                  title="New Patients"
                  value={data.todayStats.newPatients}
                  icon={<UserCheck className="w-3.5 h-3.5 text-green-600" />}
                />
                <Stat
                  title="Follow-ups"
                  value={data.todayStats.followUps}
                  icon={<Calendar className="w-3.5 h-3.5 text-purple-600" />}
                />
                <Stat
                  title="Completed"
                  value={data.todayStats.consultationsCompleted}
                  icon={<Activity className="w-3.5 h-3.5 text-indigo-600" />}
                />
                <Stat
                  title="Chronic"
                  value={data.todayStats.chronicReviews}
                  icon={<Heart className="w-3.5 h-3.5 text-red-600" />}
                />
                <Stat
                  title="Revenue"
                  value={`₹${(data.todayStats.revenue / 100000).toFixed(2)}L`}
                  icon={<IndianRupee className="w-3.5 h-3.5 text-blue-600" />}
                  highlight
                />
              </div>

              {/* Main Grid */}
              <div className="grid lg:grid-cols-2 gap-3">
                {/* Left Column */}
                <div className="space-y-3">
                  {/* Queue Status */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                        Current Queue
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] rounded bg-blue-100 text-blue-700">
                          {data.queueStatus.inProgress} in progress
                        </span>
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <span>Avg wait: <strong className="text-gray-900">{data.queueStatus.avgWaitTime}m</strong></span>
                        <span>Avg consult: <strong className="text-gray-900">{data.queueStatus.avgConsultTime}m</strong></span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {data.currentQueue.slice(0, 4).map((patient) => (
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
                              <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                                {patient.tokenNo}
                              </span>
                              <div>
                                <span className="text-xs font-medium">{patient.name}</span>
                                <span className="text-[10px] text-gray-500 ml-1">{patient.age}y</span>
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
                          <div className="flex items-center justify-between text-[10px] text-gray-600">
                            <span className="truncate max-w-48">{patient.chiefComplaint}</span>
                            <span className="text-gray-400 flex items-center gap-0.5">
                              <Clock className="w-3 h-3" />
                              {patient.waitingSince}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button type="button" className="mt-2 w-full py-1.5 text-[10px] text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                      View full queue ({data.queueStatus.waiting + data.queueStatus.inProgress}) →
                    </button>
                  </div>

                  {/* Diagnosis Distribution */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-900 mb-2">Today&apos;s Diagnoses</h4>
                    <div className="space-y-1.5">
                      {data.diagnosisDistribution.slice(0, 5).map((item) => (
                        <div key={item.diagnosis} className="flex items-center gap-2">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-[10px] text-gray-700">{item.diagnosis}</span>
                              <span className="text-[10px] text-gray-500">{item.count}</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  {/* Chronic Disease Registry */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-red-600" />
                        Chronic Disease Registry
                      </h4>
                      <button type="button" className="text-[10px] text-blue-600 hover:underline flex items-center gap-0.5">
                        View all <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {/* Diabetes */}
                      <div className="p-2 rounded-md bg-amber-50 border border-amber-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-medium text-amber-800">Diabetes</span>
                          <span className="text-xs font-bold text-amber-700">{data.chronicRegistries.diabetes.totalEnrolled.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-[9px]">
                          <span className="text-amber-600">Due: {data.chronicRegistries.diabetes.dueForReview}</span>
                          <span className={getControlStatusClasses(data.chronicRegistries.diabetes.controlled)}>
                            {data.chronicRegistries.diabetes.controlled}% controlled
                          </span>
                        </div>
                        <div className="mt-1 text-[9px] text-gray-500">
                          Avg HbA1c: <strong className="text-gray-900">{data.chronicRegistries.diabetes.avgHbA1c}%</strong>
                        </div>
                      </div>

                      {/* Hypertension */}
                      <div className="p-2 rounded-md bg-red-50 border border-red-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-medium text-red-800">Hypertension</span>
                          <span className="text-xs font-bold text-red-700">{data.chronicRegistries.hypertension.totalEnrolled.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-[9px]">
                          <span className="text-red-600">Due: {data.chronicRegistries.hypertension.dueForReview}</span>
                          <span className={getControlStatusClasses(data.chronicRegistries.hypertension.controlled)}>
                            {data.chronicRegistries.hypertension.controlled}% controlled
                          </span>
                        </div>
                        <div className="mt-1 text-[9px] text-gray-500">
                          Avg BP: <strong className="text-gray-900">{data.chronicRegistries.hypertension.avgBP}</strong>
                        </div>
                      </div>

                      {/* Thyroid */}
                      <div className="p-2 rounded-md bg-purple-50 border border-purple-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-medium text-purple-800">Thyroid</span>
                          <span className="text-xs font-bold text-purple-700">{data.chronicRegistries.thyroid.totalEnrolled.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-[9px]">
                          <span className="text-purple-600">Due: {data.chronicRegistries.thyroid.dueForReview}</span>
                        </div>
                        <div className="mt-1 text-[9px] text-gray-500">
                          Hypo: {data.chronicRegistries.thyroid.hypothyroid} · Hyper: {data.chronicRegistries.thyroid.hyperthyroid}
                        </div>
                      </div>

                      {/* Asthma */}
                      <div className="p-2 rounded-md bg-blue-50 border border-blue-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-medium text-blue-800">Asthma/COPD</span>
                          <span className="text-xs font-bold text-blue-700">{data.chronicRegistries.asthma.totalEnrolled}</span>
                        </div>
                        <div className="flex items-center justify-between text-[9px]">
                          <span className="text-blue-600">Due: {data.chronicRegistries.asthma.dueForReview}</span>
                          <span className="text-red-600">Overdue: {data.chronicRegistries.asthma.overdueReview}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Follow-up Compliance */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-purple-600" />
                        Follow-up Compliance
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] rounded bg-green-100 text-green-700">
                          {data.followUpCompliance.complianceRate}%
                        </span>
                      </h4>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="text-center p-2 rounded-md bg-green-50 border border-green-100">
                        <p className="text-lg font-bold text-green-700">{data.followUpCompliance.attended}</p>
                        <p className="text-[9px] text-green-600">Attended</p>
                      </div>
                      <div className="text-center p-2 rounded-md bg-gray-50 border border-gray-100">
                        <p className="text-lg font-bold text-gray-700">{data.followUpCompliance.scheduled}</p>
                        <p className="text-[9px] text-gray-600">Scheduled</p>
                      </div>
                      <div className="text-center p-2 rounded-md bg-red-50 border border-red-100">
                        <p className="text-lg font-bold text-red-700">{data.followUpCompliance.missed}</p>
                        <p className="text-[9px] text-red-600">Missed</p>
                      </div>
                    </div>
                    {data.followUpCompliance.defaulters.length > 0 && (
                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1 text-[10px] text-red-600 mb-1.5">
                          <AlertCircle className="w-3 h-3" />
                          Top defaulters requiring follow-up
                        </div>
                        {data.followUpCompliance.defaulters.slice(0, 2).map((defaulter) => (
                          <div key={defaulter.uhid} className="flex items-center justify-between py-1 text-[10px]">
                            <span className="text-gray-700">{defaulter.name}</span>
                            <span className="text-gray-500">{defaulter.condition} · {defaulter.daysMissed}d overdue</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Order Set Usage */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                      <Clipboard className="w-3.5 h-3.5 text-indigo-600" />
                      Order Set Usage (Today)
                    </h4>
                    <div className="space-y-1.5">
                      {data.orderSetUsage.slice(0, 4).map((orderSet) => (
                        <div key={orderSet.name} className="flex items-center justify-between py-1 px-2 rounded bg-gray-50">
                          <span className="text-[10px] text-gray-700">{orderSet.name}</span>
                          <div className="flex items-center gap-2 text-[10px]">
                            <span className="font-medium text-gray-900">{orderSet.usageToday}x</span>
                            <span className="text-gray-400">avg {orderSet.avgTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid lg:grid-cols-2 gap-3">
                <TrendChart
                  data={data.weeklyTrends.map(d => ({
                    day: d.day,
                    value: d.opdCount,
                    secondary: d.chronicReviews
                  }))}
                  title="Weekly OPD & Chronic Reviews"
                />

                {/* Recent Consults */}
                <div className="p-3 rounded-lg bg-white border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-semibold text-gray-900">Recent Consultations</h4>
                    <button type="button" className="text-[10px] text-blue-600 hover:underline flex items-center gap-0.5">
                      View all <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-left text-[10px] text-gray-500 border-b border-gray-100">
                          <th className="pb-1.5 font-medium">#</th>
                          <th className="pb-1.5 font-medium">Patient</th>
                          <th className="pb-1.5 font-medium hidden sm:table-cell">Type</th>
                          <th className="pb-1.5 font-medium">Diagnosis</th>
                          <th className="pb-1.5 font-medium">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.recentConsults.slice(0, 4).map((consult) => (
                          <tr key={consult.id} className="border-b border-gray-50 last:border-0">
                            <td className="py-2">
                              <span className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-gray-100 text-[10px] font-medium">
                                {consult.tokenNo}
                              </span>
                            </td>
                            <td className="py-2">
                              <span className="font-medium">{consult.name}</span>
                              <span className="text-gray-400 ml-1">{consult.age}y</span>
                            </td>
                            <td className="py-2 hidden sm:table-cell">
                              <span className={`px-1.5 py-0.5 text-[9px] rounded ${getVisitTypeClasses(consult.visitType)}`}>
                                {consult.visitType}
                              </span>
                            </td>
                            <td className="py-2 max-w-32 truncate text-gray-600">{consult.diagnosis}</td>
                            <td className="py-2 text-gray-500">{consult.duration}m</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
