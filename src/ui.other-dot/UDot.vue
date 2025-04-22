<script setup lang="ts">
import { useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const dotRef = useTemplateRef<HTMLDivElement>("dot");

defineExpose({
  /**
   * A reference to the dot element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  dotRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, dotAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <div ref="dot" v-bind="dotAttrs" :data-test="getDataTest()">
    <slot />
  </div>
</template>
