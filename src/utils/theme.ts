import { merge } from "lodash-es";

import { vuelessConfig } from "./ui.ts";
import { isSSR, isCSR, setCookie } from "./helper.ts";

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
  DEFAULT_TEXT,
  TEXT_INCREMENT,
  TEXT_DECREMENT,
  DEFAULT_DISABLED_OPACITY,
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
  textXs: number;
  textSm: number;
  text: number;
  textLg: number;
  disabledOpacity: number;
  lightTheme: Partial<VuelessCssVariables>;
  darkTheme: Partial<VuelessCssVariables>;
}

/* Creates a media query that checks if the user's system color scheme is set to the dark. */
const prefersColorSchemeDark = isCSR && window.matchMedia("(prefers-color-scheme: dark)");

function toggleColorModeClass() {
  if (!prefersColorSchemeDark) return;

  const colorMode = prefersColorSchemeDark.matches ? ColorMode.Dark : ColorMode.Light;

  setCookie(COLOR_MODE_KEY, colorMode);
  localStorage.setItem(COLOR_MODE_KEY, colorMode);

  document.documentElement.classList.toggle(DARK_MODE_SELECTOR, prefersColorSchemeDark.matches);
  document.documentElement.classList.toggle(LIGHT_MODE_SELECTOR, !prefersColorSchemeDark.matches);
}

/**
 * Sets color mode.
 * @param {string} colorMode (dark | light | auto)
 * @param {boolean} isCachedAutoMode
 */
export function setColorMode(colorMode: `${ColorMode}`, isCachedAutoMode?: boolean) {
  if (isSSR) return;

  isCachedAutoMode = isCachedAutoMode ?? !!Number(localStorage.getItem(AUTO_MODE_KEY));

  const isAutoMode = colorMode === ColorMode.Auto;
  const isSystemDarkMode = isAutoMode && prefersColorSchemeDark && prefersColorSchemeDark?.matches;
  const isDarkMode = colorMode === ColorMode.Dark || isSystemDarkMode;

  /* Removing system color mode change event listener. */
  if (prefersColorSchemeDark) {
    prefersColorSchemeDark.removeEventListener("change", toggleColorModeClass);
  }

  /* Adding system color mode change event listener. */
  if ((isAutoMode || isCachedAutoMode) && prefersColorSchemeDark) {
    prefersColorSchemeDark.addEventListener("change", toggleColorModeClass);
  }

  /* Adding color mode classes. */
  document.documentElement.classList.toggle(DARK_MODE_SELECTOR, isDarkMode);
  document.documentElement.classList.toggle(LIGHT_MODE_SELECTOR, !isDarkMode);

  /* Dispatching custom event for the useDarkMode composable. */
  window.dispatchEvent(new CustomEvent("darkModeChange", { detail: isDarkMode }));

  /* Saving color mode value into cookies (server) and local storage (client). */
  let currentColorMode = colorMode;

  if (isAutoMode) {
    currentColorMode = isDarkMode ? ColorMode.Dark : ColorMode.Light;
  }

  setCookie(COLOR_MODE_KEY, currentColorMode);
  setCookie(AUTO_MODE_KEY, String(Number(isAutoMode || isCachedAutoMode)));

  localStorage.setItem(COLOR_MODE_KEY, currentColorMode);
  localStorage.setItem(AUTO_MODE_KEY, String(Number(isAutoMode || isCachedAutoMode)));
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
  return isCSR ? localStorage.getItem(PRIMARY_COLOR_KEY) : undefined;
}

/**
 * Get selected neutral color from cookies.
 * @return string | undefined
 */
export function getSelectedNeutralColor() {
  return isCSR ? localStorage.getItem(NEUTRAL_COLOR_KEY) : undefined;
}

/**
 * Applying theme settings.
 * Changes and reset Vueless CSS variables.
 * @return string - CSS variables
 */
