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
  label: "",
});

const headerRef = useTemplateRef<HTMLElement>("header");

defineExpose({
  /**
   * A reference to the header element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  headerRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, headerAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <component :is="tag" ref="header" v-bind="headerAttrs" :data-test="getDataTest()">
    <!-- @slot Use it to add html inside. -->
    <slot>{{ label }}</slot>
  </component>
</template>
