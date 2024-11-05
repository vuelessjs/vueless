# Colors

## Predefined colors

Components are based on a `brand` and a `gray` color.&#x20;

<pre class="language-js" data-title="vueless.config.js"><code class="lang-js">export default {
  brand: "blue", /* default -> grayscale */
  gray: "stone", /* default -> cool */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

Vueless uses Tailwind CSS under the hood, so you can use any of the [Tailwind CSS colors](https://tailwindcss.com/docs/customizing-colors#color-palette-reference) or your own custom colors.

## Custom colors

When [using custom colors](https://tailwindcss.com/docs/customizing-colors#using-custom-colors) or [adding additional colors](https://tailwindcss.com/docs/customizing-colors#adding-additional-colors) through the `extend` key in your `tailwind.config.js`, you'll need to make sure to define all the shades from `50` to `950` as most of them are used in the Vueless components.

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

You can [generate your colors](https://tailwindcss.com/docs/customizing-colors#generating-colors) using tools such as [uicolors](https://uicolors.app) for example.

## CSS Variables <a href="#css-variables" id="css-variables"></a>

To provide dynamic colors that can be changed at runtime, Vueless uses CSS variables. As Tailwind CSS already has a `gray` color, the library automatically renames it to `cool` to avoid conflicts (`coolGray` was renamed to `gray` when Tailwind CSS v3.0 was released).

Same way, you can't define a `brand` color in your `tailwind.config.js` as it would conflict with the `brand` color defined by the library.

## Brand colors

We'd advise you to use brand colors in your components and pages, e.g.: `text-brand-700 dark:text-brand-300`, etc.

The `brand` and `gray` colors has a `DEFAULT` shade that changes based on the theme. It is `500` in light mode and `400` in dark mode. You can use it as a shortcut in your components and pages, e.g. `bg-brand`, `focus:ring-brand`, etc.

***

## Smart Safelisting

Components having a `color` prop like `UAvatar`, `UButton`, `URadioGroup`, `UCheckbox` etc. will use the `brand` color by default, but will handle all the colors defined in your `tailwind.config.js` or the default Tailwind CSS colors.

Variant classes of those components are defined with a syntax like `bg-{color}-500 dark:bg-{color}-400` so they can be used with any color. However, this means that Tailwind CSS will not find those classes and therefore will not generate the corresponding CSS.

The library uses the [Tailwind CSS safelist](https://tailwindcss.com/docs/content-configuration#safelisting-classes) feature to force the generation of component colors.

Vueless will **automatically** detect when you use one of those components with a color and will safelist it for you.&#x20;

This means that if you use a `red` color for a `UButton` component, the `red` color classes will be safelisted for this component. This will allow to keep the CSS bundle size as small as possible.

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

To reduce the app bundle size It's better to safelist colors for particular components.

[^1]: 
