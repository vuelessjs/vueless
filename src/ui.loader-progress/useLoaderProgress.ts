import { inject, readonly, ref } from "vue";

import type { Ref } from "vue";

import { getRequestWithoutQuery } from "./utilLoaderProgress.ts";
import { INFINITY_LOADING } from "./constants.ts";

export const LoaderProgressSymbol = Symbol.for("vueless:loader-progress");

type LoaderProgress = {
  isLoading: Ref<boolean>;
  requestQueue: Readonly<Ref<readonly string[]>>;
  loaderProgressOn: (url: string | string[]) => void;
  loaderProgressOff: (url: string | string[]) => void;
  addRequestUrl: (url: string | string[]) => void;
  removeRequestUrl: (url: string | string[]) => void;
};

const isLoading = ref(false);
const requestQueue = ref<string[]>([]);
const requestTimeout = ref<number | undefined>(undefined);

function loaderProgressOn(url: string | string[]): void {
  addRequestUrl(url);
  isLoading.value = true;

  if (requestTimeout.value !== undefined) {
    clearTimeout(requestTimeout.value);
  }
}

function loaderProgressOff(url: string | string[]): void {
  removeRequestUrl(url);

  requestTimeout.value = window.setTimeout(() => {
    if (!requestQueue.value.length) {
      isLoading.value = false;
    }
  }, 50);
}

function addRequestUrl(url: string | string[]): void {
  if (Array.isArray(url)) {
    requestQueue.value.push(...url.map(getRequestWithoutQuery));
  } else {
    requestQueue.value.push(getRequestWithoutQuery(url));
  }
}

function removeRequestUrl(url: string | string[]): void {
  if (Array.isArray(url)) {
    url.map(getRequestWithoutQuery).forEach(removeRequestUrl);
  } else {
    requestQueue.value = requestQueue.value.filter(
      (item) => item !== getRequestWithoutQuery(url) && item !== INFINITY_LOADING,
    );
  }
}

export function createLoaderProgress(): LoaderProgress {
  return {
    isLoading,
    requestQueue: readonly(requestQueue),
    loaderProgressOn,
    loaderProgressOff,
    addRequestUrl,
    removeRequestUrl,
  };
}

export function useLoaderProgress(): LoaderProgress {
  const loaderProgress = inject<LoaderProgress>(LoaderProgressSymbol);

  if (!loaderProgress) {
    throw new Error(
      "LoaderProgress not provided. Ensure you are using `provide` with `LoaderProgressSymbol`.",
    );
  }

  return loaderProgress;
}
