import { merge } from "lodash-es";
import { defineConfig } from "cva";
import { extendTailwindMerge } from "tailwind-merge";
import { cloneDeep, isCSR, isSSR } from "./utilHelper.ts";
import {
  BRAND_COLOR,
  GRAYSCALE_COLOR,
  DEFAULT_BRAND_COLOR,
  NESTED_COMPONENT_REG_EXP,
  SYSTEM_CONFIG_KEY,
} from "../constants.ts";

import type {
  CVACompoundVariants,
  BrandColors,
  Config,
  ComponentNames,
  Component,
  Defaults,
  UnknownObject,
  CVA,
  NestedComponent,
} from "../types.ts";

interface MergeCompoundVariantsOptions {
  defaultConfig: CVA;
  globalConfig: CVA;
  propsConfig: CVA;
  isReplace?: boolean;
}

interface MergeConfigsOptions {
  defaultConfig: Component & CVA;
  globalConfig: Component & CVA;
  propsConfig?: Component & CVA;
  config?: Component & CVA;
  isReplace?: boolean;
  isVariants?: boolean;
}

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
 * Recursively merge config objects with removing tailwind classes duplicates.
 * config - final merged config.
 * isReplace - enables class replacement instead of merge.
 * isVariants - if true, prevents adding a "base" key into nested objects.
 */
export function mergeConfigs({
  defaultConfig,
  globalConfig,
  propsConfig,
  config = {},
  isReplace = false,
  isVariants = false,
}: MergeConfigsOptions) {
  globalConfig = cloneDeep(globalConfig || {}) as Component;
  propsConfig = cloneDeep(propsConfig || {}) as Component;

  const isGlobalConfig = Object.keys(globalConfig).length;
  const isPropsConfig = Object.keys(propsConfig).length;

  // Add unique keys from defaultConfig to composedConfig
  const composedConfig = cloneDeep(defaultConfig) as Component & CVA;

  // Add unique keys from globalConfig to composedConfig
  for (const key in globalConfig) {
    if (!Object.keys(composedConfig).includes(key)) {
      composedConfig[key] = globalConfig[key];
    }
  }

  // Add unique keys from propsConfig to composedConfig
  for (const key in propsConfig) {
    if (!Object.keys(composedConfig).includes(key)) {
      composedConfig[key] = propsConfig[key];
    }
  }

  const {
    i18n,
    defaults,
    strategy,
    safelist,
    component,
    safelistColors,
    defaultVariants,
    compoundVariants,
  } = SYSTEM_CONFIG_KEY;

  for (const key in composedConfig) {
    if (isGlobalConfig || isPropsConfig) {
      if (key === safelist || key === safelistColors) {
        if (propsConfig[key]) {
          // eslint-disable-next-line no-console
          console.warn(`Passing '${key}' key in 'config' prop is not allowed.`);
        }
      } else if (key === component) {
        config[key] = propsConfig[key] || defaultConfig[key];

        if (globalConfig[key]) {
          // eslint-disable-next-line no-console
          console.warn(`Passing '${key}' key in 'config' prop or by global config is not allowed.`);
        }
      } else if (key === strategy) {
        config[key] = propsConfig[key] || globalConfig[key] || defaultConfig[key];
      } else if (key === defaults || key === defaultVariants) {
        config[key] = {
          ...(defaultConfig[key] as UnknownObject),
          ...(globalConfig[key] as UnknownObject),
          ...(propsConfig[key] as UnknownObject),
        };
      } else if (key === compoundVariants) {
        config[key] = mergeCompoundVariants({
          defaultConfig,
          globalConfig,
          propsConfig,
          isReplace,
        });
      } else {
        const isObjectComposedConfig = typeof composedConfig[key] === "object";
        const isObjectGlobalConfig = typeof globalConfig[key] === "object";
        const isObjectPropsConfig = typeof propsConfig[key] === "object";

        const isObject = isObjectComposedConfig || isObjectGlobalConfig || isObjectPropsConfig;
        const isEmpty = composedConfig[key] === null;
        const isI18n = key === i18n;

        if (key === "variants" && !isVariants) {
          isVariants = true;
        }

        config[key] =
          isObject && !isEmpty && !isI18n
            ? mergeConfigs({
                defaultConfig: stringToObject(composedConfig[key], { addBase: !isVariants }),
                globalConfig: stringToObject(globalConfig[key], { addBase: !isVariants }),
                propsConfig: stringToObject(propsConfig[key], { addBase: !isVariants }),
                config: stringToObject(composedConfig[key], { addBase: !isVariants }),
                isReplace,
                isVariants,
              })
            : isReplace || isI18n
              ? propsConfig[key] || globalConfig[key] || defaultConfig[key]
              : cx([defaultConfig[key], globalConfig[key], propsConfig[key]]);
      }
    } else {
      config[key] = composedConfig[key];
    }
  }

  return config;
}

