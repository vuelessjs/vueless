# Ring

You can specify ring width and ring offset width globally for all Vueless components.&#x20;

<pre class="language-js" data-title="vueless.config.js"><code class="lang-js">export default {
  ring: 6, /* default -> 4 (pixels) */
  ringOffset: 4, /* default -> 0 (pixels) */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

It may be possible to set any of value in pixels but we highly recommend stick to the Tailwind CSS [ring width](https://tailwindcss.com/docs/ring-width) and [ring offset width](https://tailwindcss.com/docs/ring-offset-width) values.

## Custom tailwind classes

To implement dynamic ring styling has been created custom Tailwind CSS class `ring-dynamic` and `ring-offset-dynamic`. So, feel free to add it into you components when you need to have same ring styling somewhere in your project.

[^1]: 
