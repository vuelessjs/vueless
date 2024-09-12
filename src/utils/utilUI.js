import { merge } from "lodash-es";
import { defineConfig } from "cva";
import { extendTailwindMerge } from "tailwind-merge";
import { cloneDeep, isCSR, isSSR } from "./utilHelper.js";
import {
  BRAND_COLOR,
  GRAYSCALE_COLOR,
  DEFAULT_BRAND_COLOR,
  NESTED_COMPONENT_REG_EXP,
} from "../constants.js";

/**
 Load Vueless config from the project root.
 Both for server and client side renderings.
 IIFE is used to cache the results.
 */
export const vuelessConfig = (() => {
  let config = {};

  if (isSSR) {
    // TODO: test it in SSR, maybe `await` is needed
    config = import(/* @vite-ignore */ `${process.cwd()}/vueless.config.js`).default;
  }

  if (isCSR) {
    config = Object.values(
      import.meta.glob("/vueless.config.js", { eager: true, import: "default" }),
    )[0];
  }

  return config;
})();

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
    vuelessConfig.tailwindMerge,
  ),
);

/**
 Export cva (class variance authority) methods:
  * extended with tailwind-merge
  * remove all Vueless nested component names ({U...} strings) from class list string.
 Learn more here: https://beta.cva.style
*/
export const {
  cx,
  compose,
  cva: classVarianceAuthority,
} = defineConfig({
  hooks: {
    onComplete: (classNames) => twMerge(classNames).replace(NESTED_COMPONENT_REG_EXP, ""),
  },
});

/* This allows skipping some CVA config keys in vueless config. */
export const cva = ({ base = "", variants = {}, compoundVariants = [], defaultVariants = {} }) =>
  classVarianceAuthority({
    base,
    variants,
    compoundVariants,
    defaultVariants,
  });

/**
 Return default values for component props, icons, etc..
 @param { Object } defaultConfig
 @param { String } name

 @returns { Object }
 */
export function getDefault(defaultConfig, name) {
  const defaults = merge(
    cloneDeep(defaultConfig.defaults),
    vuelessConfig?.component ? vuelessConfig?.component[name]?.defaults : {},
  );

  defaults.color = getColor(defaults.color);

  return defaults;
}

/**
 Return `grayscale` color if in component config it `brand` but in vueless config it `grayscale`
 Otherwise return given color.
 @param { String } color
 @returns { String }
 */
export function getColor(color) {
  return (vuelessConfig.brand ?? DEFAULT_BRAND_COLOR) === GRAYSCALE_COLOR && color === BRAND_COLOR
    ? GRAYSCALE_COLOR
    : color;
}

/**
 Replace in tailwind classes `{color}` variable into given color.
 @param { String } classes
 @param { String } color

 @returns { String }
 */
export function setColor(classes, color) {
  if (typeof classes !== "string") {
    return "";
  }

  return classes?.replaceAll("{color}", color);
}

/**
 Generates unique #id.
 @param { Number } length
 @returns { String }
 */
export function getRandomId(length = 15) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;

  let id = "";

  while (id.length < length) {
    id += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return id;
}
