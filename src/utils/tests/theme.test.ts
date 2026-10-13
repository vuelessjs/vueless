import { describe, it, expect, vi, beforeEach } from "vitest";

import { AUTO_MODE_KEY, COLOR_MODE_KEY } from "../../constants.js";
import { ColorMode } from "../../types";
import type { Config } from "../../types";

const mockVuelessConfig: Config = {};

vi.mock("../ui", () => ({ vuelessConfig: mockVuelessConfig }));

/* jsdom doesn't implement matchMedia, which theme.ts evaluates on import. */
const prefersDark = { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() };

window.matchMedia = vi.fn(() => prefersDark) as unknown as typeof window.matchMedia;

const { getTheme, getThemeCookieName, resetTheme } = await import("../theme");

function setConfig(config: Config) {
  Object.keys(mockVuelessConfig).forEach((key) => delete mockVuelessConfig[key as keyof Config]);
  Object.assign(mockVuelessConfig, config);
}

function clearCookies() {
  document.cookie.split("; ").forEach((cookie) => {
    const name = cookie.split("=")[0];

    if (name) document.cookie = `${name}=; max-age=-1; path=/`;
  });
}

beforeEach(() => {
  localStorage.clear();
  clearCookies();
  setConfig({});
});

describe("getThemeCookieName", () => {
  it("prefixes a key with the app name from package.json", () => {
    expect(getThemeCookieName(COLOR_MODE_KEY)).toBe(`vueless-${COLOR_MODE_KEY}`);
  });

  it("makes the prefix cookie-safe", () => {
    setConfig({ cookiePrefix: "@acme/Back_Office!" });

    expect(getThemeCookieName(COLOR_MODE_KEY)).toBe(`acme-back_office-${COLOR_MODE_KEY}`);
  });

  it("lets cookiePrefix override the app name", () => {
    setConfig({ cookiePrefix: "app-a" });

    expect(getThemeCookieName(COLOR_MODE_KEY)).toBe(`app-a-${COLOR_MODE_KEY}`);
  });

  it("returns the legacy name when cookiePrefix is an empty string", () => {
    setConfig({ cookiePrefix: "" });

    expect(getThemeCookieName(COLOR_MODE_KEY)).toBe(COLOR_MODE_KEY);
  });
});

describe("theme value storage", () => {
  it("writes the cookie prefixed and the localStorage key raw", () => {
    setConfig({ cookiePrefix: "app-a" });

    getTheme({ colorMode: ColorMode.Dark });

    expect(localStorage.getItem(COLOR_MODE_KEY)).toBe(ColorMode.Dark);
    expect(document.cookie).toContain(`app-a-${COLOR_MODE_KEY}=${ColorMode.Dark}`);
    expect(document.cookie.split("; ")).not.toContain(`${COLOR_MODE_KEY}=${ColorMode.Dark}`);
  });

  it("deletes the prefixed cookies on resetTheme", () => {
    setConfig({ cookiePrefix: "app-a" });

    getTheme({ colorMode: ColorMode.Dark });
    resetTheme();

    expect(localStorage.getItem(COLOR_MODE_KEY)).toBeNull();
    expect(document.cookie).not.toContain(`app-a-${COLOR_MODE_KEY}=${ColorMode.Dark}`);
  });
});

describe("CSR color mode precedence", () => {
  it("prefers the explicit mode over everything else", () => {
    localStorage.setItem(COLOR_MODE_KEY, ColorMode.Light);
    setConfig({ colorMode: ColorMode.Light });

    expect(getTheme({ colorMode: ColorMode.Dark }).colorMode).toBe(ColorMode.Dark);
  });

  it("falls back to localStorage when no mode is passed", () => {
    localStorage.setItem(COLOR_MODE_KEY, ColorMode.Dark);
    setConfig({ colorMode: ColorMode.Light });

    expect(getTheme().colorMode).toBe(ColorMode.Dark);
  });

  it("ignores cookies when localStorage is empty", () => {
    document.cookie = `${COLOR_MODE_KEY}=${ColorMode.Dark}; path=/`;
    document.cookie = `vueless-${COLOR_MODE_KEY}=${ColorMode.Dark}; path=/`;
    setConfig({ colorMode: ColorMode.Light });

    expect(getTheme().colorMode).toBe(ColorMode.Light);
  });

  it("falls back to vuelessConfig.colorMode", () => {
    setConfig({ colorMode: ColorMode.Dark });

    expect(getTheme().colorMode).toBe(ColorMode.Dark);
  });

  it("falls back to light when nothing is set", () => {
    expect(getTheme().colorMode).toBe(ColorMode.Light);
  });
});

describe("auto color mode", () => {
  it("reports auto mode from the cached localStorage flag", () => {
    localStorage.setItem(AUTO_MODE_KEY, "1");
    localStorage.setItem(COLOR_MODE_KEY, ColorMode.Dark);

    expect(getTheme().isColorModeAuto).toBe(true);
  });
});
