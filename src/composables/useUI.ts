import { ref, watch, getCurrentInstance, toValue, useAttrs, computed } from "vue";

import { cx, cva, setColor, vuelessConfig, getMergedConfig } from "../utils/ui";
import {
  CVA_CONFIG_KEY,
  SYSTEM_CONFIG_KEY,
  EXTENDS_PATTERN_REG_EXP,
  NESTED_COMPONENT_PATTERN_REG_EXP,
} from "../constants";

import type { Ref } from "vue";
import type {
  CVA,
  UseUI,
  KeyAttrs,
  KeysAttrs,
  StateColors,
  MutatedProps,
  UnknownObject,
  ComponentNames,
  NestedComponent,
  ConfigDerivedData,
  ComponentDefaults,
  ComponentConfigFull,
  VuelessComponentInstance,
} from "../types";

/* Pre-computed Set for O(1) system key lookups instead of O(n) array scan. */
const CVA_KEY_SET = new Set(Object.values(CVA_CONFIG_KEY));
const SYSTEM_KEY_SET = new Set(Object.values(SYSTEM_CONFIG_KEY));
const TRANSITION_KEY = SYSTEM_CONFIG_KEY.transition;

/**
 * Merging component configs in a given sequence (bigger number = bigger priority):
 * 1. Default component config
 * 2. Custom global component config (/vueless.config.{js,ts})
 * 3. Component config (:config="{...}" props)
 * 4. Component classes (class="...")
 */
