"use client";

import type { ReactNode } from "react";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-meta uppercase tracking-[0.12em] text-text-secondary">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="font-sans text-[12px] text-text-muted">{hint}</span>
      ) : null}
    </label>
  );
}

const controlClass =
  "w-full border border-border-subtle bg-bg-void px-3 py-2 font-sans text-body text-text-primary outline-none transition focus:border-accent-electric disabled:opacity-50";

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return <input {...props} className={[controlClass, props.className].filter(Boolean).join(" ")} />;
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={[controlClass, "min-h-[6rem] resize-y", props.className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) {
  return (
    <select
      {...props}
      className={[controlClass, props.className].filter(Boolean).join(" ")}
    />
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 font-sans text-body text-text-secondary">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-[var(--accent-electric)]"
      />
      {label}
    </label>
  );
}

export function Panel({
  title,
  description,
  actions,
  children,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border border-border-subtle bg-bg-panel p-4 md:p-5">
      {(title || actions) && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title ? (
              <h3 className="font-sans text-[1.05rem] font-semibold text-text-primary">
                {title}
              </h3>
            ) : null}
            {description ? (
              <p className="mt-1 font-sans text-[13px] text-text-muted">
                {description}
              </p>
            ) : null}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function Grid({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">{children}</div>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

export function DangerButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      type="button"
      {...props}
      className={[
        "border border-border-subtle px-3 py-1.5 font-mono text-meta uppercase tracking-[0.1em] text-text-muted transition hover:border-accent-primary hover:text-accent-primary disabled:opacity-40",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export function GhostButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      type="button"
      {...props}
      className={[
        "border border-border-subtle px-3 py-1.5 font-mono text-meta uppercase tracking-[0.1em] text-text-secondary transition hover:border-accent-electric hover:text-accent-electric disabled:opacity-40",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export function PrimaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      type="button"
      {...props}
      className={[
        "bg-accent-primary px-4 py-2 font-sans text-body font-semibold text-text-primary transition hover:bg-accent-electric disabled:opacity-50",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

/** Editable list of plain strings (skills, credentials, tech, etc.). */
export function StringListEditor({
  values,
  onChange,
  placeholder = "Add item",
  addLabel = "Add",
}: {
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {values.map((value, index) => (
        <div key={index} className="flex gap-2">
          <TextInput
            value={value}
            onChange={(event) => {
              const next = [...values];
              next[index] = event.target.value;
              onChange(next);
            }}
          />
          <DangerButton
            onClick={() => onChange(values.filter((_, i) => i !== index))}
            aria-label="Remove"
          >
            Remove
          </DangerButton>
        </div>
      ))}
      <GhostButton
        onClick={() => onChange([...values, ""])}
        className="self-start"
      >
        {addLabel}
      </GhostButton>
      {values.length === 0 ? (
        <p className="font-sans text-[12px] text-text-muted">{placeholder}</p>
      ) : null}
    </div>
  );
}

/** Image path with live preview when the path looks public. */
export function ImagePathField({
  label,
  value,
  onChange,
  hint = "Public path under /public, e.g. /images/projects/slug/cover.png",
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  hint?: string;
}) {
  const previewable = value.startsWith("/") && !value.includes("TODO");

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-start">
      <div className="min-w-0 flex-1">
        <Field label={label} hint={hint}>
          <TextInput
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="/images/..."
          />
        </Field>
      </div>
      <div className="h-28 w-40 shrink-0 overflow-hidden border border-border-subtle bg-bg-void">
        {previewable ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.opacity = "0.25";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center px-2 text-center font-mono text-[10px] uppercase tracking-wide text-text-muted">
            No preview
          </div>
        )}
      </div>
    </div>
  );
}

export function SaveBar({
  pending,
  error,
  status,
  onSave,
  dirty,
}: {
  pending: boolean;
  error: string | null;
  status: string | null;
  onSave: () => void;
  dirty?: boolean;
}) {
  return (
    <div className="sticky bottom-0 z-10 mt-8 border border-border-subtle bg-bg-panel/95 px-4 py-3 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-h-[1.25rem]">
          {error ? (
            <p className="font-mono text-meta text-accent-primary" role="alert">
              {error}
            </p>
          ) : null}
          {!error && status ? (
            <p className="font-mono text-meta text-[color:var(--success)]">
              {status}
            </p>
          ) : null}
          {!error && !status && dirty ? (
            <p className="font-mono text-meta text-warning">Unsaved changes</p>
          ) : null}
          {!error && !status && !dirty ? (
            <p className="font-mono text-meta text-text-muted">
              Changes apply to the live site after save
            </p>
          ) : null}
        </div>
        <PrimaryButton onClick={onSave} disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </PrimaryButton>
      </div>
    </div>
  );
}
