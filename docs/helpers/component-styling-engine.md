# Component styling engine

### useUI

`useUI` is the internal styling engine that every Vueless component uses to turn its configuration into per-element class and attribute bindings. You'll reach for it when building your own components or copies of existing ones.

It merges a component's configuration from four layers, in ascending priority:

1. The component's `defaultConfig`.
2. The global config from `vueless.config.{js,ts}` (`vuelessConfig.components[componentName]`).
3. The instance's `:config="{ ... }"` prop.
4. The element's `class="..."` attribute.

It resolves CVA-style configs into class strings based on props and variants, applies dynamic color theming, handles the `{>key}` "extends" and `{ComponentName}` nested-component patterns, and exposes a reactive attribute object per config key.

```vue
<script setup>
import { useUI } from "vueless";
import defaultConfig from "./config.ts";

const props = defineProps(["color", "size", "config", "dataTest"]);

const { config, getDataTest, wrapperAttrs, buttonAttrs } = useUI(defaultConfig);
</script>

<template>
  <div v-bind="wrapperAttrs">
    <button v-bind="buttonAttrs" :data-test="getDataTest('submit')">
      <slot />
    </button>
  </div>
</template>
```

Signature:

```ts
useUI(defaultConfig, mutatedProps?, topLevelClassKey?)
```

* `defaultConfig` — the component's default config object, keyed by element name (each value is a class string, a CVA object, or a nested-component config). The first key is treated as the top-level element unless overridden.
* `mutatedProps` — optional ref/getter of computed prop overrides (e.g. a derived `color`) folded into CVA resolution.
* `topLevelClassKey` — optional key that should receive the root `class` and passthrough attrs; defaults to the first key of `defaultConfig`.

Returns:

| Property      | Type                                  | Description                                                                                                                                                                              |
| ------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config`      | `Ref<ComponentConfigFull>`            | The fully merged, reactive config for the component.                                                                                                                                     |
| `getDataTest` | `(suffix?: string) => string \| null` | Builds a `data-test` value from the component's `dataTest` prop; `null` when none is set.                                                                                                |
| `…{key}Attrs` | `Ref<KeyAttrs>`                       | One reactive attrs object per config key (e.g. `wrapperAttrs`, `buttonAttrs`), with the computed `class`, nested `config`, and merged default attrs. Spread onto elements with `v-bind`. |

{% hint style="info" %}
`useUI` reads the current component instance internally, so it must be called inside component `setup`. For a full walkthrough of building components, see Vueless component anatomy.
{% endhint %}
