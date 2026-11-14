import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { projectFrontmatterSchema, type ProjectFrontmatter } from "./schemas";

export type Project = ProjectFrontmatter & { slug: string; body: string };

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Pure parser: validates the filename and frontmatter of one MDX file. Throws with a readable message. */
export function parseProject(file: string, raw: string): Project {
  const slug = file.replace(/\.mdx$/, "");
  if (!SLUG_RE.test(slug)) {
    throw new Error(`content/projects/${file}: filename must be a kebab-case slug`);
  }
  const { data, content } = matter(raw);
  const parsed = projectFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);
    throw new Error(`content/projects/${file}: invalid frontmatter\n  ${issues.join("\n  ")}`);
  }
  return { ...parsed.data, slug, body: content.trim() };
}

// Paths below are written out literally so Turbopack traces only content/projects into the server bundle.
function readProject(file: string): Project {
  return parseProject(file, fs.readFileSync(path.join(process.cwd(), "content", "projects", file), "utf8"));
}

/** All projects, featured first, then by explicit order, then newest year. */
export function getProjects(): Project[] {
  const files = fs.readdirSync(path.join(process.cwd(), "content", "projects")).filter((f) => f.endsWith(".mdx"));
  return files.map(readProject).sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.order !== b.order) return a.order - b.order;
    return b.year - a.year;
  });
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getProjectSlugs(): string[] {
  return getProjects().map((p) => p.slug);
}

export function getProject(slug: string): Project | undefined {
  if (!SLUG_RE.test(slug)) return undefined;
  if (!fs.existsSync(path.join(process.cwd(), "content", "projects", `${slug}.mdx`))) return undefined;
  return readProject(`${slug}.mdx`);
}
