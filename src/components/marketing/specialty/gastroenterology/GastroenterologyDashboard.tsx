"use client";

import { useState } from "react";
import {
  Scan,
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
  Clock,
  UserCheck,
  AlertCircle,
  Microscope,
  TestTubes,
} from "lucide-react";
import { TrendChart } from "@/components/marketing/specialty";
import { gastroenterologyDashboardData } from "@/data/seeded/gastroenterology";

function getProcedureStatusClasses(status: string): string {
  if (status === "completed") return "bg-green-100 text-green-700";
  if (status === "in-progress") return "bg-blue-100 text-blue-700";
  return "bg-amber-100 text-amber-700";
}

function getBiopsyStatusClasses(status: string): string {
  if (status === "reported") return "bg-green-100 text-green-700";
  if (status === "processing") return "bg-blue-100 text-blue-700";
  return "bg-amber-100 text-amber-700";
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "OPD Queue", badge: "42" },
  { icon: Scan, label: "Endoscopy Suite", badge: "5" },
  { icon: TestTubes, label: "Liver Clinic", badge: "8" },
  { icon: Microscope, label: "Biopsies" },
  { icon: Calendar, label: "Follow-ups", badge: "18" },
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
    <div className={`p-3 rounded-lg border ${highlight ? "bg-amber-50 border-amber-200" : "bg-white border-gray-200"}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-gray-500 uppercase tracking-wide">{title}</span>
        {icon}
      </div>
      <p className={`text-xl font-bold ${highlight ? "text-amber-700" : "text-gray-900"}`}>{value}</p>
      {trend && (
        <div className="flex items-center gap-1 mt-0.5">
          <TrendingUp className="w-3 h-3 text-green-600" />
          <span className="text-[10px] text-green-600 font-medium">{trend}</span>
        </div>
      )}
    </div>
  );
}

export function GastroenterologyDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const data = gastroenterologyDashboardData;

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
            <span className="truncate">app.aarogyaehr.com/gastro/dashboard</span>
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
              <div className="w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center">
                <Scan className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-xs">AarogyaEHR</p>
                <p className="text-[9px] text-slate-400">Gastroenterology</p>
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
                      ? "bg-amber-600 text-white"
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
              <div className="md:hidden w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center">
                <Scan className="w-4 h-4 text-white" />
              </div>
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-8 pr-3 py-1 text-xs rounded-md border border-gray-200 bg-gray-50 w-44 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
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
                <div className="w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center text-white text-[10px] font-semibold">
                  SK
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-gray-900 leading-tight">Dr. Suresh Kumar</p>
                  <p className="text-[9px] text-gray-500 leading-tight">Gastroenterologist</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50 space-y-3">
            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Stat
                title="OPD Today"
                value={data.todayStats.opdPatients}
                icon={<Users className="w-4 h-4 text-amber-500" />}
                highlight
              />
              <Stat
                title="Endoscopies"
                value={data.todayStats.endoscopies}
                icon={<Scan className="w-4 h-4 text-blue-500" />}
                trend="+2 vs avg"
              />
              <Stat
                title="Colonoscopies"
                value={data.todayStats.colonoscopies}
                icon={<Activity className="w-4 h-4 text-green-500" />}
              />
              <Stat
                title="Liver Clinic"
                value={data.todayStats.liverClinic}
                icon={<TestTubes className="w-4 h-4 text-purple-500" />}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {/* Procedure Queue */}
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Endoscopy Suite</h3>
                  <span className="text-[10px] text-amber-600 font-medium">{data.procedureQueue.length} procedures</span>
                </div>
                <div className="space-y-2">
                  {data.procedureQueue.map((proc) => (
                    <div key={proc.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                      <div>
                        <p className="text-xs font-medium text-gray-900">{proc.name}, {proc.age}y</p>
                        <p className="text-[10px] text-gray-500">{proc.procedure}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500">{proc.time}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${getProcedureStatusClasses(proc.status)}`}>
                          {proc.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Liver Disease Registry */}
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Liver Disease Registry</h3>
                  <span className="text-[10px] text-purple-600 font-medium">{data.liverDiseaseRegistry.cirrhosis.total + data.liverDiseaseRegistry.hepatitisB.total + data.liverDiseaseRegistry.nafld.total} patients</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-purple-50">
                    <span className="text-xs font-medium text-gray-700">Cirrhosis</span>
                    <span className="text-sm font-bold text-purple-700">{data.liverDiseaseRegistry.cirrhosis.total}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50">
                    <span className="text-xs font-medium text-gray-700">Hepatitis B</span>
                    <span className="text-sm font-bold text-blue-700">{data.liverDiseaseRegistry.hepatitisB.total}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50">
                    <span className="text-xs font-medium text-gray-700">NAFLD/NASH</span>
                    <span className="text-sm font-bold text-amber-700">{data.liverDiseaseRegistry.nafld.total}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-green-50">
                    <span className="text-xs font-medium text-gray-700">Hepatitis C (Cured)</span>
                    <span className="text-sm font-bold text-green-700">{data.liverDiseaseRegistry.hepatitisC.cured}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Biopsies */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">Recent Biopsies</h3>
                <span className="text-[10px] text-gray-500">{data.recentBiopsies.length} pending</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 text-gray-500 font-medium">Patient</th>
                      <th className="text-left py-2 text-gray-500 font-medium">Site</th>
                      <th className="text-center py-2 text-gray-500 font-medium">Status</th>
                      <th className="text-right py-2 text-gray-500 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentBiopsies.map((biopsy) => (
                      <tr key={biopsy.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-2 font-medium text-gray-900">{biopsy.patient}</td>
                        <td className="py-2 text-gray-600">{biopsy.site}</td>
                        <td className="py-2 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${getBiopsyStatusClasses(biopsy.status)}`}>
                            {biopsy.status}
                          </span>
                        </td>
                        <td className="py-2 text-right text-gray-500">{biopsy.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Weekly Trend */}
            <TrendChart
              title="Weekly Procedures"
              data={data.weeklyTrend}
              primaryLabel="Endoscopies"
              secondaryLabel="Colonoscopies"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
