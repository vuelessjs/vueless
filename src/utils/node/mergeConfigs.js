import { SYSTEM_CONFIG_KEY } from "../../constants.js";

const {
  i18n: I18N,
  defaults: DEFAULTS,
  unstyled: UNSTYLED,
  colors: COLORS,
  defaultVariants: DEFAULT_VARIANTS,
  compoundVariants: COMPOUND_VARIANTS,
} = SYSTEM_CONFIG_KEY;

const EMPTY_OBJECT = Object.freeze({});

/**
 * Shallow clone a plain object (one level deep).
 * Avoids the overhead of lodash cloneDeep for flat config objects.
 */
function shallowClone(object) {
  if (!object || typeof object !== "object") return {};

  return Object.assign({}, object);
}

/**
 * Deep clone plain objects and arrays recursively.
 * Handles only primitives, plain objects, and arrays (sufficient for config data).
 */
function deepClone(source) {
  if (source === null || typeof source !== "object") return source;

  if (Array.isArray(source)) {
    const result = new Array(source.length);

    for (let i = 0; i < source.length; i++) {
      result[i] = deepClone(source[i]);
    }

    return result;
  }

  const result = {};

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      result[key] = deepClone(source[key]);
    }
  }

  return result;
}

/**
 * Check if a plain object has own keys (avoids Object.keys allocation).
 */
function hasOwnKeys(object) {
  if (!object || typeof object !== "object") return false;

  for (const _ in object) {
    if (Object.prototype.hasOwnProperty.call(object, _)) return true;
  }

  return false;
}

