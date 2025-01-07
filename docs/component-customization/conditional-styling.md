# Conditional styling

To apply styles conditionally, you can use the `base`, `variants` and `compoundVariants` keys inside the corresponding component’s config element key.

## Base

Allows you to apply classes consistently, reducing code duplication in `variants` and `compoundVariants`.

## Variants

Allows you to conditionally apply classes based on **individual** prop values. There is no limit to the number of variants you can define.

{% code title="vueless.config.{js,ts}" %}
```js
export default {
  component: {
    UBadge: {
      badge: {
        /* base classes */
        base: "border",
        variants: {
          /* string variant */
          size: {
            sm: "px-2 text-2xs",
            md: "px-2.5 text-xs",
            lg: "px-3 text-sm",
          },
          /* boolean variant */
          round: {
            true: "rounded-full",
            false: "rounded-dynamic",
          },
        },
      },
    }
  }
};
```
{% endcode %}

## Compound Variants

Sometimes you might want to add a variant that depends on another variant. For example, you might want to add a `color` variant that depends on the `disabled` variant. This is possible by using the `compoundVariants` key.

There is no limit to the number of compound variants and props inside you can define.

{% code title="vueless.config.{js,ts}" %}
```js
export default {
  component: {
    UBadge: {
      badge: {
        base: "border",
        compoundVariants: [
          /* 
           * Regular compound variant.
           */
          {
            color: "white", 
            variant: "primary", 
            class: "bg-white text-gray-900",
          },

          /* 
           * Compound variant with boolean value.
           */  
          {
            color: "white", 
            variant: "primary", 
            disabled: true, 
            class: "bg-gray-200 text-gray-600",
          },
          
          /* 
           * Grouped compound variant.
           * Applies classes for both "white" and "grayscale" color values.
           */
          {
            color: ["white", "grayscale"], 
            variant: "primary", 
            class: "ring-gray-700",
          },
        ],
      },
    }
  }
};
```
{% endcode %}

{% hint style="info" %}
Note that the `compoundVariants` key always is an **array** of objects.
{% endhint %}
