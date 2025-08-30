# Letter Spacing

You can set global letter spacing that will be inherited by all text content.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  letterSpacing: 0.025, /* default -> 0 (em) */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

You can set any letter-spacing value in `em` units. We recommend using values between `-0.05em` and `0.1em` for optimal readability.

## Custom CSS variable

To implement letter spacing stylings, Vueless provides custom CSS variable, which applies directly to the `body` element. Feel free to use it in your components whenever you need consistent letter spacing across your project (if letter spacing for body will be overridden).

The variable:  `--vl-letter-spacing`

[^1]: 