export function useUI<T>(defaultConfig: T, mutatedProps?: MutatedProps, topLevelClassKey?: string) {
  const { type, props, parent } = getCurrentInstance() as VuelessComponentInstance;

  const componentName = type?.internal
    ? (parent?.type.__name as ComponentNames)
    : (type.__name as ComponentNames);

  const globalConfig = (vuelessConfig.components?.[componentName] || {}) as ComponentConfigFull<T>;

  const firstClassKey = Object.keys(defaultConfig || {})[0];
  const config = ref({}) as Ref<ComponentConfigFull<T>>;
  const isDev = import.meta.env?.DEV;
  const isUnstyled = Boolean(vuelessConfig.unstyled);

  /* Hoist shared reactive primitives — create once, share across all keys. */
  const attrs = useAttrs() as KeyAttrs;
  const reactiveAttrsClass = computed(() => attrs.class);

  /**
   * Reactive wrapper for props — created once per component instead of once per key.
   * Spreads props to create a shallow copy that triggers reactivity on any prop change.
   */
  const reactiveProps = computed(() => ({ ...props }));

  /* Cache for CVA resolver functions — only recreated when config changes. */
  const cvaCache = new Map<string, ReturnType<typeof cva>>();

  watch(
    () => props.config,
    (newVal, oldVal) => {
      if (newVal === oldVal) return;

      const propsConfig = props.config as ComponentConfigFull<T>;

      config.value = getMergedConfig({
        defaultConfig,
        globalConfig,
        propsConfig,
        unstyled: isUnstyled,
      }) as ComponentConfigFull<T>;

      /* Invalidate CVA cache when config changes. */
      cvaCache.clear();
    },
    { deep: true, immediate: true },
  );

  /**
   * Pre-computed data per config key that only changes when config changes.
   * Avoids recomputing extends configs, nested component info, and merged configs on every prop change.
   */
  const configDerivedData = computed(() => {
    const data: ConfigDerivedData = {};

    for (const key in config.value) {
      if (isSystemKey(key)) continue;

      const keyConfig: NestedComponent =
        typeof config.value[key] === "object" ? (config.value[key] as NestedComponent) : {};

      const extendsKeyConfig = computeExtendsKeyConfig(key);
      const extendsKeyNestedComponent = getNestedComponent(extendsKeyConfig);
      const keyNestedComponent = getNestedComponent(config.value[key]);
      const nestedComponent = extendsKeyNestedComponent || keyNestedComponent || componentName;

      const mergedNestedConfig = getMergedConfig({
        defaultConfig: extendsKeyConfig,
        globalConfig: keyConfig,
        propsConfig: attrs["config"] || {},
        unstyled: isUnstyled,
      });

      const mergedDefaults: ComponentDefaults = {};

      const defaultAttrs = {
        ...(extendsKeyConfig.defaults || {}),
        ...(keyConfig.defaults || {}),
      };

      for (const defaultKey in defaultAttrs) {
        mergedDefaults[defaultKey] =
          typeof defaultAttrs[defaultKey] === "object"
            ? defaultAttrs[defaultKey][String(props[defaultKey])]
            : defaultAttrs[defaultKey];
      }

      data[key] = {
        keyConfig,
        extendsClasses: computeExtendsClasses(key),
        extendsKeyConfig,
        nestedComponent,
        mergedNestedConfig,
        mergedDefaults,
      };
    }

    return data;
  });

  /**
   * Compute classes for a given key directly (not as a computed ref).
   * Used inside watchers to avoid creating orphaned computed properties.
   */
  function computeClassesForKey(key: string) {
    const mutatedPropsValue = toValue(mutatedProps);
    const value = (config.value as ComponentConfigFull<T>)[key];
    const color = (toValue(mutatedProps || {}).color || props.color) as StateColors;

    const isNestedComponent = Boolean(getNestedComponent(value));

    let classes = "";

    if (typeof value === "object" && isCVA(value)) {
      let cvaFn = cvaCache.get(key);

      if (!cvaFn) {
        cvaFn = cva(value);
        cvaCache.set(key, cvaFn);
      }

      classes = cvaFn({
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
  }

  /**
   * Recursively compute extends classes directly (no orphaned computed refs).
   */
  function computeExtendsClasses(configKey: string): string[] {
    const extendsKeys = getExtendsKeys(config.value[configKey]);

    if (!extendsKeys.length) return [];

    const result: string[] = [];

    for (const key of extendsKeys) {
      if (key === configKey) continue;

      result.push(...computeExtendsClasses(key), computeClassesForKey(key));
    }

    return result;
  }

  /**
   * Merge extends nested component configs.
   * TODO: Add ability to merge multiple keys in one (now works for merging only 1 first key).
   */
  function computeExtendsKeyConfig(configKey: string): NestedComponent {
    const propsConfig = props.config as ComponentConfigFull<T>;
    const extendsKeys = getExtendsKeys(config.value[configKey]);

    if (!extendsKeys.length) return {};

    const [firstKey] = extendsKeys;

    if (config.value[firstKey] === undefined) {
      // eslint-disable-next-line no-console
      console.warn(`[vueless] Missing ${firstKey} extend key.`);
    }

    return getMergedConfig({
      defaultConfig: config.value[firstKey] || {},
      globalConfig: globalConfig[firstKey],
      propsConfig: propsConfig[firstKey],
      unstyled: isUnstyled,
    }) as NestedComponent;
  }

  /**
   * Returns an object where:
   * – key: elementKey
   * – value: reactive object of string element attributes (with classes).
   */
  function getKeysAttrs(mutatedProps?: MutatedProps) {
    const keysAttrs: KeysAttrs<T> = {};
    const attrsRefs: Record<string, Ref<KeyAttrs>> = {};

    for (const key in config.value) {
      if (isSystemKey(key)) continue;

      const vuelessAttrs = ref({} as KeyAttrs);

      attrsRefs[key] = vuelessAttrs;
      keysAttrs[`${key}Attrs`] = vuelessAttrs;
    }

    /**
     * Single consolidated watcher instead of N per-key watchers.
     * Watches: config (for config changes), reactiveProps (for prop changes),
     * mutatedProps (for slot/computed prop changes), reactiveAttrsClass (for class attr changes).
     */
    watch(
      [config, reactiveProps, mutatedProps || (() => undefined), reactiveAttrsClass],
      () => {
        const derived = configDerivedData.value;

        for (const key in attrsRefs) {
          const data = derived[key];

          if (!data) continue;

          const isTopLevelKey = (topLevelClassKey || firstClassKey) === key;
          const classes = computeClassesForKey(key);

          const commonAttrs: KeyAttrs = {
            ...(isTopLevelKey ? attrs : {}),
            "vl-component": isDev ? attrs["vl-component"] || componentName || null : null,
            "vl-key": isDev ? attrs["vl-key"] || key || null : null,
            "vl-child-component": isDev && attrs["vl-component"] ? data.nestedComponent : null,
            "vl-child-key": isDev && attrs["vl-component"] ? key : null,
          };

          /* Delete value key to prevent v-model overwrite. */
          delete commonAttrs.value;

          attrsRefs[key].value = {
            ...commonAttrs,
            class: cx([...data.extendsClasses, classes, commonAttrs.class]),
            config: data.mergedNestedConfig,
            ...data.mergedDefaults,
          };
        }
      },
      { immediate: true },
    );

    return keysAttrs;
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

  return matches ? matches.map((pattern) => pattern.slice(2, -1)) : [];
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
  return SYSTEM_KEY_SET.has(key) || key.toLowerCase().includes(TRANSITION_KEY);
}

/**
 * Check is config contains default CVA keys.
 */
function isCVA(config?: UnknownObject | string): boolean {
  if (typeof config !== "object") {
    return false;
  }

  const keys = Object.keys(config);

  return keys.some((key) => CVA_KEY_SET.has(key));
}
