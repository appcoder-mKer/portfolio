import { describe, expect, it } from "vitest";
import { pickActive } from "@/lib/active-section";

describe("pickActive", () => {
  it("returns null when nothing intersects", () => {
    expect(pickActive([])).toBeNull();
  });
  it("prefers the section whose top is nearest the viewport top", () => {
    expect(pickActive([{ id: "work", top: 420 }, { id: "about", top: -30 }])).toBe("about");
    expect(pickActive([{ id: "work", top: 12 }, { id: "about", top: 900 }])).toBe("work");
  });
});
