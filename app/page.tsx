import { about, site } from "@/content/site";
import { Gears } from "@/components/hero/Hero";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Clubs } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";

const [user, domain] = site.email.split("@");
const [host, tld] = domain.split(".");

export default function Home() {
  return (
    <>
      <header className="my-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <ProfilePhoto />
        <div className="mr-auto">
          <h1 className="text-[2em] leading-tight">{site.name}</h1>
          <p>
            &nbsp;&nbsp;{user} <em>at</em> {host} <em>dot</em> {tld}
          </p>
        </div>
        <Gears />
      </header>
      <p>
        {about.blurb.join(" ")} When I&apos;m not building, you&apos;ll find me into {about.interests.slice(0, -1).join(", ")}{" "}
        and {about.interests.at(-1)}, or working on the projects outlined below!
      </p>
      <SocialLinks />
      <Clubs />
      <Work />
    </>
  );
}
