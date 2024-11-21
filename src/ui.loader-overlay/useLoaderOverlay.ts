import { inject, readonly, ref } from "vue";

import type { Ref, InjectionKey } from "vue";

export const LoaderOverlaySymbol: InjectionKey<LoaderOverlay> =
  Symbol.for("vueless:loader-overlay");

interface LoaderOverlay {
  isLoading: Readonly<Ref<boolean, boolean>>;
  loaderOverlayOn: () => void;
  loaderOverlayOff: () => void;
}

const isLoading = ref(true);

function loaderOverlayOn(): void {
  isLoading.value = true;
}

function loaderOverlayOff(): void {
  isLoading.value = false;
}

export function createLoaderOverlay(): LoaderOverlay {
  return {
    isLoading: readonly(isLoading),
    loaderOverlayOn,
    loaderOverlayOff,
  };
}

export function useLoaderOverlay(): LoaderOverlay {
  const loaderOverlay = inject(LoaderOverlaySymbol);

  if (!loaderOverlay) {
    throw new Error(
      "LoaderOverlay not provided. Ensure you are using `provide` with `LoaderOverlaySymbol`.",
    );
  }

  return loaderOverlay;
}
