# Vueless file structure

All Vueless components follow a consistent file structure. We recommend adopting this structure when creating your own local components to ensure maintainability and consistency.

{% tabs %}
{% tab title="File structure" %}
```bash
U[component]/
├─ storybook/
│  ├─ docs.mdx
│  └─ stories.ts
├─ tests/
│  ├─ U[component].test.ts 
│  ├─ util[service].test.ts 
│  ├─ use[composable].test.ts
│  └─ ... # rest tests
├─ config.ts
├─ constants.ts
├─ types.ts
├─ U[component].vue
│  # optional
├─ U[component][child].vue
├─ ... # rest child components
├─ use[composable].ts
├─ ... # rest composable
├─ util[service].ts
└─ ... # rest utils
```
{% endtab %}

{% tab title="Example" %}
```bash
ui.form-date-picker-range/
├─ storybook/
│  ├─ docs.mdx
│  └─ stories.ts
├─ tests/
│  ├─ UDatePickerRange.test.ts 
│  ├─ UDatePickerRangeInputs.test.ts 
│  ├─ UDatePickerRangePeriodMenu.test.ts
│  └─ ... # rest tests
├─ config.ts
├─ constants.ts
├─ types.ts
├─ UDatePickerRange.vue
├─ UDatePickerRangeInputs.vue
├─ UDatePickerRangePeriodMenu.vue
├─ useLocale.ts
├─ useUserFormat.ts
├─ utilDateRange.ts
└─ utilValidation.ts
```
{% endtab %}
{% endtabs %}

### 📁 U\[component]/

Each component should be contained within a single folder, maintaining a flat file structure. All component names must be prefixed with `U` to ensure proper recognition by Vueless.

### 📁 storybook/

Folder for Storybook-related files:

* 📜 docs.mdx – component docs page.
* 📜 stories.ts – component stories.

### 📁 tests/

Folder for test-related files:

* 📜 U\[component].test.ts – component tests.
* 📜 util\[service].test.ts – component utility service tests. <mark style="color:yellow;">(optional)</mark>
* 📜 use\[composable].test.ts – component composable tests. <mark style="color:yellow;">(optional)</mark>

We recommend using `vitest` with `@vue/test-utils` for testing

### 📜 config.ts

Contains all styles, default prop values, internationalization (i18n), and other component-specific settings.

### 📜 constants.ts

&#x20;Contains component constants.

### 📜 types.ts

Contains component types and props declaration.

### 📜 U\[component].vue

Parent Vue component.

### 📜 U\[component]\[child].vue <mark style="color:yellow;">(optional)</mark>

A child Vue component used within the parent component. The parent component may have multiple child components, all prefixed with the parent component’s name.

Example: `UButtonIcon.vue` (child of `UButton.vue`).

### 📜 use\[composable].ts <mark style="color:yellow;">(optional)</mark>

Composables specific to the component. A component may have multiple composables, all prefixed with `use` keyword, following Vue conventions.

### 📜 util\[service].ts <mark style="color:yellow;">(optional)</mark>

Utils, services and helpers specific to the component. A component may have multiple composables, all prefixed with `util` keyword.
