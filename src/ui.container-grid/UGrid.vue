<script setup lang="ts">
import { computed, useTemplateRef } from "vue";
import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import { COMPONENT_NAME } from "./constants";
import defaultConfig from "./config";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const wrapperRef = useTemplateRef<HTMLElement>("wrapper");

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  wrapperRef,
});

const gridStyle = computed(() => {
  if (props.responsive) {
    return {
      gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    };
  }

  return {
    gridTemplateColumns: `repeat(${props.cols}, minmax(0, 1fr))`,
  };
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { getDataTest, wrapperAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <component
    :is="tag"
    ref="wrapper"
    v-bind="wrapperAttrs"
    :style="gridStyle"
    :data-test="getDataTest()"
  >
    <!-- @slot Use it to add grid items. -->
    <slot />
  </component>
</template>
