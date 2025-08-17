import { merge } from "lodash-es";
import { defineConfig } from "cva";
import { extendTailwindMerge } from "tailwind-merge";

import { isCSR } from "./helper";
import { createGetMergedConfig } from "./node/mergeConfigs";
import { COMPONENT_NAME as U_ICON } from "../ui.image-icon/constants";
import { ICON_NON_PROPS_DEFAULTS, TAILWIND_MERGE_EXTENSION } from "../constants";

import type { Config, ComponentDefaults, UnknownObject, ComponentNames } from "../types";

interface MergedConfigOptions {
  defaultConfig: unknown;
  globalConfig: unknown;
  propsConfig?: unknown;
  unstyled?: boolean;
}

type GetMergedConfig = (options: MergedConfigOptions) => unknown;

/**
 * Load Vueless config from the project root.
 * Both for server and client side renderings.
 */
export let vuelessConfig: Config = {};

export function setVuelessConfig(config?: Config) {
  config = config || {};

  vuelessConfig = Object.keys(config).length ? config : vuelessConfig;
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
    onComplete: (classNames) => twMerge(classNames),
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

  const defaults = merge({}, componentDefaults, globalDefaults) as Props & ComponentDefaults;

  /* Remove non a props defaults. */
  for (const key in defaults) {
    const isNonPropIcon =
      /Icon/.test(key) && !/(leftIcon|rightIcon|toggleIcon|placeholderIcon)/.test(key);
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
 * Replace in tailwind classes `{color}` variable into given color.
 */
export function setColor(classes: string, color: string) {
  return classes?.replace(/{color}/g, color);
}
