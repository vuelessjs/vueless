# Dark mode

You can specify dark mode globally for all Vueless components.&#x20;

<pre class="language-js" data-title="vueless.config.js"><code class="lang-js">export default {
  colorMode: "dark", /* default -> auto */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

**Possible values:**

* `dark` - enable dark mode. Add class `vl-dark` to `html` tag.&#x20;
* `light` - disable dark mode. Add class `vl-light` to `html` tag.&#x20;
* `auto` - keep user system settings for the dark mode (default), add class to the `html` tag related to the user mode.

[^1]: 
