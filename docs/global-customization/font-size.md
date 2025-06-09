# Font Size

You can set the components font size globally for all Vueless components.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  text: 16, /* default -> 14 (pixels) */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

If you define only the `text`  (`medium`) value, `tiny`, `small` and `large` sizes will be automatically calculated. The expected values are listed in the table below:

| tiny (text.xs) | small (text.sm) | medium (text / text.md) | large (text.lg) |
| -------------- | --------------- | ----------------------- | --------------- |
| 8              | 10              | **12**                  | 14              |
| 9              | 11              | **13**                  | 15              |
| 10             | 12              | **14**                  | 16              |
| 11             | 13              | **15**                  | 17              |
| 12             | 14              | **16**                  | 18              |

If you want to use custom values for `tiny`, `small` and `large` font-sizes, you can define them manually.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  text: {
    xs: 12,
    sm: 13,
    md: 14,
    lg: 15,
  }
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

## Custom tailwind class

To implement global font size stylings, Vueless provides custom Tailwind CSS classes and corresponding CSS variables. Feel free to use these classes in your components whenever you need consistent rounding across your project.

You can also use the corresponding CSS variables directly:&#x20;

| Custom classes | CSS variables in a utility class |
| -------------- | -------------------------------- |
| `text-tiny`    | `text-(--vl-text-xs)`            |
| `text-small`   | `text-(--vl-text-sm)`            |
| `text-medium`  | `text-(--vl-text)`               |
| `text-large`   | `text-(--vl-text-lg)`            |

[^1]: 
