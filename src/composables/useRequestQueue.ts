import { readonly, ref } from "vue";

import type { Ref } from "vue";

import { getRequestWithoutQuery } from "../utils/requestQueue";

const requestQueue = ref<string[]>([]);

function addToRequestQueue(url: string | string[]): void {
  Array.isArray(url)
    ? requestQueue.value.push(...url.map(getRequestWithoutQuery))
    : requestQueue.value.push(getRequestWithoutQuery(url));
}

function removeFromRequestQueue(url: string | string[]): void {
  if (Array.isArray(url)) {
    url.map(getRequestWithoutQuery).forEach(removeFromRequestQueue);
  } else {
    requestQueue.value = requestQueue.value.filter((item) => item !== getRequestWithoutQuery(url));
  }
}

function isLoading(request: string | string[]): boolean {
  return Array.isArray(request)
    ? request.some((url) => requestQueue.value.some((item: string) => item === url))
    : requestQueue.value.some((item: string) => item === request);
}

function onAddToRequestQueue(event: CustomEvent<{ request: string }>) {
  addToRequestQueue(event.detail.request);
}

function onRemoveFromRequestQueue(event: CustomEvent<{ request: string }>) {
  removeFromRequestQueue(event.detail.request);
}

window.addEventListener("addToRequestQueue", onAddToRequestQueue as EventListener);
window.addEventListener("removeFromRequestQueue", onRemoveFromRequestQueue as EventListener);

export function useRequestQueue() {
  return {
    isLoading,
    addToRequestQueue,
    removeFromRequestQueue,
    requestQueue: readonly(requestQueue) as Readonly<Ref<readonly string[]>>,
  };
}
