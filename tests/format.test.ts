import { describe, expect, it } from "vitest";
import { formatMonth, formatRange } from "@/lib/format";

describe("date formatting", () => {
  it("formats YYYY-MM without touching Date or Intl", () => {
    expect(formatMonth("2026-05")).toBe("May 2026");
    expect(formatMonth("2024-09")).toBe("Sep 2024");
  });
  it("formats ranges with Present for open roles", () => {
    expect(formatRange("2025-05", "2026-05")).toBe("May 2025 — May 2026");
    expect(formatRange("2026-05")).toBe("May 2026 — Present");
  });
  it("rejects malformed input loudly", () => {
    expect(() => formatMonth("2026-13")).toThrow();
    expect(() => formatMonth("May 2026")).toThrow();
  });
});
