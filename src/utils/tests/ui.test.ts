import { describe, it, expect, vi } from "vitest";

import { COLOR_MODE_KEY } from "../../constants.js";
import { getDataTest, setVuelessConfig } from "../ui";

/* jsdom doesn't implement matchMedia, which theme.ts evaluates on import. */
const prefersDark = { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() };

window.matchMedia = vi.fn(() => prefersDark) as unknown as typeof window.matchMedia;

const { getThemeCookieName } = await import("../theme");

describe("setVuelessConfig", () => {
  it("uses the injected config", () => {
    setVuelessConfig({ cookiePrefix: "app-a" });

    expect(getThemeCookieName(COLOR_MODE_KEY)).toBe(`app-a-${COLOR_MODE_KEY}`);
  });

  it("keeps the current config when an empty one is injected", () => {
    setVuelessConfig({ cookiePrefix: "app-a" });
    setVuelessConfig({});

    expect(getThemeCookieName(COLOR_MODE_KEY)).toBe(`app-a-${COLOR_MODE_KEY}`);
  });
});

describe("getDataTest", () => {
  it("returns null when data test is not set", () => {
    expect(getDataTest(null, "cell")).toBeNull();
    expect(getDataTest(undefined)).toBeNull();
    expect(getDataTest("")).toBeNull();
  });

  it("returns the data test with an optional suffix", () => {
    expect(getDataTest("table")).toBe("table");
    expect(getDataTest("table", "name-cell")).toBe("table-name-cell");
  });
});
