/* eslint-disable @typescript-eslint/no-explicit-any */

import resolveConfig from "tailwindcss/resolveConfig";

import { vuelessConfig } from "./utilUI";
import { isSSR, isCSR } from "./utilHelper";
import {
  BRAND_COLORS,
  GRAYSCALE_COLOR,
  DEFAULT_RING,
  DEFAULT_RING_OFFSET,
  DEFAULT_ROUNDING,
  DEFAULT_BRAND_COLOR,
  DEFAULT_GRAY_COLOR,
  DARK_MODE_SELECTOR,
  GRAY_COLORS,
  PX_IN_REM,
} from "../constants";

import type { Config } from "tailwindcss";
import type { ThemeVuelessConfig, GrayColors, BrandColors, VuelessCssVariables } from "../types";

interface InternalThemeVuelessConfig extends ThemeVuelessConfig {
  systemDarkMode?: boolean;
}

/**
 * Load Tailwind config from the project root.
 * Both for server and client side renderings.
 * IIFE for SSR is used to prevent top level await issue.
 */
let fullTailwindConfig: any;

if (isSSR) {
  /* Load Tailwind config from the project root in IIFE (no top-level await). */
  (async () => {
    try {
      const filePath = `${process.cwd()}/tailwind.config`;

      let tailwindConfig = (await import(/* @vite-ignore */ `${filePath}.js`)).default;

      if (!tailwindConfig) {
        tailwindConfig = (await import(/* @vite-ignore */ `${filePath}.ts`)).default;
      }

      fullTailwindConfig = resolveConfig(tailwindConfig);
    } catch {}
  })();
}

if (isCSR) {
  const tailwindConfig = Object.values(
    import.meta.glob("/tailwind.config.{js,ts}", { eager: true, import: "default" }),
  )[0] as Config;

  fullTailwindConfig = resolveConfig(tailwindConfig);
}

export function themeInit() {
  if (isSSR) return;

  const prefersColorSchemeDark = window.matchMedia("(prefers-color-scheme: dark)");

  setTheme({ systemDarkMode: prefersColorSchemeDark.matches });

  prefersColorSchemeDark.addEventListener("change", (event) =>
    setTheme({ systemDarkMode: event.matches }),
  );
}

export function setTheme(config: InternalThemeVuelessConfig = {}) {
  const isDarkMode = setDarkMode(config);
  const ring = config?.ring ?? vuelessConfig.ring ?? DEFAULT_RING;
  const ringOffset = config?.ringOffset ?? vuelessConfig.ringOffset ?? DEFAULT_RING_OFFSET;
  const rounding = config?.rounding ?? vuelessConfig.rounding ?? DEFAULT_ROUNDING;
  let brand: BrandColors | GrayColors = config?.brand ?? vuelessConfig.brand ?? DEFAULT_BRAND_COLOR;
  const gray = config?.gray ?? vuelessConfig.gray ?? DEFAULT_GRAY_COLOR;

  const colors = fullTailwindConfig.theme.colors;
  const isBrandColor = BRAND_COLORS.some((color) => color === brand);
  const isGrayColor = GRAY_COLORS.some((color) => color === gray);

  if (!isBrandColor) {
    // eslint-disable-next-line no-console
    console.warn(`Brand color '${brand}' is incorrect.`);
  }

  if (!isGrayColor) {
    // eslint-disable-next-line no-console
    console.warn(`Gray color '${gray}' is incorrect.`);
  }

  const defaultBrandShade = isDarkMode ? 400 : 600;
  const defaultGrayShade = isDarkMode ? 400 : 600;

  if (brand === GRAYSCALE_COLOR) {
    brand = gray;
  }

  const variables: Partial<VuelessCssVariables> = {
    "--vl-ring": `${ring}px`,
    "--vl-ring-offset": `${ringOffset}px`,
    "--vl-rounding": `${Number(rounding) / PX_IN_REM}rem`,
    "--vl-color-gray-default": convertHexInRgb(colors[gray][defaultBrandShade]),
    "--vl-color-brand-default": convertHexInRgb(colors[brand][defaultGrayShade]),
  };

  for (const key in colors[gray]) {
    variables[`--vl-color-gray-${key}` as keyof VuelessCssVariables] = convertHexInRgb(
      colors[gray][key],
    );
  }

  for (const key in colors[brand]) {
    variables[`--vl-color-brand-${key}` as keyof VuelessCssVariables] = convertHexInRgb(
      colors[brand][key],
    );
  }

  const stringVariables = Object.entries(variables)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");

  const rootVariables = `:root {${stringVariables}`;

  if (isCSR) {
    const style = document.createElement("style");

    style.innerHTML = rootVariables;
    document.head.appendChild(style);
  }

  return rootVariables;
}

function setDarkMode(config: InternalThemeVuelessConfig) {
  config?.darkMode === undefined
    ? isCSR && localStorage.removeItem(DARK_MODE_SELECTOR)
    : isCSR && localStorage.setItem(DARK_MODE_SELECTOR, Number(config?.darkMode).toString());

  const storedDarkMode = isCSR ? localStorage.getItem(DARK_MODE_SELECTOR) : null;

  const isDarkMode =
    storedDarkMode !== null
      ? !!Number(storedDarkMode)
      : !!(config?.darkMode ?? vuelessConfig.darkMode ?? config?.systemDarkMode);

  isDarkMode
    ? isCSR && document.documentElement.classList.add(DARK_MODE_SELECTOR)
    : isCSR && document.documentElement.classList.remove(DARK_MODE_SELECTOR);

  return isDarkMode;
}

export function convertHexInRgb(hex: string) {
  const color = hex.replace(/#/g, "");

  let r, g, b;

  if (color.length === 6) {
    r = parseInt(color.substring(0, 2), 16);
    g = parseInt(color.substring(2, 4), 16);
    b = parseInt(color.substring(4, 6), 16);
  }

  if (color.length === 3) {
    r = parseInt(color.substring(0, 1).repeat(2), 16);
    g = parseInt(color.substring(1, 2).repeat(2), 16);
    b = parseInt(color.substring(2, 3).repeat(2), 16);
  }

  return color.length === 6 || color.length === 3 ? `${r}, ${g}, ${b}` : "";
}
