"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Phone, MapPin } from "lucide-react";
import { MultiSelectDropdown } from "@/components/marketing/ui/MultiSelectDropdown";
import { useLocationStore } from "@/store/locationStore";

const facilityTypes = [
  "Clinic",
  "Nursing home",
  "Multi-specialty",
  "Super-specialty or chain",
  "Single-specialty chain",
  "Diagnostic center",
];

const specialties = [
  "Anaesthesiology",
  "Cardiology",
  "Critical Care/ICU",
  "Dermatology",
  "Emergency Medicine",
  "ENT",
  "Gastroenterology",
  "General Medicine",
  "General Surgery",
  "Nephrology/Dialysis",
  "Neurology",
  "Obstetrics & Gynaecology",
  "Oncology",
  "Ophthalmology",
  "Orthopaedics",
  "Pediatrics",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
  "Urology",
  "Other",
];

const languages = [
  "English",
  "Hindi",
  "Kannada",
  "Marathi",
];

const steps = [
  {
    number: "1",
    title: "We confirm a slot",
    description: "Within one working day of your request.",
  },
  {
    number: "2",
    title: "Pre-demo checklist",
    description: "You receive a short form so we can configure your specialties.",
  },
  {
    number: "3",
    title: "Live product demo",
    description:
      "45 minutes with a product specialist — bring your CMO and one skeptical doctor.",
  },
];

export function DemoRequestForm() {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const { city: detectedCity, isDetected } = useLocationStore();

  // Auto-fill city when location is detected
  useEffect(() => {
    if (isDetected && detectedCity && !city) {
      setCity(detectedCity);
    }
  }, [isDetected, detectedCity, city]);

  return (
    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
      {/* Form */}
      <div className="lg:col-span-3">
        <form className="space-y-4 sm:space-y-6">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                placeholder="Dr. Priya Sharma"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Work email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                placeholder="priya@hospital.in"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Phone (+91) <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                placeholder="98765 43210"
              />
            </div>
            <div>
              <label
                htmlFor="hospital"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Hospital/clinic name <span className="text-red-500">*</span>
              </label>
              <input
                id="hospital"
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                placeholder="City Care Hospital"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-foreground mb-2"
              >
                City <span className="text-red-500">*</span>
                {isDetected && detectedCity && (
                  <span className="ml-2 text-xs font-normal text-[var(--action-primary)] inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Detected
                  </span>
                )}
              </label>
              <input
                id="city"
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                placeholder="Pune"
              />
            </div>
            <div>
              <label
                htmlFor="facility-type"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Facility type <span className="text-red-500">*</span>
              </label>
              <select
                id="facility-type"
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
              >
                <option value="">Select facility type</option>
                {facilityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="beds"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Number of beds (if hospital)
            </label>
            <input
              id="beds"
              type="number"
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
              placeholder="50"
            />
          </div>

          {/* Multi-select specialty dropdown */}
          <MultiSelectDropdown
            id="specialties"
            label="Specialties of interest"
            options={specialties}
            selected={selectedSpecialties}
            onChange={setSelectedSpecialties}
            placeholder="Select specialties..."
            searchPlaceholder="Search specialties..."
          />

          <div>
            <label
              htmlFor="current-software"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Current software (optional)
            </label>
            <input
              id="current-software"
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
              placeholder="e.g., Paper-based, Tally, Other HIMS"
            />
          </div>

          <div>
            <label
              htmlFor="language"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Preferred language for demo
            </label>
            <select
              id="language"
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 sm:py-4 px-5 sm:px-6 bg-[var(--action-primary)] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[var(--action-primary-hover)] transition-colors"
          >
            Request demo
          </button>
        </form>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-24 space-y-6 sm:space-y-8">
          {/* What happens next */}
          <div className="p-5 sm:p-6 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-default)]">
            <h3 className="font-semibold text-sm sm:text-base text-foreground mb-4 sm:mb-6">
              What happens next
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-3 sm:gap-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--action-primary)] text-white flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base text-foreground">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact options */}
          <div className="p-5 sm:p-6 rounded-xl border border-[var(--border-default)]">
            <h3 className="font-semibold text-sm sm:text-base text-foreground mb-3 sm:mb-4">
              Prefer to talk now?
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <a
                href="https://wa.me/919876543210"
                className="flex items-center gap-2 sm:gap-3 text-[var(--text-secondary)] hover:text-[var(--action-primary)] transition-colors"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">WhatsApp: +91 98765 43210</span>
              </a>
              <a
                href="mailto:hello@aarogyaehr.com"
                className="flex items-center gap-2 sm:gap-3 text-[var(--text-secondary)] hover:text-[var(--action-primary)] transition-colors"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">hello@aarogyaehr.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
