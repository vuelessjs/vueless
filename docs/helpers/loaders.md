# Loaders

Vueless ships two global loaders: a full-screen **loader overlay** (`ULoaderOverlay`) and a top-of-page **loader progress** bar (`ULoaderProgress`). Each can be controlled in two ways — via fire-and-forget utility functions, or via a composable that exposes reactive state.

### Loader overlay

#### loaderOverlayOn / loaderOverlayOff

Show or hide the global overlay from anywhere in your app. No arguments, no return value.

```javascript
import { loaderOverlayOn, loaderOverlayOff } from "vueless";

loaderOverlayOn();
// ... await something
loaderOverlayOff();
```

#### useLoaderOverlay

A composable exposing the overlay's reactive loading state and toggles.

```vue
<script setup>
import { useLoaderOverlay } from "vueless";

const { isLoading, loaderOverlayOn, loaderOverlayOff } = useLoaderOverlay();
</script>

<template>
  <div v-if="isLoading">Loading…</div>
</template>
```

Returns:

| Property           | Type                     | Description                     |
| ------------------ | ------------------------ | ------------------------------- |
| `isLoading`        | `Readonly<Ref<boolean>>` | Reactive overlay loading state. |
| `loaderOverlayOn`  | `() => void`             | Sets `isLoading` to `true`.     |
| `loaderOverlayOff` | `() => void`             | Sets `isLoading` to `false`.    |

### Loader progress

#### loaderProgressOn / loaderProgressOff

Start or stop the progress bar for one or more named requests.

```javascript
import { loaderProgressOn, loaderProgressOff } from "vueless";

loaderProgressOn("/api/users");
loaderProgressOn(["/api/users", "/api/orders"]);

loaderProgressOff("/api/users");
```

* `request` — a single request key/URL or an array of them.

#### useLoaderProgress

A composable exposing the progress bar's reactive state and queue.

```vue
<script setup>
import { useLoaderProgress } from "vueless";

const { isLoading, loaderProgressOn, loaderProgressOff, progressRequestQueue } = useLoaderProgress();

loaderProgressOn("/api/data"); // queue-based
loaderProgressOff("/api/data");

loaderProgressOn();  // no key → simple boolean toggle
</script>
```

Returns:

| Property               | Type                                     | Description                                                           |
| ---------------------- | ---------------------------------------- | --------------------------------------------------------------------- |
| `isLoading`            | `Readonly<Ref<boolean>>`                 | Reactive progress loading state.                                      |
| `loaderProgressOn`     | `(request?: string \| string[]) => void` | Adds request(s) to the queue, or toggles `isLoading` on when omitted. |
| `loaderProgressOff`    | `(request?: string \| string[]) => void` | Removes request(s) from the queue, or toggles `isLoading` off.        |
| `progressRequestQueue` | `Readonly<Ref<readonly string[]>>`       | Reactive, read-only list of in-flight request keys.                   |

{% hint style="info" %}
The `util*` functions and the composable methods share the same names but work differently: the standalone utilities dispatch global window events, while the composable methods mutate the injected reactive state directly.
{% endhint %}
