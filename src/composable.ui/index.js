import {
  ref,
  watch,
  watchEffect,
  getCurrentInstance,
  toValue,
  useAttrs,
  Comment,
  Text,
  Fragment,
} from "vue";

import {
  cx,
  setColor,
  getColor,
  strategy,
  nestedComponentRegEx,
  globalComponentConfig,
} from "../service.ui";

import { cloneDeep } from "../service.helper";

const STRATEGY_TYPE = {
  merge: "merge",
  replace: "replace",
  overwrite: "overwrite",
};

const SYSTEM_CONFIG_KEY = {
  i18n: "i18n",
  strategy: "strategy",
  safelist: "safelist",
  safelistColors: "safelistColors",
  defaultVariants: "defaultVariants",
  compoundVariants: "compoundVariants",
  iconNameCapitalize: "IconName",
  iconName: "iconName",
};

/**
  Merging component configs in a given sequence (bigger number = bigger priority):
  1. Default component config
  2. Custom global component config (/vueless.config.js)
  3. Component config (:config="{...}" props)
  4. Component classes (class="...")
 */
export default function useUI(defaultConfig = {}, propsConfigGetter = null, topLevelClassKey) {
  const { type, props } = getCurrentInstance();
  const componentName = type.name;
  const globalConfig = globalComponentConfig[componentName];

  const isStrategyValid = strategy && Object.values(STRATEGY_TYPE).includes(strategy);
  const vuelessStrategy = isStrategyValid ? strategy : STRATEGY_TYPE.merge;

  const [firstClassKey] = Object.keys(defaultConfig);
  const config = ref({});
  const attrs = useAttrs();

  watchEffect(() => {
    const propsConfig = propsConfigGetter && propsConfigGetter();

    const mergedConfig = getMergedConfig({
      defaultConfig,
      globalConfig,
      propsConfig,
      vuelessStrategy,
    });

    config.value = mergeClassesIntoConfig(mergedConfig, topLevelClassKey || firstClassKey, attrs);
  });

  function getAttrs(configKey, options) {
    const nestedComponent = options?.isComponent || getNestedComponent(defaultConfig[configKey]); // TODO: Remove `options?.isComponent` when all `attrs.composable.js` will be migranted

    const attrs = useAttrs();
    const isDev = import.meta.env.DEV;
    const vuelessAttrs = ref({});

    const commonAttrs = {
      ...attrs,
      component: isDev ? attrs.component || componentName || null : null,
      "config-key": isDev ? attrs["config-key"] || configKey || null : null,
      "child-component": isDev && attrs.component ? nestedComponent || componentName : null,
      "child-config-key": isDev && attrs.component ? configKey : null,
    };

    // Delete value key to prevent v-model overwrite
    delete commonAttrs.value;

    watch(config, updateVuelessAttrs, { immediate: true });
    watch(props, updateVuelessAttrs);

    function updateVuelessAttrs() {
      const configKeyValue = config.value[configKey];
      const isObject = typeof configKeyValue === "object";

      const configAttrs = {
        config: configKeyValue,
        ...configKeyValue?.defaultVariants,
      };

      const isTopLevelClassKey = configKey === (topLevelClassKey || firstClassKey);
      const attrClass = isTopLevelClassKey && !nestedComponent ? attrs.class : "";
      // TODO: Uncomment and add into `cx` when getAttrs as a function will be resolved.
      // const classes = toValue(options?.classes) || getBaseClasses(configKeyValue);

      vuelessAttrs.value = {
        ...commonAttrs,
        class: cx([getBaseClasses(configKeyValue), toValue(options?.classes), attrClass]),
        ...((isObject && configAttrs) || {}),
      };
    }

    return vuelessAttrs;
  }

  return {
    config,
    getAttrs,
    getColor,
    setColor,
    isSystemKey,
    hasSlotContent,
  };
}

/**
  Get merged config based on config merging strategy.
  @param {Object} defaultConfig
  @param {Object} globalConfig
  @param {Object} propsConfig
  @param {string} vuelessStrategy - vueless top level merge strategy.

  @returns {Object}
 */
