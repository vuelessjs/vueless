# Focus Outline

You can set the focus outline width globally for all Vueless components.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  outlineSm: 2,
  outline: 4, /* default -> 2 (pixels) */
  outlineLg: 6,
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

For `outline`, `c` and `outlineLg` you can use any value in pixels.

If you define only the `outline` value, `outlineSm` and `outlineLg` will be automatically calculated. The expected values are listed in the table below:

| outlineLg | outline | outlineLg |
| --------- | ------- | --------- |
| 0         | **0**   | 0         |
| 0         | **1**   | 2         |
| 1         | **2**   | 3         |
| 2         | **3**   | 4         |
| 3         | **4**   | 5         |
| 4         | **5**   | 6         |
| 5         | **6**   | 7         |

## Custom tailwind classes

To implement global ring styling, Vueless provides custom Tailwind CSS classes: `outline-dynamic`, `outline-dynamic-sm` and `outline-dynamic-lg`. Feel free to use these classes in your components whenever you need consistent ring styling throughout your project.

## CSS variables

You can also use the corresponding CSS variables directly:&#x20;

* `--vl-outline`, &#x20;
* `--vl-outline-sm`, &#x20;
* `--vl-outline-lg`.

[^1]: 
