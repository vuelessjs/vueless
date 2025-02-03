# Base Classes

You can define a list of classes that will be applied to all Vueless components. This can be useful for adjusting text color based on light and dark themes, customizing text selection color, etc..

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  baseClasses: `
    text-gray-800 dark:text-gray-200
    selection:bg-brand-300 dark:selection:bg-brand-700
  `,
}<a data-footnote-ref href="#user-content-fn-1">;</a>

// Default Vueless base classes:
// text-gray-900 dark:text-gray-100
</code></pre>

[^1]: 
