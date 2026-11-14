import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { projectFrontmatterSchema, type ProjectFrontmatter } from "./schemas";

export type Project = ProjectFrontmatter & { slug: string; body: string };

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function readProject(file: string, dir = PROJECTS_DIR): Project {
  const slug = file.replace(/\.mdx$/, "");
  if (!SLUG_RE.test(slug)) {
    throw new Error(`content/projects/${file}: filename must be a kebab-case slug`);
  }
  // Production reads use a statically analysable path so Turbopack traces only content/projects.
  // The injectable `dir` branch exists for tests and is deliberately excluded from tracing.
  const raw =
    dir === PROJECTS_DIR
      ? fs.readFileSync(path.join(process.cwd(), "content", "projects", file), "utf8")
      : fs.readFileSync(/*turbopackIgnore: true*/ path.join(dir, file), "utf8");
  const { data, content } = matter(raw);
  const parsed = projectFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);
    throw new Error(`content/projects/${file}: invalid frontmatter\n  ${issues.join("\n  ")}`);
  }
  return { ...parsed.data, slug, body: content.trim() };
}

/** All projects, featured first, then by explicit order, then newest year. */
export function getProjects(dir = PROJECTS_DIR): Project[] {
  const files = (
    dir === PROJECTS_DIR
      ? fs.readdirSync(path.join(process.cwd(), "content", "projects"))
      : fs.readdirSync(/*turbopackIgnore: true*/ dir)
  ).filter((f) => f.endsWith(".mdx"));
  return files.map((f) => readProject(f, dir)).sort((a, b) => {
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
