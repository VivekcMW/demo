"use client";

import { useState } from "react";
import { CheckCircle, Phone, Mail, Building2, Users, Briefcase, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { MultiSelectDropdown } from "@/components/marketing/ui/MultiSelectDropdown";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Chandigarh",
  "Puducherry",
];

const PARTNER_TYPES = [
  "Reseller Partner",
  "Implementation Partner",
  "Referral Partner",
  "Technology Partner",
];

const EXISTING_BUSINESS = [
  "IT Services & Solutions",
  "Medical Devices & Equipment",
  "Pharmaceutical Distribution",
  "Hospital Consulting",
  "NABH Consulting",
  "Software Reseller",
  "Healthcare Staffing",
  "Other",
];

const TEAM_SIZE_OPTIONS = ["1-5", "6-20", "21-50", "50+"];

const REGIONS = ["North India", "South India", "East India", "West India", "Central India", "Pan-India"];

const HEAR_ABOUT_US = [
  "Google Search",
  "LinkedIn",
  "Referral from Partner",
  "Industry Event",
  "WhatsApp",
  "Other",
];

const steps = [
  {
    number: "1",
    title: "Application Review",
    description: "We review your application within 48 hours",
  },
  {
    number: "2",
    title: "Discovery Call",
    description: "30-minute call to understand your business",
  },
  {
    number: "3",
    title: "Partner Agreement",
    description: "Clear terms, no hidden clauses",
  },
  {
    number: "4",
    title: "Onboarding & Training",
    description: "Certification + sandbox access",
  },
];

export function PartnerEnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPartnerTypes, setSelectedPartnerTypes] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    designation: "",
    email: "",
    phone: "",
    website: "",
    city: "",
    state: "",
    existingBusiness: "",
    yearsInBusiness: "",
    teamSize: "",
    healthcareClients: "",
    currentProducts: "",
    whyPartner: "",
    hearAboutUs: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/partner-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          partnerTypes: selectedPartnerTypes,
          regionsOfInterest: selectedRegions,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">Application Received!</h3>
        <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-6">
          Thank you for your interest in partnering with AarogyaEHR. We&apos;ve sent you the Partner Kit via email. Our team will contact you within 48 hours.
        </p>
        <div className="inline-flex items-center gap-2 text-sm text-[var(--action-primary)]">
          <Mail className="w-4 h-4" />
          Check your inbox for the Partner Kit PDF
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
      {/* Form */}
      <div className="lg:col-span-3">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[var(--action-primary)]" />
              Company Information
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-2">
                  Company Name *
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                  placeholder="Your company name"
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-foreground mb-2">
                  Company Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                  City *
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                  placeholder="e.g., Mumbai"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-foreground mb-2">
                  State *
                </label>
                <select
                  id="state"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                >
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Contact Person */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-[var(--action-primary)]" />
              Contact Person
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  id="contactPerson"
                  name="contactPerson"
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="designation" className="block text-sm font-medium text-foreground mb-2">
                  Designation *
                </label>
                <input
                  id="designation"
                  name="designation"
                  type="text"
                  required
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                  placeholder="e.g., Director, Sales Head"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Work Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Mobile Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[var(--action-primary)]" />
              Business Details
            </h3>

            <MultiSelectDropdown
              id="partnerTypes"
              label="Partner Type Interest *"
              options={PARTNER_TYPES}
              selected={selectedPartnerTypes}
              onChange={setSelectedPartnerTypes}
              placeholder="Select partner type(s)"
              searchPlaceholder="Search types..."
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="existingBusiness" className="block text-sm font-medium text-foreground mb-2">
                  Current Business *
                </label>
                <select
                  id="existingBusiness"
                  name="existingBusiness"
                  required
                  value={formData.existingBusiness}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                >
                  <option value="">Select business type</option>
                  {EXISTING_BUSINESS.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="yearsInBusiness" className="block text-sm font-medium text-foreground mb-2">
                  Years in Business *
                </label>
                <input
                  id="yearsInBusiness"
                  name="yearsInBusiness"
                  type="number"
                  min="0"
                  required
                  value={formData.yearsInBusiness}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                  placeholder="e.g., 5"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="teamSize" className="block text-sm font-medium text-foreground mb-2">
                  Team Size *
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  required
                  value={formData.teamSize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                >
                  <option value="">Select team size</option>
                  {TEAM_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="healthcareClients" className="block text-sm font-medium text-foreground mb-2">
                  Healthcare Clients (approx.)
                </label>
                <input
                  id="healthcareClients"
                  name="healthcareClients"
                  type="number"
                  min="0"
                  value={formData.healthcareClients}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                  placeholder="e.g., 10"
                />
              </div>
            </div>

            <MultiSelectDropdown
              id="regions"
              label="Regions of Interest *"
              options={REGIONS}
              selected={selectedRegions}
              onChange={setSelectedRegions}
              placeholder="Select region(s)"
              searchPlaceholder="Search regions..."
            />
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--action-primary)]" />
              Additional Information
            </h3>

            <div>
              <label htmlFor="currentProducts" className="block text-sm font-medium text-foreground mb-2">
                Products/Brands Currently Represented
              </label>
              <textarea
                id="currentProducts"
                name="currentProducts"
                rows={2}
                value={formData.currentProducts}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition resize-none"
                placeholder="List any healthcare IT or device brands you currently represent"
              />
            </div>

            <div>
              <label htmlFor="whyPartner" className="block text-sm font-medium text-foreground mb-2">
                Why do you want to partner with AarogyaEHR?
              </label>
              <textarea
                id="whyPartner"
                name="whyPartner"
                rows={3}
                value={formData.whyPartner}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition resize-none"
                placeholder="Tell us what attracted you to our partner programme"
              />
            </div>

            <div>
              <label htmlFor="hearAboutUs" className="block text-sm font-medium text-foreground mb-2">
                How did you hear about us? *
              </label>
              <select
                id="hearAboutUs"
                name="hearAboutUs"
                required
                value={formData.hearAboutUs}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
              >
                <option value="">Select option</option>
                {HEAR_ABOUT_US.map((source) => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || selectedPartnerTypes.length === 0 || selectedRegions.length === 0}
            className="w-full py-4 px-6 bg-[var(--action-primary)] text-white font-semibold rounded-lg hover:bg-[var(--action-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                Apply to Partner Programme
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-xs text-center text-[var(--text-secondary)]">
            By submitting, you agree to receive communications from AarogyaEHR about the partner programme.
          </p>
        </form>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-24 space-y-6">
          {/* What happens next */}
          <div className="p-6 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-default)]">
            <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--action-primary)]" />
              What happens next
            </h3>
            <div className="space-y-5">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--action-primary)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{step.title}</h4>
                    <p className="text-sm text-[var(--text-secondary)]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Share Highlight */}
          <div className="p-6 rounded-xl border-2 border-[var(--action-primary)] bg-[var(--action-primary)]/5">
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--action-primary)] mb-2">20-30%</div>
              <div className="text-sm font-medium text-foreground mb-1">Recurring Revenue Share</div>
              <p className="text-xs text-[var(--text-secondary)]">
                Monthly commission for the life of each customer account
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="p-6 rounded-xl border border-[var(--border-default)]">
            <h3 className="font-semibold text-foreground mb-4">Questions?</h3>
            <div className="space-y-3">
              <a
                href="mailto:partners@aarogyaehr.com"
                className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--action-primary)] transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm">partners@aarogyaehr.com</span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--action-primary)] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="text-sm">+91 98765 43210</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
