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

# Vueless UI Component Usage Examples for AI Agents

This document provides comprehensive use case examples of Vueless UI components based on real-world usage patterns from the Fine.my financial management application. Each example includes when to use the component, common props, events, and combinations.

Use `./node_modules/.cache/vueless/web-types.json` to get the actual and detailed specifications for each component's props, events, slots, and exposes.

## Table of Contents

1. [Form Components](#form-components)
2. [Layout Components](#layout-components)
3. [Data Display Components](#data-display-components)
4. [Feedback Components](#feedback-components)
5. [Navigation Components](#navigation-components)
6. [Complex Component Combinations](#complex-component-combinations)

## Form Components

### UInput - Text Input Field

**When to use:** For collecting text data like names, emails, descriptions, and search queries.

**Basic Usage:**
```vue
<UInput
  v-model="form.email"
  :label="t('label.email')"
  :placeholder="t('placeholder.email')"
  :error="emailError"
  inputmode="email"
  data-cy="email-input"
/>
```

**Advanced Usage with Slots:**
```vue
<UInput
  v-model="form.amount"
  :label="t('label.amount')"
  :error="validation.moneyError.value"
  data-cy="money-input"
>
  <template #right>
    <UIcon
      v-if="showUndoButton"
      name="close"
      interactive
      color="neutral"
      @click="onClickUndo"
    />
  </template>
</UInput>
```



### UInputPassword - Password Input

**When to use:** For password fields with built-in show/hide functionality.

```vue
<UInputPassword
  v-model="form.password"
  :label="t('label.password')"
  :placeholder="t('placeholder.password')"
  :error="passwordError"
  data-cy="password-input"
/>
```

### USelect - Dropdown Selection

**When to use:** For selecting from predefined options, with support for search, grouping, and multiple selection.

**Basic Single Selection:**
```vue
<USelect
  v-model="form.roleId"
  :label="t('label.role')"
  :placeholder="t('placeholder.role')"
  :error="userRoleError"
  :options="rolesForSelect"
  :disabled="form.isOwner"
/>
```

**Multiple Selection with Groups:**
```vue
<USelect
  v-model="form.categoryIds"
  :label="t('label.categories')"
  :options="categoriesForSelect"
  group-label-key="category"
  group-value-key="subCategories"
  multiple
  searchable
  data-cy="categories-multiselect"
>
  <template #before-option="{ option }">
    <UDot v-if="option.color" :color="option.color" class="my-auto mr-1" />
  </template>
</USelect>
```

**With Add Option Functionality:**
```vue
<USelect
  v-model="form.bankAccountId"
  :label="t('label.bankAccount')"
  :options="bankAccountOptions"
  add-option
  @add="onAddBankAccount"
/>
```



### UCheckbox & UCheckboxGroup - Checkbox Controls

**When to use:** For boolean selections or multiple choice selections.

**Single Checkbox:**
```vue
<UCheckbox
  v-model="form.isActive"
  :label="t('label.isActive')"
/>
```

**Checkbox Group:**
```vue
<UCheckboxGroup
  v-model="checkedItems"
  :options="checkboxOptions"
  name="permissions"
/>
```

### URadio & URadioGroup - Radio Button Controls

**When to use:** For single selection from multiple options.

```vue
<URadioGroup
  v-model="form.transactionType"
  :options="transactionTypes"
  name="transactionType"
/>
```

### UDatePicker & UDatePickerRange - Date Selection

**When to use:** For date and time selection, including date ranges.

**Single Date:**
```vue
<UDatePicker
  v-model="form.date"
  :label="t('label.date')"
  :error="dateError"
/>
```

**Date Range:**
```vue
<UDatePickerRange
  v-model:from="form.dateFrom"
  v-model:to="form.dateTo"
  :from-label="t('label.dateFrom')"
  :to-label="t('label.dateTo')"
/>
```

### UTextarea - Multi-line Text Input

**When to use:** For longer text content like comments, descriptions, or notes.

```vue
<UTextarea
  v-model="form.comment"
  :label="t('label.comment')"
  :placeholder="t('placeholder.comment')"
  rows="4"
/>
```

## Layout Components

### UPage - Page Container

**When to use:** As the main container for page content with navigation and actions.

```vue
<UPage
  :back-to="backRouteParams"
  :back-label="t('title.settings')"
  :title="t('title.users')"
  size="xl"
  variant="soft"
  data-cy="users-page"
>
  <template #actions>
    <UButton :label="t('button.add')" @click="onAddUser" />
  </template>

  <!-- Page content -->
  <UTable :rows="tableItems" :columns="tableHeaders" />
</UPage>
```

### UCard - Content Card

**When to use:** For grouping related content with optional header and footer.

```vue
<UCard>
  <UCol>
    <UHeader :label="t('title.companyInfo')" />
    <UText>{{ t('description.companyText') }}</UText>
    
    <UInput
      v-model="form.companyName"
      :label="t('label.companyName')"
      :error="companyNameError"
    />
  </UCol>

  <template #footer-right>
    <UButton :label="t('button.continue')" @click="onSubmit" />
  </template>
</UCard>
```

### UGroups & UGroup - Form Grouping

**When to use:** For organizing form fields into logical sections.

```vue
<UGroups data-cy="transaction-form">
  <UGroup :title="t('label.main')">
    <UCol>
      <UInput v-model="form.amount" :label="t('label.amount')" />
      <USelect v-model="form.category" :label="t('label.category')" />
    </UCol>
  </UGroup>

  <UGroup :title="t('label.details')">
    <template #after-title>
      <USwitch v-model="isAdvancedMode" />
    </template>
    
    <UCol>
      <UTextarea v-model="form.description" :label="t('label.description')" />
    </UCol>
  </UGroup>
</UGroups>
```

### UCol - Column Layout

**When to use:** For vertical stacking of components with consistent spacing.

```vue
<UCol gap="lg" align="stretch">
  <UInput v-model="form.name" :label="t('label.name')" />
  <UInput v-model="form.email" :label="t('label.email')" />
  <USelect v-model="form.role" :label="t('label.role')" />
</UCol>
```

### URow - Row Layout

**When to use:** For horizontal arrangement of components with flexible alignment and spacing.

**Basic Row Layout:**
```vue
<URow gap="md" align="center">
  <UButton :label="t('button.save')" />
  <UButton :label="t('button.cancel')" variant="outlined" />
</URow>
```

**Filter Row with Multiple Components:**
```vue
<URow gap="md" align="end">
  <UDatePickerRange
    v-model:from="filters.dateFrom"
    v-model:to="filters.dateTo"
  />
  <USelect
    v-model="filters.category"
    :options="categories"
    :placeholder="t('placeholder.allCategories')"
  />
  <UButton
    :label="t('button.filter')"
    @click="onApplyFilters"
  />
</URow>
```

**Row with Icons and Controls:**
```vue
<URow align="center" gap="sm">
  <UIcon name="notifications" color="neutral" size="sm" />
  <UText>{{ t('label.notifications') }}</UText>
  <USwitch v-model="settings.notifications" />
</URow>
```

**Row with Status Indicators:**
```vue
<URow align="center" gap="sm">
  <UDot color="success" />
  <UText>{{ t('status.active') }}</UText>
</URow>
```

**Complex Row with Nested Components:**
```vue
<URow align="stretch" justify="between">
  <URow align="center" gap="2xl" class="w-fit">
    <URow>
      <UDatePickerRange
        v-model="paymentDateRange"
        :custom-range-button="customRangeButton"
      />
      <FilterButton
        :filters="filtersForButton"
        @click="onClickFiltersButton"
      />
      <UButton
        icon="search"
        variant="soft"
        square
        @click="onShowSearch"
      />
    </URow>
  </URow>
</URow>
```

**Row in Data List Items:**
```vue
<URow gap="xs" align="center">
  <UDot v-if="item.color" :color="item.color" size="md" />
  <div>{{ item.name }}</div>
</URow>
```

**Row with Justify Between:**
```vue
<URow justify="between" align="center">
  <UCol>
    <UNumber
      :value="income.amount"
      :currency="income.currency"
      color="success"
    />
  </UCol>
  <UCol>
    <UNumber
      :value="expense.amount"
      :currency="expense.currency"
      color="error"
    />
  </UCol>
</URow>
```

## Data Display Components

### UTable - Data Table

**When to use:** For displaying tabular data with sorting, selection, and custom cell rendering.

**Basic Table:**
```vue
<UTable
  :rows="tableItems"
  :columns="tableHeaders"
  @click-row="onClickRow"
/>
```

**Advanced Table with Selection and Custom Cells:**
```vue
<UTable
  ref="tableRef"
  v-model:selected-rows="checkedItems"
  :rows="transactionsForTable"
  :columns="tableHeaders"
  :selectable="hasEditRights"
  :loading="isLoading"
  sticky-header
  compact
  data-cy="transaction-table"
  @click-row="onClickRow"
>
  <template #header-actions="{ selectedRows }">
    <UButton
      variant="ghost"
      :label="t('button.delete')"
      @click="onDeleteSelected"
    />
  </template>

  <template #cell-status="{ value }">
    <UBadge :label="value.label" :color="value.variant" />
  </template>

  <template #cell-money="{ value }">
    <UNumber
      :value="value.amount"
      :currency="value.currency"
      :color="value.isPositive ? 'success' : 'error'"
    />
  </template>

  <template #footer>
    <td colspan="3">
      <UButton
        v-if="hasMorePages"
        :label="t('button.showMore')"
        variant="soft"
        @click="onLoadMore"
      />
    </td>
  </template>
</UTable>
```

### UBadge - Status Indicator

**When to use:** For displaying status, categories, or labels.

```vue
<UBadge
  :label="user.status.label"
  :color="user.status.color"
  variant="soft"
  round
/>
```

### UNumber - Formatted Numbers

**When to use:** For displaying monetary values, percentages, or formatted numbers.

```vue
<UNumber
  :value="transaction.amount"
  :currency="transaction.currency.symbol"
  :color="transaction.isPositive ? 'success' : 'error'"
  :sign="transaction.isPositive ? '+' : '-'"
  align="right"
  currency-space
/>
```

### UAvatar - User Avatar

**When to use:** For displaying user profile pictures or initials.

```vue
<UAvatar
  :src="user.avatar"
  :alt="user.name"
  :label="user.initials"
  size="lg"
  color="primary"
/>
```

## Feedback Components

### UAlert - Alert Messages

**When to use:** For displaying important information, warnings, or errors.

```vue
<UAlert
  color="warning"
  size="sm"
  variant="soft"
>
  <p>{{ t('warning.dataWillBeLost') }}</p>
</UAlert>
```

### UModal - Modal Dialogs

**When to use:** For displaying content that requires user attention or interaction.

**Basic Modal:**
```vue
<UModal
  v-model="isShownModal"
  :title="t('title.addCounterparty')"
  size="lg"
>
  <CounterpartyForm v-model="form" />

  <template #footer-left>
    <UButton :label="t('button.add')" @click="onSubmit" />
    <UButton
      :label="t('button.close')"
      variant="outlined"
      @click="onClose"
    />
  </template>
</UModal>
```

### UModalConfirm - Confirmation Dialog

**When to use:** For confirming destructive or important actions.

```vue
<UModalConfirm
  v-model="isShownModal"
  :title="t('title.deleteUser')"
  :confirm-label="t('button.delete')"
  color="error"
  @confirm="onConfirmDelete"
>
  <UText :html="t('description.deleteConfirmation', { name: user.name })" />
</UModalConfirm>
```

### UNotify - Notifications

**When to use:** For showing success, error, or info messages to users.

```javascript
import { notifySuccess, notifyError } from 'vueless';

// Success notification
notifySuccess(t('message.userCreated'));

// Error notification
notifyError(t('error.userCreationFailed'));
```

## Navigation Components

### UButton - Action Buttons

**When to use:** For triggering actions, navigation, or form submission.

**Primary Action:**
```vue
<UButton
  :label="t('button.save')"
  color="primary"
  size="lg"
  @click="onSave"
/>
```

**Secondary Action:**
```vue
<UButton
  :label="t('button.cancel')"
  variant="outlined"
  @click="onCancel"
/>
```

**Icon Button:**
```vue
<UButton
  icon="add"
  variant="soft"
  size="sm"
  filled
  round
  square
  @click="onAdd"
/>
```

### ULink - Navigation Links

**When to use:** For navigation between pages or external links.

```vue
<ULink
  :to="{ name: 'user.edit', params: { id: user.id } }"
  :label="user.name"
  underlined
  color="primary"
/>
```

### UDropdownButton & UDropdownList - Dropdown Menus

**When to use:** For showing contextual actions or navigation options.

```vue
<UDropdownButton
  :label="t('button.actions')"
  :options="actionOptions"
  @click-option="onActionClick"
/>
```

```vue
<UDropdownList
  :options="menuOptions"
  y-position="bottom"
  x-position="right"
  @click-option="onMenuClick"
/>
```

### UTabs & UTab - Tab Navigation

**When to use:** For organizing content into multiple views within the same page.

```vue
<UTabs v-model="activeTab">
  <UTab name="general" :label="t('tab.general')">
    <GeneralSettings v-model="settings.general" />
  </UTab>
  
  <UTab name="security" :label="t('tab.security')">
    <SecuritySettings v-model="settings.security" />
  </UTab>
</UTabs>
```

## Complex Component Combinations

### User Management Form

**Use case:** Creating or editing user accounts with role assignment and validation.

```vue
<template>
  <UPage :title="isEdit ? t('title.editUser') : t('title.addUser')">
    <UCard>
      <UCol>
        <UInput
          v-model="form.name"
          :label="t('label.userName')"
          :error="validation.nameError"
          :disabled="isEdit"
        />

        <UInput
          v-model="form.email"
          :label="t('label.email')"
          :error="validation.emailError"
          inputmode="email"
        />

        <USelect
          v-model="form.roleId"
          :label="t('label.role')"
          :options="rolesForSelect"
          :error="validation.roleError"
          :disabled="form.isOwner"
        />

        <UCheckbox
          v-model="form.isActive"
          :label="t('label.isActive')"
        />
      </UCol>

      <template #footer-right>
        <UButton
          :label="t('button.save')"
          @click="onSave"
        />
        <UButton
          :label="t('button.cancel')"
          variant="outlined"
          @click="onCancel"
        />
      </template>
    </UCard>
  </UPage>
</template>
```

### Transaction Filter Modal

**Use case:** Complex filtering interface with multiple criteria and saved presets.

```vue
<template>
  <UModal
    v-model="isShown"
    :title="t('title.filter')"
    size="xl"
  >
    <UGroups>
      <UGroup :title="t('label.main')">
        <UCol>
          <USelect
            v-model="form.transactionTypes"
            :label="t('label.transactionType')"
            :options="transactionTypes"
            multiple
          />

          <UDatePickerRange
            v-model:from="form.dateFrom"
            v-model:to="form.dateTo"
            :from-label="t('label.dateFrom')"
            :to-label="t('label.dateTo')"
          />

          <UInputNumber
            v-model="form.amountFrom"
            :label="t('label.amountFrom')"
          />
        </UCol>
      </UGroup>

      <UGroup :title="t('label.advanced')">
        <UCol>
          <USelect
            v-model="form.categories"
            :label="t('label.categories')"
            :options="categoriesForSelect"
            multiple
            searchable
          />

          <UCheckbox
            v-model="form.includeSubcategories"
            :label="t('label.includeSubcategories')"
          />
        </UCol>
      </UGroup>
    </UGroups>

    <template #footer-left>
      <UButton :label="t('button.apply')" @click="onApply" />
      <UButton
        :label="t('button.savePreset')"
        variant="outlined"
        @click="onSavePreset"
      />
    </template>

    <template #footer-right>
      <UButton
        :label="t('button.reset')"
        variant="ghost"
        @click="onReset"
      />
    </template>
  </UModal>
</template>
```

This document provides comprehensive examples of Vueless UI component usage patterns that AI agents can reference when building user interfaces. Each component includes practical use cases, common prop configurations, and real-world combinations based on the Fine.my application.

## Additional Specialized Components

### USwitch - Toggle Switch

**When to use:** For enabling/disabling features or binary settings.

```vue
<USwitch
  v-model="isActiveAutofill"
  :label="t('label.enableAutofill')"
/>

<!-- In a group header -->
<UGroup :title="t('label.notifications')">
  <template #after-title>
    <URow align="center">
      <UIcon name="notifications" color="neutral" size="sm" />
      <USwitch v-model="settings.notifications" />
    </URow>
  </template>
</UGroup>
```

### UProgress - Progress Indicators

**When to use:** For showing loading states or progress of operations.

```vue
<UProgress
  :value="uploadProgress"
  :max="100"
  color="primary"
  size="md"
/>
```

### UColorPicker - Color Selection

**When to use:** For selecting colors for categories, tags, or themes.

```vue
<UColorPicker
  v-model="form.categoryColor"
  :label="t('label.categoryColor')"
  :colors="availableColors"
/>
```

### UInputRating - Star Rating

**When to use:** For rating or scoring functionality.

```vue
<UInputRating
  v-model="form.rating"
  :label="t('label.rating')"
  :max="5"
  size="lg"
/>
```

### UInputSearch - Search Input

**When to use:** For search functionality with built-in search icon and clear button.

```vue
<UInputSearch
  v-model="searchQuery"
  :placeholder="t('placeholder.searchTransactions')"
  @search="onSearch"
  @clear="onClearSearch"
/>
```

### UDot - Status Indicator

**When to use:** For showing status, color coding, or small indicators.

```vue
<!-- In a select option -->
<template #before-option="{ option }">
  <UDot
    v-if="option.color"
    :color="option.color"
    class="my-auto mr-1"
  />
</template>

<!-- As status indicator -->
<URow align="center" gap="sm">
  <UDot color="success" />
  <UText>{{ t('status.active') }}</UText>
</URow>
```

## Best Practices and Configuration



### Data Attributes for Testing

Always include `data-cy` attributes for testing:

```vue
<UButton
  :label="t('button.save')"
  data-cy="save-button"
  @click="onSave"
/>

<UInput
  v-model="form.email"
  :label="t('label.email')"
  data-cy="email-input"
/>
```

### Accessibility Considerations

Use proper labeling and ARIA attributes:

```vue
<UInput
  v-model="form.amount"
  :label="t('label.amount')"
  inputmode="decimal"
  :aria-describedby="hasError ? 'amount-error' : undefined"
/>

<UButton
  icon="delete"
  :aria-label="t('button.delete')"
  @click="onDelete"
/>
```

### Responsive Design Patterns

Use responsive classes and conditional rendering:

```vue
<UPage>
  <template #actions>
    <!-- Mobile: Show icon only -->
    <UIcon v-if="isPhoneGroup" size="xl" name="add" @click="onAdd" />
    <!-- Desktop: Show full button -->
    <UButton v-else :label="t('button.add')" @click="onAdd" />
  </template>
</UPage>
```

### Error Handling Patterns

Consistent error display across forms:

```vue
<UInput
  v-model="form.email"
  :label="t('label.email')"
  :error="validation.emailError"
  :disabled="isLoading"
/>

<UAlert v-if="hasGlobalError" color="error">
  {{ globalErrorMessage }}
</UAlert>
```

### Loading States

Show loading states for better UX:

```vue
<UTable
  :rows="tableData"
  :columns="tableHeaders"
  :loading="isLoading.transactions"
  @click-row="onClickRow"
/>

<UButton
  :label="isLoading ? t('button.saving') : t('button.save')"
  :disabled="isLoading"
  @click="onSave"
/>
```

## Component Combination Patterns

### Master-Detail View

```vue
<template>
  <UPage :title="t('title.transactions')">
    <!-- Filters -->
    <UCard class="mb-6">
      <URow gap="md" align="end">
        <UDatePickerRange
          v-model:from="filters.dateFrom"
          v-model:to="filters.dateTo"
        />
        <USelect
          v-model="filters.category"
          :options="categories"
          :placeholder="t('placeholder.allCategories')"
        />
        <UButton
          :label="t('button.filter')"
          @click="onApplyFilters"
        />
      </URow>
    </UCard>

    <!-- Data Table -->
    <UTable
      v-model:selected-rows="selectedRows"
      :rows="transactions"
      :columns="tableColumns"
      selectable
      @click-row="onSelectTransaction"
    >
      <template #header-actions>
        <UDropdownButton
          :label="t('button.actions')" 
          :options="bulkActions"
          :disabled="!selectedRows.length"
          @click-option="onBulkAction"
        />
      </template>
    </UTable>
  </UPage>
</template>
```

### Multi-Step Form

```vue
<template>
  <UModal v-model="isShown" :title="t('title.addTransaction')">
    <UTabs v-model="currentStep">
      <UTab name="basic" :label="t('step.basicInfo')">
        <UCol>
          <UInputNumber
            v-model="form.amount"
            :label="t('label.amount')"
            :error="validation.amountError"
          />
          <USelect
            v-model="form.type"
            :label="t('label.type')"
            :options="transactionTypes"
          />
        </UCol>
      </UTab>

      <UTab name="details" :label="t('step.details')">
        <UCol>
          <USelect
            v-model="form.category"
            :label="t('label.category')"
            :options="categories"
          />
          <UTextarea
            v-model="form.description"
            :label="t('label.description')"
          />
        </UCol>
      </UTab>
    </UTabs>

    <template #footer-left>
      <UButton
        v-if="currentStep !== 'basic'"
        :label="t('button.previous')"
        variant="outlined"
        @click="onPreviousStep"
      />
      <UButton
        :label="isLastStep ? t('button.save') : t('button.next')"
        @click="onNextStep"
      />
    </template>
  </UModal>
</template>
```

### Data Table with Advanced Features

**Use case:** Complex data table with filtering, sorting, selection, and inline editing.

```vue
<template>
  <UPage :title="t('title.transactions')">
    <!-- Header with Search and Actions -->
    <URow align="stretch" justify="between" class="mb-6">
      <URow align="center" gap="md">
        <UInputSearch
          v-model="searchQuery"
          :placeholder="t('placeholder.searchTransactions')"
          @search="onSearch"
        />
        <FilterButton
          :filters="activeFilters"
          @click="onShowFilters"
        />
      </URow>

      <UButton
        :label="t('button.addTransaction')"
        icon="add"
        @click="onAddTransaction"
      />
    </URow>

    <!-- Advanced Table -->
    <UTable
      ref="tableRef"
      v-model:selected-rows="selectedTransactions"
      :rows="transactionsForTable"
      :columns="tableHeaders"
      :loading="isLoading"
      :selectable="hasEditRights"
      sticky-header
      compact
      @click-row="onClickRow"
    >
      <!-- Header Actions for Bulk Operations -->
      <template #header-actions="{ selectedRows }">
        <URow gap="sm">
          <UButton
            :label="t('button.delete')"
            variant="ghost"
            color="error"
            size="sm"
            :disabled="!selectedRows.length"
            @click="onBulkDelete"
          />
          <UButton
            :label="t('button.export')"
            variant="ghost"
            size="sm"
            :disabled="!selectedRows.length"
            @click="onBulkExport"
          />
        </URow>
      </template>

      <!-- Custom Cell Renderers -->
      <template #cell-status="{ value }">
        <UBadge
          :label="value.label"
          :color="value.color"
          variant="soft"
        />
      </template>

      <template #cell-amount="{ value, row }">
        <UNumber
          :value="value.amount"
          :currency="value.currency"
          :color="value.isPositive ? 'success' : 'error'"
          :sign="value.isPositive ? '+' : '-'"
          align="right"
        />
      </template>

      <template #cell-category="{ value, row }">
        <URow align="center" gap="xs">
          <UDot v-if="value.color" :color="value.color" />
          <span>{{ value.name }}</span>
        </URow>
      </template>

      <!-- Pagination Footer -->
      <template #after-last-row="{ colsCount }">
        <td :colspan="colsCount" class="text-center">
          <UButton
            v-if="hasMorePages"
            :label="t('button.loadMore')"
            variant="soft"
            size="sm"
            @click="onLoadMore"
          />
        </td>
      </template>
    </UTable>
  </UPage>
</template>
```

### Dashboard with Cards and Charts

**Use case:** Financial dashboard with multiple data visualization cards.

```vue
<template>
  <UPage :title="t('title.dashboard')" size="full">
    <!-- Dashboard Header -->
    <URow justify="between" align="center" class="mb-6">
      <URow align="center" gap="md">
        <UDatePickerRange
          v-model:from="filters.dateFrom"
          v-model:to="filters.dateTo"
          @change="onDateRangeChange"
        />
        <USelect
          v-model="filters.company"
          :options="companies"
          :placeholder="t('placeholder.allCompanies')"
        />
      </URow>

      <UDropdownButton
        :label="t('button.export')"
        :options="exportOptions"
        @click-option="onExport"
      />
    </URow>

    <!-- Dashboard Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Balance Card -->
      <UCard>
        <UCol gap="sm">
          <URow justify="between" align="center">
            <UText size="sm" color="muted">{{ t('label.totalBalance') }}</UText>
            <UIcon name="account_balance_wallet" color="primary" />
          </URow>
          <UNumber
            :value="dashboard.totalBalance"
            :currency="baseCurrency.symbol"
            size="xl"
            weight="bold"
          />
          <URow align="center" gap="xs">
            <UIcon
              :name="dashboard.balanceChange.isPositive ? 'trending_up' : 'trending_down'"
              :color="dashboard.balanceChange.isPositive ? 'success' : 'error'"
              size="sm"
            />
            <UText
              :color="dashboard.balanceChange.isPositive ? 'success' : 'error'"
              size="sm"
            >
              {{ dashboard.balanceChange.percentage }}%
            </UText>
          </URow>
        </UCol>
      </UCard>

      <!-- Income Card -->
      <UCard>
        <UCol gap="sm">
          <URow justify="between" align="center">
            <UText size="sm" color="muted">{{ t('label.income') }}</UText>
            <UIcon name="trending_up" color="success" />
          </URow>
          <UNumber
            :value="dashboard.income"
            :currency="baseCurrency.symbol"
            color="success"
            size="xl"
            weight="bold"
          />
        </UCol>
      </UCard>

      <!-- Expenses Card -->
      <UCard>
        <UCol gap="sm">
          <URow justify="between" align="center">
            <UText size="sm" color="muted">{{ t('label.expenses') }}</UText>
            <UIcon name="trending_down" color="error" />
          </URow>
          <UNumber
            :value="dashboard.expenses"
            :currency="baseCurrency.symbol"
            color="error"
            size="xl"
            weight="bold"
          />
        </UCol>
      </UCard>

      <!-- Transactions Count -->
      <UCard>
        <UCol gap="sm">
          <URow justify="between" align="center">
            <UText size="sm" color="muted">{{ t('label.transactions') }}</UText>
            <UIcon name="receipt" color="info" />
          </URow>
          <UText size="xl" weight="bold">{{ dashboard.transactionCount }}</UText>
        </UCol>
      </UCard>
    </div>

    <!-- Recent Transactions -->
    <UCard>
      <template #header>
        <URow justify="between" align="center">
          <UText size="lg" weight="bold">{{ t('title.recentTransactions') }}</UText>
          <ULink :to="{ name: 'transactions' }" :label="t('button.viewAll')" />
        </URow>
      </template>

      <UTable
        :rows="recentTransactions"
        :columns="transactionColumns"
        compact
        @click-row="onViewTransaction"
      />
    </UCard>
  </UPage>
</template>
```

### Settings Page with Grouped Forms

**Use case:** Complex settings interface with multiple configuration sections.

```vue
<template>
  <UPage :title="t('title.settings')" size="lg">
    <UTabs v-model="activeTab">
      <!-- General Settings Tab -->
      <UTab name="general" :label="t('tab.general')">
        <UGroups>
          <UGroup :title="t('group.profile')">
            <UCol>
              <URow gap="md" align="start">
                <UAvatar
                  :src="user.avatar"
                  :label="user.initials"
                  size="xl"
                  editable
                  @change="onAvatarChange"
                />
                <UCol class="flex-1">
                  <UInput
                    v-model="settings.profile.name"
                    :label="t('label.fullName')"
                    :error="validation.nameError"
                  />
                  <UInput
                    v-model="settings.profile.email"
                    :label="t('label.email')"
                    :error="validation.emailError"
                    inputmode="email"
                  />
                </UCol>
              </URow>
            </UCol>
          </UGroup>

          <UGroup :title="t('group.preferences')">
            <UCol>
              <USelect
                v-model="settings.language"
                :label="t('label.language')"
                :options="languages"
              />
              <USelect
                v-model="settings.currency"
                :label="t('label.baseCurrency')"
                :options="currencies"
              />
              <USelect
                v-model="settings.dateFormat"
                :label="t('label.dateFormat')"
                :options="dateFormats"
              />
            </UCol>
          </UGroup>

          <UGroup :title="t('group.notifications')">
            <UCol>
              <URow justify="between" align="center">
                <UCol>
                  <UText weight="medium">{{ t('label.emailNotifications') }}</UText>
                  <UText size="sm" color="muted">{{ t('description.emailNotifications') }}</UText>
                </UCol>
                <USwitch v-model="settings.notifications.email" />
              </URow>

              <URow justify="between" align="center">
                <UCol>
                  <UText weight="medium">{{ t('label.pushNotifications') }}</UText>
                  <UText size="sm" color="muted">{{ t('description.pushNotifications') }}</UText>
                </UCol>
                <USwitch v-model="settings.notifications.push" />
              </URow>
            </UCol>
          </UGroup>
        </UGroups>
      </UTab>

      <!-- Security Tab -->
      <UTab name="security" :label="t('tab.security')">
        <UGroups>
          <UGroup :title="t('group.password')">
            <UCol>
              <UInputPassword
                v-model="passwordForm.current"
                :label="t('label.currentPassword')"
                :error="validation.currentPasswordError"
              />
              <UInputPassword
                v-model="passwordForm.new"
                :label="t('label.newPassword')"
                :error="validation.newPasswordError"
              />
              <UInputPassword
                v-model="passwordForm.confirm"
                :label="t('label.confirmPassword')"
                :error="validation.confirmPasswordError"
              />
              <UButton
                :label="t('button.changePassword')"
                @click="onChangePassword"
              />
            </UCol>
          </UGroup>

          <UGroup :title="t('group.twoFactor')">
            <UCol>
              <URow justify="between" align="center">
                <UCol>
                  <UText weight="medium">{{ t('label.twoFactorAuth') }}</UText>
                  <UText size="sm" color="muted">{{ t('description.twoFactorAuth') }}</UText>
                </UCol>
                <USwitch
                  v-model="settings.security.twoFactor"
                  @change="onToggleTwoFactor"
                />
              </URow>
            </UCol>
          </UGroup>
        </UGroups>
      </UTab>
    </UTabs>

    <!-- Save Actions -->
    <UCard class="mt-6">
      <template #footer-right>
        <URow gap="sm">
          <UButton
            :label="t('button.reset')"
            variant="outlined"
            @click="onReset"
          />
          <UButton
            :label="t('button.saveChanges')"
            :loading="isSaving"
            @click="onSave"
          />
        </URow>
      </template>
    </UCard>
  </UPage>
</template>
```

### Confirmation Dialog with Complex Content

**Use case:** Advanced confirmation dialog with detailed information and multiple actions.

```vue
<template>
  <UModalConfirm
    v-model="isShown"
    :title="t('title.deleteTransactions')"
    :confirm-label="t('button.delete')"
    :confirm-disabled="!isConfirmed"
    color="error"
    size="lg"
    @confirm="onConfirmDelete"
  >
    <!-- Warning Alert -->
    <UAlert color="error" class="mb-4">
      <URow align="start" gap="sm">
        <UIcon name="warning" />
        <UCol>
          <UText weight="medium">{{ t('warning.irreversibleAction') }}</UText>
          <UText size="sm">{{ t('description.deleteWarning') }}</UText>
        </UCol>
      </URow>
    </UAlert>

    <!-- Transaction Summary -->
    <UCard variant="soft" class="mb-4">
      <UCol gap="sm">
        <UText weight="medium">{{ t('label.transactionsToDelete') }}</UText>

        <URow justify="between">
          <UText>{{ t('label.count') }}:</UText>
          <UText weight="medium">{{ selectedTransactions.length }}</UText>
        </URow>

        <URow justify="between">
          <UText>{{ t('label.totalAmount') }}:</UText>
          <UNumber
            :value="totalAmount"
            :currency="baseCurrency.symbol"
            weight="medium"
          />
        </URow>

        <URow justify="between">
          <UText>{{ t('label.dateRange') }}:</UText>
          <UText weight="medium">{{ formatDateRange(dateRange) }}</UText>
        </URow>
      </UCol>
    </UCard>

    <!-- Affected Categories -->
    <UGroup :title="t('label.affectedCategories')" class="mb-4">
      <URow gap="xs" wrap>
        <UBadge
          v-for="category in affectedCategories"
          :key="category.id"
          :label="category.name"
          variant="soft"
        >
          <template #before>
            <UDot :color="category.color" />
          </template>
        </UBadge>
      </URow>
    </UGroup>

    <!-- Confirmation Checkbox -->
    <UCheckbox
      v-model="isConfirmed"
      :label="t('label.confirmDeletion')"
      class="mt-4"
    />

    <!-- Additional Actions -->
    <template #footer-left>
      <UButton
        :label="t('button.exportFirst')"
        variant="outlined"
        @click="onExportBeforeDelete"
      />
    </template>
  </UModalConfirm>
</template>
```

### Search and Filter Interface

**Use case:** Advanced search interface with multiple filter criteria and real-time results.

```vue
<template>
  <UPage :title="t('title.search')" size="xl">
    <!-- Search Header -->
    <UCard class="mb-6">
      <UCol gap="md">
        <!-- Main Search -->
        <UInputSearch
          v-model="searchQuery"
          :placeholder="t('placeholder.searchEverything')"
          size="lg"
          @search="onSearch"
          @clear="onClearSearch"
        />

        <!-- Quick Filters -->
        <URow gap="sm" wrap>
          <UButton
            v-for="filter in quickFilters"
            :key="filter.key"
            :label="filter.label"
            :variant="activeFilters.includes(filter.key) ? 'solid' : 'outlined'"
            size="sm"
            @click="onToggleQuickFilter(filter.key)"
          />
        </URow>

        <!-- Advanced Filters Toggle -->
        <URow justify="between" align="center">
          <UButton
            :label="t('button.advancedFilters')"
            variant="ghost"
            :icon="showAdvancedFilters ? 'expand_less' : 'expand_more'"
            @click="showAdvancedFilters = !showAdvancedFilters"
          />

          <UText v-if="searchResults.total" size="sm" color="muted">
            {{ t('label.resultsFound', { count: searchResults.total }) }}
          </UText>
        </URow>

        <!-- Advanced Filters Panel -->
        <UCol v-if="showAdvancedFilters" gap="md" class="pt-4 border-t">
          <URow gap="md" wrap>
            <UDatePickerRange
              v-model:from="filters.dateFrom"
              v-model:to="filters.dateTo"
              :from-label="t('label.dateFrom')"
              :to-label="t('label.dateTo')"
            />

            <USelect
              v-model="filters.categories"
              :label="t('label.categories')"
              :options="categories"
              multiple
              searchable
            />

            <UInputNumber
              v-model="filters.amountMin"
              :label="t('label.amountMin')"
            />

            <UInputNumber
              v-model="filters.amountMax"
              :label="t('label.amountMax')"
            />
          </URow>

          <URow gap="sm">
            <UButton
              :label="t('button.applyFilters')"
              @click="onApplyFilters"
            />
            <UButton
              :label="t('button.clearFilters')"
              variant="outlined"
              @click="onClearFilters"
            />
          </URow>
        </UCol>
      </UCol>
    </UCard>

    <!-- Search Results -->
    <URow gap="lg" align="start">
      <!-- Results List -->
      <UCol class="flex-1">
        <UCard v-if="searchResults.items.length">
          <template #header>
            <URow justify="between" align="center">
              <UText weight="medium">{{ t('title.searchResults') }}</UText>
              <USelect
                v-model="sortBy"
                :options="sortOptions"
                size="sm"
                @change="onSortChange"
              />
            </URow>
          </template>

          <UDataList
            :list="searchResults.items"
            @click-item="onSelectResult"
          >
            <template #item="{ item }">
              <URow gap="md" align="start">
                <UAvatar
                  :label="item.type"
                  :color="getTypeColor(item.type)"
                  size="md"
                />
                <UCol class="flex-1">
                  <UText weight="medium">{{ item.title }}</UText>
                  <UText size="sm" color="muted">{{ item.description }}</UText>
                  <URow gap="xs" class="mt-2">
                    <UBadge
                      :label="item.type"
                      size="sm"
                      variant="soft"
                    />
                    <UText size="xs" color="muted">{{ formatDate(item.date) }}</UText>
                  </URow>
                </UCol>
                <UNumber
                  v-if="item.amount"
                  :value="item.amount"
                  :currency="item.currency"
                  size="sm"
                />
              </URow>
            </template>
          </UDataList>

          <!-- Load More -->
          <template #footer>
            <UButton
              v-if="searchResults.hasMore"
              :label="t('button.loadMore')"
              variant="soft"
              block
              @click="onLoadMore"
            />
          </template>
        </UCard>

        <!-- No Results -->
        <UCard v-else-if="hasSearched">
          <UCol align="center" gap="md" class="py-8">
            <UIcon name="search_off" size="xl" color="muted" />
            <UText color="muted">{{ t('message.noResults') }}</UText>
            <UButton
              :label="t('button.clearSearch')"
              variant="outlined"
              @click="onClearSearch"
            />
          </UCol>
        </UCard>
      </UCol>

      <!-- Search Filters Sidebar -->
      <UCard class="w-80">
        <template #header>
          <UText weight="medium">{{ t('title.filters') }}</UText>
        </template>

        <UCol gap="md">
          <!-- Type Filter -->
          <UGroup :title="t('label.type')">
            <UCheckboxGroup
              v-model="filters.types"
              :options="typeOptions"
              @change="onFilterChange"
            />
          </UGroup>

          <!-- Status Filter -->
          <UGroup :title="t('label.status')">
            <URadioGroup
              v-model="filters.status"
              :options="statusOptions"
              @change="onFilterChange"
            />
          </UGroup>

          <!-- Amount Range -->
          <UGroup :title="t('label.amountRange')">
            <UCol gap="sm">
              <UInputNumber
                v-model="filters.amountMin"
                :placeholder="t('placeholder.min')"
                size="sm"
              />
              <UInputNumber
                v-model="filters.amountMax"
                :placeholder="t('placeholder.max')"
                size="sm"
              />
            </UCol>
          </UGroup>
        </UCol>
      </UCard>
    </URow>
  </UPage>
</template>
```

This comprehensive guide provides AI agents with practical examples and patterns for implementing Vueless UI components effectively in financial management and similar applications. The examples demonstrate real-world usage patterns, component combinations, and best practices for creating intuitive and functional user interfaces.
