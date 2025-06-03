# Unstyled mode

To completely remove Vueless default styles and use only your custom ones, set the `unstyled` key in `vueless.config.{js,ts}` globally, or individually within specific components.

{% code title="vueless.config.{js,ts}" %}
```js
export default {
  unstyled: true, /* remove defalut styles for all components */
  component: {
    UButton: {
      unstyled: false, /* but keep default styles for the UButton component */
      button: {
        base: "text-2xl absolute",
      }
    }
  }
};
```
{% endcode %}

