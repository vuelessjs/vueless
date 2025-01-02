# Custom tailwind classes

If you are going to use custom tailwind classes for styling Vueless components, first you need to add them into `tailwindMerge` config. See: [All list of properties.](https://github.com/dcastil/tailwind-merge/blob/v2.3.0/src/lib/default-config.ts)

{% code title="vueless.config.js" %}
```js
export default {
  tailwindMerge: {
    extend: {
      theme: {
        classGroups: {
          "ring-w": [{ ring: ["brand"] }],
          "font-size": [{ text: ["2xs"] }],
        }
      }
    }
  }
};
```
{% endcode %}
