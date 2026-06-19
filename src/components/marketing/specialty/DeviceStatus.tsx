"use client";

import { Wifi, WifiOff, Activity, RefreshCw } from "lucide-react";

interface DeviceInfo {
  id: string;
  name: string;
  device: string;
  connected: boolean;
  lastSync: string;
  todayReadings: number;
}

interface DeviceStatusProps {
  devices: DeviceInfo[];
  title?: string;
}

export function DeviceStatus({ devices, title = "Device Integrations" }: DeviceStatusProps) {
  const connectedCount = devices.filter((d) => d.connected).length;

  return (
    <div className="p-5 rounded-xl bg-white border border-[var(--border-default)]">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        <span className={`text-xs px-2 py-1 rounded-full ${
          connectedCount === devices.length 
            ? "bg-green-100 text-green-700" 
            : "bg-amber-100 text-amber-700"
        }`}>
          {connectedCount}/{devices.length} online
        </span>
      </div>
      
      <div className="space-y-3">
        {devices.map((device) => (
          <div
            key={device.id}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              device.connected 
                ? "bg-white border-green-200" 
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                device.connected 
                  ? "bg-green-100" 
                  : "bg-gray-200"
              }`}>
                {device.connected ? (
                  <Wifi className="w-4 h-4 text-green-600" />
                ) : (
                  <WifiOff className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{device.name}</p>
                <p className="text-xs text-[var(--text-secondary)]">{device.device}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-1 text-xs">
                {device.connected ? (
                  <>
                    <RefreshCw className="w-3 h-3 text-green-600" />
                    <span className="text-green-600">{device.lastSync}</span>
                  </>
                ) : (
                  <span className="text-gray-400">{device.lastSync}</span>
                )}
              </div>
              {device.connected && device.todayReadings > 0 && (
                <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)] mt-0.5">
                  <Activity className="w-3 h-3" />
                  <span>{device.todayReadings} today</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
