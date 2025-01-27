# Ring

You can set the ring width, ring offset width and ring offset dark and light colors globally for all Vueless components.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  ring: 4, /* default -> 2 (pixels) */
  ringOffsetColorLight: "#ffffff", /* default -> white */
  ringOffsetColorDark: "#111827",  /* default -> gray-900 */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

For `ring`, you can use any value in pixels; however, we highly recommend sticking to the predefined Tailwind CSS [ring width](https://tailwindcss.com/docs/ring-width) values for consistency.

## Custom tailwind classes

To implement global ring styling, Vueless provides custom Tailwind CSS classes: `ring-dynamic`,  and `ring-offset-color-dynamic`. Feel free to use these classes in your components whenever you need consistent ring styling throughout your project.

[^1]: 
