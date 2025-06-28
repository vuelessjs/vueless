---
hidden: true
---

# Vueless component anatomy

## Component Anatomy

Each Vueless component follows a consistent internal structure with these key elements:

### 1. Script Setup with `inheritAttrs` Disabled

All components disable attribute inheritance to prevent classes duplication:

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

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  leftIcon: Boolean(props.leftIcon) || hasSlotContent(slots["left"]),
  rightIcon: Boolean(props.rightIcon) || hasSlotContent(slots["right"]),
  label: Boolean(props.label),
}));

const { getDataTest, elementAttrs } = useUI<Config>(defaultConfig, mutatedProps);
```







