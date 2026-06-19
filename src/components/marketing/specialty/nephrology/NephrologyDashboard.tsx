"use client";

import { useState } from "react";
import {
  Droplet,
  Users,
  Calendar,
  Bell,
  Search,
  Settings,
  LayoutDashboard,
  FileText,
  Activity,
  HelpCircle,
  TrendingUp,
  Heart,
  Microscope,
  RefreshCw,
} from "lucide-react";
import { TrendChart } from "@/components/marketing/specialty";
import { nephrologyDashboardData } from "@/data/seeded/nephrology";

function getDialysisStatusClasses(status: string): string {
  if (status === "completed") return "bg-green-100 text-green-700";
  if (status === "running") return "bg-blue-100 text-blue-700";
  return "bg-amber-100 text-amber-700";
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "OPD Queue", badge: "32" },
  { icon: RefreshCw, label: "Dialysis Unit", badge: "48" },
  { icon: Heart, label: "Transplant Clinic", badge: "8" },
  { icon: Microscope, label: "Biopsies", badge: "2" },
  { icon: Activity, label: "AKI Monitoring", badge: "4" },
  { icon: FileText, label: "Reports" },
  { icon: Calendar, label: "Follow-ups" },
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
    <div className={`p-3 rounded-lg border ${highlight ? "bg-teal-50 border-teal-200" : "bg-white border-gray-200"}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-gray-500 uppercase tracking-wide">{title}</span>
        {icon}
      </div>
      <p className={`text-xl font-bold ${highlight ? "text-teal-700" : "text-gray-900"}`}>{value}</p>
      {trend && (
        <div className="flex items-center gap-1 mt-0.5">
          <TrendingUp className="w-3 h-3 text-green-600" />
          <span className="text-[10px] text-green-600 font-medium">{trend}</span>
        </div>
      )}
    </div>
  );
}

export function NephrologyDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const data = nephrologyDashboardData;

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
            <span className="truncate">app.aarogyaehr.com/nephrology/dashboard</span>
          </div>
        </div>
        <div className="w-12" />
      </div>

      {/* App Shell */}
      <div className="flex h-170 bg-white">
        {/* Sidebar */}
        <div className="hidden md:flex w-52 bg-slate-900 text-white flex-col shrink-0">
          <div className="p-3 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center">
                <Droplet className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-xs">AarogyaEHR</p>
                <p className="text-[9px] text-slate-400">Nephrology</p>
              </div>
            </div>
          </div>

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
                <Droplet className="w-4 h-4 text-white" />
              </div>
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-8 pr-3 py-1 text-xs rounded-md border border-gray-200 bg-gray-50 w-44 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[10px] text-gray-500">Tue, 17 Jun</span>
              <button type="button" className="relative p-1.5 rounded-md hover:bg-gray-100">
                <Bell className="w-4 h-4 text-gray-600" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-1.5 pl-2 border-l border-gray-200">
                <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-white text-[10px] font-semibold">
                  SB
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-gray-900 leading-tight">Dr. Sunita Bhat</p>
                  <p className="text-[9px] text-gray-500 leading-tight">Nephrologist</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50 space-y-3">
            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Stat
                title="Dialysis Today"
                value={data.todayStats.dialysisSessions}
                icon={<RefreshCw className="w-4 h-4 text-teal-500" />}
                highlight
              />
              <Stat
                title="OPD"
                value={data.todayStats.opdPatients}
                icon={<Users className="w-4 h-4 text-blue-500" />}
              />
              <Stat
                title="Transplant Clinic"
                value={data.todayStats.transplantClinic}
                icon={<Heart className="w-4 h-4 text-pink-500" />}
              />
              <Stat
                title="AKI Consults"
                value={data.todayStats.akiConsults}
                icon={<Activity className="w-4 h-4 text-red-500" />}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {/* Dialysis Unit */}
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Dialysis Unit</h3>
                  <span className="text-[10px] text-teal-600 font-medium">{data.dialysisUnit.length} patients</span>
                </div>
                <div className="space-y-2">
                  {data.dialysisUnit.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                      <div>
                        <p className="text-xs font-medium text-gray-900">{patient.name}</p>
                        <p className="text-[10px] text-gray-500">{patient.machine} • {patient.access}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500">{patient.shift}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${getDialysisStatusClasses(patient.status)}`}>
                          {patient.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CKD Registry */}
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">CKD Registry</h3>
                  <span className="text-[10px] text-purple-600 font-medium">{data.ckdRegistry.stage3.total + data.ckdRegistry.stage4.total + data.ckdRegistry.stage5.total} patients</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50">
                    <div>
                      <span className="text-xs font-medium text-gray-700">Stage 3 CKD</span>
                      <p className="text-[10px] text-gray-500">3a: {data.ckdRegistry.stage3.a} | 3b: {data.ckdRegistry.stage3.b}</p>
                    </div>
                    <span className="text-sm font-bold text-amber-700">{data.ckdRegistry.stage3.total}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-orange-50">
                    <div>
                      <span className="text-xs font-medium text-gray-700">Stage 4 CKD</span>
                      <p className="text-[10px] text-gray-500">Pre-dialysis: {data.ckdRegistry.stage4.preDialysis}</p>
                    </div>
                    <span className="text-sm font-bold text-orange-700">{data.ckdRegistry.stage4.total}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-red-50">
                    <div>
                      <span className="text-xs font-medium text-gray-700">Stage 5 / ESRD</span>
                      <p className="text-[10px] text-gray-500">HD: {data.ckdRegistry.stage5.onHD} | PD: {data.ckdRegistry.stage5.onPD}</p>
                    </div>
                    <span className="text-sm font-bold text-red-700">{data.ckdRegistry.stage5.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transplant Follow-up */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">Transplant Follow-up</h3>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center p-3 rounded-lg bg-green-50">
                  <p className="text-2xl font-bold text-green-700">{data.transplantFollowUp.total}</p>
                  <p className="text-[10px] text-gray-500">Total</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-blue-50">
                  <p className="text-2xl font-bold text-blue-700">{data.transplantFollowUp.stable}</p>
                  <p className="text-[10px] text-gray-500">Stable</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-amber-50">
                  <p className="text-2xl font-bold text-amber-700">{data.transplantFollowUp.rejection}</p>
                  <p className="text-[10px] text-gray-500">Rejection</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-purple-50">
                  <p className="text-2xl font-bold text-purple-700">{data.transplantFollowUp.within1Year}</p>
                  <p className="text-[10px] text-gray-500">&lt;1 Year</p>
                </div>
              </div>
            </div>

            {/* Weekly Trend */}
            <TrendChart
              title="Weekly Dialysis & OPD"
              data={data.weeklyTrend}
              primaryLabel="Dialysis"
              secondaryLabel="OPD"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
