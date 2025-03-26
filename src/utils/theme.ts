import { merge } from "lodash-es";

import { vuelessConfig } from "./ui.ts";
import { isSSR, isCSR, setCookie, getCookie } from "./helper.ts";

import {
  PX_IN_REM,
  COLOR_MODE_KEY,
  AUTO_MODE_KEY,
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
  ROUNDING_KEY,
  NEUTRAL_COLOR,
  PRIMARY_COLOR,
  PRIMARY_COLOR_KEY,
  NEUTRAL_COLOR_KEY,
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
 * Initiate theme and changes color mode when it is changed on the user side.
 */
export function themeInit() {
  const isCachedAutoMode = isCSR && !!Number(getCookie(AUTO_MODE_KEY));

  if (isCachedAutoMode) {
    setTheme({ colorMode: ColorMode.Auto }, isCachedAutoMode);
  }
}

/* Creates a media query that checks if the user's system color scheme is set to the dark. */
const prefersColorSchemeDark = isCSR && window.matchMedia("(prefers-color-scheme: dark)");

function toggleColorModeClass() {
  if (!prefersColorSchemeDark) return;

  setCookie(COLOR_MODE_KEY, prefersColorSchemeDark.matches ? ColorMode.Dark : ColorMode.Light);

  document.documentElement.classList.toggle(DARK_MODE_SELECTOR, prefersColorSchemeDark.matches);
  document.documentElement.classList.toggle(LIGHT_MODE_SELECTOR, !prefersColorSchemeDark.matches);
}

/**
 * Sets color mode.
 * @param {string} colorMode (dark | light | auto)
 */
export function setColorMode(colorMode: `${ColorMode}`, isSystemMode?: boolean) {
  if (isSSR) return;

  const systemMode = isSystemMode ?? Boolean(Number(getCookie(AUTO_MODE_KEY)));

  if (prefersColorSchemeDark) {
    prefersColorSchemeDark.removeEventListener("change", toggleColorModeClass);
  }

  const isAutoMode = colorMode === ColorMode.Auto;
  const isDark =
    colorMode === ColorMode.Dark ||
    (isAutoMode && prefersColorSchemeDark && prefersColorSchemeDark.matches);

  document.documentElement.classList.toggle(DARK_MODE_SELECTOR, isDark);
  document.documentElement.classList.toggle(LIGHT_MODE_SELECTOR, !isDark);

  window.dispatchEvent(new CustomEvent("darkModeChange", { detail: isDark }));

  const finalColorMode = isAutoMode ? (isDark ? ColorMode.Dark : ColorMode.Light) : colorMode;

  const shouldAttachListener = isAutoMode || systemMode;

  setCookie(COLOR_MODE_KEY, finalColorMode);
  setCookie(AUTO_MODE_KEY, systemMode ? "1" : "0");

  if (shouldAttachListener && prefersColorSchemeDark) {
    prefersColorSchemeDark.addEventListener("change", toggleColorModeClass);
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
  return isCSR ? getCookie(PRIMARY_COLOR_KEY) : undefined;
}

/**
 * Get selected neutral color from cookies.
 * @return string | undefined
 */
export function getSelectedNeutralColor() {
  return isCSR ? getCookie(NEUTRAL_COLOR_KEY) : undefined;
}

/**
 * Applying theme settings.
 * Changes and reset Vueless CSS variables.
 * @return string - CSS variables
 */
export function setTheme(config: Config = {}, isSystemMode: boolean) {
  const colorModeCookie = isCSR && getCookie(COLOR_MODE_KEY);
  const roundingCookie = isCSR && Number(getCookie(ROUNDING_KEY));

  const colorMode = (config.colorMode || colorModeCookie || vuelessConfig.colorMode) as ColorMode;

  setColorMode(colorMode, isSystemMode);

  const { roundingSm, rounding, roundingLg } = getRoundings(
    config.roundingSm ?? vuelessConfig.roundingSm,
    config.rounding || roundingCookie || vuelessConfig.rounding,
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

  if (isCSR && config.primary) setCookie(PRIMARY_COLOR_KEY, primary);
  if (isCSR && config.neutral) setCookie(NEUTRAL_COLOR_KEY, neutral);

  if (isCSR && config.rounding) setCookie(ROUNDING_KEY, String(rounding));

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