export function setTheme(config: Config = {}, isCachedAutoMode?: boolean) {
  const cachedColorMode = isCSR && localStorage.getItem(COLOR_MODE_KEY);
  const cachedRounding = isCSR ? localStorage.getItem(ROUNDING_KEY) : undefined;

  // eslint-disable-next-line vue/max-len, prettier/prettier
  setColorMode((config.colorMode || cachedColorMode || vuelessConfig.colorMode || ColorMode.Light) as ColorMode, isCachedAutoMode);

  const disabledOpacity = getDisabledOpacity(
    config.disabledOpacity ?? vuelessConfig.disabledOpacity,
  );

  const { roundingSm, rounding, roundingLg } = getRoundings(
    config.roundingSm ?? vuelessConfig.roundingSm,
    config.rounding ?? cachedRounding ?? vuelessConfig.rounding,
    config.roundingLg ?? vuelessConfig.roundingLg,
  );

  const { outlineSm, outline, outlineLg } = getRings(
    config.outlineSm ?? vuelessConfig.outlineSm,
    config.outline ?? vuelessConfig.outline,
    config.outlineLg ?? vuelessConfig.outlineLg,
  );

  const { textXs, textSm, text, textLg } = getText(
    config.textXs ?? vuelessConfig.textXs,
    config.textSm ?? vuelessConfig.textSm,
    config.text ?? vuelessConfig.text,
    config.textLg ?? vuelessConfig.textLg,
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

  if (isCSR && primary) {
    setCookie(PRIMARY_COLOR_KEY, primary);
    localStorage.setItem(PRIMARY_COLOR_KEY, primary);
  }

  if (isCSR && neutral) {
    setCookie(NEUTRAL_COLOR_KEY, neutral);
    localStorage.setItem(NEUTRAL_COLOR_KEY, neutral);
  }

  if (isCSR) {
    setCookie(ROUNDING_KEY, String(rounding));
    localStorage.setItem(ROUNDING_KEY, String(rounding));
  }

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
    textXs,
    textSm,
    text,
    textLg,
    disabledOpacity,
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
function getText(xs?: number, sm?: number, md?: number, lg?: number) {
  const text = Math.max(0, md ?? DEFAULT_TEXT);
  const textXs = Math.max(0, text - TEXT_DECREMENT * 2);
  const textSm = Math.max(0, text - TEXT_DECREMENT);
  const textLg = Math.max(0, text + TEXT_INCREMENT);

  return {
    text,
    textXs: xs === undefined ? textXs : Math.max(0, xs),
    textSm: sm === undefined ? textSm : Math.max(0, sm),
    textLg: lg === undefined ? textLg : Math.max(0, lg),
  };
}

/**
 * Calculate rounding values.
 * @return object - sm, md, lg rounding values.
 */
function getRoundings(sm?: string | number, md?: string | number, lg?: string | number) {
  const rounding = Math.max(0, Number(md ?? DEFAULT_ROUNDING));
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
    roundingSm: sm === undefined ? roundingSm : Math.max(0, Number(sm ?? 0)),
    roundingLg: lg === undefined ? roundingLg : Math.max(0, Number(lg ?? 0)),
  };
}

/**
 * Retrieve disabled opacity value.
 * @return number - opacity value.
 */
function getDisabledOpacity(opacity?: number) {
  return Math.max(0, opacity ?? DEFAULT_DISABLED_OPACITY);
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
    textXs,
    textSm,
    text,
    textLg,
    disabledOpacity,
    lightTheme,
    darkTheme,
  } = options;

  let darkVariables: Partial<VuelessCssVariables> = {};

  let variables: Partial<VuelessCssVariables> = {
    "--vl-rounding-sm": `${roundingSm / PX_IN_REM}rem`,
    "--vl-rounding-md": `${rounding / PX_IN_REM}rem`,
    "--vl-rounding-lg": `${roundingLg / PX_IN_REM}rem`,
    "--vl-outline-sm": `${outlineSm}px`,
    "--vl-outline-md": `${outline}px`,
    "--vl-outline-lg": `${outlineLg}px`,
    "--vl-text-xs": `${textXs / PX_IN_REM}rem`,
    "--vl-text-sm": `${textSm / PX_IN_REM}rem`,
    "--vl-text-md": `${text / PX_IN_REM}rem`,
    "--vl-text-lg": `${textLg / PX_IN_REM}rem`,
    "--vl-disabled-opacity": `${disabledOpacity}%`,
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
