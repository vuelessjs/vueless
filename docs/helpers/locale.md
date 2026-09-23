# Locale

Composables for working with the active locale and component translations. For configuring locales and adapters at app setup, see Internationalization (i18n).

### useLocale

Access the active Vueless locale instance — its translation functions and current locale state. Must be called within component `setup`.

```vue
<script setup>
import { computed } from "vue";
import { useLocale } from "vueless";

const { t, n, locale } = useLocale();

const greeting = computed(() => t("greeting", { name: "Ivan" }));
const price = computed(() => n(1999.99));
</script>

<template>
  <p>Locale: {{ locale }}</p>
  <p>{{ greeting }} — {{ price }}</p>
</template>
```

Returns a `LocaleInstance`:

| Property   | Type                                    | Description                                               |
| ---------- | --------------------------------------- | --------------------------------------------------------- |
| `name`     | `string`                                | Name of the active locale adapter.                        |
| `messages` | `LocaleMessages \| Ref<LocaleMessages>` | The full nested message dictionary.                       |
| `locale`   | `string \| Ref<string>`                 | Current locale code (e.g. `"en"`).                        |
| `fallback` | `string \| Ref<string>`                 | Fallback locale code used for missing keys.               |
| `t`        | `(key, ...params) => string`            | Translate a key to a string, with optional interpolation. |
| `n`        | `(value: number) => string`             | Format a number per the active locale.                    |
| `tm`       | `(key) => Partial<TMessages>`           | Translate a whole message (sub)tree for a key.            |

{% hint style="warning" %}
Throws `[vueless] Could not find injected locale instance` if no locale was provided at app setup.
{% endhint %}

### useComponentLocaleMessages

Resolve the final localized messages for a Vueless component by layering, in increasing priority: the component's default messages, the global messages for the active locale, and per-instance overrides. Mostly used when building your own components.

```vue
<script setup>
import { useComponentLocaleMessages } from "vueless";

const defaultLocale = { loading: "Loading..." };
const props = defineProps(["config"]);

const { localeMessages } = useComponentLocaleMessages(
  "UButton",
  defaultLocale,
  props.config?.i18n,
);
</script>

<template>
  <span>{{ localeMessages.loading }}</span>
</template>
```

Arguments:

* `componentName` — the component name used to look up global messages (e.g. `"UButton"`).
* `defaultLocale` — the component's built-in default messages (lowest priority).
* `propsLocale` — instance-level overrides from the component's config/locale prop (highest priority).

Returns:

| Property         | Type                   | Description                                                                       |
| ---------------- | ---------------------- | --------------------------------------------------------------------------------- |
| `localeMessages` | `ComputedRef<TLocale>` | Reactive merge of default < global < props messages. Recomputes on locale change. |
