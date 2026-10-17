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
import type {
  ResumeProfile,
  ResumeRoleId,
} from "@/lib/types";

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

export function ResumeProfileForm({ initial }: { initial: ResumeProfile }) {
  const [data, setData] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const { pending, error, status, save, clearMessages } =
    useAdminSave("resume-profile");

  function touch(next: ResumeProfile) {
    clearMessages();
    setDirty(true);
    setData(next);
  }

  return (
    <AdminShell
      resource="resume-profile"
      title="Resume profile"
      description="Contact, summaries, education, skills, and which projects/achievements map to each role."
    >
      <Row>
        <Panel title="Contact">
          <Grid>
            <Field label="Name">
              <TextInput
                value={data.contact.name}
                onChange={(e) =>
                  touch({
                    ...data,
                    contact: { ...data.contact, name: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Email">
              <TextInput
                value={data.contact.email}
                onChange={(e) =>
                  touch({
                    ...data,
                    contact: { ...data.contact, email: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Phone">
              <TextInput
                value={data.contact.phone ?? ""}
                onChange={(e) =>
                  touch({
                    ...data,
                    contact: { ...data.contact, phone: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Location">
              <TextInput
                value={data.contact.location}
                onChange={(e) =>
                  touch({
                    ...data,
                    contact: { ...data.contact, location: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Default target title">
              <TextInput
                value={data.targetTitleDefault}
                onChange={(e) =>
                  touch({ ...data, targetTitleDefault: e.target.value })
                }
              />
            </Field>
          </Grid>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-mono text-meta uppercase tracking-[0.12em] text-text-secondary">
                Links
              </p>
              <GhostButton
                onClick={() =>
                  touch({
                    ...data,
                    contact: {
                      ...data.contact,
                      links: [
                        ...data.contact.links,
                        { label: "", url: "" },
                      ],
                    },
                  })
                }
              >
                Add link
              </GhostButton>
            </div>
            <Row>
              {data.contact.links.map((link, index) => (
                <div
                  key={index}
                  className="grid gap-2 md:grid-cols-[1fr_1fr_auto]"
                >
                  <TextInput
                    placeholder="Label"
                    value={link.label}
                    onChange={(e) => {
                      const links = [...data.contact.links];
                      links[index] = { ...links[index], label: e.target.value };
                      touch({
                        ...data,
                        contact: { ...data.contact, links },
                      });
                    }}
                  />
                  <TextInput
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) => {
                      const links = [...data.contact.links];
                      links[index] = { ...links[index], url: e.target.value };
                      touch({
                        ...data,
                        contact: { ...data.contact, links },
                      });
                    }}
                  />
                  <DangerButton
                    onClick={() =>
                      touch({
                        ...data,
                        contact: {
                          ...data.contact,
                          links: data.contact.links.filter((_, i) => i !== index),
                        },
                      })
                    }
                  >
                    Remove
                  </DangerButton>
                </div>
              ))}
            </Row>
          </div>
        </Panel>

        <Panel title="Summaries by role">
          <Row>
            <Field label="Default summary">
              <TextArea
                value={data.summaries.default}
                onChange={(e) =>
                  touch({
                    ...data,
                    summaries: { ...data.summaries, default: e.target.value },
                  })
                }
              />
            </Field>
            {ROLE_IDS.map((role) => (
              <Field key={role} label={`${role} summary`}>
                <TextArea
                  value={data.summaries[role] ?? ""}
                  onChange={(e) =>
                    touch({
                      ...data,
                      summaries: {
                        ...data.summaries,
                        [role]: e.target.value,
                      },
                    })
                  }
                />
              </Field>
            ))}
          </Row>
        </Panel>

        <Panel
          title="Education"
          actions={
            <GhostButton
              onClick={() =>
                touch({
                  ...data,
                  education: [
                    ...data.education,
                    {
                      id: `edu-${Date.now()}`,
                      school: "",
                      degree: "",
                      honors: "",
                      start: "",
                      end: "",
                      location: "",
                    },
                  ],
                })
              }
            >
              Add school
            </GhostButton>
          }
        >
          <Row>
            {data.education.map((edu, index) => (
              <div key={edu.id} className="border border-border-subtle p-3">
                <Grid>
                  {(
                    [
                      ["id", "ID"],
                      ["school", "School"],
                      ["degree", "Degree"],
                      ["honors", "Honors"],
                      ["start", "Start"],
                      ["end", "End"],
                      ["location", "Location"],
                    ] as const
                  ).map(([key, label]) => (
                    <Field key={key} label={label}>
                      <TextInput
                        value={edu[key] ?? ""}
                        onChange={(e) => {
                          const education = [...data.education];
                          education[index] = {
                            ...education[index],
                            [key]: e.target.value,
                          };
                          touch({ ...data, education });
                        }}
                      />
                    </Field>
                  ))}
                </Grid>
                <DangerButton
                  className="mt-2"
                  onClick={() =>
                    touch({
                      ...data,
                      education: data.education.filter((_, i) => i !== index),
                    })
                  }
                >
                  Remove
                </DangerButton>
              </div>
            ))}
          </Row>
        </Panel>

        <Panel
          title="Skill groups"
          actions={
            <GhostButton
              onClick={() =>
                touch({
                  ...data,
                  skillGroups: [
                    ...data.skillGroups,
                    { name: "New group", skills: [] },
                  ],
                })
              }
            >
              Add group
            </GhostButton>
          }
        >
          <Row>
            {data.skillGroups.map((group, index) => (
              <div key={index} className="border border-border-subtle p-3">
                <div className="mb-2 flex items-end justify-between gap-2">
                  <Field label="Group name">
                    <TextInput
                      value={group.name}
                      onChange={(e) => {
                        const skillGroups = [...data.skillGroups];
                        skillGroups[index] = {
                          ...skillGroups[index],
                          name: e.target.value,
                        };
                        touch({ ...data, skillGroups });
                      }}
                    />
                  </Field>
                  <DangerButton
                    onClick={() =>
                      touch({
                        ...data,
                        skillGroups: data.skillGroups.filter(
                          (_, i) => i !== index,
                        ),
                      })
                    }
                  >
                    Remove
                  </DangerButton>
                </div>
                <StringListEditor
                  values={group.skills}
                  onChange={(skills) => {
                    const skillGroups = [...data.skillGroups];
                    skillGroups[index] = { ...skillGroups[index], skills };
                    touch({ ...data, skillGroups });
                  }}
                  addLabel="Add skill"
                />
              </div>
            ))}
          </Row>
        </Panel>

        <Panel
          title="Project refs"
          description="Which portfolio projects appear on which resume roles."
          actions={
            <GhostButton
              onClick={() =>
                touch({
                  ...data,
                  projects: [
                    ...data.projects,
                    { slug: "", blurb: "", roles: [], weight: 50 },
                  ],
                })
              }
            >
              Add project ref
            </GhostButton>
          }
        >
          <Row>
            {data.projects.map((ref, index) => (
              <div key={index} className="border border-border-subtle p-3">
                <Grid>
                  <Field label="Project slug">
                    <TextInput
                      value={ref.slug}
                      onChange={(e) => {
                        const projects = [...data.projects];
                        projects[index] = {
                          ...projects[index],
                          slug: e.target.value,
                        };
                        touch({ ...data, projects });
                      }}
                    />
                  </Field>
                  <Field label="Weight">
                    <TextInput
                      type="number"
                      value={ref.weight}
                      onChange={(e) => {
                        const projects = [...data.projects];
                        projects[index] = {
                          ...projects[index],
                          weight: Number(e.target.value) || 0,
                        };
                        touch({ ...data, projects });
                      }}
                    />
                  </Field>
                </Grid>
                <Field label="ATS blurb">
                  <TextArea
                    value={ref.blurb ?? ""}
                    onChange={(e) => {
                      const projects = [...data.projects];
                      projects[index] = {
                        ...projects[index],
                        blurb: e.target.value,
                      };
                      touch({ ...data, projects });
                    }}
                  />
                </Field>
                <Field label="Roles">
                  <RolePills
                    selected={ref.roles}
                    onChange={(roles) => {
                      const projects = [...data.projects];
                      projects[index] = { ...projects[index], roles };
                      touch({ ...data, projects });
                    }}
                  />
                </Field>
                <DangerButton
                  className="mt-2"
                  onClick={() =>
                    touch({
                      ...data,
                      projects: data.projects.filter((_, i) => i !== index),
                    })
                  }
                >
                  Remove
                </DangerButton>
              </div>
            ))}
          </Row>
        </Panel>

        <Panel
          title="Achievement refs"
          actions={
            <GhostButton
              onClick={() =>
                touch({
                  ...data,
                  achievements: [
                    ...data.achievements,
                    { id: "", roles: [], weight: 50 },
                  ],
                })
              }
            >
              Add achievement ref
            </GhostButton>
          }
        >
          <Row>
            {data.achievements.map((ref, index) => (
              <div key={index} className="border border-border-subtle p-3">
                <Grid>
                  <Field label="Achievement ID">
                    <TextInput
                      value={ref.id}
                      onChange={(e) => {
                        const achievements = [...data.achievements];
                        achievements[index] = {
                          ...achievements[index],
                          id: e.target.value,
                        };
                        touch({ ...data, achievements });
                      }}
                    />
                  </Field>
                  <Field label="Weight">
                    <TextInput
                      type="number"
                      value={ref.weight}
                      onChange={(e) => {
                        const achievements = [...data.achievements];
                        achievements[index] = {
                          ...achievements[index],
                          weight: Number(e.target.value) || 0,
                        };
                        touch({ ...data, achievements });
                      }}
                    />
                  </Field>
                </Grid>
                <Field label="Roles">
                  <RolePills
                    selected={ref.roles}
                    onChange={(roles) => {
                      const achievements = [...data.achievements];
                      achievements[index] = {
                        ...achievements[index],
                        roles,
                      };
                      touch({ ...data, achievements });
                    }}
                  />
                </Field>
                <DangerButton
                  className="mt-2"
                  onClick={() =>
                    touch({
                      ...data,
                      achievements: data.achievements.filter(
                        (_, i) => i !== index,
                      ),
                    })
                  }
                >
                  Remove
                </DangerButton>
              </div>
            ))}
          </Row>
        </Panel>
      </Row>

      <SaveBar
        pending={pending}
        error={error}
        status={status}
        dirty={dirty}
        onSave={async () => {
          const ok = await save(data);
          if (ok) setDirty(false);
        }}
      />
    </AdminShell>
  );
}
