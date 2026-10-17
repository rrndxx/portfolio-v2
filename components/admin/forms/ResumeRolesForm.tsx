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
  StringListEditor,
  TextArea,
  TextInput,
} from "@/components/admin/ui";
import { useAdminSave } from "@/lib/admin-save";
import type { ResumeRoleId, ResumeRoleProfile } from "@/lib/types";

const ROLE_IDS: ResumeRoleId[] = [
  "fullstack",
  "frontend",
  "backend",
  "technical-support",
  "software-engineer",
  "web-developer",
];

function RolePills({
  selected,
  onChange,
}: {
  selected: ResumeRoleId[];
  onChange: (next: ResumeRoleId[]) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {ROLE_IDS.map((role) => {
        const on = selected.includes(role);
        return (
          <button
            key={role}
            type="button"
            onClick={() =>
              onChange(
                on ? selected.filter((r) => r !== role) : [...selected, role],
              )
            }
            className={[
              "border px-2 py-1 font-mono text-[11px] uppercase tracking-wide",
              on
                ? "border-accent-electric text-accent-electric"
                : "border-border-subtle text-text-muted hover:text-text-secondary",
            ].join(" ")}
          >
            {role}
          </button>
        );
      })}
    </div>
  );
}

function emptyRole(): ResumeRoleProfile {
  return {
    id: "fullstack",
    label: "New role",
    targetTitle: "",
    relatedRoles: [],
    maxBulletsPerJob: 3,
    maxProjects: { resume: 3, cv: 5 },
    maxAchievements: { resume: 4, cv: 8 },
    skillCategoryOrder: [],
    experienceOrder: [],
    notes: "",
  };
}

export function ResumeRolesForm({
  initial,
}: {
  initial: ResumeRoleProfile[];
}) {
  const [items, setItems] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const { pending, error, status, save, clearMessages } =
    useAdminSave("resume-roles");

  function touch(next: ResumeRoleProfile[]) {
    clearMessages();
    setDirty(true);
    setItems(next);
  }

  return (
    <AdminShell
      resource="resume-roles"
      title="Resume roles"
      description="Role profiles that control titles, limits, and ordering for /api/resume."
    >
      <Panel
        title={`${items.length} roles`}
        actions={
          <GhostButton onClick={() => touch([...items, emptyRole()])}>
            Add role
          </GhostButton>
        }
      >
        <Row>
          {items.map((role, index) => (
            <div key={`${role.id}-${index}`} className="border border-border-subtle p-4">
              <div className="mb-3 flex justify-end">
                <DangerButton
                  onClick={() => touch(items.filter((_, i) => i !== index))}
                >
                  Remove role
                </DangerButton>
              </div>
              <Row>
                <Grid>
                  <Field label="Role ID">
                    <select
                      className="w-full border border-border-subtle bg-bg-void px-3 py-2 font-sans text-body text-text-primary outline-none focus:border-accent-electric"
                      value={role.id}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = {
                          ...role,
                          id: e.target.value as ResumeRoleId,
                        };
                        touch(next);
                      }}
                    >
                      {ROLE_IDS.map((id) => (
                        <option key={id} value={id}>
                          {id}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Label">
                    <TextInput
                      value={role.label}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = { ...role, label: e.target.value };
                        touch(next);
                      }}
                    />
                  </Field>
                  <Field label="Target title">
                    <TextInput
                      value={role.targetTitle}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = { ...role, targetTitle: e.target.value };
                        touch(next);
                      }}
                    />
                  </Field>
                  <Field label="Max bullets / job">
                    <TextInput
                      type="number"
                      value={role.maxBulletsPerJob}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = {
                          ...role,
                          maxBulletsPerJob: Number(e.target.value) || 0,
                        };
                        touch(next);
                      }}
                    />
                  </Field>
                  <Field label="Max projects (resume)">
                    <TextInput
                      type="number"
                      value={role.maxProjects.resume}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = {
                          ...role,
                          maxProjects: {
                            ...role.maxProjects,
                            resume: Number(e.target.value) || 0,
                          },
                        };
                        touch(next);
                      }}
                    />
                  </Field>
                  <Field label="Max projects (CV)">
                    <TextInput
                      type="number"
                      value={role.maxProjects.cv}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = {
                          ...role,
                          maxProjects: {
                            ...role.maxProjects,
                            cv: Number(e.target.value) || 0,
                          },
                        };
                        touch(next);
                      }}
                    />
                  </Field>
                  <Field label="Max achievements (resume)">
                    <TextInput
                      type="number"
                      value={role.maxAchievements.resume}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = {
                          ...role,
                          maxAchievements: {
                            ...role.maxAchievements,
                            resume: Number(e.target.value) || 0,
                          },
                        };
                        touch(next);
                      }}
                    />
                  </Field>
                  <Field label="Max achievements (CV)">
                    <TextInput
                      type="number"
                      value={role.maxAchievements.cv}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = {
                          ...role,
                          maxAchievements: {
                            ...role.maxAchievements,
                            cv: Number(e.target.value) || 0,
                          },
                        };
                        touch(next);
                      }}
                    />
                  </Field>
                </Grid>

                <Field label="Related roles">
                  <RolePills
                    selected={role.relatedRoles}
                    onChange={(relatedRoles) => {
                      const next = [...items];
                      next[index] = { ...role, relatedRoles };
                      touch(next);
                    }}
                  />
                </Field>

                <Field label="Skill category order">
                  <StringListEditor
                    values={role.skillCategoryOrder}
                    onChange={(skillCategoryOrder) => {
                      const next = [...items];
                      next[index] = { ...role, skillCategoryOrder };
                      touch(next);
                    }}
                    addLabel="Add category name"
                  />
                </Field>

                <Field
                  label="Experience job ID order"
                  hint="Job IDs from Resume experience"
                >
                  <StringListEditor
                    values={role.experienceOrder}
                    onChange={(experienceOrder) => {
                      const next = [...items];
                      next[index] = { ...role, experienceOrder };
                      touch(next);
                    }}
                    addLabel="Add job ID"
                  />
                </Field>

                <Field label="Notes">
                  <TextArea
                    value={role.notes ?? ""}
                    onChange={(e) => {
                      const next = [...items];
                      next[index] = { ...role, notes: e.target.value };
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
