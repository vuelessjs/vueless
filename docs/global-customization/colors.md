# Colors

## Predefined colors

Components are based on a `primary` color and `neutral` color.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  primary: "green",  /* default -> grayscale */
  neutral: "stone", /* default -> gray */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

Vueless uses Tailwind CSS under the hood, so you can use any of the [Tailwind CSS colors](https://tailwindcss.com/docs/customizing-colors#color-palette-reference) or your own custom colors.

#### Default primary colors:&#x20;

`red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

#### Default neutral colors:&#x20;

`slate`, `gray`, `zinc`, `neutral`, `stone`&#x20;

***

## Custom color shades

You can also define custom colors by providing an object with all Tailwind shades (`50`, `100` ..., `950`):

{% code title="vueless.config.{js,ts}" %}
```js
export default {
  primary: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },
  neutral: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712",
  },
};
```
{% endcode %}

{% hint style="info" %}
If you use an object for colors, all shade keys should be defined. Missing or invalid shade keys will trigger a console warning.
{% endhint %}

***

## CSS variables

To enable dynamic color changes at runtime, Vueless use the `--vl-primary-*` and `--vl-neutral-*` CSS variables. These variables will represent all Tailwind CSS shades of the defined Vueless colors.

* `--vl-primary-50`,  `--vl-primary-100`, ... `--vl-primary-900`, `--vl-primary-950`
* `--vl-gray-50`,  `--vl-gray-100`, ... `--vl-gray-900`, `--vl-gray-950`

Example usage ([custom properties syntax](https://tailwindcss.com/docs/color#using-a-custom-value)):

```html
<UButton 
  class="
    text-(--vl-primary-600) dark:text-(--vl-primary-400) 
    bg-(--vl-neutral-200) dark:bg-(--vl-neutral-800)
  "
/>
```

***

## Adding color utility classes

To use all `primary` and `neutral` color shades as a utility classes (e.g.: `text-primary-700 dark:text-neutral-300`), you must define them in the application’s main CSS file.

{% code title="main.css" %}
```scss
@import "tailwindcss";
@import "vueless";

@theme {
  /* Primary colors */
  --color-primary-50: var(--vl-primary-50);
  --color-primary-100: var(--vl-primary-100);
  --color-primary-200: var(--vl-primary-200);
  --color-primary-300: var(--vl-primary-300);
  --color-primary-400: var(--vl-primary-400);
  --color-primary-500: var(--vl-primary-500);
  --color-primary-600: var(--vl-primary-600);
  --color-primary-700: var(--vl-primary-700);
  --color-primary-800: var(--vl-primary-800);
  --color-primary-900: var(--vl-primary-900);
  --color-primary-950: var(--vl-primary-950);

  /* Neutral colors */
  --color-neutral-50: var(--vl-neutral-50);
  --color-neutral-100: var(--vl-neutral-100);
  --color-neutral-200: var(--vl-neutral-200);
  --color-neutral-300: var(--vl-neutral-300);
  --color-neutral-400: var(--vl-neutral-400);
  --color-neutral-500: var(--vl-neutral-500);
  --color-neutral-600: var(--vl-neutral-600);
  --color-neutral-700: var(--vl-neutral-700);
  --color-neutral-800: var(--vl-neutral-800);
  --color-neutral-900: var(--vl-neutral-900);
  --color-neutral-950: var(--vl-neutral-950);
}
```
{% endcode %}

{% hint style="info" %}
Keep in mind that Tailwind CSS already includes a neutral color in its palette, so it will be overridden. To avoid conflicts, consider using a different color name, such as `neu` (e.g., `--color-neu-*`).
{% endhint %}

***

## Custom colors

When [overriding default colors](https://tailwindcss.com/docs/colors#overriding-default-colors) or [adding custom colors](https://tailwindcss.com/docs/colors#customizing-your-colors), ensure you define all shades from 50 to 950, or at least the ones used in the default or your Vueless theme.

{% code title="main.css" %}
```scss
@import "tailwindcss";
@import "vueless";

@theme {
  /* Custom blue colors */
  --color-blue-50: #f1f9fe;
  --color-blue-100: #e1f3fd;
  --color-blue-200: #bde6fa;
  --color-blue-300: #62c8f4;
  --color-blue-400: #41beef;
  --color-blue-500: #18a5df;
  --color-blue-600: #0b85be;
  --color-blue-700: #0a6a9a;
  --color-blue-800: #0d597f;
  --color-blue-900: #104b6a;
  --color-blue-950: #0b2f46;
}
```
{% endcode %}

You can generate your colors using tools such as [uicolors](https://uicolors.app) for example.

[^1]: 
