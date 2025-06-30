# Vueless UI Guidelines for AI Coding Agents

## Introduction

Vueless UI is a Vue.js component library built with TypeScript and Tailwind CSS that follows a specific architecture pattern. This guide explains how Vueless UI components work and provides guidelines for AI coding agents on how to create new components or modify existing ones correctly.

## Architecture Overview

Vueless UI is built on the following core concepts:

1. **Component-based architecture** - Each UI element is a self-contained component
2. **Consistent file structure** - All components follow the same file organization pattern
3. **Customizable styling system** - Uses Tailwind CSS with a structured configuration approach
4. **Type safety** - Built with TypeScript for robust type checking
5. **Composable behavior** - Leverages Vue's composition API

## Component File Structure

All Vueless components follow this standardized file structure:

```
U[component]/
├─ storybook/
│  ├─ docs.mdx          # Component documentation in MDX format
│  └─ stories.ts        # Storybook stories for component visualization
├─ tests/
│  ├─ U[component].test.ts     # Component tests following the component name
│  ├─ util[service].test.ts    # Utility services tests following the utility name
│  └─ use[composable].test.ts  # Composable tests following the composable name
├─ config.ts           # Styling configuration and default settings
├─ constants.ts        # Component constants
├─ types.ts            # TypeScript types and props interface
├─ U[component].vue    # Main component file
├─ U[component][child].vue # Optional child components
├─ use[composable].ts  # Optional component-specific composables
├─ util[service].ts    # Optional component-specific utility functions
```

### Key Files Explained

- **config.ts**: Contains styling configuration, default prop values, and component settings
- **constants.ts**: Component constants and identifiers
- **types.ts**: TypeScript types and props declaration
- **U[component].vue**: The main component file
- **U[component][child].vue**: Child components (if needed)
- **tests/U[component].test.ts**: Component test file that follows the naming convention of the component with .test.ts suffix

## Component Anatomy

Each Vueless component follows a consistent internal structure with these key elements:

### 1. Script Setup with inheritAttrs Disabled

All components disable attribute inheritance to control attribute distribution:

```typescript
defineOptions({ inheritAttrs: false });
```

### 2. Props Declaration with Defaults

Components use TypeScript to define strongly-typed props with defaults from config:

```typescript
import { getDefaults } from "../utils/ui.ts";
import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";
import type { Props, Config } from "./types.ts";

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});
```

### 3. useUI Composable for Styling and Attributes

The useUI composable handles styling, attribute management, and class generation:

```typescript
import useUI from "../composables/useUI.ts";

const mutatedProps = computed(() => ({
  // Computed properties based on props or slots
}));

const { getDataTest, elementAttrs } = useUI<Config>(defaultConfig, mutatedProps);
```

## Styling System

Vueless uses a layered styling approach that provides multiple levels of customization:

### Customization Layers

1. **Base component styling**: Defined in the component's `config.ts` file
2. **Global customization**: Applied via the `vueless.config.{js,ts}` file
3. **Per-instance customization**: Applied via the `:config` prop
4. **Direct class application**: Applied via the standard `class` attribute

### Class Variance Authority (CVA)

