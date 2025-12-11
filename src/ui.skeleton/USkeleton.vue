<script setup lang="ts">
import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import defaultConfig from "./config";
import { COMPONENT_NAME } from "./constants";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, bodyAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <div :data-test="getDataTest()" v-bind="bodyAttrs">
    <!-- @slot Use it to add custom content inside the skeleton. -->
    <slot />
  </div>
</template>
