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

const gridClasses = computed(() => {
  const colsMap: Record<string, string> = {
    "1": "grid-cols-1",
    "2": "grid-cols-2",
    "3": "grid-cols-3",
    "4": "grid-cols-4",
    "5": "grid-cols-5",
    "6": "grid-cols-6",
    "7": "grid-cols-7",
    "8": "grid-cols-8",
    "9": "grid-cols-9",
    "10": "grid-cols-10",
    "11": "grid-cols-11",
    "12": "grid-cols-12",
  };

  const rowsMap: Record<string, string> = {
    "1": "grid-rows-1",
    "2": "grid-rows-2",
    "3": "grid-rows-3",
    "4": "grid-rows-4",
    "5": "grid-rows-5",
    "6": "grid-rows-6",
    "7": "grid-rows-7",
    "8": "grid-rows-8",
    "9": "grid-rows-9",
    "10": "grid-rows-10",
    "11": "grid-rows-11",
    "12": "grid-rows-12",
  };

  const cols = props.cols
    ? props.cols
        .split(" ")
        .map((part) => colsMap[part] || "")
        .filter(Boolean)
        .join(" ")
    : "";

  const rows = props.rows
    ? props.rows
        .split(" ")
        .map((part) => rowsMap[part] || "")
        .filter(Boolean)
        .join(" ")
    : "";

  return `${cols} ${rows}`.trim();
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
    :class="gridClasses"
    :data-test="getDataTest()"
  >
    <!-- @slot Use it to add grid items. -->
    <slot />
  </component>
</template>
