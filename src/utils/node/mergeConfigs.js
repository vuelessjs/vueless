import { cloneDeep } from "lodash-es";

import { SYSTEM_CONFIG_KEY } from "../../constants.js";

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
    globalConfig = cloneDeep(stringToObject(globalConfig, { addBase: true }));
    propsConfig = cloneDeep(stringToObject(propsConfig, { addBase: true }));

    const isGlobalConfig = Object.keys(globalConfig).length;
    const isPropsConfig = Object.keys(propsConfig).length;

    // Add unique keys from defaultConfig to composedConfig
    const composedConfig = cloneDeep(stringToObject(defaultConfig, { addBase: true }));

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

    const { i18n, defaults, unstyled, colors, defaultVariants, compoundVariants } =
      SYSTEM_CONFIG_KEY;

    for (const key in composedConfig) {
      if (isGlobalConfig || isPropsConfig) {
        if (key === colors) {
          if (propsConfig[key]) {
            // eslint-disable-next-line no-console
            console.warn(`Passing '${key}' key in 'config' prop is not allowed.`);
          }
        } else if (key === unstyled) {
          config[key] = propsConfig[key] || globalConfig[key] || defaultConfig[key];
        } else if (key === defaults || key === defaultVariants) {
          config[key] = {
            ...defaultConfig[key],
            ...globalConfig[key],
            ...propsConfig[key],
          };
        } else if (key === compoundVariants) {
          config[key] = mergeCompoundVariants({
            defaultConfig,
            globalConfig,
            propsConfig,
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

          let mergedKey = "";

          if (isObject && !isEmpty && !isI18n) {
            mergedKey = mergeConfigs({
              defaultConfig: stringToObject(composedConfig[key], { addBase: !isVariants }),
              globalConfig: stringToObject(globalConfig[key], { addBase: !isVariants }),
              propsConfig: stringToObject(propsConfig[key], { addBase: !isVariants }),
              config: stringToObject(composedConfig[key], { addBase: !isVariants }),
              isVariants,
            });
          } else if (isI18n) {
            mergedKey = propsConfig[key] || globalConfig[key] || defaultConfig[key];
          } else {
            mergedKey = cx([defaultConfig[key], globalConfig[key], propsConfig[key]]);
          }

          config[key] = mergedKey;
        }
      } else {
        config[key] = composedConfig[key];
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

    const defaultCompoundVariants = expandCompoundVariants(defaultConfig.compoundVariants);
    const globalCompoundVariants = expandCompoundVariants(globalConfig.compoundVariants);
    const propsCompoundVariants = expandCompoundVariants(propsConfig.compoundVariants);

    const config = defaultCompoundVariants?.map((defaultConfigItem) => {
      /**
       * Compare two objects by keys for match.
       */
      function isSameItem(configItem) {
        const hasConfigItemKeys = Object.keys(defaultConfigItem)
          .map((key) => defaultConfigItem[key] === configItem[key] || key === "class")
          .every((item) => Boolean(item));

        const hasDefaultConfigItemKeys = Object.keys(configItem)
          .map((key) => defaultConfigItem[key] === configItem[key] || key === "class")
          .every((item) => Boolean(item));

        return hasConfigItemKeys && hasDefaultConfigItemKeys;
      }

      /**
       * Find the same compound variant item in custom config if existed.
       */
      function findItem(config = []) {
        config = cloneDeep(config);

        const globalConfigSimilarItemIndex = globalCompoundVariants.findIndex(isSameItem);
        const propsConfigSimilarItemIndex = propsCompoundVariants.findIndex(isSameItem);

        if (~globalConfigSimilarItemIndex) {
          config.push(globalCompoundVariants[globalConfigSimilarItemIndex]);
          globalCompoundVariants.splice(globalConfigSimilarItemIndex, 1);
        }

        if (~propsConfigSimilarItemIndex) {
          config.push(propsCompoundVariants[propsConfigSimilarItemIndex]);
          propsCompoundVariants.splice(propsConfigSimilarItemIndex, 1);
        }

        return config.find(isSameItem);
      }

      const globalConfigItem = findItem(globalCompoundVariants);
      const propsConfigItem = findItem(propsCompoundVariants);

      return globalConfigItem || propsConfigItem
        ? {
            ...defaultConfigItem,
            class: cx([defaultConfigItem.class, globalConfigItem?.class, propsConfigItem?.class]),
          }
        : defaultConfigItem;
    });

    return [...(config || []), ...globalCompoundVariants, ...propsCompoundVariants];
  }

  /**
   * Convert compound variants with arrays in values into compound variants with primitives.
   */
  function expandCompoundVariants(compoundVariants) {
    compoundVariants = cloneDeep(compoundVariants || []);

    function expand(compoundVariant) {
      const keysWithArray = Object.keys(compoundVariant).filter((key) =>
        Array.isArray(compoundVariant[key]),
      );

      if (!keysWithArray.length) {
        return [compoundVariant];
      }

      const [firstKey] = keysWithArray;
      const expandedArray = compoundVariant[firstKey].map((value) => ({
        ...compoundVariant,
        [firstKey]: value,
      }));

      // Recursively expand the remaining array keys
      return expandedArray.flatMap((expandedCompoundVariant) => expand(expandedCompoundVariant));
    }

    return compoundVariants.flatMap(expand);
  }

  return mergeConfigs;
}

export function createGetMergedConfig(cx) {
  const mergeConfigs = createMergeConfigs(cx);

  /**
   * Get merged config based on config merging strategy.
   */
  function getMergedConfig({ defaultConfig, globalConfig, propsConfig, unstyled }) {
    defaultConfig = cloneDeep(defaultConfig);

    const isUnstyled = propsConfig?.unstyled || globalConfig?.unstyled || unstyled;

    if (isUnstyled) {
      const { i18n, defaults, unstyled } = SYSTEM_CONFIG_KEY;

      defaultConfig = {
        ...(defaultConfig[i18n] ? { [i18n]: defaultConfig[i18n] } : {}),
        ...(defaultConfig[defaults] ? { [defaults]: defaultConfig[defaults] } : {}),
        [unstyled]: defaultConfig[unstyled],
      };
    }

    return mergeConfigs({ defaultConfig, globalConfig, propsConfig });
  }

  return getMergedConfig;
}

/**
 Turn simplified nested component config to regular config.
 */
function stringToObject(value, { addBase = false }) {
  if (typeof value !== "object" && addBase) {
    return { base: value || "" };
  }

  return typeof value === "object" ? value : addBase ? { base: value || "" } : {};
}
