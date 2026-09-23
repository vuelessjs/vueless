# Request queue

A lightweight, app-wide mechanism for tracking in-flight requests by name (usually a URL). Loaders and spinners can react to it to show/hide loading state. The helpers don't perform any HTTP themselves — they only register and deregister request identifiers.

### addToRequestQueue / removeFromRequestQueue

Register a request when it starts and deregister it when it finishes. They are meant to be used as a matched pair.

```javascript
import { addToRequestQueue, removeFromRequestQueue } from "vueless";

const endpoint = "/api/users";

addToRequestQueue(endpoint); // global loader starts
try {
  await fetch(endpoint);
} finally {
  removeFromRequestQueue(endpoint); // stops even on error
}
```

* `request` — a single request identifier or an array of them.

Both dispatch a global window event under the hood, so any listener (e.g. a global loader component) can observe the queue. Batching is supported: `addToRequestQueue(["/api/users", "/api/roles"])`.

### useRequestQueue

A composable for reading and mutating the shared request queue reactively — for example to drive a per-request loading state. The queue is an app-wide singleton, so all callers see the same data, and it stays in sync with the `addToRequestQueue` / `removeFromRequestQueue` helpers above.

```vue
<script setup>
import { computed } from "vue";
import { useRequestQueue } from "vueless";

const { isLoading, addToRequestQueue, removeFromRequestQueue, requestQueue } = useRequestQueue();

const ENDPOINT = "/api/users";
const usersLoading = computed(() => isLoading(ENDPOINT));

async function fetchUsers() {
  addToRequestQueue(ENDPOINT);
  try {
    await fetch(ENDPOINT);
  } finally {
    removeFromRequestQueue(ENDPOINT);
  }
}
</script>

<template>
  <UButton :loading="usersLoading" label="Load" @click="fetchUsers" />
  <p>Active requests: {{ requestQueue.length }}</p>
</template>
```

Returns:

| Property                 | Type                                       | Description                                                              |
| ------------------------ | ------------------------------------------ | ------------------------------------------------------------------------ |
| `isLoading`              | `(request: string \| string[]) => boolean` | `true` if the given URL (or any in the array) is currently in the queue. |
| `addToRequestQueue`      | `(url: string \| string[]) => void`        | Pushes one or more URLs onto the queue (query string stripped).          |
| `removeFromRequestQueue` | `(url: string \| string[]) => void`        | Removes one or more URLs from the queue (query string stripped).         |
| `requestQueue`           | `Readonly<Ref<readonly string[]>>`         | Reactive, read-only view of the current queue.                           |

{% hint style="info" %}
`addToRequestQueue` / `removeFromRequestQueue` normalize URLs by stripping the query string, but `isLoading` compares against the value you pass in — so pass already-normalized URLs to `isLoading`.
{% endhint %}
