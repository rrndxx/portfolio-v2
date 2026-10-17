"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ADMIN_RESOURCE_LABELS,
  ADMIN_RESOURCES,
  type AdminResource,
} from "@/lib/admin-resources";

interface AdminEditorProps {
  resource: AdminResource;
  initialData: unknown;
}

export function AdminEditor({ resource, initialData }: AdminEditorProps) {
  const router = useRouter();
  const [text, setText] = useState(() => JSON.stringify(initialData, null, 2));
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const label = ADMIN_RESOURCE_LABELS[resource];

  const parseError = useMemo(() => {
    try {
      JSON.parse(text);
      return null;
    } catch (err) {
      return err instanceof Error ? err.message : "Invalid JSON";
    }
  }, [text]);

  async function onSave() {
    setPending(true);
    setError(null);
    setStatus(null);

    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setPending(false);
      return;
    }

    try {
      const response = await fetch(`/api/admin/content/${resource}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "Save failed.");
        return;
      }
      setStatus("Saved. Public pages will pick this up on next request.");
      setText(JSON.stringify(data, null, 2));
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setPending(false);
    }
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <p className="font-mono text-meta uppercase tracking-[0.14em] text-text-secondary">
            Admin_
          </p>
          <h1 className="mt-1 font-display text-h2 text-text-primary">
            Content console
          </h1>
          <p className="mt-2 max-w-xl font-sans text-body text-text-secondary">
            Edit JSON for each section. Image fields stay as public paths (e.g.{" "}
            <code className="text-accent-electric">/images/…</code>). Seed
            source files under <code className="text-accent-electric">/data</code>{" "}
            are backups only.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/"
            className="border border-border-subtle px-3 py-2 font-mono text-meta uppercase tracking-[0.12em] text-text-secondary hover:border-accent-electric hover:text-accent-electric"
          >
            View site
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="border border-border-subtle px-3 py-2 font-mono text-meta uppercase tracking-[0.12em] text-text-secondary hover:border-accent-primary hover:text-accent-primary"
          >
            Log out
          </button>
        </div>
      </header>

      <nav
        aria-label="Content sections"
        className="flex flex-wrap gap-2"
      >
        {ADMIN_RESOURCES.map((item) => {
          const active = item === resource;
          return (
            <Link
              key={item}
              href={`/admin/${item}`}
              className={[
                "border px-3 py-1.5 font-mono text-meta uppercase tracking-[0.1em]",
                active
                  ? "border-accent-electric bg-bg-panel-raised text-accent-electric"
                  : "border-border-subtle text-text-secondary hover:border-accent-electric/60 hover:text-text-primary",
              ].join(" ")}
            >
              {ADMIN_RESOURCE_LABELS[item]}
            </Link>
          );
        })}
      </nav>

      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-sans text-h3 text-text-primary">{label}</h2>
          <button
            type="button"
            onClick={onSave}
            disabled={pending || Boolean(parseError)}
            className="bg-accent-primary px-4 py-2 font-sans text-body font-semibold text-text-primary transition hover:bg-accent-electric disabled:opacity-50"
          >
            {pending ? "Saving…" : "Save changes"}
          </button>
        </div>

        {parseError ? (
          <p className="font-mono text-meta text-accent-primary" role="alert">
            JSON error: {parseError}
          </p>
        ) : null}
        {error ? (
          <p className="font-mono text-meta text-accent-primary" role="alert">
            {error}
          </p>
        ) : null}
        {status ? (
          <p className="font-mono text-meta text-accent-electric">{status}</p>
        ) : null}

        <textarea
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setStatus(null);
            setError(null);
          }}
          spellCheck={false}
          className="min-h-[70vh] w-full resize-y border border-border-subtle bg-bg-panel p-4 font-mono text-[13px] leading-relaxed text-text-primary outline-none focus:border-accent-electric"
          aria-label={`${label} JSON`}
        />
      </section>
    </div>
  );
}
