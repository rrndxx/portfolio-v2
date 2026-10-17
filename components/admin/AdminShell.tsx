"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { adminLogout } from "@/lib/admin-save";
import {
  ADMIN_RESOURCE_LABELS,
  ADMIN_RESOURCES,
  type AdminResource,
} from "@/lib/admin-resources";

const GROUPS: { title: string; items: AdminResource[] }[] = [
  {
    title: "Site",
    items: ["site-config", "about", "skills"],
  },
  {
    title: "Work",
    items: ["projects", "experience", "achievements", "gallery"],
  },
  {
    title: "Resume API",
    items: ["resume-profile", "resume-experience", "resume-roles"],
  },
];

export function AdminShell({
  resource,
  title,
  description,
  children,
}: {
  resource: AdminResource;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function onLogout() {
    await adminLogout();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-dvh bg-bg-void text-text-primary">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-8 lg:flex-row lg:gap-10">
        <aside className="shrink-0 lg:w-56">
          <div className="mb-6">
            <p className="font-mono text-meta uppercase tracking-[0.14em] text-text-secondary">
              Admin_
            </p>
            <h1 className="mt-1 font-display text-h3 text-text-primary">
              Content
            </h1>
          </div>

          <nav aria-label="Content sections" className="flex flex-col gap-5">
            {GROUPS.map((group) => (
              <div key={group.title}>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  {group.title}
                </p>
                <ul className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    const href = `/admin/${item}`;
                    const active =
                      resource === item || pathname === href;
                    return (
                      <li key={item}>
                        <Link
                          href={href}
                          className={[
                            "block border px-3 py-2 font-sans text-[13px] transition",
                            active
                              ? "border-accent-electric bg-bg-panel-raised text-accent-electric"
                              : "border-transparent text-text-secondary hover:border-border-subtle hover:bg-bg-panel hover:text-text-primary",
                          ].join(" ")}
                        >
                          {ADMIN_RESOURCE_LABELS[item]}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-2">
            <Link
              href="/"
              className="border border-border-subtle px-3 py-2 text-center font-mono text-meta uppercase tracking-[0.12em] text-text-secondary hover:border-accent-electric hover:text-accent-electric"
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
        </aside>

        <main className="min-w-0 flex-1">
          <header className="mb-6 border-b border-border-subtle pb-4">
            <h2 className="font-display text-h2 text-text-primary">{title}</h2>
            {description ? (
              <p className="mt-2 max-w-2xl font-sans text-body text-text-secondary">
                {description}
              </p>
            ) : null}
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}

export function resourceTitle(resource: AdminResource): string {
  return ADMIN_RESOURCE_LABELS[resource];
}
