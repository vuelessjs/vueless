# Rounding

You can set three sizes of border radiuses globally for all Vueless components.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  rounding: 6, /* default -> 8 (pixels) */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

You can set any border-radius value in pixels, but we highly recommend adhering to [Tailwind CSS’s predefined border-radius](https://tailwindcss.com/docs/border-radius) values for consistency.

If you define only the `rounding` (`medium`) value, `small` and `large` sizes will be automatically calculated. The expected values are listed in the table below:

| small (rounding.sm) | medium (rounding / rounding.md) | large (rounding.lg) |
| ------------------- | ------------------------------- | ------------------- |
| 0                   | **0**                           | 2                   |
| 0                   | **2**                           | 8                   |
| 2                   | **4**                           | 10                  |
| 4                   | **6**                           | 12                  |
| 4                   | **8**                           | 14                  |
| 6                   | 1**0**                          | 16                  |
| 8                   | **12**                          | 18                  |
| 10                  | 1**4**                          | 20                  |
| 12                  | **16**                          | 22                  |

{% hint style="info" %}
In the config, values are specified in `pixels` for simplicity, but they are automatically converted into `rem` under the hood.
{% endhint %}

If you want to use custom values for `small` and `large` roundings, you can define them manually.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  rounding: {
    sm: 5,
    md: 6,
    lg: 7,
  }
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

## Custom tailwind class

To implement global border radius stylings, Vueless provides custom Tailwind CSS classes and corresponding CSS variables. Feel free to use these classes in your components whenever you need consistent rounding across your project.

You can also use the corresponding CSS variables directly:&#x20;

| Custom classes   | CSS variables in a utility class |
| ---------------- | -------------------------------- |
| `rounded-small`  | `rounded-(--vl-rounding-sm)`     |
| `rounded-medium` | `rounded-(--vl-rounding)`        |
| `rounded-large`  | `rounded-(--vl-rounding-lg)`     |

[^1]: 
