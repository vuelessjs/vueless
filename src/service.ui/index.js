import { merge } from "lodash-es";
import { defineConfig } from "cva";
import { twMerge } from "tailwind-merge";
import colors from "tailwindcss/colors";

import { cloneDeep } from "../service.helper";
import {
  GRAY_COLOR,
  COOL_COLOR,
  BRAND_COLOR,
  BRAND_COLORS,
  GRAYSCALE_COLOR,
  DEFAULT_ROUNDING,
  DEFAULT_BRAND_COLOR,
  DEFAULT_GRAY_COLOR,
  DEFAULT_DARK_MODE,
} from "../constants";

/* Load Vueless config from the project root. */
const [vuelessConfig] = Object.values(
  import.meta.glob("/vueless.config.js", { eager: true, import: "default" }),
);

export const nestedComponentRegEx = /\{U[^}]*}/g;

/*
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
  hooks: { onComplete: (className) => twMerge(className).replace(nestedComponentRegEx, "") },
});

export const cva = ({ base = "", variants = {}, compoundVariants = [], defaultVariants = {} }) =>
  classVarianceAuthority({
    base,
    variants,
    compoundVariants,
    defaultVariants,
  });

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
  component: globalComponentConfig,
} = vuelessConfig;

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

    this.setTheme();
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
    return classes?.replaceAll("{color}", color);
  }

  /**
   Set theme css variables.
   @param { Object } config
   @returns { void }
   */
  setTheme = (config = {}) => {
    const darkMode = config?.darkMode || vuelessConfig?.darkMode || DEFAULT_DARK_MODE;
    const rounding = config?.rounding || vuelessConfig?.rounding || DEFAULT_ROUNDING;
    const brand = config?.brand || vuelessConfig?.brand || DEFAULT_BRAND_COLOR;
    const gray = config?.gray || vuelessConfig?.gray || DEFAULT_GRAY_COLOR;

    // eslint-disable-next-line prettier/prettier, vue/max-len
    let brandColor = BRAND_COLORS.some((color) => color === brand) || brand === GRAYSCALE_COLOR ? brand : DEFAULT_BRAND_COLOR;
    let grayColor = BRAND_COLORS.some((color) => color === gray) ? gray : DEFAULT_GRAY_COLOR;

    // handling custom `cool` color
    if (grayColor === COOL_COLOR) {
      grayColor = GRAY_COLOR;
    }

    // handling custom `grayscale` color
    if (brandColor === GRAYSCALE_COLOR) {
      brandColor = grayColor;
    }

    const variables = {
      "--rounding": `${Number(rounding) / this.PX_IN_REM}rem`,
      "--color-gray-default": UIService.convertHexInRgb(colors[grayColor][darkMode ? 400 : 600]),
      "--color-brand-default": UIService.convertHexInRgb(colors[brandColor][darkMode ? 400 : 600]),
    };

    for (const key in colors[grayColor]) {
      variables[`--color-gray-${key}`] = UIService.convertHexInRgb(colors[grayColor][key]);
    }

    for (const key in colors[brandColor]) {
      variables[`--color-brand-${key}`] = UIService.convertHexInRgb(colors[brandColor][key]);
    }

    const style = document.createElement("style");
    const stringVariables = Object.entries(variables)
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ");

    style.innerHTML = `:root {${stringVariables}`;

    document.head.appendChild(style);

    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
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
