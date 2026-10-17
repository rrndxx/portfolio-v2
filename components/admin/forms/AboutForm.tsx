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
import type { AboutContent, AboutHighlight } from "@/lib/types";

export function AboutForm({ initial }: { initial: AboutContent }) {
  const [data, setData] = useState<AboutContent>({
    ...initial,
    highlights: initial.highlights ?? [],
  });
  const [dirty, setDirty] = useState(false);
  const { pending, error, status, save, clearMessages } = useAdminSave("about");

  function touch(next: AboutContent) {
    clearMessages();
    setDirty(true);
    setData(next);
  }

  return (
    <AdminShell
      resource="about"
      title="About"
      description="Bio, pull quote, credentials, and proof highlights under the hero."
    >
      <Row>
        <Panel title="Copy">
          <Row>
            <Field label="Pull quote">
              <TextArea
                value={data.pullQuote}
                onChange={(e) => touch({ ...data, pullQuote: e.target.value })}
              />
            </Field>
            <Field label="Paragraph">
              <TextArea
                className="min-h-[10rem]"
                value={data.paragraph}
                onChange={(e) => touch({ ...data, paragraph: e.target.value })}
              />
            </Field>
          </Row>
        </Panel>

        <Panel title="Credentials" description="Loose tags near the bottom of About.">
          <StringListEditor
            values={data.credentials}
            onChange={(credentials) => touch({ ...data, credentials })}
            addLabel="Add credential"
          />
        </Panel>

        <Panel
          title="Highlights"
          description="Quick-scan proof points (honors, eligibility, stack)."
          actions={
            <GhostButton
              onClick={() =>
                touch({
                  ...data,
                  highlights: [
                    ...(data.highlights ?? []),
                    { label: "", value: "" },
                  ],
                })
              }
            >
              Add highlight
            </GhostButton>
          }
        >
          <Row>
            {(data.highlights ?? []).map((item, index) => (
              <div
                key={index}
                className="grid gap-3 border border-border-subtle p-3 md:grid-cols-[1fr_1fr_auto]"
              >
                <Field label="Label">
                  <TextInput
                    value={item.label}
                    onChange={(e) => {
                      const highlights = [...(data.highlights ?? [])];
                      highlights[index] = {
                        ...highlights[index],
                        label: e.target.value,
                      };
                      touch({ ...data, highlights });
                    }}
                  />
                </Field>
                <Field label="Value">
                  <TextInput
                    value={item.value}
                    onChange={(e) => {
                      const highlights = [...(data.highlights ?? [])] as AboutHighlight[];
                      highlights[index] = {
                        ...highlights[index],
                        value: e.target.value,
                      };
                      touch({ ...data, highlights });
                    }}
                  />
                </Field>
                <div className="flex items-end">
                  <DangerButton
                    onClick={() =>
                      touch({
                        ...data,
                        highlights: (data.highlights ?? []).filter(
                          (_, i) => i !== index,
                        ),
                      })
                    }
                  >
                    Remove
                  </DangerButton>
                </div>
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
