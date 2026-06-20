import { api, setAuthToken, getAuthToken, ApiError } from "./apiClient";

export type LoginResult = {
  token: string;
  user: { id: string; email: string; role: string; staffId: string | null };
};

export async function login(email: string, password: string): Promise<LoginResult> {
  const result = await api.post<LoginResult>("/auth/login", { email, password });
  setAuthToken(result.token);
  return result;
}

// HIPAA §164.312(a)(2)(i): Removed createSeedUser — admin creation must go through
// authenticated admin interface only, not an unauthenticated public endpoint.

export function logout() {
  setAuthToken(null);
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export { ApiError };