function getMergedConfig({ defaultConfig, globalConfig, propsConfig, vuelessStrategy }) {
  defaultConfig = cloneDeep(defaultConfig);

  const strategy =
    !globalConfig && !propsConfig
      ? STRATEGY_TYPE.merge
      : propsConfig?.strategy || globalConfig?.strategy || vuelessStrategy;

  if (strategy === STRATEGY_TYPE.merge) {
    return mergeConfigs({ defaultConfig, globalConfig, propsConfig });
  }

  if (strategy === STRATEGY_TYPE.replace) {
    return mergeConfigs({ defaultConfig, globalConfig, propsConfig, isReplace: true });
  }

  if (strategy === STRATEGY_TYPE.overwrite) {
    const isGlobalConfig = globalConfig && Object.keys(globalConfig).length;
    const isPropsConfig = propsConfig && Object.keys(propsConfig).length;

    return isPropsConfig ? propsConfig : isGlobalConfig ? globalConfig : defaultConfig;
  }
}

/**
  Recursively merge config objects with removing tailwind classes duplicates.
  @param {Object} defaultConfig
  @param {Object} globalConfig
  @param {Object} propsConfig
  @param {Object} config - final merged config.
  @param {boolean} isReplace - enables class replacement instead of merge.
  @param {boolean} isVarinants - if true, prevents adding a "base" key into nested objects.

  @returns {Object}
 */
