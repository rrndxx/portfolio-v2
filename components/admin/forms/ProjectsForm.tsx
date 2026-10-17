"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  Checkbox,
  DangerButton,
  Field,
  GhostButton,
  Grid,
  ImagePathField,
  Panel,
  Row,
  SaveBar,
  StringListEditor,
  TextArea,
  TextInput,
} from "@/components/admin/ui";
import { useAdminSave } from "@/lib/admin-save";
import type {
  CaseStudy,
  CaseStudyOutcome,
  CaseStudySection,
  ProductBrief,
  Project,
} from "@/lib/types";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

function emptyCaseStudy(): CaseStudy {
  return {
    role: "",
    timeline: "",
    summary: "",
    problem: "",
    approach: "",
    highlights: [],
    outcomes: [],
    sections: [],
  };
}

function emptyProductBrief(): ProductBrief {
  return {
    tagline: "",
    pitch: "",
    coreGameplayHook: "",
    platform: "",
    audience: "",
    primaryGoal: "",
    tone: "",
    successCriteria: "",
  };
}

function emptyProject(): Project {
  return {
    slug: `project-${Date.now()}`,
    name: "New project",
    featured: false,
    description: "",
    techStack: [],
    image: "/images/projects/",
    liveUrl: "",
    repoUrl: "",
    layoutVariant: "angled-color-field",
    caseStudy: emptyCaseStudy(),
  };
}

