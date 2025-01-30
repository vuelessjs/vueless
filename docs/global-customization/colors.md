# Colors

## Predefined colors

Components are based on a `brand` color and `gray` color.

<pre class="language-js" data-title="vueless.config.js"><code class="lang-js">export default {
  brand: "blue", /* default -> grayscale */
  gray: "stone", /* default -> cool */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

Vueless uses Tailwind CSS under the hood, so you can use any of the [Tailwind CSS colors](https://tailwindcss.com/docs/customizing-colors#color-palette-reference) or your own custom colors.

***

## Custom colors

When [using custom colors](https://tailwindcss.com/docs/customizing-colors#using-custom-colors) or [adding additional colors](https://tailwindcss.com/docs/customizing-colors#adding-additional-colors) through the `extend` key in your `tailwind.config.{js,ts}`, make sure to define all the shades from 50 to 950, as most of them are utilized in the Vueless components.

{% code title="tailwind.config.{js,ts}" %}
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

***

## Dynamic colors <a href="#css-variables" id="css-variables"></a>

To provide dynamic colors that can be changed at runtime, Vueless uses CSS variables. Since Tailwind CSS already includes a `gray` color, the library automatically renames it to `cool` to avoid conflicts.&#x20;

Similarly, you cannot define a `brand` color in your `tailwind.config.{js,ts}` file, as it would conflict with the `brand` color defined by the library.

***

## Brand and Gray colors

We recommend to use the `brand` and `gray` colors in your components and pages, e.g.: `text-brand-700 dark:text-gray-300`, etc.

***

## Smart Safelisting

Components with a color prop, such as `UAvatar`, `UButton`, `URadioGroup` and `UCheckbox`, using the brand color by default, but they can also handle all colors defined in your `tailwind.config.{js,ts}` or the default Tailwind CSS palette.

The variant classes for these components follow a syntax like `bg-{color}-500` `dark:bg-{color}-400`, making them compatible with any color. However, since Tailwind CSS cannot detect these dynamically generated classes, it will not generate the corresponding CSS by default.

The library leverages [Tailwind CSS’s safelist](https://tailwindcss.com/docs/content-configuration#safelisting-classes) feature to ensure the necessary component color classes are generated.

Vueless **automatically** detects when you use a component with a specific color and safelists the relevant classes for you. For example, if you use a `red` color for a `UButton` component, the `red` color classes will be safelisted, keeping the CSS bundle size as small as possible.

However, if you bind a dynamic color to a component (e.g., `<UBadge :color="color" />`, `<UButton :color="statuses[button.status]" />`), you’ll need to safelist the potential color values manually.

{% code title="vueless.config.{js,ts}" %}
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

{% hint style="info" %}
To minimize the app bundle size, it’s recommended to safelist colors for specific components rather than globally.
{% endhint %}

***

## CSS variables

You can also use the corresponding CSS variables directly for all tailwind color shades:&#x20;

* `--vl-brand-50`,  `--vl-brand-100`, ... `--vl-brand-900`, `--vl-brand-950`
* `--vl-gray-50`,  `--vl-gray-100`, ... `--vl-gray-900`, `--vl-gray-950`

[^1]: 
