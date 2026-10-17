"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  Field,
  GhostButton,
  Grid,
  ImagePathField,
  Panel,
  Row,
  SaveBar,
  TextArea,
  TextInput,
  DangerButton,
} from "@/components/admin/ui";
import { useAdminSave } from "@/lib/admin-save";
import type { NavItem, SiteConfig } from "@/lib/types";

export function SiteConfigForm({ initial }: { initial: SiteConfig }) {
  const [data, setData] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const { pending, error, status, save, clearMessages } = useAdminSave("site-config");

  function update(patch: Partial<SiteConfig>) {
    clearMessages();
    setDirty(true);
    setData((prev) => ({ ...prev, ...patch }));
  }

  function updateSocials(key: keyof SiteConfig["socials"], value: string) {
    clearMessages();
    setDirty(true);
    setData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [key]: value },
    }));
  }

  function updateContact(
    key: keyof SiteConfig["contactForm"],
    value: string,
  ) {
    clearMessages();
    setDirty(true);
    setData((prev) => ({
      ...prev,
      contactForm: { ...prev.contactForm, [key]: value },
    }));
  }

  function updateNav(index: number, patch: Partial<NavItem>) {
    clearMessages();
    setDirty(true);
    setData((prev) => {
      const navItems = prev.navItems.map((item, i) =>
        i === index ? { ...item, ...patch } : item,
      );
      return { ...prev, navItems };
    });
  }

  return (
    <AdminShell
      resource="site-config"
      title="Site & contact"
      description="Name, hero, socials, nav, and contact form copy used across the public site."
    >
      <Row>
        <Panel title="Identity">
          <Grid>
            <Field label="Name">
              <TextInput
                value={data.name}
                onChange={(e) => update({ name: e.target.value })}
              />
            </Field>
            <Field label="Role">
              <TextInput
                value={data.role}
                onChange={(e) => update({ role: e.target.value })}
              />
            </Field>
            <Field label="Location">
              <TextInput
                value={data.location}
                onChange={(e) => update({ location: e.target.value })}
              />
            </Field>
            <Field label="Email" hint="Shown / used for mailto when set">
              <TextInput
                value={data.email}
                onChange={(e) => update({ email: e.target.value })}
              />
            </Field>
          </Grid>
        </Panel>

        <Panel title="Hero">
          <Row>
            <Field label="Headline" hint='e.g. "FULL-STACK / DEVELOPER"'>
              <TextInput
                value={data.heroHeadline}
                onChange={(e) => update({ heroHeadline: e.target.value })}
              />
            </Field>
            <Grid>
              <Field label="Backdrop wordmark">
                <TextInput
                  value={data.heroBackdrop}
                  onChange={(e) => update({ heroBackdrop: e.target.value })}
                />
              </Field>
              <Field label="Corner tag">
                <TextInput
                  value={data.heroTag}
                  onChange={(e) => update({ heroTag: e.target.value })}
                />
              </Field>
            </Grid>
            <ImagePathField
              label="Avatar image"
              value={data.heroAvatar}
              onChange={(heroAvatar) => update({ heroAvatar })}
            />
            <Grid>
              <Field label="CTA label">
                <TextInput
                  value={data.heroCta.label}
                  onChange={(e) =>
                    update({
                      heroCta: { ...data.heroCta, label: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="CTA href">
                <TextInput
                  value={data.heroCta.href}
                  onChange={(e) =>
                    update({
                      heroCta: { ...data.heroCta, href: e.target.value },
                    })
                  }
                />
              </Field>
            </Grid>
          </Row>
        </Panel>

        <Panel title="Socials">
          <Grid>
            {(
              [
                "github",
                "linkedin",
                "portfolio",
                "facebook",
                "instagram",
              ] as const
            ).map((key) => (
              <Field key={key} label={key}>
                <TextInput
                  value={data.socials[key] ?? ""}
                  onChange={(e) => updateSocials(key, e.target.value)}
                />
              </Field>
            ))}
          </Grid>
        </Panel>

        <Panel
          title="Navigation"
          description="Labels and hash links on the left rail."
          actions={
            <GhostButton
              onClick={() => {
                clearMessages();
                setDirty(true);
                setData((prev) => ({
                  ...prev,
                  navItems: [
                    ...prev.navItems,
                    { label: "New", href: "/#section" },
                  ],
                }));
              }}
            >
              Add item
            </GhostButton>
          }
        >
          <Row>
            {data.navItems.map((item, index) => (
              <div key={index} className="flex flex-col gap-2 border border-border-subtle p-3 md:flex-row md:items-end">
                <Field label="Label">
                  <TextInput
                    value={item.label}
                    onChange={(e) => updateNav(index, { label: e.target.value })}
                  />
                </Field>
                <Field label="Href">
                  <TextInput
                    value={item.href}
                    onChange={(e) => updateNav(index, { href: e.target.value })}
                  />
                </Field>
                <DangerButton
                  onClick={() => {
                    clearMessages();
                    setDirty(true);
                    setData((prev) => ({
                      ...prev,
                      navItems: prev.navItems.filter((_, i) => i !== index),
                    }));
                  }}
                >
                  Remove
                </DangerButton>
              </div>
            ))}
          </Row>
        </Panel>

        <Panel title="Contact / footer">
          <Row>
            <Field label="Closing headline">
              <TextInput
                value={data.closingHeadline}
                onChange={(e) => update({ closingHeadline: e.target.value })}
              />
            </Field>
            <Field label="Footer note">
              <TextArea
                value={data.footerNote}
                onChange={(e) => update({ footerNote: e.target.value })}
              />
            </Field>
            <Grid>
              {(
                [
                  ["eyebrow", "Form eyebrow"],
                  ["title", "Form title"],
                  ["statusIdle", "Idle status"],
                  ["channelMeta", "Channel meta"],
                  ["nameLabel", "Name label"],
                  ["subjectLabel", "Subject label"],
                  ["messageLabel", "Message label"],
                  ["namePlaceholder", "Name placeholder"],
                  ["subjectPlaceholder", "Subject placeholder"],
                  ["messagePlaceholder", "Message placeholder"],
                  ["submitLabel", "Submit label"],
                  ["sendingLabel", "Sending label"],
                  ["successMessage", "Success message"],
                  ["errorMessage", "Error message"],
                  ["endpoint", "Form endpoint"],
                ] as const
              ).map(([key, label]) => (
                <Field key={key} label={label}>
                  <TextInput
                    value={data.contactForm[key]}
                    onChange={(e) => updateContact(key, e.target.value)}
                  />
                </Field>
              ))}
            </Grid>
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
