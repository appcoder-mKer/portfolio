/** Single source of truth for identity, navigation and social links. */
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
