/**
 Deeply clone given object (same as lodash.cloneDeep).
 @param {Object} entity
 @param cache

 @returns {Object}
 */
export function cloneDeep(entity, cache = new WeakMap()) {
  // primitives
  if (Object(entity) !== entity) {
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
              ? new entity.constructor()
              : Object.create(null);

  cache.set(entity, result);

  return Object.assign(
    result,
    ...Object.keys(entity).map((key) => ({ [key]: cloneDeep(entity[key], cache) })),
  );
}

/**
 Creates a debounced function with delay (same as lodash.debounce).
 @param {Function} func
 @param {Number} ms

 @returns {Function}
 */
export function createDebounce(func, ms) {
  let timeout;

  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

/**
 Change page title in runtime by provided config.
 @param {Object} config
 @param {string} config.title
 @param {string} config.separator
 @param {string} config.suffix

 @returns {VoidFunction}
 */
export function setTitle({ title, separator = " / ", suffix = "" }) {
  if (isCSR) {
    document.title = title ? title + separator + suffix : suffix;
  }
}

/**
 Check is code rendering on the server side.
 @returns {boolean}
 */
export const isSSR = typeof window === "undefined";

/**
 Check is code rendering on the client side.
 @returns {boolean}
 */
export const isCSR = typeof window !== "undefined";
