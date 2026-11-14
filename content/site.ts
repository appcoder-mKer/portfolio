import { basePath } from "@/lib/asset";

const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://nakulsethi.github.io";

/** Single source of truth for identity, blurb and social links. */
export const site = {
  name: "Nakul Sethi",
  shortName: "nakul",
  role: "Student engineer",
  tagline: "Personal projects — robots, tools, and the software that runs them.",
  location: "New York, NY",
  email: "nakul.sethi.212@gmail.com",
  origin,
  url: `${origin}${basePath}`,
  repo: "https://github.com/nakulsethi/nakulsethi.github.io",
  description:
    "Nakul Sethi — student at Horace Mann School, co-captain of FRC Team 5806. A home for personal engineering and software projects.",
  socials: [
    { label: "GitHub", href: "https://github.com/nakulsethi" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nakul-sethi-52a978318/" },
  ],
} as const;

export const about = {
  blurb: [
    "Hello, and welcome to my site! I'm a student at Horace Mann School in New York, class of 2028, and this is where I keep the things I build.",
    "At school I'm co-captain of FRC Team 5806, our FIRST Robotics team, co-lead the Engineering Research Club, and co-founded the Horace Mann Broadcasting Network.",
  ],
  clubs: [
    {
      name: "FRC Team 5806",
      role: "Co-Captain",
      note: "Horace Mann's FIRST Robotics Competition team.",
      href: "https://www.thebluealliance.com/team/5806",
    },
    { name: "Engineering Research Club", role: "Co-Leader" },
    { name: "HM Broadcasting Network", role: "Co-Founder" },
  ],
  interests: ["photography", "running", "lacrosse", "cello", "cooking"],
} as const;

export type CourseworkEntry = {
  /** Class, program or employer, e.g. "AP Physics C". */
  name: string;
  /** Second line, e.g. "Horace Mann · 11th grade" or "Internship 2026". */
  detail: string;
  /** Optional one-line description shown in small text. */
  note?: string;
  /** Optional link; makes the card clickable. */
  href?: string;
};

/**
 * Classes, programs and work experience, most relevant first. The first seven appear in the row on
 * the home page; all of them appear on /coursework. While this list is empty the section is hidden.
 * Course titles and numbers are from the Horace Mann transcript; grades are deliberately left out.
 */
export const coursework: CourseworkEntry[] = [
  { name: "Engineering Seminar", detail: "Horace Mann CMPE 436", note: "Grade 11 · in progress, 2026–27." },
  { name: "Mechanical Engineering & Automation", detail: "Horace Mann CMPE 326", note: "Grade 10 · 2025–26." },
  { name: "Introduction to Engineering", detail: "Horace Mann CMPE 215", note: "Grade 9 · 2024–25." },
  { name: "AP Statistics", detail: "AP exam", note: "Scored a 5." },
  { name: "AP Computer Science A", detail: "AP exam", note: "Studying for it now." },
  { name: "Physics", detail: "Horace Mann SCI 311", note: "Grade 11 · in progress, 2026–27." },
  { name: "Precalculus with Theory", detail: "Horace Mann MATH 410", note: "Grade 11 · in progress, 2026–27." },
  { name: "Chemistry", detail: "Horace Mann SCI 220", note: "Grade 10 · 2025–26." },
  { name: "Algebra 2 & Trigonometry", detail: "Horace Mann MATH 221", note: "Grade 10 · 2025–26." },
  { name: "Biology", detail: "Horace Mann SCI 210", note: "Grade 9 · 2024–25." },
  { name: "Geometry", detail: "Horace Mann MATH 211", note: "Grade 9 · 2024–25." },
  { name: "Filmmaking 2: Field & Studio Production", detail: "Horace Mann ARTV 255", note: "Grade 10 · 2025–26." },
  { name: "Filmmaking 1: Art of Visual Storytelling", detail: "Horace Mann ARTV 215", note: "Grade 9 · 2024–25." },
  { name: "Film History 1: From Talkies to TikToks", detail: "Horace Mann ARTV 226", note: "Grade 11 · in progress, 2026–27." },
  { name: "Public Speech & Communication", detail: "Horace Mann ARTD 235", note: "Grade 11 · in progress, 2026–27." },
];
