import { ref, watch, getCurrentInstance, toValue, useAttrs, computed } from "vue";

import { isEmptyValue } from "../utils/helper";
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
  Config,
  ComponentNames,
  NestedComponent,
  ComponentDefaults,
  ComponentConfigFull,
  VuelessComponentInstance,
} from "../types";

/* Pre-computed Set for O(1) system key lookups instead of O(n) array scan. */
const CVA_KEY_SET = new Set(Object.values(CVA_CONFIG_KEY));
const SYSTEM_KEY_SET = new Set(Object.values(SYSTEM_CONFIG_KEY));
const TRANSITION_KEY = SYSTEM_CONFIG_KEY.transition;

interface StaticKeyData {
  keyConfig: NestedComponent;
  extendsKeyConfig: NestedComponent;
  nestedComponent: string;
  mergedNestedConfig: unknown;
  defaultAttrs: UnknownObject;
}

type StaticDerivedData = Record<string, StaticKeyData>;

interface ConfigEntry<T> {
  config: ComponentConfigFull<T>;
  cvaCache: Map<string, ReturnType<typeof cva>>;
  staticData: StaticDerivedData;
}

type SharedEntries = WeakMap<object, Map<string, ConfigEntry<unknown>>>;

/* Entries shared by instances without config overrides, dropped once `vuelessConfig` is replaced. */
const sharedEntriesByConfig = new WeakMap<Config, SharedEntries>();

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
  const isDev = import.meta.env?.DEV || __VUELESS_DEV__;
  const isUnstyled = Boolean(vuelessConfig.unstyled);

  /* Hoist shared reactive primitives — create once, share across all keys. */
  const attrs = useAttrs() as KeyAttrs;

  /* Reading `class` explicitly keeps attrs tracked even when they start empty. */
  const reactiveAttrs = computed(() => ({ class: attrs.class, ...attrs }));

  /**
   * Reactive wrapper for props — created once per component instead of once per key.
   * Spreads props to create a shallow copy that triggers reactivity on any prop change.
   */
  const reactiveProps = computed(() => ({ ...props }));

  const entry = computed(() => {
    const propsConfig = props.config as ComponentConfigFull<T>;

    return isEmptyValue(propsConfig) ? getSharedEntry() : createEntry(propsConfig);
  });

  const config = computed(() => entry.value.config) as Ref<ComponentConfigFull<T>>;
  const attrsConfig = computed(() => attrs["config"]);

  /* Props-independent per-key data; only `mergedNestedConfig` is re-merged for a `config` attr. */
  const staticData = computed(() => {
    const entryData = entry.value.staticData;

    if (isEmptyValue(attrsConfig.value)) return entryData;

    const data: StaticDerivedData = {};

    for (const key in entryData) {
      const { keyConfig, extendsKeyConfig } = entryData[key];

      data[key] = {
        ...entryData[key],
        mergedNestedConfig: getMergedConfig({
          defaultConfig: extendsKeyConfig,
          globalConfig: keyConfig,
          propsConfig: attrsConfig.value,
          unstyled: isUnstyled,
        }),
      };
    }

    return data;
  });

  function createEntry(propsConfig: ComponentConfigFull<T>): ConfigEntry<T> {
    const mergedConfig = getMergedConfig({
      defaultConfig,
      globalConfig,
      propsConfig,
      unstyled: isUnstyled,
    }) as ComponentConfigFull<T>;

    return {
      config: mergedConfig,
      cvaCache: new Map(),
      staticData: computeStaticData(mergedConfig, propsConfig),
    };
  }

  function getSharedEntry(): ConfigEntry<T> {
    if (typeof defaultConfig !== "object" || defaultConfig === null) return createEntry({});

    let sharedEntries = sharedEntriesByConfig.get(vuelessConfig);

    if (!sharedEntries) {
      sharedEntries = new WeakMap();
      sharedEntriesByConfig.set(vuelessConfig, sharedEntries);
    }

    let componentEntries = sharedEntries.get(defaultConfig);

    if (!componentEntries) {
      componentEntries = new Map();
      sharedEntries.set(defaultConfig, componentEntries);
    }

    const entryKey = `${componentName}:${isUnstyled}`;
    let sharedEntry = componentEntries.get(entryKey) as ConfigEntry<T> | undefined;

    if (!sharedEntry) {
      sharedEntry = createEntry({});
      componentEntries.set(entryKey, sharedEntry);
    }

    return sharedEntry;
  }

  function computeStaticData(
    mergedConfig: ComponentConfigFull<T>,
    propsConfig: ComponentConfigFull<T>,
  ): StaticDerivedData {
    const data: StaticDerivedData = {};

    for (const key in mergedConfig) {
      if (isSystemKey(key)) continue;

      const keyConfig: NestedComponent =
        typeof mergedConfig[key] === "object" ? (mergedConfig[key] as NestedComponent) : {};

      const extendsKeyConfig = computeExtendsKeyConfig(mergedConfig, propsConfig, key);
      const extendsKeyNestedComponent = getNestedComponent(extendsKeyConfig);
      const keyNestedComponent = getNestedComponent(mergedConfig[key]);
      const nestedComponent = extendsKeyNestedComponent || keyNestedComponent || componentName;

      const mergedNestedConfig = getMergedConfig({
        defaultConfig: extendsKeyConfig,
        globalConfig: keyConfig,
        propsConfig: {},
        unstyled: isUnstyled,
      });

      data[key] = {
        keyConfig,
        extendsKeyConfig,
        nestedComponent,
        mergedNestedConfig,
        defaultAttrs: { ...(extendsKeyConfig.defaults || {}), ...(keyConfig.defaults || {}) },
      };
    }

    return data;
  }

  function computeMergedDefaults(defaultAttrs: UnknownObject): ComponentDefaults {
    const mergedDefaults: ComponentDefaults = {};

    for (const defaultKey in defaultAttrs) {
      const defaultValue = defaultAttrs[defaultKey];

      mergedDefaults[defaultKey] =
        typeof defaultValue === "object"
          ? (defaultValue as UnknownObject)[String(props[defaultKey])]
          : defaultValue;
    }

    return mergedDefaults;
  }

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
      const { cvaCache } = entry.value;
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
      .replaceAll(NESTED_COMPONENT_PATTERN_REG_EXP, "");

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
  function computeExtendsKeyConfig(
    mergedConfig: ComponentConfigFull<T>,
    propsConfig: ComponentConfigFull<T>,
    configKey: string,
  ): NestedComponent {
    const extendsKeys = getExtendsKeys(mergedConfig[configKey]);

    if (!extendsKeys.length) return {};

    const [firstKey] = extendsKeys;

    if (mergedConfig[firstKey] === undefined) {
      // eslint-disable-next-line no-console
      console.warn(`[vueless] Missing ${firstKey} extend key.`);
    }

    return getMergedConfig({
      defaultConfig: mergedConfig[firstKey] || {},
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

    /**
     * Structural signature per key. The watcher below fires on any config/prop/class
     * change and would otherwise re-mint every key's attrs object — even keys whose
     * classes are identical — invalidating downstream reactive readers (e.g. every
     * body row of a table on an unrelated sticky toggle). We skip the `.value` write
     * when the new object is structurally equal to the last one, so the ref keeps its
     * identity and dependents are not re-rendered.
     * `JSON.stringify` drops functions, so listeners are compared by reference separately.
     */
    const attrsSignatures: Record<string, string> = {};

    for (const key in config.value) {
      if (isSystemKey(key)) continue;

      const vuelessAttrs = ref({} as KeyAttrs);

      attrsRefs[key] = vuelessAttrs;
      keysAttrs[`${key}Attrs`] = vuelessAttrs;
    }

    /**
     * Single consolidated watcher instead of N per-key watchers.
     * Watches: config (for config changes), reactiveProps (for prop changes),
     * mutatedProps (for slot/computed prop changes), reactiveAttrs (for attr changes).
     */
    watch(
      [config, reactiveProps, mutatedProps || (() => undefined), reactiveAttrs],
      () => {
        const derived = staticData.value;

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

          const nextValue: KeyAttrs = {
            ...commonAttrs,
            class: cx([...computeExtendsClasses(key), classes, commonAttrs.class]),
            config: data.mergedNestedConfig,
            ...computeMergedDefaults(data.defaultAttrs),
          };

          /* Keep the previous ref identity when nothing changed — see attrsSignatures. */
          const signature = JSON.stringify(nextValue);
          const isUnchanged =
            attrsSignatures[key] === signature && hasSameListeners(attrsRefs[key].value, nextValue);

          if (isUnchanged) continue;

          attrsSignatures[key] = signature;
          attrsRefs[key].value = nextValue;
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
 * Check both attrs objects hold the same function-valued entries (listeners) by reference.
 */
function hasSameListeners(previous: KeyAttrs, next: KeyAttrs): boolean {
  let listenersDiff = 0;

  for (const key in next) {
    if (typeof next[key] !== "function") continue;
    if (next[key] !== previous[key]) return false;

    listenersDiff++;
  }

  for (const key in previous) {
    if (typeof previous[key] === "function") listenersDiff--;
  }

  return listenersDiff === 0;
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
  const [match] = classes.matchAll(NESTED_COMPONENT_PATTERN_REG_EXP);

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
