export function clamp(n: number, min: number, max: number): number {
  if (n < min) {
    return min;
  }

  if (n > max) {
    return max;
  }

  return n;
}

export const queue = (() => {
  const pending: ((next: () => void) => void)[] = [];

  function next(): void {
    const fn = pending.shift();

    if (fn) {
      fn(next);
    }
  }

  return (fn: (next: () => void) => void): void => {
    pending.push(fn);

    if (pending.length === 1) {
      next();
    }
  };
})();

export function loaderProgressOn(resource: string): void {
  const loaderProgressOnEvent = new CustomEvent("loaderProgressOn", { detail: { resource } });

  window.dispatchEvent(loaderProgressOnEvent);
}

export function loaderProgressOff(resource: string): void {
  const loaderProgressOffEvent = new CustomEvent("loaderProgressOff", { detail: { resource } });

  window.dispatchEvent(loaderProgressOffEvent);
}

export function getRequestWithoutQuery(request: string | URL): string {
  const [requestWithoutQuery] = String(request).split("?");

  return requestWithoutQuery;
}
