<script setup lang="ts">
import { ref, computed, useId, useTemplateRef } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";

import vTooltip from "../directives/tooltip/vTooltip.ts";
import UButton from "../ui.button/UButton.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: "",
  colors: () => getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME).colors || {},
  labels: () => getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME).labels || {},
});

const emit = defineEmits([
  /**
   * Triggers when the color value changes.
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
const { listAttrs, colorButtonAttrs, circleAttrs, getDataTest } = useUI<Config>(defaultConfig);
</script>

<template>
  <div :id="elementId" ref="list" :data-test="getDataTest()" v-bind="listAttrs">
    <UButton
      v-for="(colorClass, color) in colors"
      :key="color"
      v-tooltip="labels?.[color] || color"
      square
      size="xs"
      color="grayscale"
      :variant="selectedItem === color ? 'soft' : 'ghost'"
      v-bind="colorButtonAttrs"
      :data-test="getDataTest(`button-${color}`)"
      @click="onClickColor(color)"
    >
      <div :class="colorClass" v-bind="circleAttrs" :data-test="getDataTest(`circle-${color}`)" />
    </UButton>
  </div>
</template>
