import { describe, expect, it } from "vitest";
import { contactFormSchema, projectFrontmatterSchema } from "@/lib/schemas";

const valid = {
  title: "Thing",
  year: 2026,
  role: "Solo",
  summary: "A sufficiently long summary of the thing.",
  tags: ["TypeScript"],
};

describe("projectFrontmatterSchema", () => {
  it("accepts a minimal valid project and applies defaults", () => {
    const p = projectFrontmatterSchema.parse(valid);
    expect(p.featured).toBe(false);
    expect(p.order).toBe(99);
    expect(p.links).toEqual({});
  });

  it("rejects missing title, bad link URLs and unknown keys", () => {
    expect(projectFrontmatterSchema.safeParse({ ...valid, title: "" }).success).toBe(false);
    expect(projectFrontmatterSchema.safeParse({ ...valid, links: { repo: "nope" } }).success).toBe(false);
    expect(projectFrontmatterSchema.safeParse({ ...valid, extra: 1 }).success).toBe(false);
  });
});

describe("contactFormSchema", () => {
  it("accepts a real message", () => {
    const r = contactFormSchema.safeParse({
      name: "Ada",
      email: "ada@example.com",
      message: "Hello, I'd like to talk about a summer program.",
    });
    expect(r.success).toBe(true);
  });

  it("rejects short messages, bad emails and a filled honeypot", () => {
    expect(contactFormSchema.safeParse({ name: "Ada", email: "ada@example.com", message: "hi" }).success).toBe(false);
    expect(contactFormSchema.safeParse({ name: "Ada", email: "ada", message: "A long enough message here." }).success).toBe(false);
    expect(
      contactFormSchema.safeParse({ name: "Ada", email: "ada@example.com", message: "A long enough message here.", company: "x" }).success,
    ).toBe(false);
  });
});
