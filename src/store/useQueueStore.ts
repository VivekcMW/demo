import { create } from "zustand";
import { seedTokens, QUEUE_DEPTS, type QueueToken, type TokenType } from "@/data/seedQueue";

interface QueueStore {
  tokens: QueueToken[];
  callNext: (deptId: string) => void;
  skipToken: (tokenId: string) => void;
  addWalkIn: (deptId: string, patientName: string, uhid: string, type: TokenType) => QueueToken;
  markDone: (tokenId: string) => void;
  getByDept: (deptId: string) => QueueToken[];
  getWaiting: (deptId: string) => QueueToken[];
  getServing: (deptId: string) => QueueToken | undefined;
  estimatedWait: (deptId: string, position: number) => number; // in minutes
}

let tokenCounter = 100;

export const useQueueStore = create<QueueStore>((set, get) => ({
  tokens: seedTokens,

  callNext: (deptId) => {
    const { tokens } = get();
    const serving = tokens.find((t) => t.deptId === deptId && t.status === "serving");
    const next    = tokens.filter((t) => t.deptId === deptId && t.status === "waiting")
      .sort((a, b) => {
        // Emergency always first
        if (a.type === "Emergency" && b.type !== "Emergency") return -1;
        if (b.type === "Emergency" && a.type !== "Emergency") return 1;
        return a.tokenNo - b.tokenNo;
      })[0];

    const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });

    set({
      tokens: tokens.map((t) => {
        if (serving && t.id === serving.id) return { ...t, status: "done" };
        if (next   && t.id === next.id)    return { ...t, status: "serving", calledAt: now };
        return t;
      }),
    });
  },

  skipToken: (tokenId) => {
    set((s) => ({
      tokens: s.tokens.map((t) => t.id === tokenId ? { ...t, status: "skipped" } : t),
    }));
  },

  markDone: (tokenId) => {
    set((s) => ({
      tokens: s.tokens.map((t) => t.id === tokenId ? { ...t, status: "done" } : t),
    }));
  },

  addWalkIn: (deptId, patientName, uhid, type) => {
    const dept = QUEUE_DEPTS.find((d) => d.id === deptId);
    const deptTokens = get().tokens.filter((t) => t.deptId === deptId);
    const maxToken = deptTokens.length ? Math.max(...deptTokens.map((t) => t.tokenNo)) : 0;
    tokenCounter += 1;

    const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
    const newToken: QueueToken = {
      id: `t-${tokenCounter}`,
      tokenNo: maxToken + 1,
      patientName,
      uhid: uhid || `UHID-WALKIN-${tokenCounter}`,
      deptId,
      dept: dept?.name ?? deptId,
      doctor: dept?.doctor ?? "—",
      type,
      status: "waiting",
      arrivedAt: now,
    };

    set((s) => ({ tokens: [...s.tokens, newToken] }));
    return newToken;
  },

  getByDept: (deptId) => get().tokens.filter((t) => t.deptId === deptId),

  getWaiting: (deptId) =>
    get().tokens
      .filter((t) => t.deptId === deptId && t.status === "waiting")
      .sort((a, b) => {
        if (a.type === "Emergency" && b.type !== "Emergency") return -1;
        if (b.type === "Emergency" && a.type !== "Emergency") return 1;
        return a.tokenNo - b.tokenNo;
      }),

  getServing: (deptId) => get().tokens.find((t) => t.deptId === deptId && t.status === "serving"),

  estimatedWait: (deptId, position) => {
    const dept = QUEUE_DEPTS.find((d) => d.id === deptId);
    return position * (dept?.avgMinPerPatient ?? 15);
  },
}));
