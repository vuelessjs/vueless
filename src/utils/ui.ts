import { merge } from "lodash-es";
import { defineConfig } from "cva";
import { extendTailwindMerge } from "tailwind-merge";
import { isCSR, isSSR } from "./helper.ts";
import { createGetMergedConfig } from "./node/mergeConfigs.js";
import { COMPONENT_NAME as U_ICON } from "../ui.image-icon/constants.ts";
import { getSelectedBrandColor } from "./theme.ts";
import {
  BRAND_COLOR,
  GRAYSCALE_COLOR,
  ICON_NON_PROPS_DEFAULTS,
  TAILWIND_MERGE_EXTENSION,
  NESTED_COMPONENT_PATTERN_REG_EXP,
} from "../constants.js";

import type {
  Config,
  Defaults,
  Strategies,
  BrandColors,
  UnknownObject,
  ComponentNames,
} from "../types.ts";

interface MergedConfigOptions {
  defaultConfig: unknown;
  globalConfig: unknown;
  propsConfig?: unknown;
  vuelessStrategy?: Strategies;
}

type GetMergedConfig = (options: MergedConfigOptions) => unknown;

/**
 * Load Vueless config from the project root.
 * Both for server and client side renderings.
 * IIFE for SSR is used to prevent top level await issue.
 */
export let vuelessConfig: Config = {};

if (isSSR) {
  /* Load Vueless config from the project root in IIFE (no top-level await). */
  (async () => {
    try {
      const filePath = `${process.cwd()}/vueless.config`;

      vuelessConfig = (await import(/* @vite-ignore */ `${filePath}.js`)).default;

      if (!vuelessConfig) {
        vuelessConfig = (await import(/* @vite-ignore */ `${filePath}.ts`)).default;
      }
    } catch {
      vuelessConfig = {};
    }
  })();
}

if (isCSR) {
  vuelessConfig =
    Object.values(
      import.meta.glob(["/vueless.config.{js,ts}", "/**/vueless.config.{js,ts}"], {
        eager: true,
        import: "default",
      }),
    )[0] || {};
}

/**
 * Extend twMerge (tailwind merge) by vueless and user config:
 */
const twMerge = extendTailwindMerge(merge(TAILWIND_MERGE_EXTENSION, vuelessConfig.tailwindMerge));

/**
 * Export cva (class variance authority) methods:
 * – extended with tailwind-merge
 * – remove all Vueless nested component names ({U...} strings) from class list string.
 * Learn more here: https://beta.cva.style
 */
export const {
  cx,
  compose,
  cva: classVarianceAuthority,
} = defineConfig({
  hooks: {
    onComplete: (classNames) => twMerge(classNames).replace(NESTED_COMPONENT_PATTERN_REG_EXP, ""),
  },
});

export const getMergedConfig = createGetMergedConfig(cx) as GetMergedConfig;

/* This allows skipping some CVA config keys in vueless config. */
export const cva = ({ base = "", variants = {}, compoundVariants = [], defaultVariants = {} }) =>
  classVarianceAuthority({
    base,
    variants,
    compoundVariants,
    defaultVariants,
  });

/**
 * Return default values for component props, icons, etc..
 */
export function getDefaults<Props, Config>(defaultConfig: Config, name: ComponentNames) {
  const componentDefaults = (defaultConfig as UnknownObject).defaults || {};
  const globalDefaults = vuelessConfig.components?.[name]?.defaults || {};

  const defaults = merge({}, componentDefaults, globalDefaults) as Props & Defaults;

  if (defaults.color) {
    defaults.color = getColor(defaults.color as BrandColors);
  }

  /* Remove non a props defaults. */
  for (const key in defaults) {
    const isNonPropIcon = /Icon/.test(key) && !/(leftIcon|rightIcon)/.test(key);
    const isNonPropIconDefaults = ICON_NON_PROPS_DEFAULTS.includes(key) && name === U_ICON;

    if (isNonPropIcon || isNonPropIconDefaults) {
      delete defaults[key];
    }
  }

  return {
    ...defaults,
    dataTest: "",
    config: () => ({}),
  };
}

/**
 * Return `grayscale` color if in component config it `brand` but in vueless config it `grayscale`
 * Otherwise return given color.
 */
export function getColor(color: string) {
  const isComponentColorBrand = color === BRAND_COLOR;
  const isSelectedColorGrayscale = getSelectedBrandColor() === GRAYSCALE_COLOR;

  return isComponentColorBrand && isSelectedColorGrayscale ? GRAYSCALE_COLOR : color;
}

/**
 * Replace in tailwind classes `{color}` variable into given color.
 */
export function setColor(classes: string, color: string) {
  return classes?.replace(/{color}/g, color);
}
