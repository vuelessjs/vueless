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

export function loaderTopOn(resource) {
  const loaderTopOnEvent = new CustomEvent("loaderTopOn", { detail: { resource } });

  window.dispatchEvent(loaderTopOnEvent);
}

export function loaderTopOff(resource) {
  const loaderTopOfEvent = new CustomEvent("loaderTopOff", { detail: { resource } });

  window.dispatchEvent(loaderTopOfEvent);
}
