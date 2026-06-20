import { Metadata } from "next";
import {
  TrendingUp,
  Shield,
  GraduationCap,
  Users,
  Headphones,
  Package,
  Building2,
  Wrench,
  Share2,
  Cpu,
  Award,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import { PageBreadcrumb } from "@/components/marketing/templates";
import { PartnerEnquiryForm } from "@/components/marketing/forms/PartnerEnquiryForm";
import { PartnerEarningsCalculator } from "@/components/marketing/forms/PartnerEarningsCalculator";

export const metadata: Metadata = {
  title: "Channel Partner Programme — AarogyaEHR",
  description:
    "Join 150+ channel partners earning recurring revenue reselling AarogyaEHR. 20-30% revenue share, protected territories, certified training, and zero inventory risk.",
  keywords: [
    "healthcare partner program",
    "EHR reseller India",
    "hospital software distributor",
    "HIMS partner",
    "healthcare IT channel partner",
  ],
};

const benefits = [
  {
    icon: TrendingUp,
    title: "Recurring Revenue",
    description: "20-30% revenue share on subscriptions — earn every month your customer stays active.",
  },
  {
    icon: GraduationCap,
    title: "Certified Training",
    description: "Free product certification, implementation playbooks, and sandbox environments.",
  },
  {
    icon: Shield,
    title: "Protected Territories",
    description: "Exclusive regional rights for qualified partners — no channel conflict.",
  },
  {
    icon: Users,
    title: "Joint Go-to-Market",
    description: "Co-branded collateral, regional language support, and qualified lead sharing.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Partner success manager, priority escalation, and technical pre-sales assistance.",
  },
  {
    icon: Package,
    title: "Zero Inventory Risk",
    description: "SaaS model = no hardware stocking, no license inventory, no capital lock-up.",
  },
];

const partnerTiers = [
  {
    name: "Authorized Reseller",
    share: "20%",
    color: "border-slate-300",
    requirements: ["1 certified sales rep", "₹5L annual commitment"],
    benefits: ["Partner Portal access", "Basic marketing kit", "Non-exclusive city territory"],
  },
  {
    name: "Silver Partner",
    share: "25%",
    color: "border-blue-400",
    highlight: false,
    requirements: ["2 certified reps + 1 technical", "₹15L annual", "5+ active customers"],
    benefits: ["Lead sharing", "Co-branded events", "Priority support", "Protected district"],
  },
  {
    name: "Gold Partner",
    share: "30%",
    color: "border-amber-400",
    highlight: true,
    requirements: ["5+ certified team", "₹50L annual", "15+ active customers"],
    benefits: ["Market Development Funds", "Featured in directory", "Exclusive state/zone territory", "Executive sponsor"],
  },
];

const partnerTypes = [
  {
    icon: Building2,
    name: "Reseller Partner",
    ideal: "IT distributors, pharmacy chains, medical equipment dealers",
    focus: "Sales & customer acquisition",
  },
  {
    icon: Wrench,
    name: "Implementation Partner",
    ideal: "Healthcare IT firms, NABH consultants, systems integrators",
    focus: "Deployment & go-live services",
  },
  {
    icon: Share2,
    name: "Referral Partner",
    ideal: "Hospital consultants, CA firms, medical associations",
    focus: "Lead referral (10-15% ongoing)",
  },
  {
    icon: Cpu,
    name: "Technology Partner",
    ideal: "Device manufacturers, LIS/RIS vendors, diagnostics companies",
    focus: "Integration & bundled offerings",
  },
];

const testimonials = [
  {
    quote: "In 18 months, we've onboarded 23 hospitals across Karnataka. AarogyaEHR's recurring model means our revenue compounds — not the typical one-time project fees.",
    author: "Rajesh K.",
    role: "Gold Partner, Bengaluru",
    rating: 5,
  },
  {
    quote: "The certification program gave my team confidence. We now close deals in half the time we used to.",
    author: "Priya M.",
    role: "Silver Partner, Lucknow",
    rating: 5,
  },
  {
    quote: "As an NABH consultant, I used to only advise. Now I can offer a complete solution. Referral income from AarogyaEHR adds 30% to my consulting revenue.",
    author: "Dr. Anand S.",
    role: "Referral Partner, Chennai",
    rating: 5,
  },
];

const faqs = [
  {
    question: "What's the minimum investment?",
    answer: "No inventory or license purchase required. Your investment is time for certification and sales effort.",
  },
  {
    question: "How are territories assigned?",
    answer: "Based on your tier level, regional demand, and existing partner coverage. We actively avoid channel conflict.",
  },
  {
    question: "Can I partner if I already represent another EHR?",
    answer: "Generally no — we require non-compete for active deals. Referral track is an option if you want to test the relationship.",
  },
  {
    question: "Is there a partner fee?",
    answer: "No annual fee. Revenue share model only — you earn when we earn.",
  },
  {
    question: "How is commission calculated?",
    answer: "Percentage of customer's subscription value, paid monthly for the life of the account.",
  },
  {
    question: "What support do you provide for implementations?",
    answer: "Implementation playbooks, remote training support, and escalation paths. Complex projects can include our services team at partner margin.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageBreadcrumb
        items={[
          { label: "Company", href: "/company" },
          { label: "Channel Partners" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              150+ Channel Partners across India
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Grow with AarogyaEHR — India&apos;s Healthcare Digital Partner Programme
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
              Join our partner network earning recurring revenue while transforming hospitals in their region. 
              No inventory, no upfront investment — just your relationships and our platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="#apply" size="lg">
                Apply to Partner Programme
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button href="#calculator" variant="secondary" size="lg">
                Calculate Your Earnings
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: "150+", label: "Active Partners" },
              { value: "20-30%", label: "Revenue Share" },
              { value: "22", label: "States Covered" },
              { value: "₹0", label: "Upfront Investment" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[var(--action-primary)]">{stat.value}</div>
                <div className="text-sm text-[var(--text-secondary)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Partner */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeader
            title="Why Partner with AarogyaEHR?"
            subtitle="Everything you need to build a sustainable healthcare software business"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-6 rounded-xl border border-[var(--border-default)] hover:border-[var(--action-primary)]/30 transition-colors">
                <benefit.icon className="w-10 h-10 text-[var(--action-primary)] mb-4" />
                <h3 className="font-semibold text-lg text-foreground mb-2">{benefit.title}</h3>
                <p className="text-[var(--text-secondary)]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Earnings Calculator */}
      <section id="calculator" className="py-16 md:py-24 bg-[var(--bg-subtle)]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                See What You Could Earn
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8">
                Unlike one-time project fees, our recurring revenue model means your income grows 
                as you add customers. Use the calculator to project your earnings over 3 years.
              </p>
              <div className="space-y-4">
                {[
                  "Monthly commission for the life of each customer",
                  "No revenue caps or clawbacks",
                  "Earn more as you move up partner tiers",
                  "Transparent reporting via Partner Portal",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <PartnerEarningsCalculator />
          </div>
        </Container>
      </section>

      {/* Partner Tiers */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeader
            title="Partner Tiers"
            subtitle="Clear progression path with increasing benefits"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {partnerTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-6 rounded-2xl border-2 ${tier.color} ${
                  tier.highlight ? "bg-amber-50/50" : "bg-white"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="font-bold text-xl text-foreground mb-2">{tier.name}</h3>
                  <div className="text-4xl font-bold text-[var(--action-primary)]">{tier.share}</div>
                  <div className="text-sm text-[var(--text-secondary)]">revenue share</div>
                </div>
                
                <div className="mb-6">
                  <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
                    Requirements
                  </div>
                  <ul className="space-y-2">
                    {tier.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-[var(--text-secondary)]">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
                    Benefits
                  </div>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Partner Types */}
      <section className="py-16 md:py-24 bg-[var(--bg-subtle)]">
        <Container>
          <SectionHeader
            title="Partner Types"
            subtitle="Different tracks for different business models"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerTypes.map((type) => (
              <div key={type.name} className="p-6 rounded-xl bg-white border border-[var(--border-default)]">
                <type.icon className="w-10 h-10 text-[var(--action-primary)] mb-4" />
                <h3 className="font-semibold text-lg text-foreground mb-3">{type.name}</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-[var(--text-secondary)]">Ideal for:</span>
                    <p className="text-foreground">{type.ideal}</p>
                  </div>
                  <div>
                    <span className="text-[var(--text-secondary)]">Focus:</span>
                    <p className="text-foreground font-medium">{type.focus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeader
            title="Partner Success Stories"
            subtitle="Hear from partners who've built successful businesses with AarogyaEHR"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-default)]">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-[var(--text-secondary)]">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 md:py-24 bg-[var(--bg-subtle)]">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Apply to Partner Programme
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Fill out the form below and we&apos;ll get back to you within 48 hours with next steps.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <PartnerEnquiryForm />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Common questions about our partner programme"
          />
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group p-6 rounded-xl border border-[var(--border-default)] bg-white"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                    <span className="text-[var(--action-primary)] group-open:rotate-180 transition-transform">
                      <ArrowRight className="w-5 h-5 rotate-90" />
                    </span>
                  </summary>
                  <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-[var(--action-primary)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center text-white">
            <Award className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build a Healthcare Business That Compounds?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join 150+ partners already earning recurring revenue with AarogyaEHR.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="#apply" variant="inverse" size="lg">
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button href="mailto:partners@aarogyaehr.com" variant="ghost" size="lg" className="text-white hover:bg-white/10">
                Contact Partner Team
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
