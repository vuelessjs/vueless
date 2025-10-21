<script setup lang="ts">
import { useTemplateRef } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import { COMPONENT_NAME } from "./constants";
import defaultConfig from "./config";

import type { Props, Config } from "./types";

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
  <div ref="dot" v-bind="dotAttrs" :data-test="getDataTest()" />
</template>
