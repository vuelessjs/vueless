<script setup lang="ts">
import { ref, computed, useId } from "vue";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { setTheme, getSelectedPrimaryColor, getSelectedNeutralColor } from "../utils/theme.ts";

import UDivider from "../ui.container-divider/UDivider.vue";
import UColorPicker from "../ui.form-color-picker/UColorPicker.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  primary: "",
  neutral: "",
  primaryColors: () => ({}),
  neutralColors: () => ({}),
  primaryLabels: () => ({}),
  neutralLabels: () => ({}),
});

const emit = defineEmits([
  /**
   * Triggers when the primary color changes.
   * @property {string} value
   */
  "update:primary",

  /**
   * Triggers when the neutral color changes.
   * @property {string} value
   */
  "update:neutral",
]);

const elementId = props.id || useId();

const localPrimary = ref("");
const localNeutral = ref("");

const selectedPrimaryColor = computed({
  get: () => props.primary || localPrimary.value || getSelectedPrimaryColor() || "",
  set: (primary: string) => {
    setTheme({ primary });
    emit("update:primary", primary);
    localPrimary.value = primary;
  },
});

const selectedNeutralColor = computed({
  get: () => props.neutral || localNeutral.value || getSelectedNeutralColor() || "",
  set: (neutral: string) => {
    setTheme({ neutral });
    emit("update:neutral", neutral);
    localNeutral.value = neutral;
  },
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { listAttrs, colorDividerAttrs, primaryColorPickerAttrs, neutralColorPickerAttrs } =
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
      v-if="Object.keys(primaryColors).length && Object.keys(neutralColors).length"
      v-bind="colorDividerAttrs"
    />

    <UColorPicker
      v-model="selectedNeutralColor"
      :size="size"
      :colors="neutralColors"
      :labels="neutralLabels"
      v-bind="neutralColorPickerAttrs"
    />
  </div>
</template>
