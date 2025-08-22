import { shallowRef, ref } from "vue";
import { merge } from "lodash-es";

import en from "./locales/en";

import type { Ref } from "vue";
import type { VueMessageType } from "virtual:vueless/vue-i18n";
import type { UnknownObject, LocaleOptions, LocaleMessages, LocaleInstance } from "../types";

const FALLBACK_LOCALE_CODE = "en";

export function createVuelessAdapter(options?: LocaleOptions): LocaleInstance {
  const current = shallowRef(options?.locale ?? FALLBACK_LOCALE_CODE);
  const fallback = shallowRef(options?.fallback ?? FALLBACK_LOCALE_CODE);

  const messages = ref(merge({ en }, options?.messages));

  return {
    name: "vueless",
    locale: current,
    fallback,
    messages,
    t: createTranslateFunction(current, fallback, messages),
    tm: createTranslateMessageFunction(current, fallback, messages),
    n: createNumberFunction(current, fallback),
  };
}

function createTranslateFunction(
  current: Ref<string>,
  fallback: Ref<string>,
  messages: Ref<LocaleMessages>,
) {
  return (key: string, ...params: unknown[]) => {
    const currentLocale = current.value && messages.value[current.value];
    const fallbackLocale = fallback.value && messages.value[fallback.value];

    let str = getObjectValueByPath<LocaleMessages | string, unknown>(currentLocale, key, null);

    if (!str) {
      // eslint-disable-next-line no-console
      console.warn(
        `Translation key "${key}" not found in "${current.value}", trying fallback locale`,
      );
      str = getObjectValueByPath(fallbackLocale, key, null);
    }

    if (!str) {
      // eslint-disable-next-line no-console
      console.warn(`Translation key "${key}" not found in fallback`);
      str = key;
    }

    if (typeof str !== "string") {
      // eslint-disable-next-line no-console
      console.warn(`Translation key "${key}" has a non-string value`);
      str = key;
    }

    return replace(String(str), params);
  };
}

function createTranslateMessageFunction(
  current: Ref<string>,
  fallback: Ref<string>,
  messages: Ref<LocaleMessages>,
) {
  return <TMassages>(key: string): Partial<TMassages> => {
    const currentLocale = current.value && messages.value[current.value];
    const fallbackLocale = fallback.value && messages.value[fallback.value];

    let str = getObjectValueByPath<LocaleMessages | string, unknown>(currentLocale, key, null);

    if (str === undefined) {
      // eslint-disable-next-line no-console
      console.warn(
        `Translation key "${key}" not found in "${current.value}", trying fallback locale`,
      );
      str = getObjectValueByPath(fallbackLocale, key, null);
    }

    return str as TMassages;
  };
}

const replace = (str: string, params: unknown[]) => {
  return str.replace(/\{(\d+)\}/g, (match, index) => {
    return String(params[+index]);
  });
};

function createNumberFunction(current: Ref<string>, fallback: Ref<string>) {
  return (value: number, options?: Intl.NumberFormatOptions) => {
    const numberFormat = new Intl.NumberFormat([current.value, fallback.value], options);

    return numberFormat.format(value);
  };
}

export function getObjectValueByPath<T, K = unknown>(
  obj: T,
  path?: string,
  fallback?: K,
): K | undefined {
  if (obj == null || !path || typeof path !== "string") return fallback;

  const unknownObject = obj as UnknownObject;

  if (unknownObject[path] !== undefined) {
    return unknownObject[path] as K;
  }

  path = path.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  path = path.replace(/^\./, ""); // strip a leading dot

  return getNestedValue(obj, path.split("."), fallback);
}

export function getNestedValue<T, K = unknown>(
  obj: T | null | undefined,
  path: (string | number)[],
  fallback?: K,
): K | undefined {
  const last = path.length - 1;

  if (last < 0) {
    return obj === undefined ? fallback : (obj as unknown as K);
  }

  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback;
    }

    obj = (obj as Record<string | number, unknown>)[path[i]] as T;
  }

  if (obj == null) {
    return fallback;
  }

  const unknownObject = obj as Record<string | number, unknown>;

  return (unknownObject[path[last]] === undefined ? fallback : unknownObject[path[last]]) as K;
}

export function recursiveRt(obj: VueMessageType): unknown {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if ("loc" in obj) {
    return obj.loc!.source;
  }

  const messages: Record<string, unknown> = {};

  for (const key in obj) {
    const val = obj[key as keyof typeof obj];

    if (val && typeof val === "object") {
      if ("loc" in val) {
        messages[key] = val.loc.source;
      } else {
        messages[key] = recursiveRt(val as VueMessageType);
      }
    } else {
      messages[key] = val;
    }
  }

  return messages;
}
