"use client";

import { useOperationsStore } from "@/store/useOperationsStore";
import { Package, AlertTriangle, Search } from "lucide-react";
import { useState } from "react";

export default function InventoryPage() {
  const { inventory, updateStock, restockItem, getLowStock } = useOperationsStore();
  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");

  const depts = [...new Set(inventory.map((i) => i.department))];
  const lowStock = getLowStock();
  const filtered = inventory.filter((i) => {
    const m = i.name.toLowerCase().includes(query.toLowerCase()) || i.id.toLowerCase().includes(query.toLowerCase());
    return deptFilter === "All" ? m : m && i.department === deptFilter;
  });

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3"><Package size={24} className="text-[var(--action-primary)]" /><div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Inventory</h1><p className="text-sm text-[var(--text-secondary)]">General stores, consumables & supplies</p></div></div>

      {lowStock.length > 0 && (
        <div className="rounded-xl border-2 border-[var(--warning-fg)] bg-[var(--warning-bg)] p-4 flex items-center gap-3">
          <AlertTriangle size={20} className="shrink-0 text-[var(--warning-fg)]" />
          <div><p className="text-sm font-semibold text-[var(--warning-fg)]">{lowStock.length} item(s) below reorder level</p><p className="text-xs text-[var(--text-primary)]">Reorder immediately to avoid stockouts</p></div>
        </div>
      )}

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input type="text" placeholder="Search items…" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[var(--action-primary)]" />
        </div>
        <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm outline-none">
          <option value="All">All Depts</option>
          {depts.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div className="mobile-table-wrap rounded-xl border border-[var(--border-default)]">
        <table className="w-full text-xs">
          <thead><tr className="bg-[var(--surface-sunken)]"><th className="px-3 py-2 text-left text-[var(--text-secondary)]">Item</th><th className="px-3 py-2 text-left text-[var(--text-secondary)]">Category</th><th className="px-3 py-2 text-left text-[var(--text-secondary)]">Dept</th><th className="px-3 py-2 text-right text-[var(--text-secondary)]">Stock</th><th className="px-3 py-2 text-right text-[var(--text-secondary)]">Reorder</th><th className="px-3 py-2 text-right text-[var(--text-secondary)]">Cost</th><th className="px-3 py-2 text-center text-[var(--text-secondary)]">Actions</th></tr></thead>
          <tbody>
            {filtered.map((i) => (
              <tr key={i.id} className={`border-t border-[var(--border-default)] ${i.stock <= i.reorderLevel ? "bg-[var(--warning-bg)]" : ""}`}>
                <td className="px-3 py-2 font-medium text-[var(--text-primary)]">{i.name}</td>
                <td className="px-3 py-2 text-[var(--text-secondary)]">{i.category}</td>
                <td className="px-3 py-2 text-[var(--text-secondary)]">{i.department}</td>
                <td className={`px-3 py-2 text-right font-semibold ${i.stock <= i.reorderLevel ? "text-[var(--warning-fg)]" : "text-[var(--text-primary)]"}`}>{i.stock} {i.unit}</td>
                <td className="px-3 py-2 text-right text-[var(--text-secondary)]">{i.reorderLevel}</td>
                <td className="px-3 py-2 text-right text-[var(--text-secondary)]">₹{i.unitCost}</td>
                <td className="px-3 py-2 text-center">
                  <button onClick={() => updateStock(i.id, -1)} className="min-touch rounded px-2 py-1 text-[var(--action-primary)] hover:bg-[var(--action-subtle)]">−</button>
                  <button onClick={() => restockItem(i.id, i.reorderQty)} className="ml-1 min-touch rounded bg-[var(--action-primary)] px-2 py-1 text-xs text-white">Restock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
