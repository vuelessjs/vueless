# General

To customize the look and feel of Vueless and modify the default library configuration, use the `vueless.config.{js,ts}` file, which should be placed in the root of your project.

***

## Colors

Components are based on a `primary` color and `neutral` color.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  primary: "blue",
  neutral: "stone",
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

Vueless uses Tailwind CSS under the hood, so you can use any of the [Tailwind CSS colors](https://tailwindcss.com/docs/customizing-colors#color-palette-reference) or your own custom colors. See [Colors](colors.md) chapter for more details.

***

## Rounding

Use the `rounding` key to simultaneously apply a border radius to all components.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  rounding: 6, /* px */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

See [Rounding](rounding.md) chapter for more details.

***

## Focus Outline

Use the `outline` key to simultaneously apply a focus outline ring to all components.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  outline: 4, /* px */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

See [Focus Outline](general.md#focus-outline) chapter for more details.

***

## Font Size

Use the `fontSize` key to simultaneously apply a font size to all components.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  fontSize: 16, /* px */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

See [Font Size](font-size.md) chapter for more details.

***

## Letter Spacing

Use the `letterSpacing` key to simultaneously apply letter spacing to all components.

{% code title="vueless.config.{js,ts}" %}
```js
export default {
  letterSpacing: 0.025, /* em */
};
```
{% endcode %}

See [Letter Spacing](letter-spacing.md) chapter for more details.

## Disabled Opacity

You can set the components disabled state opacity globally for related Vueless components.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  disabledOpacity: 40, /* percent, % */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

See [Disabled Opacity ](disabled-opacity.md)chapter for more details.

***

## Dark mode

Use the `colorMode` key to define dark / light modes for all components.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  colorMode: "dark", /* dark | light | auto */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

See [Dark mode](dark-mode.md) chapter for more details.

***

## Cookie Prefix

Theme values are stored in cookies for SSR. Browsers scope cookies by host but not by port, so apps served from the same host (for example, several apps on `localhost`) would share them. To keep them separate, Vueless prefixes theme cookie names with your `package.json` name (`@acme/back-office` becomes `acme-back-office-vl-color-mode`). No configuration is needed.

Use the `cookiePrefix` key to override the prefix, or set it to an empty string to disable prefixing.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  cookiePrefix: "app-a",
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

Local storage keys are never prefixed, because local storage is already separate per origin. On the client Vueless reads theme values from local storage; the cookies exist so SSR apps can read them and pass them to `getTheme()`.



[^1]: 
