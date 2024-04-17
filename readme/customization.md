# Customisation

## Overview

To customize the look and feel of components change a default configuration in the `vueless.config.js`.

## Colors

### Predefined colors

Components are based on a `brand` and a `gray` color. You can change them in your `vueless.config.js`.

```js
// vueless.config.js

export default {
  brand: "green",
  gray: "zinc",
};
```

As this module uses Tailwind CSS under the hood, 
you can use any of the [Tailwind CSS colors](https://tailwindcss.com/docs/customizing-colors#color-palette-reference) or your own custom colors. 

**By default:**
* the `brand` color is `green`,
* the `gray` color is `zinc`.

### Custom colors

When [using custom colors](https://tailwindcss.com/docs/customizing-colors#using-custom-colors) or [adding additional colors](https://tailwindcss.com/docs/customizing-colors#adding-additional-colors) through the `extend` key in your `tailwind.config.js`, 
you'll need to make sure to define all the shades from `50` to `950` as most of them are used in the package components. 

You can [generate your colors](https://tailwindcss.com/docs/customizing-colors#generating-colors) using tools such as https://uicolors.app for example.

```js
// tailwind.config.js

export default {
  theme: {
    extend: {
      colors: {
        green: {
          50: '#EFFDF5',
          100: '#D9FBE8',
          200: '#B3F5D1',
          300: '#75EDAE',
          400: '#00DC82',
          500: '#00C16A',
          600: '#00A155',
          700: '#007F45',
          800: '#016538',
          900: '#0A5331',
          950: '#052e16'
        }
      }
    }
  }
}
```

### Opacity mode

You can use `mode: "opacity"` to generate all the shades automatically by using `opacity` based on your brand color.

```js
// vueless.config.js

export default {
  brand: "orange",
  gray: "slate",
  mode: "opacity",
};
```

You can set your own brand color in `HEX` format as well.

```js
// vueless.config.js

export default {
  brand: "#00C16A",
  gray: "slate",
  mode: "opacity",
};
```

### Brand CSS Variable

To provide dynamic brand color that can be changed at runtime, this module uses CSS variable.

> We'd advise you to use that color in your components and pages, e.g. `text-brand dark:text-brand`, etc. 
> so your app automatically adapts when changing your `vueless.config.js`.

To change the brand color, you should call this function whatever you need:

```js
import { setBrandColor } from "vueless/service.ui";

// set default brand color
setBrandColor();

// or set brand color from tailwind colors palette
setBrandColor("red");

// or set your own custom brand color
setBrandColor("#00C16A");
```

The `brand` color also has a `DEFAULT` shade that changes based on the theme.
It is `500` in light mode and `400` in dark mode.
You can use it as a shortcut in your components and pages, e.g. `text-brand`, `bg-brand`, `focus-visible:ring-brand`, etc.

> For custom hex color, there is only one shade for dark and light themes.

### Smart Safelisting

Components having a `color` prop like `UAvatar`, `UButton`, `URadioGroup`, `UCheckbox`, `UHeader` etc. 
will use the `brand` or `grayscale` color by default, 
but will handle all the colors defined in your `tailwind.config.ts` or the default Tailwind CSS colors.

Variant classes of those components are defined with a syntax like `bg-{color}-500 dark:bg-{color}-400` so they can be used with any color. 
However, this means that Tailwind will not find those classes and therefore will not generate the corresponding CSS.

The library uses the [Tailwind CSS safelist](https://tailwindcss.com/docs/content-configuration#safelisting-classes) feature 
to force the generation of component colors.

The Vueless will **automatically** detect when you use one of those components with a color and will safelist it for you. 
This means that if you use a `red` color for a UButton component, the `red` color classes will be safelisted for the UButton component only. 
This will allow to keep the CSS bundle size as small as possible.

If you bind a dynamic color to a component: `<UBadge :color="color" />`, `<UButton :color="statuses[button.status]" />`, etc. 
You'll need to safelist the possible color values manually as well.

```js [vueless.config.js]
// vueless.config.js

export default {
  safelistColors: ["orange", "amber", "sky"], // applies for all components
  component: {
    UButton: {
      safelistColors: ["red"], // applies only for UButton
    }
  }
}
```

### Replacing safelist patterns

In some specific cases you can replace safelist config as well:

```js
// vueless.config.js

export default {
  component: {
    UButton: {
      safelist: (colors) => [
        { pattern: `bg-(${colors})-500`, variants: ["hover", "focus", "active"] },
        { pattern: `text-(${colors})-500` },
      ],
    }
  }
};
```

## Components

### `vueless.config.js`

Components are styled with Tailwind CSS but classes are all defined in the default `configs/default.config.js` file 
located in each component folder. You can override those in your own `vueless.config.js`.

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

Thanks to [tailwind-merge](https://github.com/dcastil/tailwind-merge), the `vueless.config.js` is smartly merged with the default config. 
This means you don't have to rewrite everything.

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

### `config` prop

Each component has a `config` prop that allows you to customize everything specifically.

```jsx
<template>
  <UButton :config="{ button: { base: 'max-w-2xl' } }">
    <slot />
  </UButton>
</template>
```

> You can find the default classes for each component under the `Config` section.

Thanks to [tailwind-merge](https://github.com/dcastil/tailwind-merge), the `config` prop is smartly merged with the config. 
This means you don't have to rewrite everything.

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

### `class` attribute

You can also use the `class` attribute to add classes to the component.

```vue
<template>
  <UButton label="Button" class="font-bold" />
</template>
```

Again, with [tailwind-merge](https://github.com/dcastil/tailwind-merge), this will smartly merge the classes with the `config` prop and the global and default configs.

### Default values

Some component props like `size`, `color`, `variant`, etc. have a default value that you can override in your `vueless.config.js` 
or by the `config` prop as well.

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

## Icons

The library supports three popular icon libraries:
* `@material-symbols/svg-{weight}`, where {weight} is number from 100 to 700 (`@material-symbols/svg-500` is default). 
* `bootstrap-icons`
* `heroicons`

> The package works only with SVG icons.

### Icons safelist colors

If you set some icon names dynamically in `UIcon` component, then them may be skipped on a build stage.
To avoid this behavior and include the icons in the build, you can add them into a safelist.

```js
// vueless.config.js

export default {
  component: {
    UIcon: {
      safelistIcons: ["1k", "2d", "close"],
    }
  }
};
```

> In this case, the regular and filled icon variants will be added into the build.
