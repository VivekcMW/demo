"use client";

import { AlertTriangle, Package, TrendingDown } from "lucide-react";

interface InventoryItem {
  id: string;
  brand: string;
  model: string;
  type: string;
  powers: string;
  inStock: number;
  reorderLevel: number;
  lowStock: boolean;
  price: number;
}

interface InventoryTableProps {
  items: InventoryItem[];
  title?: string;
  currency?: string;
}

export function InventoryTable({
  items,
  title = "IOL Inventory",
  currency = "₹",
}: InventoryTableProps) {
  const lowStockCount = items.filter((i) => i.lowStock).length;

  return (
    <div className="p-5 rounded-xl bg-white border border-[var(--border-default)]">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        {lowStockCount > 0 && (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
            <AlertTriangle className="w-3 h-3" />
            {lowStockCount} low stock
          </span>
        )}
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-lg border ${
              item.lowStock
                ? "bg-amber-50 border-amber-200"
                : "bg-white border-[var(--border-default)]"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {item.brand}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-secondary)]">
                    {item.type}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  {item.model} • {item.powers}
                </p>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2">
                  {item.lowStock && (
                    <TrendingDown className="w-4 h-4 text-amber-600" />
                  )}
                  <span
                    className={`text-lg font-bold ${
                      item.lowStock ? "text-amber-600" : "text-foreground"
                    }`}
                  >
                    {item.inStock}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  {currency}
                  {item.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* Stock bar */}
            <div className="mt-2">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    item.lowStock ? "bg-amber-500" : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      100,
                      (item.inStock / (item.reorderLevel * 3)) * 100
                    )}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[var(--text-secondary)] mt-0.5">
                <span>Reorder: {item.reorderLevel}</span>
                <span>In stock: {item.inStock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
