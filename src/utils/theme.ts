import { merge } from "lodash-es";

import { vuelessConfig } from "./ui.ts";
import { isCSR } from "./helper.ts";

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
  fontSizeXs: number;
  fontSizeSm: number;
  fontSize: number;
  fontSizeLg: number;
  lightTheme: Partial<VuelessCssVariables>;
  darkTheme: Partial<VuelessCssVariables>;
}

/**
 * Cookie helper functions
 */
function setCookie(name: string, value: string, days = 365) {
  const expires = new Date();

  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;samesite=lax`;
}

function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }

  return null;
}

/**
 * Initiate theme and changes color mode when it is changed on the user side.
 */
export function themeInit() {
  const isSystemModeCookie = isCSR && getCookie("is-system-mode");

  if (isSystemModeCookie === "true") {
    setTheme({ colorMode: ColorMode.Auto }, "true");
  }
}

// Creates a media query that checks if the user's system is set to dark mode
const mediaQuery = isCSR && window.matchMedia("(prefers-color-scheme: dark)");

// Toggles dark and light mode classes on the <html> element to reflect system preference
function systemThemeListener() {
  if (!mediaQuery) return;

  document.documentElement.classList.toggle(DARK_MODE_SELECTOR, mediaQuery.matches);
  document.documentElement.classList.toggle(LIGHT_MODE_SELECTOR, !mediaQuery.matches);
}

/**
 * Sets color mode.
 * @param {string} colorMode (dark | light | auto)
 */
export function setColorMode(colorMode: `${ColorMode}`, isSystemMode: string) {
  if (!isCSR) return;

  mediaQuery && mediaQuery.removeEventListener("change", systemThemeListener);

  const isDark =
    colorMode === ColorMode.Dark ||
    (colorMode === ColorMode.Auto && window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.documentElement.classList.toggle(DARK_MODE_SELECTOR, isDark);
  document.documentElement.classList.toggle(LIGHT_MODE_SELECTOR, !isDark);

  window.dispatchEvent(new CustomEvent("darkModeChange", { detail: isDark }));

  let newColorMode: string;
  let shouldAttachListener = false;

  if (colorMode === ColorMode.Auto) {
    newColorMode = isDark ? ColorMode.Dark : ColorMode.Light;
    isSystemMode = "true";
    shouldAttachListener = true;
  } else {
    newColorMode = colorMode;
  }

  setCookie(COLOR_MODE_KEY, newColorMode);

  if (isSystemMode) {
    setCookie("is-system-mode", isSystemMode);
  }

  if (shouldAttachListener) {
    mediaQuery && mediaQuery.addEventListener("change", systemThemeListener);
  }
}

/**
 * Retrieves CSS variable value to be easily used in the JS.
 * @return string.
 */
export function cssVar(name: string) {
  return (isCSR && getComputedStyle(document.documentElement).getPropertyValue(name)) || undefined;
}

/**
 * Get selected primary color from cookies.
 * @returns string | undefined
 */
export function getSelectedPrimaryColor() {
  return isCSR ? getCookie(PRIMARY_COLOR) : undefined;
}

/**
 * Get selected neutral color from cookies.
 * @return string | undefined
 */
export function getSelectedNeutralColor() {
  return isCSR ? getCookie(NEUTRAL_COLOR) : undefined;
}

/**
 * Applying theme settings.
 * Changes and reset Vueless CSS variables.
 * @return string - CSS variables
 */
export function setTheme(config: Config = {}, isSystemMode: string) {
  const colorModeCookie = isCSR && getCookie(COLOR_MODE_KEY);

  const colorMode: ColorMode = (config.colorMode ||
    colorModeCookie ||
    vuelessConfig.colorMode) as ColorMode;

  setColorMode(colorMode, isSystemMode);

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

  const { fontSizeXs, fontSizeSm, fontSize, fontSizeLg } = getFontSize(
    config.fontSizeXs ?? vuelessConfig.fontSizeXs,
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

  if (isCSR && config.primary) setCookie(PRIMARY_COLOR, primary);
  if (isCSR && config.neutral) setCookie(NEUTRAL_COLOR, neutral);

  const lightTheme = merge({}, DEFAULT_LIGHT_THEME, vuelessConfig.lightTheme, config.lightTheme);
  const darkTheme = merge({}, DEFAULT_DARK_THEME, vuelessConfig.darkTheme, config.darkTheme);

  /* Redeclare primary color if grayscale color set as default */
  if (primary === GRAYSCALE_COLOR) {
    primary = neutral;

    ["", "lifted", "accented"].forEach((shade) => {
      const primaryShade: keyof VuelessCssVariables = shade
        ? `--vl-primary-${shade}`
        : "--vl-primary";

      const grayscaleShade: keyof VuelessCssVariables = shade
        ? `--vl-grayscale-${shade}`
        : "--vl-grayscale";

      if (!vuelessConfig.darkTheme?.[primaryShade] && !config.darkTheme?.[primaryShade]) {
        darkTheme[primaryShade] = darkTheme[grayscaleShade];
      }

      if (!vuelessConfig.lightTheme?.[primaryShade] && !config.lightTheme?.[primaryShade]) {
        lightTheme[primaryShade] = lightTheme[grayscaleShade];
      }
    });
  }

  return setRootCSSVariables({
    primary,
    neutral,
    outlineSm,
    outline,
    outlineLg,
    roundingSm,
    rounding,
    roundingLg,
    fontSizeXs,
    fontSizeSm,
    fontSize,
    fontSizeLg,
    lightTheme,
    darkTheme,
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
function getFontSize(xs?: number, sm?: number, md?: number, lg?: number) {
  const fontSize = Math.max(0, md ?? DEFAULT_FONT_SIZE);
  const fontSizeXs = Math.max(0, fontSize - FONT_SIZE_DECREMENT * 2);
  const fontSizeSm = Math.max(0, fontSize - FONT_SIZE_DECREMENT);
  const fontSizeLg = Math.max(0, fontSize + FONT_SIZE_INCREMENT);

  return {
    fontSize,
    fontSizeXs: xs === undefined ? fontSizeXs : Math.max(0, xs),
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
  const {
    primary,
    neutral,
    outlineSm,
    outline,
    outlineLg,
    roundingSm,
    rounding,
    roundingLg,
    fontSizeXs,
    fontSizeSm,
    fontSize,
    fontSizeLg,
    lightTheme,
    darkTheme,
  } = options;

  let darkVariables: Partial<VuelessCssVariables> = {};

  let variables: Partial<VuelessCssVariables> = {
    "--vl-rounding-sm": `${Number(roundingSm) / PX_IN_REM}rem`,
    "--vl-rounding-md": `${Number(rounding) / PX_IN_REM}rem`,
    "--vl-rounding-lg": `${Number(roundingLg) / PX_IN_REM}rem`,
    "--vl-outline-sm": `${outlineSm}px`,
    "--vl-outline-md": `${outline}px`,
    "--vl-outline-lg": `${outlineLg}px`,
    "--vl-text-xs": `${Number(fontSizeXs) / PX_IN_REM}rem`,
    "--vl-text-sm": `${Number(fontSizeSm) / PX_IN_REM}rem`,
    "--vl-text-md": `${Number(fontSize) / PX_IN_REM}rem`,
    "--vl-text-lg": `${Number(fontSizeLg) / PX_IN_REM}rem`,
  };

  for (const shade of COLOR_SHADES) {
    variables[`--vl-${PRIMARY_COLOR}-${shade}` as keyof VuelessCssVariables] =
      `var(--color-${primary}-${shade})`;
  }

  for (const shade of COLOR_SHADES) {
    variables[`--vl-${NEUTRAL_COLOR}-${shade}` as keyof VuelessCssVariables] =
      `var(--color-${neutral}-${shade})`;
  }

  const [light, dark] = generateCSSColorVariables(lightTheme, darkTheme);

  variables = { ...variables, ...light };
  darkVariables = { ...darkVariables, ...dark };

  return setCSSVariables(variables, darkVariables);
}

/**
 * Generate CSS color variables.
 * @return string - Vueless color CSS variables.
 */
function generateCSSColorVariables(
  lightTheme: Partial<VuelessCssVariables>,
  darkTheme: Partial<VuelessCssVariables>,
) {
  const variables: Partial<VuelessCssVariables> = {};
  const darkVariables: Partial<VuelessCssVariables> = {};

  Object.entries(lightTheme).forEach(([vuelessVariable, lightColor]) => {
    const variable = vuelessVariable as keyof VuelessCssVariables;

    variables[variable] = lightColor?.startsWith("--") ? `var(${lightColor})` : lightColor;
  });

  Object.entries(darkTheme).forEach(([vuelessVariable, darkColor]) => {
    const variable = vuelessVariable as keyof VuelessCssVariables;

    darkVariables[variable] = darkColor?.startsWith("--") ? `var(${darkColor})` : darkColor;
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
