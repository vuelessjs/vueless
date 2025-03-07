import { merge } from "lodash-es";

import { tailwindConfig } from "./tailwindConfig.ts";
import { vuelessConfig } from "./ui.ts";
import { isSSR, isCSR } from "./helper.ts";
import {
  PX_IN_REM,
  COLOR_MODE_KEY,
  LIGHT_MODE_SELECTOR,
  DARK_MODE_SELECTOR,
  GRAYSCALE_COLOR,
  TAILWIND_COLORS,
  DEFAULT_BRAND_COLOR,
  DEFAULT_GRAY_COLOR,
  DEFAULT_OUTLINE,
  OUTLINE_DECREMENT,
  OUTLINE_INCREMENT,
  DEFAULT_ROUNDING,
  ROUNDING_DECREMENT,
  ROUNDING_INCREMENT,
} from "../constants.js";

import type {
  GrayColors,
  BrandColors,
  VuelessCssVariables,
  TailwindColorShades,
  Config,
} from "../types.ts";

import { ColorMode } from "../types.ts";

type DefaultColors = typeof TAILWIND_COLORS;

interface Colors extends DefaultColors {
  [key: string]: Partial<TailwindColorShades> | string;
}

declare interface RootCSSVariableOptions {
  colors: Colors;
  brand: string;
  gray: string;
  outlineSm: number;
  outline: number;
  outlineLg: number;
  roundingSm: number;
  rounding: number;
  roundingLg: number;
}

export function themeInit() {
  if (isSSR) return;

  setTheme();

  if (vuelessConfig.colorMode === ColorMode.Auto) {
    const prefersColorSchemeDark = window.matchMedia("(prefers-color-scheme: dark)");

    prefersColorSchemeDark.addEventListener("change", (event) => {
      setTheme({ colorMode: event.matches ? ColorMode.Dark : ColorMode.Light });
    });
  }
}

