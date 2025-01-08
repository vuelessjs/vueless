# Classes smart merging

Thanks to [tailwind-merge](https://github.com/dcastil/tailwind-merge), all those configs are smartly merged with the default config. This means you don’t need to rewrite everything from scratch.

## **Merging priority**

* Component `class` attribute (highest priority)
* Component `config` prop
* Global `vueless.config.{js,ts}`
* Component default config (lowest priority)

## **Merging strategy**

You can change the merge behavior by modifying the `strategy` key in the `vueless.config.{js,ts}` or component `config` prop:

* `merge` (default) – Smartly merges the provided custom classes with the default config classes.
* `replace` – Replaces default config keys with the provided custom keys (only overrides provided keys; the rest will be taken from the default config).
* `override` – Completely overrides the default config with the provided custom config (removes all default classes, keeping only the custom config).

{% code title="vueless.config.{js,ts}" %}
```js
export default {
  strategy: "override", // applies for all components
  component: {
    UButton: {
      strategy: "merge", // applies only for UButton
      button: {
        base: "bg-red-500 w-full",
      }
    }
  }
};
```
{% endcode %}

