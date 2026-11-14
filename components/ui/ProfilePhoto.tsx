import fs from "node:fs";
import path from "node:path";
import { asset } from "@/lib/asset";
import { site } from "@/content/site";

const EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

// Literal path segments so Turbopack traces only public/media into the build.
function findPhoto(): string | undefined {
  const ext = EXTENSIONS.find((e) => fs.existsSync(path.join(process.cwd(), "public", "media", `profile.${e}`)));
  return ext ? `/media/profile.${ext}` : undefined;
}

/** Round portrait beside the name. Shows initials until public/media/profile.(jpg|jpeg|png|webp) exists. */
export function ProfilePhoto() {
  const src = findPhoto();
  const frame = "m-2 size-[4.5em] shrink-0 rounded-full sm:m-4 sm:size-[6em]";
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element -- static export: no image optimizer to route through
    return <img src={asset(src)} alt={`Portrait of ${site.name}`} className={`${frame} object-cover`} />;
  }
  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .join("");
  return (
    <div
      role="img"
      aria-label={`${site.name} (photo coming soon)`}
      className={`${frame} grid place-items-center border-[0.5px] border-border font-heading text-[1.5em] font-bold text-muted`}
    >
      {initials}
    </div>
  );
}
