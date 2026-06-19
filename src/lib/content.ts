import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "..", "Website");

export interface ContentMeta {
  slug: string;
  meta_title?: string;
  meta_description?: string;
  keywords?: string[];
  page?: string;
  hub?: string;
  tier?: number;
  primary_cta?: string;
  [key: string]: unknown;
}

export interface ContentFile {
  slug: string;
  meta: ContentMeta;
  content: string;
  rawContent: string;
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "").replace(/_index/, "index");
}

export function getContentFile(
  section: string,
  slug: string
): ContentFile | null {
  const sectionMap: Record<string, string> = {
    core: "01-core",
    product: "02-product",
    specialties: "03-solutions-specialty",
    facilities: "04-solutions-facility",
    roles: "05-solutions-role",
    platform: "06-platform",
    resources: "07-resources",
    company: "08-company",
    legal: "09-legal",
  };

  const folder = sectionMap[section];
  if (!folder) return null;

  // Try exact match first, then with _index for index pages
  const possibleFiles = [
    `${slug}.md`,
    slug === "index" ? "_index.md" : null,
  ].filter(Boolean) as string[];

  for (const filename of possibleFiles) {
    const filePath = path.join(CONTENT_DIR, folder, filename);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      return {
        slug,
        meta: { slug, ...data } as ContentMeta,
        content,
        rawContent: fileContent,
      };
    }
  }

  return null;
}

export function getAllSlugs(section: string): string[] {
  const sectionMap: Record<string, string> = {
    core: "01-core",
    product: "02-product",
    specialties: "03-solutions-specialty",
    facilities: "04-solutions-facility",
    roles: "05-solutions-role",
    platform: "06-platform",
    resources: "07-resources",
    company: "08-company",
    legal: "09-legal",
  };

  const folder = sectionMap[section];
  if (!folder) return [];

  const dirPath = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath);
  return files
    .filter((f) => f.endsWith(".md") && f !== "_index.md")
    .map(slugFromFilename);
}

export function getAllContentFiles(section: string): ContentFile[] {
  const slugs = getAllSlugs(section);
  return slugs
    .map((slug) => getContentFile(section, slug))
    .filter((f): f is ContentFile => f !== null);
}

// Parse markdown content into structured sections
export interface ParsedSection {
  type: "hero" | "heading" | "paragraph" | "list" | "faq" | "cta" | "unknown";
  title?: string;
  content?: string;
  items?: string[];
  level?: number;
}

export function parseMarkdownSections(content: string): ParsedSection[] {
  const lines = content.split("\n");
  const sections: ParsedSection[] = [];
  let currentSection: ParsedSection | null = null;
  let inList = false;
  let listItems: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Heading
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      if (currentSection) {
        if (inList && listItems.length > 0) {
          currentSection.items = [...listItems];
          listItems = [];
          inList = false;
        }
        sections.push(currentSection);
      }

      const level = headingMatch[1].length;
      const title = headingMatch[2];

      // Check for special section types
      if (title.toLowerCase() === "hero") {
        currentSection = { type: "hero", title };
      } else if (
        title.toLowerCase().includes("faq") ||
        title.toLowerCase().includes("frequently asked")
      ) {
        currentSection = { type: "faq", title, items: [] };
      } else if (
        title.toLowerCase().includes("cta") ||
        title.toLowerCase().includes("call to action")
      ) {
        currentSection = { type: "cta", title };
      } else {
        currentSection = { type: "heading", title, level, content: "" };
      }
      continue;
    }

    // List item
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      inList = true;
      listItems.push(trimmed.slice(2));
      continue;
    }

    // End of list
    if (inList && trimmed === "") {
      if (currentSection) {
        currentSection.items = [...listItems];
      }
      listItems = [];
      inList = false;
      continue;
    }

    // Regular paragraph content
    if (trimmed && currentSection) {
      currentSection.content =
        (currentSection.content || "") + (currentSection.content ? "\n" : "") + trimmed;
    }
  }

  // Push last section
  if (currentSection) {
    if (inList && listItems.length > 0) {
      currentSection.items = [...listItems];
    }
    sections.push(currentSection);
  }

  return sections;
}

// Extract hero content from markdown
export function extractHero(content: string): {
  h1: string;
  subhead: string;
  primaryCta?: string;
  secondaryCta?: string;
} {
  const h1Match = content.match(/\*\*H1:\*\*\s*(.+)/);
  const subheadMatch = content.match(/\*\*Subhead:\*\*\s*(.+)/);
  const primaryCtaMatch = content.match(/\*\*Primary CTA:\*\*\s*(.+?)(?:\s*·|\s*$)/);
  const secondaryCtaMatch = content.match(/\*\*Secondary CTA:\*\*\s*(.+)/);

  // Also try to extract from first # heading if no **H1:**
  let h1 = h1Match?.[1] || "";
  if (!h1) {
    const firstHeading = content.match(/^#\s+(.+)$/m);
    h1 = firstHeading?.[1] || "";
  }

  return {
    h1: h1.trim(),
    subhead: subheadMatch?.[1]?.trim() || "",
    primaryCta: primaryCtaMatch?.[1]?.trim(),
    secondaryCta: secondaryCtaMatch?.[1]?.trim(),
  };
}

// Extract key capabilities/features as structured data
export function extractFeatures(
  content: string
): Array<{ title: string; description: string }> {
  const features: Array<{ title: string; description: string }> = [];
  const featurePattern = /- \*\*(.+?):\*\*\s*(.+)/g;
  let match;

  while ((match = featurePattern.exec(content)) !== null) {
    features.push({
      title: match[1].trim(),
      description: match[2].trim(),
    });
  }

  return features;
}

// Extract FAQ items
export function extractFAQs(
  content: string
): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = [];
  // Use [\s\S] instead of s flag for compatibility
  const faqPattern = /\*\*Q:\s*(.+?)\*\*\s*\n+A:\s*(.+?)(?=\n\n|\*\*Q:|\n\*\*Q:|$)/g;
  
  let match;
  while ((match = faqPattern.exec(content)) !== null) {
    // Check if the match spans multiple lines (simulating s flag)
    const fullMatch = match[0];
    if (fullMatch.includes('\n')) {
      faqs.push({
        question: match[1].trim(),
        answer: match[2].trim(),
      });
    }
  }

  // Also try alternate format: **Question?** Answer
  if (faqs.length === 0) {
    const altPattern = /\*\*(.+?\?)\*\*\s*\n?(.+?)(?=\n\n\*\*|\n\*\*[A-Z]|$)/g;
    while ((match = altPattern.exec(content)) !== null) {
      const fullMatch = match[0];
      if (fullMatch.includes('\n') || match[2].includes('\n')) {
        faqs.push({
          question: match[1].trim(),
          answer: match[2].trim(),
        });
      }
    }
  }

  return faqs;
}
