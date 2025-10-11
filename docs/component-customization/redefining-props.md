# Redefining props

Sometimes, you might need to limit possible prop values, add new ones, or hide certain props in Storybook documentation. To achieve this, you can redefine prop settings using the `props` key in the component’s config.

{% code title="vueless.config.{js,ts}" %}
```js
export default {
  component: {
    UButton: {
      props: {
        /* 
         * Restrict color values to a provided list of items.
         * Use this to align the prop entirely with the design system.
         */
        color: {
          values: ["blue", "green", "yellow", "brand"],
        },

        /* 
         * Add a new, previously non-existent value, `liquid-glass`.
         * Use this to fully align the prop with the design system.
         * For examle, if the design system includes variant not present in Vueless.
         */
        variant: { 
          values: ["solid", "outline", "subtle", "soft", "ghost", "liquid-glass"],
        },
         
        /* 
         * Hide the prop in Storybook.
         * For example, if the design system lacks related styles
         * and the prop serves no purpose.
         */
        filled: {
          ignore: true,
        }
      }
    }
  }
};
```
{% endcode %}

