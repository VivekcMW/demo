// ICD-10 Service - API client for ICD-10 code lookup and search
import type {
  ICD10SearchResult,
  ICD10CodeDetail,
  ICD10Chapter,
  ICD10Category,
  ICD10SpecialtyFavorite,
  ICD10PCSResult,
  ICD10Stats,
} from "@/lib/types/icd10";

const BASE = "/api/v1/icd10";

function getAuthToken(): string | null {
  return localStorage.getItem("api_token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  const token = getAuthToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || res.statusText);
  }
  const text = await res.text();
  if (!text) throw new Error("Empty response");
  return JSON.parse(text) as T;
}

// ─────────────────────────────────────────────────────────────────────────────
// Search ICD-10 codes with filters
// ─────────────────────────────────────────────────────────────────────────────
export interface SearchParams {
  q: string;
  chapter?: string;
  specialty?: string;
  billable?: boolean;
  chronic?: boolean;
  limit?: number;
}

export async function searchICD10(params: SearchParams): Promise<ICD10SearchResult[]> {
  const sp = new URLSearchParams();
  sp.set("q", params.q);
  if (params.chapter) sp.set("chapter", params.chapter);
  if (params.specialty) sp.set("specialty", params.specialty);
  if (params.billable !== undefined) sp.set("billable", String(params.billable));
  if (params.chronic !== undefined) sp.set("chronic", String(params.chronic));
  if (params.limit) sp.set("limit", String(params.limit));

  return request<ICD10SearchResult[]>(`/search?${sp.toString()}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Get code details
// ─────────────────────────────────────────────────────────────────────────────
export async function getICD10Code(code: string): Promise<ICD10CodeDetail> {
  return request<ICD10CodeDetail>(`/code/${encodeURIComponent(code)}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Chapters
// ─────────────────────────────────────────────────────────────────────────────
export async function getChapters(): Promise<ICD10Chapter[]> {
  return request<ICD10Chapter[]>("/chapters");
}

export async function getChapter(id: number): Promise<ICD10Chapter & { categories: ICD10Category[] }> {
  return request<ICD10Chapter & { categories: ICD10Category[] }>(`/chapters/${id}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Categories
// ─────────────────────────────────────────────────────────────────────────────
export async function getCategories(chapterId?: number): Promise<ICD10Category[]> {
  const url = chapterId ? `/categories?chapter=${chapterId}` : "/categories";
  return request<ICD10Category[]>(url);
}

// ─────────────────────────────────────────────────────────────────────────────
// Specialty Favorites (quick-pick)
// ─────────────────────────────────────────────────────────────────────────────
export async function getSpecialtyFavorites(specialty: string): Promise<ICD10SpecialtyFavorite[]> {
  return request<ICD10SpecialtyFavorite[]>(`/favorites/${encodeURIComponent(specialty)}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Record usage for learning
// ─────────────────────────────────────────────────────────────────────────────
export async function recordUsage(code: string, specialty: string): Promise<void> {
  return request<void>("/usage", {
    method: "POST",
    body: JSON.stringify({ code, specialty }),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Chronic conditions list
// ─────────────────────────────────────────────────────────────────────────────
export async function getChronicConditions(): Promise<ICD10SearchResult[]> {
  return request<ICD10SearchResult[]>("/chronic");
}

// ─────────────────────────────────────────────────────────────────────────────
// Codes by specialty
// ─────────────────────────────────────────────────────────────────────────────
export async function getCodesBySpecialty(specialty: string): Promise<ICD10SearchResult[]> {
  return request<ICD10SearchResult[]>(`/specialty/${encodeURIComponent(specialty)}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// ICD-10-PCS procedure search
// ─────────────────────────────────────────────────────────────────────────────
export async function searchPCS(q: string, section?: string): Promise<ICD10PCSResult[]> {
  const sp = new URLSearchParams({ q });
  if (section) sp.set("section", section);
  return request<ICD10PCSResult[]>(`/pcs/search?${sp.toString()}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Validate codes (batch)
// ─────────────────────────────────────────────────────────────────────────────
export interface ValidationResult {
  code: string;
  valid: boolean;
  isBillable?: boolean;
  description?: string;
}

export async function validateCodes(codes: string[]): Promise<ValidationResult[]> {
  return request<ValidationResult[]>("/validate", {
    method: "POST",
    body: JSON.stringify({ codes }),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Statistics
// ─────────────────────────────────────────────────────────────────────────────
export async function getStats(): Promise<ICD10Stats> {
  return request<ICD10Stats>("/stats");
}
