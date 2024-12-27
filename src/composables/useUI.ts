import { ref, watch, watchEffect, getCurrentInstance, toValue, useAttrs, computed } from "vue";

import { cx, cva, setColor, getColor, vuelessConfig, getMergedConfig } from "../utils/ui.ts";
import { isCSR } from "../utils/helper.ts";
import {
  STRATEGY_TYPE,
  CVA_CONFIG_KEY,
  SYSTEM_CONFIG_KEY,
  EXTENDS_PATTERN_REG_EXP,
  NESTED_COMPONENT_PATTERN_REG_EXP,
} from "../constants.js";

import type { Ref, ComputedRef } from "vue";
import type {
  CVA,
  UseUI,
  Defaults,
  KeyAttrs,
  KeysAttrs,
  Strategies,
  BrandColors,
  MutatedProps,
  UnknownObject,
  ComponentNames,
  ComponentConfig,
  NestedComponent,
  VuelessComponentInstance,
} from "../types.ts";

/**
 * Merging component configs in a given sequence (bigger number = bigger priority):
 * 1. Default component config
 * 2. Custom global component config (/vueless.config.{js,ts})
 * 3. Component config (:config="{...}" props)
 * 4. Component classes (class="...")
 */
export default function useUI<T>(
  defaultConfig: T,
  mutatedProps?: MutatedProps,
  topLevelClassKey?: string,
) {
  const { type, props, parent } = getCurrentInstance() as VuelessComponentInstance;

  const componentName = type?.internal
    ? (parent?.type.__name as ComponentNames)
    : (type.__name as ComponentNames);

  const globalConfig = (vuelessConfig?.component?.[componentName] || {}) as ComponentConfig<T>;

  const vuelessStrategy = Object.values(STRATEGY_TYPE).includes(vuelessConfig.strategy || "")
    ? (vuelessConfig.strategy as Strategies)
    : (STRATEGY_TYPE.merge as Strategies);

  const firstClassKey = Object.keys(defaultConfig || {})[0];
  const config = ref({}) as Ref<ComponentConfig<T>>;
  const attrs = useAttrs();

  watchEffect(() => {
    const propsConfig = props.config as ComponentConfig<T>;

    config.value = getMergedConfig({
      defaultConfig,
      globalConfig,
      propsConfig,
      vuelessStrategy,
    }) as ComponentConfig<T>;
  });

  /**
   * Get classes by given key (including CVA if config set).
   */
  function getClasses(key: string, mutatedProps?: MutatedProps) {
    return computed(() => {
      const mutatedPropsValue = toValue(mutatedProps);
      const color = (toValue(mutatedProps || {}).color || props.color) as BrandColors;
      const value = (config.value as ComponentConfig<T>)[key];

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

      classes = classes.replaceAll(EXTENDS_PATTERN_REG_EXP, "");

      return color ? setColor(classes, color) : classes;
    });
  }

  /**
   * Returns an object where:
   * – key: elementKey
   * – value: reactive object of string element attributes (with classes).
   */
  function getKeysAttrs(mutatedProps?: MutatedProps) {
    const keysAttrs: KeysAttrs<T> = {};

    for (const key in config.value) {
      if (isSystemKey(key)) continue;

      keysAttrs[`${key}Attrs`] = getAttrs(key, getClasses(key, mutatedProps));
    }

    return keysAttrs;
  }

  /**
   * Get an element attributes for a given key.
   */
  function getAttrs(configKey: string, classes: ComputedRef<string>) {
    const vuelessAttrs = ref({});

    const attrs = useAttrs() as KeyAttrs;
    const isDev = isCSR && import.meta.env?.DEV;
    const isTopLevelKey = (topLevelClassKey || firstClassKey) === configKey;

    const extendsKeyConfig = getExtendsKeyConfig(configKey);
    const extendsKeyNestedComponent = getNestedComponent(extendsKeyConfig);
    const keyNestedComponent = getNestedComponent(config.value[configKey]);
    const nestedComponent = extendsKeyNestedComponent || keyNestedComponent || componentName;

    const commonAttrs: KeyAttrs = {
      ...(isTopLevelKey ? attrs : {}),
      "vl-component": isDev ? attrs["vl-component"] || componentName || null : null,
      "vl-key": isDev ? attrs["vl-key"] || configKey || null : null,
      "vl-child-component": isDev && attrs["vl-component"] ? nestedComponent : null,
      "vl-child-key": isDev && attrs["vl-component"] ? configKey : null,
    };

    /* Delete value key to prevent v-model overwrite. */
    delete commonAttrs.value;

    watch([config, props, classes], updateVuelessAttrs, { immediate: true });

    /**
     * Updating Vueless attributes.
     */
    function updateVuelessAttrs() {
      let keyConfig: NestedComponent = {};

      if (typeof config.value[configKey] === "object") {
        keyConfig = config.value[configKey] as NestedComponent;
      }

      const extendsClasses = getExtendsClasses(configKey);
      const extendsKeyConfig = getExtendsKeyConfig(configKey);

      vuelessAttrs.value = {
        ...commonAttrs,
        class: cx([...extendsClasses, toValue(classes)]),
        config: getMergedConfig({
          defaultConfig: extendsKeyConfig,
          globalConfig: keyConfig,
        }),
        ...getDefaults({
          ...(extendsKeyConfig.defaults || {}),
          ...(keyConfig.defaults || {}),
        }),
      };
    }

    /**
     * Recursively get extends classes.
     */
    function getExtendsClasses(configKey: string) {
      let extendsClasses: string[] = [];

      const extendsKeys = getExtendsKeys(config.value[configKey]);

      if (extendsKeys.length) {
        extendsKeys.forEach((key) => {
          if (key === configKey) return;

          extendsClasses = [
            ...extendsClasses,
            ...getExtendsClasses(key),
            toValue(getClasses(key, mutatedProps)),
          ];
        });
      }

      return extendsClasses;
    }

    /**
     * Merge extends nested component configs.
     * TODO: Add ability to merge multiple keys in one (now works for merging only 1 first key).
     */
    function getExtendsKeyConfig(configKey: string) {
      let extendsKeyConfig: NestedComponent = {};

      const propsConfig = props.config as ComponentConfig<T>;
      const extendsKeys = getExtendsKeys(config.value[configKey]);

      if (extendsKeys.length) {
        const [firstKey] = extendsKeys;

        extendsKeyConfig = getMergedConfig({
          defaultConfig: config.value[firstKey],
          globalConfig: globalConfig[firstKey],
          propsConfig: propsConfig[firstKey],
        }) as NestedComponent;
      }

      return extendsKeyConfig;
    }

    /**
     * Get component prop default value.
     * Conditionally set props default value for nested components based on parent component prop value.
     * For example, set icon size for the nested component based on the size of the parent component.
     * Use an object where key = parent component prop value, value = nested component prop value.
     * */
    function getDefaults(defaultAttrs: NestedComponent["defaults"]) {
      const defaults: Defaults = {};

      for (const key in defaultAttrs) {
        defaults[key] =
          typeof defaultAttrs[key] === "object"
            ? defaultAttrs[key][String(props[key])]
            : defaultAttrs[key];
      }

      return defaults;
    }

    return vuelessAttrs;
  }

  return { config, getKeysAttrs, ...getKeysAttrs(mutatedProps) } as UseUI<T>;
}

/**
 * Return base classes.
 */
function getBaseClasses(value?: string | CVA | NestedComponent) {
  return typeof value === "object" ? value.base || "" : value || "";
}

/**
 * Retrieves extends keys from patterns:
 * Example: `{>someKey} {>someOtherKey}` >>> `["someKey", "someOtherKey"]`.
 */
function getExtendsKeys(configItemValue?: string | CVA | NestedComponent): string[] {
  const values = getBaseClasses(configItemValue);
  const matches = values.match(EXTENDS_PATTERN_REG_EXP);

  return matches ? matches?.map((pattern) => pattern.slice(2, -1)) : [];
}

/**
 * Check is config key contains component name and returns it.
 */
function getNestedComponent(value?: string | CVA | NestedComponent) {
  const classes = getBaseClasses(value);
  const match = classes.match(NESTED_COMPONENT_PATTERN_REG_EXP);

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
function isCVA(config?: UnknownObject | string): boolean {
  if (typeof config !== "object") {
    return false;
  }

  return Object.values(CVA_CONFIG_KEY).some((value) =>
    Object.keys(config).some((key) => key === value),
  );
}
