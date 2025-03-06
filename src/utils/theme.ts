import { vuelessConfig } from "./ui.ts";
import { isSSR, isCSR } from "./helper.ts";
import {
  PX_IN_REM,
  COLOR_MODE_KEY,
  LIGHT_MODE_SELECTOR,
  DARK_MODE_SELECTOR,
  GRAYSCALE_COLOR,
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_NEUTRAL_COLOR,
  DEFAULT_OUTLINE,
  OUTLINE_DECREMENT,
  OUTLINE_INCREMENT,
  DEFAULT_ROUNDING,
  ROUNDING_DECREMENT,
  ROUNDING_INCREMENT,
  NEUTRAL_COLOR,
  PRIMARY_COLOR,
  COLOR_SHADES,
  DEFAULT_LIGHT_THEME,
  DEFAULT_DARK_THEME,
  PRIMARY_COLORS,
  NEUTRAL_COLORS,
  DEFAULT_FONT_SIZE,
  FONT_SIZE_INCREMENT,
  FONT_SIZE_DECREMENT,
} from "../constants.js";

import type { Config, NeutralColors, PrimaryColors, VuelessCssVariables } from "../types.ts";
import { ColorMode } from "../types.ts";

declare interface RootCSSVariableOptions {
  primary: PrimaryColors | string;
  neutral: NeutralColors | string;
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
 * Get selected primary color from the local storage.
 * @returns string | undefined
 */
export function getSelectedPrimaryColor() {
  return (isCSR && localStorage.getItem(PRIMARY_COLOR)) || undefined;
}

/**
 * Get selected neutral color from the local storage.
 * @return string | undefined
 */
export function getSelectedNeutralColor() {
  return (isCSR && localStorage.getItem(NEUTRAL_COLOR)) || undefined;
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

  let primary: PrimaryColors =
    config.primary ?? getSelectedPrimaryColor() ?? vuelessConfig.primary ?? DEFAULT_PRIMARY_COLOR;

  let neutral: NeutralColors =
    config.neutral ?? getSelectedNeutralColor() ?? vuelessConfig.neutral ?? DEFAULT_NEUTRAL_COLOR;

  const isPrimaryColor =
    PRIMARY_COLORS.some((color) => color === primary) || primary === GRAYSCALE_COLOR;
  const isNeutralColor = NEUTRAL_COLORS.some((color) => color === neutral);

  if (!isPrimaryColor) {
    // eslint-disable-next-line no-console
    console.warn(`The primary color '${primary}' is missing in your palette.`);

    primary = DEFAULT_PRIMARY_COLOR;
  }

  if (!isNeutralColor) {
    // eslint-disable-next-line no-console
    console.warn(`The neutral color '${neutral}' is missing in your palette.`);

    neutral = DEFAULT_NEUTRAL_COLOR;
  }

  isCSR && localStorage.setItem(PRIMARY_COLOR, primary);
  isCSR && localStorage.setItem(NEUTRAL_COLOR, neutral);

  return setRootCSSVariables({
    primary,
    neutral,
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
  if (options.primary === GRAYSCALE_COLOR) {
    options.primary = options.neutral;
  }

  const {
    primary,
    neutral,
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
    variables[`--vl-${PRIMARY_COLOR}-${shade}` as keyof VuelessCssVariables] =
      `var(--color-${primary}-${shade})`;
  }

  for (const shade of COLOR_SHADES) {
    variables[`--vl-${NEUTRAL_COLOR}-${shade}` as keyof VuelessCssVariables] =
      `var(--color-${neutral}-${shade})`;
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
