import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { getProject, getProjectSlugs } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project?.title ?? site.name;
  const summary = project?.summary ?? site.tagline;
  const meta = project ? `${project.year} · ${project.role}` : site.role;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0b0c0e",
        color: "#e6e6e3",
        fontFamily: "sans-serif",
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#9a9a94" }}>
        {site.shortName}
        <span style={{ color: "#ffb02e" }}>.</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 24, color: "#9a9a94", letterSpacing: 4 }}>{meta.toUpperCase()}</div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 500, letterSpacing: -3, marginTop: 12 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 30, color: "#9a9a94", marginTop: 16, maxWidth: 1000 }}>{summary}</div>
      </div>
    </div>,
    size,
  );
}
