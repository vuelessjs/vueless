import { inject, readonly, ref } from "vue";

import { getRequestWithoutQuery } from "./utilLoaderProgress.js";

export const LoaderProgressSymbol = Symbol.for("vueless:loader-progress");

const isLoading = ref(false);
const requestQueue = ref([]);
const requestTimeout = ref(0);

function loaderProgressOn(url) {
  addRequestUrl(url);

  isLoading.value = true;

  clearTimeout(requestTimeout.value);
}

function loaderProgressOff(url) {
  requestQueue.value = url
    ? requestQueue.value.filter((item) => item !== getRequestWithoutQuery(url))
    : [];

  requestTimeout.value = setTimeout(() => {
    if (!requestQueue.value.length) {
      isLoading.value = false;
    }
  }, 50);
}

function addRequestUrl(url) {
  Array.isArray(url)
    ? requestQueue.value.push(...url.map(getRequestWithoutQuery))
    : requestQueue.value.push(getRequestWithoutQuery(url));
}

function removeRequestUrl(url) {
  if (Array.isArray(url)) {
    url.map(getRequestWithoutQuery).forEach(removeRequestUrl);

    return;
  }

  requestQueue.value = requestQueue.value.filter((item) => item !== getRequestWithoutQuery(url));
}

export function createLoaderProgress() {
  return {
    isLoading: readonly(isLoading),
    requestQueue: readonly(requestQueue),
    loaderProgressOn,
    loaderProgressOff,
    addRequestUrl,
    removeRequestUrl,
  };
}

export function useLoaderProgress() {
  return inject(LoaderProgressSymbol);
}
