import { ref, readonly, inject, onMounted, onBeforeUnmount } from "vue";

export const LoaderTopSymbol = Symbol.for("vueless:loader-top");

const isLoading = ref(true);
const requestQueue = ref([]);
const loaderRequestQueue = ref([]);
const loaderRequestTimeout = ref(0);
const componentLoaderRequestQueue = ref([]);

function setLoadingOn(url) {
  loaderRequestQueue.value.push(url);

  isLoading.value = true;

  clearTimeout(loaderRequestTimeout.value);
}

function setLoadingOff(url) {
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

function addRequestUrlHandler(event) {
  addRequestUrl(event.detail.url);
}

function removeRequestUrlHandler(event) {
  removeRequestUrl(event.detail.url);
}

function setComponentRequestQueueHandler(event) {
  setComponentRequestQueue(event.detail.requests);
}

export function createLoaderTop() {
  return {
    isLoading: readonly(isLoading),
    requestQueue: readonly(requestQueue),
    loaderRequestQueue: readonly(loaderRequestQueue),
    loaderRequestTimeout: readonly(loaderRequestTimeout),
    componentLoaderRequestQueue: readonly(componentLoaderRequestQueue),
    setLoadingOn,
    setLoadingOff,
    addRequestUrl,
    removeRequestUrl,
    setComponentRequestQueue,
    removeComponentRequestQueue,
  };
}

export function useLoaderTop() {
  const loaderTopState = inject(LoaderTopSymbol);

  onMounted(() => {
    window.addEventListener("setLoadingOn", setLoadingOn);
    window.addEventListener("setLoadingOff", setLoadingOff);
    window.addEventListener("addRequestUrl", addRequestUrlHandler);
    window.addEventListener("removeRequestUrl", removeRequestUrlHandler);
    window.addEventListener("setComponentRequestQueue", setComponentRequestQueueHandler);
    window.addEventListener("removeComponentRequestQueue", removeComponentRequestQueue);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("setLoadingOn", setLoadingOn);
    window.removeEventListener("setLoadingOff", setLoadingOff);
    window.removeEventListener("addRequestUrl", addRequestUrlHandler);
    window.removeEventListener("removeRequestUrl", removeRequestUrlHandler);
    window.removeEventListener("setComponentRequestQueue", setComponentRequestQueueHandler);
    window.removeEventListener("removeComponentRequestQueue", removeComponentRequestQueue);
  });

  return loaderTopState;
}
