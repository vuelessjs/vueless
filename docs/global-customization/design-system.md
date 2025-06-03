# Design system

Vueless enhances Tailwind CSS theming with a flexible design system, featuring pre-configured color aliases and CSS variables. This enables seamless customization and effortless UI adaptation to match your brand’s aesthetic.

## Colors

Vueless utilizes the Vueless config to define customizable color aliases based on [Tailwind CSS colors](http://tailwindcss.com/docs/colors#color-palette-reference).

<table><thead><tr><th width="130.32421875">Color</th><th width="130.3671875">Default</th><th>Description</th></tr></thead><tbody><tr><td><code>primary</code></td><td><code>grayscale</code></td><td>The primary brand color, used as the default for components.</td></tr><tr><td><code>secondary</code></td><td><code>gray</code></td><td>A secondary color that complements the primary color.</td></tr><tr><td><mark style="color:green;"><code>success</code></mark></td><td><code>green</code></td><td>A color used for success states.</td></tr><tr><td><mark style="color:red;"><code>error</code></mark></td><td><code>red</code></td><td>A color used for danger states or form error validation.</td></tr><tr><td><mark style="color:orange;"><code>warning</code></mark></td><td><code>orange</code></td><td>A color used for warning states.</td></tr><tr><td><mark style="color:purple;"><code>help</code></mark></td><td><code>violet</code></td><td>A color used for highlighted informational states.</td></tr><tr><td><mark style="color:blue;"><code>info</code></mark></td><td><code>blue</code></td><td>A color used for informational states.</td></tr><tr><td><code>grayscale</code></td><td><code>gray</code></td><td>Contrasted neutral color.</td></tr><tr><td><code>neutral</code></td><td><code>gray</code></td><td>Neutral gray color for backgrounds, text, etc.</td></tr></tbody></table>

## Tokens

Vueless uses 40+ CSS variables as design tokens to ensure consistent and flexible component styling. These tokens form the foundation of the theming system, providing seamless support for `light` and `dark` modes. Applied across all components, they can be customized through the Vueless config.

### Color Shades

Vueless automatically generates three CSS variables and defines custom Tailwind CSS color utilities for each color alias.

Here’s an example of an `error` color:

<table><thead><tr><th width="202.671875">CSS variable</th><th width="206.44140625">Tailwin CSS class example</th><th>Description</th></tr></thead><tbody><tr><td><code>--vl-error</code></td><td><code>bg-error</code></td><td>Default shade.</td></tr><tr><td><code>--vl-error-lifted</code></td><td><code>bg-error-lifted</code></td><td>Darker shade (e.g., for hover states).</td></tr><tr><td><code>--vl-error-accented</code></td><td><code>bg-error-accented</code></td><td>Darkest shade (e.g., for active states).</td></tr></tbody></table>

You can use this colors just like any regular Tailwind CSS colors or use CSS variable in a utility class directly `bg-(--vl-error)`.

To override specific color shades, define them in your application’s Vueless config or main CSS file, as shown in the example below (which includes all available shades with their default values).

{% tabs %}
{% tab title="Light" %}
{% code title="vueless.config.{js,ts}" %}
```javascript
export default {
  lightTheme: {
    /* Primary colors */
    "--vl-primary": "--vl-primary-600",
    "--vl-primary-lifted": "--vl-primary-700",
    "--vl-primary-accented": "--vl-primary-800",

    /* Secondary colors */
    "--vl-secondary": "--vl-neutral-500",
    "--vl-secondary-lifted": "--vl-neutral-600",
    "--vl-secondary-accented": "--vl-neutral-700",

    /* Success colors */
    "--vl-success": "--color-green-600",
    "--vl-success-lifted": "--color-green-700",
    "--vl-success-accented": "--color-green-800",

    /* Info colors */
    "--vl-info": "--color-blue-600",
    "--vl-info-lifted": "--color-blue-700",
    "--vl-info-accented": "--color-blue-800",

    /* Notice colors */
    "--vl-notice": "--color-violet-600",
    "--vl-notice-lifted": "--color-violet-700",
    "--vl-notice-accented": "--color-violet-800",

    /* Warning colors */
    "--vl-warning": "--color-orange-600",
    "--vl-warning-lifted": "--color-orange-700",
    "--vl-warning-accented": "--color-orange-800",

    /* Error colors */
    "--vl-error": "--color-red-600",
    "--vl-error-lifted": "--color-red-700",
    "--vl-error-accented": "--color-red-800",

    /* Grayscale colors */
    "--vl-grayscale": "--vl-neutral-900",
    "--vl-grayscale-lifted": "--vl-neutral-800",
    "--vl-grayscale-accented": "--vl-neutral-700",

    /* Neutral colors */
    "--vl-neutral": "--vl-neutral-500",
    "--vl-neutral-lifted": "--vl-neutral-600",
    "--vl-neutral-accented": "--vl-neutral-700",
  },
};
```
{% endcode %}
{% endtab %}

{% tab title="Dark" %}
{% code title="vueless.config.{js,ts}" %}
```javascript
export default {
  darkTheme: {
    /* Primary colors */
    "--vl-primary": "--vl-primary-400",
    "--vl-primary-lifted": "--vl-primary-500",
    "--vl-primary-accented": "--vl-primary-600",

    /* Secondary colors */
    "--vl-secondary": "--vl-neutral-300",
    "--vl-secondary-lifted": "--vl-neutral-400",
    "--vl-secondary-accented": "--vl-neutral-500",

    /* Success colors */
    "--vl-success": "--color-green-400",
    "--vl-success-lifted": "--color-green-500",
    "--vl-success-accented": "--color-green-600",

    /* Info colors */
    "--vl-info": "--color-blue-400",
    "--vl-info-lifted": "--color-blue-500",
    "--vl-info-accented": "--color-blue-600",

    /* Notice colors */
    "--vl-notice": "--color-violet-400",
    "--vl-notice-lifted": "--color-violet-500",
    "--vl-notice-accented": "--color-violet-600",

    /* Warning colors */
    "--vl-warning": "--color-orange-400",
    "--vl-warning-lifted": "--color-orange-500",
    "--vl-warning-accented": "--color-orange-600",

    /* Error colors */
    "--vl-error": "--color-red-400",
    "--vl-error-lifted": "--color-red-500",
    "--vl-error-accented": "--color-red-600",

    /* Grayscale colors */
    "--vl-grayscale": "--vl-neutral-100",
    "--vl-grayscale-lifted": "--vl-neutral-200",
    "--vl-grayscale-accented": "--vl-neutral-300",

    /* Neutral colors */
    "--vl-neutral": "--vl-neutral-300",
    "--vl-neutral-lifted": "--vl-neutral-400",
    "--vl-neutral-accented": "--vl-neutral-500",
  },
};
```
{% endcode %}
{% endtab %}

{% tab title="Light / in СSS" %}
{% code title="main.css" %}
```css
:root {
  /* Primary colors */
  --vl-primary: var(--vl-primary-600);
  --vl-primary-lifted: var(--vl-primary-700);
  --vl-primary-accented: var(--vl-primary-800);
  
  /* Secondary colors */
  --vl-secondary: var(--vl-neutral-500);
  --vl-secondary-lifted: var(--vl-neutral-600);
  --vl-secondary-accented: var(--vl-neutral-700);
  
  /* Success colors */
  --vl-success: var(--color-green-600);
  --vl-success-lifted: var(--color-green-700);
  --vl-success-accented: var(--color-green-800);
  
  /* Info colors */
  --vl-info: var(--color-blue-600);
  --vl-info-lifted: var(--color-blue-700);
  --vl-info-accented: var(--color-blue-800);
  
  /* Notice colors */
  --vl-notice: var(--color-violet-600);
  --vl-notice-lifted: var(--color-violet-700);
  --vl-notice-accented: var(--color-violet-800);
  
  /* Warning colors */
  --vl-warning: var(--color-orange-600);
  --vl-warning-lifted: var(--color-orange-700);
  --vl-warning-accented: var(--color-orange-800);
  
  /* Error colors */
  --vl-error: var(--color-red-600);
  --vl-error-lifted: var(--color-red-700);
  --vl-error-accented: var(--color-red-800);
  
  /* Grayscale colors */
  --vl-grayscale: var(--vl-neutral-900);
  --vl-grayscale-lifted: var(--vl-neutral-800);
  --vl-grayscale-accented: var(--vl-neutral-700);
  
  /* Neutral colors */
  --vl-neutral: var(--vl-neutral-500);
  --vl-neutral-lifted: var(--vl-neutral-600);
  --vl-neutral-accented: var(--vl-neutral-700);
}
```
{% endcode %}
{% endtab %}

{% tab title="Dark / in CSS" %}
{% code title="main.css" %}
```css
.vl-dark {
  /* Primary colors */
  --vl-primary: var(--vl-primary-400);
  --vl-primary-lifted: var(--vl-primary-500);
  --vl-primary-accented: var(--vl-primary-600);
  
  /* Secondary colors */
  --vl-secondary: var(--vl-neutral-300);
  --vl-secondary-lifted: var(--vl-neutral-400);
  --vl-secondary-accented: var(--vl-neutral-500);
  
  /* Success colors */
  --vl-success: var(--color-green-400);
  --vl-success-lifted: var(--color-green-500);
  --vl-success-accented: var(--color-green-600);
  
  /* Info colors */
  --vl-info: var(--color-blue-400);
  --vl-info-lifted: var(--color-blue-500);
  --vl-info-accented: var(--color-blue-600);
  
  /* Notice colors */
  --vl-notice: var(--color-violet-400);
  --vl-notice-lifted: var(--color-violet-500);
  --vl-notice-accented: var(--color-violet-600);
  
  /* Warning colors */
  --vl-warning: var(--color-orange-400);
  --vl-warning-lifted: var(--color-orange-500);
  --vl-warning-accented: var(--color-orange-600);
  
  /* Error colors */
  --vl-error: var(--color-red-400);
  --vl-error-lifted: var(--color-red-500);
  --vl-error-accented: var(--color-red-600);
  
  /* Grayscale colors */
  --vl-grayscale: var(--vl-neutral-100);
  --vl-grayscale-lifted: var(--vl-neutral-200);
  --vl-grayscale-accented: var(--vl-neutral-300);
  
  /* Neutral colors */
  --vl-neutral: var(--vl-neutral-300);
  --vl-neutral-lifted: var(--vl-neutral-400);
  --vl-neutral-accented: var(--vl-neutral-500);
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

### Neutral Shades

Vueless automatically generates five CSS variables and defines custom Tailwind utility classes for `text`, `border` and `background` neutral colors.

To override specific color shades, define them in your application’s Vueless config or main CSS file, as shown in the example below (which includes all available shades).

{% tabs %}
{% tab title="Light" %}
{% code title="vueless.config.{js,ts}" %}
```javascript
export default {
  lightTheme: {
    /* Text neutral colors */
    "--vl-text-inverted": "--color-white",
    "--vl-text-muted": "--vl-neutral-400",
    "--vl-text-lifted": "--vl-neutral-500",
    "--vl-text-accented": "--vl-neutral-600",
    "--vl-text": "--vl-neutral-900",

    /* Border neutral colors */
    "--vl-border-muted": "--vl-neutral-200",
    "--vl-border": "--vl-neutral-300",
    "--vl-border-lifted": "--vl-neutral-400",
    "--vl-border-accented": "--vl-neutral-600",    

    /* Background neutral colors */
    "--vl-bg": "--color-white",
    "--vl-bg-muted": "--vl-neutral-50",
    "--vl-bg-lifted": "--vl-neutral-100",
    "--vl-bg-accented": "--vl-neutral-200",
    "--vl-bg-inverted": "--vl-neutral-900",
  },
};
```
{% endcode %}
{% endtab %}

{% tab title="Dark" %}
{% code title="vueless.config.{js,ts}" %}
```javascript
export default {
  darkTheme: {
    /* Text neutral colors */
    "--vl-text-inverted": "--vl-neutral-900",
    "--vl-text-muted": "--vl-neutral-600",
    "--vl-text-lifted": "--vl-neutral-400",
    "--vl-text-accented": "--vl-neutral-300",
    "--vl-text": "--vl-neutral-100",

    /* Border neutral colors */
    "--vl-border-muted": "--vl-neutral-800",
    "--vl-border": "--vl-neutral-700",
    "--vl-border-lifted": "--vl-neutral-600",
    "--vl-border-accented": "--vl-neutral-400",

    /* Background neutral colors */
    "--vl-bg": "--vl-neutral-900",
    "--vl-bg-muted": "--vl-neutral-800"
    "--vl-bg-lifted": "--vl-neutral-800",
    "--vl-bg-accented": "--vl-neutral-700",
    "--vl-bg-inverted": "--vl-neutral-100",
  },
};
```
{% endcode %}
{% endtab %}

{% tab title="Light / in CSS" %}
{% code title="main.css" %}
```css
:root {
  /* Text neutral colors */
  --vl-text-inverted: var(--color-white);
  --vl-text-muted: var(--vl-neutral-400);
  --vl-text-lifted: var(--vl-neutral-500);
  --vl-text-accented: var(--vl-neutral-600);
  --vl-text: var(--vl-neutral-900);
  
  /* Border neutral colors */
  --vl-border-muted: var(--vl-neutral-200);
  --vl-border: var(--vl-neutral-300);
  --vl-border-lifted: var(--vl-neutral-400);
  --vl-border-accented: var(--vl-neutral-600);
    
  /* Background neutral colors */
  --vl-bg: var(--color-white);
  --vl-bg-muted: var(--vl-neutral-50);
  --vl-bg-lifted: var(--vl-neutral-100);
  --vl-bg-accented: var(--vl-neutral-200);
  --vl-bg-inverted: var(--vl-neutral-900);
}
```
{% endcode %}
{% endtab %}

{% tab title="Dark / in CSS" %}
{% code title="main.css" %}
```css
.vl-dark {
  /* Text neutral colors */
  --vl-text-inverted: var(--vl-neutral-900);
  --vl-text-muted: var(--vl-neutral-600);
  --vl-text-lifted: var(--vl-neutral-400);
  --vl-text-accented: var(--vl-neutral-300);
  --vl-text: var(--vl-neutral-100);
  
  /* Border neutral colors */
  --vl-border-muted: var(--vl-neutral-800);
  --vl-border: var(--vl-neutral-700);
  --vl-border-lifted: var(--vl-neutral-600);
  --vl-border-accented: var(--vl-neutral-400);
  
  /* Background neutral colors */
  --vl-bg: var(--vl-neutral-900);
  --vl-bg-muted: var(--vl-neutral-800);
  --vl-bg-lifted: var(--vl-neutral-800);
  --vl-bg-accented: var(--vl-neutral-700);
  --vl-bg-inverted: var(--vl-neutral-100);
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

#### Text neutral colors

<table><thead><tr><th width="202.671875">CSS variable</th><th width="206.44140625">Tailwind CSS utility class</th><th>Description</th></tr></thead><tbody><tr><td><code>--vl-text-inverted</code></td><td><code>text-inverted</code></td><td>Text to show on inverted backgrounds.</td></tr><tr><td><code>--vl-text-muted</code></td><td><code>text-muted</code></td><td>Disabled / placeholder state text.</td></tr><tr><td><code>--vl-text-lifted</code></td><td><code>text-lifted</code></td><td>Description / supportive text.</td></tr><tr><td><code>--vl-text-accented</code></td><td><code>text-accented</code></td><td>Active state text. </td></tr><tr><td><code>--vl-text</code></td><td><code>text-default</code></td><td>Contrast text.</td></tr></tbody></table>

You can use this colors as an CSS variable in a utility class directly `text-(--vl-text-muted)`.

#### Border neutral colors

<table><thead><tr><th width="208.04296875">CSS variable</th><th width="206.44140625">Tailwind CSS utility class</th><th>Description</th></tr></thead><tbody><tr><td><code>--vl-border-muted</code></td><td><code>border-muted</code></td><td>Lighter border (e.g., for disabled states).</td></tr><tr><td><code>--vl-border</code></td><td><code>border-default</code></td><td>Default border.</td></tr><tr><td><code>--vl-border-lifted</code></td><td><code>border-lifted</code></td><td>Darker border (e.g., for hover states).</td></tr><tr><td><code>--vl-border-accented</code></td><td><code>border-accented</code></td><td>Darkest border (e.g., for active states).</td></tr></tbody></table>

You can use this colors as an CSS variable in a utility class directly `border-(--vl-border-accented)`.

#### Background neutral colors

<table><thead><tr><th width="208.04296875">CSS variable</th><th width="206.44140625">Tailwind CSS utility class</th><th>Description</th></tr></thead><tbody><tr><td><code>--vl-bg</code></td><td><code>bg-default</code></td><td>Unfilled background.</td></tr><tr><td><code>--vl-bg-muted</code></td><td><code>bg-muted</code></td><td>Slightly filled background.</td></tr><tr><td><code>--vl-bg-lifted</code></td><td><code>bg-lifted</code></td><td>Filled background.</td></tr><tr><td><code>--vl-bg-accented</code></td><td><code>bg-accented</code></td><td>Pretty filled background. </td></tr><tr><td><code>--vl-bg-inverted</code></td><td><code>bg-inverted</code></td><td>Contrast background.</td></tr></tbody></table>

You can use this colors as an CSS variable in a utility class directly `bg-(--vl-bg-muted)`.

## Redefining colors

You can use the following color types as color value: `CSS variable` (or just their name), `HEX`, `RGB`, `RGBA`, `HSL`, `HSLA` and `OKLCH`.

{% tabs %}
{% tab title="in Config" %}
{% code title="vueless.config.{js,ts}" %}
```javascript
export default {
  lightTheme: {
    "--vl-primary": "--vl-primary-600",                   // css variable name
    "--vl-primary-lifted": "var(--vl-primary-700)",       // css variable
    "--vl-primary-accented": "#0d597f",                   // hex
  },
  darkTheme: {
    "--vl-primary": "rgba(65, 190, 239, 1)",              // rgba
    "--vl-primary-lifted": "hsl(197, 81%, 48%)",          // hsl
    "--vl-primary-accented": "oklch(0.59 0.1273 237.97)", // oklch
  },
};
```
{% endcode %}
{% endtab %}

{% tab title="in CSS" %}
{% code title="main.css" %}
```css
:root {
  --vl-primary: var(--vl-primary-600);                    /* css variable */
  --vl-primary-lifted: var(--vl-primary-700);             /* css variable */
  --vl-primary-accented: #0d597f;                         /* hex */
}

.vl-dark {
  --vl-primary: rgba(65, 190, 239, 1);                    /* rgba */
  --vl-primary-lifted: hsl(197, 81%, 48%);                /* hsl */
  --vl-primary-accented: oklch(0.59 0.1273 237.97);       /* oklch */
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

## Component colors restriction

Some components — such as `UAvatar`, `UButton`, `ULink` ... — include a `color` prop with a predefined list of available colors. To globally customize this list (either by restricting or extending it), use the `colors` configuration key.

{% code title="vueless.config.{js,ts}" %}
```js
export default {
  colors: ["success", "error", "primary"],
}
```
{% endcode %}

## Runtime color switching

If you want to allow users to switch `primary` or `neutral` colors at runtime, define them using the `runtimeColors` configuration key. Vueless automatically safelists CSS variables for all Tailwind color shades to [support this functionality](../helpers/change-settings-in-runtime.md).

{% code title="vueless.config.{js,ts}" %}
```js
export default {
  runtimeColors: ["amber", "rose", "fuchsia", "teal"],
}
```
{% endcode %}
