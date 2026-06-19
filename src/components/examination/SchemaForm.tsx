"use client";

import { useCallback } from "react";
import type { TemplateDefinition, TemplateSection, TemplateField, FormValues, ConditionalRule } from "@/data/templateSchema";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { OrderSetSelector } from "./OrderSetSelector";

// ── Conditional rule evaluator ─────────────────────────────────────────────────

function evaluateRule(rule: ConditionalRule | undefined, values: FormValues): boolean {
  if (!rule) return true;
  const fieldVal = values[rule.field];
  switch (rule.operator) {
    case "equals":       return fieldVal === rule.value;
    case "notEquals":    return fieldVal !== rule.value;
    case "greaterThan":  return typeof fieldVal === "number" && typeof rule.value === "number" && fieldVal > rule.value;
    case "lessThan":     return typeof fieldVal === "number" && typeof rule.value === "number" && fieldVal < rule.value;
    case "in":           return Array.isArray(rule.value) && rule.value.includes(fieldVal);
    case "notIn":        return Array.isArray(rule.value) && !rule.value.includes(fieldVal);
    default:             return true;
  }
}

function isRequired(field: TemplateField, values: FormValues): boolean {
  if (!field.required) return false;
  if (!field.requiredIf) return true;
  return evaluateRule(field.requiredIf, values);
}

function shouldShow(fieldOrSection: { showIf?: ConditionalRule }, values: FormValues): boolean {
  return evaluateRule(fieldOrSection.showIf, values);
}

// ── Input class ────────────────────────────────────────────────────────────────

const inpCls =
  "w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] disabled:opacity-60 disabled:cursor-not-allowed";

const taCls =
  "w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] resize-none disabled:opacity-60 disabled:cursor-not-allowed";

// ── Field Renderer ─────────────────────────────────────────────────────────────

