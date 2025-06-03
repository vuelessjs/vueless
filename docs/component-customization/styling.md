# Styling

The library uses [Tailwind CSS](https://tailwindcss.com/) as its CSS framework for component styling. To conditionally apply styles based on prop values, Vueless leverages [CVA](https://beta.cva.style) (Class Variance Authority).

Each HTML tag in a component has its own config key with corresponding Tailwind classes inside.

### **The component styles can be customized in three ways:**

* Globally for particular component in `vueless.config.{js,ts}`
* Locally using the component’s `config` prop.
* Locally using the component’s `class` attribute.

### Merging priority

Thanks to [tailwind-merge](https://github.com/dcastil/tailwind-merge), all those configs are smartly merged with the component's default config, following this priority order:

* Component `class` attribute (highest priority)
* Component `config` prop
* Global `vueless.config.{js,ts}`
* Component default config (lowest priority)

## Component global styling

To apply your project’s design system styles to Vueless components, define them under the `component` key in the `vueless.config.{js,ts}` file. Use the component name (e.g., `UButton`, `UCard`, etc.) as a nested key, and assign class names to relevant parts of the component within its config.

{% hint style="success" %}
This is the recommended way for styling Vueless components.
{% endhint %}

Example of component customization:

{% code title="vueless.config.{js,ts}" %}
```js
export default {
  component: {
    UButton: {
      button: "bg-red-500",
      text: "px-4 text-2xl font-bold",
    },
    UCard: {
      wrapper: "border-gray-300",
    }
  }
};
```
{% endcode %}

## &#x20;Component config prop

Each component includes a config prop that allows for specific customization. Use this approach to fine-tune components for particular cases.&#x20;

{% hint style="warning" %}
Use this approach with caution to ensure the project's design system remains consistent.
{% endhint %}

For example, to change the font weight of the `title`, you only need to specify:

```html
<UEmpty
  title="The list is empty"
  :config="{ title: 'font-bold' }" 
/>
```

This will smartly replace `font-medium` with `font-bold`, avoiding class duplication and preventing any class priority issues.

## Component class attribute

You can also use the default `class` attribute to add classes to the component.

```html
<UButton label="Button" class="mt-4" />
```

In this case, the classes will be applied to the top-level component’s HTML tag and will override any other classes applied at lower levels (config prop, vueless config and component default config).&#x20;

{% hint style="info" %}
This approach is best suited for component positioning.
{% endhint %}