The styling system uses [CVA](https://beta.cva.style) to conditionally apply Tailwind classes based on props. Each component's config contains:

- **Base classes**: Applied to all instances of the component
- **Variants**: Classes applied based on specific prop values (size, variant, color, etc.)
- **Compound variants**: Classes applied based on specific combinations of prop values

## Creating New Components

When creating a new Vueless component, follow this structured approach:

### Development Steps

1. **Create the proper file structure**: Set up all necessary files as outlined above
2. **Define the component interface**: Start with the `types.ts` file to define the Props interface
3. **Configure styling**: Create the `config.ts` file with default styling using Tailwind classes
4. **Define constants**: Add component identifiers and constants in `constants.ts`
5. **Implement the component**: Create the main component in `U[ComponentName].vue`
6. **Add documentation**: Create Storybook stories and documentation

### Implementation Example

1. Define Props in types.ts:
```typescript
import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Primary content or label
   */
  label?: string;

  /**
   * Component variant
   */
  variant?: "solid" | "outlined" | "subtle" | "soft";

  /**
   * Component size
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Component config object
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing
   */
  dataTest?: string | null;
}
```

2. Create config.ts with styling:
```typescript
export default {
  wrapper: {
    base: "relative flex items-center",
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
      variant: {
        solid: "bg-primary-500 text-white",
        outlined: "border border-primary-500 text-primary-500",
        subtle: "bg-primary-50 text-primary-500",
        soft: "bg-primary-100 text-primary-700",
      },
    },
  },
  // Additional elements as needed
};
```

3. Create the component in U[ComponentName].vue:
```vue
<script setup lang="ts">
import { computed } from "vue";
import useUI from "../composables/useUI.ts";
import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";
import { getDefaults } from "../utils/ui.ts";
import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  variant: "solid",
  size: "md",
});

const { wrapperAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="getDataTest()">
    <slot>
      {{ props.label }}
    </slot>
  </div>
</template>
```

## Modifying Existing Components

When modifying existing Vueless components, follow these best practices:

### General Guidelines

1. **Analyze component structure**: Understand the component's architecture before making changes
2. **Preserve architectural patterns**: Maintain the useUI pattern for styling and attributes
3. **Ensure type safety**: Update the Props interface in types.ts when adding or modifying props
4. **Update documentation**: Add appropriate documentation for new props or behavior

### Key Modification Areas

1. **Props and Types**: 
   - Update the Props interface in `types.ts` when adding new props
   - Provide appropriate defaults in the component definition
   - Add JSDoc comments for prop documentation

2. **Styling Configuration**: 
   - Update the `config.ts` file when changing component styling
   - Maintain the CVA pattern for variants and compound variants

3. **Component Template**: 
   - Use slots for flexible content insertion
   - Maintain the proper binding of element attributes

## The useUI Composable

The `useUI` composable is the core utility that powers Vueless components. It manages styling, attributes, and configuration.

### Functionality

The useUI composable handles three primary tasks:

1. **Config merging**: Combines default, global, and instance-specific configuration objects
2. **Class generation**: Uses CVA to generate Tailwind classes based on component props
3. **Nested component config**: Manages configuration hierarchies for nested components

### Usage Pattern

When using `useUI`, you typically provide these parameters:

```typescript
const { elementAttrs, getDataTest } = useUI<Config>(defaultConfig, mutatedProps, topLevelKey);
```

Where:
- `defaultConfig`: The component's default configuration object
- `mutatedProps`: Optional computed values based on props or slots
- `topLevelKey`: Optional top-level class key for direct targeting

### Return Value

The composable returns an object containing:

- **Element attribute objects**: Attribute objects for each element defined in the config
- **Utility functions**: Helper functions like `getDataTest()` for testing attributes

### Example

```typescript
// Basic usage
const { wrapperAttrs, contentAttrs } = useUI<Config>(defaultConfig);

// With computed props
const mutatedProps = computed(() => ({
  variant: props.loading ? 'loading' : props.variant,
}));
const { wrapperAttrs, contentAttrs } = useUI<Config>(defaultConfig, mutatedProps);
```

## Conditional Styling

Vueless uses a structured approach to conditional styling through the CVA pattern in the component's config file.

### Basic Structure

The config structure contains these key elements:

1. **Base classes**: Applied to all instances regardless of props
2. **Variant classes**: Applied based on specific prop values
3. **Compound variants**: Applied when specific combinations of props occur

### Example Configuration

```typescript
export default {
  button: {
    // Base classes applied to all instances
    base: "flex items-center justify-center rounded-md transition-colors",

    // Variant classes applied based on props
    variants: {
      // Variant prop (appearance variants)
      variant: {
        solid: "bg-primary-500 text-white hover:bg-primary-600",
        outlined: "border border-primary-500 text-primary-500 hover:bg-primary-50",
        subtle: "bg-transparent text-primary-500 hover:bg-primary-50",
      },

      // Size prop (sizing variants)
      size: {
        sm: "text-sm py-1 px-2 gap-1",
        md: "text-base py-2 px-3 gap-2",
        lg: "text-lg py-3 px-4 gap-3",
      },

      // Boolean prop (true/false variants)
      disabled: {
        true: "opacity-50 cursor-not-allowed",
      },
    },

    // Applied when specific combinations of props occur
    compoundVariants: [
      {
        variant: "solid",
        disabled: true,
        class: "bg-gray-300 hover:bg-gray-300",
      },
      {
        variant: "outlined",
        size: "sm",
        class: "border-[1px]",
      },
    ],
  },
};
```

### How It Works

When rendering a component:

1. The base classes are always applied
2. Classes from each matching variant are applied based on prop values
3. Any matching compound variant classes are applied based on prop combinations

This creates a highly flexible styling system that can adapt to various component states and configurations.
```

## Nested Components

Vueless components can use other Vueless components internally, creating component hierarchies with consistent styling.

### Implementation Steps

When using nested components:

1. **Import the nested components**: Import all required component dependencies
2. **Configure nested components**: Use the parent's config to style nested components
3. **Pass appropriate props**: Provide necessary props and attribute bindings

### Configuration Pattern

Nested components should be configured in the parent component's config file:

```typescript
export default {
  wrapper: {
    base: "flex items-center",
    // wrapper variants...
  },
  icon: {
    base: "flex-shrink-0",
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
      },
    },
  },
};
```

### Usage Example

```vue
<template>
  <div v-bind="wrapperAttrs">
    <UIcon 
      v-if="props.leftIcon" 
      :name="props.leftIcon" 
      color="inherit" 
      v-bind="iconAttrs" 
    />
    <span v-bind="labelAttrs">
      <slot>{{ props.label }}</slot>
    </span>
    <UIcon 
      v-if="props.rightIcon" 
      :name="props.rightIcon" 
      color="inherit" 
      v-bind="iconAttrs" 
    />
  </div>
