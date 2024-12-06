import type { UnknownObject } from "../types.ts";
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
 * Check if Vue slot defined, and have a content.
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
