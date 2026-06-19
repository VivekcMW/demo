"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Phone, MapPin } from "lucide-react";
import { MultiSelectDropdown } from "@/components/marketing/ui/MultiSelectDropdown";
import { useLocationStore } from "@/store/locationStore";
import { useTranslation } from "@/hooks/useTranslation";

const facilityTypes = [
  "facilities.clinic",
  "facilities.nursingHome",
  "facilities.multiSpecialty",
  "facilities.superSpecialty",
  "facilities.singleSpecialtyChain",
  "facilities.diagnosticCenter",
];

const specialties = [
  "demoForm.specialtyAnaesthesiology",
  "demoForm.specialtyCardiology",
  "demoForm.specialtyCriticalCare",
  "demoForm.specialtyDermatology",
  "demoForm.specialtyEmergency",
  "demoForm.specialtyEnt",
  "demoForm.specialtyGastroenterology",
  "demoForm.specialtyGeneralMedicine",
  "demoForm.specialtyGeneralSurgery",
  "demoForm.specialtyNephrology",
  "demoForm.specialtyNeurology",
  "demoForm.specialtyObg",
  "demoForm.specialtyOncology",
  "demoForm.specialtyOphthalmology",
  "demoForm.specialtyOrthopaedics",
  "demoForm.specialtyPediatrics",
  "demoForm.specialtyPsychiatry",
  "demoForm.specialtyPulmonology",
  "demoForm.specialtyRadiology",
  "demoForm.specialtyUrology",
  "demoForm.specialtyOther",
];

const languages = [
  "demoForm.languageEnglish",
  "demoForm.languageHindi",
  "demoForm.languageKannada",
  "demoForm.languageMarathi",
];

const steps = [
  {
    number: "1",
    titleKey: "demo.step1Title",
    descriptionKey: "demo.step1Desc",
  },
  {
    number: "2",
    titleKey: "demo.step2Title",
    descriptionKey: "demo.step2Desc",
  },
  {
    number: "3",
    titleKey: "demo.step3Title",
    descriptionKey: "demo.step3Desc",
  },
];

export function DemoRequestForm() {
  const { t } = useTranslation();
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
                {t("form.nameRequired")}
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                placeholder={t("demoForm.namePlaceholder")}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("form.emailRequired")}
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                placeholder={t("demoForm.emailPlaceholder")}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("form.phoneRequired")}
              </label>
              <input
                id="phone"
                type="tel"
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                placeholder={t("demoForm.phonePlaceholder")}
              />
            </div>
            <div>
              <label
                htmlFor="hospital"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("form.hospitalRequired")}
              </label>
              <input
                id="hospital"
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                placeholder={t("demoForm.hospitalPlaceholder")}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("form.cityRequired")}
                {isDetected && detectedCity && (
                  <span className="ml-2 text-xs font-normal text-[var(--action-primary)] inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {t("form.detected")}
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
                placeholder={t("demoForm.cityPlaceholder")}
              />
            </div>
            <div>
              <label
                htmlFor="facility-type"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t("form.facilityRequired")}
              </label>
              <select
                id="facility-type"
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
              >
                <option value="">{t("form.selectFacility")}</option>
                {facilityTypes.map((key) => (
                  <option key={key} value={key}>
                    {t(key)}
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
              {t("form.beds")}
            </label>
            <input
              id="beds"
              type="number"
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
              placeholder={t("demoForm.bedsPlaceholder")}
            />
          </div>

          {/* Multi-select specialty dropdown */}
          <MultiSelectDropdown
            id="specialties"
            label={t("form.specialties")}
            options={specialties}
            selected={selectedSpecialties}
            onChange={setSelectedSpecialties}
            placeholder={t("form.selectSpecialties")}
            searchPlaceholder={t("form.searchSpecialties")}
          />

          <div>
            <label
              htmlFor="current-software"
              className="block text-sm font-medium text-foreground mb-2"
            >
              {t("form.currentSoftware")}
            </label>
            <input
              id="current-software"
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
              placeholder={t("demoForm.softwarePlaceholder")}
            />
          </div>

          <div>
            <label
              htmlFor="language"
              className="block text-sm font-medium text-foreground mb-2"
            >
              {t("form.preferredLanguage")}
            </label>
            <select
              id="language"
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
            >
              {languages.map((key) => (
                <option key={key} value={key}>
                  {t(key)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 sm:py-4 px-5 sm:px-6 bg-[var(--action-primary)] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[var(--action-primary-hover)] transition-colors"
          >
            {t("demo.requestDemo")}
          </button>
        </form>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-24 space-y-6 sm:space-y-8">
          {/* What happens next */}
          <div className="p-5 sm:p-6 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-default)]">
            <h3 className="font-semibold text-sm sm:text-base text-foreground mb-4 sm:mb-6">
              {t("demo.whatHappensNext")}
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-3 sm:gap-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--action-primary)] text-white flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base text-foreground">{t(step.titleKey)}</h4>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                      {t(step.descriptionKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact options */}
          <div className="p-5 sm:p-6 rounded-xl border border-[var(--border-default)]">
            <h3 className="font-semibold text-sm sm:text-base text-foreground mb-3 sm:mb-4">
              {t("demo.talkNow")}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <a
                href="https://wa.me/919876543210"
                className="flex items-center gap-2 sm:gap-3 text-[var(--text-secondary)] hover:text-[var(--action-primary)] transition-colors"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{t("demoForm.whatsappContact")}</span>
              </a>
              <a
                href="mailto:hello@aarogyaehr.com"
                className="flex items-center gap-2 sm:gap-3 text-[var(--text-secondary)] hover:text-[var(--action-primary)] transition-colors"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{t("demoForm.emailContact")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
