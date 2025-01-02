# Rounding

You can specify three sizes of border radiuses globally for all Vueless components.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  roundingSm: 2, /* default -> 4 (pixels) */
  rounding: 6, /* default -> 8 (pixels) */
  roundingLg: 8, /* default -> 16 (pixels) */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

You can set any border-radius value in pixels, but we highly recommend adhering to [Tailwind CSS’s predefined border-radius](https://tailwindcss.com/docs/border-radius) values for consistency.

{% hint style="info" %}
In the config, values are specified in `pixels` for simplicity, but they are automatically converted into `rem` under the hood.
{% endhint %}

## Custom tailwind class

To implement global border radius stylings, custom Tailwind CSS classes `rounded-dynamic-sm`, `rounded-dynamic`, `rounded-dynamic-lg` have been created. Feel free to use these classes in your components whenever you need consistent rounding across your project.

[^1]: 
