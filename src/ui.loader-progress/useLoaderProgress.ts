import { inject, readonly, ref } from "vue";

import type { Ref } from "vue";

import { getRequestWithoutQuery } from "./utilLoaderProgress.ts";

export const LoaderProgressSymbol = Symbol.for("vueless:loader-progress");

type LoaderProgress = {
  requestQueue: Readonly<Ref<readonly string[]>>;
  loaderProgressOn: (url: string | string[]) => void;
  loaderProgressOff: (url: string | string[]) => void;
};

export function createLoaderProgress(): LoaderProgress {
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
      requestQueue.value = requestQueue.value.filter(
        (item) => item !== getRequestWithoutQuery(url),
      );
    }
  }

  return {
    requestQueue: readonly(requestQueue),
    loaderProgressOn,
    loaderProgressOff,
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