</template>

<script setup lang="ts">
// Import components
import UIcon from "../UIcon/UIcon.vue";

// Get attribute bindings including nested components
const { wrapperAttrs, labelAttrs, iconAttrs } = useUI<Config>(defaultConfig, mutatedProps);
</script>
```

## Best Practices

### Development Guidelines

1. **Follow established patterns**: Use existing components as reference for new development
2. **Use semantic naming**: Choose prop and element names that clearly communicate purpose
3. **Maintain single responsibility**: Each component should have a focused purpose
4. **Prioritize type safety**: Use TypeScript interfaces and types consistently

### Component Design

1. **Provide reasonable defaults**: Every prop should have a sensible default value
2. **Use slots for customization**: Prefer slots over complex prop configurations when appropriate
3. **Maintain accessibility**: Ensure components work with keyboard navigation and screen readers
4. **Support responsiveness**: Components should adapt well to different screen sizes

### Documentation

1. **Document all props**: Add JSDoc comments to all props in the interface
2. **Create comprehensive stories**: Demonstrate all key component features in Storybook
3. **Provide usage examples**: Show common use cases in component documentation
4. **Document component API**: Clearly explain all props, slots, and events

### Testing

1. **Write unit tests**: Test component rendering and behavior
2. **Test edge cases**: Ensure components handle extreme values and conditions
3. **Test accessibility**: Verify components meet accessibility standards
4. **File structure**: Place all test files in a `tests` folder within the component directory
5. **File naming**: Name test files after the component being tested with a `.test.ts` suffix (e.g., `UButton.test.ts`)
6. **Test organization**: Group tests by categories (Props, Slots, Events, etc.) using describe blocks
7. **Test coverage**: Ensure all props, slots, events, and key functionality are tested
8. **Use Vue Test Utils**: Leverage `@vue/test-utils` for mounting and testing components
9. **Use Vitest**: Structure tests using Vitest's `describe`, `it`, and `expect` functions

## Conclusion

Vueless UI provides a structured approach to building Vue components with a powerful styling system. By following these guidelines, AI coding agents can create and modify components that integrate seamlessly with the existing architecture while maintaining consistency and flexibility.

When working with Vueless UI, focus on understanding the core patterns around component structure, the useUI composable, and the styling configuration system.


## Storybook Standards

Storybook is the primary documentation and testing tool for Vueless components. Each component must include proper Storybook documentation.

### Component Documentation Requirements

Each component should include:

1. **stories.ts file**: Demonstrates component usage and variants
2. **docs.mdx file**: Provides detailed documentation and examples

### Stories.ts Structure

The `stories.ts` file must follow this standardized structure:

1. **Imports**: Include necessary utilities and components
2. **Args Interface**: Extend the component Props to add Storybook-specific properties
3. **Meta Configuration**: Configure the component for Storybook
4. **Templates**: Define reusable story templates
5. **Story Exports**: Export individual stories that demonstrate component functionality

### Example Structure

```typescript
// 1. IMPORTS
import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
  getEnumVariantDescription,
} from "../../utils/storybook.ts";

