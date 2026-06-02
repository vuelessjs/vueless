# Vueless UI Guidelines for AI Coding Agents

## Introduction

Vueless UI is a Vue.js component library built with TypeScript and Tailwind CSS that follows a specific architecture pattern. 
This guide explains how Vueless UI components work and provides guidelines for AI coding agents on how to create new components or modify existing ones correctly.

## Architecture Overview

Vueless UI is built on the following core concepts:

1. **Component-based architecture** - Each UI element is a self-contained component
2. **Consistent file structure** - All components follow the same file organization pattern
3. **Customizable styling system** - Uses Tailwind CSS with a structured configuration approach
4. **Type safety** - Built with TypeScript for robust type checking
5. **Composable behavior** - Leverages Vue's composition API

## Component File Structure

All Vueless components share the same internal file structure. The **internal contents are identical** across all contexts — only the **folder name and its location** differ depending on where the component lives.

```
<component>/
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

### Folder naming by context

- **Case A — `U[component]/`**: project-wide component in a consumer (non-Vueless) project; lives in `.vueless/components` (or `src/components`); scaffolded via `npx vueless create <UComponentName>`; `U` prefix is required for Vueless to recognize the component.
- **Case B — `[component]/`**: local/module-level component in a consumer project, scoped to a specific feature or module rather than shared project-wide; lives under the feature/module path; no `U` prefix on the folder.
- **Case C — `ui.<category>-<name>/`**: component inside the Vueless repository itself, located under `src/`; the folder name can differ from the main `.vue` file name (e.g. `ui.form-input/UInput.vue`, `ui.form-date-picker-range/UDatePickerRange.vue`).

### Key Files Explained

- **config.ts**: Contains styling configuration, default prop values, and component settings
- **constants.ts**: Component constants and identifiers
- **types.ts**: TypeScript types and props declaration
- **U[component].vue**: The main component file (in Case C the folder name may differ from the `.vue` file name)
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
import { getDefaults } from "../utils/ui";
import defaultConfig from "./config";
import { COMPONENT_NAME } from "./constants";
import type { Props, Config } from "./types";

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  // withDefaults second arg is used ONLY for rare exceptions (e.g. arrays or objects)
});
```

### 3. useUI Composable for Styling and Attributes

The useUI composable handles styling, attribute management, and class generation:

```typescript
import { useUI } from "../composables/useUI";

const mutatedProps = computed(() => ({
  // Computed properties based on props or slots
}));

const { getDataTest, buttonAttrs, wrapperAttrs } = useUI<Config>(defaultConfig, mutatedProps);
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
import defaultConfig from "./config";
import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Primary content or label
   */
  label?: string;

  /**
   * Component variant
   */
  variant?: "solid" | "outlined" | "subtle" | "soft" | "ghost";

  /**
   * Component size
   */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

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
export default /*tw*/ {
  button: {
    base: "flex items-center justify-center font-medium rounded-medium transition cursor-pointer",
    variants: {
      size: {
        "2xs": "px-2 py-1 text-small gap-0.5",
        xs: "px-3 py-1.5 text-small gap-1",
        sm: "px-4 py-2 text-medium gap-1.5",
        md: "px-5 py-2.5 text-medium gap-1.5",
        lg: "px-6 py-3 text-large gap-1.5",
        xl: "px-7 py-3.5 text-large gap-2",
      },
      variant: {
        solid: "bg-{color} border-transparent text-inverted hover:bg-{color}-lifted",
        outlined: "text-{color} border-{color} hover:text-{color}-lifted",
        subtle: "text-{color} bg-{color}/5 border-{color}/15",
        soft: "text-{color} bg-{color}/5 border-transparent",
        ghost: "text-{color} bg-transparent border-transparent",
      },
    },
  },
  // Additional elements as needed
  defaults: {
    color: "primary",
    variant: "solid",
    size: "md",
  },
};
```

3. Create the component in U[ComponentName].vue:
```vue
<script setup lang="ts">
import { computed } from "vue";
import { useUI } from "../composables/useUI";
import defaultConfig from "./config";
import { COMPONENT_NAME } from "./constants";
import { getDefaults } from "../utils/ui";
import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  // Only add explicit defaults here for rare exceptions (e.g. label: "")
});

const { getDataTest, buttonAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <button v-bind="buttonAttrs" :data-test="getDataTest()">
    <slot>
      {{ props.label }}
    </slot>
  </button>
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
   - Add default values to the `defaults: {}` block in `config.ts`; `withDefaults` second arg is only for rare exceptions
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
const { buttonAttrs, wrapperAttrs, getDataTest } = useUI<Config>(defaultConfig, mutatedProps, topLevelKey);
```

