# Rounding

You can specify rounding (border-radius) globally for all Vueless components.&#x20;

<pre class="language-js" data-title="vueless.config.js"><code class="lang-js">export default {
  roundingSm: 2, /* default -> 4 (pixels) */
  rounding: 6, /* default -> 8 (pixels) */
  roundingLg: 8, /* default -> 16 (pixels) */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

It may be possible to set any value in pixels but we highly recommend stick to the [Tailwind CSS border-radius](https://tailwindcss.com/docs/border-radius) values.

{% hint style="info" %}
We use `pixels` measurement unit in config to make the setting more straightforward for developers, but under the hood the value is always converted into `rem`.
{% endhint %}

## Custom tailwind class

To implement dynamic rounding, custom Tailwind CSS classes `rounded-dynamic-sm, rounded-dynamic, rounded-dynamic-lg` have been created . So, feel free to add them into your components when you need to have same rounding somewhere in your project.

[^1]: 
