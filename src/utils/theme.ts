import { cloneDeep, merge } from "lodash-es";

import { vuelessConfig } from "./ui.ts";
import { isCSR, setCookie } from "./helper.ts";

import {
  PX_IN_REM,
  COLOR_MODE_KEY,
  AUTO_MODE_KEY,
  LIGHT_MODE_CLASS,
  DARK_MODE_CLASS,
  GRAYSCALE_COLOR,
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_NEUTRAL_COLOR,
  OUTLINE,
  DEFAULT_OUTLINE,
  OUTLINE_DECREMENT,
  OUTLINE_INCREMENT,
  ROUNDING,
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
  TEXT,
  DEFAULT_TEXT,
  TEXT_INCREMENT,
  TEXT_DECREMENT,
  DISABLED_OPACITY,
  DEFAULT_DISABLED_OPACITY,
} from "../constants.js";

import type {
  NeutralColors,
  PrimaryColors,
  ThemeConfig,
  ThemeConfigText,
  ThemeConfigOutline,
  ThemeConfigRounding,
  VuelessCssVariables,
} from "../types.ts";
import { ColorMode } from "../types.ts";

declare interface RootCSSVariableOptions {
  primary: PrimaryColors | string;
  neutral: NeutralColors | string;
  text: ThemeConfigText;
  rounding: ThemeConfigRounding;
  outline: ThemeConfigOutline;
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

  document.documentElement.classList.toggle(DARK_MODE_CLASS, prefersColorSchemeDark.matches);
  document.documentElement.classList.toggle(LIGHT_MODE_CLASS, !prefersColorSchemeDark.matches);
}

/**
 * Sets color mode.
 * @param {string} mode (dark | light | auto)
 * @param {boolean} isCachedAutoMode
 * @return {string} current color mode
 */
function setColorMode(mode: `${ColorMode}`, isCachedAutoMode?: boolean): string {
  const colorMode = mode || getStored(COLOR_MODE_KEY) || vuelessConfig.colorMode || ColorMode.Light;

  isCachedAutoMode = isCachedAutoMode ?? !!Number(getStored(AUTO_MODE_KEY));

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
  document.documentElement.classList.toggle(DARK_MODE_CLASS, isDarkMode);
  document.documentElement.classList.toggle(LIGHT_MODE_CLASS, !isDarkMode);

  /* Dispatching custom event for the useDarkMode composable. */
  window.dispatchEvent(new CustomEvent("darkModeChange", { detail: isDarkMode }));

  /* Saving color mode value into cookies (server) and local storage (client). */
  let currentColorMode = colorMode;

  if (isAutoMode) {
    currentColorMode = isDarkMode ? ColorMode.Dark : ColorMode.Light;
  }

  if (mode) {
    setCookie(COLOR_MODE_KEY, currentColorMode);
    setCookie(AUTO_MODE_KEY, String(Number(isAutoMode || isCachedAutoMode)));

    localStorage.setItem(COLOR_MODE_KEY, currentColorMode);
    localStorage.setItem(AUTO_MODE_KEY, String(Number(isAutoMode || isCachedAutoMode)));
  }

  return currentColorMode;
}

/**
 * Retrieves CSS variable value to be easily used in the JavaScript code.
 * @return string.
 */
export function cssVar(name: string) {
  return (isCSR && getComputedStyle(document.documentElement).getPropertyValue(name)) || undefined;
}

/**
 * Get a stored value from local storage.
 * @return string | undefined
 */
export function getStored(key: string) {
  return isCSR ? localStorage.getItem(key) : undefined;
}

/**
 * Applying theme settings.
 * Changes and reset Vueless CSS variables.
 * @return string - CSS variables
 */
