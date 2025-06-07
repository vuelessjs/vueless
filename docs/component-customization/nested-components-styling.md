# Nested components styling

In some component default config (e.g.  `UTable`), you might find other component names enclosed in curly brackets, such as `{UButton}`, `{UIcon}`, `{ULink}`, etc. This indicates that the component key contains this nested Vueless component.

{% code title="UTable default config" %}
```js
export default {
  /* Shortcut notation */
  headerLoader: "{ULoaderProgress} ...",
  /* Full notation */
  bodyCellNestedExpandIcon: {
    base: "{UIcon}",
    ...
  },
};
```
{% endcode %}

The styles of these nested components can be customized by defining their config keys within the parent component’s config key (including conditional styling as well).

{% code title="vueless.config.{js,ts}" %}
```js
export default {
  component: {
    UTable: {
      /* Redefining top-level component's element classes (shortcut). */
      headerLoader: "absolute !top-auto",
      /* Redefining classes for any component's nested elements. */
      bodyCellNestedExpandIcon: {
        wrapper: "rounded-sm",
        container: "bg-gray-200",
      },
    }
  }
};
```
{% endcode %}
