# Dark mode

You can specify dark mode globally for all Vueless components.&#x20;

<pre class="language-js" data-title="vueless.config.js"><code class="lang-js">export default {
  darkMode: true, /* default -> undefined */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

**Possible values:**

* `true` - enable dark mode. Add class `vl-dark` to `html` tag.&#x20;
* `false` - disable dark mode. Add class `vl-light` to `html` tag.&#x20;
* `undefined` - keep user system settings for the dark mode (default), add class to the `html` tag related to the user mode.

[^1]: 
