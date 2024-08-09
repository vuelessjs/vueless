# Rounding

You can specify rounding (border-radius) globally for all Vueless components.&#x20;

<pre class="language-js" data-title="vueless.config.js"><code class="lang-js">export default {
  rounding: 6, /* default -> 8 (pixels) */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

It may be possible to set any of value in pixels but we highly recommend stick to the [Tailwind CSS border-radius](https://tailwindcss.com/docs/border-radius) values.

{% hint style="info" %}
We use `pixels` measurement unit in config to make the setting more straightforward for developers, but under the hood the value always converts into `rem`.
{% endhint %}

## Custom tailwind class

To implement dynamic rounding has been created custom Tailwind CSS class `rounded-dynamic`. So, feel free to add it into you components when you need to have same rounding somewhere in your project.

[^1]: 
