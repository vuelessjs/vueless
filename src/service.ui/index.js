import { merge } from "lodash-es";
import { defineConfig } from "cva";
import { extendTailwindMerge } from "tailwind-merge";
import colors from "tailwindcss/colors";

import { cloneDeep } from "../service.helper";
import {
  GRAY_COLOR,
  COOL_COLOR,
  BRAND_COLOR,
  BRAND_COLORS,
  GRAYSCALE_COLOR,
  DEFAULT_RING,
  DEFAULT_RING_OFFSET,
  DEFAULT_ROUNDING,
  DEFAULT_BRAND_COLOR,
  DEFAULT_GRAY_COLOR,
  DARK_MODE_SELECTOR,
  GRAY_COLORS,
} from "../constants";

/* Load Vueless config from the project root. */
const [vuelessConfig] = Object.values(
  import.meta.glob("/vueless.config.js", { eager: true, import: "default" }),
);

/*
  Export global config settings for the current library.
  Did as a separate variables for more comfortable usage.
*/
export const {
  layout,
  strategy,
  rounding,
  gray,
  brand,
  tailwindMerge: globalTailwindMergeConfig,
  component: globalComponentConfig,
} = vuelessConfig;

export const nestedComponentRegEx = /\{U[^}]*}/g;

//
/**
 Extend twMerge (tailwind merge) by vueless and user config:
 All list of rules available here:
 https://github.com/dcastil/tailwind-merge/blob/v2.3.0/src/lib/default-config.ts
 */
const twMerge = extendTailwindMerge(
  merge(
    {
      extend: {
        theme: {
          spacing: ["safe-top", "safe-bottom", "safe-left", "safe-right"],
        },
        classGroups: {
          "ring-w": [{ ring: ["dynamic"] }],
          "ring-offset-w": [{ "ring-offset": ["dynamic"] }],
          "font-size": [{ text: ["2xs"] }],
          rounded: [{ rounded: ["dynamic"] }],
        },
      },
    },
    globalTailwindMergeConfig,
  ),
);

/**
  Export cva (class variance authority) methods:
   * extended with tailwind-merge
   * remove all Vueless nested component names ({U...} strings) from class list string.
  It helps to make class variation switchers and removes class duplications.
  https://beta.cva.style
*/
export const {
  cva: classVarianceAuthority,
  cx,
  compose,
} = defineConfig({
  hooks: {
    onComplete: (classNames) => twMerge(classNames).replace(nestedComponentRegEx, ""),
  },
});

export const cva = ({ base = "", variants = {}, compoundVariants = [], defaultVariants = {} }) =>
  classVarianceAuthority({
    base,
    variants,
    compoundVariants,
    defaultVariants,
  });

const PX_IN_REM = 16;
const HYPHEN_SYMBOL = "-";

(() => {
  const prefersColorSchemeDark = window && window.matchMedia("(prefers-color-scheme: dark)");

  setTheme({ systemDarkMode: prefersColorSchemeDark.matches });

  prefersColorSchemeDark.addEventListener("change", (event) =>
    setTheme({ systemDarkMode: event.matches }),
  );
})();

function getRandomId(length = 15) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  let id = "";

  while (id.length < length) {
    id += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return id;
}

function setTitle({ title, separator = " / ", suffix = "" }) {
  document.title = title ? title + separator + suffix : suffix;
}

function setFavicon(faviconPath) {
  if (!faviconPath) return;

  const head = document.querySelector("head");
  const faviconTag = document.createElement("link");

  faviconTag.setAttribute("rel", "shortcut icon");
  faviconTag.setAttribute("href", `${faviconPath}?${Math.random()}`);

  head.appendChild(faviconTag);
}

function getDefault(defaultConfig, name) {
  const defaults = merge(cloneDeep(defaultConfig.defaults), globalComponentConfig[name]?.defaults);

  defaults.color = getColor(defaults.color);

  return defaults;
}

function getColor(color) {
  return (brand ?? DEFAULT_BRAND_COLOR) === GRAYSCALE_COLOR && color === BRAND_COLOR
    ? GRAYSCALE_COLOR
    : color;
}

function setColor(classes, color) {
  if (typeof classes !== "string") {
    return "";
  }

  return classes?.replaceAll("{color}", color);
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

function setTheme(config = {}) {
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

export {
  PX_IN_REM,
  HYPHEN_SYMBOL,
  getRandomId,
  setTitle,
  setFavicon,
  getDefault,
  getColor,
  setColor,
  setDarkMode,
  setTheme,
  convertHexInRgb,
};
