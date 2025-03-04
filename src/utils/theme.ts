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
  STATE_COLORS_MAP,
  BRAND_COLOR,
  GRAY_COLORS,
  WHITE_COLOR,
  TEXT_COLOR_SHADES,
  STATE_COLOR_SHADES,
  BORDER_COLOR_SHADES,
  GRAYSCALE_COLOR_SHADES,
  BACKGROUND_COLOR_SHADES,
} from "../constants.js";

import type {
  Config,
  GrayColors,
  BrandColors,
  VuelessCssVariables,
  TailwindColorShades,
  TailwindColorModeShades,
} from "../types.ts";

import { ColorMode } from "../types.ts";

type StateColors = keyof typeof STATE_COLORS_MAP;
type DefaultColors = keyof typeof TAILWIND_COLORS;
type DefaultColorsWithValues = typeof TAILWIND_COLORS;

interface Colors extends DefaultColorsWithValues {
  [key: string]: Partial<TailwindColorShades> | StateColors | string;
}

declare interface RootCSSVariableOptions {
  colors: Colors;
  brand: DefaultColors | string;
  gray: DefaultColors | string;
  outlineSm: number;
  outline: number;
  outlineLg: number;
  roundingSm: number;
  rounding: number;
  roundingLg: number;
}

declare interface GenerateCSSColorVariables {
  type: string;
  colors: Colors;
  color: DefaultColors | StateColors | string;
  shades: Record<string, TailwindColorModeShades>;
  stateColor?: string;
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
 * Convert hex color value into rgb.
 * Example: `#345D3A` >>> `52, 93, 58`
 * Example: `#FFF` >>> `255, 255, 255`
 * @returns string
 */
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

  let brand: BrandColors =
    config.brand ?? getSelectedBrandColor() ?? vuelessConfig.brand ?? DEFAULT_BRAND_COLOR;

  let gray: GrayColors =
    config.gray ?? getSelectedGrayColor() ?? vuelessConfig.gray ?? DEFAULT_GRAY_COLOR;

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

  // TODO: Should be removed after all components migration into custom vueless theme variables.
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

  const { colors, brand, gray, outlineSm, outline, outlineLg, roundingSm, rounding, roundingLg } =
    options;

  let darkVariables: Partial<VuelessCssVariables> = {
    "--vl-color-gray-default": convertHexInRgb(colors[gray]?.[400]),
    "--vl-color-brand-default": convertHexInRgb(colors[brand]?.[400]),
  };

  let variables: Partial<VuelessCssVariables> = {
    "--vl-rounding-sm": `${Number(roundingSm) / PX_IN_REM}rem`,
    "--vl-rounding": `${Number(rounding) / PX_IN_REM}rem`,
    "--vl-rounding-lg": `${Number(roundingLg) / PX_IN_REM}rem`,
    "--vl-outline-sm": `${outlineSm}px`,
    "--vl-outline": `${outline}px`,
    "--vl-outline-lg": `${outlineLg}px`,
    "--vl-color-gray-default": convertHexInRgb(colors[gray]?.[600]),
    "--vl-color-brand-default": convertHexInRgb(colors[brand]?.[600]),
  };

  for (const key in colors[brand] as TailwindColorShades) {
    const shade = key as unknown as keyof TailwindColorShades;

    variables[`--vl-color-brand-${key}` as keyof VuelessCssVariables] = convertHexInRgb(
      colors[brand]?.[shade],
    );
  }

  const brandColorShades = GRAY_COLORS.includes(brand)
    ? GRAYSCALE_COLOR_SHADES
    : STATE_COLOR_SHADES;

  const configs = [
    { type: "color", color: brand, shades: brandColorShades, stateColor: BRAND_COLOR },
    { type: "color", color: gray, shades: GRAYSCALE_COLOR_SHADES, stateColor: GRAYSCALE_COLOR },
    { type: "border", color: gray, shades: BORDER_COLOR_SHADES },
    { type: "text", color: gray, shades: TEXT_COLOR_SHADES },
    { type: "bg", color: gray, shades: BACKGROUND_COLOR_SHADES },
  ];

  for (const stateColor in STATE_COLORS_MAP) {
    configs.push({
      type: "color",
      color: STATE_COLORS_MAP[stateColor as StateColors],
      shades: STATE_COLOR_SHADES,
      stateColor: stateColor,
    });
  }

  configs.forEach((config) => {
    const [light, dark] = generateCSSColorVariables({ colors, ...config });

    variables = { ...variables, ...light };
    darkVariables = { ...darkVariables, ...dark };
  });

  return setCSSVariables(variables, darkVariables);
}

/**
 * Generate CSS color variables.
 * @return string - Vueless color CSS variables.
 */
function generateCSSColorVariables(config: GenerateCSSColorVariables) {
  const { colors, shades, type, color, stateColor } = config;

  const variables: Partial<VuelessCssVariables> = {};
  const darkVariables: Partial<VuelessCssVariables> = {};

  Object.entries(shades).forEach(([shade, colorModeConfig]) => {
    const lightShade = colorModeConfig.light as unknown as keyof TailwindColorShades;
    const darkShade = colorModeConfig.dark as unknown as keyof TailwindColorShades;

    // eslint-disable-next-line prettier/prettier
    const lightColor = String(lightShade) === WHITE_COLOR ? colors.white : colors[color]?.[lightShade];
    const darkColor = String(darkShade) === WHITE_COLOR ? colors.white : colors[color]?.[darkShade];

    const variableColor = stateColor ? `${stateColor}-${shade}` : shade;

    variables[`--vl-${type}-${variableColor}` as keyof VuelessCssVariables] =
      convertHexInRgb(lightColor);

    darkVariables[`--vl-${type}-${variableColor}` as keyof VuelessCssVariables] =
      convertHexInRgb(darkColor);
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
