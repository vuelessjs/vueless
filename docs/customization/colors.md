# Colors

## Predefined colors

Components are based on a `brand` and a `gray` color.&#x20;

<pre class="language-js" data-title="vueless.config.js"><code class="lang-js">export default {
  brand: "green",
  gray: "zinc",
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

Vueless uses Tailwind CSS under the hood, so you can use any of the [Tailwind CSS colors](https://tailwindcss.com/docs/customizing-colors#color-palette-reference) or your own custom colors.

**By default:**

* the `brand` color is `green`,
* the `gray` color is `zinc`.

## Custom colors

When [using custom colors](https://tailwindcss.com/docs/customizing-colors#using-custom-colors) or [adding additional colors](https://tailwindcss.com/docs/customizing-colors#adding-additional-colors) through the `extend` key in your `tailwind.config.js`, you'll need to make sure to define all the shades from `50` to `950` as most of them are used in the package components.

You can [generate your colors](https://tailwindcss.com/docs/customizing-colors#generating-colors) using tools such as https://uicolors.app for example.

{% code title="tailwind.config.js" %}
```js
export default {
  theme: {
    extend: {
      colors: {
        green: {
          50: '#EFFDF5',
          100: '#D9FBE8',
          200: '#B3F5D1',
          300: '#75EDAE',
          400: '#00DC82',
          500: '#00C16A',
          600: '#00A155',
          700: '#007F45',
          800: '#016538',
          900: '#0A5331',
          950: '#052e16'
        }
      }
    }
  }
}
```
{% endcode %}

## Brand CSS Variable

To provide dynamic brand color that can be changed at runtime, this module uses CSS variable.

> We'd advise you to use that color in your components and pages, e.g. `text-brand dark:text-brand`, etc. so your app automatically adapts when changing your `vueless.config.js`.

To change the brand color, you should call this function whatever you need:

```js
import { setBrandColor } from "vueless/service.ui";

// set default brand color
setBrandColor();

// or set brand color from tailwind colors palette
setBrandColor("red");

// or set your own custom brand color
setBrandColor("#00C16A");
```

The `brand` color also has a `DEFAULT` shade that changes based on the theme. It is `500` in light mode and `400` in dark mode. You can use it as a shortcut in your components and pages, e.g. `text-brand`, `bg-brand`, `focus-visible:ring-brand`, etc.

> For custom hex color, there is only one shade for dark and light themes.

## Smart Safelisting

Components having a `color` prop like `UAvatar`, `UButton`, `URadioGroup`, `UCheckbox`, `UHeader` etc. will use the `brand` or `grayscale` color by default, but will handle all the colors defined in your `tailwind.config.ts` or the default Tailwind CSS colors.

Variant classes of those components are defined with a syntax like `bg-{color}-500 dark:bg-{color}-400` so they can be used with any color. However, this means that Tailwind will not find those classes and therefore will not generate the corresponding CSS.

The library uses the [Tailwind CSS safelist](https://tailwindcss.com/docs/content-configuration#safelisting-classes) feature to force the generation of component colors.

The Vueless will **automatically** detect when you use one of those components with a color and will safelist it for you. This means that if you use a `red` color for a UButton component, the `red` color classes will be safelisted for the UButton component only. This will allow to keep the CSS bundle size as small as possible.

If you bind a dynamic color to a component: `<UBadge :color="color" />`, `<UButton :color="statuses[button.status]" />`, etc. You'll need to safelist the possible color values manually as well.

{% code title="vueless.config.js" %}
```js
export default {
  safelistColors: ["orange", "amber", "sky"], // applies for all components
  component: {
    UButton: {
      safelistColors: ["red"], // applies only for UButton
    }
  }
}
```
{% endcode %}

## Replacing safelist patterns

In some specific cases you can replace safelist config as well:

{% code title="vueless.config.js" %}
```js
export default {
  component: {
    UButton: {
      safelist: (colors) => [
        { pattern: `bg-(${colors})-500`, variants: ["hover", "focus", "active"] },
        { pattern: `text-(${colors})-500` },
      ],
    }
  }
};
```
{% endcode %}

[^1]: 
