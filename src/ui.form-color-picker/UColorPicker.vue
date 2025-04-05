<script setup lang="ts">
import { ref, computed, useId, useTemplateRef } from "vue";

import { vTooltip } from "../directives";
import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import UButton from "../ui.button/UButton.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: "",
  colors: () => ({}),
  labels: () => ({}),
});

const emit = defineEmits([
  /**
   * Triggers when color value changes.
   * @property {string} value
   */
  "update:modelValue",
]);

const listRef = useTemplateRef<HTMLDivElement>("list");

const elementId = props.id || useId();

const localValue = ref("");

const selectedItem = computed({
  get: () => props.modelValue || localValue.value,
  set: (value) => emit("update:modelValue", value),
});

function onClickColor(color: string) {
  selectedItem.value = color;
  localValue.value = color;
}

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  listRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { listAttrs, colorButtonAttrs, circleAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <div :id="elementId" ref="list" v-bind="listAttrs">
    <UButton
      v-for="(colorClass, color) in colors"
      :key="color"
      v-tooltip="labels?.[color] || color"
      square
      size="xs"
      color="grayscale"
      :variant="selectedItem === color ? 'soft' : 'ghost'"
      v-bind="colorButtonAttrs"
      @click="onClickColor(color)"
    >
      <div :class="colorClass" v-bind="circleAttrs" />
    </UButton>
  </div>
</template>
