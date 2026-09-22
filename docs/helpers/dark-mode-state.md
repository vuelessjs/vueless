# Dark mode state

### useDarkMode

A composable that exposes a reactive flag reflecting whether the app is currently in dark mode. Use it to branch logic or styles on the active color scheme.

```vue
<script setup>
import { useDarkMode } from "vueless";

const { isDarkMode } = useDarkMode();
</script>

<template>
  <div :class="isDarkMode ? 'bg-black text-white' : 'bg-white text-black'">
    Current theme: {{ isDarkMode ? "Dark" : "Light" }}
  </div>
</template>
```

Returns:

| Property     | Type           | Description                      |
| ------------ | -------------- | -------------------------------- |
| `isDarkMode` | `Ref<boolean>` | `true` when dark mode is active. |

The initial value is determined on mount from the dark-mode class on `<html>` and the cached color mode in `localStorage`, then kept in sync automatically as the color mode changes.

{% hint style="info" %}
To change the color mode at runtime, use `setTheme({ colorMode: "dark" })` — see Runtime theming. `useDarkMode` is for _reading_ the current state.
{% endhint %}
