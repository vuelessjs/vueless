# Ring

You can specify the ring width, ring offset width and ring offset dark and light colors globally for all Vueless components.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  ring: 6, /* default -> 4 (pixels) */
  ringOffset: 4, /* default -> 0 (pixels) */
  /* offset colors */
  ringOffsetColorLight: "#ffffff", /* default -> white */
  ringOffsetColorDark: "#111827",  /* default -> gray-900 */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

For `ring` and `ringOffset`, you can use any value in pixels; however, we highly recommend sticking to the predefined Tailwind CSS [ring width](https://tailwindcss.com/docs/ring-width) and  [ring offset width](https://tailwindcss.com/docs/ring-offset-width) values for consistency.

## Custom tailwind classes

To implement global ring styling, custom Tailwind CSS classes `ring-dynamic`,  `ring-offset-dynamic` and `ring-offset-color-dynamic` have been created. Feel free to use these classes in your components whenever you need consistent ring styling throughout your project.

[^1]: 
