import { inject, onBeforeUnmount, readonly, ref } from "vue";

import type { Ref } from "vue";

import { getRequestWithoutQuery } from "./utilLoaderProgress.ts";

export const LoaderProgressSymbol = Symbol.for("vueless:loader-progress");

type LoaderProgress = {
  requestQueue: Readonly<Ref<readonly string[]>>;
  loaderProgressOn: (url: string | string[]) => void;
  loaderProgressOff: (url: string | string[]) => void;
};

const requestQueue = ref<string[]>([]);

function loaderProgressOn(url: string | string[]): void {
  if (Array.isArray(url)) {
    requestQueue.value.push(...url.map(getRequestWithoutQuery));
  } else {
    requestQueue.value.push(getRequestWithoutQuery(url));
  }
}

function loaderProgressOff(url: string | string[]): void {
  if (Array.isArray(url)) {
    url.map(getRequestWithoutQuery).forEach(loaderProgressOff);
  } else {
    requestQueue.value = requestQueue.value.filter((item) => item !== getRequestWithoutQuery(url));
  }
}

function setLoaderOnHandler(event: CustomEvent<{ resource: string }>) {
  loaderProgressOn(event.detail.resource);
}

function setLoaderOffHandler(event: CustomEvent<{ resource: string }>) {
  loaderProgressOff(event.detail.resource);
}

export function createLoaderProgress(): LoaderProgress {
  return {
    requestQueue: readonly(requestQueue),
    loaderProgressOn,
    loaderProgressOff,
  };
}

export function useLoaderProgress(): LoaderProgress {
  const loaderProgress = inject<LoaderProgress>(LoaderProgressSymbol);

  window.addEventListener("loaderProgressOn", setLoaderOnHandler as EventListener);
  window.addEventListener("loaderProgressOff", setLoaderOffHandler as EventListener);

  onBeforeUnmount(() => {
    window.removeEventListener("loaderProgressOn", setLoaderOnHandler as EventListener);
    window.removeEventListener("loaderProgressOff", setLoaderOffHandler as EventListener);
  });

  if (!loaderProgress) {
    throw new Error(
      "LoaderProgress not provided. Ensure you are using `provide` with `LoaderProgressSymbol`.",
    );
  }

  return loaderProgress;
}
