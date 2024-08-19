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

export default class UIService {
  isMac = false;
  isPWA = false;
  isIOS = false;
  isAndroid = false;
  isMobileApp = false;
  PX_IN_REM = 16;
  HYPHEN_SYMBOL = "-";

  constructor() {
    // Needed to avoid error in server context for ssr
    // TODO: Find way call it in browser
    // Possible solution: https://github.com/nuxt/nuxt/discussions/7878
    const isBrowser = typeof window !== "undefined";

    this.isMac = isBrowser && this.checkIsMac();
    this.isPWA = isBrowser && this.checkIsPWA();
    this.isIOS = isBrowser && this.checkIsIOS();
    this.isAndroid = isBrowser && this.checkIsAndroid();
    this.isMobileApp = this.isPWA || this.isIOS || this.isAndroid;

    this.initTheme();
  }

  initTheme() {
    const prefersColorSchemeDark = window && window.matchMedia("(prefers-color-scheme: dark)");

    this.setTheme({ systemDarkMode: prefersColorSchemeDark.matches });

    prefersColorSchemeDark.addEventListener("change", (event) =>
      this.setTheme({ systemDarkMode: event.matches }),
    );
  }

  checkIsPWA() {
    return !!navigator.standalone;
  }

  checkIsMac() {
    return this.getPlatform().toUpperCase().indexOf("MAC") >= 0;
  }

  checkIsIOS() {
    const iOSDevices = [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ];
    const platform = this.getPlatform();
    const isIpodIOS13 = platform.includes("Mac") && "ontouchend" in document;

    return iOSDevices.includes(platform) || isIpodIOS13;
  }

  checkIsAndroid() {
    return this.getPlatform().toUpperCase().indexOf("ANDROID") >= 0;
  }

  getPlatform() {
    return navigator.userAgentData?.platform || navigator.platform || "unknown";
  }

  /**
   Generate random string.
   @param { Number } length
   @returns { String }
   */
  getRandomId(length = 15) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    let id = "";

    while (id.length < length) {
      id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return id;
  }

  static setTitle({ title, separator = " / ", suffix = "" }) {
    document.title = title ? title + separator + suffix : suffix;
  }

  /**
   Change favicon in runtime.
   @param { String } faviconPath
   @returns { void }
   */
  static setFavicon(faviconPath) {
    if (!faviconPath) return;

    const head = document.querySelector("head");
    const faviconTag = document.createElement("link");

    faviconTag.setAttribute("rel", "shortcut icon");
    faviconTag.setAttribute("href", `${faviconPath}?${Math.random()}`);

    head.appendChild(faviconTag);
  }

  /**
    Get default component props value related on default and global config.
    @param { Object } defaultConfig
    @param { String } name
    @returns { Object }
  */
  static get(defaultConfig, name) {
    const defaultVariants = merge(
      cloneDeep(defaultConfig.defaultVariants),
      globalComponentConfig[name]?.defaultVariants,
    );

    defaultVariants.color = getColor(defaultVariants.color);

    return {
      default: defaultVariants,
    };
  }

  /**
   Get color for props.
   @param { String } color
   @returns { String }
   */
  getColor(color) {
    return brand === GRAYSCALE_COLOR && color === BRAND_COLOR ? GRAYSCALE_COLOR : color;
  }

  /**
   Find and replace all {color} variables in class names into given color.
   @param { String } classes
   @param { String } color
   @returns { String }
   */
  setColor(classes, color) {
    return String(classes)?.replaceAll("{color}", color);
  }

  /**
   Set dark mode
   @param { Object } config
   @returns { Boolean } isDarkMode
   */
  setDarkMode(config) {
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

  /**
   Set theme css variables and dark mode.
   @param { Object } config
   @returns { void }
   */
  setTheme = (config = {}) => {
    const isDarkMode = this.setDarkMode(config);
    const ring = config?.ring ?? vuelessConfig?.ring ?? DEFAULT_RING;
    const ringOffset = config?.ringOffset ?? vuelessConfig?.ringOffset ?? DEFAULT_RING_OFFSET;
    const rounding = config?.rounding ?? vuelessConfig?.rounding ?? DEFAULT_ROUNDING;
    let brand = config?.brand ?? vuelessConfig?.brand ?? DEFAULT_BRAND_COLOR;
    let gray = config?.gray ?? vuelessConfig?.gray ?? DEFAULT_GRAY_COLOR;

    const isBrandColor = BRAND_COLORS.some((color) => color === brand);
    const isGrayColor = GRAY_COLORS.some((color) => color === gray);

    if (!isBrandColor) {
      // eslint-disable-next-line no-console
      console.log(`Brand color '${brand}' is incorrect.`);
    }

    if (!isGrayColor) {
      // eslint-disable-next-line no-console
      console.log(`Gray color '${gray}' is incorrect.`);
    }

    // set default shade related to the selected mode
    const defaultBrandShade = isDarkMode ? 400 : 600;
    const defaultGrayShade = isDarkMode ? 400 : 600;

    // handling custom `cool` color
    if (gray === COOL_COLOR) {
      gray = GRAY_COLOR;
    }

    // handling custom `grayscale` color
    if (brand === GRAYSCALE_COLOR) {
      brand = gray;
    }

    const variables = {
      "--vl-ring": `${ring}px`,
      "--vl-ring-offset": `${ringOffset}px`,
      "--vl-rounding": `${Number(rounding) / this.PX_IN_REM}rem`,
      "--vl-color-gray-default": UIService.convertHexInRgb(colors[gray][defaultBrandShade]),
      "--vl-color-brand-default": UIService.convertHexInRgb(colors[brand][defaultGrayShade]),
    };

    for (const key in colors[gray]) {
      variables[`--vl-color-gray-${key}`] = UIService.convertHexInRgb(colors[gray][key]);
    }

    for (const key in colors[brand]) {
      variables[`--vl-color-brand-${key}`] = UIService.convertHexInRgb(colors[brand][key]);
    }

    const style = document.createElement("style");
    const stringVariables = Object.entries(variables)
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ");

    style.innerHTML = `:root {${stringVariables}`;

    document.head.appendChild(style);
  };

  static convertHexInRgb(hex) {
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
}

export const {
  getRandomId,
  getColor,
  setColor,
  setTheme,
  setTitle,
  setFavicon,
  convertHexInRgb,
  isMac,
  isPWA,
  isIOS,
  isAndroid,
  isMobileApp,
  PX_IN_REM,
  HYPHEN_SYMBOL,
} = new UIService();