export function ProjectsForm({ initial }: { initial: Project[] }) {
  const [items, setItems] = useState(initial);
  const [openSlug, setOpenSlug] = useState<string | null>(
    initial[0]?.slug ?? null,
  );
  const [dirty, setDirty] = useState(false);
  const { pending, error, status, save, clearMessages } =
    useAdminSave("projects");

  function touch(next: Project[]) {
    clearMessages();
    setDirty(true);
    setItems(next);
  }

  function updateAt(index: number, patch: Partial<Project>) {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    touch(next);
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
      resource="projects"
      title="Projects"
      description="Featured projects (up to 3 with featured on) drive the homepage. All appear on /work. Order here is archive order."
    >
      <Panel
        title={`${items.length} projects · ${items.filter((p) => p.featured).length} featured`}
        actions={
          <GhostButton
            onClick={() => {
              const project = emptyProject();
              touch([...items, project]);
              setOpenSlug(project.slug);
            }}
          >
            Add project
          </GhostButton>
        }
      >
        <Row>
          {items.map((project, index) => {
            const open = openSlug === project.slug;
            const caseStudy = project.caseStudy ?? emptyCaseStudy();
            const productBrief = project.productBrief;

            return (
              <div key={`${project.slug}-${index}`} className="border border-border-subtle">
                <div className="flex flex-wrap items-center gap-2 border-b border-border-subtle bg-bg-panel-raised/40 px-4 py-3">
                  <button
                    type="button"
                    className="mr-auto text-left font-sans font-semibold text-text-primary"
                    onClick={() =>
                      setOpenSlug(open ? null : project.slug)
                    }
                  >
                    {project.name || "(untitled)"}{" "}
                    <span className="font-mono text-meta font-normal text-text-muted">
                      /{project.slug}
                      {project.featured ? " · featured" : ""}
                    </span>
                  </button>
                  <GhostButton onClick={() => move(index, -1)} disabled={index === 0}>
                    Up
                  </GhostButton>
                  <GhostButton
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                  >
                    Down
                  </GhostButton>
                  <GhostButton
                    onClick={() => setOpenSlug(open ? null : project.slug)}
                  >
                    {open ? "Collapse" : "Edit"}
                  </GhostButton>
                  <DangerButton
                    onClick={() => {
                      touch(items.filter((_, i) => i !== index));
                      if (openSlug === project.slug) setOpenSlug(null);
                    }}
                  >
                    Remove
                  </DangerButton>
                </div>

                {open ? (
                  <div className="flex flex-col gap-5 p-4">
                    <Grid>
                      <Field label="Name">
                        <TextInput
                          value={project.name}
                          onChange={(e) => {
                            const name = e.target.value;
                            const slug =
                              project.slug.startsWith("project-")
                                ? slugify(name) || project.slug
                                : project.slug;
                            updateAt(index, { name, slug });
                            setOpenSlug(slug);
                          }}
                        />
                      </Field>
                      <Field label="Slug" hint="URL: /work/[slug]">
                        <TextInput
                          value={project.slug}
                          onChange={(e) => {
                            const slug = e.target.value;
                            updateAt(index, { slug });
                            setOpenSlug(slug);
                          }}
                        />
                      </Field>
                    </Grid>

                    <Checkbox
                      label="Featured on homepage (keep 2–3)"
                      checked={Boolean(project.featured)}
                      onChange={(featured) => updateAt(index, { featured })}
                    />

                    <Field label="One-line description">
                      <TextArea
                        value={project.description}
                        onChange={(e) =>
                          updateAt(index, { description: e.target.value })
                        }
                      />
                    </Field>

                    <ImagePathField
                      label="Cover image"
                      value={project.image}
                      onChange={(image) => updateAt(index, { image })}
                    />

                    <Grid>
                      <Field label="Live URL">
                        <TextInput
                          value={project.liveUrl ?? ""}
                          onChange={(e) =>
                            updateAt(index, { liveUrl: e.target.value })
                          }
                        />
                      </Field>
                      <Field label="Repo URL">
                        <TextInput
                          value={project.repoUrl ?? ""}
                          onChange={(e) =>
                            updateAt(index, { repoUrl: e.target.value })
                          }
                        />
                      </Field>
                    </Grid>

                    <Field label="Tech stack">
                      <StringListEditor
                        values={project.techStack}
                        onChange={(techStack) => updateAt(index, { techStack })}
                        addLabel="Add tech"
                      />
                    </Field>

                    <Panel title="Case study">
                      <Row>
                        <Grid>
                          <Field label="Role">
                            <TextInput
                              value={caseStudy.role}
                              onChange={(e) =>
                                updateAt(index, {
                                  caseStudy: {
                                    ...caseStudy,
                                    role: e.target.value,
                                  },
                                })
                              }
                            />
                          </Field>
                          <Field label="Timeline">
                            <TextInput
                              value={caseStudy.timeline}
                              onChange={(e) =>
                                updateAt(index, {
                                  caseStudy: {
                                    ...caseStudy,
                                    timeline: e.target.value,
                                  },
                                })
                              }
                            />
                          </Field>
                        </Grid>
                        <Field label="Summary">
                          <TextArea
                            value={caseStudy.summary ?? ""}
                            onChange={(e) =>
                              updateAt(index, {
                                caseStudy: {
                                  ...caseStudy,
                                  summary: e.target.value,
                                },
                              })
                            }
                          />
                        </Field>
                        <Field label="Problem">
                          <TextArea
                            value={caseStudy.problem}
                            onChange={(e) =>
                              updateAt(index, {
                                caseStudy: {
                                  ...caseStudy,
                                  problem: e.target.value,
                                },
                              })
                            }
                          />
                        </Field>
                        <Field label="Approach">
                          <TextArea
                            value={caseStudy.approach}
                            onChange={(e) =>
                              updateAt(index, {
                                caseStudy: {
                                  ...caseStudy,
                                  approach: e.target.value,
                                },
                              })
                            }
                          />
                        </Field>
                        <Field label="Highlights">
                          <StringListEditor
                            values={caseStudy.highlights}
                            onChange={(highlights) =>
                              updateAt(index, {
                                caseStudy: { ...caseStudy, highlights },
                              })
                            }
                            addLabel="Add highlight"
                          />
                        </Field>

                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <p className="font-mono text-meta uppercase tracking-[0.12em] text-text-secondary">
                              Outcomes
                            </p>
                            <GhostButton
                              onClick={() => {
                                const outcomes: CaseStudyOutcome[] = [
                                  ...(caseStudy.outcomes ?? []),
                                  { label: "", value: "" },
                                ];
                                updateAt(index, {
                                  caseStudy: { ...caseStudy, outcomes },
                                });
                              }}
                            >
                              Add outcome
                            </GhostButton>
                          </div>
                          <Row>
                            {(caseStudy.outcomes ?? []).map((outcome, oi) => (
                              <div
                                key={oi}
                                className="grid gap-2 md:grid-cols-[1fr_1fr_auto]"
                              >
                                <TextInput
                                  placeholder="Label"
                                  value={outcome.label}
                                  onChange={(e) => {
                                    const outcomes = [
                                      ...(caseStudy.outcomes ?? []),
                                    ];
                                    outcomes[oi] = {
                                      ...outcomes[oi],
                                      label: e.target.value,
                                    };
                                    updateAt(index, {
                                      caseStudy: { ...caseStudy, outcomes },
                                    });
                                  }}
                                />
                                <TextInput
                                  placeholder="Value"
                                  value={outcome.value}
                                  onChange={(e) => {
                                    const outcomes = [
                                      ...(caseStudy.outcomes ?? []),
                                    ];
                                    outcomes[oi] = {
                                      ...outcomes[oi],
                                      value: e.target.value,
                                    };
                                    updateAt(index, {
                                      caseStudy: { ...caseStudy, outcomes },
                                    });
                                  }}
                                />
                                <DangerButton
                                  onClick={() => {
                                    const outcomes = (
                                      caseStudy.outcomes ?? []
                                    ).filter((_, i) => i !== oi);
                                    updateAt(index, {
                                      caseStudy: { ...caseStudy, outcomes },
                                    });
                                  }}
                                >
                                  Remove
                                </DangerButton>
                              </div>
                            ))}
                          </Row>
                        </div>

                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <p className="font-mono text-meta uppercase tracking-[0.12em] text-text-secondary">
                              Extra sections
                            </p>
                            <GhostButton
                              onClick={() => {
                                const sections: CaseStudySection[] = [
                                  ...(caseStudy.sections ?? []),
                                  { heading: "", body: "" },
                                ];
                                updateAt(index, {
                                  caseStudy: { ...caseStudy, sections },
                                });
                              }}
                            >
                              Add section
                            </GhostButton>
                          </div>
                          <Row>
                            {(caseStudy.sections ?? []).map((section, si) => (
                              <div key={si} className="border border-border-subtle p-3">
                                <Field label="Heading">
                                  <TextInput
                                    value={section.heading}
                                    onChange={(e) => {
                                      const sections = [
                                        ...(caseStudy.sections ?? []),
                                      ];
                                      sections[si] = {
                                        ...sections[si],
                                        heading: e.target.value,
                                      };
                                      updateAt(index, {
                                        caseStudy: { ...caseStudy, sections },
                                      });
                                    }}
                                  />
                                </Field>
                                <Field label="Body">
                                  <TextArea
                                    value={section.body}
                                    onChange={(e) => {
                                      const sections = [
                                        ...(caseStudy.sections ?? []),
                                      ];
                                      sections[si] = {
                                        ...sections[si],
                                        body: e.target.value,
                                      };
                                      updateAt(index, {
                                        caseStudy: { ...caseStudy, sections },
                                      });
                                    }}
                                  />
                                </Field>
                                <DangerButton
                                  className="mt-2"
                                  onClick={() => {
                                    const sections = (
                                      caseStudy.sections ?? []
                                    ).filter((_, i) => i !== si);
                                    updateAt(index, {
                                      caseStudy: { ...caseStudy, sections },
                                    });
                                  }}
                                >
                                  Remove section
                                </DangerButton>
                              </div>
                            ))}
                          </Row>
                        </div>
                      </Row>
                    </Panel>

                    <Panel
                      title="Product brief (optional)"
                      description="Used for game / product-forward projects like Bola."
                      actions={
                        productBrief ? (
                          <DangerButton
                            onClick={() =>
                              updateAt(index, { productBrief: undefined })
                            }
                          >
                            Remove brief
                          </DangerButton>
                        ) : (
                          <GhostButton
                            onClick={() =>
                              updateAt(index, {
                                productBrief: emptyProductBrief(),
                              })
                            }
                          >
                            Add brief
                          </GhostButton>
                        )
                      }
                    >
                      {productBrief ? (
                        <Grid>
                          {(
                            [
                              "tagline",
                              "pitch",
                              "coreGameplayHook",
                              "platform",
                              "audience",
                              "primaryGoal",
                              "tone",
                              "successCriteria",
                            ] as const
                          ).map((key) => (
                            <Field key={key} label={key}>
                              <TextArea
                                value={productBrief[key]}
                                onChange={(e) =>
                                  updateAt(index, {
                                    productBrief: {
                                      ...productBrief,
                                      [key]: e.target.value,
                                    },
                                  })
                                }
                              />
                            </Field>
                          ))}
                        </Grid>
                      ) : (
                        <p className="font-sans text-[13px] text-text-muted">
                          No product brief on this project.
                        </p>
                      )}
                    </Panel>
                  </div>
                ) : null}
              </div>
            );
          })}
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
