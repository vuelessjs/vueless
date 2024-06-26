import { inject, readonly, ref } from "vue";

export const LoaderTopSymbol = Symbol.for("vueless:loader-top");

const isLoading = ref(true);
const requestQueue = ref([]);
const requestTimeout = ref(0);
const componentRequestQueue = ref([]);

function loaderTopOn(url) {
  requestQueue.value.push(url);
  isLoading.value = true;

  clearTimeout(requestTimeout.value);
}

function loaderTopOff(url) {
  requestQueue.value = url ? requestQueue.value.filter((item) => item !== url) : [];

  requestTimeout.value = setTimeout(() => {
    if (!requestQueue.value.length) {
      isLoading.value = false;
    }
  }, 50);
}

function setComponentRequestQueue(requests) {
  componentRequestQueue.value = [...componentRequestQueue.value, ...requests];
}

function removeComponentRequestQueue() {
  componentRequestQueue.value = [];
}

export function createLoaderTop() {
  return {
    isLoading: readonly(isLoading),
    requestQueue: readonly(requestQueue),
    componentRequestQueue: readonly(componentRequestQueue),
    loaderTopOn,
    loaderTopOff,
    setComponentRequestQueue,
    removeComponentRequestQueue,
  };
}

export function useLoaderTop() {
  return inject(LoaderTopSymbol);
}
