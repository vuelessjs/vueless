# General

Vueless gathers all component settings in one place — a plain JavaScript object. This includes styles, default prop values, i18n, and more.

{% hint style="info" %}
You can find component default settings in the “Default Config” section at the end of each component docs page in the [Vueless UI documentation](https://ui.vueless.com/).
{% endhint %}

The default Vueless component configs can be customized globally under the `component` key in the`vueless.config.{js,ts}`.

## Usage

Here is an example of customizing the `USelect` component. In this example, we partially redefine some styles (Tailwind CSS classes), internationalization values, and default props.

{% code title="vueless.config.{js,ts}" %}
```js
export default {
  component: {
    USelect: {
      wrapper: "border-brand-400 w-64",
      selectedLabel: "text-lg font-bold px-4",
      i18n: {
        clear: "Remove",
        addMore: "Add item",
      },
      defaults: {
        size: "lg",
        clearable: false,
        dropdownIcon: "arrow_down",
      },
    }
  }
};
```
{% endcode %}