export function setTheme(config: ThemeConfig = {}, isCachedAutoMode?: boolean) {
  if (isCSR) setColorMode(config.colorMode as ColorMode, isCachedAutoMode);

  const text = getText(config.text);
  const outline = getOutlines(config.outline);
  const rounding = getRoundings(config.rounding);
  const disabledOpacity = getDisabledOpacity(config.disabledOpacity);

  let primary = getPrimaryColor(config.primary);
  const neutral = getNeutralColor(config.neutral);

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
    text,
    outline,
    rounding,
    disabledOpacity,
    lightTheme,
    darkTheme,
  });
}

/**
 * Retrieve primary color value and save them to cookie and localStorage.
 * @return string - primary color.
 */
function getPrimaryColor(primary?: PrimaryColors) {
  const storageKey = `vl-${PRIMARY_COLOR}`;

  let primaryColor: PrimaryColors =
    primary ?? getStored(storageKey) ?? vuelessConfig.primary ?? DEFAULT_PRIMARY_COLOR;

  const isPrimaryColor =
    PRIMARY_COLORS.some((color) => color === primaryColor) || primaryColor === GRAYSCALE_COLOR;

  if (!isPrimaryColor) {
    // eslint-disable-next-line no-console
    console.warn(`The primary color '${primaryColor}' is missing in your palette.`);

    primaryColor = DEFAULT_PRIMARY_COLOR;
  }

  if (isCSR && primary) {
    setCookie(storageKey, String(primaryColor));
    localStorage.setItem(storageKey, String(primaryColor));
  }

  return primaryColor;
}

/**
 * Retrieve neutral color value and save them to cookie and localStorage.
 * @return string - neutral color.
 */
function getNeutralColor(neutral?: NeutralColors) {
  const storageKey = `vl-${NEUTRAL_COLOR}`;

  let neutralColor: NeutralColors =
    neutral ?? getStored(storageKey) ?? vuelessConfig.neutral ?? DEFAULT_NEUTRAL_COLOR;

  const isNeutralColor = NEUTRAL_COLORS.some((color) => color === neutralColor);

  if (!isNeutralColor) {
    // eslint-disable-next-line no-console
    console.warn(`The neutral color '${neutralColor}' is missing in your palette.`);

    neutralColor = DEFAULT_NEUTRAL_COLOR;
  }

  if (isCSR && neutral) {
    setCookie(storageKey, String(neutralColor));
    localStorage.setItem(storageKey, String(neutralColor));
  }

  return neutralColor;
}

/**
 * Calculate font-size values and save them to cookie and localStorage.
 * @return object - xs, sm, md, lg font-size values.
 */
function getText(text?: ThemeConfig["text"]) {
  const storageKey = {
    xs: `vl-${TEXT}-xs`,
    sm: `vl-${TEXT}-sm`,
    md: `vl-${TEXT}-md`,
    lg: `vl-${TEXT}-lg`,
  };

  const runtimeText = primitiveToObject(text) as ThemeConfigText;
  const globalText = primitiveToObject(vuelessConfig.text) as ThemeConfigText;

  const size = {
    xs: runtimeText.xs ?? getStored(storageKey.xs) ?? globalText.xs,
    sm: runtimeText.sm ?? getStored(storageKey.sm) ?? globalText.sm,
    md: runtimeText.md ?? getStored(storageKey.md) ?? globalText.md,
    lg: runtimeText.lg ?? getStored(storageKey.lg) ?? globalText.lg,
  };

  const textMd = Math.max(0, Number(size.md ?? DEFAULT_TEXT));
  const textXs = Math.max(0, textMd - TEXT_DECREMENT * 2);
  const textSm = Math.max(0, textMd - TEXT_DECREMENT);
  const textLg = Math.max(0, textMd + TEXT_INCREMENT);

  const mergedText = {
    md: textMd,
    xs: size.xs === undefined ? textXs : Math.max(0, Number(size.xs ?? 0)),
    sm: size.sm === undefined ? textSm : Math.max(0, Number(size.sm ?? 0)),
    lg: size.lg === undefined ? textLg : Math.max(0, Number(size.lg ?? 0)),
  };

  if (isCSR && text) {
    setCookie(storageKey.sm, String(mergedText.xs));
    setCookie(storageKey.sm, String(mergedText.sm));
    setCookie(storageKey.md, String(mergedText.md));
    setCookie(storageKey.lg, String(mergedText.lg));

    localStorage.setItem(storageKey.sm, String(mergedText.xs));
    localStorage.setItem(storageKey.sm, String(mergedText.sm));
    localStorage.setItem(storageKey.md, String(mergedText.md));
    localStorage.setItem(storageKey.lg, String(mergedText.lg));
  }

  return mergedText;
}

