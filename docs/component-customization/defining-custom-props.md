# Defining custom props

If existing props don’t support the conditional styling you need, you can add custom props and use them in `variants` or `compoundVariants` as needed.

{% code title="vueless.config.{js,ts}" %}
```js
export default {
  component: {
    UButton: {
      props: {
        /* 
         * Boolean prop example.
         */
        featured: {
          type: "boolean",
          required: false,
          description: "Set button featured." 
        },
        
        /* 
         * Enum (string) prop example.
         */
        shape: {
          type: "string",
          values: ["circle", "parallelogram", "square"],
          default: "square",
          required: true,
          description: "Set button shape."
        }
      }
    }
  }
};
```
{% endcode %}

### Prop settings

<table><thead><tr><th width="138.55859375">key</th><th width="145.4765625">default</th><th>Description</th></tr></thead><tbody><tr><td>type</td><td>"string"</td><td>Supported values: "string", "number", "boolean".</td></tr><tr><td>values</td><td>[]</td><td>Limits possible prop values (union type in TS).</td></tr><tr><td>default</td><td>""</td><td>Defines default value.</td></tr><tr><td>required</td><td>false</td><td>Makes props required.</td></tr><tr><td>description</td><td>""</td><td>Adds props description in Storybook docs.</td></tr><tr><td>ignore</td><td>false</td><td>Hides prop in Storybook docs.</td></tr></tbody></table>

{% hint style="info" %}
All key are optional.
{% endhint %}
