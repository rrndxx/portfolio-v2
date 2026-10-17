"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import type { AdminResource } from "@/lib/admin-resources";

export function useAdminSave(resource: AdminResource) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const clearMessages = useCallback(() => {
    setError(null);
    setStatus(null);
  }, []);

  const save = useCallback(
    async (data: unknown) => {
      setPending(true);
      setError(null);
      setStatus(null);
      try {
        const response = await fetch(`/api/admin/content/${resource}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        });
        const payload = (await response.json()) as { error?: string };
        if (!response.ok) {
          setError(payload.error ?? "Save failed.");
          return false;
        }
        setStatus("Saved. Live site will show this on the next load.");
        router.refresh();
        return true;
      } catch {
        setError("Network error. Try again.");
        return false;
      } finally {
        setPending(false);
      }
    },
    [resource, router],
  );

  return { pending, error, status, save, clearMessages, setError, setStatus };
}

export async function adminLogout(): Promise<void> {
  await fetch("/api/admin/logout", { method: "POST" });
}