function FieldRenderer({
  field,
  value,
  onChange,
  readOnly,
  allValues,
}: {
  field: TemplateField;
  value: unknown;
  onChange: (key: string, val: unknown) => void;
  readOnly: boolean;
  allValues: FormValues;
}) {
  if (!shouldShow(field, allValues)) return null;
  const required = isRequired(field, allValues);
  const path    = field.key;
  const ro      = readOnly || !!field.readOnly;
  const label = (
    <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
      {field.label}
      {required && <span className="ml-1 text-[var(--critical-fg)]">*</span>}
    </label>
  );

  switch (field.type) {
    case "text":
      return (
        <div>
          {label}
          <input
            type="text"
            readOnly={ro}
            className={inpCls}
            value={(value as string) ?? ""}
            onChange={(e) => !ro && onChange(path, e.target.value)}
            placeholder={field.placeholder}
          />
        </div>
      );

    case "textarea":
      return (
        <div>
          {label}
          <textarea
            rows={field.rows ?? 3}
            readOnly={ro}
            className={taCls}
            value={(value as string) ?? ""}
            onChange={(e) => !ro && onChange(path, e.target.value)}
            placeholder={field.placeholder}
          />
        </div>
      );

    case "number":
      return (
        <div>
          {label}
          <div className="relative">
            <input
              type="number"
              readOnly={ro}
              className={inpCls}
              value={value != null ? String(value) : ""}
              onChange={(e) => {
                if (ro) return;
                const v = e.target.value === "" ? undefined : parseFloat(e.target.value);
                onChange(path, isNaN(v as number) ? undefined : v);
              }}
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
            />
            {field.unit && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-secondary)]">
                {field.unit}
              </span>
            )}
          </div>
        </div>
      );

    case "date":
      return (
        <div>
          {label}
          <input
            type="date"
            readOnly={ro}
            className={inpCls}
            value={(value as string) ?? ""}
            onChange={(e) => !ro && onChange(path, e.target.value)}
          />
        </div>
      );

    case "time":
      return (
        <div>
          {label}
          <input
            type="time"
            readOnly={ro}
            className={inpCls}
            value={(value as string) ?? ""}
            onChange={(e) => !ro && onChange(path, e.target.value)}
          />
        </div>
      );

    case "select":
      return (
        <div>
          {label}
          <select
            disabled={ro}
            className={inpCls}
            value={(value as string) ?? ""}
            onChange={(e) => !ro && onChange(path, e.target.value)}
          >
            <option value="">Select…</option>
            {field.options?.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      );

    case "multiselect":
      const selected = (value as string[]) ?? [];
      return (
        <div>
          {label}
          <div className="flex flex-wrap gap-2">
            {field.options?.map((o) => (
              <label
                key={o.value}
                className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  selected.includes(o.value)
                    ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white"
                    : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"
                } ${ro ? "pointer-events-none opacity-70" : ""}`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  disabled={ro}
                  checked={selected.includes(o.value)}
                  onChange={() => {
                    if (ro) return;
                    const next = selected.includes(o.value)
                      ? selected.filter((s) => s !== o.value)
                      : [...selected, o.value];
                    onChange(path, next);
                  }}
                />
                {o.label}
              </label>
            ))}
          </div>
        </div>
      );

    case "radio":
      return (
        <div>
          {label}
          <div className="flex flex-wrap gap-3">
            {field.options?.map((o) => (
              <label
                key={o.value}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="radio"
                  disabled={ro}
                  checked={value === o.value}
                  onChange={() => !ro && onChange(path, o.value)}
                  className="accent-[var(--action-primary)] h-4 w-4"
                />
                {o.label}
              </label>
            ))}
          </div>
        </div>
      );

    case "boolean":
      return (
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            disabled={ro}
            checked={!!value}
            onChange={(e) => !ro && onChange(path, e.target.checked)}
            className="accent-[var(--action-primary)] h-4 w-4"
          />
          {field.label}
        </label>
      );

    case "section":
      return (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">{field.label}</p>
          {field.fields?.length ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {field.fields.map((sub) => (
                <FieldRenderer
                  key={sub.key}
                  field={sub}
                  value={allValues[`${path}.${sub.key}`]}
                  onChange={(k, v) => onChange(`${path}.${k}`, v)}
                  readOnly={ro}
                  allValues={allValues}
                />
              ))}
            </div>
          ) : null}
        </div>
      );

    case "repeating":
      const items = (value as Record<string, unknown>[]) ?? [];
      return (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">{field.label}</p>
            {!ro && (
              <button
                type="button"
                onClick={() => {
                  const empty: Record<string, unknown> = {};
                  field.fields?.forEach((f) => { empty[f.key] = f.defaultValue ?? ""; });
                  onChange(path, [...items, empty]);
                }}
                className="flex items-center gap-1 rounded-lg bg-[var(--action-primary)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--action-primary-hover)]"
              >
                <Plus size={11} /> Add
              </button>
            )}
          </div>
          {items.length === 0 ? (
            <p className="text-center text-xs text-[var(--text-secondary)] py-4 opacity-60">No items added yet</p>
          ) : (
            <div className="divide-y divide-[var(--border-default)]">
              {items.map((item, idx) => (
                <div key={idx} className="py-3 first:pt-0 last:pb-0">
                  {field.fields && field.fields.length > 0 && (
                    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] gap-2 mb-1">
                      {field.fields.map((sub) => (
                        <p key={sub.key} className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)] truncate">
                          {sub.label}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="grid gap-2 items-end" style={{ gridTemplateColumns: field.fields ? `repeat(${field.fields.length}, 1fr) auto` : "1fr auto" }}>
                    {field.fields?.map((sub) => {
                      return (
                        <FieldRenderer
                          key={sub.key}
                          field={sub}
                          value={item[sub.key]}
                          onChange={(k, v) => {
                            const updated = [...items];
                            updated[idx] = { ...updated[idx], [k]: v };
                            onChange(path, updated);
                          }}
                          readOnly={ro}
                          allValues={allValues}
                        />
                      );
                    })}
                    {!ro && (
                      <button
                        type="button"
                        onClick={() => onChange(path, items.filter((_, i) => i !== idx))}
                        className="rounded p-1.5 text-[var(--text-secondary)] hover:text-[var(--critical-fg)] hover:bg-[var(--critical-bg)] self-end mb-1"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case "orderSet":
      return (
        <div>
          {label}
          <OrderSetSelector
            orderSetIds={field.orderSetIds ?? []}
            value={(value as string[]) ?? []}
            onChange={(v) => onChange(path, v)}
            readOnly={ro}
          />
        </div>
      );

    default:
      return (
        <div>
          {label}
          <input
            type="text"
            readOnly={ro}
            className={inpCls}
            value={String(value ?? "")}
            onChange={(e) => !ro && onChange(path, e.target.value)}
            placeholder={field.placeholder}
          />
        </div>
      );
  }
}

// ── Section Renderer ───────────────────────────────────────────────────────────

function SectionRenderer({
  section,
  values,
  onChange,
  readOnly,
  allValues,
  onSectionClick,
}: {
  section: TemplateSection;
  values: FormValues;
  onChange: (key: string, val: unknown) => void;
  readOnly: boolean;
  allValues: FormValues;
  onSectionClick: (key: string) => void;
}) {
  if (!shouldShow(section, allValues)) return null;
  return (
    <section id={section.key} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
      <div className="flex items-center gap-3 bg-[var(--surface-sunken)] border-b border-[var(--border-default)] px-5 py-3.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--action-primary)] text-white text-sm font-bold shrink-0">
          {section.icon ?? section.label.charAt(0)}
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">{section.label}</h2>
        </div>
      </div>
      <div className="px-5 py-5 space-y-4" onClick={() => onSectionClick(section.key)}>
        {section.fields.map((field) => {
          if (field.type === "section") {
            // Section-type fields render inline
            return (
              <FieldRenderer
                key={field.key}
                field={field}
                value={values[field.key]}
                onChange={(k, v) => onChange(k, v)}
                readOnly={readOnly}
                allValues={allValues}
              />
            );
          }
          return (
            <FieldRenderer
              key={field.key}
              field={field}
              value={values[field.key]}
              onChange={(k, v) => onChange(k, v)}
              readOnly={readOnly}
              allValues={allValues}
            />
          );
        })}
      </div>
    </section>
  );
}

// ── Main SchemaForm ────────────────────────────────────────────────────────────

export interface SchemaFormProps {
  template: TemplateDefinition;
  values: FormValues;
  onChange: (key: string, value: unknown) => void;
  readOnly?: boolean;
  activeSection?: string;
  onActiveSectionChange?: (key: string) => void;
}

export function SchemaForm({
  template,
  values,
  onChange,
  readOnly = false,
  activeSection: externalActiveSection,
  onActiveSectionChange,
}: SchemaFormProps) {
  const [internalActiveSection, setInternalActiveSection] = useState(
    template.sections[0]?.key ?? ""
  );
  const activeSection = externalActiveSection ?? internalActiveSection;
  const setActiveSection = onActiveSectionChange ?? setInternalActiveSection;

  const sectionNav = template.sections.filter((s) => shouldShow(s, values));

  return (
    <div className="flex gap-6">
      {/* Sidebar nav */}
      <aside className="hidden lg:flex lg:flex-col w-60 shrink-0 space-y-4">
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <p className="bg-[var(--surface-sunken)] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            Sections
          </p>
          <div className="divide-y divide-[var(--border-default)]">
            {sectionNav.map((s) => (
              <a
                key={s.key}
                href={`#${s.key}`}
                onClick={() => setActiveSection(s.key)}
                className={`flex items-center gap-2.5 px-4 py-3 text-sm transition-colors ${
                  activeSection === s.key
                    ? "bg-[var(--action-subtle)] font-semibold text-[var(--action-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
                }`}
              >
                {s.icon ?? s.label.charAt(0)} {s.label}
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* Form sections */}
      <div className="flex-1 min-w-0 space-y-6">
        {template.sections.map((section) => (
          <SectionRenderer
            key={section.key}
            section={section}
            values={values}
            onChange={onChange}
            readOnly={readOnly}
            allValues={values}
            onSectionClick={setActiveSection}
          />
        ))}
      </div>
    </div>
  );
}

// ── Hook for managing form state ───────────────────────────────────────────────

export function useSchemaForm(initialValues?: FormValues) {
  const [values, setValues] = useState<FormValues>(initialValues ?? {});

  const setValue = useCallback((key: string, val: unknown) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  }, []);

  const setMultiple = useCallback((updates: Record<string, unknown>) => {
    setValues((prev) => ({ ...prev, ...updates }));
  }, []);

  const reset = useCallback((vals?: FormValues) => {
    setValues(vals ?? {});
  }, []);

  const getSectionValues = useCallback(
    (sectionKey: string) => {
      const section: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(values)) {
        if (k.startsWith(sectionKey + ".")) {
          section[k.slice(sectionKey.length + 1)] = v;
        }
      }
      return section;
    },
    [values]
  );

  return { values, setValue, setMultiple, reset, getSectionValues };
}
