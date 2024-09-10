import colors from "tailwindcss/colors.js";

import { vuelessConfig } from "./utilsUI";
import {
  GRAY_COLOR,
  COOL_COLOR,
  BRAND_COLORS,
  GRAYSCALE_COLOR,
  DEFAULT_RING,
  DEFAULT_RING_OFFSET,
  DEFAULT_ROUNDING,
  DEFAULT_BRAND_COLOR,
  DEFAULT_GRAY_COLOR,
  DARK_MODE_SELECTOR,
  GRAY_COLORS,
  PX_IN_REM,
} from "../constants";

export function themeInit() {
  const prefersColorSchemeDark = window && window.matchMedia("(prefers-color-scheme: dark)");

  setTheme({ systemDarkMode: prefersColorSchemeDark.matches });

  prefersColorSchemeDark.addEventListener("change", (event) =>
    setTheme({ systemDarkMode: event.matches }),
  );
}

export function setTheme(config = {}) {
  const isDarkMode = setDarkMode(config);
  const ring = config?.ring ?? vuelessConfig?.ring ?? DEFAULT_RING;
  const ringOffset = config?.ringOffset ?? vuelessConfig?.ringOffset ?? DEFAULT_RING_OFFSET;
  const rounding = config?.rounding ?? vuelessConfig?.rounding ?? DEFAULT_ROUNDING;
  let brand = config?.brand ?? vuelessConfig?.brand ?? DEFAULT_BRAND_COLOR;
  let gray = config?.gray ?? vuelessConfig?.gray ?? DEFAULT_GRAY_COLOR;

  const isBrandColor = BRAND_COLORS.some((color) => color === brand);
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

  if (gray === COOL_COLOR) {
    gray = GRAY_COLOR;
  }

  if (brand === GRAYSCALE_COLOR) {
    brand = gray;
  }

  const variables = {
    "--vl-ring": `${ring}px`,
    "--vl-ring-offset": `${ringOffset}px`,
    "--vl-rounding": `${Number(rounding) / PX_IN_REM}rem`,
    "--vl-color-gray-default": convertHexInRgb(colors[gray][defaultBrandShade]),
    "--vl-color-brand-default": convertHexInRgb(colors[brand][defaultGrayShade]),
  };

  for (const key in colors[gray]) {
    variables[`--vl-color-gray-${key}`] = convertHexInRgb(colors[gray][key]);
  }

  for (const key in colors[brand]) {
    variables[`--vl-color-brand-${key}`] = convertHexInRgb(colors[brand][key]);
  }

  const style = document.createElement("style");
  const stringVariables = Object.entries(variables)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");

  style.innerHTML = `:root {${stringVariables}`;

  document.head.appendChild(style);
}

function setDarkMode(config) {
  config?.darkMode === undefined
    ? localStorage.removeItem(DARK_MODE_SELECTOR)
    : localStorage.setItem(DARK_MODE_SELECTOR, Number(!!config?.darkMode));

  const storedDarkMode = localStorage.getItem(DARK_MODE_SELECTOR);

  let isDarkMode =
    storedDarkMode !== null
      ? !!Number(storedDarkMode)
      : !!(config?.darkMode ?? vuelessConfig?.darkMode ?? config?.systemDarkMode);

  isDarkMode
    ? document.documentElement.classList.add(DARK_MODE_SELECTOR)
    : document.documentElement.classList.remove(DARK_MODE_SELECTOR);

  return isDarkMode;
}

function convertHexInRgb(hex) {
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
