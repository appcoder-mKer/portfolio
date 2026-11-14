import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-12 flex justify-center text-xs text-muted">
      <p>
        © {site.name} ·{" "}
        <a href={site.repo} target="_blank" rel="noopener" className="link-mark">
          Source
        </a>
      </p>
    </footer>
  );
}
