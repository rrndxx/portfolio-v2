"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  DangerButton,
  Field,
  GhostButton,
  Panel,
  Row,
  SaveBar,
  StringListEditor,
  TextArea,
  TextInput,
} from "@/components/admin/ui";
import { useAdminSave } from "@/lib/admin-save";
import type { SkillsContent } from "@/lib/types";

export function SkillsForm({ initial }: { initial: SkillsContent }) {
  const [data, setData] = useState<SkillsContent>({
    ...initial,
    coreStack: initial.coreStack ?? [],
  });
  const [dirty, setDirty] = useState(false);
  const { pending, error, status, save, clearMessages } = useAdminSave("skills");

  function touch(next: SkillsContent) {
    clearMessages();
    setDirty(true);
    setData(next);
  }

  return (
    <AdminShell
      resource="skills"
      title="Skills"
      description="Intro, core stack strip, and category clusters on the homepage."
    >
      <Row>
        <Panel title="Intro">
          <Field label="Section intro">
            <TextArea
              value={data.intro ?? ""}
              onChange={(e) => touch({ ...data, intro: e.target.value })}
            />
          </Field>
        </Panel>

        <Panel title="Core stack" description="High-signal tools above the category panels.">
          <StringListEditor
            values={data.coreStack ?? []}
            onChange={(coreStack) => touch({ ...data, coreStack })}
            addLabel="Add tool"
          />
        </Panel>

        <Panel
          title="Categories"
          actions={
            <GhostButton
              onClick={() =>
                touch({
                  ...data,
                  categories: [
                    ...data.categories,
                    { name: "New category", skills: [] },
                  ],
                })
              }
            >
              Add category
            </GhostButton>
          }
        >
          <Row>
            {data.categories.map((category, index) => (
              <div key={index} className="border border-border-subtle p-4">
                <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                  <Field label="Category name">
                    <TextInput
                      value={category.name}
                      onChange={(e) => {
                        const categories = [...data.categories];
                        categories[index] = {
                          ...categories[index],
                          name: e.target.value,
                        };
                        touch({ ...data, categories });
                      }}
                    />
                  </Field>
                  <DangerButton
                    onClick={() =>
                      touch({
                        ...data,
                        categories: data.categories.filter((_, i) => i !== index),
                      })
                    }
                  >
                    Remove category
                  </DangerButton>
                </div>
                <Field label="Skills">
                  <StringListEditor
                    values={category.skills}
                    onChange={(skills) => {
                      const categories = [...data.categories];
                      categories[index] = { ...categories[index], skills };
                      touch({ ...data, categories });
                    }}
                    addLabel="Add skill"
                  />
                </Field>
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