Where:
- `defaultConfig`: The component's default configuration object
- `mutatedProps`: Optional computed values based on props or slots
- `topLevelKey`: Optional top-level class key for direct targeting

### Return Value

The composable returns an object containing named per-token attribute objects — one for each token defined in the config — plus `getDataTest`. For example, a component with `button`, `loader`, `leftIcon`, and `centerIcon` tokens in its config will receive:

- **`buttonAttrs`**, **`loaderAttrs`**, **`leftIconAttrs`**, **`centerIconAttrs`**, etc. — attribute objects for each config token
- **`getDataTest`** — helper function for generating `data-test` attributes

### Example

```typescript
// Basic usage — named attrs match config token names
const { getDataTest, buttonAttrs, loaderAttrs, leftIconAttrs } = useUI<Config>(defaultConfig);

// With computed props — override/augment props before class generation
const mutatedProps = computed(() => ({
  icon: Boolean(props.icon),
  leftIcon: Boolean(props.leftIcon),
}));
const { getDataTest, buttonAttrs, loaderAttrs, leftIconAttrs } = useUI<Config>(defaultConfig, mutatedProps);
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
export default /*tw*/ {
  button: {
    // Base classes applied to all instances
    base: "flex items-center justify-center rounded-medium transition cursor-pointer",

    // Variant classes applied based on props
    variants: {
      // Variant prop (appearance variants) — uses {color} runtime placeholder
      variant: {
        solid: "bg-{color} border-transparent text-inverted hover:bg-{color}-lifted active:bg-{color}-accented disabled:bg-{color}/(--vl-disabled-opacity)!",
        outlined: "text-{color} border-{color} hover:text-{color}-lifted hover:bg-{color}-lifted/10",
        subtle: "text-{color} bg-{color}/5 border-{color}/15 hover:text-{color}-lifted",
        soft: "text-{color} bg-{color}/5 border-transparent hover:text-{color}-lifted",
        ghost: "text-{color} bg-transparent border-transparent hover:text-{color}-lifted",
      },

      // Size prop (sizing variants)
      size: {
        "2xs": "text-small px-2 py-1 gap-0.5",
        xs: "text-small px-3 py-1.5 gap-1",
        sm: "text-medium px-4 py-2 gap-1.5",
        md: "text-medium px-5 py-2.5 gap-1.5",
        lg: "text-large px-6 py-3 gap-1.5",
        xl: "text-large px-7 py-3.5 gap-2",
      },

      // Boolean prop (true/false variants)
      loading: {
        true: "gap-0 pointer-events-none",
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
        square: true,
        size: "md",
        class: "p-2.5",
      },
    ],
  },
  defaults: {
    color: "primary",
    variant: "solid",
    size: "md",
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

Nested components are wired up in the parent's config using special token-reference strings. This lets the parent inherit and extend the nested component's own config, rather than duplicating styles.

- **`"{ULoader}"`** — token inherits its entire config from the `ULoader` component defaults
- **`"{UIcon} {>centerIcon}"`** — token inherits `UIcon` defaults AND merges in the parent's `centerIcon` token as overrides

```typescript
export default /*tw*/ {
  button: {
    base: "flex items-center justify-center",
    // button variants...
  },
  // Inherits ULoader config entirely
  loader: {
    base: "{ULoader}",
    defaults: {
      size: { sm: "md", md: "md", lg: "lg" },
    },
  },
  // Inherits UIcon config AND merges centerIcon token overrides
  leftIcon: "{UIcon} {>centerIcon} -ml-1",
  rightIcon: "{UIcon} {>centerIcon} -mr-1",
  centerIcon: {
    base: "{UIcon}",
    defaults: {
      size: { "2xs": "2xs", xs: "xs", sm: "sm", md: "sm", lg: "sm", xl: "sm" },
    },
  },
  defaults: {
    color: "primary",
    variant: "solid",
    size: "md",
  },
};
```

### Usage Example

```vue
<script setup lang="ts">
import { useUI } from "../composables/useUI";
import ULoader from "../ui.loader/ULoader.vue";
import UIcon from "../ui.image-icon/UIcon.vue";
import defaultConfig from "./config";
import type { Props, Config } from "./types";

// Named attrs map 1-to-1 with config tokens
const {
  getDataTest,
  buttonAttrs,
  loaderAttrs,
  leftIconAttrs,
  rightIconAttrs,
  centerIconAttrs,
} = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <button v-bind="buttonAttrs" :data-test="getDataTest()">
    <UIcon v-if="props.leftIcon" :name="props.leftIcon" v-bind="leftIconAttrs" />
    <slot>{{ props.label }}</slot>
    <UIcon v-if="props.rightIcon" :name="props.rightIcon" v-bind="rightIconAttrs" />
    <ULoader v-if="props.loading" v-bind="loaderAttrs" />
  </button>
