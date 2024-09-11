import { inject, readonly, ref } from "vue";

export const LoaderRenderingSymbol = Symbol.for("vueless:loader-rendering");

const isLoading = ref(true);

function loaderRenderingOn() {
  isLoading.value = true;
}

function loaderRenderingOff() {
  isLoading.value = false;
}

export function createLoaderRendering() {
  return {
    isLoading: readonly(isLoading),
    loaderRenderingOn,
    loaderRenderingOff,
  };
}

export function useLoaderRendering() {
  return inject(LoaderRenderingSymbol);
}
