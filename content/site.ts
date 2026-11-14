/** Single source of truth for identity, navigation, blurb and social links. */
export const site = {
  name: "Nakul Sethi",
  shortName: "nakul",
  role: "Student engineer",
  tagline: "Personal projects — robots, tools, and the software that runs them.",
  location: "New York, NY",
  email: "nakul.sethi.212@gmail.com",
  url: "https://portfolio-appcoder-mkers-projects.vercel.app",
  description:
    "Nakul Sethi — student at Horace Mann School, co-captain of FRC Team 5806. A home for personal engineering and software projects.",
  socials: [
    { label: "GitHub", href: "https://github.com/appcoder-mKer" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nakul-sethi-52a978318/" },
  ],
  nav: [
    { label: "Projects", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];

export const about = {
  blurb: [
    "I'm a student at Horace Mann School in New York, class of 2028. This site is where I keep the things I build.",
    "At school I'm co-captain of FRC Team 5806, our FIRST Robotics team, co-lead the Engineering Research Club, and co-founded the Horace Mann Broadcasting Network.",
  ],
  clubs: [
    { name: "FRC Team 5806", role: "Co-Captain", href: "https://www.thebluealliance.com/team/5806" },
    { name: "Engineering Research Club", role: "Co-Leader" },
    { name: "HM Broadcasting Network", role: "Co-Founder" },
  ],
  interests: ["Photography", "Running", "Lacrosse", "Cello", "Cooking"],
} as const;
