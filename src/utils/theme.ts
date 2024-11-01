import { merge } from "lodash-es";
import tailwindColors from "tailwindcss/colors.js";

import { tailwindConfig } from "./tailwindConfig.ts";
import { vuelessConfig } from "./ui.ts";
import { isSSR, isCSR } from "./helper.ts";
import {
  BRAND_COLORS,
  GRAYSCALE_COLOR,
  DEFAULT_RING,
  DEFAULT_RING_OFFSET,
  DEFAULT_ROUNDING,
  DEFAULT_BRAND_COLOR,
  DEFAULT_GRAY_COLOR,
  DEFAULT_RING_OFFSET_COLOR_LIGHT,
  DEFAULT_RING_OFFSET_COLOR_DARK,
  DARK_MODE_SELECTOR,
  GRAY_COLORS,
  PX_IN_REM,
  COOL_COLOR,
  GRAY_COLOR,
} from "../constants.js";

import type {
  ThemeConfig,
  GrayColors,
  BrandColors,
  VuelessCssVariables,
  TailwindColorShades,
} from "../types.ts";

type DefaultColors = typeof tailwindColors;

interface InternalThemeConfig extends ThemeConfig {
  systemDarkMode?: boolean;
}

export function themeInit() {
  if (isSSR) return;

  const prefersColorSchemeDark = window.matchMedia("(prefers-color-scheme: dark)");

  setTheme({ systemDarkMode: prefersColorSchemeDark.matches });

  prefersColorSchemeDark.addEventListener("change", (event) =>
    setTheme({ systemDarkMode: event.matches }),
  );
}

export function setTheme(config: InternalThemeConfig = {}) {
  const isDarkMode = setDarkMode(config);
  const rounding = config?.rounding ?? vuelessConfig.rounding ?? DEFAULT_ROUNDING;

  let brand: BrandColors | GrayColors | typeof GRAY_COLOR =
    config?.brand ?? vuelessConfig.brand ?? DEFAULT_BRAND_COLOR;

  let gray: GrayColors | typeof GRAY_COLOR =
    config?.gray ?? vuelessConfig.gray ?? DEFAULT_GRAY_COLOR;

  const ring = config?.ring ?? vuelessConfig.ring ?? DEFAULT_RING;
  const ringOffset = config?.ringOffset ?? vuelessConfig.ringOffset ?? DEFAULT_RING_OFFSET;

  const ringOffsetColorDark =
    config?.ringOffsetColorDark ??
    vuelessConfig.ringOffsetColorDark ??
    DEFAULT_RING_OFFSET_COLOR_DARK;

  const ringOffsetColorLight =
    config?.ringOffsetColorLight ??
    vuelessConfig.ringOffsetColorLight ??
    DEFAULT_RING_OFFSET_COLOR_LIGHT;

  const isBrandColor = [...BRAND_COLORS, GRAYSCALE_COLOR].some((color) => color === brand);
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
  const defaultRingOffsetColor = isDarkMode ? ringOffsetColorDark : ringOffsetColorLight;

  if (gray === COOL_COLOR) {
    gray = GRAY_COLOR;
  }

  if (brand === GRAYSCALE_COLOR) {
    brand = gray;
  }

  const colors: DefaultColors = merge(tailwindColors, tailwindConfig?.theme?.extend?.colors || {});

  const variables: Partial<VuelessCssVariables> = {
    "--vl-rounding": `${Number(rounding) / PX_IN_REM}rem`,
    "--vl-ring": `${ring}px`,
    "--vl-ring-offset": `${ringOffset}px`,
    "--vl-ring-offset-color": convertHexInRgb(defaultRingOffsetColor),
    "--vl-color-gray-default": convertHexInRgb(colors[gray][defaultBrandShade]),
    "--vl-color-brand-default": convertHexInRgb(colors[brand][defaultGrayShade]),
  };

  for (const key in colors[gray]) {
    const shade = key as unknown as keyof TailwindColorShades;

    variables[`--vl-color-gray-${key}` as keyof VuelessCssVariables] = convertHexInRgb(
      colors[gray][shade],
    );
  }

  for (const key in colors[brand]) {
    const shade = key as unknown as keyof TailwindColorShades;

    variables[`--vl-color-brand-${key}` as keyof VuelessCssVariables] = convertHexInRgb(
      colors[brand][shade],
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

function setDarkMode(config: InternalThemeConfig) {
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
