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
  KeyAttrs,
  KeysAttrs,
  Strategies,
  BrandColors,
  MutatedProps,
  UnknownObject,
  ComponentNames,
  ComponentConfig,
  KeyAttrsWithConfig,
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

  const globalConfig = vuelessConfig?.component?.[componentName] || {};

  const vuelessStrategy = Object.values(STRATEGY_TYPE).includes(vuelessConfig.strategy || "")
    ? (vuelessConfig.strategy as Strategies)
    : (STRATEGY_TYPE.merge as Strategies);

  const firstClassKey = Object.keys(defaultConfig || {})[0];
  const propsConfig = props.config as ComponentConfig<T>;
  const config = ref({}) as Ref<ComponentConfig<T>>;
  const attrs = useAttrs();

  watchEffect(() => {
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

      const baseClasses = getBaseClasses(config.value[key]);
      const extendsKeys = getExtendsKeys(baseClasses);

      if (extendsKeys.length) {
        const extendsClasses = extendsKeys.map((key) => toValue(getClasses(key, mutatedProps)));

        const keyAttrs = keysAttrs[`${key}Attrs`];

        keysAttrs[`${key}Attrs`] = computed(() => ({
          ...keyAttrs.value,
          class: cx([
            ...extendsClasses,
            keyAttrs.value.class?.replaceAll(EXTENDS_PATTERN_REG_EXP, ""),
          ]),
          // TODO: Cannot merge several keys
          config: getMergedConfig({
            defaultConfig: config.value[extendsKeys[0]],
            globalConfig: keyAttrs.value.config,
            propsConfig: propsConfig[extendsKeys[0]],
          }),
        })) as ComputedRef<KeyAttrsWithConfig<T>>;
      }
    }

    return keysAttrs;
  }

  /**
   * Get an element attributes for a given key.
   */
  function getAttrs(configKey: string, classes: ComputedRef<string>) {
    const nestedComponent = getNestedComponent(config.value[configKey] || "");

    const attrs = useAttrs() as KeyAttrs;
    const isDev = isCSR && import.meta.env?.DEV;
    const vuelessAttrs = ref({});
    const isTopLevelKey = (topLevelClassKey || firstClassKey) === configKey;

    const commonAttrs: KeyAttrs = {
      ...(isTopLevelKey ? attrs : {}),
      "vl-component": isDev ? attrs["vl-component"] || componentName || null : null,
      "vl-key": isDev ? attrs["vl-key"] || configKey || null : null,
      "vl-child-component":
        isDev && attrs["vl-component"] ? nestedComponent || componentName : null,
      "vl-child-key": isDev && attrs["vl-component"] ? configKey : null,
    };

    /* Delete value key to prevent v-model overwrite. */
    delete commonAttrs.value;

    watch(config, updateVuelessAttrs, { immediate: true });
    watch(props, updateVuelessAttrs);

    if (classes?.value) {
      watch(classes, updateVuelessAttrs);
    }

    function updateVuelessAttrs() {
      const configKeyValue = config.value[configKey];

      let configAttr = {};
      let defaultAttrs = {};

      if (typeof configKeyValue === "object") {
        configAttr = configKeyValue;
        defaultAttrs = configKeyValue?.defaults;
      }

      vuelessAttrs.value = {
        ...commonAttrs,
        class: toValue(classes),
        config: configAttr,
        ...defaultAttrs,
      };
    }

    return vuelessAttrs;
  }

  return { config, getKeysAttrs, ...getKeysAttrs(mutatedProps) } as UseUI<T>;
}

/**
 * Return base classes.
 */
function getBaseClasses(value: string | CVA) {
  return typeof value === "object" ? value.base || "" : value || "";
}

/**
 * Retrieves extends keys from patterns:
 * Example: `{>someKey} {>someOtherKey}` >>> `["someKey", "someOtherKey"]`.
 */
function getExtendsKeys(values: string = ""): string[] {
  const matches = values.match(EXTENDS_PATTERN_REG_EXP);

  return matches ? matches?.map((pattern) => pattern.slice(2, -1)) : [];
}

/**
 * Check is config key contains component name and returns it.
 */
function getNestedComponent(value: string | CVA) {
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
function isCVA(config: UnknownObject): boolean {
  return Object.values(CVA_CONFIG_KEY).some((value) =>
    Object.keys(config).some((key) => key === value),
  );
}
