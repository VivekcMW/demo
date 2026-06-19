"use client";

import { useState, useMemo, useEffect } from "react";
import { Calculator, Users, Stethoscope, ArrowRight, Info, Check, Sparkles, Plus, Minus, ChevronDown, Receipt, UserPlus, Calendar, X, UsersRound, Building2 } from "lucide-react";
import Link from "next/link";

// Specialty pricing tiers with multipliers
const SPECIALTY_TIERS = {
  tier1: { multiplier: 1.0, label: "Basic", color: "bg-green-100 text-green-800" },
  tier2: { multiplier: 1.25, label: "Standard", color: "bg-blue-100 text-blue-800" },
  tier3: { multiplier: 1.5, label: "Specialized", color: "bg-indigo-100 text-indigo-800" },
  tier4: { multiplier: 2.0, label: "Complex", color: "bg-purple-100 text-purple-800" },
  tier5: { multiplier: 2.5, label: "Super-specialty", color: "bg-orange-100 text-orange-800" },
  tier6: { multiplier: 3.0, label: "Critical", color: "bg-red-100 text-red-800" },
};

const SPECIALTIES = [
  // Tier 1 - Basic (1.0x)
  { id: "general-medicine", name: "General Medicine", tier: "tier1" as const },
  { id: "family-medicine", name: "Family Medicine", tier: "tier1" as const },
  { id: "ayush", name: "AYUSH", tier: "tier1" as const },
  
  // Tier 2 - Standard (1.25x)
  { id: "pediatrics", name: "Pediatrics", tier: "tier2" as const },
  { id: "dermatology", name: "Dermatology", tier: "tier2" as const },
  { id: "ent", name: "ENT", tier: "tier2" as const },
  { id: "ophthalmology", name: "Ophthalmology", tier: "tier2" as const },
  { id: "psychiatry", name: "Psychiatry", tier: "tier2" as const },
  
  // Tier 3 - Specialized (1.5x)
  { id: "orthopaedics", name: "Orthopaedics", tier: "tier3" as const },
  { id: "gynaecology", name: "Gynaecology (OPD)", tier: "tier3" as const },
  { id: "general-surgery", name: "General Surgery", tier: "tier3" as const },
  { id: "pulmonology", name: "Pulmonology", tier: "tier3" as const },
  { id: "urology", name: "Urology", tier: "tier3" as const },
  
  // Tier 4 - Complex (2.0x)
  { id: "cardiology", name: "Cardiology", tier: "tier4" as const },
  { id: "neurology", name: "Neurology", tier: "tier4" as const },
  { id: "nephrology", name: "Nephrology/Dialysis", tier: "tier4" as const },
  { id: "gastroenterology", name: "Gastroenterology", tier: "tier4" as const },
  { id: "oncology", name: "Oncology", tier: "tier4" as const },
  
  // Tier 5 - Super-specialty (2.5x)
  { id: "obg-delivery", name: "OBG (with delivery)", tier: "tier5" as const },
  { id: "ctvs", name: "CTVS", tier: "tier5" as const },
  { id: "neurosurgery", name: "Neurosurgery", tier: "tier5" as const },
  { id: "interventional-cardio", name: "Interventional Cardiology", tier: "tier5" as const },
  
  // Tier 6 - Critical (3.0x)
  { id: "icu", name: "ICU/Critical Care", tier: "tier6" as const },
  { id: "trauma", name: "Trauma/Emergency", tier: "tier6" as const },
  { id: "transplant", name: "Transplant Services", tier: "tier6" as const },
];

// Pricing configuration
const PRICING = {
  basePerPatient: 1, // ₹1 per patient
  gstRate: 0.18, // 18% GST
  onboardingFeePerDoctor: 2999, // ₹2,999 per doctor (one-time)
  minOnboardingFee: 4999, // Minimum ₹4,999
  volumeDiscounts: [
    { threshold: 30000, discount: 0.15 },
    { threshold: 15000, discount: 0.10 },
    { threshold: 5000, discount: 0.05 },
    { threshold: 0, discount: 0 },
  ],
  included: [
    "ABDM/ABHA integration",
    "9 Indian languages",
    "Training & go-live support",
    "WhatsApp support",
  ],
};

interface PriceCalculatorProps {
  variant?: "full" | "compact";
  showCTA?: boolean;
}

