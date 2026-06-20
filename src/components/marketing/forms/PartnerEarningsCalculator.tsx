"use client";

import { useState, useMemo } from "react";
import { Calculator, TrendingUp, Building2, IndianRupee, ArrowRight, Info } from "lucide-react";

// Average pricing assumptions
const PRICING = {
  avgRevenuePerBedPerMonth: 500, // ₹500/bed/month average
  avgRevenuePerDoctorPerMonth: 2500, // ₹2500/doctor/month for clinics
  partnerShare: {
    authorized: 0.20, // 20%
    silver: 0.25, // 25%
    gold: 0.30, // 30%
  },
};

const PARTNER_TIERS = [
  { id: "authorized", name: "Authorized Reseller", share: 20, requirement: "₹5L annual" },
  { id: "silver", name: "Silver Partner", share: 25, requirement: "₹15L annual, 5+ customers" },
  { id: "gold", name: "Gold Partner", share: 30, requirement: "₹50L annual, 15+ customers" },
];

const FACILITY_PRESETS = [
  { name: "Small Clinic (3 doctors)", beds: 0, doctors: 3 },
  { name: "Polyclinic (10 doctors)", beds: 0, doctors: 10 },
  { name: "Nursing Home (30 beds)", beds: 30, doctors: 0 },
  { name: "Multi-specialty (100 beds)", beds: 100, doctors: 0 },
  { name: "Super-specialty (200 beds)", beds: 200, doctors: 0 },
];

