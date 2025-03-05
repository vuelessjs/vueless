import { vuelessConfig } from "./ui.ts";
import { isSSR, isCSR } from "./helper.ts";
import {
  PX_IN_REM,
  COLOR_MODE_KEY,
  LIGHT_MODE_SELECTOR,
  DARK_MODE_SELECTOR,
  GRAYSCALE_COLOR,
  DEFAULT_BRAND_COLOR,
  DEFAULT_GRAY_COLOR,
  DEFAULT_OUTLINE,
  OUTLINE_DECREMENT,
  OUTLINE_INCREMENT,
  DEFAULT_ROUNDING,
  ROUNDING_DECREMENT,
  ROUNDING_INCREMENT,
  BRAND_COLOR,
  COLOR_SHADES,
  DEFAULT_LIGHT_THEME,
  DEFAULT_DARK_THEME,
  BRAND_COLORS,
  GRAYSCALE_COLORS,
  DEFAULT_FONT_SIZE,
  FONT_SIZE_INCREMENT,
  FONT_SIZE_DECREMENT,
} from "../constants.js";

import type { Config, GrayColors, BrandColors, VuelessCssVariables } from "../types.ts";
import { ColorMode } from "../types.ts";

declare interface RootCSSVariableOptions {
  brand: BrandColors | string;
  gray: GrayColors | string;
  outlineSm: number;
  outline: number;
  outlineLg: number;
  roundingSm: number;
  rounding: number;
  roundingLg: number;
  fontSizeSm: number;
  fontSize: number;
  fontSizeLg: number;
}

/**
 * Initiate theme and changes color mode when it is changed on the user side.
 */
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

/**
 * Sets color mode.
 * @param {string} colorMode (dark | light | auto)
 */
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

/**
 * Get selected brand color from the local storage.
 * @returns string | undefined
 */
export function getSelectedBrandColor() {
  return (isCSR && localStorage.getItem("brand")) || undefined;
}

/**
 * Get selected gray color from the local storage.
 * @return string | undefined
 */
export function getSelectedGrayColor() {
  return (isCSR && localStorage.getItem("gray")) || undefined;
}

/**
 * Applying theme settings.
 * Changes and reset Vueless CSS variables.
 * @return string - CSS variables
 */
export function setTheme(config: Config = {}) {
  setColorMode(vuelessConfig.colorMode || config.colorMode || ColorMode.Light);

  const { roundingSm, rounding, roundingLg } = getRoundings(
    config.roundingSm ?? vuelessConfig.roundingSm,
    config.rounding ?? vuelessConfig.rounding,
    config.roundingLg ?? vuelessConfig.roundingLg,
  );

  const { outlineSm, outline, outlineLg } = getRings(
    config.outlineSm ?? vuelessConfig.outlineSm,
    config.outline ?? vuelessConfig.outline,
    config.outlineLg ?? vuelessConfig.outlineLg,
  );

  const { fontSizeSm, fontSize, fontSizeLg } = getFontSize(
    config.fontSizeSm ?? vuelessConfig.fontSizeSm,
    config.fontSize ?? vuelessConfig.fontSize,
    config.fontSizeLg ?? vuelessConfig.fontSizeLg,
  );

  let brand: BrandColors =
    config.brand ?? getSelectedBrandColor() ?? vuelessConfig.brand ?? DEFAULT_BRAND_COLOR;

  let gray: GrayColors =
    config.gray ?? getSelectedGrayColor() ?? vuelessConfig.gray ?? DEFAULT_GRAY_COLOR;

  const isBrandColor = BRAND_COLORS.some((color) => color === brand) || brand === GRAYSCALE_COLOR;
  const isGrayColor = GRAYSCALE_COLORS.some((color) => color === gray);

  if (!isBrandColor) {
    // eslint-disable-next-line no-console
    console.warn(`The brand color '${brand}' is missing in your palette.`);

    brand = DEFAULT_BRAND_COLOR;
  }

  // TODO: Should be removed after all components migration into custom vueless theme variables.
  if (!isGrayColor) {
    // eslint-disable-next-line no-console
    console.warn(`The gray color '${gray}' is missing in your palette.`);

    gray = DEFAULT_GRAY_COLOR;
  }

  isCSR && localStorage.setItem("brand", brand);
  isCSR && localStorage.setItem("gray", gray);

  return setRootCSSVariables({
    brand,
    gray,
    outlineSm,
    outline,
    outlineLg,
    roundingSm,
    rounding,
    roundingLg,
    fontSizeSm,
    fontSize,
    fontSizeLg,
  });
}

