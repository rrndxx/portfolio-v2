"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  Checkbox,
  DangerButton,
  Field,
  GhostButton,
  Grid,
  Panel,
  Row,
  SaveBar,
  TextInput,
} from "@/components/admin/ui";
import { useAdminSave } from "@/lib/admin-save";
import type { Achievement } from "@/lib/types";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function emptyItem(): Achievement {
  return {
    id: `achievement-${Date.now()}`,
    title: "",
    year: "",
    category: "",
    organization: "",
    featured: false,
  };
}

export function AchievementsForm({ initial }: { initial: Achievement[] }) {
  const [items, setItems] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const { pending, error, status, save, clearMessages } =
    useAdminSave("achievements");

  function touch(next: Achievement[]) {
    clearMessages();
    setDirty(true);
    setItems(next);
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const tmp = next[index];
    next[index] = next[target];
    next[target] = tmp;
    touch(next);
  }

  return (
    <AdminShell
      resource="achievements"
      title="Achievements"
      description="Wins list. Featured items surface first on the homepage."
    >
      <Panel
        title={`${items.length} achievements`}
        actions={
          <GhostButton onClick={() => touch([...items, emptyItem()])}>
            Add achievement
          </GhostButton>
        }
      >
        <Row>
          {items.map((item, index) => (
            <div key={`${item.id}-${index}`} className="border border-border-subtle p-4">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <GhostButton onClick={() => move(index, -1)} disabled={index === 0}>
                  Up
                </GhostButton>
                <GhostButton
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                >
                  Down
                </GhostButton>
                <Checkbox
                  label="Featured"
                  checked={Boolean(item.featured)}
                  onChange={(featured) => {
                    const next = [...items];
                    next[index] = { ...item, featured };
                    touch(next);
                  }}
                />
                <DangerButton
                  onClick={() => touch(items.filter((_, i) => i !== index))}
                >
                  Remove
                </DangerButton>
              </div>
              <Grid>
                <Field label="Title">
                  <TextInput
                    value={item.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const next = [...items];
                      const id =
                        item.id.startsWith("achievement-") || !item.id
                          ? slugify(title) || item.id
                          : item.id;
                      next[index] = { ...item, title, id };
                      touch(next);
                    }}
                  />
                </Field>
                <Field label="ID" hint="Stable key used by resume API">
                  <TextInput
                    value={item.id}
                    onChange={(e) => {
                      const next = [...items];
                      next[index] = { ...item, id: e.target.value };
                      touch(next);
                    }}
                  />
                </Field>
                <Field label="Year">
                  <TextInput
                    value={item.year}
                    onChange={(e) => {
                      const next = [...items];
                      next[index] = { ...item, year: e.target.value };
                      touch(next);
                    }}
                  />
                </Field>
                <Field label="Category">
                  <TextInput
                    value={item.category ?? ""}
                    onChange={(e) => {
                      const next = [...items];
                      next[index] = { ...item, category: e.target.value };
                      touch(next);
                    }}
                  />
                </Field>
                <Field label="Organization">
                  <TextInput
                    value={item.organization ?? ""}
                    onChange={(e) => {
                      const next = [...items];
                      next[index] = { ...item, organization: e.target.value };
                      touch(next);
                    }}
                  />
                </Field>
              </Grid>
            </div>
          ))}
        </Row>
      </Panel>

      <SaveBar
        pending={pending}
        error={error}
        status={status}
        dirty={dirty}
        onSave={async () => {
          const ok = await save(items);
          if (ok) setDirty(false);
        }}
      />
    </AdminShell>
  );
}
