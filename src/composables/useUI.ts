import { ref, watch, watchEffect, getCurrentInstance, toValue, useAttrs, computed } from "vue";

import { cx, cva, setColor, getColor, vuelessConfig, getMergedConfig } from "../utils/ui.ts";
import { isCSR } from "../utils/helper.ts";
import {
  STRATEGY_TYPE,
  CVA_CONFIG_KEY,
  SYSTEM_CONFIG_KEY,
  NESTED_COMPONENT_PATTERN_REG_EXP,
  EXTENDS_PATTERN_REG_EXP,
} from "../constants.js";

import type { ComponentInternalInstance, ComputedRef } from "vue";
import type {
  BrandColors,
  Strategies,
  UnknownObject,
  Component,
  NestedComponent,
  ComponentNames,
  CVA,
  KeyAttrs,
  ExtendedKeyClasses,
  KeysAttrs,
} from "../types.ts";

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

    config.value = getMergedConfig({
      defaultConfig,
      globalConfig,
      propsConfig,
      vuelessStrategy,
    });
  });

  /**
   * Get classes by given key (including CVA if config set).
   */
  function getClasses(key: string, mutatedProps: UnknownObject): ComputedRef<string> {
    return computed(() => {
      const mutatedPropsValue = toValue(mutatedProps);
      const color = (toValue(mutatedProps)?.color as BrandColors) || props?.color;
      const value = config.value[key] as (CVA & NestedComponent) | string;

      let classes = "";

      if (typeof value === "object" && isCVA(value)) {
        classes = cva(value)({
          ...props,
          ...mutatedPropsValue,
          ...(color ? { color: getColor(color) } : {}),
        });
      }

      if (typeof value === "string") {
        classes = value;
      }

      if (key === (topLevelClassKey || firstClassKey)) {
        classes = cx([classes, attrs.class]);
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
    const extendingClasses: ExtendedKeyClasses = {};

    for (const key of extendingKeys) {
      extendingClasses[key] = getClasses(key, mutatedProps);
    }

    return extendingClasses;
  }

  /**
   * Returns an object where:
   * – key: elementKey
   * – value: reactive object of string element attributes (with classes).
   */
  function getKeysAttrs(mutatedProps = {}): KeysAttrs {
    const keysAttrs: KeysAttrs = {};

    for (const key in config.value) {
      if (isSystemKey(key)) continue;

      keysAttrs[`${key}Attrs`] = getAttrs(key, getClasses(key, mutatedProps));

      const baseClasses = getBaseClasses(config.value[key]);
      const extendsMatches = baseClasses.match(EXTENDS_PATTERN_REG_EXP);

      if (extendsMatches) {
        // retrieves extends keys from patterns:
        // Example: `{>someKey} {>someOtherKey}` >>> `["someKey", "someOtherKey"]`.
        const extendsKeys = extendsMatches.map((pattern) => pattern.slice(2, -1));
        const classes = getExtendingKeysClasses(extendsKeys, mutatedProps);
        const extendsClasses = Object.values(classes).map((item) => toValue(item));

        const keyAttrs = keysAttrs[`${key}Attrs`] as ComputedRef<KeyAttrs>;

        keysAttrs[`${key}Attrs`] = computed(() => ({
          ...keyAttrs.value,
          class: cx([
            ...extendsClasses,
            keyAttrs.value.class?.replaceAll(EXTENDS_PATTERN_REG_EXP, ""),
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
    const nestedComponent = getNestedComponent(config.value[configKey] || "");

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

      vuelessAttrs.value = {
        ...commonAttrs,
        class: toValue(classes),
        ...(isObject ? { config: configKeyValue } : {}),
        ...(isObject ? configKeyValue.defaults : {}),
      };
    }

    return vuelessAttrs;
  }

  return { config, getKeysAttrs };
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
    classes.match(NESTED_COMPONENT_PATTERN_REG_EXP) ||
    component?.match(NESTED_COMPONENT_PATTERN_REG_EXP);

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
