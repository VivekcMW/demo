import { ReactNode } from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { LucideIcon } from "lucide-react";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  features: FeatureItem[];
  /** Alternate background */
  variant?: "default" | "alt";
  /** Grid columns on desktop */
  columns?: 2 | 3 | 4;
  /** Visual element on the side */
  visual?: ReactNode;
  /** Reverse layout (visual on left) */
  reverse?: boolean;
}

export function FeatureSection({
  eyebrow,
  title,
  subtitle,
  features,
  variant = "default",
  columns = 3,
  visual,
  reverse = false,
}: FeatureSectionProps) {
  const bgClass = variant === "alt" ? "bg-section-alt" : "";
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  const content = (
    <div className={visual ? "lg:max-w-xl" : ""}>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        align={visual ? "left" : "center"}
      />

      <div className={`mt-10 grid gap-8 ${visual ? "grid-cols-1 sm:grid-cols-2" : gridCols}`}>
        {features.map((feature, index) => (
          <div key={index} className={visual ? "" : "text-center"}>
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--action-subtle)] text-[var(--action-primary)] mb-4 ${
                visual ? "" : "mx-auto"
              }`}
            >
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  if (visual) {
    return (
      <section className={`marketing-section ${bgClass}`}>
        <Container>
          <div
            className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
              reverse ? "lg:flex-row-reverse" : ""
            }`}
          >
            {reverse ? (
              <>
                <div className="order-2 lg:order-1">{visual}</div>
                <div className="order-1 lg:order-2">{content}</div>
              </>
            ) : (
              <>
                {content}
                {visual}
              </>
            )}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={`marketing-section ${bgClass}`}>
      <Container>{content}</Container>
    </section>
  );
}
