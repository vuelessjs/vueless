# General

To customize the look and feel of Vueless and modify the default library configuration, use the `vueless.config.{js,ts}` file, which should be placed in the root folder of your project.

***

## Colors

Components are based on a `brand` color and `gray` color.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  brand: "blue",
  gray: "stone",
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

Vueless uses Tailwind CSS under the hood, so you can use any of the [Tailwind CSS colors](https://tailwindcss.com/docs/customizing-colors#color-palette-reference) or your own custom colors. See [Colors](colors.md) chapter for more details.

***

## Rounding

You can set the border-radiuses globally for all Vueless components.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  roundingSm: 4, /* px */
  rounding: 6,   /* px */
  roundingLg: 8, /* px */
}<a data-footnote-ref href="#user-content-fn-2">;</a>
</code></pre>

See [Rounding](rounding.md) chapter for more details.

***

## Focus Outline

You can set the focus outline width globally for all Vueless components.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  outlineSm: 2, /* px */
  outline: 4, /* px */
  outlineLg: 6, /* px */
}<a data-footnote-ref href="#user-content-fn-3">;</a>
</code></pre>

See [Focus Outline](general.md#focus-outline) chapter for more details.

***

## Dark mode

You can set the dark mode globally for all Vueless components.&#x20;

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  colorMode: "dark", /* dark | light | auto */
}<a data-footnote-ref href="#user-content-fn-4">;</a>
</code></pre>

See [Dark mode](dark-mode.md) chapter for more details.



[^1]: 

[^2]: 

[^3]: 

[^4]: 
