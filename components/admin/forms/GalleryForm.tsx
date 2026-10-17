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
  Select,
  TextInput,
} from "@/components/admin/ui";
import { useAdminSave } from "@/lib/admin-save";
import type { GalleryAspect, GalleryItem, GalleryItemType } from "@/lib/types";

function emptyItem(): GalleryItem {
  return {
    id: `gallery-${Date.now()}`,
    type: "milestone",
    image: "/images/gallery/",
    caption: "",
    aspect: "landscape",
    featured: false,
  };
}

export function GalleryForm({ initial }: { initial: GalleryItem[] }) {
  const [items, setItems] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const { pending, error, status, save, clearMessages } = useAdminSave("gallery");

  function touch(next: GalleryItem[]) {
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
      resource="gallery"
      title="Gallery"
      description="Visual archive tiles. Featured items appear in the homepage preview. Put files in /public/images/gallery then paste the path."
    >
      <Panel
        title={`${items.length} items`}
        actions={
          <GhostButton onClick={() => touch([...items, emptyItem()])}>
            Add item
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
                  label="Featured on homepage"
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
              <Row>
                <ImagePathField
                  label="Image path"
                  value={item.image}
                  onChange={(image) => {
                    const next = [...items];
                    next[index] = { ...item, image };
                    touch(next);
                  }}
                />
                <Grid>
                  <Field label="Caption">
                    <TextInput
                      value={item.caption}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = { ...item, caption: e.target.value };
                        touch(next);
                      }}
                    />
                  </Field>
                  <Field label="ID">
                    <TextInput
                      value={item.id}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = { ...item, id: e.target.value };
                        touch(next);
                      }}
                    />
                  </Field>
                  <Field label="Type">
                    <Select
                      value={item.type}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = {
                          ...item,
                          type: e.target.value as GalleryItemType,
                        };
                        touch(next);
                      }}
                    >
                      <option value="milestone">milestone</option>
                      <option value="project">project</option>
                      <option value="keeps">keeps</option>
                    </Select>
                  </Field>
                  <Field label="Aspect">
                    <Select
                      value={item.aspect}
                      onChange={(e) => {
                        const next = [...items];
                        next[index] = {
                          ...item,
                          aspect: e.target.value as GalleryAspect,
                        };
                        touch(next);
                      }}
                    >
                      <option value="landscape">landscape</option>
                      <option value="portrait">portrait</option>
                      <option value="square">square</option>
                    </Select>
                  </Field>
                </Grid>
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
