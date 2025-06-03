# Disabled Opacity

You can set the components disabled state opacity globally for related Vueless components.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  disabledOpacity: 40, /* default -> 50 (persents, %) */
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

## Custom CSS variable

To implement global disabled state opacity stylings, Vueless provides custom CSS variable. Feel free to use it in your components whenever you need consistent opacity for disabled state across your project.

The variable: `--vl-disabled-opacity`

[^1]: 
