import { onBeforeMount, onBeforeUnmount, readonly, ref } from "vue";

import type { Ref } from "vue";

import { getRequestWithoutQuery } from "../utils/requestQueue";

export function useRequestQueue() {
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
      requestQueue.value = requestQueue.value.filter(
        (item) => item !== getRequestWithoutQuery(url),
      );
    }
  }

  function isLoading(endpoint: string): boolean {
    return requestQueue.value.some((item: string) => item === endpoint);
  }

  function onAddToRequestQueue(event: CustomEvent<{ request: string }>) {
    addToRequestQueue(event.detail.request);
  }

  function onRemoveFromRequestQueue(event: CustomEvent<{ request: string }>) {
    removeFromRequestQueue(event.detail.request);
  }

  onBeforeMount(() => {
    window.addEventListener("addToRequestQueue", onAddToRequestQueue as EventListener);
    window.addEventListener("removeFromRequestQueue", onRemoveFromRequestQueue as EventListener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("addToRequestQueue", onAddToRequestQueue as EventListener);
    window.removeEventListener("removeFromRequestQueue", onRemoveFromRequestQueue as EventListener);
  });

  return {
    isLoading,
    addToRequestQueue,
    removeFromRequestQueue,
    requestQueue: readonly(requestQueue) as Readonly<Ref<readonly string[]>>,
  };
}
