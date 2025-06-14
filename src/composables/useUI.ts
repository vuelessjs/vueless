import { ref, watch, getCurrentInstance, toValue, useAttrs, computed } from "vue";
import { isEqual } from "lodash-es";

import { cx, cva, setColor, vuelessConfig, getMergedConfig } from "../utils/ui.ts";
import { isCSR } from "../utils/helper.ts";
import {
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
  MutatedProps,
  UnknownObject,
  PrimaryColors,
  ComponentNames,
  NestedComponent,
  ComponentConfigFull,
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

  const globalConfig = (vuelessConfig.components?.[componentName] || {}) as ComponentConfigFull<T>;

  const firstClassKey = Object.keys(defaultConfig || {})[0];
  const config = ref({}) as Ref<ComponentConfigFull<T>>;

  watch(
    () => props.config,
    (newVal, oldVal) => {
      if (isEqual(newVal, oldVal)) return;

      const propsConfig = props.config as ComponentConfigFull<T>;

      config.value = getMergedConfig({
        defaultConfig,
        globalConfig,
        propsConfig,
        unstyled: Boolean(vuelessConfig.unstyled),
      }) as ComponentConfigFull<T>;
    },
    { deep: true, immediate: true },
  );

  /**
   * Get classes by a given key (including CVA if config set).
   */
  function getClasses(key: string, mutatedProps?: MutatedProps) {
    return computed(() => {
      const mutatedPropsValue = toValue(mutatedProps);
      const value = (config.value as ComponentConfigFull<T>)[key];
      const color = (toValue(mutatedProps || {}).color || props.color) as PrimaryColors;

      const isNestedComponent = Boolean(getNestedComponent(value));

      let classes = "";

      if (typeof value === "object" && isCVA(value)) {
        classes = cva(value)({
          ...props,
          ...mutatedPropsValue,
          ...(color ? { color } : {}),
        });
      }

      if (typeof value === "string") {
        classes = value;
      }

      classes = classes
        .replaceAll(EXTENDS_PATTERN_REG_EXP, "")
        .replace(NESTED_COMPONENT_PATTERN_REG_EXP, "");

      return color && !isNestedComponent ? setColor(classes, color) : classes;
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
   * Get element attributes for a given key.
   */
  function getAttrs(configKey: string, classes: ComputedRef<string>) {
    const vuelessAttrs = ref({} as KeyAttrs);

    const attrs = useAttrs() as KeyAttrs;

    const reactiveProps = computed(() => ({ ...props }));
    const reactiveClass = computed(() => attrs.class);

    watch([config, reactiveProps, classes, reactiveClass], updateVuelessAttrs, { immediate: true });

    /**
     * Updating Vueless attributes.
     */
    function updateVuelessAttrs(newVal: unknown, oldVal: unknown) {
      if (isEqual(newVal, oldVal)) return;

      let keyConfig: NestedComponent = {};

      if (typeof config.value[configKey] === "object") {
        keyConfig = config.value[configKey] as NestedComponent;
      }

      const isDev = isCSR && import.meta.env?.DEV;
      const isTopLevelKey = (topLevelClassKey || firstClassKey) === configKey;

      const extendsClasses = getExtendsClasses(configKey);
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

      vuelessAttrs.value = {
        ...commonAttrs,
        class: cx([...extendsClasses, toValue(classes), commonAttrs.class]),
        config: getMergedConfig({
          defaultConfig: extendsKeyConfig,
          globalConfig: keyConfig,
          propsConfig: attrs["config"] || {},
          unstyled: Boolean(vuelessConfig.unstyled),
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

      const propsConfig = props.config as ComponentConfigFull<T>;
      const extendsKeys = getExtendsKeys(config.value[configKey]);

      if (extendsKeys.length) {
        const [firstKey] = extendsKeys;

        if (config.value[firstKey] === undefined) {
          // eslint-disable-next-line no-console
          console.warn(`[vueless] Missing ${firstKey} extend key.`);
        }

        extendsKeyConfig = getMergedConfig({
          defaultConfig: config.value[firstKey] || {},
          globalConfig: globalConfig[firstKey],
          propsConfig: propsConfig[firstKey],
          unstyled: Boolean(vuelessConfig.unstyled),
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

  /**
   * Get data test attribute value if exist.
   */
  function getDataTest(suffix?: string) {
    if (!props.dataTest) {
      return null;
    }

    return suffix ? `${props.dataTest}-${suffix}` : props.dataTest;
  }

  return { config, getDataTest, ...getKeysAttrs(mutatedProps) } as UseUI<T>;
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
