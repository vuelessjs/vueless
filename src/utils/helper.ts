import type { UnknownObject } from "../types";
import { Comment, Text, Fragment } from "vue";

import type { Slot, VNode } from "vue";

/**
 * Deeply clone given object (same as lodash.cloneDeep).
 */
export function cloneDeep(entity: unknown, cache = new WeakMap()): unknown | UnknownObject {
  // primitives
  if (Object(entity) !== entity || !entity) {
    return entity;
  }

  // cyclic reference
  if (cache.has(entity)) {
    return cache.get(entity);
  }

  const result =
    entity instanceof Set
      ? new Set(entity)
      : entity instanceof Map
        ? new Map(Array.from(entity, ([key, val]) => [key, cloneDeep(val, cache)]))
        : entity instanceof Date
          ? new Date(entity)
          : entity instanceof RegExp
            ? new RegExp(entity.source, entity.flags)
            : entity.constructor
              ? new (entity.constructor as { new (): typeof entity })()
              : Object.create(null);

  cache.set(entity, result);

  return Object.assign(
    result,
    ...Object.keys(entity).map((key) => ({
      [key]: cloneDeep((entity as Record<string | number, unknown>)[key], cache),
    })),
  );
}

/**
 * Creates a debounced function with delay (same as lodash.debounce).
 */
export function createDebounce<T extends unknown[]>(func: (...args: T) => void, ms: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return function (this: unknown, ...args: T) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), ms);
  };
}

/**
 * Checks if a Vue slot is defined and contains actual content.
 *
 * @param slot - The Vue slot to check.
 * @param props - Optional props to pass to the slot function.
 * @returns {boolean} True if the slot exists and contains non-empty content, false otherwise.
 *
 * @remarks
 * A slot is considered empty if it:
 * - Is undefined or null
 * - Contains only comments
 * - Contains only empty text nodes
 * - Contains only empty fragments
 */
export function hasSlotContent(slot: Slot | undefined | null, props = {}): boolean {
  type Args = VNode | VNode[];

  const toArray = (arg: Args) => {
    return Array.isArray(arg) ? arg : [arg];
  };

  const isVNodeEmpty = (vnode: Args) => {
    return (
      !vnode ||
      toArray(vnode).every((vnode) => {
        return (
          vnode.type === Comment ||
          (vnode.type === Text && !vnode.children?.length) ||
          (vnode.type === Fragment && !vnode.children?.length)
        );
      })
    );
  };

  if (!slot) {
    return false;
  }

  return !isVNodeEmpty(slot(props));
}

/**
 * Change page title in runtime by provided config.
 */
export function setTitle({ title = "", separator = " / ", suffix = "" }) {
  if (isCSR) {
    document.title = title ? title + separator + suffix : suffix;
  }
}

/**
 * Generates simple unique identifier.
 */
export function getRandomId(length = 15) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;

  let id = "";

  while (id.length < length) {
    id += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return id;
}

/**
 * Check is code rendering on the server side.
 */
export const isSSR: boolean = typeof window === "undefined";

/**
 * Check is code rendering on the client side.
 */
export const isCSR: boolean = typeof window !== "undefined";

/**
 * Set cookie on the client side
 */
export function setCookie(name: string, value: string, attributes = {} as UnknownObject) {
  attributes = {
    path: "/",
    ...attributes,
  };

  if (attributes.expires instanceof Date) {
    attributes.expires = attributes.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (const attributeKey in attributes) {
    updatedCookie += "; " + attributeKey;
    const attributeValue = attributes[attributeKey];

    if (attributeValue !== true) {
      updatedCookie += "=" + attributeValue;
    }
  }

  document.cookie = updatedCookie;
}

/**
 * Get cookie on the client side
 */
export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"),
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * Delete cookie on the client side
 */
export function deleteCookie(name: string) {
  setCookie(name, "", {
    "max-age": -1,
  });
}

export function isEmptyValue(value: object | null | undefined | string | unknown) {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && !Object.keys(value).length)
  );
}

/**
 * Converts the given value to a number if possible.
 *
 * @param {unknown} value - The value to be converted to a number. Can be of any data type.
 * @return {number | undefined} The numeric representation of the value if conversion is successful; otherwise, undefined.
 */
export function toNumber(value: unknown): number | undefined {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const number = Number(value);

    if (!Number.isNaN(number)) {
      return number;
    }
  }

  return;
}

/**
 * Get a stored value from local storage.
 * @return string | undefined
 */
export function getStored(key: string) {
  if (isSSR) return;

  return localStorage.getItem(key) ?? undefined;
}
