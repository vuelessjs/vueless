# Defining custom props

If existing props don’t support the conditional styling you need, you can add custom props and use them in `variants` or `compoundVariants` as needed.

{% code title="vueless.config.{js,ts}" %}
```js
export default {
  component: {
    UButton: {
      props: [
        /* 
         * Boolean prop example.
         */
        {
          name: "featured",
          type: "boolean",
          required: false,
          description: "Set button featured." 
        },
        
        /* 
         * Enum (string) prop example.
         */
        {
          name: "shape",
          type: "string",
          values: ["circle", "parallelogram", "square"],
          required: true,
          description: "Set button shape." 
        }
      }
    }
  }
};
```
{% endcode %}

{% hint style="info" %}
The `name` and `type` keys are required; all other keys are optional.
{% endhint %}

