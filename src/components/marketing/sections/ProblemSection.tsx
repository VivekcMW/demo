import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { FileSpreadsheet, Stethoscope, TrendingUp } from "lucide-react";

const painPoints = [
  {
    icon: FileSpreadsheet,
    title: "Billing-first design",
    description:
      "Legacy HIMS started as billing terminals with patient records bolted on. Clinical workflows are an afterthought.",
  },
  {
    icon: Stethoscope,
    title: "Doctors fight the EMR",
    description:
      "Generic forms slow down consultations. Nurses keep paper backups because the system doesn't match ward reality.",
  },
  {
    icon: TrendingUp,
    title: "Revenue leakage at month-end",
    description:
      "Promoters discover missed charges, unbilled procedures, and TPA rejections only when it's too late to fix.",
  },
];

export function ProblemSection() {
  return (
    <section className="marketing-section">
      <Container>
        <SectionHeader
          title="Most hospital software was built for billing. Yours should be built for care."
          subtitle="Indian hospitals run on systems designed twenty years ago as billing terminals with a patient file bolted on. AarogyaEHR starts from the clinical workflow — and billing, compliance, and analytics fall out of it correctly."
        />

        <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {painPoints.map((point, index) => (
            <div key={index} className="text-center p-4 sm:p-0">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-red-50 text-red-600 mb-4 sm:mb-5">
                <point.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-2">
                {point.title}
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
