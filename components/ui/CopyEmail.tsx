"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-2 font-mono text-sm text-fg"
      aria-live="polite"
    >
      <span className="link-underline">{email}</span>
      <span className="text-xs text-muted">
        {state === "copied" ? "copied" : state === "failed" ? "select to copy" : "copy"}
      </span>
    </button>
  );
}
