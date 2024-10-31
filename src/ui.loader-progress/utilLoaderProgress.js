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

export function loaderProgressOn(resource) {
  const loaderProgressOnEvent = new CustomEvent("loaderProgressOn", { detail: { resource } });

  window.dispatchEvent(loaderProgressOnEvent);
}

export function loaderProgressOff(resource) {
  const loaderProgressOfEvent = new CustomEvent("loaderProgressOff", { detail: { resource } });

  window.dispatchEvent(loaderProgressOfEvent);
}

export function getRequestWithoutQuery(request) {
  const [requestWithoutQuery] = String(request).split("?");

  return requestWithoutQuery;
}
