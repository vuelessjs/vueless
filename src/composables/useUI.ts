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

import { cx, cva, setColor, getColor, vuelessConfig, mergeConfigs } from "../utils/utilUI.ts";
import { cloneDeep, isCSR } from "../utils/utilHelper.ts";
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
} from "../types.ts";

interface MergedConfigOptions {
  defaultConfig: Component;
  globalConfig: Component;
  propsConfig?: Component;
  vuelessStrategy?: Strategies;
}

/**
 * Merging component configs in a given sequence (bigger number = bigger priority):
 * 1. Default component config
 * 2. Custom global component config (/vueless.config.{js,ts})
 * 3. Component config (:config="{...}" props)
 * 4. Component classes (class="...")
 */
export default function useUI<T>(
  defaultConfig: T & Component,
  propsConfigGetter?: () => (T & Component) | undefined,
  topLevelClassKey?: string,
) {
  const { type, props } = getCurrentInstance() as ComponentInternalInstance;
  const componentName = type.__name as ComponentNames;
  const globalConfig = vuelessConfig?.component?.[componentName] || {};

  const isStrategyValid =
    vuelessConfig.strategy && Object.values(STRATEGY_TYPE).includes(vuelessConfig.strategy);

  const vuelessStrategy = isStrategyValid
    ? (vuelessConfig.strategy as Strategies)
    : (STRATEGY_TYPE.merge as Strategies);

  const firstClassKey = defaultConfig ? Object.keys(defaultConfig)[0] : "";
  const config = ref({} as T);
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
  function getClasses(key: string, mutatedProps: UnknownObject): ComputedRef<string> {
    return computed(() => {
      const color = (toValue(mutatedProps)?.color as BrandColors) || props?.color;
      const value = config.value[key] as (CVA & NestedComponent) | string;

      let classes = "";

      if (typeof value === "object" && isCVA(value)) {
        classes = cva(value)({
          ...props,
          ...toValue(mutatedProps),
          ...(color ? { color: getColor(color) } : {}),
        });
      }

      if (typeof value === "string") {
        classes = value;
      }

      return color ? setColor(classes, color) : classes;
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
    getKeysAttrs,
    getExtendingKeysClasses,
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
}: MergedConfigOptions) {
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
function isCVA(config: UnknownObject): boolean {
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
