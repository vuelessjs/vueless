import { inject, readonly, ref } from "vue";

import { getRequestWithoutQuery } from "../services/loaderTop.service";

export const LoaderTopSymbol = Symbol.for("vueless:loader-top");

const isLoading = ref(false);
const requestQueue = ref([]);
const requestTimeout = ref(0);

function loaderTopOn(url) {
  addRequestUrl(url);

  isLoading.value = true;

  clearTimeout(requestTimeout.value);
}

function loaderTopOff(url) {
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

export function createLoaderTop() {
  return {
    isLoading: readonly(isLoading),
    requestQueue: readonly(requestQueue),
    loaderTopOn,
    loaderTopOff,
    addRequestUrl,
    removeRequestUrl,
  };
}

export function useLoaderTop() {
  return inject(LoaderTopSymbol);
}
