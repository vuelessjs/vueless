export function clamp(n, min, max) {
  if (n < min) {
    return min;
  }

  if (n > max) {
    return max;
  }

  return n;
}

export const queue = (() => {
  let pending = [];

  function next() {
    let fn = pending.shift();

    if (fn) {
      fn(next);
    }
  }

  return (fn) => {
    pending.push(fn);

    if (pending.length === 1) {
      next();
    }
  };
})();
