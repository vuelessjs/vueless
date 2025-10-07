import { inject, readonly, ref } from "vue";

import type { Ref } from "vue";

import { getRequestWithoutQuery } from "../utils/requestQueue";

type LoaderProgress = {
  isLoading: Readonly<Ref<boolean, boolean>>;
  loaderProgressOn: (request: string | string[]) => void;
  loaderProgressOff: (request: string | string[]) => void;
  progressRequestQueue: Readonly<Ref<readonly string[]>>;
};

export const LoaderProgressSymbol = Symbol.for("vueless:loader-progress");

const progressRequestQueue = ref<string[]>([]);

function addToProgressRequestQueue(url: string | string[]): void {
  Array.isArray(url)
    ? progressRequestQueue.value.push(...url.map(getRequestWithoutQuery))
    : progressRequestQueue.value.push(getRequestWithoutQuery(url));
}

function removeFromProgressRequestQueue(url: string | string[]): void {
  if (Array.isArray(url)) {
    url.map(getRequestWithoutQuery).forEach(removeFromProgressRequestQueue);
  } else {
    progressRequestQueue.value = progressRequestQueue.value.filter(
      (item) => item !== getRequestWithoutQuery(url),
    );
  }
}

const isLoading = ref(true);

function loaderProgressOn(request?: string | string[]): void {
  request ? addToProgressRequestQueue(request) : (isLoading.value = true);
}

function loaderProgressOff(request?: string | string[]): void {
  request ? removeFromProgressRequestQueue(request) : (isLoading.value = false);
}

export function createLoaderProgress(): LoaderProgress {
  return {
    loaderProgressOn,
    loaderProgressOff,
    isLoading: readonly(isLoading),
    progressRequestQueue: readonly(progressRequestQueue) as Readonly<Ref<readonly string[]>>,
  };
}

export function useLoaderProgress(): LoaderProgress {
  const loaderProgress = inject<LoaderProgress>(LoaderProgressSymbol);

  if (!loaderProgress) {
    throw new Error(
      "[vueless] LoaderProgress not provided. Ensure you are using `provide` with `LoaderProgressSymbol`.",
    );
  }

  return loaderProgress;
}
