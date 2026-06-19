"use client";

import { useState, useMemo, useId } from "react";
import Link from "next/link";
import {
  Search, ShoppingCart, Plus, X, Minus, Receipt, ArrowLeft, Loader2, CheckCircle,
} from "lucide-react";
import { useBillingStore } from "@/store/useBillingStore";
import { TARIFF_ITEMS, type ServiceWithPricing } from "@/data/tariffMaster";
import { useToast } from "@/components/ui/ToastProvider";
import type { BillCategory } from "@/data/seedBills";

const CATEGORY_OPTIONS: BillCategory[] = ["OPD", "Lab", "Imaging", "Pharmacy", "Procedure", "Emergency"];

interface CartItem {
  tariff: ServiceWithPricing;
  qty: number;
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

export default function NewWalkinBillPage() {
  const { toast } = useToast();
  const createBill = useBillingStore((s) => s.createBill);

  const id = useId();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<BillCategory | "all">("all");
  const [patientName, setPatientName] = useState("");
  const [notes, setNotes] = useState("");
  const [patientId] = useState(`WALKIN-${id.replace(/[:.]/g, "").slice(0, 6).toUpperCase()}`);

  const [creating, setCreating] = useState(false);
  const [createdBillId, setCreatedBillId] = useState<string | null>(null);

  const filteredTariffs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TARIFF_ITEMS.filter((t) => {
      if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
      if (q && !t.description.toLowerCase().includes(q) && !t.serviceCode.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, categoryFilter]);

  function addToCart(tariff: ServiceWithPricing) {
    setCart((prev) => {
      const existing = prev.find((c) => c.tariff.id === tariff.id);
      if (existing) return prev.map((c) => c.tariff.id === tariff.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { tariff, qty: 1 }];
    });
  }

  function updateQty(tariffId: string, delta: number) {
    setCart((prev) =>
      prev.map((c) => c.tariff.id === tariffId ? { ...c, qty: Math.max(1, c.qty + delta) } : c)
    );
  }

  function removeFromCart(tariffId: string) {
    setCart((prev) => prev.filter((c) => c.tariff.id !== tariffId));
  }

  const subtotal = useMemo(() => cart.reduce((s, c) => s + c.tariff.defaultPrice * c.qty, 0), [cart]);
  const taxableTotal = useMemo(
    () => cart.filter((c) => c.tariff.taxable).reduce((s, c) => s + c.tariff.defaultPrice * c.qty, 0),
    [cart]
  );
  const tax = useMemo(() => Math.round(taxableTotal * (5 / 100)), [taxableTotal]);
  const grandTotal = subtotal + tax;

  function handleCreateBill() {
    if (!patientName.trim() || cart.length === 0) return;
    setCreating(true);

    const items = cart.map((c) => ({
      description: c.tariff.description,
      category: c.tariff.category as BillCategory,
      qty: c.qty,
      unitPrice: c.tariff.defaultPrice,
    }));

    setTimeout(() => {
      const bill = createBill({
        patientId,
        patientName: patientName.trim(),
        category: "OPD",
        items,
        dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
        createdBy: "Reception",
        notes: notes.trim() || undefined,
      });
      setCreatedBillId(bill.id);
      setCreating(false);
      toast("Bill created successfully");
    }, 400);
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  if (createdBillId) {
    return (
      <div className="space-y-5 pb-8">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--normal-bg)]">
            <CheckCircle size={32} className="text-[var(--normal-fg)]" />
          </div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Bill Created</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Bill <span className="font-mono font-semibold text-[var(--text-primary)]">{createdBillId}</span> for {patientName}
          </p>
          <p className="mt-1 text-lg font-bold text-[var(--text-primary)]">₹{fmt(grandTotal)}</p>
          <div className="mt-6 flex gap-3">
            <Link
              href={`/billing/${createdBillId}`}
              className="rounded-xl bg-[var(--action-primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]"
            >
              View Bill
            </Link>
            <Link
              href="/reception/billing"
              className="rounded-xl border border-[var(--border-default)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
            >
              Back to Billing Desk
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/reception/billing"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">New Walk-in Bill</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">Create a one-time OPD bill</p>
          </div>
        </div>
      </div>

      {/* Patient info */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Patient Details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-1">Patient Name *</label>
            <input
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm outline-none focus:border-[var(--action-primary)]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-1">Bill ID</label>
            <input
              value={patientId}
              readOnly
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm font-mono text-[var(--text-secondary)]"
            />
          </div>
        </div>
      </div>

      {/* Tariff picker */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3">
          <p className="text-sm font-semibold text-[var(--text-primary)]">Add Services</p>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input
                className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] py-2 pl-9 pr-3 text-sm outline-none focus:border-[var(--action-primary)]"
                placeholder="Search services…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as BillCategory | "all")}
              className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm outline-none focus:border-[var(--action-primary)]"
            >
              <option value="all">All Categories</option>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 max-h-[400px] overflow-y-auto pr-1">
            {filteredTariffs.map((t) => {
              const inCart = cart.find((c) => c.tariff.id === t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => addToCart(t)}
                  className={`flex items-center justify-between rounded-lg border p-3 text-left transition-colors hover:bg-[var(--surface-sunken)] ${inCart ? "border-[var(--action-primary)] bg-[var(--action-subtle)]" : "border-[var(--border-default)]"}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-[var(--text-primary)] truncate">{t.description}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-[var(--text-secondary)]">{t.serviceCode}</span>
                      <span className="text-xs text-[var(--action-primary)] font-semibold">₹{fmt(t.defaultPrice)}</span>
                    </div>
                  </div>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--action-primary)] text-white">
                    {inCart ? <CheckCircle size={14} /> : <Plus size={14} />}
                  </div>
                </button>
              );
            })}
            {filteredTariffs.length === 0 && (
              <p className="col-span-full py-8 text-center text-sm text-[var(--text-secondary)]">No services found</p>
            )}
          </div>
        </div>
      </div>

      {/* Cart / Summary */}
      {cart.length > 0 && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              <ShoppingCart size={14} className="inline mr-1.5" />
              Bill Items ({cart.length})
            </p>
          </div>
          <div className="divide-y divide-[var(--border-default)]">
            {cart.map((c) => (
              <div key={c.tariff.id} className="flex items-center gap-3 px-5 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--text-primary)] truncate">{c.tariff.description}</p>
                  <p className="text-xs text-[var(--text-secondary)]">₹{fmt(c.tariff.defaultPrice)} each</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateQty(c.tariff.id, -1)}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold tabular-nums text-[var(--text-primary)]">{c.qty}</span>
                  <button
                    onClick={() => updateQty(c.tariff.id, 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <p className="w-20 text-right text-sm font-semibold text-[var(--text-primary)]">
                  ₹{fmt(c.tariff.defaultPrice * c.qty)}
                </p>
                <button
                  onClick={() => removeFromCart(c.tariff.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--critical-bg)] hover:text-[var(--critical-fg)]"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--border-default)] px-5 py-3 space-y-1">
            <div className="flex justify-between text-sm text-[var(--text-secondary)]">
              <span>Subtotal</span>
              <span>₹{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-[var(--text-secondary)]">
              <span>GST (5%)</span>
              <span>₹{fmt(tax)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[var(--text-primary)] pt-1 border-t border-[var(--border-default)]">
              <span>Grand Total</span>
              <span>₹{fmt(grandTotal)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      {cart.length > 0 && (
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-1">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm outline-none focus:border-[var(--action-primary)] resize-none"
            placeholder="Any remarks about this bill…"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Link
          href="/reception/billing"
          className="rounded-xl border border-[var(--border-default)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
        >
          Cancel
        </Link>
        <button
          onClick={handleCreateBill}
          disabled={!patientName.trim() || cart.length === 0 || creating}
          className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-6 py-2.5 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-50"
        >
          {creating ? <Loader2 size={16} className="animate-spin" /> : <Receipt size={16} />}
          {creating ? "Creating…" : `Create Bill — ₹${fmt(grandTotal)}`}
        </button>
      </div>
    </div>
  );
}
