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
