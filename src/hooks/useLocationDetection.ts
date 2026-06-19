"use client";

import { useEffect } from "react";
import { useLocationStore } from "@/store/locationStore";

interface IpApiResponse {
  status: "success" | "fail";
  city: string;
  regionName: string;
  country: string;
  countryCode: string;
  message?: string;
}

export function useLocationDetection() {
  const { isDetected, isLoading, setLocation, setLoading, setError } =
    useLocationStore();

  useEffect(() => {
    // Skip if already detected or currently loading
    if (isDetected || isLoading) return;

    const detectLocation = async () => {
      setLoading(true);

      try {
        // Using ip-api.com - free, no API key required
        // Note: Only works over HTTP in development, HTTPS requires pro plan
        // In production, use a server-side API route or ipinfo.io
        const response = await fetch(
          "http://ip-api.com/json/?fields=status,message,country,countryCode,regionName,city"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch location");
        }

        const data: IpApiResponse = await response.json();

        if (data.status === "success") {
          setLocation({
            city: data.city,
            region: data.regionName,
            country: data.country,
            countryCode: data.countryCode,
          });
        } else {
          setError(data.message || "Location detection failed");
        }
      } catch (err) {
        // Silently fail - location detection is optional
        setError(err instanceof Error ? err.message : "Unknown error");
        console.warn("Location detection failed:", err);
      }
    };

    detectLocation();
  }, [isDetected, isLoading, setLocation, setLoading, setError]);

  return useLocationStore();
}

// Component version for use in layout
export function LocationDetector() {
  useLocationDetection();
  return null;
}