/**
 * Calculate ring values.
 * @return object - sm, md, lg ring values.
 */
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

/**
 * Calculate ring values.
 * @return object - sm, md, lg ring values.
 */
function getFontSize(sm?: number, md?: number, lg?: number) {
  const fontSize = Math.max(0, md ?? DEFAULT_FONT_SIZE);
  const fontSizeSm = Math.max(0, fontSize - FONT_SIZE_DECREMENT);
  const fontSizeLg = Math.max(0, fontSize + FONT_SIZE_INCREMENT);

  return {
    fontSize,
    fontSizeSm: sm === undefined ? fontSizeSm : Math.max(0, sm),
    fontSizeLg: lg === undefined ? fontSizeLg : Math.max(0, lg),
  };
}

/**
 * Calculate rounding values.
 * @return object - sm, md, lg rounding values.
 */
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

/**
 * Generate and apply Vueless CSS variables.
 * @return string - Vueless CSS variables string.
 */
function setRootCSSVariables(options: RootCSSVariableOptions) {
  if (options.brand === GRAYSCALE_COLOR) {
    options.brand = options.gray;
  }

  const {
    brand,
    gray,
    outlineSm,
    outline,
    outlineLg,
    roundingSm,
    rounding,
    roundingLg,
    fontSizeSm,
    fontSize,
    fontSizeLg,
  } = options;

  let darkVariables: Partial<VuelessCssVariables> = {};

  let variables: Partial<VuelessCssVariables> = {
    "--vl-radius-sm": `${Number(roundingSm) / PX_IN_REM}rem`,
    "--vl-radius-md": `${Number(rounding) / PX_IN_REM}rem`,
    "--vl-radius-lg": `${Number(roundingLg) / PX_IN_REM}rem`,
    "--vl-outline-sm": `${outlineSm}px`,
    "--vl-outline-md": `${outline}px`,
    "--vl-outline-lg": `${outlineLg}px`,
    "--vl-text-sm": `${fontSizeSm}px`,
    "--vl-text-md": `${fontSize}px`,
    "--vl-text-lg": `${fontSizeLg}px`,
  };

  for (const shade of COLOR_SHADES) {
    variables[`--vl-${BRAND_COLOR}-${shade}` as keyof VuelessCssVariables] =
      `var(--color-${brand}-${shade})`;
  }

  for (const shade of COLOR_SHADES) {
    variables[`--vl-${GRAYSCALE_COLOR}-${shade}` as keyof VuelessCssVariables] =
      `var(--color-${gray}-${shade})`;
  }

  const [light, dark] = generateCSSColorVariables();

  variables = { ...variables, ...light };
  darkVariables = { ...darkVariables, ...dark };

  return setCSSVariables(variables, darkVariables);
}

/**
 * Generate CSS color variables.
 * @return string - Vueless color CSS variables.
 */
function generateCSSColorVariables() {
  const variables: Partial<VuelessCssVariables> = {};
  const darkVariables: Partial<VuelessCssVariables> = {};

  Object.entries(DEFAULT_LIGHT_THEME).forEach(([vuelessVariable, color]) => {
    const variable = vuelessVariable as keyof VuelessCssVariables;
    const lightColor = vuelessConfig.lightTheme?.[variable] || color;

    variables[variable] = lightColor.startsWith("--") ? `var(${lightColor})` : lightColor;
  });

  Object.entries(DEFAULT_DARK_THEME).forEach(([vuelessVariable, color]) => {
    const variable = vuelessVariable as keyof VuelessCssVariables;
    const darkColor = vuelessConfig.darkTheme?.[variable] || color;

    darkVariables[variable] = darkColor.startsWith("--") ? `var(${darkColor})` : darkColor;
  });

  return [variables, darkVariables];
}

/**
 * Converts CSS variables object into strings and apply them.
 * @return string - Vueless CSS variables.
 */
function setCSSVariables(
  variables: Partial<VuelessCssVariables>,
  darkVariables: Partial<VuelessCssVariables>,
) {
  const variablesString = Object.entries(variables)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");

  const darkVariablesString = Object.entries(darkVariables)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");

  const rootVariables = `
    :root {${variablesString}}
    .${DARK_MODE_SELECTOR} {${darkVariablesString}}
  `;

  if (isCSR) {
    const style = document.createElement("style");

    style.innerHTML = rootVariables;
    document.head.appendChild(style);
  }

  return rootVariables;
}
