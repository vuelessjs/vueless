# Props defaults

Component props such as `size`, `color`, `variant`, etc., have default values that can be overridden in the project `vueless.config.{js,ts}`.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  component: {
    UButton: {
<strong>      defaults: {
</strong><strong>        size: "lg",
</strong><strong>        color: "red",
</strong><strong>        variant: "secondary"
</strong><strong>      }
</strong>    }
  }
};
</code></pre>

## Nested component defaults

The `config` prop can also be used to redefine default prop values. In practice, this is useful for changing default values of nested components.

<pre class="language-html"><code class="lang-html">&#x3C;UPagination 
  label="Submit" 
  :config="{ 
    activeButton: {
<strong>      defaults: { 
</strong><strong>        size: 'xl', 
</strong><strong>        color: 'blue'
</strong><strong>      } 
</strong>    }
  }"
/>
</code></pre>

In the example above, we redefine the default values for the nested `UButton` component within the parent `UPagination` component.

## Conditional default values

If you need to set default values for nested components based on the parent component’s prop value, you can use an object with mapped values.

<pre class="language-js" data-title="vueless.config.{js,ts}"><code class="lang-js">export default {
  component: {
    UDropdownButton: {
      dropdownList: {
        defaults: {
<strong>          size: {
</strong><strong>            "2xs": "sm",
</strong><strong>            xs: "sm",
</strong><strong>            sm: "sm",
</strong><strong>            md: "md",
</strong><strong>            lg: "lg",
</strong><strong>            xl: "lg",
</strong><strong>          }
</strong>        }
      }
    }
  }
};
</code></pre>

This will conditionally set the size for the `UDropdownList` component based on the size value of the `UDropdownButton` component.&#x20;

For example, if the UDropdownButton’s size prop is set to `"2xs"`, the UDropdownList component will automatically receive a size value of `"sm"`.