/**
 * Calculate outline values and save them to cookie and localStorage.
 * @return object - sm, md, lg outline values.
 */
function getOutlines(outline?: ThemeConfig["outline"]) {
  const storageKey = {
    sm: `vl-${OUTLINE}-sm`,
    md: `vl-${OUTLINE}-md`,
    lg: `vl-${OUTLINE}-lg`,
  };

  const runtimeOutline = primitiveToObject(outline) as ThemeConfigText;
  const globalOutline = primitiveToObject(vuelessConfig.outline) as ThemeConfigText;

  const size = {
    sm: runtimeOutline.sm ?? getStored(storageKey.sm) ?? globalOutline.sm,
    md: runtimeOutline.md ?? getStored(storageKey.md) ?? globalOutline.md,
    lg: runtimeOutline.lg ?? getStored(storageKey.lg) ?? globalOutline.lg,
  };

  const outlineMd = Math.max(0, Number(size.md ?? DEFAULT_OUTLINE));
  const outlineSm = Math.max(0, outlineMd - OUTLINE_DECREMENT);
  let outlineLg = Math.max(0, outlineMd + OUTLINE_INCREMENT);

  if (outlineMd === 0) {
    outlineLg = 0;
  }

  const mergedOutline = {
    md: outlineMd,
    sm: size.sm === undefined ? outlineSm : Math.max(0, Number(size.sm ?? 0)),
    lg: size.lg === undefined ? outlineLg : Math.max(0, Number(size.lg ?? 0)),
  };

  if (isCSR && outline) {
    setCookie(storageKey.sm, String(mergedOutline.sm));
    setCookie(storageKey.md, String(mergedOutline.md));
    setCookie(storageKey.lg, String(mergedOutline.lg));

    localStorage.setItem(storageKey.sm, String(mergedOutline.sm));
    localStorage.setItem(storageKey.md, String(mergedOutline.md));
    localStorage.setItem(storageKey.lg, String(mergedOutline.lg));
  }

  return mergedOutline;
}

/**
 * Calculate rounding values and save them to cookie and localStorage.
 * @return object - sm, md, lg rounding values.
 */
function getRoundings(rounding?: ThemeConfig["rounding"]) {
  const storageKey = {
    sm: `vl-${ROUNDING}-sm`,
    md: `vl-${ROUNDING}-md`,
    lg: `vl-${ROUNDING}-lg`,
  };

  const runtimeRounding = primitiveToObject(rounding) as ThemeConfigRounding;
  const globalRounding = primitiveToObject(vuelessConfig.rounding) as ThemeConfigRounding;

  const size = {
    sm: runtimeRounding.sm ?? getStored(storageKey.sm) ?? globalRounding.sm,
    md: runtimeRounding.md ?? getStored(storageKey.md) ?? globalRounding.md,
    lg: runtimeRounding.lg ?? getStored(storageKey.lg) ?? globalRounding.lg,
  };

  const roundingMd = Math.max(0, Number(size.md ?? DEFAULT_ROUNDING));
  let roundingSm = Math.max(0, roundingMd - ROUNDING_DECREMENT);
  let roundingLg = Math.max(0, roundingMd + ROUNDING_INCREMENT);

  if (roundingMd === ROUNDING_INCREMENT) {
    roundingSm = ROUNDING_DECREMENT;
  }

  if (roundingMd === ROUNDING_DECREMENT) {
    roundingSm = ROUNDING_INCREMENT - ROUNDING_DECREMENT;
  }

  if (roundingMd === 0) {
    roundingLg = ROUNDING_INCREMENT - ROUNDING_DECREMENT;
  }

  const mergedRounding = {
    md: roundingMd,
    sm: size.sm === undefined ? roundingSm : Math.max(0, Number(size.sm ?? 0)),
    lg: size.lg === undefined ? roundingLg : Math.max(0, Number(size.lg ?? 0)),
  };

  if (isCSR && rounding) {
    setCookie(storageKey.sm, String(mergedRounding.sm));
    setCookie(storageKey.md, String(mergedRounding.md));
    setCookie(storageKey.lg, String(mergedRounding.lg));

    localStorage.setItem(storageKey.sm, String(mergedRounding.sm));
    localStorage.setItem(storageKey.md, String(mergedRounding.md));
    localStorage.setItem(storageKey.lg, String(mergedRounding.lg));
  }

  return mergedRounding;
}

