import { describe, it, expect, vi, beforeEach } from "vitest";

import { COLOR_MODE_KEY } from "../../constants.js";
import { loadSSRVuelessConfig, setVuelessConfig, vuelessConfig } from "../ui";

import type { Config } from "../../types";

/* jsdom doesn't implement matchMedia, which theme.ts evaluates on import. */
const prefersDark = { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() };

window.matchMedia = vi.fn(() => prefersDark) as unknown as typeof window.matchMedia;

const { getThemeCookieName } = await import("../theme");

beforeEach(() => {
  Object.keys(vuelessConfig).forEach((key) => delete vuelessConfig[key as keyof Config]);
});

describe("loadSSRVuelessConfig", () => {
  it.each([
    ["resolves", () => ({ cookiePrefix: "from-file" })],
    [
      "fails",
      () => {
        throw new Error("Cannot find module '/vueless.config'");
      },
    ],
  ])("keeps the injected config when a deferred import %s", async (_, settle: () => Config) => {
    let release!: () => void;
    const released = new Promise<void>((resolve) => (release = resolve));

    const loading = loadSSRVuelessConfig(() => released.then(() => ({ default: settle() })));

    setVuelessConfig({ cookiePrefix: "app-a" });
    expect(getThemeCookieName(COLOR_MODE_KEY)).toBe(`app-a-${COLOR_MODE_KEY}`);

    release();
    await loading;

    expect(getThemeCookieName(COLOR_MODE_KEY)).toBe(`app-a-${COLOR_MODE_KEY}`);
  });

  it("uses the imported config when none was injected", async () => {
    await loadSSRVuelessConfig(async () => ({ default: { cookiePrefix: "from-file" } }));

    expect(getThemeCookieName(COLOR_MODE_KEY)).toBe(`from-file-${COLOR_MODE_KEY}`);
  });
});