export function setColorMode(colorMode: `${ColorMode}`) {
  const cashedColorMode = isCSR ? (localStorage.getItem(COLOR_MODE_KEY) as ColorMode | null) : null;

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

export function getSelectedBrandColor() {
  return (isCSR && localStorage.getItem("brand")) || undefined;
}

export function getSelectedGrayColor() {
  return (isCSR && localStorage.getItem("gray")) || undefined;
}

export function convertHexInRgb(hex?: string) {
  if (!hex) return;

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

export function setTheme(config: Config = {}) {
  setColorMode(vuelessConfig.colorMode || config.colorMode || ColorMode.Light);

  const { roundingSm, rounding, roundingLg } = getRoundings(
    config.roundingSm ?? vuelessConfig.roundingSm,
    config.rounding ?? vuelessConfig.rounding,
    config.roundingLg ?? vuelessConfig.roundingLg,
  );

  let brand: BrandColors =
    config.brand ?? getSelectedBrandColor() ?? vuelessConfig.brand ?? DEFAULT_BRAND_COLOR;

  let gray: GrayColors =
    config.gray ?? getSelectedGrayColor() ?? vuelessConfig.gray ?? DEFAULT_GRAY_COLOR;

  const { outlineSm, outline, outlineLg } = getRings(
    config.outlineSm ?? vuelessConfig.outlineSm,
    config.outline ?? vuelessConfig.outline,
    config.outlineLg ?? vuelessConfig.outlineLg,
  );

  const colors: Colors = merge(
    TAILWIND_COLORS as Colors,
    tailwindConfig?.theme?.extend?.colors || {},
    vuelessConfig.tailwindTheme?.extend?.colors || {},
  );

  const projectColors = Object.keys(colors);
  const isBrandColor = projectColors.some((color) => color === brand) || brand === GRAYSCALE_COLOR;
  const isGrayColor = projectColors.some((color) => color === gray);

  if (!isBrandColor) {
    // eslint-disable-next-line no-console
    console.warn(`The brand color '${brand}' is missing in your palette.`);

    brand = DEFAULT_BRAND_COLOR;
  }

  if (!isGrayColor) {
    // eslint-disable-next-line no-console
    console.warn(`The gray color '${gray}' is missing in your palette.`);

    gray = DEFAULT_GRAY_COLOR;
  }

  isCSR && localStorage.setItem("brand", brand);
  isCSR && localStorage.setItem("gray", gray);

  return setRootCSSVariables({
    colors,
    brand,
    gray,
    outlineSm,
    outline,
    outlineLg,
    roundingSm,
    rounding,
    roundingLg,
  });
}

function getRings(sm?: number, md?: number, lg?: number) {
  const outline = Math.max(0, md ?? DEFAULT_OUTLINE);
  const outlineSm = Math.max(0, outline - OUTLINE_DECREMENT);
  let outlineLg = Math.max(0, outline + OUTLINE_INCREMENT);

  if (outline === 0) {
    outlineLg = 0;
  }

  return {
    outline,
    outlineSm: sm === undefined ? outlineSm : Math.max(0, sm),
    outlineLg: lg === undefined ? outlineLg : Math.max(0, lg),
  };
}

function getRoundings(sm?: number, md?: number, lg?: number) {
  const rounding = Math.max(0, md ?? DEFAULT_ROUNDING);
  let roundingSm = Math.max(0, rounding - ROUNDING_DECREMENT);
  let roundingLg = Math.max(0, rounding + ROUNDING_INCREMENT);

  if (rounding === ROUNDING_INCREMENT) {
    roundingSm = ROUNDING_DECREMENT;
  }

  if (rounding === ROUNDING_DECREMENT) {
    roundingSm = ROUNDING_INCREMENT - ROUNDING_DECREMENT;
  }

  if (rounding === 0) {
    roundingLg = ROUNDING_INCREMENT - ROUNDING_DECREMENT;
  }

  return {
    rounding,
    roundingSm: sm === undefined ? roundingSm : Math.max(0, sm),
    roundingLg: lg === undefined ? roundingLg : Math.max(0, lg),
  };
}

function setRootCSSVariables(options: RootCSSVariableOptions) {
  if (options.brand === GRAYSCALE_COLOR) {
    options.brand = options.gray;
  }

  const { colors, brand, gray, outlineSm, outline, outlineLg, roundingSm, rounding, roundingLg } =
    options;

  const isDarkMode = isCSR && document.documentElement.classList.contains(DARK_MODE_SELECTOR);
  const defaultBrandShade = isDarkMode ? 400 : 600;
  const defaultGrayShade = isDarkMode ? 400 : 600;

  const variables: Partial<VuelessCssVariables> = {
    "--vl-rounding-sm": `${Number(roundingSm) / PX_IN_REM}rem`,
    "--vl-rounding": `${Number(rounding) / PX_IN_REM}rem`,
    "--vl-rounding-lg": `${Number(roundingLg) / PX_IN_REM}rem`,
    "--vl-outline-sm": `${outlineSm}px`,
    "--vl-outline": `${outline}px`,
    "--vl-outline-lg": `${outlineLg}px`,
    "--vl-color-gray-default": convertHexInRgb(colors[gray]?.[defaultBrandShade]),
    "--vl-color-brand-default": convertHexInRgb(colors[brand]?.[defaultGrayShade]),
  };

  for (const key in colors[gray] as TailwindColorShades) {
    const shade = key as unknown as keyof TailwindColorShades;

    variables[`--vl-color-gray-${key}` as keyof VuelessCssVariables] = convertHexInRgb(
      colors[gray]?.[shade],
    );
  }

  for (const key in colors[brand] as TailwindColorShades) {
    const shade = key as unknown as keyof TailwindColorShades;

    variables[`--vl-color-brand-${key}` as keyof VuelessCssVariables] = convertHexInRgb(
      colors[brand]?.[shade],
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
