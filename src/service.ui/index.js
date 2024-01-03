import merge from "lodash.merge";
import { defineConfig } from "cva";
import { twMerge } from "tailwind-merge";

/*
  Export cva (class variance authority) methods extended with tailwind-merge.
  It helps to make class variation switchers and removes class duplications.
  https://beta.cva.style
*/
export const { cva, cx, compose } = defineConfig({
  hooks: { onComplete: (className) => twMerge(className) },
});

/*
  Export TailwindCSS config.
  https://tailwindcss.com
*/
export const { default: tailwindConfig } = require("/tailwind.config");

/*
  Export global config settings for the current library.
  Did as a separate variables for more comfortable usage.
*/
export const {
  default: {
    fallbackLocale,
    backgroundsPath,
    layout,
    strategyOverwrite,
    component: globalComponentConfig,
  },
} = require("/Users/ivan.hridniev/PhpstormProjects/vuelessjs/vueless/vueless.config");

export default class UIServiceDefault {
  isMac = false;
  isPWA = false;
  isIOS = false;
  isAndroid = false;
  isMobileApp = false;
  PX_IN_REM = 16;

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

  getBasePath() {
    const basePath = import.meta.env.VITE_BASE_PATH;

    return !basePath || basePath === "/" ? "/" : `/${basePath}`;
  }

  convertHexInRgb(hex) {
    const color = hex.replace(/#/g, "");

    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
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

  removeOutlineFocus() {
    const styleTag = document.createElement("style");
    let focusRing = true;

    document.head.appendChild(styleTag).innerHTML = `
      "body.hide-focus-ring *:focus {
        outline: none !important;
      }`;

    document.addEventListener("mousedown", () => {
      if (focusRing) document.body.classList.add("hide-focus-ring");

      focusRing = false;
    });

    document.addEventListener("keydown", () => {
      if (!focusRing) document.body.classList.remove("hide-focus-ring");

      focusRing = true;
    });
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
    @returns string
  */
  static get(defaultConfig, name) {
    return {
      default: merge(defaultConfig.defaultVariants, globalComponentConfig[name]?.defaultVariants),
    };
  }
}

export const {
  getBasePath,
  getRandomId,
  removeOutlineFocus,
  convertHexInRgb,
  setTitle,
  setFavicon,
  isMac,
  isPWA,
  isIOS,
  isAndroid,
  isMobileApp,
  PX_IN_REM,
} = new UIServiceDefault();
