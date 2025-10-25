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

const textRef = useTemplateRef<HTMLElement>("text");

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  textRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, textAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <component :is="tag" ref="text" v-bind="textAttrs" :data-test="getDataTest()">
    <!-- @slot Use it to add something inside. -->
    <slot>
      {{ label }}
    </slot>
  </component>
</template>
