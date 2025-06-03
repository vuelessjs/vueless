# Custom tailwind classes

To prevent class duplication, Vueless uses [tailwind-merge](https://github.com/dcastil/tailwind-merge) under the hood.&#x20;

If you plan to use custom Tailwind CSS classes to style Vueless components, add them to the Vueless config under the `tailwindMerge` key, following the `tailwind-merge` configuration.&#x20;

See the full list of available properties [here](https://github.com/dcastil/tailwind-merge/blob/main/src/lib/default-config.ts).

{% code title="vueless.config.js" %}
```js
export default {
  tailwindMerge: {
    extend: {
      theme: {
        classGroups: {
          "ring-w": [{ ring: ["tiny"] }],
          "font-size": [{ text: ["2xs"] }],
        }
      }
    }
  }
};
```
{% endcode %}
