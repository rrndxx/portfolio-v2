"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  DangerButton,
  Field,
  GhostButton,
  Grid,
  Panel,
  Row,
  SaveBar,
  TextArea,
  TextInput,
} from "@/components/admin/ui";
import { useAdminSave } from "@/lib/admin-save";
import type { ExperienceEntry } from "@/lib/types";

function emptyEntry(): ExperienceEntry {
  return { date: "", role: "", org: "", description: "" };
}

export function ExperienceForm({ initial }: { initial: ExperienceEntry[] }) {
  const [items, setItems] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const { pending, error, status, save, clearMessages } =
    useAdminSave("experience");

  function touch(next: ExperienceEntry[]) {
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
      resource="experience"
      title="Experience timeline"
      description="Homepage career entries. Order here is the order on the site."
    >
      <Panel
        title={`${items.length} entries`}
        actions={
          <GhostButton onClick={() => touch([...items, emptyEntry()])}>
            Add entry
          </GhostButton>
        }
      >
        <Row>
          {items.map((item, index) => (
            <div key={index} className="border border-border-subtle p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                <GhostButton onClick={() => move(index, -1)} disabled={index === 0}>
                  Up
                </GhostButton>
                <GhostButton
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                >
                  Down
                </GhostButton>
                <DangerButton
                  onClick={() => touch(items.filter((_, i) => i !== index))}
                >
                  Remove
                </DangerButton>
              </div>
              <Row>
                <Grid>
                  <Field label="Date range">
                    <TextInput
                      value={item.date}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = { ...item, date: e.target.value };
                        touch(next);
                      }}
                    />
                  </Field>
                  <Field label="Organization">
                    <TextInput
                      value={item.org}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = { ...item, org: e.target.value };
                        touch(next);
                      }}
                    />
                  </Field>
                </Grid>
                <Field label="Role / title">
                  <TextInput
                    value={item.role}
                    onChange={(e) => {
                      const next = [...items];
                      next[index] = { ...item, role: e.target.value };
                      touch(next);
                    }}
                  />
                </Field>
                <Field label="Description">
                  <TextArea
                    value={item.description}
                    onChange={(e) => {
                      const next = [...items];
                      next[index] = { ...item, description: e.target.value };
                      touch(next);
                    }}
                  />
                </Field>
              </Row>
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
