"use client";

import { useState } from "react";
import {
  submitOrderSetItems,
  type OrderSetSubmissionResult,
} from "@/services/orderSetBridge";

export function useSubmitOrderSets() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<OrderSetSubmissionResult | null>(null);

  const submitSelected = (
    selectedItemIds: string[],
    patientId: string,
    patientName: string,
    orderedBy: string
  ) => {
    setSubmitting(true);
    const res = submitOrderSetItems(selectedItemIds, patientId, patientName, orderedBy);
    setResult(res);
    setSubmitting(false);
    return res;
  };

  return { submitSelected, submitting, result, clearResult: () => setResult(null) };
}
