export function getRequestWithoutQuery(request: string | URL): string {
  const [requestWithoutQuery] = String(request).split("?");

  return requestWithoutQuery;
}

export function addToRequestQueue(request: string | string[]): void {
  const addToRequestQueueEvent = new CustomEvent("addToRequestQueue", {
    detail: { request },
  });

  window.dispatchEvent(addToRequestQueueEvent);
}

export function removeFromRequestQueue(request: string | string[]): void {
  const removeFromRequestQueueEvent = new CustomEvent("removeFromRequestQueue", {
    detail: { request },
  });

  window.dispatchEvent(removeFromRequestQueueEvent);
}
