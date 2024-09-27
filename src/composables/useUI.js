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
  computed,
} from "vue";

import { cx, cva, setColor, getColor, vuelessConfig } from "../utils/utilUI.js";

import { cloneDeep, isCSR } from "../utils/utilHelper.js";
import {
  STRATEGY_TYPE,
  CVA_CONFIG_KEY,
  SYSTEM_CONFIG_KEY,
  NESTED_COMPONENT_REG_EXP,
} from "../constants.js";

/**
  Merging component configs in a given sequence (bigger number = bigger priority):
  1. Default component config
  2. Custom global component config (/vueless.config.js)
  3. Component config (:config="{...}" props)
  4. Component classes (class="...")
 */
export default function useUI(defaultConfig = {}, propsConfigGetter = null, topLevelClassKey) {
  const { type, props } = getCurrentInstance();
  const componentName = type.__name;
  const globalConfig = vuelessConfig.component ? vuelessConfig.component[componentName] : {};

  const isStrategyValid =
    vuelessConfig.strategy && Object.values(STRATEGY_TYPE).includes(vuelessConfig.strategy);
  const vuelessStrategy = isStrategyValid ? vuelessConfig.strategy : STRATEGY_TYPE.merge;

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

  /**
   * Get classes by given key (including CVA if config set).
   * @param {string} key
   * @param {Object} mutatedProps
   * @returns {ComputedRef | String}
   */
  function getClasses(key, mutatedProps = {}) {
    return computed(() => {
      const color = toValue(mutatedProps)?.color || props.color;

      let value = config.value[key];

      if (isCVA(value)) {
        value = cva(value)({
          ...props,
          ...toValue(mutatedProps),
          color: color ? getColor(color) : null,
        });
      } else if (value.component) {
        // If the value of the key contains keys related to the nested component, it should be skipped.
        // Probably this should be fixed later to be possible to extend key with nested component keys.
        return "";
      }

      return color ? setColor(value, color) : value;
    });
  }

  /**
   * Get an object where:
   * – key: extendingKey
   * – value: reactive string of extendingKey classes.
   * @param {Array} extendingKeys
   * @param {Object} mutatedProps
   * @returns {Object}
   */
  function getExtendingKeysClasses(extendingKeys, mutatedProps = {}) {
    const extendingClasses = {};

    for (const key of extendingKeys) {
      extendingClasses[key] = getClasses(key, mutatedProps);
    }

    return extendingClasses;
  }

  /**
   * Get an object where:
   * – key: elementKey
   * – value: reactive object of string element attributes (with classes).
   * @param mutatedProps
   * @param extendingKeys
   * @param keysToExtendConfig
   * @returns {Object}
   */
  function getKeysAttrs(mutatedProps, extendingKeys = [], keysToExtendConfig = {}) {
    const keysToExtend = Object.keys(keysToExtendConfig);
    const keysAttrs = {};

    for (const key in defaultConfig) {
      if (isSystemKey(key) || extendingKeys.includes(key)) continue;

      keysAttrs[`${key}Attrs`] = getAttrs(key, {
        classes: getClasses(key, mutatedProps),
      });

      if (keysToExtend.includes(key)) {
        const { base, extend } = keysToExtendConfig[key];
        const keyAttrs = keysAttrs[`${key}Attrs`];

        // TODO: if value of the key contains keys related to the nested nested component it should be skipped
        keysAttrs[`${key}Attrs`] = computed(() => ({
          ...keyAttrs.value,
          class: cx([
            ...(Array.isArray(base) ? toValue(base) : [toValue(base)]),
            keyAttrs.value.class,
            ...(Array.isArray(extend) ? toValue(extend) : [toValue(extend)]),
          ]),
        }));
      }
    }

    return keysAttrs;
  }

  /**
   * Get an element attributes for a given key.
   * @param {String} configKey
   * @param {Object} options with classes
   * @returns {Object} element attributes
   */
  function getAttrs(configKey, options) {
    const nestedComponent = getNestedComponent(defaultConfig[configKey]);

    const attrs = useAttrs();
    const isDev = isCSR && import.meta.env?.DEV;
    const vuelessAttrs = ref({});
    const isTopLevelKey = (topLevelClassKey || firstClassKey) === configKey;

    const commonAttrs = {
      ...(isTopLevelKey ? attrs : {}),
      "vl-component": isDev ? attrs["vl-component"] || componentName || null : null,
      "vl-key": isDev ? attrs["vl-config-key"] || configKey || null : null,
      "vl-child-component":
        isDev && attrs["vl-component"] ? nestedComponent || componentName : null,
      "vl-child-key": isDev && attrs["vl-component"] ? configKey : null,
    };

    // Delete value key to prevent v-model overwrite
    delete commonAttrs.value;

    watch(config, updateVuelessAttrs, { immediate: true });
    watch(props, updateVuelessAttrs);
    options?.classes?.value && watch(options?.classes, updateVuelessAttrs);

    function updateVuelessAttrs() {
      const configKeyValue = config.value[configKey];
      const isObject = typeof configKeyValue === "object";

      const configAttrs = {
        config: configKeyValue,
        ...configKeyValue?.defaults,
      };

      const isTopLevelClassKey = configKey === (topLevelClassKey || firstClassKey);
      const attrClass = isTopLevelClassKey && !nestedComponent ? attrs.class : "";

      // TODO: remove `getBaseClasses(configKeyValue)` after migration of all composables to the new logic
      vuelessAttrs.value = {
        ...commonAttrs,
        class: cx([
          getBaseClasses(configKeyValue),
          getBaseClasses(toValue(options?.classes)),
          attrClass,
        ]),
        ...((isObject && configAttrs) || {}),
      };
    }

    return vuelessAttrs;
  }

  return {
    config,
    setColor,
    getColor,
    getAttrs,
    getKeysAttrs,
    getExtendingKeysClasses,
    isCVA,
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
    defaults,
    strategy,
    safelist,
    component,
    safelistColors,
    defaultVariants,
    compoundVariants,
  } = SYSTEM_CONFIG_KEY;

  for (let key in composedConfig) {
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
  const component = value?.component || "";
  const match =
    classes.match(NESTED_COMPONENT_REG_EXP) || component.match(NESTED_COMPONENT_REG_EXP);

  return match ? match[1] : "";
}

/**
 Check is config key not contains classes or CVA config object.
 @param { String } key
 @returns { Boolean }
 */
function isSystemKey(key) {
  const isExactKey = Object.values(SYSTEM_CONFIG_KEY).some((value) => value === key);

  return isExactKey || key.toLowerCase().includes(SYSTEM_CONFIG_KEY.transition.toLowerCase());
}

/**
 Check is config contains default CVA keys.
 @param { Object | String } config
 @returns { Boolean }
 */
function isCVA(config) {
  if (typeof config !== "object") return false;

  return Object.values(CVA_CONFIG_KEY).some((value) =>
    Object.keys(config).some((key) => key === value),
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
