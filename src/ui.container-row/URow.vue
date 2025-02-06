<script setup lang="ts">
import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, wrapperAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <div v-bind="wrapperAttrs" :data-test="getDataTest()">
    <!-- @slot Use it to add something inside. -->
    <slot />
  </div>
</template>
