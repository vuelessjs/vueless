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

export function debounce(func, wait) {
  let timeout;

  return function (...args) {
    const context = this;

    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
