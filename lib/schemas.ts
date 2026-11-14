import { z } from "zod";

export const projectLinksSchema = z
  .object({
    repo: z.url().optional(),
    live: z.url().optional(),
    writeup: z.url().optional(),
  })
  .strict();

/** Frontmatter contract for content/projects/*.mdx. Invalid frontmatter fails the build. */
export const projectFrontmatterSchema = z
  .object({
    title: z.string().min(1),
    year: z.number().int().min(2015).max(2100),
    role: z.string().min(1),
    summary: z.string().min(10).max(240),
    tags: z.array(z.string().min(1)).min(1).max(8),
    featured: z.boolean().default(false),
    order: z.number().int().default(99),
    cover: z.string().startsWith("/").optional(),
    coverAlt: z.string().optional(),
    links: projectLinksSchema.default({}),
  })
  .strict();

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please tell me your name.").max(80),
  email: z.email("That email doesn't look right."),
  message: z.string().trim().min(20, "A few more words would help.").max(4000),
  /** Honeypot: must stay empty. Bots that fill every field get silently dropped. */
  company: z.string().max(0).optional(),
});

export type ContactForm = z.infer<typeof contactFormSchema>;
