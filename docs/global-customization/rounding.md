# Rounding

You can set three sizes of border radiuses globally for all Vueless components.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  roundingSm: 4,
  rounding: 6, /* default -> 8 (pixels) */
  roundingLg: 8,
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

You can set any border-radius value in pixels, but we highly recommend adhering to [Tailwind CSS’s predefined border-radius](https://tailwindcss.com/docs/border-radius) values for consistency.

If you define only the `rounding` value, `roundingSm` and `roundingLg` will be automatically calculated. The expected values are listed in the table below:

| roundingSm | rounding | roundingLg |
| ---------- | -------- | ---------- |
| 0          | 0        | 2          |
| 0          | 2        | 8          |
| 2          | 4        | 10         |
| 4          | 6        | 12         |
| 4          | 8        | 14         |
| 6          | 10       | 16         |
| 8          | 12       | 18         |
| 10         | 14       | 20         |
| 12         | 16       | 22         |

{% hint style="info" %}
In the config, values are specified in `pixels` for simplicity, but they are automatically converted into `rem` under the hood.
{% endhint %}

## Custom tailwind class

To implement global border radius stylings, Vueless provides custom Tailwind CSS classes: `rounded-dynamic-sm`, `rounded-dynamic`, `rounded-dynamic-lg`. Feel free to use these classes in your components whenever you need consistent rounding across your project.

[^1]: 
