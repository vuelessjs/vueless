<script setup lang="ts">
import { ref, computed, useId } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { setTheme, getSelectedPrimaryColor, getSelectedGrayColor } from "../utils/theme.ts";
import { GRAYSCALE_COLOR } from "../constants.js";

import UDivider from "../ui.container-divider/UDivider.vue";
import UColorPicker from "../ui.form-color-picker/UColorPicker.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  primary: "",
  gray: "",
  primaryColors: () => ({}),
  grayColors: () => ({}),
  primaryLabels: () => ({}),
  grayLabels: () => ({}),
});

const emit = defineEmits([
  /**
   * Triggers when the primary color changes.
   * @property {string} value
   */
  "update:primary",

  /**
   * Triggers when the gray color changes.
   * @property {string} value
   */
  "update:gray",
]);

const elementId = props.id || useId();

const localPrimary = ref("");
const localGray = ref("");

const selectedPrimaryColor = computed({
  get: () => props.primary || localPrimary.value || getSelectedPrimaryColor(),
  set: (primary: string) => {
    const prevPrimary = getSelectedPrimaryColor();
    const isPrimaryGrayscale = primary === GRAYSCALE_COLOR;
    const isPrevPrimaryGrayscale = prevPrimary === GRAYSCALE_COLOR;

    if (primary !== prevPrimary && (isPrimaryGrayscale || isPrevPrimaryGrayscale)) {
      window.location.reload();
    }

    setTheme({ primary });
    emit("update:primary", primary);
    localPrimary.value = primary;
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
const { listAttrs, colorDividerAttrs, primaryColorPickerAttrs, grayColorPickerAttrs } =
  useUI<Config>(defaultConfig);
</script>

<template>
  <div :id="elementId" v-bind="listAttrs">
    <UColorPicker
      v-model="selectedPrimaryColor"
      :size="size"
      :colors="primaryColors"
      :labels="primaryLabels"
      v-bind="primaryColorPickerAttrs"
    />

    <UDivider
      v-if="Object.keys(primaryColors).length && Object.keys(grayColors).length"
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
