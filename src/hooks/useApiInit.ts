"use client";

import { useEffect } from "react";
import { getAuthToken } from "@/services/apiClient";
import { usePatientStore } from "@/store/usePatientStore";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { useBillingStore } from "@/store/useBillingStore";

export function useApiInit() {
  const refreshPatients = usePatientStore((s) => s.refresh);
  const refreshAppts = useAppointmentStore((s) => s.refresh);
  const refreshBills = useBillingStore((s) => s.refresh);

  useEffect(() => {
    if (!getAuthToken()) return;
    refreshPatients();
    refreshAppts();
    refreshBills();
  }, []);
}
