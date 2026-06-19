"use client";

import { useOrderSetStore } from "@/store/useOrderSetStore";
import type { OrderSetDefinition } from "@/store/useOrderSetStore";

interface OrderSetSelectorProps {
  orderSetIds: string[];
  value: string[];
  onChange: (selected: string[]) => void;
  readOnly?: boolean;
}

export function OrderSetSelector({
  orderSetIds,
  value,
  onChange,
  readOnly = false,
}: OrderSetSelectorProps) {
  const orderSets = useOrderSetStore((s) => s.getByIds(orderSetIds));
  const selected = value ?? [];

  if (orderSets.length === 0) return null;

  const allSelected = (items: OrderSetDefinition["items"]) =>
    items.every((item) => selected.includes(item.id));

  const toggleSet = (items: OrderSetDefinition["items"]) => {
    if (readOnly) return;
    if (allSelected(items)) {
      onChange(selected.filter((s) => !items.find((i) => i.id === s)));
    } else {
      const newIds = items.map((i) => i.id);
      const existing = selected.filter((s) => !newIds.includes(s));
      onChange([...existing, ...newIds]);
    }
  };

  const toggleItem = (itemId: string) => {
    if (readOnly) return;
    if (selected.includes(itemId)) {
      onChange(selected.filter((s) => s !== itemId));
    } else {
      onChange([...selected, itemId]);
    }
  };

  return (
    <div className="space-y-4">
      {orderSets.map((os) => {
        const allOn = allSelected(os.items);
        return (
          <div
            key={os.id}
            className={`rounded-xl border p-4 transition-colors ${
              !readOnly ? "cursor-pointer" : ""
            } ${
              allOn
                ? "border-[var(--action-primary)] bg-[var(--action-subtle)]"
                : selected.some((s) => os.items.find((i) => i.id === s))
                  ? "border-[var(--action-primary)]/40 bg-[var(--surface-sunken)]"
                  : "border-[var(--border-default)] bg-[var(--surface-raised)]"
            }`}
            onClick={() => {
              if (!readOnly) {
                const someButNotAll =
                  !allOn && os.items.some((i) => selected.includes(i.id));
                if (someButNotAll) {
                  onChange(selected.filter((s) => !os.items.find((i) => i.id === s)));
                } else {
                  toggleSet(os.items);
                }
              }
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-sm font-semibold text-[var(--text-primary)]">{os.name}</h4>
                <p className="text-xs text-[var(--text-secondary)]">{os.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!allOn && os.items.some((i) => selected.includes(i.id)) && (
                  <span className="text-[10px] font-medium text-[var(--action-primary)]">
                    {os.items.filter((i) => selected.includes(i.id)).length}/{os.items.length}
                  </span>
                )}
                <input
                  type="checkbox"
                  checked={allOn}
                  readOnly
                  className="h-4 w-4 accent-[var(--action-primary)] pointer-events-none"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {os.items.map((item) => {
                const on = selected.includes(item.id);
                return (
                  <label
                    key={item.id}
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-medium transition-colors ${
                      on
                        ? "border-[var(--action-primary)] bg-[var(--action-primary)]/10 text-[var(--action-primary)]"
                        : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]/50"
                    } ${readOnly ? "pointer-events-none opacity-70" : "cursor-pointer"}`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      disabled={readOnly}
                      checked={on}
                      onChange={() => toggleItem(item.id)}
                    />
                    {item.title}
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
