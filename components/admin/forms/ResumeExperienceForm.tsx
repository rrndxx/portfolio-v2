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
  TextInput,
  TextArea,
} from "@/components/admin/ui";
import { useAdminSave } from "@/lib/admin-save";
import type {
  ResumeExperienceBullet,
  ResumeExperienceJob,
  ResumeRoleId,
} from "@/lib/types";

const ROLE_OPTIONS: ResumeRoleId[] = [
  "fullstack",
  "frontend",
  "backend",
  "technical-support",
  "software-engineer",
  "web-developer",
];

function emptyBullet(): ResumeExperienceBullet {
  return {
    id: `bullet-${Date.now()}`,
    text: "",
    roles: [],
    weight: 50,
  };
}

function emptyJob(): ResumeExperienceJob {
  return {
    id: `job-${Date.now()}`,
    title: "",
    organization: "",
    location: "",
    start: "",
    end: "",
    sortKey: "",
    bullets: [emptyBullet()],
  };
}

function RolePills({
  selected,
  onChange,
}: {
  selected: ResumeRoleId[];
  onChange: (next: ResumeRoleId[]) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {ROLE_OPTIONS.map((role) => {
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

export function ResumeExperienceForm({
  initial,
}: {
  initial: ResumeExperienceJob[];
}) {
  const [items, setItems] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const { pending, error, status, save, clearMessages } =
    useAdminSave("resume-experience");

  function touch(next: ResumeExperienceJob[]) {
    clearMessages();
    setDirty(true);
    setItems(next);
  }

  return (
    <AdminShell
      resource="resume-experience"
      title="Resume experience"
      description="Jobs and role-weighted bullets for the external resume builder API."
    >
      <Panel
        title={`${items.length} jobs`}
        actions={
          <GhostButton onClick={() => touch([...items, emptyJob()])}>
            Add job
          </GhostButton>
        }
      >
        <Row>
          {items.map((job, index) => (
            <div key={`${job.id}-${index}`} className="border border-border-subtle p-4">
              <div className="mb-3 flex justify-end">
                <DangerButton
                  onClick={() => touch(items.filter((_, i) => i !== index))}
                >
                  Remove job
                </DangerButton>
              </div>
              <Row>
                <Grid>
                  <Field label="ID">
                    <TextInput
                      value={job.id}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = { ...job, id: e.target.value };
                        touch(next);
                      }}
                    />
                  </Field>
                  <Field label="Sort key" hint="e.g. 2026-07">
                    <TextInput
                      value={job.sortKey}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = { ...job, sortKey: e.target.value };
                        touch(next);
                      }}
                    />
                  </Field>
                  <Field label="Title">
                    <TextInput
                      value={job.title}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = { ...job, title: e.target.value };
                        touch(next);
                      }}
                    />
                  </Field>
                  <Field label="Organization">
                    <TextInput
                      value={job.organization}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = { ...job, organization: e.target.value };
                        touch(next);
                      }}
                    />
                  </Field>
                  <Field label="Location">
                    <TextInput
                      value={job.location ?? ""}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = { ...job, location: e.target.value };
                        touch(next);
                      }}
                    />
                  </Field>
                  <Field label="Start">
                    <TextInput
                      value={job.start}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = { ...job, start: e.target.value };
                        touch(next);
                      }}
                    />
                  </Field>
                  <Field label="End">
                    <TextInput
                      value={job.end}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = { ...job, end: e.target.value };
                        touch(next);
                      }}
                    />
                  </Field>
                </Grid>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-mono text-meta uppercase tracking-[0.12em] text-text-secondary">
                      Bullets
                    </p>
                    <GhostButton
                      onClick={() => {
                        const next = [...items];
                        next[index] = {
                          ...job,
                          bullets: [...job.bullets, emptyBullet()],
                        };
                        touch(next);
                      }}
                    >
                      Add bullet
                    </GhostButton>
                  </div>
                  <Row>
                    {job.bullets.map((bullet, bi) => (
                      <div key={bullet.id} className="border border-border-subtle p-3">
                        <Field label="Text">
                          <TextArea
                            value={bullet.text}
                            onChange={(e) => {
                              const bullets = [...job.bullets];
                              bullets[bi] = {
                                ...bullets[bi],
                                text: e.target.value,
                              };
                              const next = [...items];
                              next[index] = { ...job, bullets };
                              touch(next);
                            }}
                          />
                        </Field>
                        <Grid>
                          <Field label="Weight">
                            <TextInput
                              type="number"
                              value={bullet.weight}
                              onChange={(e) => {
                                const bullets = [...job.bullets];
                                bullets[bi] = {
                                  ...bullets[bi],
                                  weight: Number(e.target.value) || 0,
                                };
                                const next = [...items];
                                next[index] = { ...job, bullets };
                                touch(next);
                              }}
                            />
                          </Field>
                          <Field label="Bullet ID">
                            <TextInput
                              value={bullet.id}
                              onChange={(e) => {
                                const bullets = [...job.bullets];
                                bullets[bi] = {
                                  ...bullets[bi],
                                  id: e.target.value,
                                };
                                const next = [...items];
                                next[index] = { ...job, bullets };
                                touch(next);
                              }}
                            />
                          </Field>
                        </Grid>
                        <Field label="Roles (empty = all)">
                          <RolePills
                            selected={bullet.roles}
                            onChange={(roles) => {
                              const bullets = [...job.bullets];
                              bullets[bi] = { ...bullets[bi], roles };
                              const next = [...items];
                              next[index] = { ...job, bullets };
                              touch(next);
                            }}
                          />
                        </Field>
                        <DangerButton
                          className="mt-2"
                          onClick={() => {
                            const next = [...items];
                            next[index] = {
                              ...job,
                              bullets: job.bullets.filter((_, i) => i !== bi),
                            };
                            touch(next);
                          }}
                        >
                          Remove bullet
                        </DangerButton>
                      </div>
                    ))}
                  </Row>
                </div>
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
