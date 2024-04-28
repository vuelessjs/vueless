# Components

#### `vueless.config.js`

Components are styled with Tailwind CSS but classes are all defined in the default `configs/default.config.js` file located in each component folder. You can override those in your own `vueless.config.js`.

```js
// vueless.config.js

export default {
  component: {
    UButton: {
      button: {
        base: "bg-red-500 w-full",
      }
    }
  }
};
```

Thanks to [tailwind-merge](https://github.com/dcastil/tailwind-merge), the `vueless.config.js` is smartly merged with the default config. This means you don't have to rewrite everything.

You can change this behavior by changing `strategy` in your `vueless.config.js` to:

* `override` – override default config by custom defined config (keeps only custom config and remove everything else).
* `replace` – replace default config keys by custom defined config keys, (the rest classes takes from the default config).
* `merge` – smartly merge custom defined classes with default config classes (default strategy).

```js
// vueless.config.js

export default {
  strategy: 'override',
  component: {
    UButton: {
      button: {
        base: "bg-red-500 w-full",
      }
    }
  }
};
```

#### `config` prop

Each component has a `config` prop that allows you to customize everything specifically.

```jsx
<template>
  <UButton :config="{ button: { base: 'max-w-2xl' } }">
    <slot />
  </UButton>
</template>
```

> You can find the default classes for each component under the `Config` section.

Thanks to [tailwind-merge](https://github.com/dcastil/tailwind-merge), the `config` prop is smartly merged with the config. This means you don't have to rewrite everything.

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
  defaultVariants: {
    size: "md",
  },
}
```

To change the font of the `title`, you only need to write:

```jsx
<UEmpty 
  title="The list is empty" 
  :config="{ title: { base: 'font-bold' } }" 
/>
```

This will smartly replace the `font-medium` by `font-bold` and prevent any class duplication and any class priority issue.

You can change this behavior by setting `strategy` to `replace` or `override` inside the `config` prop:

```jsx
<UButton
  label="Submmit"
  :config="{
    strategy: 'replace',
    color: {
      white: {
        solid: 'bg-white dark:bg-gray-900'
      }
    }
  }"
/>
```

#### `class` attribute

You can also use the `class` attribute to add classes to the component.

```vue
<template>
  <UButton label="Button" class="font-bold" />
</template>
```

Again, with [tailwind-merge](https://github.com/dcastil/tailwind-merge), this will smartly merge the classes with the `config` prop and the global and default configs.

#### Default values

Some component props like `size`, `color`, `variant`, etc. have a default value that you can override in your `vueless.config.js` or by the `config` prop as well.

```js
// vueless.config.js

export default {
  component: {
    UButton: {
      defaultVariants: {
        size: "lg",
        color: "red",
        variant: "secondary"
      }
    }
  }
};
```