export function createMergeConfigs(cx) {
  /**
   * Recursively merge config objects with removing tailwind classes duplicates.
   * config - final merged config.
   * isVariants - if true, prevents adding a "base" key into nested objects.
   */
  function mergeConfigs({
    defaultConfig,
    globalConfig,
    propsConfig,
    config = {},
    isVariants = false,
  }) {
    const globalObj = stringToObject(globalConfig, true);
    const propsObj = stringToObject(propsConfig, true);

    const isGlobalConfig = hasOwnKeys(globalObj);
    const isPropsConfig = hasOwnKeys(propsObj);

    // Early return: no overrides, just return a shallow clone of the default
    if (!isGlobalConfig && !isPropsConfig) {
      return shallowClone(stringToObject(defaultConfig, true));
    }

    // Build composedConfig with all unique keys
    const defaultObj = stringToObject(defaultConfig, true);
    const composedConfig = Object.assign({}, defaultObj);

    // Add unique keys from globalConfig
    for (const key in globalObj) {
      if (!(key in composedConfig)) {
        composedConfig[key] = globalObj[key];
      }
    }

    // Add unique keys from propsConfig
    for (const key in propsObj) {
      if (!(key in composedConfig)) {
        composedConfig[key] = propsObj[key];
      }
    }

    for (const key in composedConfig) {
      if (key === COLORS) {
        if (propsObj[key]) {
          // eslint-disable-next-line no-console
          console.warn(`Passing '${key}' key in 'config' prop is not allowed.`);
        }
      } else if (key === UNSTYLED) {
        config[key] = propsObj[key] || globalObj[key] || defaultObj[key];
      } else if (key === DEFAULTS || key === DEFAULT_VARIANTS) {
        config[key] = {
          ...defaultObj[key],
          ...globalObj[key],
          ...propsObj[key],
        };
      } else if (key === COMPOUND_VARIANTS) {
        config[key] = mergeCompoundVariants({
          defaultConfig: defaultObj,
          globalConfig: globalObj,
          propsConfig: propsObj,
        });
      } else {
        const composedValue = composedConfig[key];
        const globalValue = globalObj[key];
        const propsValue = propsObj[key];

        const isObject =
          (composedValue !== null && typeof composedValue === "object") ||
          (globalValue !== undefined && typeof globalValue === "object") ||
          (propsValue !== undefined && typeof propsValue === "object");
        const isEmpty = composedValue === null;
        const isI18n = key === I18N;

        if (key === "variants" && !isVariants) {
          isVariants = true;
        }

        let mergedKey = "";

        if (isObject && !isEmpty && !isI18n) {
          const addBase = !isVariants;
          const defaultNested = stringToObject(composedValue, addBase);

          mergedKey = mergeConfigs({
            defaultConfig: defaultNested,
            globalConfig: stringToObject(globalValue, addBase),
            propsConfig: stringToObject(propsValue, addBase),
            config: shallowClone(defaultNested),
            isVariants,
          });
        } else if (isI18n) {
          mergedKey = propsValue || globalValue || defaultObj[key];
        } else {
          mergedKey = cx([defaultObj[key], globalValue, propsValue]);
        }

        config[key] = mergedKey;
      }
    }

    return config;
  }

  /**
   * Merge CVA compound variants arrays.
   */
  function mergeCompoundVariants({ defaultConfig, globalConfig, propsConfig }) {
    if (
      (globalConfig.compoundVariants && !Array.isArray(globalConfig.compoundVariants)) ||
      (propsConfig.compoundVariants && !Array.isArray(propsConfig.compoundVariants)) ||
      (defaultConfig.compoundVariants && !Array.isArray(defaultConfig.compoundVariants))
    ) {
      // eslint-disable-next-line no-console
      console.error("CompoundVariants should be an array.");
    }

    // Early return: no compound variants at all
    if (
      !defaultConfig.compoundVariants &&
      !globalConfig.compoundVariants &&
      !propsConfig.compoundVariants
    ) {
      return [];
    }

    const defaultCompoundVariants = expandCompoundVariants(defaultConfig.compoundVariants);
    const globalCompoundVariants = expandCompoundVariants(globalConfig.compoundVariants);
    const propsCompoundVariants = expandCompoundVariants(propsConfig.compoundVariants);

    // Track consumed indices via Sets instead of splicing arrays (avoids O(n) shifts)
    const consumedGlobalIndices = new Set();
    const consumedPropsIndices = new Set();

    const config = defaultCompoundVariants?.map((defaultConfigItem) => {
      const defaultKeys = Object.keys(defaultConfigItem);

      /**
       * Compare two objects by keys for match (avoids .map().every() — uses plain loop).
       */
      function isSameItem(configItem) {
        for (let i = 0; i < defaultKeys.length; i++) {
          const key = defaultKeys[i];

          if (key !== "class" && defaultConfigItem[key] !== configItem[key]) return false;
        }

        const configKeys = Object.keys(configItem);

        for (let i = 0; i < configKeys.length; i++) {
          const key = configKeys[i];

          if (key !== "class" && defaultConfigItem[key] !== configItem[key]) return false;
        }

        return true;
      }

      let globalConfigItem;
      let propsConfigItem;

      // Find matching global compound variant (skip already consumed)
      for (let i = 0; i < globalCompoundVariants.length; i++) {
        if (!consumedGlobalIndices.has(i) && isSameItem(globalCompoundVariants[i])) {
          globalConfigItem = globalCompoundVariants[i];
          consumedGlobalIndices.add(i);

          break;
        }
      }

      // Find matching props compound variant (skip already consumed)
      for (let i = 0; i < propsCompoundVariants.length; i++) {
        if (!consumedPropsIndices.has(i) && isSameItem(propsCompoundVariants[i])) {
          propsConfigItem = propsCompoundVariants[i];
          consumedPropsIndices.add(i);

          break;
        }
      }

      return globalConfigItem || propsConfigItem
        ? {
            ...defaultConfigItem,
            class: cx([defaultConfigItem.class, globalConfigItem?.class, propsConfigItem?.class]),
          }
        : defaultConfigItem;
    });

    // Collect unconsumed global and props variants (avoids spread of spliced arrays)
    const remaining = [];

    for (let i = 0; i < globalCompoundVariants.length; i++) {
      if (!consumedGlobalIndices.has(i)) remaining.push(globalCompoundVariants[i]);
    }

    for (let i = 0; i < propsCompoundVariants.length; i++) {
      if (!consumedPropsIndices.has(i)) remaining.push(propsCompoundVariants[i]);
    }

    return config && config.length ? config.concat(remaining) : remaining;
  }

  /**
   * Convert compound variants with arrays in values into compound variants with primitives.
   */
  function expandCompoundVariants(compoundVariants) {
    if (!compoundVariants || !compoundVariants.length) return [];

    // Deep clone only once at the top level
    const cloned = deepClone(compoundVariants);

    function expand(compoundVariant) {
      let firstArrayKey;

      for (const key in compoundVariant) {
        if (Array.isArray(compoundVariant[key])) {
          firstArrayKey = key;

          break;
        }
      }

      if (!firstArrayKey) return [compoundVariant];

      const values = compoundVariant[firstArrayKey];
      const result = [];

      for (let i = 0; i < values.length; i++) {
        const expanded = Object.assign({}, compoundVariant, { [firstArrayKey]: values[i] });
        const subExpanded = expand(expanded);

        for (let j = 0; j < subExpanded.length; j++) {
          result.push(subExpanded[j]);
        }
      }

      return result;
    }

    const result = [];

    for (let i = 0; i < cloned.length; i++) {
      const expanded = expand(cloned[i]);

      for (let j = 0; j < expanded.length; j++) {
        result.push(expanded[j]);
      }
    }

    return result;
  }

  return mergeConfigs;
}

export function createGetMergedConfig(cx) {
  const mergeConfigs = createMergeConfigs(cx);

  /**
   * Get merged config based on config merging strategy.
   */
  function getMergedConfig({ defaultConfig, globalConfig, propsConfig, unstyled }) {
    const isUnstyled = propsConfig?.unstyled || globalConfig?.unstyled || unstyled;

    if (isUnstyled) {
      defaultConfig = {
        ...(defaultConfig[I18N] ? { [I18N]: defaultConfig[I18N] } : EMPTY_OBJECT),
        ...(defaultConfig[DEFAULTS] ? { [DEFAULTS]: defaultConfig[DEFAULTS] } : EMPTY_OBJECT),
        [UNSTYLED]: defaultConfig[UNSTYLED],
      };
    } else {
      defaultConfig = shallowClone(defaultConfig);
    }

    return mergeConfigs({ defaultConfig, globalConfig, propsConfig });
  }

  return getMergedConfig;
}

/**
 * Turn simplified nested component config to regular config.
 */
function stringToObject(value, addBase) {
  if (value === undefined || value === null) {
    return addBase ? { base: "" } : EMPTY_OBJECT;
  }

  if (typeof value !== "object") {
    return addBase ? { base: value || "" } : EMPTY_OBJECT;
  }

  return value;
}