export function PriceCalculator({ variant = "full", showCTA = true }: PriceCalculatorProps) {
  const [doctors, setDoctors] = useState(3);
  const [staff, setStaff] = useState(5);
  const [patientsPerDay, setPatientsPerDay] = useState(50);
  const [workingDays, setWorkingDays] = useState(26);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(["general-medicine"]);
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation when values change
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [doctors, staff, patientsPerDay, workingDays, selectedSpecialties]);

  const addSpecialty = (specialtyId: string) => {
    if (selectedSpecialties.includes(specialtyId)) return;
    setSelectedSpecialties([...selectedSpecialties, specialtyId]);
    setShowSpecialtyDropdown(false);
  };

  const removeSpecialty = (specialtyId: string) => {
    if (selectedSpecialties.length <= 1) return;
    setSelectedSpecialties(selectedSpecialties.filter(id => id !== specialtyId));
  };

  const calculations = useMemo(() => {
    // Calculate monthly patients
    const monthlyPatients = patientsPerDay * workingDays;
    
    // Get highest multiplier from selected specialties
    const highestMultiplier = selectedSpecialties.reduce((max, specId) => {
      const specialty = SPECIALTIES.find(s => s.id === specId);
      if (!specialty) return max;
      const tier = SPECIALTY_TIERS[specialty.tier];
      return Math.max(max, tier.multiplier);
    }, 1);
    
    // Calculate patient cost (monthly recurring)
    const patientCost = monthlyPatients * PRICING.basePerPatient * highestMultiplier;
    
    // Apply volume discount
    const volumeDiscount = PRICING.volumeDiscounts.find(d => monthlyPatients > d.threshold) || { discount: 0 };
    const discountAmount = patientCost * volumeDiscount.discount;
    
    // Calculate total before GST (monthly recurring)
    const subtotalBeforeGST = patientCost - discountAmount;
    
    // Calculate GST on monthly charges
    const gstAmount = subtotalBeforeGST * PRICING.gstRate;
    
    // Final monthly total (recurring)
    const monthlyTotal = subtotalBeforeGST + gstAmount;
    
    // Onboarding charges (one-time)
    const onboardingFee = Math.max(PRICING.minOnboardingFee, doctors * PRICING.onboardingFeePerDoctor);
    const onboardingGST = onboardingFee * PRICING.gstRate;
    const totalOnboarding = onboardingFee + onboardingGST;

    return {
      monthlyPatients,
      highestMultiplier,
      patientCost,
      volumeDiscount: volumeDiscount.discount,
      discountAmount,
      subtotalBeforeGST,
      gstAmount,
      monthlyTotal,
      onboardingFee,
      onboardingGST,
      totalOnboarding,
      perPatientRate: PRICING.basePerPatient * highestMultiplier,
    };
  }, [doctors, patientsPerDay, workingDays, selectedSpecialties]);

  const formatCurrency = (amount: number) => {
    return `₹${Math.round(amount).toLocaleString("en-IN")}`;
  };

  const getSpecialtyById = (id: string) => SPECIALTIES.find(s => s.id === id);

  return (
    <div className={`bg-white rounded-2xl border border-[var(--border-default)] shadow-lg overflow-hidden ${variant === "compact" ? "max-w-md" : ""}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--action-primary)] to-[#2878BC] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Price Calculator</h3>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Specialty Selection */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
            <Stethoscope className="w-4 h-4" />
            Select Specialties
          </label>
          
          {/* Selected Specialties as Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedSpecialties.map((specId) => {
              const specialty = getSpecialtyById(specId);
              if (!specialty) return null;
              const tier = SPECIALTY_TIERS[specialty.tier];
              
              return (
                <div
                  key={specId}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${tier.color}`}
                >
                  <span>{specialty.name}</span>
                  <span className="font-medium">({tier.multiplier}x)</span>
                  {selectedSpecialties.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSpecialty(specId)}
                      className="p-0.5 hover:bg-black/10 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add Specialty Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSpecialtyDropdown(!showSpecialtyDropdown)}
              className="w-full flex items-center justify-between p-3 border border-dashed border-[var(--border-default)] rounded-lg text-sm text-[var(--text-secondary)] hover:border-[var(--action-primary)] hover:text-[var(--action-primary)] transition-colors"
            >
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add specialty
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showSpecialtyDropdown ? "rotate-180" : ""}`} />
            </button>
            
            {showSpecialtyDropdown && (
              <div className="absolute z-10 w-full mt-1 max-h-64 overflow-y-auto bg-white border border-[var(--border-default)] rounded-lg shadow-lg">
                {Object.entries(SPECIALTY_TIERS).map(([tierKey, tierData]) => {
                  const tierSpecialties = SPECIALTIES.filter(s => s.tier === tierKey && !selectedSpecialties.includes(s.id));
                  if (tierSpecialties.length === 0) return null;
                  
                  return (
                    <div key={tierKey}>
                      <div className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] bg-gray-50 sticky top-0">
                        {tierData.label} ({tierData.multiplier}x)
                      </div>
                      {tierSpecialties.map((specialty) => (
                        <button
                          key={specialty.id}
                          type="button"
                          onClick={() => addSpecialty(specialty.id)}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-[var(--bg-subtle)] flex items-center justify-between"
                        >
                          <span>{specialty.name}</span>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${tierData.color}`}>
                            ₹{(PRICING.basePerPatient * tierData.multiplier).toFixed(2)}
                          </span>
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Hospital Profile - creative 2x2 grid */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-teal-50 to-teal-100 text-teal-600">
              <Building2 className="w-4 h-4" />
            </div>
            <p className="text-sm font-semibold text-foreground">Hospital Profile</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* Doctors */}
            <div className="relative p-3 rounded-xl bg-gradient-to-br from-violet-50 to-white border border-violet-100 hover:border-violet-200 transition-colors group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              </div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-violet-700 mb-2.5">
                <Users className="w-3.5 h-3.5" />
                Doctors
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setDoctors(Math.max(1, doctors - 1))}
                  className="p-1.5 rounded-lg bg-white border border-violet-200 text-violet-600 hover:bg-violet-50 hover:border-violet-300 transition-all flex-shrink-0"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={doctors}
                  onChange={(e) => setDoctors(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-2 py-1.5 text-center text-base font-bold text-violet-900 bg-white/80 border border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-300 focus:border-violet-400 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setDoctors(Math.min(100, doctors + 1))}
                  className="p-1.5 rounded-lg bg-white border border-violet-200 text-violet-600 hover:bg-violet-50 hover:border-violet-300 transition-all flex-shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Staff */}
            <div className="relative p-3 rounded-xl bg-gradient-to-br from-amber-50 to-white border border-amber-100 hover:border-amber-200 transition-colors group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 mb-2.5">
                <UsersRound className="w-3.5 h-3.5" />
                Staff
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setStaff(Math.max(1, staff - 1))}
                  className="p-1.5 rounded-lg bg-white border border-amber-200 text-amber-600 hover:bg-amber-50 hover:border-amber-300 transition-all flex-shrink-0"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={staff}
                  onChange={(e) => setStaff(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-2 py-1.5 text-center text-base font-bold text-amber-900 bg-white/80 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-400 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setStaff(Math.min(500, staff + 1))}
                  className="p-1.5 rounded-lg bg-white border border-amber-200 text-amber-600 hover:bg-amber-50 hover:border-amber-300 transition-all flex-shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Patients Per Day */}
            <div className="relative p-3 rounded-xl bg-gradient-to-br from-sky-50 to-white border border-sky-100 hover:border-sky-200 transition-colors group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              </div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-sky-700 mb-2.5">
                <UserPlus className="w-3.5 h-3.5" />
                Patients / Day
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPatientsPerDay(Math.max(10, patientsPerDay - 10))}
                  className="p-1.5 rounded-lg bg-white border border-sky-200 text-sky-600 hover:bg-sky-50 hover:border-sky-300 transition-all flex-shrink-0"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min="10"
                  max="1000"
                  step="10"
                  value={patientsPerDay}
                  onChange={(e) => setPatientsPerDay(Math.max(10, parseInt(e.target.value) || 10))}
                  className="w-full px-2 py-1.5 text-center text-base font-bold text-sky-900 bg-white/80 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-300 focus:border-sky-400 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setPatientsPerDay(Math.min(1000, patientsPerDay + 10))}
                  className="p-1.5 rounded-lg bg-white border border-sky-200 text-sky-600 hover:bg-sky-50 hover:border-sky-300 transition-all flex-shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Working Days */}
            <div className="relative p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 hover:border-emerald-200 transition-colors group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mb-2.5">
                <Calendar className="w-3.5 h-3.5" />
                Days / Month
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setWorkingDays(Math.max(1, workingDays - 1))}
                  className="p-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transition-all flex-shrink-0"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={workingDays}
                  onChange={(e) => setWorkingDays(Math.max(1, Math.min(31, parseInt(e.target.value) || 1)))}
                  className="w-full px-2 py-1.5 text-center text-base font-bold text-emerald-900 bg-white/80 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setWorkingDays(Math.min(31, workingDays + 1))}
                  className="p-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transition-all flex-shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-3 text-center">
            Monthly volume: <span className="font-semibold text-foreground">{calculations.monthlyPatients.toLocaleString("en-IN")}</span> patients ({patientsPerDay} × {workingDays} days)
          </p>
        </div>

        {/* Price Summary */}
        <div className={`p-4 rounded-xl bg-gradient-to-br from-[var(--bg-subtle)] to-white border border-[var(--border-default)] transition-all duration-300 ${isAnimating ? "scale-[1.02]" : ""}`}>
          {variant === "full" && (
            <>
              {/* Monthly Recurring */}
              <div className="space-y-2 mb-4 pb-4 border-b border-[var(--border-default)]">
                <div className="text-xs font-semibold text-[var(--action-primary)] uppercase tracking-wide mb-2">
                  Monthly Recurring
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Monthly patients</span>
                  <span className="font-medium">{calculations.monthlyPatients.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Rate per patient</span>
                  <span className="font-medium">₹{calculations.perPatientRate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Patient charges</span>
                  <span className="font-medium">{formatCurrency(calculations.patientCost)}</span>
                </div>
                {calculations.volumeDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Volume discount ({(calculations.volumeDiscount * 100).toFixed(0)}%)</span>
                    <span>-{formatCurrency(calculations.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm pt-2 border-t border-dashed border-[var(--border-default)]">
                  <span className="text-[var(--text-secondary)]">Subtotal</span>
                  <span className="font-medium">{formatCurrency(calculations.subtotalBeforeGST)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)] flex items-center gap-1">
                    <Receipt className="w-3 h-3" />
                    GST (18%)
                  </span>
                  <span className="font-medium">{formatCurrency(calculations.gstAmount)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-[var(--border-default)]">
                  <span>Monthly Total</span>
                  <span className="text-[var(--action-primary)]">{formatCurrency(calculations.monthlyTotal)}/mo</span>
                </div>
              </div>
              
              {/* One-time Onboarding */}
              <div className="space-y-2 mb-4 pb-4 border-b border-[var(--border-default)]">
                <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-2">
                  One-time Onboarding
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Setup & training</span>
                  <span className="font-medium">{formatCurrency(calculations.onboardingFee)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)] flex items-center gap-1">
                    <Receipt className="w-3 h-3" />
                    GST (18%)
                  </span>
                  <span className="font-medium">{formatCurrency(calculations.onboardingGST)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-[var(--border-default)]">
                  <span>Onboarding Total</span>
                  <span className="text-orange-600">{formatCurrency(calculations.totalOnboarding)}</span>
                </div>
              </div>
            </>
          )}

          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Monthly cost</p>
              <div className="flex items-baseline gap-1">
                <span className={`text-3xl font-bold text-[var(--action-primary)] transition-all duration-300 ${isAnimating ? "scale-110" : ""}`}>
                  {formatCurrency(calculations.monthlyTotal)}
                </span>
                <span className="text-sm text-[var(--text-secondary)]">/month</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                + {formatCurrency(calculations.totalOnboarding)} one-time setup
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Annual: 2 months free</span>
              </div>
              {calculations.volumeDiscount > 0 && (
                <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                  {(calculations.volumeDiscount * 100).toFixed(0)}% volume discount
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Included Features */}
        <div className="flex flex-wrap gap-2">
          {PRICING.included.map((feature) => (
            <span
              key={feature}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full"
            >
              <Check className="w-3 h-3" />
              {feature}
            </span>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="flex gap-2 p-3 rounded-lg bg-amber-50 border border-amber-100">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800">
            This is an estimate based on ₹1/patient × specialty multiplier. GST @18% 
            as per Indian tax regulations. One-time onboarding includes setup, training & go-live support.
          </p>
        </div>

        {/* CTA */}
        {showCTA && (
          <Link
            href={`/book-demo?doctors=${doctors}&staff=${staff}&patients=${patientsPerDay}`}
            className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[var(--action-primary)] text-white font-semibold rounded-lg hover:bg-[var(--action-primary-hover)] transition-colors btn-shine"
          >
            Get a detailed quote
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
