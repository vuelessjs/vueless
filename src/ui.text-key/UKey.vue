<script setup lang="ts">
import { useTemplateRef, computed } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import { COMPONENT_NAME, KEY_SYMBOLS } from "./constants";
import defaultConfig from "./config";

import type { Props, Config } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
});

const keyRef = useTemplateRef<HTMLElement>("key");

defineExpose({
  /**
   * A reference to the key element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  keyRef,
});

const displayValue = computed(() => {
  if (!props.value) return "";

  const lowerValue = props.value.toLowerCase();

  return KEY_SYMBOLS[lowerValue as keyof typeof KEY_SYMBOLS] || props.value;
});

const { getDataTest, keyAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <kbd ref="key" v-bind="keyAttrs" :data-test="getDataTest()">
    <!--
      @slot Use it to add custom content.
      @binding {string} value
    -->
    <slot :value="displayValue">
      {{ displayValue }}
    </slot>
  </kbd>
</template>
