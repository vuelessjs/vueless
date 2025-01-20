<script setup lang="ts">
import { ref, computed, useId } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { setTheme, getSelectedBrandColor, getSelectedGrayColor } from "../utils/theme.ts";
import { GRAYSCALE_COLOR } from "../constants.js";

import UDivider from "../ui.container-divider/UDivider.vue";
import UColorPicker from "../ui.form-color-picker/UColorPicker.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  brand: "",
  gray: "",
  brandColors: () => ({}),
  grayColors: () => ({}),
  brandLabels: () => ({}),
  grayLabels: () => ({}),
});

const emit = defineEmits([
  /**
   * Triggers when the brand color changes.
   * @property {string} value
   */
  "update:brand",

  /**
   * Triggers when the gray color changes.
   * @property {string} value
   */
  "update:gray",
]);

const elementId = props.id || useId();

const localBrand = ref("");
const localGray = ref("");

const selectedBrandColor = computed({
  get: () => props.brand || localBrand.value || getSelectedBrandColor(),
  set: (brand: string) => {
    const prevBrand = getSelectedBrandColor();
    const isBrandGrayscale = brand === GRAYSCALE_COLOR;
    const isPrevBrandGrayscale = prevBrand === GRAYSCALE_COLOR;

    if (brand !== prevBrand && (isBrandGrayscale || isPrevBrandGrayscale)) {
      window.location.reload();
    }

    setTheme({ brand });
    emit("update:brand", brand);
    localBrand.value = brand;
  },
});

const selectedGrayColor = computed({
  get: () => props.gray || localGray.value || getSelectedGrayColor(),
  set: (gray: string) => {
    setTheme({ gray });
    emit("update:gray", gray);
    localGray.value = gray;
  },
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { listAttrs, colorDividerAttrs, brandColorPickerAttrs, grayColorPickerAttrs } =
  useUI<Config>(defaultConfig);
</script>

<template>
  <div :id="elementId" v-bind="listAttrs">
    <UColorPicker
      v-model="selectedBrandColor"
      :size="size"
      :colors="brandColors"
      :labels="brandLabels"
      v-bind="brandColorPickerAttrs"
    />

    <UDivider
      v-if="Object.keys(brandColors).length && Object.keys(grayColors).length"
      size="xs"
      v-bind="colorDividerAttrs"
    />

    <UColorPicker
      v-model="selectedGrayColor"
      :size="size"
      :colors="grayColors"
      :labels="grayLabels"
      v-bind="grayColorPickerAttrs"
    />
  </div>
</template>
