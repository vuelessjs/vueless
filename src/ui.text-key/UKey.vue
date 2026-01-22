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

const keys = computed(() => {
  if (!props.value) return [];

  if (props.value.includes(" + ")) {
    return props.value.split(" + ").map((key) => key.trim());
  }

  return [props.value];
});

const getDisplayValue = (key: string) => {
  const lowerValue = key.toLowerCase();

  return KEY_SYMBOLS[lowerValue as keyof typeof KEY_SYMBOLS] || key;
};

const displayValue = computed(() => {
  if (keys.value.length === 0) return "";
  if (keys.value.length === 1) return getDisplayValue(keys.value[0]);

  return keys.value.map(getDisplayValue).join(" + ");
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
      <template v-if="keys.length > 1">
        <template v-for="(key, index) in keys" :key="index">
          {{ getDisplayValue(key) }}<span v-if="index < keys.length - 1">+</span>
        </template>
      </template>
      <template v-else>
        {{ displayValue }}
      </template>
    </slot>
  </kbd>
</template>
