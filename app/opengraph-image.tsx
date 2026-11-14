import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 72,
        background: "#0b0c0e",
        color: "#e6e6e3",
        fontFamily: "sans-serif",
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      <div style={{ display: "flex", fontSize: 24, color: "#9a9a94", letterSpacing: 4 }}>
        {site.location.toUpperCase()}
      </div>
      <div style={{ display: "flex", fontSize: 96, fontWeight: 500, letterSpacing: -4, marginTop: 12 }}>
        {site.name}
        <span style={{ color: "#ffb02e" }}>.</span>
      </div>
      <div style={{ display: "flex", fontSize: 32, color: "#9a9a94", marginTop: 16, maxWidth: 900 }}>
        {site.tagline}
      </div>
    </div>,
    size,
  );
}
