"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { FormEvent, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const result = register({ name: name.trim(), email: email.trim(), password });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setError("");
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-[var(--surface-page)]">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] shadow-sm lg:grid-cols-5">
          <div className="hidden border-r border-[var(--border-default)] bg-[var(--surface-sunken)] p-10 lg:col-span-2 lg:block">
            <h1 className="text-3xl font-semibold text-[var(--text-primary)]">Create your account</h1>
            <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
              This is a static workflow setup for UI testing with local seed data. You can register a new user instantly.
            </p>
          </div>

          <div className="p-6 sm:p-8 md:p-10 lg:col-span-3">
            <div className="mx-auto w-full max-w-md">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Register</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">Set up your profile to access the prototype.</p>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]" htmlFor="name">
                    Full name
                  </label>
                  <input
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="h-11 w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 text-sm text-[var(--text-primary)] outline-none"
                    placeholder="Dr. Priya Nair"
                    required
                  />
                </div>

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
                    placeholder="you@aarogya.app"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-11 w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 text-sm text-[var(--text-primary)] outline-none"
                    placeholder="Minimum 8 characters"
                    minLength={8}
                    required
                  />
                </div>

                {error ? (
                  <p className="rounded-lg bg-[var(--critical-bg)] px-3 py-2 text-sm text-[var(--critical-fg)]">{error}</p>
                ) : null}

                <button
                  type="submit"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--action-primary)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--action-primary-hover)]"
                >
                  <UserPlus size={18} />
                  Create account
                </button>
              </form>

              <p className="mt-6 text-sm text-[var(--text-secondary)]">
                Already have an account?{" "}
                <Link className="font-medium text-[var(--text-link)] hover:underline" href="/login">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
