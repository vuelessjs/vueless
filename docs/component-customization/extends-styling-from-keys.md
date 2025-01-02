# Extends styling

To minimize code duplication, you can extend classes from another key using the extends notation: `{>keyName}`.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  component: {
    UTable: {
      headerCellBase: "p-4 text-sm ...",
<strong>      headerCellCheckbox: "{>headerCellBase} w-10 ...",
</strong><strong>      stickyHeaderCell: "{>headerCellBase} flex-none ...",
</strong>    }
  }
};
</code></pre>

It can be placed directly within the key or inside the base key.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  component: {
    UTable: {
      headerCellBase: "p-4 text-sm ...",
<strong>      headerCellCheckbox: "{>headerCellBase} w-10 ...",
</strong>      stickyHeaderCell: {
<strong>        base: "{>headerCellBase} flex-none ...",
</strong>        variants: {
          compact: {
            true: "px-4 py-3 ...",
          }
        }
      }
    }
  }
};
</code></pre>

## Multiple extensions

It’s possible to extend multiple keys within a single key, including those that already extends from other keys (nested extends). Classes are automatically will be merged based on the order of the keys, with the last keys taking higher priority.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  component: {
    UTable: {
      headerCellBase: "p-4 text-sm ...",
      headerCellCheckbox: "{>headerCellBase} w-10 ...",
<strong>      stickyHeaderCell: "{>headerCellBase} {>headerCellCheckbox} flex-none ...",
</strong>    }
  }
};
</code></pre>

## Conditional styling extensions

The key you extend can also include conditional styling configurations, such as `variants` and `compoundVariants`. Classes are fully resolved before extension and then merged with the key where the extension is applied.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  component: {
    UTable: {
      headerCellBase: {
        base: "p-4 text-sm ...",
        variants: {
          compact: {
            true: "px-4 py-3 ...",
          },
        },
      },
<strong>      headerCellCheckbox: "{>headerCellBase} w-10 ...",
</strong><strong>      stickyHeaderCell: "{>headerCellBase} flex-none ...",
</strong>    }
  }
};
</code></pre>

## Nested component extensions

The key you extend can also include styling configurations for nested component keys.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  component: {
    UDatepicker: {
      datepickerInput: "", // {UInput}
      datepickerInputActive: {
<strong>        base: "{>datepickerInput}",
</strong>        wrapper: {
          base: "ring-dynamic ring-offset-dynamic ring-brand-700/15 border-brand-500 hover:border-brand-500",
          variants: {
            error: {
              true: "ring-red-700/15 border-red-500 hover:border-red-500",
            },
          },
        },
      },
    }
  }
};
</code></pre>

{% hint style="warning" %}
For this particular case, extension is limited to a single key.
{% endhint %}
