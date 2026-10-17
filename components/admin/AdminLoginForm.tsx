"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, PrimaryButton, TextInput } from "@/components/admin/ui";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "Login failed.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-sm flex-col gap-5 border border-border-subtle bg-bg-panel p-6"
    >
      <div>
        <p className="font-mono text-meta uppercase tracking-[0.14em] text-text-secondary">
          Admin_
        </p>
        <h1 className="mt-2 font-display text-h3 text-text-primary">
          Content console
        </h1>
        <p className="mt-2 font-sans text-[13px] text-text-muted">
          Edit site copy, projects, gallery, and resume data without touching code.
        </p>
      </div>

      <Field label="Password">
        <TextInput
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          autoFocus
        />
      </Field>

      {error ? (
        <p className="font-mono text-meta text-accent-primary" role="alert">
          {error}
        </p>
      ) : null}

      <PrimaryButton type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </PrimaryButton>
    </form>
  );
}