/**
 * Merge CVA compound variants arrays.
 * isReplace - enables class replacement instead of merge.
 */
function mergeCompoundVariants({
  defaultConfig,
  globalConfig,
  propsConfig,
  isReplace,
}: MergeCompoundVariantsOptions) {
  if (
    (globalConfig.compoundVariants && !Array.isArray(globalConfig.compoundVariants)) ||
    (propsConfig.compoundVariants && !Array.isArray(propsConfig.compoundVariants)) ||
    (defaultConfig.compoundVariants && !Array.isArray(defaultConfig.compoundVariants))
  ) {
    // eslint-disable-next-line no-console
    console.error("CompoundVariants should be an array.");
  }

  const globalConfigUniqueItems = cloneDeep(
    globalConfig.compoundVariants || [],
  ) as CVACompoundVariants[];
  const propsConfigUniqueItems = cloneDeep(
    propsConfig.compoundVariants || [],
  ) as CVACompoundVariants[];

  const config = (defaultConfig.compoundVariants as CVACompoundVariants[])?.map(
    (defaultConfigItem) => {
      /**
       * Compare two objects by keys for match.
       */
      function isSameItem(configItem: UnknownObject) {
        const hasConfigItemKeys = Object.keys(defaultConfigItem)
          .map((key) => defaultConfigItem[key] === configItem[key] || key === "class")
          .every((item) => Boolean(item));

        const hasDefaultConfigItemKeys = Object.keys(configItem)
          .map((key) => defaultConfigItem[key] === configItem[key] || key === "class")
          .every((item) => Boolean(item));

        return hasConfigItemKeys && hasDefaultConfigItemKeys;
      }

      /**
       * Find the same compound variant item in custom config if exist.
       */
      function findItem(config = []): CVACompoundVariants | undefined {
        const globalConfigUniqueItemIndex = globalConfigUniqueItems.findIndex(isSameItem);
        const propsConfigUniqueItemIndex = propsConfigUniqueItems.findIndex(isSameItem);

        if (~globalConfigUniqueItemIndex) {
          globalConfigUniqueItems.splice(globalConfigUniqueItemIndex, 1);
        }

        if (~propsConfigUniqueItemIndex) {
          propsConfigUniqueItems.splice(propsConfigUniqueItemIndex, 1);
        }

        return config.find(isSameItem);
      }

      const globalConfigItem = findItem(globalConfig.compoundVariants);
      const propsConfigItem = findItem(propsConfig.compoundVariants);

      return globalConfigItem || propsConfigItem
        ? {
            ...defaultConfigItem,
            class: isReplace
              ? propsConfigItem?.class || globalConfigItem?.class || defaultConfigItem.class
              : cx([defaultConfigItem.class, globalConfigItem?.class, propsConfigItem?.class]),
          }
        : defaultConfigItem;
    },
  );

  return [...config, ...globalConfigUniqueItems, ...propsConfigUniqueItems];
}

/**
 Turn simplified nested component config to regular config.
 */
function stringToObject(
  value: (CVA & Partial<NestedComponent>) | string | undefined,
  { addBase = false },
): CVA & Partial<NestedComponent> {
  if (typeof value !== "object" && addBase) {
    return { base: value || "" };
  }

  return typeof value === "object" ? value : addBase ? { base: value || "" } : {};
}

/**
 * Extend twMerge (tailwind merge) by vueless and user config:
 * All list of rules available here:
 * https://github.com/dcastil/tailwind-merge/blob/v2.3.0/src/lib/default-config.ts
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
          "ring-offset-color": [{ "ring-offset": ["dynamic"] }],
          "font-size": [{ text: ["2xs"] }],
          rounded: [{ rounded: ["dynamic"] }],
        },
      },
    },
    vuelessConfig.tailwindMerge,
  ),
);

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

/**
 * Generates simple unique identifier.
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
