import { merge } from "lodash-es";
import { defineConfig } from "cva";
import { twMerge } from "tailwind-merge";
import colors from "tailwindcss/colors";
import { brandColors, grayColors } from "../preset.tailwind";
import vuelessConfig from "../../../vueless.config.js";

/*
  Export cva (class variance authority) methods extended with tailwind-merge.
  It helps to make class variation switchers and removes class duplications.
  https://beta.cva.style
*/
export const {
  cva: classVarianceAuthority,
  cx,
  compose,
} = defineConfig({
  hooks: { onComplete: (className) => twMerge(className) },
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
export const { layout, strategy, gray, brand, component: globalComponentConfig } = vuelessConfig;

export default class UIServiceDefault {
  isMac = false;
  isPWA = false;
  isIOS = false;
  isAndroid = false;
  isMobileApp = false;
  PX_IN_REM = 16;
  HYPHEN_SYMBOL = "-";

  constructor() {
    this.isMac = this.checkIsMac();

    this.isPWA = this.checkIsPWA();
    this.isIOS = this.checkIsIOS();
    this.isAndroid = this.checkIsAndroid();

    this.isMobileApp = this.isPWA || this.isIOS || this.isAndroid;
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

  setBrandColor(brandColor) {
    function getBrandColor(color, grayColor, brandColors) {
      if (color === "grayscale") {
        return grayColor;
      }

      return brandColors.includes(color) ? colors[color][500] : color;
    }

    function getGrayColor(color, grayColors) {
      return grayColors.includes(color) ? colors[color][900] : colors.zinc[900];
    }

    const grayColor = getGrayColor(gray, grayColors);
    const localBrandColor = getBrandColor(brandColor, grayColor, brandColors);
    const globalBrandColor = getBrandColor(brand, grayColor, brandColors);

    const style = document.createElement("style");
    const rgb = UIServiceDefault.convertHexInRgb(localBrandColor || globalBrandColor || grayColor);

    style.innerHTML = `
      :root {
        --color-brand: ${rgb};
      }
    `;

    document.head.appendChild(style);
  }

  getRandomId(idLength = 15) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    let id = "";

    while (id.length < idLength) {
      id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return id;
  }

  static setTitle({ title, separator = " / ", suffix = "" }) {
    document.title = title ? title + separator + suffix : suffix;
  }

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
    const globalVuelessColor = brand ? { color: brand } : {};

    return {
      default: merge(
        defaultConfig.defaultVariants,
        globalVuelessColor,
        globalComponentConfig[name]?.defaultVariants,
      ),
    };
  }
}

export const {
  getRandomId,
  setBrandColor,
  convertHexInRgb,
  setTitle,
  setFavicon,
  isMac,
  isPWA,
  isIOS,
  isAndroid,
  isMobileApp,
  PX_IN_REM,
  HYPHEN_SYMBOL,
} = new UIServiceDefault();
