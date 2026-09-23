# Mutation observer

### useMutationObserver

A thin Vue wrapper around the native [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver). It observes one or more elements and runs a callback on DOM mutations, automatically starting on mount, re-observing when the target changes, and disconnecting on unmount. It is a no-op during SSR.

```vue
<script setup>
import { ref } from "vue";
import { useMutationObserver } from "vueless";

const boxRef = ref(null);

useMutationObserver(
  boxRef,
  (mutations) => {
    mutations.forEach((m) => console.log("Changed:", m.type, m.attributeName));
  },
  { attributes: true, attributeFilter: ["class"] },
);
</script>

<template>
  <div ref="boxRef" class="watched-box">Watching my attributes</div>
</template>
```

Arguments:

* `target` — an element, an array of elements, or a ref/getter resolving to them (may be `null` initially).
* `callback` — a standard DOM `MutationCallback` `(mutations, observer) => void`.
* `config` — observer options (defaults to `{ childList: true, attributes: true, characterData: true }`). Supports the usual `subtree`, `attributeFilter`, `attributeOldValue`, `characterDataOldValue`, etc.

Returns:

| Property   | Type               | Description                                                                           |
| ---------- | ------------------ | ------------------------------------------------------------------------------------- |
| `observer` | `MutationObserver` | The underlying observer instance (e.g. for `.takeRecords()`). `undefined` during SSR. |
