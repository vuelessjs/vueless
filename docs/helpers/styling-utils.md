# Styling utils

Low-level helpers that power Vueless component styling and configuration. These are mostly useful when building your own components or advanced customizations.

### cx

Merge class names into a single string, resolving conflicting Tailwind classes (later classes win).

```javascript
import { cx } from "vueless";

cx(["px-2 py-1", isActive && "bg-blue-500", "px-4"]);
// → "py-1 bg-blue-500 px-4"  (px-2 dropped in favor of px-4)
```

Accepts strings, conditionals, and nested arrays. Internally runs Vueless-extended `tailwind-merge`.

### cva

Factory for variant-driven class generation (class-variance-authority style). Returns a function that maps variant props to a merged class string.

```javascript
import { cva } from "vueless";

const button = cva({
  base: "rounded",
  variants: {
    size: { sm: "p-1", lg: "p-3" },
  },
});

button({ size: "lg" }); // → "rounded p-3"
```

Config keys (`base`, `variants`, `compoundVariants`, `defaultVariants`) are all optional. Output is tailwind-merged.

### compose

Combine several `cva` component functions into one, merging all their variants and classes.

```javascript
import { cva, compose } from "vueless";

const box = cva({ base: "border" });
const padded = cva({ base: "p-4" });

const card = compose(box, padded);
card(); // → "border p-4"
```

### setColor

Replace the `{color}` token inside a class string with an actual color.

```javascript
import { setColor } from "vueless";

setColor("bg-{color}-500 text-{color}-700", "red");
// → "bg-red-500 text-red-700"
```

* `classes` — a class string that may contain `{color}` placeholders.
* `color` — the color value to substitute.

### getDefaults

Build a component's resolved default props by deep-merging component-level defaults, global Vueless config defaults, and custom-prop defaults.

```javascript
import { getDefaults } from "vueless";
import defaultConfig from "./config.ts";

const defaults = getDefaults(defaultConfig, "UButton");
```

* `defaultConfig` — the component's default config object (its `.defaults` are read).
* `name` — the component name, used to look up overrides in the global config.

The result always includes `dataTest` and `config` keys and strips non-prop icon keys. Used to feed `withDefaults` / `defineProps` inside components.

### mergeConfigs

Deep-merge a component's default, global, and per-instance configs into the final config used for rendering, deduping Tailwind classes along the way.

```javascript
import { mergeConfigs, vuelessConfig } from "vueless";
import defaultConfig from "./config.ts";

const finalConfig = mergeConfigs({
  defaultConfig,
  globalConfig: vuelessConfig.components?.UButton,
  propsConfig: props.config,
  unstyled: false,
});
```

* `defaultConfig` — the component's base config.
* `globalConfig` — overrides from the global Vueless config.
* `propsConfig` — per-instance overrides (from the component's `config` prop).
* `unstyled` — when truthy, strips styling down to `i18n`, `defaults`, and `unstyled` keys.

Merge priority for classes is `default → global → props`.

{% hint style="info" %}
This helper is exported under the name `mergeConfigs` (its internal name is `getMergedConfig`).
{% endhint %}

### vuelessConfig

The live, mutable global config object loaded from your project's `vueless.config.{js,ts}`. It is a value, not a function.

```javascript
import { vuelessConfig } from "vueless";

const defaultColor = vuelessConfig.components?.UButton?.defaults?.color;
```

{% hint style="warning" %}
Under SSR the config loads asynchronously, so the value may briefly be `{}` before resolving.
{% endhint %}

### setVuelessConfig

Programmatically inject or override the global Vueless config (e.g. in tests or non-standard setups).

```javascript
import { setVuelessConfig } from "vueless";

setVuelessConfig({
  components: { UButton: { defaults: { size: "lg" } } },
});
```

* `config` — a Vueless config object. The existing config is kept unchanged if an empty config is passed.
