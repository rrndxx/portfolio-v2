"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import type { ContactFormCopy } from "@/lib/types";

interface ContactFormProps {
  copy: ContactFormCopy;
}

type Status = "idle" | "sending" | "success" | "error";

function SlashMarks({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`flex gap-[2px] ${className}`.trim()}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block h-2.5 w-[2px] -skew-x-[22deg] bg-accent-electric"
        />
      ))}
    </span>
  );
}

function ContactFieldShell({
  channel,
  label,
  focused,
  children,
}: {
  channel: string;
  label: string;
  focused: boolean;
  children: ReactNode;
}) {
  return (
    <label
      className={[
        "contact-channel group relative block",
        focused ? "contact-channel-live" : "",
      ].join(" ")}
    >
      <span
        aria-hidden
        className="contact-channel-tab absolute -top-2 right-3 z-20"
      >
        {channel}
      </span>

      <span className="pointer-events-none absolute left-3 top-2.5 z-20 flex items-center gap-2 md:left-3.5">
        <SlashMarks />
        <span className="font-sans text-[0.62rem] uppercase tracking-[0.16em] text-accent-glow/90">
          {label}
        </span>
      </span>

      <span
        aria-hidden
        className="contact-channel-edge pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-[3px]"
      />

      {children}
    </label>
  );
}

export function ContactForm({ copy }: ContactFormProps) {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setErrorDetail(null);

    try {
      const res = await fetch(copy.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          subject: String(data.get("subject") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
        }),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(payload?.error ?? "Request failed");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorDetail(err instanceof Error ? err.message : null);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="contact-console relative overflow-hidden"
      noValidate
      aria-labelledby={`${formId}-title`}
    >
      <div
        aria-hidden
        className="glitch-texture pointer-events-none absolute inset-x-0 top-0 z-20 h-2 opacity-85"
      />
      <div
        aria-hidden
        className="contact-console-scan pointer-events-none absolute inset-0 z-0"
      />

      <div className="relative z-10 border-b border-accent-glow/20 px-4 py-3 md:px-5 md:py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              id={`${formId}-title`}
              className="font-sans text-meta uppercase tracking-[0.18em] text-accent-glow"
            >
              {copy.eyebrow}
            </p>
            <p className="mt-1 font-display text-[1.15rem] uppercase leading-none tracking-tight text-text-primary md:text-[1.3rem]">
              {copy.title}
              <span className="text-accent-glow">_</span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <SlashMarks />
            <span className="font-sans text-[0.58rem] uppercase tracking-[0.14em] text-text-muted">
              {copy.channelMeta}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-5 px-4 py-5 md:gap-6 md:px-5 md:py-6">
        <ContactFieldShell
          channel="01_"
          label={copy.nameLabel}
          focused={focused === "name"}
        >
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            disabled={status === "sending"}
            className="contact-field"
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
          />
        </ContactFieldShell>

        <ContactFieldShell
          channel="02_"
          label={copy.subjectLabel}
          focused={focused === "subject"}
        >
          <input
            name="subject"
            type="text"
            required
            autoComplete="off"
            placeholder={copy.subjectPlaceholder}
            disabled={status === "sending"}
            className="contact-field"
            onFocus={() => setFocused("subject")}
            onBlur={() => setFocused(null)}
          />
        </ContactFieldShell>

        <ContactFieldShell
          channel="03_"
          label={copy.messageLabel}
          focused={focused === "message"}
        >
          <textarea
            name="message"
            required
            rows={5}
            placeholder={copy.messagePlaceholder}
            disabled={status === "sending"}
            className="contact-field contact-field-area"
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused(null)}
          />
        </ContactFieldShell>
      </div>

      <div className="relative z-10 flex flex-col gap-4 border-t border-accent-glow/20 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5 md:py-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="work-cta work-cta-signal px-7 py-3.5 font-sans text-meta uppercase tracking-[0.12em] disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? copy.sendingLabel : copy.submitLabel}
          <span aria-hidden className="ml-2">
            →
          </span>
        </button>

        <p
          role="status"
          aria-live="polite"
          className={[
            "font-sans text-[0.68rem] uppercase tracking-[0.1em]",
            status === "success"
              ? "text-success"
              : status === "error"
                ? "text-warning"
                : "text-text-muted/70",
          ].join(" ")}
        >
          {status === "success"
            ? copy.successMessage
            : status === "error"
              ? errorDetail || copy.errorMessage
              : copy.statusIdle}
        </p>
      </div>

      <div
        aria-hidden
        className="glitch-texture pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1.5 opacity-60"
      />
    </form>
  );
}
