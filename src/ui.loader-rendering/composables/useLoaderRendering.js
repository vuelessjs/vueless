import { readonly, ref, inject } from "vue";

export const LoaderRenderingSymbol = Symbol.for("vueless:loader-rendering");

const isRenderingPage = ref(true);

function setRenderingStarted() {
  isRenderingPage.value = true;
}

function setRenderingFinished() {
  isRenderingPage.value = false;
}

export function createLoaderRendering() {
  return {
    isRenderingPage: readonly(isRenderingPage),
    setRenderingStarted,
    setRenderingFinished,
  };
}

export function useLoaderRendering() {
  const loaderRenderingState = inject(LoaderRenderingSymbol);

  return loaderRenderingState;
}
