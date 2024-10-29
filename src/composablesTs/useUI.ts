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

import { cx, cva, setColor, getColor, vuelessConfig } from "../utilsTs/utilUI.ts";
import { cloneDeep, isCSR } from "../utilsTs/utilHelper.ts";
import {
  STRATEGY_TYPE,
  CVA_CONFIG_KEY,
  SYSTEM_CONFIG_KEY,
  NESTED_COMPONENT_REG_EXP,
} from "../constants.ts";

import type { ComponentInternalInstance, Slot, VNode, ComputedRef } from "vue";
import type {
  BrandColors,
  Strategies,
  UnknownObject,
  VueAttrs,
  Component,
  NestedComponent,
  ComponentNames,
  CVA,
  KeyAttrs,
  KeysToExtend,
  CVACompoundVariants,
} from "../types.ts";

interface GetMergedConfig {
  defaultConfig: Component;
  globalConfig: Component;
  propsConfig?: Component;
  vuelessStrategy?: Strategies;
}

interface MergeConfigs {
  defaultConfig: Component & CVA;
  globalConfig: Component & CVA;
  propsConfig?: Component & CVA;
  config?: Component & CVA;
  isReplace?: boolean;
  isVariants?: boolean;
}

/**
 * Merging component configs in a given sequence (bigger number = bigger priority):
 * 1. Default component config
 * 2. Custom global component config (/vueless.config.{js,ts})
 * 3. Component config (:config="{...}" props)
 * 4. Component classes (class="...")
 */
