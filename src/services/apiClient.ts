const BASE = "/api/v1";

type RequestOptions = RequestInit & {
  params?: Record<string, string | number | undefined>;
};

let token: string | null = null;

export function setAuthToken(t: string | null) {
  token = t;
  if (t) localStorage.setItem("api_token", t);
  else localStorage.removeItem("api_token");
}

export function getAuthToken(): string | null {
  if (!token) token = localStorage.getItem("api_token");
  return token;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...init } = options;
  let url = `${BASE}${path}`;

  if (params) {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) sp.set(k, String(v));
    }
    const qs = sp.toString();
    if (qs) url += `?${qs}`;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string>),
  };
  const t = getAuthToken();
  if (t) headers["Authorization"] = `Bearer ${t}`;

  const res = await fetch(url, { ...init, headers });

  if (!res.ok) {
    const body = await res.text();
    let msg: string;
    try {
      const parsed = JSON.parse(body);
      msg = parsed.error || parsed.message || body;
    } catch {
      msg = body || res.statusText;
    }
    throw new ApiError(res.status, msg);
  }

  const text = await res.text();
  if (!text) return undefined as T;
  return JSON.parse(text);
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

// ── Typed API methods ─────────────────────────────────────────────────────

export const api = {
  get: <T>(path: string, params?: Record<string, string | number | undefined>) =>
    request<T>(path, { params }),

  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),

  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined }),

  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),

  delete: <T>(path: string) =>
    request<T>(path, { method: "DELETE" }),
};