import UComponent from "../UComponent.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

// 2. ARGS INTERFACE
interface UComponentArgs extends Props {
  slotTemplate?: string;
  enum: "variant" | "size" | "color";
}

// 3. META CONFIGURATION
export default {
  id: "1000", // Unique ID for the component
  title: "Category / Component", // Component path in Storybook sidebar
  component: UComponent,
  argTypes: { ...getArgTypes(UComponent.__name) },
  parameters: {
    docs: {
      ...getDocsDescription(UComponent.__name),
    },
  },
} as Meta;

// 4. TEMPLATES
const DefaultTemplate: StoryFn<UComponentArgs> = (args: UComponentArgs) => ({
  components: { UComponent },
  setup: () => ({ args, slots: getSlotNames(UComponent.__name) }),
  template: `
    <UComponent v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UComponent>
  `,
});

const EnumTemplate: StoryFn<UComponentArgs> = (args: UComponentArgs, { argTypes }) => ({
  components: { UComponent, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UComponent
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </URow>
  `,
});

// 5. STORY EXPORTS
// Basic usage example
export const Default = DefaultTemplate.bind({});
Default.args = {
  label: "Component Label",
};

// Variant showcase
export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant" };
Variants.parameters = getEnumVariantDescription();

// Size showcase
export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };
Sizes.parameters = getEnumVariantDescription();

// Other features
export const WithIcon = DefaultTemplate.bind({});
WithIcon.args = {
  label: "With Icon",
  leftIcon: "favorite",
};
```

### Story Templates

Vueless uses specific templates for different story purposes:

1. **DefaultTemplate**: For basic component usage and single instance scenarios
2. **EnumTemplate**: For displaying all possible values of a particular enum prop (variants, sizes, colors)
3. **MultiEnumTemplate**: For displaying combinations of enum props (e.g., all colors for each variant)

### Story Naming Conventions

Stories should be named descriptively to reflect what aspect of the component they demonstrate:

- **Default**: Basic usage of the component
- **Variants/Colors/Sizes**: For showcasing enum props
- **Feature-specific names**: For showcasing specific features (e.g., WithIcon, Disabled, Loading)

### Args and Parameters

1. **args**: Component props to be displayed in the Storybook controls
2. **parameters**: Additional configuration for the story
   - Use `getEnumVariantDescription()` for enum variant stories
   - Add custom documentation with the `description` property

## Storybook docs.mdx Standards

The `docs.mdx` file provides documentation for the component in Storybook. It uses MDX format which combines Markdown with JSX.

### docs.mdx Structure

The `docs.mdx` file follows a consistent exact structure, do not modify anything there:

```mdx
import { Meta, Title, Subtitle, Description, Primary, Controls, Stories, Source } from "@storybook/addon-docs/blocks";
import { getSource } from "../../utils/storybook.ts";

import * as stories from "./stories.ts";
import defaultConfig from "../config.ts?raw"

<Meta of={stories} />
<Title of={stories} />
<Subtitle of={stories} />
<Description of={stories} />
<Primary of={stories}  />
<Controls of={stories.Default} />
<Stories of={stories} />

## Default config
<Source code={getSource(defaultConfig)} language="jsx" dark />
```

## Design System Color Variables

Vueless UI provides a comprehensive set of CSS variables for colors that can be used in component configurations. These variables are organized into several categories and can be accessed in your component styling configuration.

### Using Color Variables in Component Config

In your `config.ts` file, you can reference these CSS variables within your Tailwind classes:

```typescript
export default {
  wrapper: {
    base: "relative flex items-center",
    variants: {
      variant: {
        // Using semantic color variables
        primary: "bg-(--vl-primary) text-(--vl-text-inverted)",
        secondary: "bg-(--vl-secondary) text-(--vl-text)",
        success: "bg-(--vl-success) text-(--vl-text-inverted)",
        error: "bg-(--vl-error) text-(--vl-text-inverted)",
        // Using toned and accented variations
        subtle: "bg-(--vl-primary-toned) text-(--vl-primary)",
        outlined: "border border-(--vl-primary) text-(--vl-primary)",
      },
    },
  },
};
```

### Available Color Variables

#### State Colors

These are the main semantic colors used across the application:

- **Primary**: `--vl-primary`, `--vl-primary-toned`, `--vl-primary-accented`
- **Secondary**: `--vl-secondary`, `--vl-secondary-toned`, `--vl-secondary-accented`
- **Success**: `--vl-success`, `--vl-success-toned`, `--vl-success-accented`
- **Info**: `--vl-info`, `--vl-info-toned`, `--vl-info-accented`
- **Notice**: `--vl-notice`, `--vl-notice-toned`, `--vl-notice-accented`
- **Warning**: `--vl-warning`, `--vl-warning-toned`, `--vl-warning-accented`
- **Error**: `--vl-error`, `--vl-error-toned`, `--vl-error-accented`
- **Neutral**: `--vl-neutral`, `--vl-neutral-toned`, `--vl-neutral-accented`
- **Grayscale**: `--vl-grayscale`, `--vl-grayscale-toned`, `--vl-grayscale-accented`

#### Contextual UI Variables

These variables provide consistent styling for common UI elements:

- **Text**: `--vl-text`, `--vl-text-lifted`, `--vl-text-accented`, `--vl-text-muted`, `--vl-text-inverted`
- **Border**: `--vl-border`, `--vl-border-lifted`, `--vl-border-accented`, `--vl-border-muted`
- **Background**: `--vl-bg`, `--vl-bg-lifted`, `--vl-bg-accented`, `--vl-bg-muted`, `--vl-bg-inverted`

#### Raw Color Shades

Each color provides access to its various shades (from 50-950):

- **Primary**: `--vl-primary-50` through `--vl-primary-950`
- **Neutral**: `--vl-neutral-50` through `--vl-neutral-950`

### Tailwind Integration

Vueless maps these CSS variables to Tailwind's theme in `tailwind.css`, allowing you to use them in your Tailwind classes:

```css
/* In your component config */
base: "text-(--vl-text) bg-(--vl-bg) border-(--vl-border)"
```

### Dark Mode Support

The design system automatically handles dark mode through CSS variables. The values of these variables change based on the current theme (light or dark), but your component configuration doesn't need to change.

### Using Runtime Colors

Vueless UI supports runtime color switching. When implementing components that need to support multiple colors, use the `{color}` placeholder in your configuration:

```typescript
export default {
  wrapper: {
    variants: {
      color: {
        primary: "bg-{color}-500 text-white",
        secondary: "bg-{color}-200 text-{color}-700",
        // other variants...
      },
    },
  },
};
```

The system will automatically generate the necessary Tailwind classes for all supported colors at build time.

## Conclusion

Vueless UI provides a comprehensive and structured approach to building Vue components with a powerful styling system based on Tailwind CSS. By following these guidelines, AI coding agents can create and modify components that integrate seamlessly with the existing architecture.

### Key Takeaways

1. **Consistent Structure**: Follow the established file and code organization patterns
2. **Type Safety**: Leverage TypeScript for robust type checking and documentation
3. **Styling System**: Understand the layered approach to styling with CVA and Tailwind
4. **Component Composition**: Use the useUI composable to manage styling and attributes
5. **Documentation**: Create comprehensive Storybook documentation for all components

### Recommended Workflow

When working with Vueless UI, use this recommended workflow:

1. **Analyze existing components** similar to what you need to create or modify
2. **Start with types and config** to define the component interface and styling
3. **Implement the component** following the established patterns
4. **Document with Storybook** to showcase usage and variants
5. **Write tests** to ensure component reliability

By maintaining consistency with these guidelines, you'll create components that fit seamlessly into the Vueless ecosystem while providing a great developer and user experience.