</template>
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
} from "../../utils/storybook";

import UComponent from "../UComponent.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

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

// Size showcase
export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

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
   - Add custom documentation with the `description` property

## Storybook docs.mdx Standards

The `docs.mdx` file provides documentation for the component in Storybook. It uses MDX format which combines Markdown with JSX.

### docs.mdx Structure

The `docs.mdx` file follows a consistent exact structure, do not modify anything there:

```mdx
import { Meta, Title, Subtitle, Description, Primary, Controls, Stories, Source } from "@storybook/addon-docs/blocks";
import { getSource } from "../../utils/storybook";

import * as stories from "./stories";
import defaultConfig from "../config?raw"

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
export default /*tw*/ {
  wrapper: {
    base: "relative flex items-center",
    variants: {
      variant: {
        // Using semantic color variables
        primary: "bg-(--vl-primary) text-(--vl-text-inverted)",
        secondary: "bg-(--vl-secondary) text-(--vl-text)",
        success: "bg-(--vl-success) text-(--vl-text-inverted)",
        error: "bg-(--vl-error) text-(--vl-text-inverted)",
        // Using lifted and accented variations
        subtle: "bg-(--vl-bg-lifted) text-(--vl-primary)",
        outlined: "border border-(--vl-primary) text-(--vl-primary)",
      },
    },
  },
};
```

### Available Color Variables

#### State Colors

These are the main semantic colors used across the application. Each has three variants: base, `-lifted` (lighter/more prominent), and `-accented` (stronger emphasis):

- **Primary**: `--vl-primary`, `--vl-primary-lifted`, `--vl-primary-accented`
- **Secondary**: `--vl-secondary`, `--vl-secondary-lifted`, `--vl-secondary-accented`
- **Success**: `--vl-success`, `--vl-success-lifted`, `--vl-success-accented`
- **Info**: `--vl-info`, `--vl-info-lifted`, `--vl-info-accented`
- **Notice**: `--vl-notice`, `--vl-notice-lifted`, `--vl-notice-accented`
- **Warning**: `--vl-warning`, `--vl-warning-lifted`, `--vl-warning-accented`
- **Error**: `--vl-error`, `--vl-error-lifted`, `--vl-error-accented`
- **Neutral**: `--vl-neutral`, `--vl-neutral-lifted`, `--vl-neutral-accented`
- **Grayscale**: `--vl-grayscale`, `--vl-grayscale-lifted`, `--vl-grayscale-accented`

#### Contextual UI Variables

These variables provide consistent styling for common UI elements:

- **Text**: `--vl-text`, `--vl-text-lifted`, `--vl-text-accented`, `--vl-text-muted`, `--vl-text-inverted`
- **Border**: `--vl-border`, `--vl-border-lifted`, `--vl-border-accented`, `--vl-border-muted`
- **Background**: `--vl-bg`, `--vl-bg-lifted`, `--vl-bg-accented`, `--vl-bg-muted`, `--vl-bg-inverted`

### Tailwind Integration

Vueless maps these CSS variables to Tailwind's theme in `tailwind.css`, allowing you to use them in your Tailwind classes:

```css
/* In your component config */
base: "text-(--vl-text) bg-(--vl-bg) border-(--vl-border)"
```

### Dark Mode Support

The design system automatically handles dark mode through CSS variables. The values of these variables change based on the current theme (light or dark), but your component configuration doesn't need to change.

### Using Runtime Colors

Vueless UI supports runtime color switching. When implementing components that need to support multiple colors, use the `{color}` placeholder in your configuration. The available runtime color patterns mirror the state color suffixes:

```typescript
export default /*tw*/ {
  button: {
    variants: {
      variant: {
        // bg-{color} fills with the current color; text-inverted ensures contrast
        solid: "bg-{color} border-transparent text-inverted hover:bg-{color}-lifted active:bg-{color}-accented disabled:bg-{color}/(--vl-disabled-opacity)!",
        // text-{color} and border-{color} for outlined styles
        outlined: "text-{color} border-{color} hover:text-{color}-lifted hover:bg-{color}-lifted/10",
        subtle: "text-{color} bg-{color}/5 border-{color}/15 hover:text-{color}-lifted",
      },
    },
  },
};
```

The system will automatically generate the necessary Tailwind classes for all supported colors at build time.

**Runtime color suffixes**: Use `-lifted` for hover/lighter states and `-accented` for active/stronger states. Only these two suffixes exist — no other color-shade suffixes are supported.

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
