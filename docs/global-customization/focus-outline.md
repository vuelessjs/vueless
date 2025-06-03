# Focus Outline

You can set the focus outline width globally for all Vueless components.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  outline: 4, /* default -> 2 (pixels) */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

If you define only the `outline`  (`medium`) value, `small` and `large` sizes will be automatically calculated. The expected values are listed in the table below:

| small (outline.sm) | medium (outline / outline.md) | large (outline.lg) |
| ------------------ | ----------------------------- | ------------------ |
| 0                  | **0**                         | 0                  |
| 0                  | **1**                         | 2                  |
| 1                  | **2**                         | 3                  |
| 2                  | **3**                         | 4                  |
| 3                  | **4**                         | 5                  |
| 4                  | **5**                         | 6                  |
| 5                  | **6**                         | 7                  |

If you want to use custom values for `small` and `large` outlines, you can define them manually.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  outline: {
    sm: 2,
    md: 4,
    lg: 6,
  }
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

## Custom tailwind class

To implement global focus ring stylings, Vueless provides custom Tailwind CSS classes and corresponding CSS variables. Feel free to use these classes in your components whenever you need consistent rounding across your project.

You can also use the corresponding CSS variables directly:&#x20;

| Custom classes   | CSS variables in a utility class |
| ---------------- | -------------------------------- |
| `outline-small`  | `outline-(--vl-outline-sm)`      |
| `outline-medium` | `outline-(--vl-outline)`         |
| `outline-large`  | `outline-(--vl-outline-lg)`      |

[^1]: 
