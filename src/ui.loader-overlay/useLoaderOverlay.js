import { inject, readonly, ref } from "vue";

export const LoaderOverlaySymbol = Symbol.for("vueless:loader-overlay");

const isLoading = ref(true);

function loaderOverlayOn() {
  isLoading.value = true;
}

function loaderOverlayOff() {
  isLoading.value = false;
}

export function createLoaderOverlay() {
  return {
    isLoading: readonly(isLoading),
    loaderOverlayOn,
    loaderOverlayOff,
  };
}

export function useLoaderOverlay() {
  return inject(LoaderOverlaySymbol);
}
