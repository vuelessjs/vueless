# Dark mode

You can specify the dark mode globally for all Vueless components.&#x20;

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  colorMode: "dark", /* default -> auto */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

### Possible color mode values:

* `dark`: Enables dark mode. Adds the class `vl-dark` to the `<html>` tag.
* `light`: Disables dark mode. Adds the class `vl-light` to the `<html>` tag.
* `auto` (default): Adapts to the user’s system settings for dark mode. Automatically adds the appropriate class (`vl-dark` or `vl-light`) to the `<html>` tag based on the user’s preference.

[^1]: 
