import { ref, readonly, inject, onMounted, onBeforeUnmount } from "vue";

export const LoaderTopSymbol = Symbol.for("vueless:loader-top");

const isLoading = ref(true);
const requestQueue = ref([]);
const loaderRequestQueue = ref([]);
const loaderRequestTimeout = ref(0);
const componentLoaderRequestQueue = ref([]);

function setLoaderOn(url) {
  loaderRequestQueue.value.push(url);

  isLoading.value = true;

  clearTimeout(loaderRequestTimeout.value);
}

function setLoaderOff(url) {
  loaderRequestQueue.value = url ? loaderRequestQueue.value.filter((item) => item !== url) : [];

  loaderRequestTimeout.value = setTimeout(() => {
    if (!loaderRequestQueue.value.length) {
      isLoading.value = false;
    }
  }, 50);
}

function addRequestUrl(url) {
  requestQueue.value.push(url);
}

function removeRequestUrl(url) {
  requestQueue.value = requestQueue.value.filter((item) => item !== url);
}

function setComponentRequestQueue(requests) {
  componentLoaderRequestQueue.value = [...componentLoaderRequestQueue.value, ...requests];
}

function removeComponentRequestQueue() {
  componentLoaderRequestQueue.value = [];
}

function setLoaderOnHandler(event) {
  setLoaderOn(event.detail.resource);
}

function setLoaderOffHandler(event) {
  setLoaderOff(event.detail.resource);
}

export function createLoaderTop() {
  return {
    isLoading: readonly(isLoading),
    requestQueue: readonly(requestQueue),
    loaderRequestQueue: readonly(loaderRequestQueue),
    loaderRequestTimeout: readonly(loaderRequestTimeout),
    componentLoaderRequestQueue: readonly(componentLoaderRequestQueue),
    setLoaderOn,
    setLoaderOff,
    addRequestUrl,
    removeRequestUrl,
    setComponentRequestQueue,
    removeComponentRequestQueue,
  };
}

export function useLoaderTop() {
  const loaderTopState = inject(LoaderTopSymbol);

  onMounted(() => {
    window.addEventListener("setLoaderOn", setLoaderOnHandler);
    window.addEventListener("setLoaderOff", setLoaderOffHandler);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("setLoaderOn", setLoaderOnHandler);
    window.removeEventListener("setLoaderOff", setLoaderOffHandler);
  });

  return loaderTopState;
}
