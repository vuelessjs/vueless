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

There is no limit to the number of compound variants you can define.

{% code title="vueless.config.{js,ts}" %}
```js
export default {
  component: {
    UBadge: {
      badge: {
        base: "border",
        compoundVariants: [
          {
            color: "white", 
            variant: "primary", 
            class: "bg-white text-gray-900" 
          },
          {
            color: "white", 
            variant: "primary", 
            disabled: true, 
            class: "bg-gray-200" 
          },
        ],
      },
    }
  }
};
```
{% endcode %}

{% hint style="info" %}
Notes that the `compoundVariants` key is an array.
{% endhint %}
