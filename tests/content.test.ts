import { describe, expect, it } from "vitest";
import path from "node:path";
import fs from "node:fs";
import { getFeaturedProjects, getProject, getProjectSlugs, getProjects, parseProject } from "@/lib/content";

describe("project content", () => {
  it("loads every project with valid frontmatter", () => {
    const projects = getProjects();
    expect(projects.length).toBeGreaterThanOrEqual(6);
    for (const p of projects) {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
      expect(p.body.length).toBeGreaterThan(0);
    }
  });

  it("has unique slugs", () => {
    const slugs = getProjectSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("features exactly four projects, sorted first", () => {
    const projects = getProjects();
    expect(getFeaturedProjects()).toHaveLength(4);
    expect(projects.slice(0, 4).every((p) => p.featured)).toBe(true);
    expect(projects.slice(4).some((p) => p.featured)).toBe(false);
  });

  it("looks up a project by slug and rejects unknown or unsafe slugs", () => {
    expect(getProject("frc-2026-robot")?.title).toMatch(/FRC 2026/);
    expect(getProject("does-not-exist")).toBeUndefined();
    expect(getProject("../package")).toBeUndefined();
  });
});

describe("content validation failures", () => {
  const fixture = (name: string) => fs.readFileSync(path.join(__dirname, "fixtures", name), "utf8");

  it("throws a readable error naming the file and the bad fields", () => {
    expect(() => parseProject("missing-title.mdx", fixture("bad-projects/missing-title.mdx"))).toThrow(
      /missing-title\.mdx: invalid frontmatter[\s\S]*title[\s\S]*bogus/,
    );
  });

  it("rejects filenames that are not kebab-case slugs", () => {
    expect(() => parseProject("Not_A_Slug.mdx", fixture("bad-slug/Not_A_Slug.mdx"))).toThrow(/kebab-case slug/);
  });
});