function mergeConfigs({
  defaultConfig,
  globalConfig,
  propsConfig,
  config = {},
  isReplace = false,
  isVariants = false,
}) {
  globalConfig = cloneDeep(globalConfig || {});
  propsConfig = cloneDeep(propsConfig || {});

  const isGlobalConfig = Object.keys(globalConfig).length;
  const isPropsConfig = Object.keys(propsConfig).length;

  // Add unique keys from defaultConfig to composedConfig
  let composedConfig = cloneDeep(defaultConfig);

  // Add unique keys from globalConfig to composedConfig
  for (let key in globalConfig) {
    if (!Object.keys(composedConfig).includes(key)) {
      composedConfig[key] = globalConfig[key];
    }
  }

  // Add unique keys from propsConfig to composedConfig
  for (let key in propsConfig) {
    if (!Object.keys(composedConfig).includes(key)) {
      composedConfig[key] = propsConfig[key];
    }
  }

  const {
    i18n,
    strategy,
    safelist,
    safelistColors,
    defaultVariants,
    compoundVariants,
    iconNameCapitalize,
    iconName,
  } = SYSTEM_CONFIG_KEY;

  for (let key in composedConfig) {
    if (isGlobalConfig || isPropsConfig) {
      if (key === strategy) {
        config[key] = propsConfig[key] || globalConfig[key] || defaultConfig[key];
      } else if (key === safelist || key === safelistColors) {
        if (propsConfig[key]) {
          // eslint-disable-next-line no-console
          console.warn(`Passing '${key}' key in 'config' prop is not allowed.`);
        }
      } else if (key === defaultVariants) {
        config[key] = { ...defaultConfig[key], ...globalConfig[key], ...propsConfig[key] };
      } else if (key === compoundVariants) {
        config[key] = mergeCompoundVariants({
          defaultConfig: composedConfig,
          globalConfig,
          propsConfig,
          isReplace,
          key,
        });
      } else {
        const isObjectComposedConfig = typeof composedConfig[key] === "object";
        const isObjectGlobalConfig = typeof globalConfig[key] === "object";
        const isObjectPropsConfig = typeof propsConfig[key] === "object";

        const isObject = isObjectComposedConfig || isObjectGlobalConfig || isObjectPropsConfig;
        const isEmpty = composedConfig[key] === null;
        const isIconName = key.includes(iconName) || key.includes(iconNameCapitalize);
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
            : isReplace || isIconName || isI18n
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
 Turn simplified nested component config to regular config.
 @param {Object | String} value
 @param {Boolean} addBase
 @returns {Object}
 */
function stringToObject(value, { addBase = false }) {
  if (value === undefined) value = "";

  return typeof value !== "object" ? addBase && { base: value } : value;
}

/**
  Merge CVA compound variants arrays.
  @param {Object} defaultConfig
  @param {Object} globalConfig
  @param {Object} propsConfig
  @param {string} key
  @param {boolean} isReplace - enables class replacement instead of merge.

  @returns {Array}
 */
function mergeCompoundVariants({ defaultConfig, globalConfig, propsConfig, key, isReplace }) {
  if (
    (globalConfig[key] && !Array.isArray(globalConfig[key])) ||
    (propsConfig[key] && !Array.isArray(propsConfig[key])) ||
    (defaultConfig[key] && !Array.isArray(defaultConfig[key]))
  ) {
    // eslint-disable-next-line no-console
    console.error("CompoundVariants should be an array.");
  }

  let globalConfigUniqueItems = cloneDeep(globalConfig[key] || []);
  let propsConfigUniqueItems = cloneDeep(propsConfig[key] || []);

  const config = defaultConfig[key].map((defaultConfigItem) => {
    /**
     Compare two objects by keys for match.
     @param {Object} configItem
     @returns {Boolean}
     */
    function isSameItem(configItem) {
      const hasConfigItemKeys = Object.keys(defaultConfigItem)
        .map((key) => defaultConfigItem[key] === configItem[key] || key === "class")
        .every((item) => !!item);

      const hasDefaultConfigItemKeys = Object.keys(configItem)
        .map((key) => defaultConfigItem[key] === configItem[key] || key === "class")
        .every((item) => !!item);

      return hasConfigItemKeys && hasDefaultConfigItemKeys;
    }

    /**
     Find the same compound variant item in custom config if exist.
     @param {Object} config
     @returns {Object|undefined}
     */
    function findItem(config = []) {
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

    const globalConfigItem = findItem(globalConfig[key]);
    const propsConfigItem = findItem(propsConfig[key]);

    return globalConfigItem || propsConfigItem
      ? {
          ...defaultConfigItem,
          class: isReplace
            ? propsConfigItem?.class || globalConfigItem?.class || defaultConfigItem.class
            : cx([defaultConfigItem.class, globalConfigItem?.class, propsConfigItem?.class]),
        }
      : defaultConfigItem;
  });

  return [...config, ...globalConfigUniqueItems, ...propsConfigUniqueItems];
}

/**
  Merge component classes from "class" attribute into final config.
  @param {Object} config
  @param {Object} attrs
  @param {string} topLevelClassKey

  @returns {Object}
 */
function mergeClassesIntoConfig(config, topLevelClassKey, attrs) {
  if (typeof config[topLevelClassKey] === "object") {
    config[topLevelClassKey].base = cx([config[topLevelClassKey]?.base, attrs.class]);
  } else {
    config[topLevelClassKey] = cx([config[topLevelClassKey], attrs.class]);
  }

  return config;
}

/**
 Return base classes.
 @param { String | Object } value
 @returns { String }
 */
function getBaseClasses(value) {
  return typeof value === "object" ? value.base || "" : value || "";
}

/**
 Check is config key contains component name and if contains return it.
 @param { String | Object } value
 @returns { String }
 */
function getNestedComponent(value) {
  const classes = getBaseClasses(value);
  const match = classes.match(nestedComponentRegEx);

  return match ? match[1] : "";
}

/**
 Check is config key not contains classes or CVA config object.
 @param { String } key
 @returns { Boolean }
 */
function isSystemKey(key) {
  const isExactKey = Object.values(SYSTEM_CONFIG_KEY).some((value) => value === key);

  return (
    isExactKey ||
    key.includes(SYSTEM_CONFIG_KEY.iconName) ||
    key.includes(SYSTEM_CONFIG_KEY.iconNameCapitalize)
  );
}

/**
  Check if slot defined, and have a content.
  @param slot
  @param props

  @returns {boolean}
 */
function hasSlotContent(slot, props = {}) {
  const asArray = (arg) => (Array.isArray(arg) ? arg : arg != null ? [arg] : []);

  const isVNodeEmpty = (vnode) => {
    return (
      !vnode ||
      asArray(vnode).every(
        (vnode) =>
          vnode.type === Comment ||
          (vnode.type === Text && !vnode.children?.length) ||
          (vnode.type === Fragment && !vnode.children?.length),
      )
    );
  };

  return !isVNodeEmpty(slot?.(props));
}
