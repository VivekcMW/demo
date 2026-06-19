"use client";

import { useState } from "react";
import {
  Eye,
  Users,
  Scissors,
  MapPin,
  IndianRupee,
  Calendar,
  ChevronRight,
  Bell,
  Search,
  Settings,
  LayoutDashboard,
  FileText,
  Package,
  Truck,
  Activity,
  HelpCircle,
  ChevronDown,
  TrendingUp,
} from "lucide-react";
import {
  FunnelChart,
  DeviceStatus,
  InventoryTable,
  CounselorLeaderboard,
  CampFunnel,
  TrendChart,
} from "@/components/marketing/specialty";
import {
  ophthalmologyDashboardData,
} from "@/data/seeded/ophthalmology";

function getStatusClasses(status: string): string {
  if (status.includes("Post-Op")) {
    return "bg-green-100 text-green-700";
  }
  if (status.includes("Scheduled")) {
    return "bg-amber-100 text-amber-700";
  }
  return "bg-blue-100 text-blue-700";
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Patients", badge: "1,284" },
  { icon: Calendar, label: "Appointments", badge: "47" },
  { icon: Scissors, label: "Surgeries" },
  { icon: Eye, label: "Refraction" },
  { icon: MapPin, label: "Camps", badge: "3" },
  { icon: Package, label: "IOL Inventory" },
  { icon: FileText, label: "Reports" },
  { icon: Truck, label: "Optical Shop" },
  { icon: Activity, label: "Devices" },
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

export function OphthalmologyDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const data = ophthalmologyDashboardData;

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
            <span className="truncate">app.aarogyaehr.com/ophthalmology/dashboard</span>
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
                <Eye className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-xs">AarogyaEHR</p>
                <p className="text-[9px] text-slate-400">Ophthalmology</p>
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
                <Eye className="w-4 h-4 text-white" />
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
                Wed, 17 Jun
              </span>
              <button type="button" className="relative p-1.5 rounded-md hover:bg-gray-100">
                <Bell className="w-4 h-4 text-gray-600" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-1.5 pl-2 border-l border-gray-200">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-semibold">
                  DR
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-gray-900 leading-tight">Dr. Ramesh</p>
                  <p className="text-[9px] text-gray-500 leading-tight">Ophthalmologist</p>
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
                  <h1 className="text-sm font-semibold text-gray-900">Dashboard</h1>
                  <p className="text-[10px] text-gray-500">Today's overview</p>
                </div>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{" "}
                  Live
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                <Stat
                  title="OPD"
                  value={data.todayStats.opdPatients}
                  icon={<Users className="w-3.5 h-3.5 text-blue-600" />}
                  trend="+12%"
                />
                <Stat
                  title="New Patients"
                  value={data.todayStats.newPatients}
                  icon={<Eye className="w-3.5 h-3.5 text-purple-600" />}
                />
                <Stat
                  title="Follow-ups"
                  value={data.todayStats.followUps}
                  icon={<Calendar className="w-3.5 h-3.5 text-indigo-600" />}
                />
                <Stat
                  title="Surgeries"
                  value={data.todayStats.surgeriesScheduled}
                  icon={<Scissors className="w-3.5 h-3.5 text-amber-600" />}
                />
                <Stat
                  title="Camp Referrals"
                  value={data.todayStats.campReferrals}
                  icon={<MapPin className="w-3.5 h-3.5 text-green-600" />}
                />
                <Stat
                  title="Revenue"
                  value={`₹${(data.todayStats.revenue / 100000).toFixed(1)}L`}
                  icon={<IndianRupee className="w-3.5 h-3.5 text-blue-600" />}
                  highlight
                />
              </div>

              {/* Main Grid */}
              <div className="grid lg:grid-cols-2 gap-3">
                {/* Left Column */}
                <div className="space-y-3">
                  <FunnelChart
                    title="Cataract Surgery Pipeline"
                    stages={data.cataractPipeline.stages}
                    showConversion
                  />
                  <CounselorLeaderboard
                    counselors={data.counselorPerformance as { id: number; name: string; role: string; consultations: number; conversions: number; rate: number; trend: "up" | "down" | "stable" }[]}
                    title="Counselor Performance"
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <InventoryTable
                    items={data.iolInventory}
                    title="IOL Inventory"
                  />
<CampFunnel
                    stats={data.campStats as { activeCamps: number; screenedThisMonth: number; referredForSurgery: number; surgeryCompleted: number; pendingFollowup: number; conversionRate: number; locations: { id: number; name: string; date: string; screened: number; referred: number; operated: number; pending: number; status: "active" | "completed" | "upcoming" }[] }}
                    title="Camp Pipeline"
                  />
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid lg:grid-cols-2 gap-3">
                <TrendChart data={data.weeklyTrend} title="Weekly Trend" />
                <DeviceStatus
                  devices={data.deviceIntegrations}
                  title="Connected Devices"
                />
              </div>

              {/* Recent Patients */}
              <div className="p-3 rounded-lg bg-white border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-gray-900">Recent Patients</h4>
                  <button type="button" className="text-[10px] text-blue-600 hover:underline flex items-center gap-0.5">
                    View all <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-[10px] text-gray-500 border-b border-gray-100">
                        <th className="pb-1.5 font-medium">ID</th>
                        <th className="pb-1.5 font-medium">Name</th>
                        <th className="pb-1.5 font-medium hidden sm:table-cell">Age</th>
                        <th className="pb-1.5 font-medium">Condition</th>
                        <th className="pb-1.5 font-medium">Eye</th>
                        <th className="pb-1.5 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.recentPatients.slice(0, 4).map((patient) => (
                        <tr key={patient.id} className="border-b border-gray-50 last:border-0">
                          <td className="py-2 font-mono text-[10px] text-blue-600">{patient.id}</td>
                          <td className="py-2 font-medium">{patient.name}</td>
                          <td className="py-2 text-gray-500 hidden sm:table-cell">{patient.age}</td>
                          <td className="py-2">{patient.condition}</td>
                          <td className="py-2">
                            <span className="px-1.5 py-0.5 text-[10px] rounded bg-blue-100 text-blue-700">
                              {patient.eye}
                            </span>
                          </td>
                          <td className="py-2">
                            <span className={`px-1.5 py-0.5 text-[10px] rounded ${getStatusClasses(patient.status)}`}>
                              {patient.status}
                            </span>
                          </td>
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
  );
}
