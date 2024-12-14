# Components

As you may already know the Vueless components are styled with [Tailwind CSS](https://tailwindcss.com/). All default component classes which appies to each HTML tag available in [Vueless UI docs](https://ui.vueless.com/) in **`Default config`** chapter (at the end of each page).

You can change the default classes of Vueless components in 3 ways:

* Globally in `vueless.config.js`,
* Locally by component `config` prop,
* Locally by component `class` attribute.

## Classes smart merging

Thanks to [tailwind-merge](https://github.com/dcastil/tailwind-merge), all those configs are smartly merged with the default config. This means you don't have to rewrite everything.

### **Merging priority**

* Component `class` attribute (highest priority)
* Component `config` prop
* Global `vueless.config.js`
* Component default config (lowest priority)

## CVA

For managing classes variants Vueless components use [cva](https://github.com/joe-bell/cva) (Class Variance Authority) under the hood. For more details you can read related [cva docs](https://cva.style/docs/getting-started/variants).

***

## Vueless config

Some examples of changing classes for a Vueless components globally.

{% code title="vueless.config.js" %}
```js
export default {
  component: {
    /* simplified way of stiling (base classes) */
    UButton: {
      button: "bg-red-500 w-full",
      text: "px-4 text-lg font-bold"
    },
    /* full way of stiling with variants */
    UCard: {
      wrapper: {
        base: "border-gray-300",
        variants: {
          rounded: {
            sm: "rounded-sm",
            md: "rounded",
            lg: "rounded-md",
          },
          padding: {
            sm: "p-2 md:p-6",
            md: "p-4 md:p-8",
            lg: "p-6 md:p-10",
          },
        },
      },
    }
    /* full way of stiling with compoundVariants */
    ULabel: {
      label: {
        base: "font-bold",
        compoundVariants: [
          { placement: "top", size: "sm", class: "m-0 p-0 text-sm" },
          { placement: "top", size: "md", class: "m-0 p-0 text-base" },
          { placement: "top", size: "lg", class: "m-0 p-0 text-lg" },
        ],
      },
    }
    /* setting default props */
    UMoney: {
      defaults: {
        decimalSeparator: ".",
        symbolAlign: "left",
        divided: false,
      },
    }
  }
};
```
{% endcode %}

## Config prop

Each component has a `config` prop that allows to customize everything specifically.

```jsx
<template>
  <UButton :config="{ button: 'max-w-2xl' }">
    <slot />
  </UButton>
</template>
```

For example, the default preset of the `UEmpty` component looks like this:

```js
{
  wrapper: "flex flex-col items-center w-full bg-center",
  header: "mb-4 flex justify-center",
  footer: "mt-4 flex justify-center",
  title: {
    base: "mb-2 font-medium text-center",
    variants: {
      size: {
        sm: "text-base",
        md: "text-lg",
        lg: "text-xl",
      },
    },
  },
  description: {
    base: "text-center",
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
  },
  defaults: {
    size: "md",
  },
}
```

To change the font weight of the `title`, you only need to write:

```jsx
<UEmpty 
  title="The list is empty"
  :config="{ title: 'font-bold' }" 
/>
```

This will smartly replace the `font-medium` by `font-bold` and prevent any class duplication and any class priority issue.

## Class attribute

You can also use the `class` attribute to add classes to the component.

```html
<template>
  <UButton label="Button" class="font-bold" />
</template>
```

In this case classes will be applied to the top level component's HTML tag.

***

## Merging strategy

You can change a merge behaviour by changing the `strategy` key in the `vueless.config.js` or `config` prop:

* `merge` (default) – smartly merge provided custom classes with default config classes.
* `replace` – replace default config keys by provided custom keys (override only provided keys, the rest classes will be taken from the default config).
* `override` – override default config by provided custom config (keeps only custom config, removes all default classes).

{% code title="vueless.config.js" %}
```js
export default {
  strategy: "override", // applies for all components
  component: {
    UButton: {
      strategy: "merge", // applies only for UButton
      button: {
        base: "bg-red-500 w-full",
      }
    }
  }
};
```
{% endcode %}

## Custom tailwind classes and merge

If you are going to use custom tailwind classes for styling Vueless components, first you need to add them into `tailwindMerge` config. See: [All list of properties.](https://github.com/dcastil/tailwind-merge/blob/v2.3.0/src/lib/default-config.ts)

{% code title="vueless.config.js" %}
```js
export default {
  tailwindMerge: {
    extend: {
      theme: {
        classGroups: {
          "ring-w": [{ ring: ["brand"] }],
          "font-size": [{ text: ["2xs"] }],
        }
      }
    }
  }
};
```
{% endcode %}

***

## Default values

Some component props like `size`, `color`, `variant`, etc. have a default value that you can override in your `vueless.config.js` or by the `config` prop as well.

{% code title="vueless.config.js" %}
```js
export default {
  component: {
    UButton: {
      defaults: {
        size: "lg",
        color: "red",
        variant: "secondary"
      }
    }
  }
};
```
{% endcode %}
