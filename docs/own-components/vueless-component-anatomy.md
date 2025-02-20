---
hidden: true
---

# Vueless component anatomy

All vueless component should contain this parts:



```javascript
defineOptions({ inheritAttrs: false });
```



Props

```typescript
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});
```



Use UI

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

const { getDataTest, buttonAttrs, loaderAttrs, leftIconAttrs, rightIconAttrs, centerIconAttrs } =
  useUI<Config>(defaultConfig, mutatedProps);
```

Usage
