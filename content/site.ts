/** Single source of truth for identity, navigation, experience and social links. */
export const site = {
  name: "Nakul Sethi",
  shortName: "nakul",
  role: "Engineering student",
  tagline: "I design, machine, and ship things — robots, tools, and the software that runs them.",
  location: "New York, NY",
  email: "nakul.sethi.212@gmail.com",
  url: "https://portfolio-appcoder-mkers-projects.vercel.app",
  description:
    "Nakul Sethi — engineering student, co-captain of FRC Team 5806. Mechanical design, fabrication, and software projects.",
  socials: [
    { label: "GitHub", href: "https://github.com/appcoder-mKer" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nakul-sethi-52a978318/" },
  ],
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Experience", href: "/#experience" },
    { label: "About", href: "/#about" },
    { label: "Resume", href: "/resume.pdf", external: true },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];

export type Experience = {
  org: string;
  role: string;
  start: string; // "2026-05"
  end?: string; // undefined = present
  summary: string;
  tags: string[];
  href?: string;
};

/** Reverse-chronological. Dates are YYYY-MM so they sort and format predictably. */
export const experience: Experience[] = [
  {
    org: "FRC Team 5806, Horace Mann",
    role: "Co-Captain",
    start: "2026-05",
    summary:
      "Co-lead a 35-member team through the full engineering cycle — design, prototyping, manufacturing, testing, competition. Coordinate build schedules across design, fabrication and programming subteams; mentor newer members on CAD and safe shop practice.",
    tags: ["Leadership", "Fusion 360", "Project scheduling", "Mentoring"],
    href: "https://www.thebluealliance.com/team/5806",
  },
  {
    org: "NYC FIRST",
    role: "Summer Intern — laser cutter & electronics lead",
    start: "2026-07",
    end: "2026-08",
    summary:
      "Designed and taught two-hour hands-on lessons for 15–20 students ages 8–12: motorized boats, RC cars, laser-cut keychains. Trained students on equipment and safety; ran a facility improvement project through design–test–iterate.",
    tags: ["Teaching", "Laser cutting", "Electronics"],
    href: "https://www.nycfirst.org/",
  },
  {
    org: "FRC Team 5806, Horace Mann",
    role: "Design, Build & Test Lead",
    start: "2025-05",
    end: "2026-05",
    summary:
      "Designed robot mechanisms and assemblies in Fusion 360 and iterated on them through testing. Fabricated and assembled components on the waterjet and 2-axis mill.",
    tags: ["Fusion 360", "Waterjet", "CNC mill", "Mechanism design"],
  },
  {
    org: "Horace Mann Engineering Research Club",
    role: "Co-Leader",
    start: "2025-09",
    summary:
      "Run biweekly meetings for student engineers and researchers with a three-person leadership team; connect students with research opportunities and resources.",
    tags: ["Community", "Research"],
  },
  {
    org: "YoBoHo Digital Content",
    role: "Prompt Engineering Intern",
    start: "2025-06",
    end: "2025-07",
    summary:
      "Wrote detailed prompts to guide AI image generation and designed viral YouTube Shorts concepts with the editing team.",
    tags: ["Generative AI", "Content"],
  },
  {
    org: "FRC Team 5806, Horace Mann",
    role: "Team Member",
    start: "2024-09",
    end: "2025-05",
    summary: "Contributed to robot design and fabrication while learning the team's CAD and build workflows.",
    tags: ["CAD", "Fabrication"],
  },
];

export const about = {
  paragraphs: [
    "I'm a student at Horace Mann School in New York, graduating in 2028. Most of my time outside class goes to FRC Team 5806, where I started as a team member, led design, build and test the next season, and now co-captain a 35-person team.",
    "I like the whole loop: sketching a mechanism in Fusion 360, cutting it on the waterjet, finding out on the bench why it doesn't work, and fixing it. The same loop shows up in the software I build for the team — a scouting app, an operations dashboard — and in the lessons I taught at NYC FIRST last summer.",
    "Away from the shop I shoot photos, run, play lacrosse and cello, cook, and follow the Yankees and Knicks with more hope than evidence.",
  ],
  education: {
    school: "Horace Mann School, Bronx, NY",
    detail: "Class of 2028 · AP Computer Science A, Engineering Seminar, Mechanical Engineering, AP Statistics (5)",
  },
  awards: ["USACO Gold", "FRC Leadership Award Semifinalist"],
  skills: {
    "Design & fabrication": ["Autodesk Fusion 360", "Waterjet", "2-axis CNC mill", "Laser cutter"],
    Software: ["TypeScript", "Java", "Python", "Swift", "Next.js", "React"],
    Media: ["Video production", "Photography", "Adobe Suite"],
  },
  interests: ["Photography", "Running", "Lacrosse", "Cello", "Cooking", "Yankees", "Knicks"],
} as const;