/**
 * Retrieve disabled opacity value and save them to cookie and localStorage.
 * @return number - opacity value.
 */
function getDisabledOpacity(disabledOpacity?: ThemeConfig["disabledOpacity"]) {
  const storageKey = `vl-${DISABLED_OPACITY}`;

  const opacity = disabledOpacity ?? getStored(storageKey) ?? vuelessConfig.disabledOpacity;
  const mergedOpacity = Math.max(0, Number(opacity ?? DEFAULT_DISABLED_OPACITY));

  if (isCSR && disabledOpacity) {
    setCookie(storageKey, String(mergedOpacity));
    localStorage.setItem(storageKey, String(mergedOpacity));
  }

  return mergedOpacity;
}

/**
 * Converts a primitive value into an object with the primitive value assigned to a key "md".
 * If the provided value is already an object, it returns a deeply cloned copy of that object.
 */
function primitiveToObject(value: unknown): object {
  return typeof value === "object" ? cloneDeep(value as object) : { md: value };
}

/**
 * Generate and apply Vueless CSS variables.
 * @return string - Vueless CSS variables string.
 */
function setRootCSSVariables(vars: RootCSSVariableOptions) {
  let darkVariables: Partial<VuelessCssVariables> = {};

  let variables: Partial<VuelessCssVariables> = {
    "--vl-text-xs": `${vars.text.xs / PX_IN_REM}rem`,
    "--vl-text-sm": `${vars.text.sm / PX_IN_REM}rem`,
    "--vl-text-md": `${vars.text.md / PX_IN_REM}rem`,
    "--vl-text-lg": `${vars.text.lg / PX_IN_REM}rem`,
    "--vl-outline-sm": `${vars.outline.sm}px`,
    "--vl-outline-md": `${vars.outline.md}px`,
    "--vl-outline-lg": `${vars.outline.lg}px`,
    "--vl-rounding-sm": `${vars.rounding.sm / PX_IN_REM}rem`,
    "--vl-rounding-md": `${vars.rounding.md / PX_IN_REM}rem`,
    "--vl-rounding-lg": `${vars.rounding.lg / PX_IN_REM}rem`,
    "--vl-disabled-opacity": `${vars.disabledOpacity}%`,
  };

  for (const shade of COLOR_SHADES) {
    variables[`--vl-${PRIMARY_COLOR}-${shade}` as keyof VuelessCssVariables] =
      `var(--color-${vars.primary}-${shade})`;
  }

  for (const shade of COLOR_SHADES) {
    variables[`--vl-${NEUTRAL_COLOR}-${shade}` as keyof VuelessCssVariables] =
      `var(--color-${vars.neutral}-${shade})`;
  }

  const [light, dark] = generateCSSColorVariables(vars.lightTheme, vars.darkTheme);

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
    .${DARK_MODE_CLASS} {${darkVariablesString}}
  `;

  if (isCSR) {
    const style = document.createElement("style");

    style.innerHTML = rootVariables;
    document.head.appendChild(style);
  }

  return rootVariables;
}
