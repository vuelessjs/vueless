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
  DEFAULT_ROUNDING_SM,
  DEFAULT_ROUNDING,
  DEFAULT_ROUNDING_LG,
  DEFAULT_BRAND_COLOR,
  DEFAULT_GRAY_COLOR,
  DEFAULT_RING_OFFSET_COLOR_LIGHT,
  DEFAULT_RING_OFFSET_COLOR_DARK,
  DARK_MODE_SELECTOR,
  GRAY_COLORS,
  PX_IN_REM,
  COOL_COLOR,
  GRAY_COLOR,
  LIGHT_MODE_SELECTOR,
  COLOR_MODE_KEY,
} from "../constants.js";

import type {
  GrayColors,
  BrandColors,
  VuelessCssVariables,
  TailwindColorShades,
  Config,
} from "../types.ts";

import { ColorMode } from "../types.ts";

type DefaultColors = typeof tailwindColors;

export function themeInit() {
  if (isSSR) return;

  setTheme();

  const prefersColorSchemeDark = window.matchMedia("(prefers-color-scheme: dark)");

  prefersColorSchemeDark.addEventListener("change", (event) => {
    const colorMode = vuelessConfig?.colorMode || event.matches ? ColorMode.Dark : ColorMode.Light;

    setTheme({ colorMode });
  });
}

export function setColorMode(colorMode: `${ColorMode}`) {
  const cashedColorMode = localStorage.getItem(COLOR_MODE_KEY) as ColorMode | null;

  const isDark = colorMode === ColorMode.Dark;
  const isLight = colorMode === ColorMode.Light;
  const isAuto = colorMode === ColorMode.Auto;

  let newColorMode = ColorMode.Auto;

  if (isAuto) {
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    newColorMode = isSystemDark ? ColorMode.Dark : ColorMode.Light;
  }

  if (cashedColorMode !== null) {
    newColorMode = cashedColorMode;
  }

  if (isLight) {
    newColorMode = ColorMode.Light;
  }

  if (isDark) {
    newColorMode = ColorMode.Dark;
  }

  const darkModeChangeEvent = new CustomEvent("darkModeChange", {
    detail: newColorMode === ColorMode.Dark,
  });

  if (isSSR) return;

  if (newColorMode === ColorMode.Dark) {
    document.documentElement.classList.remove(LIGHT_MODE_SELECTOR);
    document.documentElement.classList.add(DARK_MODE_SELECTOR);
  } else {
    document.documentElement.classList.remove(DARK_MODE_SELECTOR);
    document.documentElement.classList.add(LIGHT_MODE_SELECTOR);
  }

  window.dispatchEvent(darkModeChangeEvent);

  if (!isAuto) {
    localStorage.setItem(COLOR_MODE_KEY, newColorMode);
  }
}

export function setTheme(config: Config = {}) {
  setColorMode(vuelessConfig?.colorMode || config?.colorMode || ColorMode.Auto);

  const roundingSm = config?.roundingSm ?? vuelessConfig?.roundingSm ?? DEFAULT_ROUNDING_SM;
  const rounding = config?.rounding ?? vuelessConfig.rounding ?? DEFAULT_ROUNDING;
  const roundingLg = config?.roundingLg ?? vuelessConfig?.roundingLg ?? DEFAULT_ROUNDING_LG;
  const isDarkMode = document.documentElement.classList.contains(DARK_MODE_SELECTOR);

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
    "--vl-rounding-sm": `${Number(roundingSm) / PX_IN_REM}rem`,
    "--vl-rounding": `${Number(rounding) / PX_IN_REM}rem`,
    "--vl-rounding-lg": `${Number(roundingLg) / PX_IN_REM}rem`,
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
