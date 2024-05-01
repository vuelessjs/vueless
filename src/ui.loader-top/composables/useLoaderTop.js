import { ref, readonly } from "vue";

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

export default function useLoaderTop() {
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
