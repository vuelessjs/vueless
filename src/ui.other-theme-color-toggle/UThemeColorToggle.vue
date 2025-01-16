<script setup lang="ts">
import { computed, useId, watch } from "vue";

import { vTooltip } from "../directives";
import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { setTheme, getSelectedBrandColor, getSelectedGrayColor } from "../utils/theme.ts";
import { GRAYSCALE_COLOR } from "../constants.js";

import UDivider from "../ui.container-divider/UDivider.vue";
import UButton from "../ui.button/UButton.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { BrandColors, GrayColors } from "../types.ts";
import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  modelValue: () => ["", ""],
  brandColors: () => ({}),
  grayColors: () => ({}),
  brandLabels: () => ({}),
  grayLabels: () => ({}),
});

const emit = defineEmits([
  /**
   * Triggers when color value changes.
   * @property {string} value
   */
  "update:modelValue",
]);

const elementId = props.id || useId();

const selectedBrand = getSelectedBrandColor();
const selectedGray = getSelectedGrayColor();

const selectedItem = computed({
  get: () => {
    const [brand, gray] = props.modelValue;

    return [brand || selectedBrand, gray || selectedGray];
  },
  set: (value) => emit("update:modelValue", value),
});

watch(selectedItem, (newValue, oldValue) => {
  const [oldBrand, oldGray] = oldValue;
  const [brand, gray] = newValue;

  if (oldBrand === brand && oldGray === gray) {
    return;
  }

  setTheme({ brand, gray });

  if (oldBrand !== brand && (brand === GRAYSCALE_COLOR || oldBrand === GRAYSCALE_COLOR)) {
    window.location.reload();
  }
});

function onClickBrandColor(brand: BrandColors) {
  const [, gray] = selectedItem.value;

  selectedItem.value = [brand, gray];
}

function onClickGrayColor(gray: GrayColors) {
  const [brand] = selectedItem.value;

  selectedItem.value = [brand, gray];
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { listAttrs, colorButtonAttrs, circleAttrs, colorDividerAttrs } =
  useUI<Config>(defaultConfig);
</script>

<template>
  <div :id="elementId" v-bind="listAttrs">
    <UButton
      v-for="(brandColorClass, color) in brandColors"
      :key="color"
      v-tooltip="brandLabels?.[color] || color"
      square
      size="xs"
      :ring="false"
      color="grayscale"
      variant="thirdary"
      :filled="selectedItem[0] === color"
      v-bind="colorButtonAttrs"
      @click="onClickBrandColor(color)"
    >
      <div :class="brandColorClass" v-bind="circleAttrs" />
    </UButton>

    <UDivider
      v-if="Object.keys(brandColors).length && Object.keys(grayColors).length"
      size="xs"
      v-bind="colorDividerAttrs"
    />

    <UButton
      v-for="(grayColorClass, color) in grayColors"
      :key="color"
      v-tooltip="brandLabels?.[color] || color"
      square
      size="xs"
      :ring="false"
      color="grayscale"
      variant="thirdary"
      :filled="selectedItem[1] === color"
      v-bind="colorButtonAttrs"
      @click="onClickGrayColor(color)"
    >
      <div :class="grayColorClass" v-bind="circleAttrs" />
    </UButton>
  </div>
</template>
