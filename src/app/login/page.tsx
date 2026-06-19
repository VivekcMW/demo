"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { FormEvent, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("doctor@aarogya.app");
  const [password, setPassword] = useState("Doctor@123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    const result = await login(email.trim(), password);
    if (!result.ok) { setError(result.message); return; }
    const user = useAuthStore.getState().currentUser;
    const role = (user as { role?: string } | null)?.role;
    const dest = role === "receptionist" ? "/reception" : role === "billing" ? "/billing" : "/dashboard";
    router.push(dest);
  };

  return (
    <main className="min-h-screen bg-[var(--surface-page)]">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] shadow-sm md:grid-cols-2">
          <div className="hidden border-r border-[var(--border-default)] bg-[var(--action-subtle)] p-10 md:flex md:flex-col md:justify-between">
            <div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--action-primary)]">Aarogya EHR</p>
                <p className="text-xs text-[var(--text-secondary)]">By TheCgroup Private Limited</p>
              </div>
              <h1 className="mt-3 text-3xl font-semibold text-[var(--text-primary)]">Clinical workflows, designed for India.</h1>
              <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
                Static UI prototype mode with seeded users for quick workflow validation.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 text-sm text-[var(--text-secondary)]">
              <p className="font-medium text-[var(--text-primary)]">Seed login</p>
              <div className="mt-3 space-y-3">
                <button type="button" onClick={() => { setEmail("doctor@aarogya.app"); setPassword("Doctor@123"); }} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] p-3 text-left hover:border-[var(--action-primary)] transition-colors">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--action-primary)]">Doctor</p>
                  <p className="mt-1">Email: doctor@aarogya.app</p>
                  <p>Password: Doctor@123</p>
                </button>
                <button type="button" onClick={() => { setEmail("nalini.das@aarogya.app"); setPassword("Recept@123"); }} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] p-3 text-left hover:border-[var(--action-primary)] transition-colors">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--action-primary)]">Receptionist</p>
                  <p className="mt-1">Email: nalini.das@aarogya.app</p>
                  <p>Password: Recept@123</p>
                </button>
                <button type="button" onClick={() => { setEmail("billing@aarogya.app"); setPassword("Billing@123"); }} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] p-3 text-left hover:border-[var(--action-primary)] transition-colors">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--action-primary)]">Billing Staff</p>
                  <p className="mt-1">Email: billing@aarogya.app</p>
                  <p>Password: Billing@123</p>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <div className="mx-auto w-full max-w-md">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Sign in</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">Welcome back. Enter your credentials to continue.</p>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-11 w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 text-sm text-[var(--text-primary)] outline-none"
                    placeholder="doctor@aarogya.app"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="h-11 w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 pr-11 text-sm text-[var(--text-primary)] outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 inline-flex w-11 items-center justify-center text-[var(--text-secondary)]"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error ? (
                  <p className="rounded-lg bg-[var(--critical-bg)] px-3 py-2 text-sm text-[var(--critical-fg)]">{error}</p>
                ) : null}

                <button
                  type="submit"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--action-primary)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--action-primary-hover)]"
                >
                  <LogIn size={18} />
                  Continue
                </button>
              </form>

              <p className="mt-6 text-sm text-[var(--text-secondary)]">
                Don&apos;t have an account?{" "}
                <Link className="font-medium text-[var(--text-link)] hover:underline" href="/register">
                  Create one
                </Link>
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                <Link className="font-medium text-[var(--action-primary)] hover:underline" href="/portal/login">
                  Patient Portal →
                </Link>
                {" "}— Access your health records
              </p>

              <div className="mt-8 rounded-xl border border-[var(--border-default)] bg-[var(--surface-sunken)] p-4 text-sm text-[var(--text-secondary)] md:hidden">
                <p className="font-medium text-[var(--text-primary)]">Seed login</p>
                <div className="mt-3 space-y-3">
                  <button type="button" onClick={() => { setEmail("doctor@aarogya.app"); setPassword("Doctor@123"); }} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] p-3 text-left hover:border-[var(--action-primary)] transition-colors">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--action-primary)]">Doctor</p>
                    <p className="mt-1">Email: doctor@aarogya.app</p>
                    <p>Password: Doctor@123</p>
                  </button>
                  <button type="button" onClick={() => { setEmail("nalini.das@aarogya.app"); setPassword("Recept@123"); }} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] p-3 text-left hover:border-[var(--action-primary)] transition-colors">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--action-primary)]">Receptionist</p>
                    <p className="mt-1">Email: nalini.das@aarogya.app</p>
                    <p>Password: Recept@123</p>
                  </button>
                  <button type="button" onClick={() => { setEmail("billing@aarogya.app"); setPassword("Billing@123"); }} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] p-3 text-left hover:border-[var(--action-primary)] transition-colors">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--action-primary)]">Billing Staff</p>
                    <p className="mt-1">Email: billing@aarogya.app</p>
                    <p>Password: Billing@123</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
