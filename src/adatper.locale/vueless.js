import { shallowRef, ref } from "vue";
import { merge } from "lodash-es";

import en from "./locales/en";

const FALLBACK_LOCALE_CODE = "en";

export default function createVuelessAdapter(options) {
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

function createTranslateFunction(current, fallback, messages) {
  return (key, ...params) => {
    const currentLocale = current.value && messages.value[current.value];
    const fallbackLocale = fallback.value && messages.value[fallback.value];

    let str = getObjectValueByPath(currentLocale, key, null);

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

    return replace(str, params);
  };
}

function createTranslateMessageFunction(current, fallback, messages) {
  return (key) => {
    const currentLocale = current.value && messages.value[current.value];
    const fallbackLocale = fallback.value && messages.value[fallback.value];

    let str = getObjectValueByPath(currentLocale, key, null);

    if (str === undefined) {
      // eslint-disable-next-line no-console
      console.warn(
        `Translation key "${key}" not found in "${current.value}", trying fallback locale`,
      );
      str = getObjectValueByPath(fallbackLocale, key, null);
    }

    return str;
  };
}

const replace = (str, params) => {
  return str.replace(/\{(\d+)\}/g, (match, index) => {
    return String(params[+index]);
  });
};

function createNumberFunction(current, fallback) {
  return (value, options) => {
    const numberFormat = new Intl.NumberFormat([current.value, fallback.value], options);

    return numberFormat.format(value);
  };
}

export function getObjectValueByPath(obj, path, fallback) {
  if (obj == null || !path || typeof path !== "string") return fallback;
  if (obj[path] !== undefined) return obj[path];
  path = path.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  path = path.replace(/^\./, ""); // strip a leading dot

  return getNestedValue(obj, path.split("."), fallback);
}

export function getNestedValue(obj, path, fallback) {
  const last = path.length - 1;

  if (last < 0) {
    return obj === undefined ? fallback : obj;
  }

  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback;
    }

    obj = obj[path[i]];
  }

  if (obj == null) {
    return fallback;
  }

  return obj[path[last]] === undefined ? fallback : obj[path[last]];
}
