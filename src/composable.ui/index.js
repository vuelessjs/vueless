import {
  ref,
  watchEffect,
  getCurrentInstance,
  toValue,
  useAttrs,
  Comment,
  Text,
  Fragment,
} from "vue";
import { cx, globalComponentConfig, strategy } from "../service.ui";
import { cloneDeep } from "../service.helper";

const strategyType = {
  merge: "merge",
  replace: "replace",
  overwrite: "overwrite",
};

/**
  Merging component configs in a given sequence (bigger number = bigger priority):
  1. Default component config
  2. Custom global component config (/vueless.config.js)
  3. Component config (:config="{...}" props)
  4. Component classes (class="...")
 */
export default function useUI(defaultConfig = {}, propsConfigGetter = null, topLevelClassKey) {
  const { name: componentName } = getCurrentInstance().type;
  const globalConfig = globalComponentConfig[componentName];

  const isStrategyValid = strategy && Object.values(strategyType).includes(strategy);
  const vuelessStrategy = isStrategyValid ? strategy : strategyType.merge;

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
    const cvaClasses = options?.classes || "";
    const isComponent = options?.isComponent;

    const attrs = useAttrs();
    const isDev = import.meta.env.DEV;
    const vuelessAttrs = ref({});

    const commonAttrs = {
      ...attrs,
      component: isDev && (attrs.component || componentName || null),
      "config-key": isDev && (attrs["config-key"] || configKey || null),
      "child-component": isDev && attrs.component ? componentName : null,
      "child-config-key": isDev && attrs.component ? configKey : null,
    };

    // Delete value key to prevent v-model overwrite
    delete commonAttrs.value;

    watchEffect(() => {
      const configKeyValue = config.value[configKey];
      const isObject = typeof configKeyValue === "object";

      const configAttrs = {
        config: configKeyValue,
        ...configKeyValue?.defaultVariants,
      };

      const isTopLevelClassKey = configKey === (topLevelClassKey || firstClassKey);

      const attrClass = isTopLevelClassKey && !isComponent ? attrs.class : "";
      const configKeyClass = isObject ? configKeyValue.base : configKeyValue;

      vuelessAttrs.value = {
        ...commonAttrs,
        class: cx([configKeyClass, toValue(cvaClasses), attrClass]),
        ...((isObject && configAttrs) || {}),
      };
    });

    return vuelessAttrs;
  }

  return {
    config,
    getAttrs,
    setColor,
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
      ? strategyType.merge
      : propsConfig?.strategy || globalConfig?.strategy || vuelessStrategy;

  if (strategy === strategyType.merge) {
    return mergeConfigs({ defaultConfig, globalConfig, propsConfig });
  }

  if (strategy === strategyType.replace) {
    return mergeConfigs({ defaultConfig, globalConfig, propsConfig, isReplace: true });
  }

  if (strategy === strategyType.overwrite) {
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

  @returns {Object}
 */
function mergeConfigs({
  defaultConfig,
  globalConfig,
  propsConfig,
  config = {},
  isReplace = false,
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

  for (let key in composedConfig) {
    if (isGlobalConfig || isPropsConfig) {
      if (key === "strategy") {
        config[key] = propsConfig[key] || globalConfig[key] || defaultConfig[key];
      } else if (key === "safelist" || key === "safelistColors") {
        if (propsConfig[key]) {
          // eslint-disable-next-line no-console
          console.warn(`Passing '${key}' key by 'config' prop is not allowed.`);
        }
      } else if (key === "defaultVariants") {
        config[key] = { ...defaultConfig[key], ...globalConfig[key], ...propsConfig[key] };
      } else if (key === "compoundVariants") {
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
        const isIconName = /^.*(iconName|IconName)$/.test(key);
        const isI18n = key === "i18n";

        config[key] =
          isObject && !isEmpty && !isI18n
            ? mergeConfigs({
                defaultConfig: stringToObject(composedConfig[key]),
                globalConfig: stringToObject(globalConfig[key]),
                propsConfig: stringToObject(propsConfig[key]),
                config: stringToObject(composedConfig[key]),
                isReplace,
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
  @returns {Object}
 */
function stringToObject(value) {
  return typeof value === "object" ? value : { base: value };
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

function setColor(classes, color) {
  return classes?.replaceAll("{color}", color);
}
