import { inject, readonly, ref } from "vue";

import type { Ref } from "vue";

import { useRequestQueue } from "../composables/useRequestQueue";

type LoaderProgress = {
  isLoading: Readonly<Ref<boolean, boolean>>;
  loaderProgressOn: (request: string | string[]) => void;
  loaderProgressOff: (request: string | string[]) => void;
};

export const LoaderProgressSymbol = Symbol.for("vueless:loader-progress");

const { addToRequestQueue, removeFromRequestQueue } = useRequestQueue();

const isLoading = ref(true);

function loaderProgressOn(request?: string | string[]): void {
  request ? addToRequestQueue(request) : (isLoading.value = true);
}

function loaderProgressOff(request?: string | string[]): void {
  request ? removeFromRequestQueue(request) : (isLoading.value = false);
}

export function createLoaderProgress(): LoaderProgress {
  return {
    isLoading: readonly(isLoading),
    loaderProgressOn,
    loaderProgressOff,
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