export default function useUI(
  defaultConfig: Component,
  propsConfigGetter?: () => typeof defaultConfig | undefined,
  topLevelClassKey?: string,
) {
  const { type, props } = getCurrentInstance() as ComponentInternalInstance;
  const componentName = type.__name as ComponentNames;
  let globalConfig = {};

  if (vuelessConfig.component && componentName) {
    globalConfig = vuelessConfig.component[componentName] as UnknownObject as Component;
  }

  const isStrategyValid =
    vuelessConfig.strategy && Object.values(STRATEGY_TYPE).includes(vuelessConfig.strategy);

  const vuelessStrategy = isStrategyValid
    ? (vuelessConfig.strategy as Strategies)
    : (STRATEGY_TYPE.merge as Strategies);

  const firstClassKey = defaultConfig ? Object.keys(defaultConfig)[0] : "";
  const config = ref({} as Component);
  const attrs = useAttrs();

  watchEffect(() => {
    const propsConfig = propsConfigGetter ? propsConfigGetter() : {};

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
   */
  function getClasses(key: string, mutatedProps: UnknownObject) {
    return computed(() => {
      const color = (toValue(mutatedProps)?.color as BrandColors) || props?.color;
      const value = config.value[key] as CVA & NestedComponent;

      let classes = "";

      if (isCVA(value)) {
        classes = cva(value)({
          ...props,
          ...toValue(mutatedProps),
          ...(color ? { color: getColor(color) } : {}),
        });
      } else if (value.component) {
        // If the value of the key contains keys related to the nested component, it should be skipped.
        // Probably this should be fixed later to be possible to extend key with nested component keys.
        return "";
      }

      return color ? setColor(classes, color) : value;
    });
  }

  /**
   * Get an object where:
   * – key: extendingKey
   * – value: reactive string of extendingKey classes.
   */
  function getExtendingKeysClasses(extendingKeys: string[], mutatedProps = {}) {
    const extendingClasses: UnknownObject = {};

    for (const key of extendingKeys) {
      extendingClasses[key] = getClasses(key, mutatedProps);
    }

    return extendingClasses;
  }

  /**
   * Get an object where:
   * – key: elementKey
   * – value: reactive object of string element attributes (with classes).
   */
  function getKeysAttrs(
    mutatedProps = {},
    extendingKeys: string[] = [],
    keysToExtendConfig: Record<string, KeysToExtend> = {},
  ) {
    const keysToExtend = Object.keys(keysToExtendConfig);
    const keysAttrs: UnknownObject = {};

    for (const key in defaultConfig) {
      if (isSystemKey(key) || extendingKeys.includes(key)) continue;

      keysAttrs[`${key}Attrs`] = getAttrs(key, getClasses(key, mutatedProps));

      if (keysToExtend.includes(key)) {
        const { base, extend } = keysToExtendConfig[key];
        const keyAttrs = keysAttrs[`${key}Attrs`] as ComputedRef<KeyAttrs>;

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
   */
  function getAttrs(configKey: string, classes: ComputedRef) {
    const nestedComponent = getNestedComponent(defaultConfig[configKey] || "");

    const attrs = useAttrs();
    const isDev = isCSR && import.meta.env?.DEV;
    const vuelessAttrs = ref({});
    const isTopLevelKey = (topLevelClassKey || firstClassKey) === configKey;

    const commonAttrs: KeyAttrs = {
      ...(isTopLevelKey ? attrs : {}),
      "vl-component": isDev ? (attrs["vl-component"] as string) || componentName || null : null,
      "vl-key": isDev ? (attrs["vl-config-key"] as string) || configKey || null : null,
      "vl-child-component":
        isDev && attrs["vl-component"] ? nestedComponent || componentName : null,
      "vl-child-key": isDev && attrs["vl-component"] ? configKey : null,
    };

    // Delete value key to prevent v-model overwrite
    delete commonAttrs.value;

    watch(config, updateVuelessAttrs, { immediate: true });
    watch(props, updateVuelessAttrs);

    if (classes?.value) {
      watch(classes, updateVuelessAttrs);
    }

    function updateVuelessAttrs() {
      const configKeyValue = config.value[configKey] as Component | string;
      const isObject = typeof configKeyValue === "object";

      const configAttrs = {
        config: configKeyValue,
        ...(isObject ? configKeyValue.defaults : {}),
      };

      const isTopLevelClassKey = configKey === (topLevelClassKey || firstClassKey);
      const attrClass = isTopLevelClassKey && !nestedComponent ? attrs.class : "";

      vuelessAttrs.value = {
        ...commonAttrs,
        class: cx([getBaseClasses(toValue(classes)), attrClass]),
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
 * Get merged config based on config merging strategy.
 */
function getMergedConfig({
  defaultConfig,
  globalConfig,
  propsConfig,
  vuelessStrategy,
}: GetMergedConfig) {
  defaultConfig = cloneDeep(defaultConfig) as Component;

  let mergedConfig: Component = {};
  const strategy =
    !globalConfig && !propsConfig
      ? STRATEGY_TYPE.merge
      : propsConfig?.strategy || globalConfig?.strategy || vuelessStrategy;

  if (strategy === STRATEGY_TYPE.merge) {
    mergedConfig = mergeConfigs({ defaultConfig, globalConfig, propsConfig });
  }

  if (strategy === STRATEGY_TYPE.replace) {
    mergedConfig = mergeConfigs({ defaultConfig, globalConfig, propsConfig, isReplace: true });
  }

  if (strategy === STRATEGY_TYPE.overwrite) {
    const isGlobalConfig = globalConfig && Object.keys(globalConfig).length;
    const isPropsConfig = propsConfig && Object.keys(propsConfig).length;

    mergedConfig = isPropsConfig ? propsConfig : isGlobalConfig ? globalConfig : defaultConfig;
  }

  return mergedConfig;
}

/**
 * Recursively merge config objects with removing tailwind classes duplicates.
 * config - final merged config.
 * isReplace - enables class replacement instead of merge.
 * isVariants - if true, prevents adding a "base" key into nested objects.
 */
function mergeConfigs({
  defaultConfig,
  globalConfig,
  propsConfig,
  config = {},
  isReplace = false,
  isVariants = false,
}: MergeConfigs) {
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

interface MergeCompoundVariants {
  defaultConfig: CVA;
  globalConfig: CVA;
  propsConfig: CVA;
  isReplace?: boolean;
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
}: MergeCompoundVariants) {
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
 * Merge component classes from "class" attribute into final config.
 */
function mergeClassesIntoConfig(config: Component, topLevelClassKey: string, attrs: VueAttrs) {
  const configTopKey = config[topLevelClassKey];

  if (typeof configTopKey === "object") {
    (configTopKey as CVA).base = cx([(configTopKey as CVA)?.base, attrs.class]);

    config[topLevelClassKey] = configTopKey;
  } else {
    config[topLevelClassKey] = cx([configTopKey, attrs.class]);
  }

  return config;
}

/**
 * Return base classes.
 */
function getBaseClasses(value: string | CVA | NestedComponent) {
  return typeof value === "object" ? (value.base as string) || "" : value || "";
}

/**
 * Check is config key contains component name and if contains return it.
 */
function getNestedComponent(value: string | NestedComponent | CVA) {
  const classes = getBaseClasses(value);
  const component = (value as NestedComponent)?.component as ComponentNames;

  const match =
    classes.match(NESTED_COMPONENT_REG_EXP) || component?.match(NESTED_COMPONENT_REG_EXP);

  return match ? match[1] : "";
}

/**
 * Check is config key not contains classes or CVA config object.
 */
function isSystemKey(key: string): boolean {
  const isExactKey = Object.values(SYSTEM_CONFIG_KEY).some((value) => value === key);

  return isExactKey || key.toLowerCase().includes(SYSTEM_CONFIG_KEY.transition.toLowerCase());
}

/**
 * Check is config contains default CVA keys.
 */
function isCVA(config: CVA | string): boolean {
  if (typeof config !== "object") return false;

  return Object.values(CVA_CONFIG_KEY).some((value) =>
    Object.keys(config).some((key) => key === value),
  );
}

/**
 * Check if slot defined, and have a content.
 */
export function hasSlotContent(slot: Slot | undefined | null, props = {}): boolean {
  type Args = VNode | VNode[] | undefined | null;

  const asArray = (arg: Args) => {
    return Array.isArray(arg) ? arg : arg != null ? [arg] : [];
  };

  const isVNodeEmpty = (vnode: Args) => {
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
