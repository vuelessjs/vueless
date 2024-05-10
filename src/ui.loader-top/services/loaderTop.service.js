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

export function loaderTopOn() {
  window.dispatchEvent(new Event("setLoadingOn"));
}

export function loaderTopOff() {
  window.dispatchEvent(new Event("setLoadingOff"));
}

export function addLoadingTopRequestUrl(url) {
  const addRequestUrlEvent = new CustomEvent("setLoadingOff", { detail: { url } });

  window.dispatchEvent(addRequestUrlEvent);
}

export function removeLoadingTopRequestUrl(url) {
  const removeRequestUrlEvent = new CustomEvent("removeRequestUrl", { detail: { url } });

  window.dispatchEvent(removeRequestUrlEvent);
}

export function setLoadingTopComponentRequestQueue(requests) {
  const setComponentRequestQueueEvent = new CustomEvent("setComponentRequestQueue", {
    detail: { requests },
  });

  window.dispatchEvent(setComponentRequestQueueEvent);
}

export function removeLoadingTopComponentRequestQueue() {
  window.dispatchEvent("removeComponentRequestQueue");
}