export function PartnerEarningsCalculator() {
  const [tier, setTier] = useState<"authorized" | "silver" | "gold">("silver");
  const [customersPerYear, setCustomersPerYear] = useState(5);
  const [avgBedsPerCustomer, setAvgBedsPerCustomer] = useState(50);
  const [avgDoctorsPerCustomer, setAvgDoctorsPerCustomer] = useState(5);
  const [facilityType, setFacilityType] = useState<"hospital" | "clinic">("hospital");

  const calculations = useMemo(() => {
    const sharePercent = PRICING.partnerShare[tier];
    
    let monthlyRevenuePerCustomer: number;
    if (facilityType === "hospital") {
      monthlyRevenuePerCustomer = avgBedsPerCustomer * PRICING.avgRevenuePerBedPerMonth;
    } else {
      monthlyRevenuePerCustomer = avgDoctorsPerCustomer * PRICING.avgRevenuePerDoctorPerMonth;
    }

    const monthlyCommissionPerCustomer = monthlyRevenuePerCustomer * sharePercent;
    const yearlyCommissionPerCustomer = monthlyCommissionPerCustomer * 12;
    
    // Year 1: customers acquired throughout the year (avg 6 months of revenue)
    const year1Earnings = customersPerYear * yearlyCommissionPerCustomer * 0.5;
    
    // Year 2: Full year from Y1 customers + new customers (avg 6 months)
    const year2Earnings = (customersPerYear * yearlyCommissionPerCustomer) + 
                          (customersPerYear * yearlyCommissionPerCustomer * 0.5);
    
    // Year 3: Full year from Y1+Y2 customers + new customers
    const year3Earnings = (customersPerYear * 2 * yearlyCommissionPerCustomer) + 
                          (customersPerYear * yearlyCommissionPerCustomer * 0.5);

    // Total cumulative by end of year 3
    const cumulativeYear3 = year1Earnings + year2Earnings + year3Earnings;
    
    // Monthly recurring by end of year 3 (all 15 customers fully active)
    const monthlyRecurringYear3 = customersPerYear * 3 * monthlyCommissionPerCustomer;

    return {
      sharePercent: sharePercent * 100,
      monthlyRevenuePerCustomer,
      monthlyCommissionPerCustomer,
      yearlyCommissionPerCustomer,
      year1Earnings,
      year2Earnings,
      year3Earnings,
      cumulativeYear3,
      monthlyRecurringYear3,
    };
  }, [tier, customersPerYear, avgBedsPerCustomer, avgDoctorsPerCustomer, facilityType]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-[var(--border-default)] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--action-primary)] to-[var(--action-primary-hover)] p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-6 h-6" />
          <h3 className="text-xl font-bold">Partner Earnings Calculator</h3>
        </div>
        <p className="text-white/80 text-sm">
          Estimate your potential recurring revenue based on customer acquisitions
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Tier Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Partner Tier</label>
          <div className="grid grid-cols-3 gap-2">
            {PARTNER_TIERS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTier(t.id as "authorized" | "silver" | "gold")}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  tier === t.id
                    ? "border-[var(--action-primary)] bg-[var(--action-primary)]/5"
                    : "border-[var(--border-default)] hover:border-[var(--action-primary)]/50"
                }`}
              >
                <div className="font-semibold text-sm text-foreground">{t.name}</div>
                <div className="text-lg font-bold text-[var(--action-primary)]">{t.share}%</div>
                <div className="text-xs text-[var(--text-secondary)]">{t.requirement}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Facility Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Primary Customer Type</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFacilityType("hospital")}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                facilityType === "hospital"
                  ? "border-[var(--action-primary)] bg-[var(--action-primary)]/5"
                  : "border-[var(--border-default)] hover:border-[var(--action-primary)]/50"
              }`}
            >
              <Building2 className="w-6 h-6 mx-auto mb-2 text-[var(--action-primary)]" />
              <div className="font-medium text-foreground">Hospitals</div>
              <div className="text-xs text-[var(--text-secondary)]">Per-bed pricing</div>
            </button>
            <button
              type="button"
              onClick={() => setFacilityType("clinic")}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                facilityType === "clinic"
                  ? "border-[var(--action-primary)] bg-[var(--action-primary)]/5"
                  : "border-[var(--border-default)] hover:border-[var(--action-primary)]/50"
              }`}
            >
              <Building2 className="w-6 h-6 mx-auto mb-2 text-[var(--action-primary)]" />
              <div className="font-medium text-foreground">Clinics</div>
              <div className="text-xs text-[var(--text-secondary)]">Per-doctor pricing</div>
            </button>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-foreground">
                New customers per year
              </label>
              <span className="text-lg font-bold text-[var(--action-primary)]">{customersPerYear}</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={customersPerYear}
              onChange={(e) => setCustomersPerYear(Number(e.target.value))}
              className="w-full h-2 bg-[var(--bg-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--action-primary)]"
            />
            <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1">
              <span>1</span>
              <span>20</span>
            </div>
          </div>

          {facilityType === "hospital" ? (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-foreground">
                  Average beds per hospital
                </label>
                <span className="text-lg font-bold text-[var(--action-primary)]">{avgBedsPerCustomer}</span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="10"
                value={avgBedsPerCustomer}
                onChange={(e) => setAvgBedsPerCustomer(Number(e.target.value))}
                className="w-full h-2 bg-[var(--bg-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--action-primary)]"
              />
              <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1">
                <span>10 beds</span>
                <span>300 beds</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-foreground">
                  Average doctors per clinic
                </label>
                <span className="text-lg font-bold text-[var(--action-primary)]">{avgDoctorsPerCustomer}</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={avgDoctorsPerCustomer}
                onChange={(e) => setAvgDoctorsPerCustomer(Number(e.target.value))}
                className="w-full h-2 bg-[var(--bg-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--action-primary)]"
              />
              <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1">
                <span>1 doctor</span>
                <span>20 doctors</span>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="bg-[var(--bg-subtle)] rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <TrendingUp className="w-4 h-4 text-[var(--action-primary)]" />
            Your Projected Earnings
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-xs text-[var(--text-secondary)] mb-1">Year 1</div>
              <div className="text-lg font-bold text-foreground">{formatCurrency(calculations.year1Earnings)}</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-xs text-[var(--text-secondary)] mb-1">Year 2</div>
              <div className="text-lg font-bold text-foreground">{formatCurrency(calculations.year2Earnings)}</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border-2 border-[var(--action-primary)]">
              <div className="text-xs text-[var(--action-primary)] font-medium mb-1">Year 3</div>
              <div className="text-lg font-bold text-[var(--action-primary)]">{formatCurrency(calculations.year3Earnings)}</div>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border-default)]">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-[var(--text-secondary)]">Monthly recurring (end of Y3)</div>
                <div className="text-2xl font-bold text-[var(--action-primary)]">
                  {formatCurrency(calculations.monthlyRecurringYear3)}
                  <span className="text-sm font-normal text-[var(--text-secondary)]">/month</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[var(--text-secondary)]">3-year cumulative</div>
                <div className="text-lg font-bold text-foreground">{formatCurrency(calculations.cumulativeYear3)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Assumptions note */}
        <div className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>
            Estimates based on average pricing of ₹{PRICING.avgRevenuePerBedPerMonth}/bed/month for hospitals 
            and ₹{PRICING.avgRevenuePerDoctorPerMonth}/doctor/month for clinics. Actual earnings depend on 
            customer size and specialty mix. Revenue share paid monthly.
          </p>
        </div>

        {/* CTA */}
        <a
          href="#apply"
          className="block w-full py-3 px-6 bg-[var(--action-primary)] text-white font-semibold rounded-lg hover:bg-[var(--action-primary-hover)] transition-colors text-center"
        >
          Apply Now
          <ArrowRight className="w-4 h-4 inline ml-2" />
        </a>
      </div>
    </div>
  );
}
