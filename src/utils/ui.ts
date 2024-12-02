import { merge } from "lodash-es";
import { defineConfig } from "cva";
import { extendTailwindMerge } from "tailwind-merge";
import { cloneDeep, isCSR, isSSR } from "./helper.ts";
import { createGetMergedConfig } from "./node/mergeConfigs.js";
import {
  BRAND_COLOR,
  GRAYSCALE_COLOR,
  DEFAULT_BRAND_COLOR,
  TAILWIND_MERGE_EXTENSION,
  NESTED_COMPONENT_PATTERN_REG_EXP,
} from "../constants.js";

import type {
  BrandColors,
  Config,
  ComponentNames,
  Component,
  Defaults,
  Strategies,
} from "../types.ts";

interface MergedConfigOptions {
  defaultConfig: Component;
  globalConfig: Component;
  propsConfig?: Component;
  vuelessStrategy?: Strategies;
}

type getMergedConfig = (options: MergedConfigOptions) => Component;

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
      import.meta.glob("/vueless.config.{js,ts}", { eager: true, import: "default" }),
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
    onComplete: (classNames) =>
      twMerge(classNames).replaceAll(NESTED_COMPONENT_PATTERN_REG_EXP, ""),
  },
});

export const getMergedConfig = createGetMergedConfig(cx) as getMergedConfig;

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
export function getDefault<T>(defaultConfig: Component, name: ComponentNames): T {
  const componentDefaults = cloneDeep(defaultConfig.defaults) || {};
  const globalDefaults = cloneDeep(vuelessConfig.component?.[name]?.defaults) || {};

  const defaults = merge(componentDefaults, globalDefaults) as T & Defaults;

  if (defaults.color) {
    defaults.color = getColor(defaults.color as BrandColors);
  }

  return defaults;
}

/**
 * Return `grayscale` color if in component config it `brand` but in vueless config it `grayscale`
 * Otherwise return given color.
 */
export function getColor(color: string) {
  const isBrandColorGrayscale = (vuelessConfig.brand ?? DEFAULT_BRAND_COLOR) === GRAYSCALE_COLOR;
  const isComponentColorBrand = color === BRAND_COLOR;

  return isBrandColorGrayscale && isComponentColorBrand ? GRAYSCALE_COLOR : color;
}

/**
 * Replace in tailwind classes `{color}` variable into given color.
 */
export function setColor(classes: string, color: string) {
  return classes?.replace(/{color}/g, color);
}
